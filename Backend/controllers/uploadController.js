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

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'profile_images' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Upload failed' });
        }
        res.status(200).json({ url: result.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error(" Upload error:", error);
    res.status(500).json({ message: "Internal server error during upload" });
  }
};

module.exports = { uploadProfileImage };
