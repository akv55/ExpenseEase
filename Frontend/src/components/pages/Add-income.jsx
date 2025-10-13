import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { FaWallet, FaCalendarAlt, FaTag, FaBuilding, FaSave, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddIncome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />

      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              Add New Income
            </h1>
          </div>

          <form className="space-y-8">
            {/* Basic Income Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FaWallet className="text-green-500" />
                Income Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  placeholder="e.g., Monthly salary, Freelance project payment"
                  required
                />
              </div>
              {/* Category Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category <span className="text-red-600">*</span></label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="salary">Salary</option>
                  <option value="business">Business</option>
                  <option value="freelance">Freelance</option>
                  <option value="investments">Investments</option>
                  <option value="gifts">Gifts</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaSave className="text-lg" />
                  Save Income
                </button>
                <Link to={"/dashboard"}
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaTimes className="text-lg" />
                  Cancel
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
