const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "fast food",
            "fruits",
            "vegetables",
            "entertainment",
            "health",
            "shopping",
            "education",
            "rent",
            "gifts",
            "subscriptions",
            "travel",
            "electricity bill",
            "water bill",
            "internet bill",
            "gas bill",
            "fuel",
            "groceries shopping",
            "other"

        ],
        required: true
    },

    date: { type: Date, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Expense', expenseSchema);