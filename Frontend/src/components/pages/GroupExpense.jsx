import React, { useState, useEffect } from 'react';
import {  Users, IndianRupee, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import Sidebar from '../Layouts/Sidebar';

const GroupExpense = () => {
  const [activeTab, setActiveTab] = useState('balance');
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setGroupData({
        id: 1,
        name: 'Trip to Bali',
        description: 'Summer vacation expenses',
        members: [
          { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: 'BJ' }
        ],
        balanceReport: {
          totalExpenses: 2450.00,
          expenseCount: 12,
          balances: [
            { user: { name: 'John Doe', email: 'john@example.com' }, paid: 1200.00, owes: 816.67, net: 383.33 },
            { user: { name: 'Jane Smith', email: 'jane@example.com' }, paid: 800.00, owes: 816.67, net: -16.67 },
            { user: { name: 'Bob Johnson', email: 'bob@example.com' }, paid: 450.00, owes: 816.67, net: -366.67 }
          ]
        },
        expenseSummary: {
          totalExpenses: 2450.00,
          expenseCount: 12,
          categorySummary: {
            'Food & Dining': { totalAmount: 1200.00, count: 8 },
            'Transportation': { totalAmount: 650.00, count: 2 },
            'Accommodation': { totalAmount: 400.00, count: 1 },
            'Activities': { totalAmount: 200.00, count: 1 }
          },
          memberSummary: [
            { user: { name: 'John Doe' }, totalPaid: 1200.00, expensesCount: 6 },
            { user: { name: 'Jane Smith' }, totalPaid: 800.00, expensesCount: 4 },
            { user: { name: 'Bob Johnson' }, totalPaid: 450.00, expensesCount: 2 }
          ],
          recentExpenses: [
            { id: 1, description: 'Dinner at Beach Restaurant', amount: 150.00, paidBy: 'John Doe', date: '2024-10-10', category: 'Food & Dining' },
            { id: 2, description: 'Taxi to Airport', amount: 75.00, paidBy: 'Jane Smith', date: '2024-10-09', category: 'Transportation' },
            { id: 3, description: 'Hotel Booking', amount: 400.00, paidBy: 'John Doe', date: '2024-10-08', category: 'Accommodation' }
          ]
        },
        settlementSuggestions: [
          { from: { name: 'Bob Johnson' }, to: { name: 'John Doe' }, amount: 366.67 },
          { from: { name: 'Jane Smith' }, to: { name: 'John Doe' }, amount: 16.67 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'balance', label: 'Balance Report', icon: IndianRupee },
    { id: 'summary', label: 'Expense Summary', icon: BarChart3 },
    { id: 'settlements', label: 'Settlements', icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar/>
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          {/* Group Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{groupData.balanceReport.totalExpenses.toFixed(2)}</p>
                </div>
                <IndianRupee className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{groupData.balanceReport.expenseCount}</p>
                </div>
                <BarChart3 className="text-green-600" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{groupData.members.length}</p>
                </div>
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg per Person</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{(groupData.balanceReport.totalExpenses / groupData.members.length).toFixed(2)}</p>
                </div>
                <PieChart className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {activeTab === 'balance' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Balance Report</h2>
              <div className="space-y-4">
                {groupData.balanceReport.balances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {balance.user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{balance.user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{balance.user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${balance.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {balance.net >= 0 ? '+' : ''}₹{balance.net.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Paid: ₹{balance.paid.toFixed(2)} | Owes: ₹{balance.owes.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Expense Summary</h2>

              {/* Category Breakdown */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">By Category</h3>
                <div className="space-y-3">
                  {Object.entries(groupData.expenseSummary.categorySummary).map(([category, data]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">₹{data.totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{data.count} expenses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Member Breakdown */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">By Member</h3>
                <div className="space-y-3">
                  {groupData.expenseSummary.memberSummary.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{member.user.name}</span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">₹{member.totalPaid.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.expensesCount} expenses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Expenses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h3>
                <div className="space-y-3">
                  {groupData.expenseSummary.recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{expense.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Paid by {expense.paidBy} • {expense.category} • {expense.date}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">₹{expense.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settlements' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settlement Suggestions</h2>
              <div className="space-y-4">
                {groupData.settlementSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{suggestion.from.name}</span>
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="font-medium text-gray-900 dark:text-white">{suggestion.to.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{suggestion.amount.toFixed(2)}</p>
                      <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors">
                        Mark as Paid
                      </button>
                    </div>
                  </div>
                ))}
                {groupData.settlementSuggestions.length === 0 && (
                  <div className="text-center py-8">
                    <TrendingUp size={48} className="mx-auto text-green-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All Settled Up!</h3>
                    <p className="text-gray-600 dark:text-gray-400">No outstanding settlements in this group.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupExpense;