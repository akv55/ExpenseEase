import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import WaveDivider from '../Landing/waveDivider.jsx';

const VerifyOtp = ({ onVerify, isLoading, error }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.length === 6 && onVerify) {
            onVerify(otp);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        setOtp(value);
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
                <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                    <div className="flex justify-center mb-6">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full shadow-lg">
                            <FaShieldAlt className="text-3xl text-white" />
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Verify Your Email</h2>
                    <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                        We've sent a 6-digit code to your email address. Please enter it below to continue.
                    </p>
                    {error && (
                        <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                            <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block text-center">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleChange}
                                placeholder="000000"
                                maxLength={6}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 text-center text-2xl font-mono tracking-widest placeholder-gray-400 text-gray-900"
                                disabled={isLoading}
                                autoFocus
                                required
                            />
                            <p className="text-xs text-gray-500 text-center mt-2">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={otp.length !== 6 || isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?
                            <button className="text-green-600 font-semibold hover:text-green-700 ml-1 transition-colors duration-200">
                                Resend Code
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;