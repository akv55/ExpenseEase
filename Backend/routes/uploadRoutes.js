const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadProfileImage } = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put(
  "/uploadProfileImage",
  authMiddleware,
  upload.single("image"),   // middleware
  uploadProfileImage        // pass the function reference, NOT called
);

module.exports = router;
