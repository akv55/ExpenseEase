const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware  = require("../middleware/authMiddleware");
const { uploadProfileImage } = require("../controllers/uploadController");

// Use memory storage for streaming
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/uploadProfileImage", authMiddleware, upload.single("image"), uploadProfileImage);

module.exports = router;
