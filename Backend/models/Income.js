const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "Salary",
            "Business",
            "Investments",
            "Freelancing",
            "Rental Income",
            "Gifts",
        ]
    },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Income', incomeSchema);