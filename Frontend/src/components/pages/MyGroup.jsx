import React, { useState, useEffect } from 'react';
import { Plus, Users, IndianRupee, TrendingUp, Calendar, Search } from 'lucide-react';
import Sidebar from '../Layouts/Sidebar';

const MyGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    memberEmails: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups([
        {
          id: 1,
          name: 'Trip to Bali',
          description: 'Summer vacation expenses',
          members: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
          ],
          totalExpenses: 2450.00,
          myBalance: -150.50,
          createdAt: '2024-01-15',
          transactions: 12,
          lastActivity: '2024-10-10'
        },
        {
          id: 2,
          name: 'Roommates',
          description: 'Monthly shared expenses',
          members: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com' }
          ],
          totalExpenses: 890.00,
          myBalance: 245.75,
          createdAt: '2023-12-01',
          transactions: 4,
          lastActivity: '2024-10-12'
        },
        {
          id: 3,
          name: 'Office Party',
          description: 'Company team building event',
          members: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' },
            { id: 6, name: 'Diana Prince', email: 'diana@example.com' },
            { id: 7, name: 'Eve Adams', email: 'eve@example.com' }
          ],
          totalExpenses: 320.00,
          myBalance: 0.00,
          transactions: 4,
          createdAt: '2024-09-20',
          lastActivity: '2024-09-25'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // Mock create group
    const group = {
      id: Date.now(),
      name: newGroup.name,
      description: newGroup.description,
      members: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
      totalExpenses: 0,
      myBalance: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0]
    };
    setGroups([group, ...groups]);
    setNewGroup({ name: '', description: '', memberEmails: '' });
    setShowCreateForm(false);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOwed = groups.reduce((sum, group) => sum + Math.max(0, -group.myBalance), 0);
  const totalOwing = groups.reduce((sum, group) => sum + Math.max(0, group.myBalance), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Sidebar />
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">My Groups</h1>
              <p className="text-gray-600 mt-2">Manage your expense groups and track shared costs</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Create Group
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Groups</p>
                  <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
                </div>
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">You Owe</p>
                  <p className="text-2xl font-bold text-red-600">₹{totalOwed.toFixed(2)}</p>
                </div>
                <TrendingUp className="text-red-600" size={24} />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Owed to You</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalOwing.toFixed(2)}</p>
                </div>
                <IndianRupee className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Groups Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{group.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    group.myBalance === 0
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : group.myBalance > 0
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {group.myBalance === 0 ? 'Settled' : group.myBalance > 0 ? 'Owed' : 'Owes'}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Members</span>
                    <span className="font-medium">{group.members.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Expenses</span>
                    <span className="font-medium">₹{group.totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Your Balance</span>
                    <span className={`font-medium ${group.myBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{Math.abs(group.myBalance).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    Reports
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600">Create your first group to start tracking shared expenses.</p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
          <div className="p-6 border-b border-gray-200 w-full flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Group Reports</h2>
              <p className="text-gray-600 mt-1">Detailed breakdown by group</p>
            </div>
            {/* Search */}
            <div className="relative mb-6 w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trip To Goa</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹6558</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* <span className={`font-medium ${group.myBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      
                    </span> */}
                    <span className="font-medium text-green-600">₹85</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10-10-2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${group.myBalance === 0
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                      {group.myBalance === 0 ? 'Settled' : 'Active'}
                    </span> */}
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">settled</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trip To Mumbai</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹7894</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* <span className={`font-medium ${group.myBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      
                    </span> */}
                    <span className="font-medium text-red-600">₹150</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10-10-2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${group.myBalance === 0
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                      {group.myBalance === 0 ? 'Settled' : 'Active'}
                    </span> */}
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Active</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Trip to Bali"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Optional description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invite Members
                  </label>
                  <textarea
                    value={newGroup.memberEmails}
                    onChange={(e) => setNewGroup({ ...newGroup, memberEmails: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="Enter email addresses separated by commas"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroup;
