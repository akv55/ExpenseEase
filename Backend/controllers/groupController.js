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
  const { groupName, description, members } = req.body;
  try {
    const group = await Group.create({
      name: groupName,
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