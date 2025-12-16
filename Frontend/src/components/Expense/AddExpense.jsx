import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import { FaWallet, FaCalendarAlt, FaSave, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useExpense } from '../../context/expenseContext';

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpense();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: ''
  });
  const { amount, description, category } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!amount || !description || !category) {
      setError("Please fill out all required fields.");
      return;
    }
    setLoading(true);
    try {
      await addExpense(formData);
      setFormData({ amount: '', description: '', category: '' });
      navigate('/dashboard');
    } catch (error) {
      setError("Failed to add Expense.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 transition-colors duration-300">
      <Sidebar />
      <div className="md:ml-64 ml-0 p-4 md:p-8">
        <div className="max-w-4xl mx-auto group-container">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-2 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  Add New Expense
                </h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaWallet className="text-teal-500" />
                Expense Details
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
                      onChange={handleChange}
                      name="amount"
                      value={amount}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-600">*</span></label>
                  <select
                    onChange={handleChange}
                    name="category"
                    value={category}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                  >
                    <option value="">Select a category</option>
                    <option value="fast food"> Fast Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="health">Health</option>
                    <option value="shopping">Shopping</option>
                    <option value="education">Education</option>
                    <option value="travel">Travel</option>
                    <option value="rent">Rent</option>
                    <option value="electricity bill">Electricity Bill</option>
                    <option value="water bill">Water Bill</option>
                    <option value="internet bill">Internet Bill</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="gas bill">Gas Bill</option>
                    <option value="fuel">Fuel</option>
                    <option value="groceries shopping">Groceries Shopping</option>
                    <option value="gifts">Gifts</option>
                    <option value="other">Other</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500"><span className="font-semibold text-red-600">Note:</span> Please select the category that best fits your expense.</p>
                </div>

              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-600">*</span></label>
                <textarea
                  type="text"
                  onChange={handleChange}
                  name="description"
                  value={description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 outline-none"
                  placeholder="What did you spend on?"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaSave className="text-lg" />
                  {loading && <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
                  {loading ? 'Saving...' : 'Save Expense'}
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

export default AddExpense;