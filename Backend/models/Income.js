const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "Salary",
            "Business",
            "Investments",
            "Freelancing",
            "Rental Income",
            "Gifts",
            "Interest",
            "Monthly Pocket Money",
            "Other"
        ]
    },
    date: { type: Date, required: true },
});
module.exports = mongoose.model('Income', incomeSchema);