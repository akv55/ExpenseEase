import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Sidebar from "../Layouts/Sidebar";
import { useAuth } from '../../context/authContext.jsx';
import ExpenseCard from './ExpenseCard.jsx';
import { useExpense } from '../../context/expenseContext.jsx';
import { useIncome } from '../../context/incomeContext.jsx';
import RecentTransactions from './RecentTransactions.jsx';


const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const { expenses, loading: expenseLoading } = useExpense();
  const { incomes, loading: incomeLoading } = useIncome();
  const isLoading = authLoading || expenseLoading || incomeLoading;
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Build a flat array of { name, value, color } for the Pie chart
  const expenseData = (expenses || []).reduce((acc, curr) => {
    const category = curr.category || 'Other';
    const amount = Number(curr.amount) || 0;
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: category, value: amount, color: getRandomColor() });
    }
    return acc;
  }, []);

  // If no expenses, provide a fallback so the chart doesn't break
  const pieData = expenseData.length ? expenseData : [{ name: 'No Data', value: 1, color: '#e5e7eb' }];

  // Build monthly data for the last 6 months for LineChart
  const getMonthKey = (date) => {
    const d = new Date(date);
    if (isNaN(d)) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; // e.g. 2025-04
  };

  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`, label: m.toLocaleString(undefined, { month: 'short' }) });
  }

  const monthlyMap = months.reduce((acc, m) => {
    acc[m.key] = { month: m.label, income: 0, expenses: 0 };
    return acc;
  }, {});

  (incomes || []).forEach((inc) => {
    const key = getMonthKey(inc.date || inc.createdAt || inc.dateString);
    if (key && monthlyMap[key]) monthlyMap[key].income += Number(inc.amount || inc.value || 0);
  });

  (expenses || []).forEach((exp) => {
    const key = getMonthKey(exp.date || exp.createdAt || exp.dateString);
    if (key && monthlyMap[key]) monthlyMap[key].expenses += Number(exp.amount || exp.value || 0);
  });

  const monthlyData = months.map(m => monthlyMap[m.key]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-7xl mx-auto group-container">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4">
          </div>
          <h2 className="text-xl font-semibold text-teal-600">Loading
            <span className="animate-pulse">.</span><span className="animate-pulse delay-150">.</span><span className="animate-pulse delay-300">.</span>
          </h2>
          <p>Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="md:ml-64 pt-16 md:pt-0 transition-all duration-300">
        <div className="p-6 pt-8">
          { /*Expense Summary Cards */}
          <ExpenseCard />
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Expense Breakdown Pie Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}

                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trends Line Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} contentStyle={{ backgroundColor: '#f5e6e6ff', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            <RecentTransactions />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
