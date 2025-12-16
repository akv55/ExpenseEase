import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const AddGroupExpenseModal = ({
    open,
    expenseData,
    onChange,
    onClose,
    onSubmit,
    categories,
    members,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <FaPlus /> Add New Expense
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 outline-none">
                            Title <sman className="text-red-600">*</sman>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={expenseData.description}
                            onChange={onChange}
                            placeholder="e.g., Group dinner at restaurant"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 outline-none">
                            Description <sman className="text-red-600">*</sman>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={expenseData.description}
                            onChange={onChange}
                            placeholder="e.g., Group dinner at restaurant"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Amount (₹) <sman className="text-red-600">*</sman>
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={expenseData.amount}
                                onChange={onChange}
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <sman className="text-red-600">*</sman>
                            </label>
                            <select
                                name="category"
                                value={expenseData.category}
                                onChange={onChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Paid By <sman className="text-red-600">*</sman>
                            </label>
                            <select
                                name="paidBy"
                                value={expenseData.paidBy}
                                onChange={onChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                required
                            >
                                <option value="">Select member</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date <sman className="text-red-600">*</sman>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={expenseData.date}
                                onChange={onChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Split Type <sman className="text-red-600">*</sman>
                        </label>
                        <select
                            name="splitType"
                            value={expenseData.splitType}
                            onChange={onChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                        >
                            <option value="equal">Split Equally</option>
                            <option value="custom">Custom Split</option>
                            <option value="percentage">By Percentage</option>
                        </select>
                    </div>

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
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGroupExpenseModal;
