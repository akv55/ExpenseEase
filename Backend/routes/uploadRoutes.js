const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/uploadProfileImage',
  upload.single('image'),
  uploadController.uploadProfileImage
);

module.exports = router;
