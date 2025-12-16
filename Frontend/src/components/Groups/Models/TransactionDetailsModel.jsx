import React from "react";
import { FaReceipt, FaMoneyBillWave, FaUsers, FaCheckCircle, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { MdEdit, MdAccountBalanceWallet } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const formatDate = (value) => {
	if (!value) return "N/A";
	const date = new Date(value);
	if (Number.isNaN(date)) return "N/A";
	return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const fallbackTransaction = {
	description: "Group Dinner",
	amount: 2450,
	category: "Food",
	date: new Date().toISOString(),
	paidBy: { name: "You" },
	settled: false,
	splitAmong: 4,
	yourShare: 612.5,
	participants: [
		{ name: "You", share: 612.5, status: "paid" },
		{ name: "Alok Kumar", share: 612.5, status: "pending" },
		{ name: "Priya Sharma", share: 612.5, status: "pending" },
		{ name: "Ravi Singh", share: 612.5, status: "pending" },
	],
};

const statusBadge = (settled) =>
	settled ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";

const TransactionDetailsModal = ({
	open,
	transaction,
	onClose,
	onSettle,
	onEdit,
	onDelete,
}) => {
	if (!open) return null;

	const txn = transaction || fallbackTransaction;

	return (
		<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
				<div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white p-6 flex items-start justify-between">
					<div className="space-y-1">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">
							<FaReceipt /> Transaction Details
						</div>
						<h4 className="text-3xl font-bold flex items-center gap-2">
							 {txn.description}
						</h4>
						
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-white/15 transition-colors"
						aria-label="Close"
					>
						<IoMdClose className="text-2xl" />
					</button>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-100 rounded-xl p-4 flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Total Amount</p>
								<p className="text-3xl font-bold text-gray-900">₹{txn.amount}</p>
								<p className="text-xs text-gray-500">Split among {txn.splitAmong} people</p>
							</div>
							<div className="p-3 bg-white rounded-xl shadow-sm text-teal-600">
								<FaMoneyBillWave className="text-2xl" />
							</div>
						</div>
						<div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
							<p className="text-sm text-gray-600">Date</p>
							<div className="flex items-center gap-2 mt-2 text-gray-900 font-semibold">
								<FaCalendarAlt className="text-teal-500" />
								{formatDate(txn.date)}
							</div>
							<span className={`mt-3 inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(txn.settled)}`}>
								{txn.settled ? "Settled" : "Pending"}
							</span>
						</div>
						<div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
							<p className="text-sm text-gray-600">Category</p>
							<p className="text-lg font-semibold text-gray-900 mt-2">{txn.category || "General"}</p>
							<p className="text-xs text-gray-500 mt-1">Paid by: <span className="text-teal-600 bg-teal-100 px-1 py-1 rounded font-semibold uppercase">{txn.paidBy?.name || "Unknown"}</span></p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div className="lg:col-span-2 space-y-4">
							<div className="border border-gray-100 rounded-xl p-4 bg-white">
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-2 text-gray-800 font-semibold">
										<FaUsers className="text-teal-500" /> Split Details
									</div>
									<span className="text-sm text-gray-500">
										Your share: <span className="font-bold text-teal-600">₹{txn.yourShare}</span>
									</span>
								</div>
								<div className="space-y-2 max-h-56 overflow-y-auto pr-1">
									{(txn.participants || []).map((person, idx) => (
										<div
											key={`${person.name}-${idx}`}
											className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-gray-50"
										>
											<div className="flex flex-col">
												<span className="font-semibold text-gray-800">{person.name}</span>
												<span className="text-xs text-gray-500">Owes ₹{person.share}</span>
											</div>
											<span
												className={`text-xs px-3 py-1 rounded-full font-semibold ${
													person.status === "paid"
														? "bg-emerald-100 text-emerald-700"
														: "bg-amber-100 text-amber-700"
												}`}
											>
												{person.status === "paid" ? "Paid" : "Pending"}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-gray-100">
								<div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
									<MdAccountBalanceWallet className="text-teal-500" /> Summary
								</div>
								<ul className="space-y-2 text-sm text-gray-700">
									<li className="flex justify-between"><span>You paid</span><span className="font-semibold">₹{txn.paidBy?.contribution || txn.amount}</span></li>
									<li className="flex justify-between"><span>Your share</span><span className="font-semibold text-teal-600">₹{txn.yourShare}</span></li>
									<li className="flex justify-between"><span>Outstanding</span><span className="font-semibold text-amber-600">{txn.settled ? "₹0" : "₹" + txn.yourShare}</span></li>
								</ul>
							</div>
							<div className="flex flex-col gap-2">
								<button
									onClick={() => onSettle?.(txn)}
									className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all colors cursor-pointer"
								>
									<FaCheckCircle className="inline mr-2" /> Mark as Settled
								</button>
								<div className="grid grid-cols-2 gap-2">
									<button
										onClick={() => onEdit?.(txn)}
										className="px-4 py-3 bg-white border border-teal-200 rounded-xl text-gray-800 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
									>
										<MdEdit className="inline mr-2 text-teal-500" /> Edit
									</button>
									<button
										onClick={() => onDelete?.(txn)}
										className="px-4 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors cursor-pointer"
									>
										<FaTrash className="inline mr-2" /> Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetailsModal;
