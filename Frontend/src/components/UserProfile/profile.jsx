import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { useAuth } from '../../context/authContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaCamera, FaShieldAlt, FaBell, FaPalette, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">User Profile</h1>
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Header Section with Gradient Background */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative profile-image-wrapper">
                    <img
                      src={user?.profileImage?.url || 'https://cdn-icons-png.flaticon.com/512/147/147144.png'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                    {/* <label
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
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          setSelectedFile(file);
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                    /> */}
                  </div>
                  <div className="user-info">
                    <h2 className="text-2xl font-bold">{user?.name || 'User Name'}</h2>
                    <p className="text-purple-100">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {isEditing ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        disabled
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-not-allowed bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Picture <span className="text-gray-500">(JPEG, PNG)</span> <span className="text-red-500">*</span></label>
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="w-full px-3 py-2 border-2 border-dashed border-purple-500 rounded-lg focus:outline-none file:border-0 file:bg-purple-200 file:rounded-lg file:text-purple-700 file:text-sm file:p-1 file:cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <FaSave className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FaUser className="mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaUser className="text-gray-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-gray-800">{user?.name || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaEnvelope className="text-gray-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">{user?.email || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaPhone className="text-gray-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-800">{user?.phone || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaCalendarAlt className="text-gray-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium text-gray-800">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                          </div>
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
}

export default Profile;