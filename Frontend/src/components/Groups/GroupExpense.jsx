import React, { useEffect, useState } from "react";
import { FaPlus, FaUsers, FaTrash, FaEye, FaSearch, FaUserFriends } from "react-icons/fa";
import { TrendingUp, IndianRupee, Calendar, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Sidebar from "../Layouts/Sidebar";
import { Link } from "react-router-dom";
import { useGroup } from "../../context/groupContext";
import { toast } from "react-toastify";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date)) return "N/A";
  return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const GroupExpense = () => {
  const { groups, loading, fetchGroups } = useGroup();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalOwing, setTotalOwing] = useState(0);
  const [error, setError] = useState(null);

  // Load groups from API
  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const data = await fetchGroups();
        const owed = (data || [])
          .map((g) => g.myBalance || 0)
          .filter((b) => b < 0)
          .reduce((sum, b) => sum + Math.abs(b), 0);
        const owing = (data || [])
          .map((g) => g.myBalance || 0)
          .filter((b) => b > 0)
          .reduce((sum, b) => sum + b, 0);
        setTotalOwed(owed);
        setTotalOwing(owing);
      } catch (err) {
        setError("Failed to load groups.");
      }
    };
    load();
  }, [fetchGroups]);

  // ✅ Search Filter
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete placeholder until backend endpoint exists
  const handleDelete = () => {
    toast.info("Delete group is not yet implemented.");
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
  /* -------- Loading -------- */
 if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center max-w-7xl mx-auto group-container">
					<div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4">
					</div>
					<h2  className="text-xl font-semibold text-teal-600">Loading
            <span className="animate-pulse">.</span><span className="animate-pulse delay-150">.</span><span className="animate-pulse delay-300">.</span>
          </h2>
          <p>Please wait while we fetch your data.</p>
				</div>
			</div>
		);
	}

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="md:ml-64 ml-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto group-container">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-teal-600 mb-2">Group Expense</h1>
            <p className="text-gray-600">Manage your expense groups and track shared costs</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-center text-sm font-medium">{error}</p>
            </div>
          )}

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
                  <CreditCard className="text-teal-600" size={24} />
                  Groups
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-1 focus:ring-teal-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
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
                      Your Share
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      You Paid
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
                    const totalExpenses = Number(group.totalExpenses) || 0;
                    const memberCount = Array.isArray(group.members) ? group.members.length : 0;
                    const yourShare = memberCount > 0 ? totalExpenses / memberCount : 0;
                    const youPaid = Number(group.myBalance) || 0;
                    const displayDate = formatDate(group.createdAt);
                    return (
                      <tr key={group._id} className="hover:bg-blue-50/60 even:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            {displayDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{group.name}</div>
                          {/* {group.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{group.description}</p>
                          )} */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                              {memberCount} member{memberCount === 1 ? "" : "s"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-800 items-center">
                            ₹{totalExpenses.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 ">
                            <span className="text-sm font-bold text-gray-800">₹{yourShare.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${youPaid >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {youPaid >= 0 ? "+" : "-"}₹{Math.abs(youPaid).toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${youPaid === 0
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                              }`}
                          >
                            {youPaid === 0 ? "✓ Settled" : "⚡ Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                      <td colSpan="8" className="text-center py-12">
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
                const totalExpenses = Number(group.totalExpenses) || 0;
                const memberCount = Array.isArray(group.members) ? group.members.length : 0;
                const yourShare = memberCount > 0 ? totalExpenses / memberCount : 0;
                const youPaid = Number(group.myBalance) || 0;
                const displayDate = formatDate(group.createdAt);
                return (
                  <div
                    key={group._id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200  transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{group.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 justify-between">
                          <Calendar size={14} className="text-blue-400" />
                          <span>{displayDate}</span>

                          {/* Members */}

                          <span className="text-sm text-teal-500 font-medium ml-1 flex items-center gap-1 text-gray-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                            {memberCount} members
                          </span>
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



                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">Total Spent</span>
                        <span className="text-lg font-bold text-gray-900">₹{totalExpenses.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">Your Share:</span>
                        <span className="text-base font-bold text-teal-900">₹{yourShare.toFixed(2)}65</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">You Paid:</span>
                        <span className={`text-base font-bold ${youPaid >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {youPaid >= 0 ? "+" : ""}₹{Math.abs(youPaid).toFixed(2)}95
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Status</span>
                      <span
                        className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${youPaid === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {youPaid === 0 ? "✓ Settled" : "⚡ Active"}
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