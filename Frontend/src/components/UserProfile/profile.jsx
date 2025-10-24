import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { useAuth } from "../../context/authContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import EditProfileForm from "./editProfile";
import API from "../../API/api";

const Profile = () => {
  const { user, updateProfileImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage?.url || "");

  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file)); // Instant preview
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Upload to backend which forwards to Cloudinary
      const response = await API.post(
        "/uploads/uploadProfileImage",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const cloudinaryUrl = response?.data?.url;
      if (!cloudinaryUrl) {
        // Defensive: don't attempt to read .data.url if response is malformed
        throw new Error("Upload succeeded but response did not include a URL");
      }

      // Update local user state with the new image URL
      updateProfileImage(cloudinaryUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">User Profile</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative profile-image-wrapper">
                    <img
                      src={
                        previewUrl ||
                        "https://cdn-icons-png.flaticon.com/512/147/147144.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <label
                      htmlFor="profileImageInput"
                      className="absolute bottom-0 right-0 bg-white hover:bg-gray-100 text-white p-2 rounded-full cursor-pointer border-2 border-white"
                    >
                      <FaCamera className="w-4 h-4 text-gray-600" />
                    </label>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {loading && (
                      <p className="absolute -bottom-6 text-xs text-gray-200 animate-pulse border px-3 rounded-md bg-gray-800/50 text-center text-green-300">
                        Uploading...
                      </p>
                    )}
                  </div>

                  <div className="user-info">
                    <h2 className="text-2xl font-bold">
                      {user?.name || "User Name"}
                    </h2>
                    <p className="text-purple-100">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-8">
              {isEditing ? (
                <EditProfileForm />
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FaUser className="mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaUser className="text-gray-500 w-5 h-5" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-800">
                            {user?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaEnvelope className="text-gray-500 w-5 h-5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">
                            {user?.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaPhone className="text-gray-500 w-5 h-5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">
                            {user?.phone || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaCalendarAlt className="text-gray-500 w-5 h-5" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-800">
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Profile;
