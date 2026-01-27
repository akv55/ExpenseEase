const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadProfileImage,editProfileInfo } = require("../controllers/userProfileController");
const protect = require('../middleware/middleware');
const wrapAsync = require("../utils/wrapAsync");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/uploadProfileImage", protect, upload.single("file"), wrapAsync(uploadProfileImage));
router.put("/editProfileInfo", protect, wrapAsync(editProfileInfo));

module.exports = router;
