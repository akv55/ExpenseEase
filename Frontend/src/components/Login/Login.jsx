import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import WaveDivider from "../Landing/waveDivider.jsx";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setError('');
    if (!form.email || !form.password) {
      setLoading(false);
      return setError('Please fill in all fields.');
    }

    try {
      setLoading(true);
      await login(form);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
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
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">ExpenseEase</h2>
            <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">Welcome back! Please log in to your account.</p>
          </div>
          {hasAttemptedSubmit && error && (
            <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
              <p className="text-red-600 text-center text-sm font-medium">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              {loading && <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="text-center mt-2 space-y-2">

            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-teal-600 hover:underline">
                Forgot your Password?
              </a>
            </div>
            <p className="text-center text-sm mb-4 mt-4 text-gray-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-teal-600 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex justify-center gap-8">
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-not-allowed text-gray-500">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-not-allowed text-gray-500">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                Facebook
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
