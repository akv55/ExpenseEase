import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const VerifyOtp = ({ onVerify, isLoading, error }) => {
    const [otp, setOtp] = useState('');

    // Full screen wave background component
    const WaveDivider = () => (
        <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 1440"
            x="0"
            y="0"
        >
            <defs>
                <linearGradient id="waveBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <linearGradient id="waveOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
            </defs>

            {/* Background gradient */}
            <rect width="2560" height="1440" fill="url(#waveBg)" />

            {/* Large primary wave */}
            <path
                fill="url(#waveOverlay)"
                d="M0,200 C640,400 1280,100 1920,300 C2240,400 2560,200 2560,300 L2560,1440 L0,1440 Z"
                opacity="0.8"
            />

            {/* Medium wave */}
            <path
                fill="url(#waveOverlay)"
                d="M0,400 C480,600 960,200 1440,500 C1680,650 1920,400 2160,550 C2400,700 2560,500 2560,600 L2560,1440 L0,1440 Z"
                opacity="0.6"
            />

            {/* Small wave */}
            <path
                fill="url(#waveOverlay)"
                d="M0,600 C320,800 640,400 960,700 C1200,850 1440,600 1680,750 C1920,900 2160,700 2400,850 C2560,950 2560,800 2560,900 L2560,1440 L0,1440 Z"
                opacity="0.4"
            />

            {/* White accent wave */}
            <path
                className="fill-white"
                d="M0,800 C400,1000 800,600 1200,900 C1400,1050 1600,800 1800,950 C2000,1100 2200,900 2400,1050 C2560,1150 2560,1000 2560,1100 L2560,1440 L0,1440 Z"
                opacity="0.3"
            />
        </svg>
    );

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