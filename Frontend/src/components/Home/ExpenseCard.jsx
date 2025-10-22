import React, { useState, useEffect } from 'react';
import { useIncome } from '../../context/incomeContext.jsx';
import { useExpense } from '../../context/expenseContext.jsx';
import { useAuth } from '../../context/authContext.jsx';
import { FaIndianRupeeSign, FaUsers } from 'react-icons/fa6';

const ExpenseCard = () => {
    const { user } = useAuth();
    const { incomes } = useIncome();
    // compute total income from incomes array (backend stores each income with `amount`)
    const totalIncome = Array.isArray(incomes) && incomes.length > 0
        ? incomes.reduce((sum, it) => sum + (Number(it.amount) || 0), 0)
        : Number(user?.income) || 0;
    const formattedIncome = new Intl.NumberFormat('en-IN').format(totalIncome);
    const { expenses } = useExpense();
    // compute total expenses from expenses array (backend stores each expense with `amount`)
    const totalExpenses = Array.isArray(expenses) && expenses.length > 0
        ? expenses.reduce((sum, it) => sum + (Number(it.amount) || 0), 0)
        : 0;
    const formattedExpenses = new Intl.NumberFormat('en-IN').format(totalExpenses);
    const netBalance = totalIncome - totalExpenses;
    const formattedNetBalance = new Intl.NumberFormat('en-IN').format(netBalance);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
                <div className="relative z-10 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg">
                        <FaIndianRupeeSign className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Income</p>
                        <p className="text-2xl  text-gray-600 sm:font-semibold">₹{formattedIncome}</p>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-green-600">+12% from last month</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
                <div className="relative z-10 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                        <p className="text-2xl  text-gray-600 sm:font-semibold">₹{formattedExpenses}</p>
                        <div className="flex items-center mt-1 ">
                            <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-red-600">Within budget</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
                <div className="relative z-10 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg">
                        <FaIndianRupeeSign className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Net Balance</p>
                        <p className="text-2xl text-gray-600 sm:font-semibold">₹{formattedNetBalance}</p>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-blue-600">Great job!</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
                <div className="relative z-10 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-lg">
                        <FaUsers className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 md:font-semibold">Group Expenses</p>
                        <p className="text-2xl  text-gray-600 md:font-semibold">₹5,000</p>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-sky-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-sky-600">3 Group</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;