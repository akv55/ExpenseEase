import React, { useState, useEffect } from "react";
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
    MdClose,
    MdTrendingUp,
    MdTrendingDown,
    MdAttachMoney,
} from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { IoPulse } from "react-icons/io5";


const GroupExpenseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showAddExpense, setShowAddExpense] = useState(false);
    const [showSettleModal, setShowSettleModal] = useState(false);
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
        members: [
            { id: 1, name: "You", email: "you@example.com" , phone: "9876543210"},
            { id: 2, name: "Alok Kumar", email: "alok@example.com" , phone: "9123456780"},
            { id: 3, name: "Priya Sharma", email: "priya@example.com" , phone: "9234567891"},
            { id: 4, name: "Ravi Singh", email: "ravi@example.com" , phone: "9345678902"},
            { id: 5, name: "Neha Gupta", email: "neha@example.com" , phone: "9456789013"},
        ],
        totalExpenses: 25450,
        yourShare: 5090,
        createdAt: "2025-11-15",
    };

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
            paidBy: groupDetails.members.find(
                (m) => m.id.toString() === expenseData.paidBy
            ),
            settled: false,
            splitAmong: groupDetails.members.length,
            yourShare: parseFloat(expenseData.amount) / groupDetails.members.length,
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
                                                <FaUsers /> {groupDetails.members.length} members
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt /> Created{" "}
                                                {new Date(groupDetails.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAddExpense(true)}
                                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <FaPlus /> Add Expense
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
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
                            <div className="flex items-center justify-between">
                                <div>
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
                            <div className="flex items-center justify-between">
                                <div>
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
                            <div className="flex items-center justify-between">
                                <div>
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
                                                            {expense.settled && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                                                    <FaCheckCircle /> Settled
                                                                </span>
                                                            )}
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
                                                                {new Date(expense.date).toLocaleDateString()}
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
                                                        <div className="flex gap-2">
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
                                                        </div>
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
                                    <button className="bg-gradient-to-br from-teal-400 to-teal-600 text-white px-2 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex items-center gap-1 text-sm">
                                        <FaPlus /> Add Member</button>
                                </div>
                                <div className="space-y-3">
                                    {groupDetails.members.map((member) => (
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
                                                <p className="text-xs text-gray-500"><span className="flex items-center gap-1"><CgMail /> {member.email}</span></p>
                                                <p className="text-xs text-gray-500"> <span className="flex items-center gap-1"> <FaPhoneAlt />  {member.phone}</span></p>
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
                </div>
            </div>


            {/* Add Expense Modal */}
            {
                showAddExpense && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <FaPlus /> Add New Expense
                                    </h3>
                                    <button
                                        onClick={() => setShowAddExpense(false)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <IoMdClose className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={expenseData.description}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Group dinner at restaurant"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Amount (₹) *
                                        </label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={expenseData.amount}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            step="0.01"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={expenseData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                                            Paid By *
                                        </label>
                                        <select
                                            name="paidBy"
                                            value={expenseData.paidBy}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select member</option>
                                            {groupDetails.members.map((member) => (
                                                <option key={member.id} value={member.id}>
                                                    {member.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={expenseData.date}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Split Type
                                    </label>
                                    <select
                                        name="splitType"
                                        value={expenseData.splitType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="equal">Split Equally</option>
                                        <option value="custom">Custom Split</option>
                                        <option value="percentage">By Percentage</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddExpense(false)}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Add Expense
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Settle Payment Modal */}
            {
                showSettleModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <MdAccountBalance /> Settle Payment
                                    </h3>
                                    <button
                                        onClick={() => setShowSettleModal(false)}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <IoMdClose className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                                    <p className="text-gray-600 mb-2">Amount to settle</p>
                                    <p className="text-4xl font-bold text-orange-600">₹{totalOwe}</p>
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
                                        onClick={() => setShowSettleModal(false)}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Payment settled successfully!");
                                            setShowSettleModal(false);
                                        }}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Confirm Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default GroupExpenseDetails;