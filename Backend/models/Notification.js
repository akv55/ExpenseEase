const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['INFO', 'WARNING', 'SUCCESS', 'ERROR', 'INVITE', 'EXPENSE'],
        default: 'INFO'
    },
    message: {
        type: String,
        required: true
    },
    relatedId: {
        type: Schema.Types.ObjectId, // Could be GroupID, ExpenseID, etc.
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
