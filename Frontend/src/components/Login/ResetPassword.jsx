import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import WaveDivider from '../Landing/waveDivider.jsx';
import { useAuth } from '../../context/authContext.jsx';

const ResetPassword = () => {
    const { resetPassword: resetPasswordRequest } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(() => location.state?.email || localStorage.getItem('resetEmail') || '');
    const [form, setForm] = useState({ otp: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const stateEmail = location.state?.email;

    useEffect(() => {
        if (stateEmail) {
            setEmail(stateEmail);
            localStorage.setItem('resetEmail', stateEmail);
        }
    }, [stateEmail]);

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'otp') {
            setForm((prev) => ({ ...prev, otp: value.replace(/\D/g, '') }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            await resetPasswordRequest({
                email,
                otp: form.otp,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            });
            localStorage.removeItem('resetEmail');
            setMessage('Password reset successful. Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row text-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="w-full h-full">
                    <WaveDivider />
                </div>
            </div>

            <div className="flex justify-center items-center w-full min-h-screen relative z-20 p-6">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                    <div className="flex justify-center mb-6">
                        <span className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-full shadow-lg">
                            <FaKey className="text-3xl text-white" />
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Reset Password</h2>
                    <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                        Enter the verification code sent to your email and choose a new password.
                    </p>

                    {error && (
                        <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                            <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className='mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4'>
                            <p className="text-emerald-700 text-center text-sm font-medium">{message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Verification Code</label>
                            <input
                                type="text"
                                name="otp"
                                maxLength={6}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900 tracking-widest text-center font-mono"
                                placeholder="000000"
                                value={form.otp}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                                placeholder="Create a strong password"
                                value={form.newPassword}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                                placeholder="Re-enter your password"
                                value={form.confirmPassword}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        {form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && (
                            <p className="text-sm text-red-600">Passwords do not match</p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading && <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Remember your password?
                            <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700 ml-1 transition-colors duration-200">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
