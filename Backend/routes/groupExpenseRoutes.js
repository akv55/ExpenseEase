const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  createGroupExpense,
  getGroupExpenses,
  getSingleExpense,
  deleteGroupExpense,
  settleGroupExpense,
} = require("../controllers/groupExpenseController");

router.post("/create", protect, createGroupExpense);
router.get("/group/:groupId", protect, getGroupExpenses);
router.get("/:expenseId", protect, getSingleExpense);
router.delete("/:expenseId", protect, deleteGroupExpense);
router.patch("/:expenseId/settle", protect, settleGroupExpense);
module.exports = router;
