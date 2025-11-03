import React, { useEffect, useState } from "react";
import { FaPlus, FaUsers, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { TrendingUp, IndianRupee } from "lucide-react";
import Sidebar from "../Layouts/Sidebar";

const MyGroups = () => {
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
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
        Loading groups...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="p-4 md:ml-64 md:p-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                My Groups
              </h1>
              <p className="text-gray-600">
                Manage your expense groups and track shared costs
              </p>
            </div>
          </div>
          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 w-full flex flex-col md:flex-row justify-between md:items-center gap-4 search-box">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Group Reports</h2>
                <p className="text-gray-600 mt-1">Detailed breakdown by group</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-1/2 search-input">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Groups Table for Desktop */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Expenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Your Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGroups.map((group) => {
                    const yourShare =
                      group.totalExpenses / group.members.length;
                    const youPaid = group.myBalance;
                    return (
                      <tr key={group._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {group.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {group.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {group.members.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          ₹{group.totalExpenses.toFixed(2)}
                        </td>
                        {/* <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${group.myBalance >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                        >
                          <span>{group.myBalance >= 0 ? "+" : "-"}</span>
                          ₹{Math.abs(group.myBalance).toFixed(2)}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <span className="font-semibold text-gray-800">
                              Share:
                            </span>{" "}
                            ₹{yourShare.toFixed(2)}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800">
                              Paid:
                            </span>{" "}
                            <span className={`px-2 py-4 whitespace-nowrap text-sm font-medium ${youPaid >= 0 ? "text-green-600" : "text-red-600"
                              }`}>
                              ₹{Math.abs(youPaid).toFixed(2)}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${group.myBalance === 0
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                              }`}
                          >
                            {group.myBalance === 0 ? "Settled" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button
                            onClick={() => openGroupDetails(group)}
                            className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDelete(group._id)}
                            className="text-red-600 hover:text-red-900 cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredGroups.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-500">
                        No groups found.
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
                  <div key={group._id} className=" rounded-lg  p-4 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => openGroupDetails(group)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(group._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Total Spent:</span>
                        <span className="font-bold text-gray-800">₹{group.totalExpenses.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Your Share:</span>
                        <span>₹{yourShare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">You Paid:</span>
                        <span className={`font-bold ${youPaid >= 0 ? "text-green-600" : "text-red-600"}`}>
                          ₹{Math.abs(youPaid).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${group.myBalance === 0
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {group.myBalance === 0 ? "Settled" : "Active"}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredGroups.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No groups found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
