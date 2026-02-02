const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const protect = require('../middleware/middleware');

// Get all notifications
router.get('/', protect, notificationController.getNotifications);

// Mark as read
router.put('/:id/read', protect, notificationController.markAsRead);

// Mark all as read
router.put('/mark-all-read', protect, notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', protect, notificationController.deleteNotification);

module.exports = router;
