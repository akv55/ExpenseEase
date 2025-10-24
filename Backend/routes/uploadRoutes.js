const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadProfileImage } = require("../controllers/uploadController");
const  protect  = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/uploadProfileImage", protect, upload.single("file"), uploadProfileImage);

module.exports = router;
