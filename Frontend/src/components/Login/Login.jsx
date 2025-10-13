import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Login() {
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard",{user:data.user});
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
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
          {error && (
            <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4'>
              <p className="text-red-600 text-center text-sm font-medium">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="you@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-2 space-y-2">

            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-green-600 hover:underline">
                Forgot your Password?
              </a>
            </div>
            <p className="text-center text-sm mb-4 mt-4 text-gray-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-600 font-semibold hover:underline">
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
