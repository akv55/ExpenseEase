import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLock } from 'react-icons/ci';
import WaveDivider from '../Landing/waveDivider.jsx';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Placeholder for API call
            setMessage('If an account with that email exists, a reset code has been sent.');
            setError('');
        } catch (err) {
            setError('Failed to send reset code');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row text-white relative overflow-hidden">
            {/* Full screen wave background */}
            <div className="absolute inset-0">
                <div className="w-full h-full">
                    <WaveDivider />
                </div>
            </div>

            {/* Centered Form */}
            <div className="flex justify-center items-center w-full min-h-screen relative z-20 p-6">
                <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                    <div className="flex justify-center mb-6">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full shadow-lg">
                            <CiLock className="text-4xl text-white" />
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Forgot Password</h2>
                    <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                        Enter your email to receive a verification code and reset your password.
                    </p>
                    {error && (
                        <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                            <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className='mb-6 bg-green-50 border border-green-200 rounded-xl p-4'>
                            <p className="text-green-600 text-center text-sm font-medium">{message}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Send Reset Code
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Remember your password?
                            <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 ml-1 transition-colors duration-200">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;