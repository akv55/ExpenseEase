import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const Setting = () => {
    const { changePassword } = useAuth();
    const [activeTab, setActiveTab] = useState('account');
    const { user } = useAuth();
    const [error, setError] = useState();
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { currentPassword, newPassword, confirmPassword } = formData;
    const tabs = [
        { id: 'account', label: 'Account' },
        { id: 'change-password', label: 'Change Password' },
        { id: 'danger-zone', label: 'Danger Zone' }
    ];

    const formatDate = (value) => {
        if (!value) return 'N/A';
        const date = new Date(value);
        if (Number.isNaN(date)) return 'N/A';
        // Format as dd-mm-yyyy
        return date.toLocaleDateString('en-GB').replace(/\//g, '-');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill out all required fields.");
            return;
        }
        setLoading(true);
        try {
            await changePassword(formData);
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            navigate('/dashboard');
        } catch (error) {
            setError("Failed to Update password.");
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };
    const renderTabContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Account Information</h2>

                        {user ? (
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{formatDate(user.createdAt)}</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                                <p className="text-gray-600">Please log in to view account information.</p>
                            </div>
                        )}
                        <p>To edit your profile information, go to your <Link to="/profile"><span className="text-blue-600">Profile page</span></Link>.</p>
                    </div>
                );
            case 'change-password':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                            <p className="text-gray-600">Update your password to keep your account secure.</p>
                        </div>
                        {hasAttemptedSubmit && error && (
                            <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                                <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                            </div>
                        )}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password <span className="text-red-600">*</span></label>
                                    <input type="password" value={currentPassword} name="currentPassword" onChange={handleChange} className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 outline-none"
                                        placeholder="Enter your current password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password <span className="text-red-600">*</span></label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 outline-none"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password <span className="text-red-600">*</span></label>
                                    <input type="password" value={confirmPassword} name="confirmPassword" onChange={handleChange} className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 outline-none"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <div className=" flex gap-4 mt-8 changePasswordBtnGroup">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        <FaSave className="text-lg" />
                                        {loading ? 'Updating...' : 'Update Password'}
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
                );
            case 'danger-zone':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Danger Zone</h2>
                            <p className="text-gray-600">Irreversible and destructive actions.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="space-y-6">
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Delete Account</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Logout from All Devices</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        This will log you out from all devices where you're currently signed in.
                                    </p>
                                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors">
                                        Logout Everywhere
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
            <Sidebar />
            <div className="ml-64 p-8">
                <div className="bg-white shadow-md rounded-lg p-6  pt-8">
                    <h1 className="text-3xl font-semibold mb-6 text-gray-700 text-center">SETTINGS</h1>

                    {/* Settings content tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-sm transform scale-105'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;