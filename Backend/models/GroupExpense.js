const mongoose = require('mongoose');
const groupExpenseSchema = new mongoose.Schema(
  {
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, "Amount must be positive"],
    },
    description: {
        type: String,
        trim: true,
    },  
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    splitAmong: [   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }   
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupExpense", groupExpenseSchema);