const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");
const sendOTP = require("../utils/sendOTP.js");
require("dotenv").config();

const OTP_EXPIRY_MINUTES = 5;

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Signup
const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    const phoneOwner = await User.findOne({ phone });

    if (user && user.isVerified) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (phoneOwner && (!user || phoneOwner._id.toString() !== user._id.toString())) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpPayload = {
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpire: Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
      isVerified: false,
    };

    if (user && !user.isVerified) {
      user.set(otpPayload);
      await user.save();
    } else {
      user = await User.create(otpPayload);
    }

    await sendOTP(email, otp);
    res.status(201).json({
      message: "OTP sent successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Account not verified. Please verify the OTP sent to your email.",
      });
    }

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

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpire || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    const token = generateToken(user._id);
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Account verified successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpire = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const genericMessage = "If an account with that email exists, a reset code has been sent.";

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(200).json({ message: genericMessage });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
    await user.save();

    await sendOTP(email, otp, "reset");

    res.status(200).json({ message: genericMessage });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  try {
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.resetOtp) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.resetOtpExpire || user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
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


// Search user by phone number
const findUserByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await User.findOne({ phone }).select("name email phone");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//logout
const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

module.exports = {
  signup,
  login,
  logout,
  changePassword,
  getProfile,
  findUserByPhone,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
};
