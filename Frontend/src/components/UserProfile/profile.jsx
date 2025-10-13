import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaCamera, FaShieldAlt, FaBell, FaPalette, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 p-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-purple-300/20 to-pink-300/20 rounded-xl"></div>
          <div className="relative z-10 flex items-center mb-6">
            <div className="relative">
              <img src="https://res.cloudinary.com/dknkzth2t/image/upload/v1751401127/react_uploads/photo_2_oo7m3m.jpg" alt="Profile" className="w-40 h-40 rounded-full" />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                <FaCamera className="text-white w-4 h-4" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">John Doe</h3>
              <p className="text-gray-200">johndoe@example.com</p>
              <p className="text-sm text-gray-300 mt-1">Premium Member</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <FaUser className="mr-2" /> Personal Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-200">
                  <FaPhone className="mr-3 w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <FaMapMarkerAlt className="mr-3 w-4 h-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <FaCalendarAlt className="mr-3 w-4 h-4" />
                  <span>Joined March 2023</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <FaShieldAlt className="mr-2" /> Account Settings
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-200">
                  <FaBell className="mr-3 w-4 h-4" />
                  <span>Notifications: Enabled</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <FaPalette className="mr-3 w-4 h-4" />
                  <span>Theme: Light</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <FaShieldAlt className="mr-3 w-4 h-4" />
                  <span>Two-Factor Auth: On</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full flex items-center transition-colors">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full flex items-center transition-colors">
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;