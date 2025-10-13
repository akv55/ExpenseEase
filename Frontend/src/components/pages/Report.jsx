import React, { useState, useEffect } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown, IndianRupee, Users, PieChart, BarChart3, Filter } from 'lucide-react';
import Sidebar from '../Layouts/Sidebar';

const Report = () => {
  const [dateRange, setDateRange] = useState('all');
  const [reportType, setReportType] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReportData({
        overview: {
          totalExpenses: 4520.00,
          totalGroups: 5,
          totalTransactions: 67,
          averageExpense: 67.46,
          monthlyTrend: [
            { month: 'Aug', amount: 1200.00 },
            { month: 'Sep', amount: 1450.00 },
            { month: 'Oct', amount: 1870.00 }
          ],
          topCategories: [
            { category: 'Food & Dining', amount: 1850.00, percentage: 40.9 },
            { category: 'Transportation', amount: 1200.00, percentage: 26.5 },
            { category: 'Entertainment', amount: 780.00, percentage: 17.3 },
            { category: 'Accommodation', amount: 420.00, percentage: 9.3 },
            { category: 'Other', amount: 270.00, percentage: 6.0 }
          ]
        },
        groups: [
          {
            id: 1,
            name: 'Trip to Bali',
            totalExpenses: 2450.00,
            transactions: 12,
            members: 3,
            lastActivity: '2024-10-10',
            status: 'active'
          },
          {
            id: 2,
            name: 'Roommates',
            totalExpenses: 890.00,
            transactions: 8,
            members: 2,
            lastActivity: '2024-10-12',
            status: 'active'
          },
          {
            id: 3,
            name: 'Office Party',
            totalExpenses: 320.00,
            transactions: 5,
            members: 4,
            lastActivity: '2024-09-25',
            status: 'settled'
          }
        ],
        personal: {
          totalPaid: 2340.00,
          totalOwed: 1890.00,
          netBalance: 450.00,
          pendingSettlements: [
            { from: 'Jane Smith', amount: 150.00, group: 'Trip to Bali' },
            { from: 'Bob Johnson', amount: 300.00, group: 'Trip to Bali' }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, [dateRange, reportType]);

  const exportReport = () => {
    // Mock export functionality
    alert('Report exported successfully!');
  };

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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Reports</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Comprehensive analysis of your spending patterns</p>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={exportReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'groups', label: 'Groups' },
              { id: 'personal', label: 'Personal' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  reportType === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {reportType === 'overview' && reportData && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{reportData.overview.totalExpenses.toFixed(2)}</p>
                  </div>
                  <IndianRupee className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Groups</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{reportData.overview.totalGroups}</p>
                  </div>
                  <Users className="text-green-600" size={24} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{reportData.overview.totalTransactions}</p>
                  </div>
                  <BarChart3 className="text-purple-600" size={24} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Expense</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{reportData.overview.averageExpense.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trend */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Spending Trend</h3>
                <div className="space-y-3">
                  {reportData.overview.monthlyTrend.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{item.month}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(item.amount / Math.max(...reportData.overview.monthlyTrend.map(i => i.amount))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">₹{item.amount.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spending by Category</h3>
                <div className="space-y-4">
                  {reportData.overview.topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{category.category}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">₹{category.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'groups' && reportData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Group Reports</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Detailed breakdown by group</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Members</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Expenses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transactions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {reportData.groups.map((group) => (
                    <tr key={group.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{group.members}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₹{group.totalExpenses.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{group.transactions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{group.lastActivity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          group.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {group.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === 'personal' && reportData && (
          <div className="space-y-8">
            {/* Personal Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                    <p className="text-2xl font-bold text-blue-600">₹{reportData.personal.totalPaid.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Owed</p>
                    <p className="text-2xl font-bold text-red-600">₹{reportData.personal.totalOwed.toFixed(2)}</p>
                  </div>
                  <TrendingDown className="text-red-600" size={24} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Net Balance</p>
                    <p className={`text-2xl font-bold ${reportData.personal.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{Math.abs(reportData.personal.netBalance).toFixed(2)}
                    </p>
                  </div>
                  <IndianRupee className={`text-${reportData.personal.netBalance >= 0 ? 'green' : 'red'}-600`} size={24} />
                </div>
              </div>
            </div>

            {/* Pending Settlements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Settlements</h3>
              {reportData.personal.pendingSettlements.length > 0 ? (
                <div className="space-y-3">
                  {reportData.personal.pendingSettlements.map((settlement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{settlement.from} owes you</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Group: {settlement.group}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-600">₹{settlement.amount.toFixed(2)}</p>
                        <button className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors">
                          Remind
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <IndianRupee size={48} className="mx-auto text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
                  <p className="text-gray-600 dark:text-gray-400">No pending settlements.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
