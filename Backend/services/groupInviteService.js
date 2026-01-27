const mongoose = require("mongoose");
const Group = require("../models/Group");
const GroupInvite = require("../models/GroupInvite");
const User = require("../models/User");

const toObjectId = (value) => new mongoose.Types.ObjectId(String(value));

const sanitizeMemberIds = (memberIds = [], inviterId) => {
  const inviter = String(inviterId);
  const uniques = new Set();
  const invalidIds = [];

  memberIds.forEach((rawId) => {
    if (!rawId) return;
    const str = String(rawId).trim();
    if (!mongoose.Types.ObjectId.isValid(str)) {
      invalidIds.push(str);
      return;
    }
    if (str === inviter) return; // Skip self-invite
    uniques.add(str);
  });

  return { ids: Array.from(uniques), invalidIds };
};

const filterExistingUsers = async (ids = []) => {
  if (!ids.length) return { existingIds: [], missingIds: [] };
  const users = await User.find({ _id: { $in: ids.map(toObjectId) } }).select("_id");
  const existingSet = new Set(users.map((user) => String(user._id)));
  const existingIds = Array.from(existingSet);
  const missingIds = ids.filter((id) => !existingSet.has(String(id)));
  return { existingIds, missingIds };
};

const splitMembersByStatus = (group, ids = []) => {
  const memberSet = new Set((group.members || []).map((member) => String(member)));
  return ids.reduce(
    (acc, id) => {
      if (memberSet.has(String(id))) {
        acc.alreadyMembers.push(String(id));
      } else {
        acc.candidates.push(String(id));
      }
      return acc;
    },
    { alreadyMembers: [], candidates: [] }
  );
};

const filterPendingInvites = async (groupId, ids = []) => {
  if (!ids.length) return { pendingInvitees: [], alreadyInvited: [] };
  const existing = await GroupInvite.find({
    group: groupId,
    invitee: { $in: ids },
    status: "pending",
  }).select("invitee");
  const pendingSet = new Set(existing.map((doc) => String(doc.invitee)));
  const pendingInvitees = ids.filter((id) => !pendingSet.has(String(id)));
  const alreadyInvited = ids.filter((id) => pendingSet.has(String(id)));
  return { pendingInvitees, alreadyInvited };
};

const createGroupInvites = async ({ groupId, inviterId, memberIds = [], note }) => {
  if (!groupId || !inviterId) {
    throw new Error("groupId and inviterId are required to create invites");
  }

  const { ids, invalidIds } = sanitizeMemberIds(memberIds, inviterId);
  if (!ids.length) {
    return {
      createdInvites: [],
      summary: { invalidIds, missingUsers: [], alreadyMembers: [], alreadyInvited: [] },
    };
  }

  const { existingIds, missingIds } = await filterExistingUsers(ids);
  if (!existingIds.length) {
    return {
      createdInvites: [],
      summary: {
        invalidIds,
        missingUsers: missingIds,
        alreadyMembers: [],
        alreadyInvited: [],
      },
    };
  }

  const group = await Group.findById(groupId).select("members");
  if (!group) {
    const err = new Error("Group not found");
    err.statusCode = 404;
    throw err;
  }

  const { alreadyMembers, candidates } = splitMembersByStatus(group, existingIds);
  if (!candidates.length) {
    return {
      createdInvites: [],
      summary: {
        invalidIds,
        missingUsers: missingIds,
        alreadyMembers,
        alreadyInvited: [],
      },
    };
  }

  const { pendingInvitees, alreadyInvited } = await filterPendingInvites(groupId, candidates);

  if (!pendingInvitees.length) {
    return {
      createdInvites: [],
      summary: {
        invalidIds,
        missingUsers: missingIds,
        alreadyMembers,
        alreadyInvited,
      },
    };
  }

  const docs = pendingInvitees.map((inviteeId) => ({
    group: toObjectId(groupId),
    inviter: toObjectId(inviterId),
    invitee: toObjectId(inviteeId),
    note: note?.trim() || undefined,
  }));

  const createdInvites = await GroupInvite.insertMany(docs);

  return {
    createdInvites,
    summary: {
      invalidIds,
      missingUsers: missingIds,
      alreadyMembers,
      alreadyInvited,
    },
  };
};

module.exports = {
  createGroupInvites,
};
