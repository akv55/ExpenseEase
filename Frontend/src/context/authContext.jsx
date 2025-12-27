import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../API/api.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Try loading from localStorage first
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await API.get("/auth/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(res.data.user);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                    logout(); // Clear bad token
                }
            }
            setLoading(false);
        };
        fetchUserProfile();
    }, []);

    // Signup function
    const signup = async (formData) => {
        const res = await API.post("/auth/signup", formData);
        return res.data;
    };
    // Login function
    const login = async (formData) => {
        const res = await API.post("/auth/login", formData);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
    };
    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    // Change Password
    const changePassword = async (formData) => {
        const res = await API.post("/auth/change-password", formData);
        return res.data;
    };

    const verifyOtp = async ({ email, otp }) => {
        const res = await API.post("/auth/verify-otp", { email, otp });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const resendOtp = async (email) => {
        const res = await API.post("/auth/resend-otp", { email });
        return res.data;
    };

    const requestPasswordReset = async (email) => {
        const res = await API.post("/auth/forgot-password", { email });
        return res.data;
    };

    const resetPassword = async (payload) => {
        const res = await API.post("/auth/reset-password", payload);
        return res.data;
    };

    const updateProfileImage = (imageUrl) => {
        setUser((prevUser) => ({
            ...prevUser,
            profileImage: { ...prevUser.profileImage, url: imageUrl },
        }));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, verifyOtp, resendOtp, requestPasswordReset, resetPassword, logout, changePassword, updateProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};
