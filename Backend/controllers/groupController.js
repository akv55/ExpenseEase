const User = require("../models/User.js");
const Group = require("../models/Group.js");
const mongoose = require("mongoose");

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
  const { name, groupName, description, members } = req.body;
  const resolvedName = name || groupName;

  // Basic validation to avoid silent 500s from schema validation
  if (!resolvedName || !Array.isArray(members) || members.length === 0) {
    return res
      .status(400)
      .json({ error: "name and at least one member are required." });
  }

  const invalidMemberIds = members.filter(
    (id) => !mongoose.Types.ObjectId.isValid(id)
  );
  if (invalidMemberIds.length > 0) {
    return res.status(400).json({
      error: "One or more member IDs are invalid.",
      invalidMemberIds,
    });
  }

  try {
    const ownerId = req.user.id;
    const memberIds = Array.from(
      new Set([ownerId, ...members.map((id) => String(id))])
    );

    const group = await Group.create({
      name: resolvedName,
      description,
      members: memberIds,
      owner: ownerId,
    });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

module.exports = { getGroups, createGroup, getGroupById };