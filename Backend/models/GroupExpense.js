import mongoose from "mongoose";

const splitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    shareAmount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const groupExpenseSchema = new mongoose.Schema(
  {
    // Group reference
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    // Expense description
    description: {
      type: String,
      required: true,
      trim: true
    },

    // Current active user (You Paid)
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Total amount
    amount: {
      type: Number,
      required: true,
      min: 1
    },

    // Category
    category: {
      type: String,
      enum: [
        "food",
        "travel",
        "rent",
        "shopping",
        "utilities",
        "entertainment",
        "other"
      ],
      default: "other"
    },

    // Date
    date: {
      type: Date,
      default: Date.now
    },

    // Split type
    splitType: {
      type: String,
      enum: ["equal", "custom"],
      required: true
    },

    // Each member's share (Your Share included here)
    splits: {
      type: [splitSchema],
      required: true,
      validate: {
        validator: function (value) {
          const total = value.reduce(
            (sum, s) => sum + s.shareAmount,
            0
          );
          return total === this.amount;
        },
        message: "Total share must equal expense amount"
      }
    },

    // Convenience fields (calculated)
    youPaidAmount: {
      type: Number,
      default: function () {
        return this.amount;
      }
    },

    yourShareAmount: {
      type: Number,
      default: function () {
        const userSplit = this.splits.find(
          s => s.user.toString() === this.paidBy.toString()
        );
        return userSplit ? userSplit.shareAmount : 0;
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("GroupExpense", groupExpenseSchema);
