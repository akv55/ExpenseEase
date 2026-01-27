const Group = require("../models/Group.js");
const GroupExpense = require("../models/GroupExpense.js");
const GroupInvite = require("../models/GroupInvite.js");
const mongoose = require("mongoose");
const { createGroupInvites } = require("../services/groupInviteService.js");

// Get all groups for a user
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      $or: [{ members: req.user.id }, { owner: req.user.id }],
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new group
const createGroup = async (req, res) => {
  const { name, groupName, description, members = [], note } = req.body;
  const resolvedName = name || groupName;

  if (!resolvedName) {
    return res.status(400).json({ error: "Group name is required." });
  }

  if (members && !Array.isArray(members)) {
    return res
      .status(400)
      .json({ error: "members must be an array of user ids." });
  }

  const invalidMemberIds = (members || []).filter(
    (id) => !mongoose.Types.ObjectId.isValid(String(id))
  );

  if (invalidMemberIds.length > 0) {
    return res.status(400).json({
      error: "One or more member IDs are invalid.",
      invalidMemberIds,
    });
  }

  try {
    const ownerId = req.user.id;
    const group = await Group.create({
      name: resolvedName,
      description,
      members: [ownerId],
      owner: ownerId,
    });

    let inviteSummary = null;
    if (Array.isArray(members) && members.length > 0) {
      const invites = await createGroupInvites({
        groupId: group._id,
        inviterId: ownerId,
        memberIds: members,
        note,
      });
      inviteSummary = {
        createdCount: invites.createdInvites.length,
        ...invites.summary,
      };
    }

    const populatedGroup = await Group.findById(group._id)
      .populate("owner", "name email phone")
      .populate("members", "name email phone");

    res.status(201).json({ group: populatedGroup, inviteSummary });
  } catch (err) {
    console.error("Group creation error:", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// Get a single group (with populated members)
const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid groupId" });
    }

    const group = await Group.findOne({
      _id: groupId,
      $or: [{ members: req.user.id }, { owner: req.user.id }],
    })
      .populate("owner", "name email phone")
      .populate("members", "name email phone");

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a group (owner only)
const deleteGroup = async (req, res) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Invalid groupId" });
  }

  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  if (String(group.owner) !== String(req.user.id)) {
    return res.status(403).json({ error: "Only the group owner can delete the group." });
  }

  await Promise.all([
    GroupExpense.deleteMany({ groupId }),
    GroupInvite.deleteMany({ group: groupId }),
  ]);

  await group.deleteOne();

  res.json({ message: "Group deleted successfully." });
};

// Remove a member from the group (owner only)
const removeGroupMember = async (req, res) => {
  const { groupId, memberId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(groupId) ||
    !mongoose.Types.ObjectId.isValid(memberId)
  ) {
    return res.status(400).json({ error: "Invalid groupId or memberId" });
  }

  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  if (String(group.owner) !== String(req.user.id)) {
    return res.status(403).json({ error: "Only the group owner can remove members." });
  }

  if (String(group.owner) === String(memberId)) {
    return res.status(400).json({ error: "Owner cannot be removed from the group." });
  }

  const memberExists = group.members.some((member) => String(member) === String(memberId));
  if (!memberExists) {
    return res.status(404).json({ error: "Member not found in this group." });
  }

  group.members = group.members.filter((member) => String(member) !== String(memberId));
  await group.save();

  const populatedGroup = await Group.findById(groupId)
    .populate("owner", "name email phone")
    .populate("members", "name email phone");

  res.json({
    message: "Member removed successfully.",
    group: populatedGroup,
  });
};

module.exports = {
  getGroups,
  createGroup,
  getGroupById,
  deleteGroup,
  removeGroupMember,
};