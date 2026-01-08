import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import WaveDivider from "../Landing/waveDivider.jsx";
import { useAuth } from "../../context/authContext.jsx";
import { toast } from "react-toastify";

const TwoFactorVerify = () => {
  const { verifyTwoFactorOtp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(() => location.state?.email || localStorage.getItem("twoFactorEmail") || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stateEmail = location.state?.email;

  useEffect(() => {
    if (stateEmail) {
      setEmail(stateEmail);
      localStorage.setItem("twoFactorEmail", stateEmail);
    }
  }, [stateEmail]);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || !email) return;

    setError("");
    setIsLoading(true);
    try {
      await verifyTwoFactorOtp({ email, otp });
      localStorage.removeItem("twoFactorEmail");
      toast.success("Two Factor verification successful.");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              <FaShieldAlt className="text-3xl text-white" />
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">Verify Login</h2>
          <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
            We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below to finish logging in.
          </p>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
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
                className="w-full p-2 border border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all duration-200 bg-gray-50 text-center text-2xl font-mono tracking-widest placeholder-gray-400 text-gray-900"
                disabled={isLoading}
                autoFocus
                required
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Code expires in 5 minutes. Need a new one? Sign in again.
              </p>
            </div>
            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Entered the wrong email?&nbsp;
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("twoFactorEmail");
                  navigate("/login");
                }}
                className="text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-200 cursor-pointer"
              >
                Go back to login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerify;
