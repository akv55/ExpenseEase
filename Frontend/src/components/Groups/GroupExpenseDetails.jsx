import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import {
    FaUsers,
    FaPlus,
    FaReceipt,
    FaArrowLeft,
    FaCheckCircle,
    FaMoneyBillWave,
    FaEdit,
    FaTrash,
    FaUserFriends,
    FaCalendarAlt,
    FaFilter,
    FaChartPie,
    FaPhoneAlt,
} from "react-icons/fa";
import {
    MdAccountBalance,
    MdPerson,
    MdTrendingUp,
    MdTrendingDown,
} from "react-icons/md";
import { CgMail } from "react-icons/cg";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import AddExpenseModal from "./Models/AddExpenseModal";
import SettlePaymentModal from "./Models/SettlePaymentModal";
import AddMembersModal from "./Models/AddMembersModel";
import TransactionDetailsModal from "./Models/TransactionDetailsModel";


const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date)) return "N/A";
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};


const GroupExpenseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showAddExpense, setShowAddExpense] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showSettleModal, setShowSettleModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterSettled, setFilterSettled] = useState("all");
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: "",
        paidBy: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        splitType: "equal",
        participants: [],
    });

    // Sample group data - replace with API call
    const groupDetails = {
        id: id || "1",
        name: "Trip to Goa",
        description: "Beach vacation with college friends",
        owner: { id: 1, name: "You", email: "you@example.com" },
        members: [
            { id: 1, name: "You", email: "you@example.com", phone: "9876543210" },
            { id: 2, name: "Alok Kumar", email: "alok@example.com", phone: "9123456780" },
            { id: 3, name: "Priya Sharma", email: "priya@example.com", phone: "9234567891" },
            { id: 4, name: "Ravi Singh", email: "ravi@example.com", phone: "9345678902" },
            { id: 5, name: "Neha Gupta", email: "neha@example.com", phone: "9456789013" },
        ],
        totalExpenses: 25450,
        yourShare: 5090,
        createdAt: "2025-11-15",
    };

    const [members, setMembers] = useState(groupDetails.members);

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            description: "Hotel Booking",
            amount: 12000,
            paidBy: { id: 1, name: "You" },
            category: "Accommodation",
            date: "2025-12-01",
            settled: false,
            splitAmong: 5,
            yourShare: 2400,
        },
        {
            id: 2,
            description: "Flight Tickets",
            amount: 8500,
            paidBy: { id: 2, name: "Alok Kumar" },
            category: "Travel",
            date: "2025-11-28",
            settled: true,
            splitAmong: 5,
            yourShare: 1700,
        },
        {
            id: 3,
            description: "Beach Activities",
            amount: 3500,
            paidBy: { id: 3, name: "Priya Sharma" },
            category: "Entertainment",
            date: "2025-12-02",
            settled: false,
            splitAmong: 4,
            yourShare: 875,
        },
        {
            id: 4,
            description: "Group Dinner",
            amount: 2450,
            paidBy: { id: 1, name: "You" },
            category: "Food",
            date: "2025-12-03",
            settled: false,
            splitAmong: 5,
            yourShare: 490,
            participants: [
                { name: "You", share: 490, status: "paid" },
                { name: "Alok Kumar", share: 490, status: "pending" },
                { name: "Priya Sharma", share: 490, status: "pending" },
                { name: "Ravi Singh", share: 490, status: "pending" },
                { name: "Neha Gupta", share: 490, status: "pending" },
            ],
        },
        {
            id: 5,
            description: "Car Rental",
            amount: 4500,
            paidBy: { id: 4, name: "Ravi Singh" },
            category: "Travel",
            date: "2025-12-01",
            settled: true,
            splitAmong: 5,
            yourShare: 900,
        },
    ]);

    const [balances, setBalances] = useState([
        { person: "Alok Kumar", amount: 850, type: "owes" },
        { person: "Priya Sharma", amount: 1200, type: "owes" },
        { person: "Ravi Singh", amount: 650, type: "owe" },
        // { person: "Neha Gupta", amount: 425, type: "owes" },
    ]);

    // Calculate statistics
    const totalOwed = balances
        .filter((b) => b.type === "owes")
        .reduce((sum, b) => sum + b.amount, 0);
    const totalOwe = balances
        .filter((b) => b.type === "owe")
        .reduce((sum, b) => sum + b.amount, 0);
    const settledCount = expenses.filter((e) => e.settled).length;
    const pendingCount = expenses.filter((e) => !e.settled).length;

    // Category breakdown for charts
    const categoryData = expenses.reduce((acc, exp) => {
        const existing = acc.find((item) => item.name === exp.category);
        if (existing) {
            existing.value += exp.amount;
        } else {
            acc.push({ name: exp.category, value: exp.amount });
        }
        return acc;
    }, []);

    const COLORS = [
        "#06b6d4",
        "#8b5cf6",
        "#ec4899",
        "#f59e0b",
        "#10b981",
        "#ef4444",
    ];

    const handleInputChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: expenses.length + 1,
            ...expenseData,
            amount: parseFloat(expenseData.amount),
            paidBy: members.find(
                (m) => m.id.toString() === expenseData.paidBy
            ),
            settled: false,
            splitAmong: members.length,
            yourShare: parseFloat(expenseData.amount) / members.length,
        };
        setExpenses([...expenses, newExpense]);
        setShowAddExpense(false);
        setExpenseData({
            description: "",
            amount: "",
            paidBy: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
            splitType: "equal",
            participants: [],
        });
    };

    const handleDeleteExpense = (expenseId) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            setExpenses(expenses.filter((e) => e.id !== expenseId));
        }
    };

    const handleSettleExpense = (expenseId) => {
        setExpenses(
            expenses.map((e) => (e.id === expenseId ? { ...e, settled: true } : e))
        );
    };

    const handleSettleConfirm = () => {
        alert("Payment settled successfully!");
        setShowSettleModal(false);
    };

    const handleAddMembersSave = (newMembers) => {
        setMembers((prev) => [...prev, ...newMembers]);
        setShowAddMemberModal(false);
    };

    const filteredExpenses = expenses.filter((expense) => {
        const categoryMatch =
            filterCategory === "all" || expense.category === filterCategory;
        const settledMatch =
            filterSettled === "all" ||
            (filterSettled === "settled" && expense.settled) ||
            (filterSettled === "pending" && !expense.settled);
        return categoryMatch && settledMatch;
    });

    const categories = [
        "Food",
        "Travel",
        "Accommodation",
        "Entertainment",
        "Utilities",
        "Other",
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
                <Sidebar />
                <div className="ml-64 p-4 md:p-8 mt-16 md:mt-0 group-expense-details">
                    {/* Header with Back Button */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                        >
                            <FaArrowLeft /> Back to Groups
                        </button>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-4 rounded-xl">
                                        <FaUserFriends className="text-white text-3xl" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                            {groupDetails.name}
                                        </h1>
                                        <p className="text-gray-600 mt-1">
                                            {groupDetails.description}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <FaUsers className="text-purple-500" />  members:&nbsp;{members.length}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-blue-500" /> Created:{" "}
                                                {formatDate(groupDetails.createdAt)}
                                            </span>
                                            <span className="flex items-center gap-1 md:inline-flex hidden">
                                                <MdPerson className="text-teal-500" /> Owner: <span className="bg-blue-200 px-2 py-1 text-blue-500 rounded-l-full rounded-r-full font-semibold">{groupDetails.owner?.name}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2  text-sm text-gray-500 lg:hidden">
                                            <MdPerson className="text-teal-500" /> Owner: <span className="bg-blue-200 px-2 py-1 text-blue-500 rounded-l-full rounded-r-full font-semibold">{groupDetails.owner?.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAddExpense(true)}
                                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl isPhone"
                                >
                                    <FaPlus /> Add Expense
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 ">
                        <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between GroupStatsCards">
                                <div className="GroupStatsCards-info">
                                    <p className="text-gray-600 text-sm font-medium mb-1">
                                        Total Expenses
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ₹{groupDetails.totalExpenses}
                                    </p>
                                    <p className="text-blue-600 text-xs mt-2">
                                        {expenses.length} transactions
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl backdrop-blur-sm">
                                    <FaReceipt className="text-2xl text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between GroupStatsCards">
                                <div className="GroupStatsCards-info">
                                    <p className="text-gray-600 text-sm font-medium mb-1">
                                        Your Share
                                    </p>
                                    <p className="text-2xl font-bold">₹{groupDetails.yourShare}</p>
                                    <p className="text-purple-600 text-xs mt-2">
                                        {((groupDetails.yourShare / groupDetails.totalExpenses) * 100).toFixed(1)}% of total
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-xl backdrop-blur-sm">
                                    <MdPerson className="text-2xl text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between GroupStatsCards">
                                <div className="GroupStatsCards-info">
                                    <p className="text-gray-600 text-sm font-medium mb-1">
                                        You're Owed
                                    </p>
                                    <p className="text-2xl font-bold">₹{totalOwed}</p>
                                    <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                                        <MdTrendingUp /> From {balances.filter((b) => b.type === "owes").length} members
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl backdrop-blur-sm">
                                    <FaMoneyBillWave className="text-2xl text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between GroupStatsCards">
                                <div className="GroupStatsCards-info">
                                    <p className="text-gray-600 text-sm font-medium mb-1">
                                        You Owe
                                    </p>
                                    <p className="text-2xl font-bold">₹{totalOwe}</p>
                                    <p className="text-orange-600 text-xs mt-2 flex items-center gap-1">
                                        <MdTrendingDown /> To {balances.filter((b) => b.type === "owe").length} members
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-xl backdrop-blur-sm">
                                    <MdAccountBalance className="text-2xl text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Expenses List */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Filters */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaFilter className="inline mr-2" />
                                            Category
                                        </label>
                                        <select
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        >
                                            <option value="all">All Categories</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={filterSettled}
                                            onChange={(e) => setFilterSettled(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="settled">Settled</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Expenses List */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-blue-50 p-3 rounded-xl backdrop-blur-sm">
                                        <FaReceipt className="text-2xl text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        Transactions
                                    </h2>
                                    {/* <div className="flex gap-2 text-sm">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                            {settledCount} Settled
                                        </span>
                                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                                            {pendingCount} Pending
                                        </span>
                                    </div> */}
                                </div>

                                {filteredExpenses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaReceipt className="text-gray-300 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No expenses found</p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            Try adjusting your filters or add a new expense
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredExpenses.map((expense) => (
                                            <div
                                                key={expense.id}
                                                className="border-2 border-gray-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                                                                {expense.category}
                                                            </span>
                                                            {/* {expense.settled && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                                                    <FaCheckCircle /> Settled
                                                                </span>
                                                            )} */}
                                                        </div>
                                                        <h4 className="font-bold text-lg text-gray-800 mb-1">
                                                            {expense.description}
                                                        </h4>
                                                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-600">
                                                            <span className="flex items-center gap-1">
                                                                <MdPerson className="text-teal-500" />
                                                                Paid by {expense.paidBy.name}
                                                            </span>
                                                            <span className="hidden md:inline">•</span>
                                                            <span className="flex items-center gap-1">
                                                                <FaCalendarAlt className="text-blue-500" />
                                                                {formatDate(expense.date)}
                                                            </span>
                                                            <span className="hidden md:inline">•</span>
                                                            <span className="flex items-center gap-1">
                                                                <FaUsers className="text-purple-500" />
                                                                Split {expense.splitAmong} ways
                                                            </span>
                                                        </div>
                                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-600">
                                                                    Your share:
                                                                </span>
                                                                <span className="font-bold text-teal-600">
                                                                    ₹{expense.yourShare}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex flex-col items-end gap-3">
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                ₹{expense.amount}
                                                            </p>
                                                        </div>
                                                        {/* <div className="flex gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedExpense(expense);
                                                                    setShowTransactionModal(true);
                                                                }}
                                                                className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors"
                                                                title="View details"
                                                            >
                                                                <FaReceipt />
                                                            </button>
                                                            {!expense.settled && (
                                                                <button
                                                                    onClick={() => handleSettleExpense(expense.id)}
                                                                    className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                                                                    title="Mark as settled"
                                                                >
                                                                    <FaCheckCircle />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedExpense(expense);
                                                                    setShowEditModal(true);
                                                                }}
                                                                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                                                                title="Edit expense"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteExpense(expense.id)}
                                                                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                                                                title="Delete expense"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-1 space-y-6 scrollbar-thin">
                            {/* Balances */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <MdAccountBalance className="text-blue-500" />
                                    Balances
                                </h2>
                                <div className="space-y-3">
                                    {balances.map((balance, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-xl border-2 ${balance.type === "owes"
                                                ? "bg-green-50 border-green-200"
                                                : "bg-orange-50 border-orange-200"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-800">
                                                    {balance.person}
                                                </span>
                                                <span
                                                    className={`text-lg font-bold ${balance.type === "owes"
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                        }`}
                                                >
                                                    ₹{balance.amount}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {balance.type === "owes" ? "Owes you" : "You owe"}
                                            </p>
                                            {balance.type === "owe" && (
                                                <button
                                                    onClick={() => setShowSettleModal(true)}
                                                    className="mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300"
                                                >
                                                    Settle Up
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Group Members */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="mb-4 flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <FaUserFriends className="text-purple-500" />
                                        Members
                                    </h2>
                                    <button
                                        onClick={() => setShowAddMemberModal(true)}
                                        className="bg-gradient-to-br from-teal-400 to-teal-600 text-white px-2 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex items-center gap-1 text-sm"
                                    >
                                        <FaPlus /> Add Member
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">
                                                    {member.name}
                                                </p>
                                                <p className="text-xs text-gray-500 flex flex-row"><span className="flex items-center gap-1"><CgMail className="text-blue-500" /> {member.email}</span>
                                                    <span className="flex items-center gap-1"> &nbsp; <FaPhoneAlt className="text-green-500" />  {member.phone}</span></p>
                                            </div>
                                            <div className="p-2  hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer" title="Remove member">
                                                <FaTrash />
                                            </div>


                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Category Breakdown Chart */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <FaChartPie className="text-pink-500" />
                                    Category Breakdown
                                </h2>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) =>
                                                `${name}: ${(percent * 100).toFixed(0)}%`
                                            }
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-4 space-y-2">
                                    {categoryData.map((cat, index) => (
                                        <div
                                            key={cat.name}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className="text-gray-700">{cat.name}</span>
                                            </div>
                                            <span className="font-semibold text-gray-800">
                                                ₹{cat.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile floating Add Expense button */}
                    <button
                        onClick={() => setShowAddExpense(true)}
                        className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-4 rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-2xl"
                        aria-label="Add expense"
                    >
                        <FaPlus />
                    </button>

                </div>

            </div>


            <AddExpenseModal
                open={showAddExpense}
                expenseData={expenseData}
                onChange={handleInputChange}
                onClose={() => setShowAddExpense(false)}
                onSubmit={handleSubmit}
                categories={categories}
                members={members}
            />

            <SettlePaymentModal
                open={showSettleModal}
                amount={totalOwe}
                onClose={() => setShowSettleModal(false)}
                onConfirm={handleSettleConfirm}
            />

            <AddMembersModal
                open={showAddMemberModal}
                onClose={() => setShowAddMemberModal(false)}
                onSave={handleAddMembersSave}
                existingMembers={members}
            />

            <TransactionDetailsModal
                open={showTransactionModal}
                transaction={selectedExpense}
                onClose={() => setShowTransactionModal(false)}
                onSettle={(txn) => {
                    if (txn?.id) handleSettleExpense(txn.id);
                    setShowTransactionModal(false);
                }}
                onEdit={(txn) => {
                    setSelectedExpense(txn);
                    setShowEditModal(true);
                    setShowTransactionModal(false);
                }}
                onDelete={(txn) => {
                    if (txn?.id) handleDeleteExpense(txn.id);
                    setShowTransactionModal(false);
                }}
            />
        </>
    );
};

export default GroupExpenseDetails;