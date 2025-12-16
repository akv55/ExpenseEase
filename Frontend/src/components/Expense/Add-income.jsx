import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { FaWallet, FaCalendarAlt, FaTag, FaBuilding, FaSave, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useIncome } from '../../context/incomeContext';

const AddIncome = () => {
  const { addIncome } = useIncome();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: ''
  });
  const { amount,  description, category } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!amount || !description || !category) {
      setError("Please fill out all required fields.");
      return;
    }
    setLoading(true);
    try {
      await addIncome(formData);
      setFormData({ amount: '', description: '', category: '' });
      navigate('/dashboard');
    } catch (error) {
      setError("Failed to add income.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              Add New Income
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Income Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaWallet className="text-teal-500" />
                Income Details
              </h2>
              {hasAttemptedSubmit && error && (
                <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                  <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      step="1"
                      name="amount"
                      value={amount}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                      placeholder="0.00"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                      onChange={handleChange}
                      name="category"
                      value={category}
                    >
                      <option value="">Select a category</option>
                      <option value="Salary">Salary</option>
                      <option value="Business">Business</option>
                      <option value="Freelancing">Freelancing</option>
                      <option value="Investments">Investments</option>
                      <option value="Rental Income">Rental Income</option>
                      <option value="Gifts">Gifts</option>
                      <option value="Interest">Interest</option>
                      <option value="Monthly Pocket Money">Monthly Pocket Money</option>
                      <option value="Other">Other</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500"><span className="font-semibold text-red-600">Note:</span> Please select the category that best fits your income source.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-600">*</span></label>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                  placeholder="e.g., Monthly salary, Freelance project payment"
                  onChange={handleChange}
                />
              </div>
              {/* Category Selection */}
              
                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 income-btn-group">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaSave className="text-lg" />
                    {loading ? 'Saving...' : 'Save Income'}
                  </button>
                  <Link to={"/dashboard"}
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
