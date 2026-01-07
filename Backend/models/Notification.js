const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		actor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		title: {
			type: String,
			required: true,
			trim: true,
		},

		message: {
			type: String,
			required: true,
			trim: true,
		},

		type: {
			type: String,
			enum: ["expense", "income", "group", "system", "reminder"],
			default: "system",
		},

		priority: {
			type: String,
			enum: ["low", "normal", "high"],
			default: "normal",
		},

		context: {
			entity: {
				type: String,
				enum: ["expense", "income", "group", "groupExpense", "user", "system"],
			},
			entityId: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},

		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		deliveredVia: {
			type: [String],
			enum: ["in-app", "email", "sms", "push"],
			default: ["in-app"],
		},

		isRead: {
			type: Boolean,
			default: false,
		},

		readAt: {
			type: Date,
		},

		expiresAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

notificationSchema.pre("save", function (next) {
	if (this.isModified("isRead") && this.isRead && !this.readAt) {
		this.readAt = new Date();
	}

	if (this.isModified("isRead") && !this.isRead) {
		this.readAt = undefined;
	}

	next();
});

notificationSchema.methods.markAsRead = async function () {
	if (!this.isRead) {
		this.isRead = true;
		this.readAt = new Date();
		await this.save();
	}

	return this;
};

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

module.exports = mongoose.model("Notification", notificationSchema);