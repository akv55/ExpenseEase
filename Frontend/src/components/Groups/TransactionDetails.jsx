import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import { FaReceipt, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaCheckCircle, FaTrash, FaRegCopy } from "react-icons/fa";
import { MdAccountBalanceWallet, MdEdit } from "react-icons/md";
import { useGroupExpense } from "../../context/groupExpenseContext";
import { useAuth } from "../../context/authContext";

const TransactionDetails = () => {
	const { groupId, expenseId } = useParams();
	const navigate = useNavigate();
	const { groupExpenses, loading, getGroupExpenses } = useGroupExpense();
	const { user } = useAuth();
	const [expense, setExpense] = useState(null);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const formatDate = (dateStr) => {
		if (!dateStr) return "N/A";
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateStr).toLocaleDateString(undefined, options);
	};

	useEffect(() => {
		const loadData = async () => {
			if (groupId) {
				await getGroupExpenses(groupId);
				setIsInitialLoad(false);
			}
		};
		loadData();
	}, [groupId]);

	useEffect(() => {
		if (groupExpenses && expenseId) {
			const foundExpense = groupExpenses.find(
				(exp) => String(exp._id || exp.id) === String(expenseId)
			);
			setExpense(foundExpense || null);
		}
	}, [groupExpenses, expenseId]);

	const txn = expense ? {
		_id: expense._id || expense.id,
		transactionId: expense.transactionId || "N/A",
		title: expense.title || "Expense",
		amount: Number(expense.amount) || 0,
		description: expense.description || "",
		splitAmong: expense.participants?.length || 0,
		date: expense.date || expense.createdAt,
		settled: expense.settled || false,
		category: expense.category || "General",
		paidBy: {
			name: expense.paidBy?.name || expense.paidBy?.email || "Unknown",
			contribution: Number(expense.amount) || 0
		},
		yourShare: (() => {
			const participant = (expense.participants || []).find(
				(p) => String(p?.user?._id ?? p?.user) === String(user?._id)
			);
			return Number(participant?.shareAmount) || 0;
		})(),
		participants: (expense.participants || []).map((p) => ({
			name: p?.user?.name || p?.user?.email || "Unknown",
			share: Number(p?.shareAmount) || 0,
			status: expense.settled ? "paid" : "pending"
		}))
	} : null;
	const statusBadge = (settled) => {
		return settled
			? "bg-emerald-100 text-emerald-700"
			: "bg-amber-100 text-amber-700";
	};

	/* -------- Loading -------- */
	if (isInitialLoad && !expense) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center max-w-7xl mx-auto group-container">
					<div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4">
					</div>
					<h3 className="text-xl font-semibold text-teal-600">Loading
						<span className="animate-pulse">.</span><span className="animate-pulse delay-150">.</span><span className="animate-pulse delay-300">.</span>
					</h3>
					<p>Please wait while we fetch your data.</p>
				</div>
			</div>
		);
	}

	if (!txn) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center max-w-7xl mx-auto group-container">
					<h3 className="text-xl font-semibold text-red-600">Expense not found</h3>
					<p className="text-gray-600 mt-2">The requested expense could not be found.</p>
					<button
						onClick={() => navigate(`/group-expense-details/${groupId}`)}
						className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
					>
						Back to Group
					</button>
				</div>
			</div>
		);
	}


	return (
		<div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 transition-colors duration-300">
			<Sidebar />
			<div className="md:ml-64 ml-0 p-4 md:p-8">
				<div className="max-w-7xl mx-auto group-container">
					<div className="bg-white w-full max-w-7xl rounded-2xl  overflow-hidden">
						<div className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white p-6 flex items-start justify-between">
							<div className="space-y-1">
								<div className="flex justify-between items-center gap-4 mb-2 transactionDeations">
									<div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">
										<FaReceipt /> Transaction Details
									</div>
									<div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">
										<p className="flex gap-2">Transaction ID :<span className=""> {txn.transactionId}</span> <FaRegCopy className="cursor-pointer" /></p>
									</div>
								</div>
								<h4 className="text-3xl font-bold flex items-center gap-2">
									{txn.title}
								</h4>

							</div>

						</div>

						<div className="p-6 space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-100 rounded-xl p-4 flex items-center justify-between">
									<div>
										<p className="text-sm text-gray-600">Total Amount</p>
										<p className="text-3xl font-bold text-gray-900">₹{txn.amount || "0"}</p>
										<p className="text-xs text-gray-500">Split among {txn.splitAmong || "0"} people</p>
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
									{/* <span className={`mt-3 inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(txn.settled)}`}>
										{txn.settled ? "Settled" : "Pending"}
									</span> */}
								</div>
								<div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
									<p className="text-sm text-gray-600">Category</p>
									<p className="text-lg font-semibold text-gray-900 mt-2">{txn.category || "General"}</p>
									<p className="text-xs text-gray-500 mt-1">Paid by: <span className="text-teal-600 bg-teal-100 px-2 border rounded-full font-semibold uppercase">{txn.paidBy?.name || "Unknown"}</span></p>
								</div>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
													<div className="flex flex-row items-center gap-3 justify-between w-full">
														<span className="font-semibold text-gray-800">{person.name || "Unknown"}</span>
														<span className="text-xs text-gray-500">Owes ₹{person.share || "0"}</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								<div className="space-y-4 h-">
									<div className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-gray-100">
										<div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
											<MdAccountBalanceWallet className="text-teal-500" /> Description
										</div>
										<p className="p-2 text-sm text-gray-600 bg-white/100 rounded-lg ">
											{txn.description || "No description provided for this expense."}
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-gray-100">
										<div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
											<MdAccountBalanceWallet className="text-teal-500" /> Summary
										</div>

										<ul className="space-y-2 text-sm text-gray-700 bg-white/100 p-3 rounded-lg">
											<li className="flex justify-between"><span>You paid</span><span className="font-semibold">₹{txn.paidBy?.contribution || txn.amount}</span></li>
											<li className="flex justify-between"><span>Your share</span><span className="font-semibold text-teal-600">₹{txn.yourShare}</span></li>
											<li className="flex justify-between"><span>Outstanding</span><span className="font-semibold text-amber-600">{txn.settled ? "₹0" : "₹" + txn.yourShare}</span></li>
										</ul>
									</div>
									{/* Show Edit/Delete buttons only if current user is the one who paid */}
									{(expense?.paidBy?._id === user?._id || expense?.paidBy?.id === user?._id || expense?.paidBy === user?._id) && (
										<div className="flex flex-col gap-2">
											{/* <button
												onClick={() => onSettle?.(txn)}
												className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all colors cursor-pointer"
											>
												<FaCheckCircle className="inline mr-2" /> Mark as Settled
											</button> */}
											<div className="grid grid-cols-2 gap-2">
												<button
													// onClick={() => onEdit?.(txn)}
													className="px-3 py-2 bg-white border border-teal-200 rounded-xl text-gray-800 font-semibold hover:bg-teal-50 transition-colors cursor-pointer"
												>
													<MdEdit className="inline mr-2 text-teal-500" /> Edit
												</button>
												<button
													// onClick={() => onDelete?.(txn)}
													className="px-3 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors cursor-pointer"
												>
													<FaTrash className="inline mr-2" /> Delete
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
};

export default TransactionDetails;