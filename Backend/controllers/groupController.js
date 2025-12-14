const User = require("../models/User.js");
const Group = require("../models/Group.js");

// Get all groups for a user
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id });
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
  if (!resolvedName || !description || !Array.isArray(members) || members.length === 0) {
    return res.status(400).json({ error: "name, description, and at least one member are required." });
  }

  try {
    const group = await Group.create({
      name: resolvedName,
      description,
      members,
      createdBy: req.user.id,
    });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getGroups, createGroup };