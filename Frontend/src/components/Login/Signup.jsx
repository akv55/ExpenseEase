import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WaveDivider from "../Landing/waveDivider.jsx";
import { useAuth } from "../../context/authContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const { name, phone, email, password, confirmPassword } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">Create your account to get started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {hasAttemptedSubmit && error && (
              <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
                <p className="text-red-600 text-center text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="John Doe"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="1234567890"
                maxLength={10}
                pattern="\d{10}"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="you@example.com"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="Create a strong password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleChange}
              />
              <p className="text-sm text-red-600">
                {password !== confirmPassword && "Passwords do not match"}
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link to="/login" className="text-green-600 font-semibold hover:text-green-700 ml-1 transition-colors duration-200">
                Login
              </Link>
            </p>
          </div>

          <div className="flex items-center my-4">
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
  );
}
