const express = require('express');
const { signup, login,changePassword,logout,getProfile,findUserByPhone } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', protect, changePassword);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.get('/search', protect, findUserByPhone);

module.exports = router;