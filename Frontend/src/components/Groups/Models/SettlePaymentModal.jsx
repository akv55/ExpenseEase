import React from "react";
import { MdAccountBalance } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const SettlePaymentModal = ({ open, amount, onClose, onConfirm }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <MdAccountBalance /> Settle Payment
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                        <p className="text-gray-600 mb-2">Amount to settle</p>
                        <p className="text-4xl font-bold text-orange-600">₹{amount}</p>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Payment Method
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <option>UPI</option>
                            <option>Bank Transfer</option>
                            <option>Cash</option>
                            <option>Credit Card</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Reference / Transaction ID (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter transaction reference"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettlePaymentModal;
