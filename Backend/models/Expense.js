const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "Fast Food",
            "Travel",
            "Shopping",
            "Entertainment",
            "Health",
            "Education",
            "Fruit & Vegetables",
            "Personal Care",
            "Gifts",
            "Subscriptions",
            "Rent", 
            "Others",
        ],
        required: true
    },

    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Expense', expenseSchema);