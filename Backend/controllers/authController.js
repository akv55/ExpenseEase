const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");
require("dotenv").config();

// Signup
const signup = async (req, res) => {
  const { name, phone, email, password } = req.body;
  console.log("Signup attempt:", { name, phone, email }); // Log input without password

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "User already exists!" });

    const existingPhone = await User.findOne({ phone });
    if (existingPhone)
      return res.status(400).json({ message: "Phone Number already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword });

    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists!" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Password

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Make sure user is authenticated (req.user is available via middleware)
    const userId = req.user?.id || req.user?._id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    // Check new passwords match
    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "New passwords do not match" });

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: err.message });
  }

};

//logout
const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

module.exports = { signup, login, logout, changePassword };
