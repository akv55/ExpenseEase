const mongoose = require("mongoose");

/* ---------- Participant Sub-Schema ---------- */
const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shareAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
  },
  { _id: false }
);

/* ---------- Group Expense Schema ---------- */
const groupExpenseSchema = new mongoose.Schema(
  {
    /* 🔗 Relation */
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Restaurant",
        "Groceries",
        "Travel",
        "Cab",
        "Fuel",
        "Rent",
        "Electricity",
        "Water",
        "Internet",
        "Movie",
        "Party",
        "Shopping",
        "Medical",
        "Education",
        "Gift",
        "Group Contribution",
        "Other"
      ],
      required: true,
    },

    /* 👤 Paid By */
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* 🔀 Split Logic */
    splitType: {
      type: String,
      enum: ["equal", "custom"],
      default: "equal",
    },

    participants: [participantSchema],

    /* ✅ Settlement */
    settled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupExpense", groupExpenseSchema);
