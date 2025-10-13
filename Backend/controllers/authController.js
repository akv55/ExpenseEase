const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
require("dotenv").config();

// Signup
const signup = async (req, res) => {
  const { name,phone, email, password } = req.body;
  console.log('Signup attempt:', { name, phone, email }); // Log input without password
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "User already exists!" });

    const exitphone= await User.findOne({phone});
    if (exitphone)return res.status(400).json({message:"Phone Number already exists!"});
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email,phone, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error('Signup error:', err);
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
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
