const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  createGroupExpense,
  getGroupExpenses,
  getSingleExpense,
  deleteGroupExpense,
  settleGroupExpense,
} = require("../controllers/groupExpenseController");

router.post("/create", protect, wrapAsync(createGroupExpense));
router.get("/group/:groupId", protect, wrapAsync(getGroupExpenses));
router.get("/:expenseId", protect, wrapAsync(getSingleExpense));
router.delete("/:expenseId", protect, wrapAsync(deleteGroupExpense));
router.patch("/:expenseId/settle", protect, wrapAsync(settleGroupExpense));
module.exports = router;
