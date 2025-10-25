import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import Sidebar from "../Layouts/Sidebar";
import API from "../../API/api";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/groups/mygroups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(res.data.groups || []);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  // ✅ Open modal for selected group
  const openGroupDetails = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setSelectedGroup(null);
    setIsModalOpen(false);
  };

  // ✅ Delete group
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/groups/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(groups.filter((g) => g._id !== id));
      alert("Group deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete group.");
    }
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
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">My Groups</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md transition">
            <FaPlus /> <span>Create Group</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6">Group Name</th>
                <th className="py-3 px-6">Members</th>
                <th className="py-3 px-6">Total Expense</th>
                <th className="py-3 px-6">Created</th>
                <th className="py-3 px-6">Details</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.length > 0 ? (
                groups.map((group) => (
                  <tr
                    key={group._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6 font-semibold text-gray-700">
                      {group.name}
                    </td>
                    <td className="py-3 px-6">{group.members.length}</td>
                    <td className="py-3 px-6 text-green-600 font-medium">
                      ₹{group.totalExpense || 0}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(group.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => openGroupDetails(group)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="py-3 px-6 flex space-x-4">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => alert("Edit feature coming soon!")}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(group._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <GroupDetailsModal group={selectedGroup} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Groups;
