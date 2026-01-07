const Group = require("../models/Group");
const GroupExpense = require("../models/GroupExpense");

/* -------------------------------------------------
   CREATE GROUP EXPENSE
-------------------------------------------------- */
exports.createGroupExpense = async (req, res) => {
  try {
    const {
      groupId,
      title,
      description,
      amount,
      category,
      splitType = "equal",
      participants,
      paidBy,
    } = req.body;

    const amountValue = Number(amount);

    if (
      !groupId ||
      !title ||
      !description ||
      !Number.isFinite(amountValue) ||
      amountValue <= 0 ||
      !category ||
      !paidBy
    ) {
      return res.status(400).json({
        message: "Missing or invalid required fields",
      });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    let normalizedParticipants = [];

    if (Array.isArray(participants)) {
      normalizedParticipants = participants
        .map((participant) => {
          const userId = participant?.user || participant?.userId || participant?.id;
          const shareAmount = Number(participant?.shareAmount ?? participant?.amount);
          if (!userId || !Number.isFinite(shareAmount)) {
            return null;
          }
          return {
            user: userId,
            shareAmount,
            status: participant?.status === "paid" ? "paid" : "pending",
          };
        })
        .filter(Boolean);
    } else if (participants && typeof participants === "object") {
      normalizedParticipants = Object.entries(participants)
        .map(([userId, shareAmount]) => {
          const numericShare = Number(shareAmount);
          if (!userId || !Number.isFinite(numericShare)) {
            return null;
          }
          return {
            user: userId,
            shareAmount: numericShare,
            status: "pending",
          };
        })
        .filter(Boolean);
    }

    if (!normalizedParticipants.length) {
      return res.status(400).json({
        message: "Participants are required",
      });
    }

    const totalShares = normalizedParticipants.reduce(
      (sum, participant) => sum + participant.shareAmount,
      0
    );
    const roundedShares = Math.round(totalShares * 100) / 100;
    const roundedAmount = Math.round(amountValue * 100) / 100;

    if (roundedShares !== roundedAmount) {
      return res.status(400).json({
        message: "Participant shares must equal the total amount",
      });
    }

    const expense = await GroupExpense.create({
      groupId,
      title,
      description,
      amount: amountValue,
      category,
      splitType,
      paidBy,
      participants: normalizedParticipants,
    });

    await Group.findByIdAndUpdate(groupId, {
      $inc: { totalExpense: amountValue },
    });

    res.status(201).json({
      message: "Group expense added successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add group expense",
    });
  }
};

/* -------------------------------------------------
   GET ALL EXPENSES BY GROUP
-------------------------------------------------- */
exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await GroupExpense.find({ groupId })
      .populate("paidBy", "name email")
      .populate("participants.user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

/* -------------------------------------------------
   GET SINGLE EXPENSE
-------------------------------------------------- */
exports.getSingleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await GroupExpense.findById(expenseId)
      .populate("paidBy", "name email")
      .populate("participants.user", "name email");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expense" });
  }
};

/* -------------------------------------------------
   DELETE EXPENSE
-------------------------------------------------- */
exports.deleteGroupExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await GroupExpense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Rollback group total
    await Group.findByIdAndUpdate(expense.groupId, {
      $inc: { totalExpense: -expense.amount },
    });

    await expense.deleteOne();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};

/* -------------------------------------------------
   SETTLE EXPENSE
-------------------------------------------------- */
exports.settleGroupExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await GroupExpense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.settled = true;

    // Mark all participants as paid
    expense.participants = expense.participants.map((p) => ({
      ...p.toObject(),
      status: "paid",
    }));

    await expense.save();

    res.status(200).json({
      message: "Expense settled successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to settle expense" });
  }
};

// remove member in group

exports.removeParticipantFromExpenses = async (groupId, userId) => {
  try {
    const expenses = await GroupExpense.find({ groupId });

    for (const expense of expenses) {
      const originalParticipantCount = expense.participants.length;
      expense.participants = expense.participants.filter(
        (participant) => participant.user.toString() !== userId
      );
      if (expense.participants.length < originalParticipantCount) {
        await expense.save();
      }
    }
  } catch (error) {
    console.error("Error removing member from expenses:", error);
  }   
};