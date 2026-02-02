const Notification = require('../models/Notification');
const ExpressError = require('../utils/ExpressError');

module.exports.getNotifications = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 notifications

        const unreadCount = await Notification.countDocuments({ recipient: userId, isRead: false });

        res.status(200).json({ notifications, unreadCount });
    } catch (error) {
        next(new ExpressError("Failed to fetch notifications", 500));
    }
};

module.exports.markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findOne({ _id: id, recipient: req.user._id });

        if (!notification) {
            return next(new ExpressError("Notification not found", 404));
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Marked as read", notification });
    } catch (error) {
        next(new ExpressError("Failed to update notification", 500));
    }
};

module.exports.markAllAsRead = async (req, res, next) => {
    try {
        await Notification.updateMany(
            { recipient: req.user._id, isRead: false },
            { isRead: true }
        );
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        next(new ExpressError("Failed to mark all as read", 500));
    }
};

module.exports.deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Notification.findOneAndDelete({ _id: id, recipient: req.user._id });
        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        next(new ExpressError("Failed to delete notification", 500));
    }
};
