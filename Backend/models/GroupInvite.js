const mongoose = require("mongoose");

const groupInviteSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    inviter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invitee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "expired"],
      default: "pending",
    },
    respondedAt: {
      type: Date,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 240,
    },
  },
  { timestamps: true }
);

groupInviteSchema.index(
  { group: 1, invitee: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "pending" },
  }
);

module.exports = mongoose.model("GroupInvite", groupInviteSchema);
