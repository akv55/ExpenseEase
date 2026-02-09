const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
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
      enum: ["Cash", "Credit Card", "Debit Card", "UPI", "Net Banking", "Other"],
      default: "Cash",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Fast Food",
        "Fruits",
        "Vegetables",
        "Entertainment",
        "Health",
        "Shopping",
        "Education",
        "Rent",
        "Gifts",
        "Subscriptions",
        "Travel",
        "Electricity Bill",
        "Water Bill",
        "Internet Bill",
        "Gas Bill",
        "Fuel",
        "Phone Bill",
        "Groceries Shopping",
        "Other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
