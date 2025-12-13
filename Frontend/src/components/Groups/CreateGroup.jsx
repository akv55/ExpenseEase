import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { useGroup } from "../../context/groupContext";
import API from "../../API/api";

const CreateGroup = () => {
  const { createGroup } = useGroup();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    members: "",
  });

  const [foundMembers, setFoundMembers] = useState([]);

  const { groupName, description, members } = formData;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (success) setSuccess("");
  };

  // Find users from phone numbers
  const handleFindMembers = async () => {
    if (!members.trim()) {
      setError("Please enter phone numbers first.");
      return;
    }

    const phoneNumbers = members
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (phoneNumbers.length === 0) {
      setError("Please enter valid phone numbers.");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const results = [];
      for (const phone of phoneNumbers) {
        try {
          const res = await API.get(`/auth/search?phone=${phone}`);
          results.push(res.data);
        } catch (err) {
          results.push({ phone, notFound: true });
        }
      }

      setFoundMembers(results);
    } catch (err) {
      setError("Failed to fetch members.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create group
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setError("");
    setSuccess("");

    if (!groupName || !description || foundMembers.length === 0) {
      setError("Please fill out all fields and add at least one valid member.");
      return;
    }

    setIsLoading(true);
    try {
      const validMemberIds = foundMembers
        .filter((m) => !m.notFound)
        .map((m) => m._id);

      await createGroup({
        name: groupName,
        description,
        members: validMemberIds,
      });

      setSuccess("✅ Group created successfully!");
      setFormData({ groupName: "", description: "", members: "" });
      setFoundMembers([]);
    } catch (err) {
      console.error(err);
      setError("Failed to create group.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 group-container">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              Create New Group
            </h1>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error & Success */}
              {hasAttemptedSubmit && error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-center text-sm font-medium">
                    {error}
                  </p>
                </div>
              )}
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-600 text-center text-sm font-medium">
                    {success}
                  </p>
                </div>
              )}

              {/* Group Name */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="groupName"
                >
                  Group Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  value={groupName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 outline-none"
                  placeholder="Enter group name"
                  maxLength={50}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="description"
                >
                  Description <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 outline-none"
                  placeholder="Enter group description"
                  maxLength={120}
                />
              </div>

              {/* Members input */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="members"
                >
                  Add Members{" "}
                  <span className="text-sm text-gray-500">
                    (Enter phone numbers separated by commas)
                  </span>{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="members"
                    name="members"
                    value={members}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 outline-none"
                    placeholder="Enter member phone numbers"
                  />
                  <button
                    type="button"
                    onClick={handleFindMembers}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Searching..." : "Find"}
                  </button>
                </div>
              </div>

              {/* Show found members */}
              {foundMembers.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Member Details:
                  </h3>
                  <ul className="space-y-2">
                    {foundMembers.map((m, i) => (
                      <li
                        key={i}
                        className={`p-3 rounded border ${m.notFound
                            ? "border-red-300 bg-red-50 text-red-700"
                            : "border-green-300 bg-green-50 text-green-800"
                          }`}
                      >

                        {m.notFound ? (
                          <span> No user found for {m.phone}</span>
                        ) : (
                          <div>

                            {m.name} ({m.phone})
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit */}
               <div className="flex gap-4 mt-8 ">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Creating..." : "Create Group"}
              </button>

              <Link to={"/dashboard"}
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaTimes className="text-lg" />
                Cancel
              </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
