const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const protect = require('../middleware/middleware.js');

const {
  createGroupExpense,
  getGroupExpenses,
  getSingleExpense,
  deleteGroupExpense,
  settleGroupExpense,
  removeParticipantFromExpense,
} = require("../controllers/groupExpenseController");

router.post("/create", protect, wrapAsync(createGroupExpense));
router.get("/group/:groupId", protect, wrapAsync(getGroupExpenses));
router.get("/:expenseId", protect, wrapAsync(getSingleExpense));
router.delete("/:expenseId", protect, wrapAsync(deleteGroupExpense));
router.patch("/:expenseId/settle", protect, wrapAsync(settleGroupExpense));
router.patch("/:expenseId/remove-participant", protect, wrapAsync(removeParticipantFromExpense));
module.exports = router;
