const User = require("../models/User.js");
const Income = require("../models/Income.js");
// Get all incomes for a user
const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new income
const addIncome = async (req, res) => {
  const { amount, date, description, category } = req.body;
  try {
    const income = await Income.create({
      userId: req.user.id,
      amount,
      description,
      category,
      date,
    });
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 



module.exports = { getIncomes, addIncome };