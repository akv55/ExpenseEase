const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const User = require("../models/User");

// Upload and save profile image
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old image
    if (user.profileImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.profileImage.public_id);
      } catch (err) {
        console.warn("Old image delete failed:", err.message);
      }
    }

    // Upload new image
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profile_images" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed" });
        }

        user.profileImage = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        await user.save();

        res.status(200).json({
          message: "Profile image updated successfully",
          user,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during upload" });
  }
};

module.exports = { uploadProfileImage };
