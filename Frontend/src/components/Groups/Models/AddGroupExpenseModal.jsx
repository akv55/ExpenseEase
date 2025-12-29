import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useGroupExpense } from "../../../context/groupExpenseContext";
import { useGroup } from "../../../context/groupContext";
import { useAuth } from "../../../context/authContext";

const categories = [
    "Food",
    "Restaurant",
    "Groceries",
    "Travel",
    "Cab",
    "Fuel",
    "Rent",
    "Electricity",
    "Water",
    "Internet",
    "Movie",
    "Party",
    "Shopping",
    "Medical",
    "Education",
    "Gift",
    "Group Contribution",
    "Other"
];

const AddGroupExpenseModal = ({
    open,
    onClose,
    groupId,
    onSuccess,
}) => {
    const { user } = useAuth();
    const { fetchGroupById } = useGroup();
    const { addGroupExpense } = useGroupExpense();

    const [membersList, setMembersList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        category: "",
        splitType: "equal",
    });
    const { title, description, amount, category, paidBy } = formData;

    const [customShares, setCustomShares] = useState({});

    useEffect(() => {
        if (!open) return;
        setFormData({
            title: "",
            description: "",
            amount: "",
            category: "",
            splitType: "equal",
        });
        setCustomShares({});
        setError(null);
        setHasAttemptedSubmit(false);
    }, [open, user?._id]);

    useEffect(() => {
        if (!open || !groupId) {
            setMembersList([]);
            return;
        }

        const loadMembers = async () => {
            try {
                const group = await fetchGroupById(groupId);
                setMembersList(Array.isArray(group?.members) ? group.members : []);
            } catch (e) {
                setMembersList([]);
            }
        };

        loadMembers();
    }, [open, groupId, fetchGroupById]);

    useEffect(() => {
        if (!open || !membersList.length) return;
        const currentUserId = user?._id;
        const fallback = membersList.find((m) => String(m?._id ?? m?.id) === String(currentUserId))
            || membersList[0];
        if (fallback) {
            const memberId = fallback?._id ?? fallback?.id;
            if (memberId) {
                setFormData((prev) => ({ ...prev, paidBy: memberId }));
            }
        }
    }, [open, membersList, user?._id, formData.paidBy]);

    const memberCount = membersList.length;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);
        if (!description || !amount || !category || !title) {
            setError("Please fill out all required fields.");
            return;
        }

        if (!paidBy) {
            setError("Select who paid for this expense.");
            return;
        }

        if (!groupId) {
            setError("No group selected.");
            return;
        }

        if (!membersList.length) {
            setError("This group has no members yet.");
            return;
        }

        const amountNumber = Number(amount);
        if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        let participants = [];
        if (formData.splitType === "custom") {
            const roundedSum = Math.round(Object.values(customShares).reduce((sum, value) => {
                const n = Number(value);
                return sum + (Number.isFinite(n) ? n : 0);
            }, 0) * 100) / 100;
            const roundedAmount = Math.round(amountNumber * 100) / 100;
            if (roundedSum !== roundedAmount) {
                setError("Custom split total must match the amount.");
                return;
            }
            participants = membersList
                .map((member) => {
                    const memberId = member?._id ?? member?.id;
                    if (!memberId) return null;
                    const shareAmount = Number(customShares[String(memberId)]);
                    return {
                        user: memberId,
                        shareAmount: Number.isFinite(shareAmount) ? shareAmount : 0,
                        status: "pending",
                    };
                })
                .filter(Boolean);
        } else {
            const baseShare = amountNumber / membersList.length;
            participants = membersList
                .map((member, index) => {
                    const memberId = member?._id ?? member?.id;
                    if (!memberId) return null;
                    let shareAmount = baseShare;
                    if (index === membersList.length - 1) {
                        const assigned = baseShare * (membersList.length - 1);
                        shareAmount = amountNumber - assigned;
                    }
                    return {
                        user: memberId,
                        shareAmount,
                        status: "pending",
                    };
                })
                .filter(Boolean);
        }

        const payload = {
            groupId,
            title,
            description,
            amount: amountNumber,
            category,
            splitType: formData.splitType,
            paidBy,
            participants,
        };
        setLoading(true);
        try {
            await addGroupExpense(payload);
            onSuccess?.();
            onClose?.();
        } catch (error) {
            console.error("Error adding group expense:", error);
            setError(error?.response?.data?.message || "Failed to add group expense.");
        } finally {
            setLoading(false);
        }
    };
    const amountNumber = useMemo(() => Number(formData.amount) || 0, [formData.amount]);
    const equalShare = useMemo(
        () => (memberCount > 0 ? amountNumber / memberCount : 0),
        [amountNumber, memberCount]
    );

    const customSum = useMemo(() => {
        return Object.values(customShares).reduce((sum, v) => {
            const n = Number(v);
            return sum + (Number.isFinite(n) ? n : 0);
        }, 0);
    }, [customShares]);

    const handleCustomShareChange = (memberId, value) => {
        setCustomShares((prev) => ({ ...prev, [String(memberId)]: value }));
        if (error) setError(null);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSplitTypeChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, splitType: value }));
        setCustomShares({});
        if (error) setError(null);
    };

    if (!open) return null;


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <FaPlus /> Add New Expense
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                        >
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Title <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Group dinner "
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Amount (₹) <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className=" w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descriptions <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            placeholder="e.g., Group Dinner at  Restaurant"
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Split Type <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="splitType"
                                value={formData.splitType}
                                onChange={handleSplitTypeChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            >
                                <option value="equal">Split Equally</option>
                                <option value="custom">Custom Split</option>
                            </select>
                        </div>
                    </div>


                    {/* Split details */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        {formData?.splitType === "custom" ? (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-800">Custom split</p>
                                    <p className={`text-sm font-semibold ${Math.round(customSum * 100) / 100 === Math.round(amountNumber * 100) / 100 ? "text-green-700" : "text-red-600"}`}>
                                        Total: ₹{customSum.toFixed(2)} / ₹{amountNumber.toFixed(2)}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {(membersList || []).map((m) => {
                                        const memberId = m?._id ?? m?.id;
                                        const memberName = m?.name ?? m?.email ?? "Member";
                                        if (memberId == null) return null;
                                        return (
                                            <div key={memberId} className="flex items-center justify-between gap-3">
                                                <span className="text-sm text-gray-700 truncate">{memberName}</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={customShares[String(memberId)] ?? ""}
                                                    onChange={(e) => handleCustomShareChange(memberId, e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-800">Split equally</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {memberCount ? `₹${equalShare.toFixed(2)} each (${memberCount} members)` : "No members"}
                                </p>
                            </div>
                        )}
                    </div>
                    {hasAttemptedSubmit && error && (
                        <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                            <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                        </div>
                    )}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGroupExpenseModal;