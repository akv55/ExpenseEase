const mongoose = require("mongoose");
const Group = require("../models/Group");
const GroupInvite = require("../models/GroupInvite");
const { createGroupInvites } = require("../services/groupInviteService");

const normalizeId = (value) => String(value);

const formatSummary = (result) => ({
  createdCount: result.createdInvites.length,
  ...result.summary,
});

const sendGroupInvites = async (req, res) => {
  const { groupId, memberIds = [], note } = req.body;

  if (!groupId || !mongoose.Types.ObjectId.isValid(String(groupId))) {
    return res.status(400).json({ error: "A valid groupId is required." });
  }

  if (!Array.isArray(memberIds) || memberIds.length === 0) {
    return res
      .status(400)
      .json({ error: "Provide at least one member id to invite." });
  }

  const invalidMemberIds = memberIds.filter(
    (id) => !mongoose.Types.ObjectId.isValid(String(id))
  );
  if (invalidMemberIds.length > 0) {
    return res.status(400).json({
      error: "One or more member IDs are invalid.",
      invalidMemberIds,
    });
  }

  const group = await Group.findById(groupId).select("owner members");
  if (!group) {
    return res.status(404).json({ error: "Group not found." });
  }

  if (normalizeId(group.owner) !== normalizeId(req.user.id)) {
    return res
      .status(403)
      .json({ error: "Only the group owner can send invites." });
  }

  try {
    const result = await createGroupInvites({
      groupId,
      inviterId: req.user.id,
      memberIds,
      note,
    });

    res.json({
      message: "Invite request processed.",
      inviteSummary: formatSummary(result),
    });
  } catch (error) {
    console.error("Send invite error:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getMyInvites = async (req, res) => {
  const allowed = new Set(["pending", "accepted", "declined", "expired", "all"]);
  const status = String(req.query.status || "pending").toLowerCase();

  if (!allowed.has(status)) {
    return res.status(400).json({ error: "Invalid status filter." });
  }

  const query = { invitee: req.user.id };
  if (status !== "all") {
    query.status = status;
  }

  const invites = await GroupInvite.find(query)
    .populate({
      path: "group",
      select: "name description owner",
      populate: { path: "owner", select: "name email" },
    })
    .populate("inviter", "name email phone")
    .sort({ createdAt: -1 });

  res.json(invites);
};

const respondToInvite = async (req, res) => {
  const { inviteId } = req.params;
  const action = String(req.body.action || "").toLowerCase();

  if (!mongoose.Types.ObjectId.isValid(String(inviteId))) {
    return res.status(400).json({ error: "Invalid invite id." });
  }

  if (!["accept", "decline"].includes(action)) {
    return res.status(400).json({ error: "Action must be accept or decline." });
  }

  const invite = await GroupInvite.findOne({
    _id: inviteId,
    invitee: req.user.id,
  }).populate("group", "name owner members");

  if (!invite) {
    return res.status(404).json({ error: "Invite not found." });
  }

  if (invite.status !== "pending") {
    return res.status(400).json({ error: "Invite is no longer pending." });
  }

  if (action === "decline") {
    invite.status = "declined";
    invite.respondedAt = new Date();
    await invite.save();
    await invite.populate([
      { path: "inviter", select: "name email phone" },
      {
        path: "group",
        select: "name description owner",
        populate: { path: "owner", select: "name email" },
      },
    ]);
    return res.json({ message: "Invite declined.", invite });
  }

  await Group.updateOne(
    { _id: invite.group._id },
    { $addToSet: { members: req.user.id } }
  );

  invite.status = "accepted";
  invite.respondedAt = new Date();
  await invite.save();
  await invite.populate([
    { path: "inviter", select: "name email phone" },
    {
      path: "group",
      select: "name description owner",
      populate: { path: "owner", select: "name email" },
    },
  ]);

  res.json({ message: "Invite accepted.", invite });
};

module.exports = {
  sendGroupInvites,
  getMyInvites,
  respondToInvite,
};
