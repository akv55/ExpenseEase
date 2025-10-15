const User = require("../models/User.js");
const Expense = require("../models/Income.js");
// Get all incomes for a user
const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new income
const addIncome = async (req, res) => {
  const { amount, source, date, description } = req.body;
  try {
    const income = await Income.create({
      user: req.user.id,
      amount,
      source,
      date,
      description,
    });
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getIncomes, addIncome, deleteIncome };