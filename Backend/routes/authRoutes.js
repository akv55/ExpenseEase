const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const { signup, login,changePassword,logout,getProfile,findUserByPhone } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', protect, wrapAsync(changePassword));
router.post('/logout', protect, wrapAsync(logout));
router.get('/profile', protect, wrapAsync(getProfile));
router.get('/search', protect, wrapAsync(findUserByPhone));

module.exports = router;