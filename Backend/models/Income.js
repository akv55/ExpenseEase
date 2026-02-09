const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Cheque", "Bank Transfer", "UPI", "Other"],
      default: "Cash",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Business",
        "Investments",
        "Freelancing",
        "Rental Income",
        "Gifts",
        "Interest",
        "Monthly Pocket Money",
        "Scholarship",
        "Other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);
