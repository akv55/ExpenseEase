import React, { useEffect, useState,} from "react";
import { FaPlus, FaUsers, FaTrash, FaEye, FaSearch, FaUserFriends } from "react-icons/fa";
import { TrendingUp, IndianRupee, Calendar, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Sidebar from "../Layouts/Sidebar";
import { Link } from "react-router-dom";

const GroupExpense = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalOwing, setTotalOwing] = useState(0);

  // ✅ Load sample frontend data
  useEffect(() => {
    const sampleData = [
      {
        _id: "1",
        name: "Trip to Goa",
        description: "Vacation with college friends",
        members: ["Alok", "Ravi", "Priya", "Neha", "Amit"],
        totalExpenses: 6558,
        myBalance: 85,
        date: "2025-10-10",
      },
      {
        _id: "2",
        name: "Trip to Mumbai",
        description: "Office weekend trip",
        members: ["Alok", "Suresh", "Rita", "Rahul", "Vikram", "Rani"],
        totalExpenses: 7894,
        myBalance: -150,
        date: "2025-10-10",
      },
      {
        _id: "3",
        name: "College Reunion",
        description: "Batch 2018 get-together",
        members: ["Alok", "Ravi", "Sakshi", "Deepak"],
        totalExpenses: 5200,
        myBalance: 0,
        date: "2025-09-25",
      },
    ];

    setTimeout(() => {
      setGroups(sampleData);
      const owed = sampleData
        .filter((g) => g.myBalance < 0)
        .reduce((sum, g) => sum + Math.abs(g.myBalance), 0);
      const owing = sampleData
        .filter((g) => g.myBalance > 0)
        .reduce((sum, g) => sum + g.myBalance, 0);
      setTotalOwed(owed);
      setTotalOwing(owing);
      setLoading(false);
    }, 1000);
  }, []);

  // ✅ Search Filter
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Delete Function (Frontend only)
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    setGroups(groups.filter((g) => g._id !== id));
  };

  // ✅ Open Modal
  const openGroupDetails = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  // ✅ Close Modal
  const closeModal = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };
  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
  //         <p className="text-xl font-semibold text-gray-700">Loading groups...</p>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar />
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  My Groups
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your expense groups and track shared costs
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Groups</p>
                  <p className="text-3xl font-bold text-gray-900">{groups.length}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl">
                  <FaUsers className="text-blue-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">You Owe</p>
                  <p className="text-3xl font-bold text-red-600">₹{totalOwed.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-red-100 rounded-xl">
                  <ArrowDownRight className="text-red-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">You're Owed</p>
                  <p className="text-3xl font-bold text-green-600">₹{totalOwing.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-xl">
                  <ArrowUpRight className="text-green-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>
          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="text-blue-600" size={24} />
                  Group Reports
                </h2>
                <p className="text-gray-600 mt-1">Detailed breakdown by group</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-1/2">
                <FaSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Groups Table for Desktop */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaUsers size={14} />
                        Group
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total Expenses
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Your Balance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredGroups.map((group) => {
                    const yourShare =
                      group.totalExpenses / group.members.length;
                    const youPaid = group.myBalance;
                    return (
                      <tr key={group._id} className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            {group.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{group.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{group.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium ml-4">
                              {group.members.length}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-800">
                            ₹{group.totalExpenses.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-gray-600 font-medium">Share:</span>
                              <span className="font-semibold text-gray-800">₹{yourShare.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-gray-600 font-medium">Paid:</span>
                              <span className={`font-bold ${youPaid >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {youPaid >= 0 ? "+" : "-"}₹{Math.abs(youPaid).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${group.myBalance === 0
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                              }`}
                          >
                            {group.myBalance === 0 ? "✓ Settled" : "⚡ Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/group-expense-details/${group._id}`}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 cursor-pointer"
                              title="View Details"
                            >
                              <FaEye size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(group._id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
                              title="Delete Group"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredGroups.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <FaSearch className="text-gray-300 text-4xl" />
                          <p className="text-gray-500 font-medium">No groups found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Group Cards for Mobile */}
            <div className="md:hidden p-4 space-y-4">
              {filteredGroups.map((group) => {
                const yourShare = group.totalExpenses / group.members.length;
                const youPaid = group.myBalance;
                return (
                  <div
                    key={group._id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{group.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{group.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{group.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/group-expense-details/${group._id}`}
                          onClick={() => openGroupDetails(group)}
                          className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 cursor-pointer"
                        >
                          <FaEye size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(group._id)}
                          className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200 cursor-pointer"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                      {/* <div className="flex -space-x-2">
                        {group.members.slice(0, 4).map((member, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                          >
                            {member?.charAt(0)}
                          </div>
                        ))}
                      </div> */}
                      <span className="text-sm text-gray-600 font-medium ml-1">
                        {group.members.length} members
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">Total Spent</span>
                        <span className="text-lg font-bold text-gray-900">₹{group.totalExpenses.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">Your Share</span>
                        <span className="text-base font-bold text-blue-900">₹{yourShare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">You Paid</span>
                        <span className={`text-base font-bold ${youPaid >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {youPaid >= 0 ? "+" : ""}₹{Math.abs(youPaid).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Status</span>
                      <span
                        className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${group.myBalance === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {group.myBalance === 0 ? "✓ Settled" : "⚡ Active"}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredGroups.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <FaSearch className="text-gray-300 text-5xl" />
                    <p className="text-gray-500 font-semibold text-lg">No groups found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupExpense;