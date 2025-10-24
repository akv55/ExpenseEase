const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const User = require("../models/User");

// Upload and save profile image
const uploadProfileImage = async (req, res) => {
  try {
    //  Validate request and auth
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in again." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    //  Find user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Delete old image from Cloudinary if exists
    if (user.profileImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.profileImage.public_id);
      } catch (err) {
        console.warn(" Failed to delete old Cloudinary image:", err.message);
      }
    }

    //  Upload new image
    const uploadOptions = { folder: "profile_images" };
    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        if (req.file.buffer) {
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        } else if (req.file.path) {
          fs.createReadStream(req.file.path).pipe(uploadStream);
        } else {
          reject(new Error("No valid file buffer or path found."));
        }
      });

    const result = await uploadToCloudinary();

    //  Save to MongoDB
    user.profileImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    await user.save();

    // Return success
    res.status(200).json({
      message: " Profile image updated successfully",
      user,
    });
  } catch (error) {
    console.error(" Upload error:", error);
    res.status(500).json({ message: "Internal server error during upload" });
  }
};

module.exports = { uploadProfileImage };
