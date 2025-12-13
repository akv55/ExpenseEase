import React, { useState, useMemo } from "react";
import Sidebar from "../Layouts/Sidebar";
import { useExpense } from "../../context/expenseContext";
import { useIncome } from "../../context/incomeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";

const Report = () => {
  const { expenses } = useExpense();
  const { incomes } = useIncome();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  const filteredExpenses = useMemo(() => {
    if (!startDate || !endDate) return expenses;
    return expenses.filter(
      (e) =>
        new Date(e.date) >= new Date(startDate) &&
        new Date(e.date) <= new Date(endDate)
    );
  }, [expenses, startDate, endDate]);

  const filteredIncomes = useMemo(() => {
    if (!startDate || !endDate) return incomes;
    return incomes.filter(
      (i) =>
        new Date(i.date) >= new Date(startDate) &&
        new Date(i.date) <= new Date(endDate)
    );
  }, [incomes, startDate, endDate]);

  const totalExpense = useMemo(
    () => filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0),
    [filteredExpenses]
  );
  const totalIncome = useMemo(
    () => filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0),
    [filteredIncomes]
  );

  const monthlyData = useMemo(() => {
    const data = {};
    const processData = (items, type) => {
      items.forEach((item) => {
        const month = new Date(item.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        if (!data[month]) {
          data[month] = { name: month, income: 0, expense: 0 };
        }
        data[month][type] += item.amount;
      });
    };
    processData(filteredIncomes, "income");
    processData(filteredExpenses, "expense");
    return Object.values(data).sort(
      (a, b) => new Date(a.name) - new Date(b.name)
    );
  }, [filteredIncomes, filteredExpenses]);

  const categoryData = (items, type) => {
    const data = {};
    items.forEach((item) => {
      const { category, amount } = item;
      if (!data[category]) {
        data[category] = { name: category, value: 0 };
      }
      data[category].value += amount;
    });
    return Object.values(data);
  };

  const expenseByCategory = useMemo(
    () => categoryData(filteredExpenses),
    [filteredExpenses]
  );
  const incomeByCategory = useMemo(
    () => categoryData(filteredIncomes),
    [filteredIncomes]
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#FF5733",
    "#C70039",
    "#900C3F",
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
        <Sidebar />
        <div className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                Financial Reports
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Filter by Date
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <FaCalendarAlt className="absolute left-3 top-10 transform text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <FaCalendarAlt className="absolute left-3 top-10 transform text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 outline-none"
                  />
                </div>
                <button
                  onClick={handleClearFilter}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="bg-green-100 rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-green-800">
                  Total Income
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-100 rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-red-800">
                  Total Expense
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  ₹{totalExpense.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-blue-800">
                  Net Savings
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{(totalIncome - totalExpense).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Monthly Income vs Expense
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#82ca9d" name="Income" />
                  <Bar dataKey="expense" fill="#8884d8" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Expense Breakdown
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {expenseByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Income Breakdown
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incomeByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#82ca9d"
                      dataKey="value"
                      nameKey="name"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {incomeByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;