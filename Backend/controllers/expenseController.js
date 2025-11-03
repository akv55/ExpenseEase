const Expense = require("../models/Expense.js");

// Get all expenses for a user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Add a new expense
const addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      category,
      date,
      description,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err });
  }
};

module.exports = { getExpenses, addExpense };