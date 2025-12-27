import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { useAuth } from "../../context/authContext";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaCamera } from "react-icons/fa";
import EditProfileForm from "./editProfile";
import API from "../../API/api";
import { toast } from "react-toastify";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date)) return "N/A";
  return date.toLocaleDateString("en-GB").replace(/\//g, "-");
};

const Profile = () => {
  const { user, updateProfileImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage?.url || "");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.put("/uploads/uploadProfileImage", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      updateProfileImage(response.data.user.profileImage);
      toast.success("Profile image updated successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">User Profile</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 text-white flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={previewUrl || user?.profileImage?.url}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer border-2 border-white">
                    <FaCamera className="w-4 h-4 text-gray-600" />
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {loading && <p className="absolute -bottom-6 text-xs text-gray-200 animate-pulse bg-gray-800/50 px-3 rounded-md text-green-300">Uploading...</p>}
                </div>
                <div className="user-info">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-purple-100">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2">
                <FaEdit className="w-4 h-4" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>

            <div className="p-8">{isEditing ? <EditProfileForm /> : <UserInfo user={user} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User info card
const UserInfo = ({ user }) => (
  <div className="space-y-8">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <FaUser className="mr-2 text-purple-600" /> Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard icon={<FaUser />} label="Name" value={user?.name} />
      <InfoCard icon={<FaEnvelope />} label="Email" value={user?.email} />
      <InfoCard icon={<FaPhone />} label="Phone" value={user?.phone} />
      <InfoCard icon={<FaCalendarAlt />} label="Member Since" value={formatDate(user?.createdAt)} />
    </div>
  </div>
);

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
    <div className="text-gray-500 w-5 h-5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

export default Profile;