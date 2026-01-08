import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import {
    FaUsers,
    FaPlus,
    FaReceipt,
    FaMoneyBillWave,
    FaTrash,
    FaUserFriends,
    FaCalendarAlt,
    FaFilter,
    FaChartPie,
    FaPhoneAlt,
    FaInfoCircle,
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
import AddGroupExpenseModal from "./Models/AddGroupExpenseModal";
import SettlePaymentModal from "./Models/SettlePaymentModal";
import AddMembersModal from "./Models/AddMembersModel";
import { useGroup } from "../../context/groupContext";
import { useGroupExpense } from "../../context/groupExpenseContext";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";


const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date)) return "N/A";
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};


const GroupExpenseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [showAddGroupExpense, setShowAddGroupExpense] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showSettleModal, setShowSettleModal] = useState(false);
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterMember, setFilterMember] = useState("all");
    const { fetchGroupById } = useGroup();
    const { groupExpenses, loading: expensesLoading, getGroupExpenses } = useGroupExpense();
    const { user } = useAuth();

    const [groupDetails, setGroupDetails] = useState(null);
    const [members, setMembers] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);

    const ownerName = useMemo(() => {
        if (!groupDetails?.owner) return "N/A";
        if (typeof groupDetails.owner === "object") {
            return groupDetails.owner.name || groupDetails.owner.email || "N/A";
        }
        const ownerFromMembers = members.find(
            (member) => String(member?._id ?? member?.id ?? member) === String(groupDetails.owner)
        );
        return ownerFromMembers?.name || ownerFromMembers?.email || "N/A";
    }, [groupDetails, members]);

    useEffect(() => {
        if (!id) return;
        const loadData = async () => {
            try {
                setError(null);
                setPageLoading(true);
                const group = await fetchGroupById(id);
                setGroupDetails(group);
                setMembers(Array.isArray(group?.members) ? group.members : []);
                await getGroupExpenses(id);
            } catch (err) {
                console.error("Failed to load group details:", err);
                setError("Failed to load group details. Please try again.");
            } finally {
                setPageLoading(false);
            }
        };

        loadData();
    }, [id, fetchGroupById, getGroupExpenses]);

    useEffect(() => {
        setExpenses(Array.isArray(groupExpenses) ? groupExpenses : []);
    }, [groupExpenses]);

    useEffect(() => {
        if (!expenses.length) {
            setBalances([]);
            return;
        }

        const getId = (entity) => entity?._id ?? entity?.id ?? entity;
        const balanceMap = new Map();

        expenses.forEach((expense) => {
            const paidById = getId(expense?.paidBy);
            const expenseAmount = Number(expense?.amount) || 0;
            if (paidById) {
                balanceMap.set(paidById, (balanceMap.get(paidById) || 0) + expenseAmount);
            }

            (expense?.participants || []).forEach((participant) => {
                const participantId = getId(participant?.user);
                const shareAmount = Number(participant?.shareAmount) || 0;
                if (participantId) {
                    balanceMap.set(participantId, (balanceMap.get(participantId) || 0) - shareAmount);
                }
            });
        });

        const entries = Array.from(balanceMap.entries())
            .map(([memberId, net]) => {
                const member = members.find((m) => String(getId(m)) === String(memberId));
                return {
                    personId: memberId,
                    person: member?.name || member?.email || "Member",
                    amount: Math.abs(net),
                    net,
                    type: net >= 0 ? "owes" : "owe",
                };
            })
            .filter((entry) => entry.amount > 0.009);

        setBalances(entries);
    }, [expenses, members]);

    // Determine if rendering on a phone-sized viewport (safe check for SSR)
    const isPhone = typeof window !== "undefined" && window.innerWidth < 768;

    const currentUserBalance = balances.find(
        (balance) => String(balance.personId) === String(user?._id)
    );
    const participantBalance = currentUserBalance || { type: "settled" };
    const totalOwed = currentUserBalance && currentUserBalance.net > 0 ? currentUserBalance.net : 0;
    const totalOwe = currentUserBalance && currentUserBalance.net < 0 ? Math.abs(currentUserBalance.net) : 0;

    const settledCount = expenses.filter((e) => e.settled).length;
    const pendingCount = expenses.filter((e) => !e.settled).length;

    const categoryData = useMemo(() => {
        return expenses.reduce((acc, exp) => {
            const categoryName = exp.category || "Uncategorized";
            const value = Number(exp.amount) || 0;
            const existing = acc.find((item) => item.name === categoryName);
            if (existing) {
                existing.value += value;
            } else {
                acc.push({ name: categoryName, value });
            }
            return acc;
        }, []);
    }, [expenses]);

    const categoryOptions = useMemo(() => {
        const defaults = [
            "Food",
            "Travel",
            "Groceries Shopping",
            "Vegetables",
            "Fruits",
            "Accommodation",
            "Entertainment",
            "Other",
        ];
        const set = new Set(defaults);
        expenses.forEach((expense) => {
            if (expense.category) {
                set.add(expense.category);
            }
        });
        return Array.from(set);
    }, [expenses]);

    const personalShare = useMemo(() => {
        if (!user?._id) return 0;
        return expenses.reduce((sum, expense) => {
            const participant = (expense.participants || []).find(
                (p) => String(p?.user?._id ?? p?.user) === String(user._id)
            );
            return sum + (Number(participant?.shareAmount) || 0);
        }, 0);
    }, [expenses, user?._id]);

    const totalGroupExpense = Number(groupDetails?.totalExpense) || 0;
    const totalTransactions = expenses.length;
    const yourSharePercentage = totalGroupExpense
        ? ((personalShare / totalGroupExpense) * 100).toFixed(1)
        : "0.0";

    if (pageLoading && !groupDetails) {
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

    const COLORS = [
        "#06b6d4",
        "#8b5cf6",
        "#ec4899",
        "#f59e0b",
        "#10b981",
        "#ef4444",
    ];

    const handleSettleConfirm = () => {
        toast.success("Payment settled successfully!");
        setShowSettleModal(false);
    };

    const handleAddMembersSave = (newMembers) => {
        setMembers((prev) => [...prev, ...newMembers]);
        setShowAddMemberModal(false);
    };

    const filteredExpenses = expenses.filter((expense) => {
        const categoryMatch =
            filterCategory === "all" || expense.category === filterCategory;
        const memberMatch =
            filterMember === "all" ||
            String(expense.paidBy?._id ?? expense.paidBy?.id ?? expense.paidBy) === String(filterMember);
        return categoryMatch && memberMatch;
    });

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
                <Sidebar />
                <div className="ml-64 p-4 md:p-8 mt-16 md:mt-0 group-expense-details">
                    {/* Header with Back Button */}
                    <div className="mb-8">

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-4 rounded-xl">
                                        <FaUserFriends className="text-white text-3xl md:text-4xl" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                                                {groupDetails?.name || "Group"}
                                            </h2>
                                            <FaInfoCircle onClick={() => setSelected(true)} className=" text-gray-400 mr-2 text-lg hover:text-gray-600 transition-colors cursor-pointer" />
                                        </div>
                                        {/* Popup Modal */}
                                        {selected && (
                                            <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 p-4">
                                                <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn border-2 border-gray-400">
                                                    <div className="text-center">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                                                            {groupDetails?.name || "Group"}</h3>
                                                        <div className="flex items-center gap-2 border border-gray-200 p-3 rounded-lg bg-teal-50">
                                                            <p>
                                                                {groupDetails?.description || "No description available."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6 flex justify-center">
                                                        <button
                                                            onClick={() => setSelected(null)}
                                                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <FaUsers className="text-purple-500" />Members: {members.length}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-blue-500" />Created:
                                                {formatDate(groupDetails?.createdAt)}
                                            </span>
                                            <span className="flex items-center gap-1 md:inline-flex hidden">
                                                <MdPerson className="text-teal-500" /> Owner: <span className="bg-blue-200 px-2 py-1 text-blue-500 rounded-l-full rounded-r-full font-semibold"> {ownerName}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2  text-sm text-gray-500 lg:hidden">
                                            <MdPerson className="text-teal-500" /> Owner: <span className="bg-blue-200 p-1 text-blue-500 rounded-l-full rounded-r-full font-semibold"> {ownerName}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAddGroupExpense(true)}
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
                                        ₹{totalGroupExpense}
                                    </p>
                                    <p className="text-blue-600 text-xs mt-2">
                                        {totalTransactions} transactions
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
                                    <p className="text-2xl font-bold">₹{personalShare}</p>
                                    <p className="text-purple-600 text-xs mt-2">
                                        {yourSharePercentage}% of total
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                        >
                                            <option value="all">All Categories</option>
                                            {categoryOptions.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Member
                                        </label>
                                        <select
                                            value={filterMember}
                                            onChange={(e) => setFilterMember(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
                                        >
                                            <option value="all">All Members</option>
                                            {members.map((member) => (
                                                <option key={member._id || member.id} value={member._id || member.id}>
                                                    {member.name || member.email}
                                                </option>
                                            ))}
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
                                    <div className="space-y-4 ">
                                        {filteredExpenses.map((expense) => {
                                            const splitCount = expense.participants?.length || members.length || 0;
                                            const paidByName = expense.paidBy?.name || expense.paidBy?.email || "N/A";
                                            const expenseDate = expense.date || expense.createdAt;
                                            const participantShare = (expense.participants || []).find(
                                                (participant) =>
                                                    String(participant?.user?._id ?? participant?.user) === String(user?._id)
                                            );
                                            const personalShareValue = Number(participantShare?.shareAmount);

                                            return (
                                                <Link
                                                    key={expense._id || expense.id}
                                                    to={`/group-expense-details/${groupDetails?._id || id}/expense/${expense._id || expense.id}`}
                                                >
                                                    <div
                                                        className="border-2 border-gray-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50 cursor-pointer mb-4"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                                                                        {expense.category || "Uncategorized"}
                                                                    </span>
                                                                </div>
                                                                <h3 className="font-bold text-lg text-gray-700 mb-1">
                                                                    {expense.title}
                                                                </h3>
                                                                <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-600">
                                                                    <span className="flex items-center gap-1">
                                                                        <MdPerson className="text-teal-500" />
                                                                        Paid by: <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{paidByName}</span>
                                                                    </span>
                                                                    <span className="hidden md:inline">•</span>
                                                                    <span className="flex items-center gap-1">
                                                                        <FaCalendarAlt className="text-blue-500" />
                                                                        {formatDate(expenseDate)}
                                                                    </span>
                                                                    <span className="hidden md:inline">•</span>
                                                                    <span className="flex items-center gap-1">
                                                                        <FaUsers className="text-purple-500" />
                                                                        Split {splitCount || "-"} ways
                                                                    </span>
                                                                    {Number.isFinite(personalShareValue) && (
                                                                        <span className="text-gray-600">
                                                                            Your share:
                                                                            <p className="inline font-semibold text-teal-600"> ₹{personalShareValue.toFixed(2)}</p>
                                                                        </span>
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div className="ml-4 flex flex-col items-end gap-3">
                                                                <div className="text-right">
                                                                    <p className="text-xl font-semibold text-gray-600 ">
                                                                        ₹{(Number(expense.amount) || 0).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
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
                                                <span className="text-lg font-bold text-gray-700">
                                                    ₹{personalShare}
                                                </span>

                                            </div>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 justify-between">
                                                {balance.type === "owes" ? "Owes you" : "You owe"}
                                                <span
                                                    className={`text-lg font-bold ${balance.type === "owes"
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                        }`}
                                                >
                                                    ₹{balance.amount}
                                                </span>
                                            </p>
                                            {participantBalance.type === "owe" &&
                                                balance.type === "owe" &&
                                                String(balance.personId) === String(user?._id) && (
                                                    <button
                                                        onClick={() => setShowSettleModal(true)}
                                                        className="mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
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

                                    {String(user?._id) === String(groupDetails?.owner?._id ?? groupDetails?.owner?.id ?? groupDetails?.owner) && (
                                        <button
                                            onClick={() => setShowAddMemberModal(true)}
                                            className="bg-gradient-to-br from-teal-400 to-teal-600 text-white px-2 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer flex items-center gap-1 text-sm"
                                        >
                                            <FaPlus /> Add Member
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {members.map((member) => {
                                        const memberId = member?._id ?? member?.id;
                                        const memberName = member?.name || member?.email || "Member";
                                        const profileImg = member?.profileImage?.url;
                                        const initial = (memberName || "M").trim().charAt(0).toUpperCase();
                                        return (
                                            <div
                                                key={memberId}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold">
                                                    {profileImg ? (
                                                        <img
                                                            src={profileImg}
                                                            alt={memberName}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = "none";
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>{initial}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">
                                                        {memberName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 flex flex-row"><span className="flex items-center gap-1"><CgMail className="text-blue-500" /> {member?.email || "Not provided"}</span>
                                                        <span className="flex items-center gap-1"> &nbsp; <FaPhoneAlt className="text-green-500" />  {member?.phone || "N/A"}</span></p>
                                                </div>
                                                {String(user?._id) === String(groupDetails?.owner?._id ?? groupDetails?.owner?.id ?? groupDetails?.owner) && (

                                                    <div className="p-2  hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer" title="Remove member">
                                                        <FaTrash />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
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
                        onClick={() => setShowAddGroupExpense(true)}
                        className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-4 rounded-full flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-2xl"
                        aria-label="Add expense"
                    >
                        <FaPlus />
                    </button>

                </div>

            </div>

            <AddGroupExpenseModal
                open={showAddGroupExpense}
                groupId={id}
                onClose={() => setShowAddGroupExpense(false)}
                onSuccess={() => getGroupExpenses(id)}
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

        </>
    );
};

export default GroupExpenseDetails;