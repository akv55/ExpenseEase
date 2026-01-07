const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const protect = require('../middleware/middleware');

const {
	signup,
	login,
	changePassword,
	logout,
	getProfile,
	findUserByPhone,
	verifyOtp,
	resendOtp,
	forgotPassword,
	resetPassword,
	toggleLoginAlert,
	toggleTwoFactor,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', protect, wrapAsync(changePassword));
router.post('/logout', protect, wrapAsync(logout));
router.get('/profile', protect, wrapAsync(getProfile));
router.get('/search', protect, wrapAsync(findUserByPhone));
router.put('/toggle-login-alert', protect, wrapAsync(toggleLoginAlert));
router.put('/toggle-2fa', protect, wrapAsync(toggleTwoFactor));

module.exports = router;