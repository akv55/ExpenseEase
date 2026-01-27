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

        if (res.data.twoFactorRequired) {
            return res.data;
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
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

    const verifyTwoFactorOtp = async ({ email, otp }) => {
        const res = await API.post("/auth/verify-2fa", { email, otp });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const updateProfileImage = (imageUrl) => {
        setUser((prevUser) => ({
            ...prevUser,
            profileImage: { ...prevUser?.profileImage, url: imageUrl },
        }));
    };

    const editProfileInfo = async (profileData) => {
        const res = await API.put("/user-profiles/editProfileInfo", profileData);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data;

    };

    const updateLoginAlert = async (enabled) => {
        const res = await API.put("/auth/toggle-login-alert", { enabled });
        setUser((prevUser) =>
            prevUser
                ? { ...prevUser, loginAlertEnabled: res.data.loginAlertEnabled }
                : prevUser
        );
        return res.data;
    };

    const toggleTwoFactor = async (enabled) => {
        const res = await API.put("/auth/toggle-2fa", { enabled });
        setUser((prevUser) =>
            prevUser
                ? { ...prevUser, twoFactorEnabled: res.data.twoFactorEnabled }
                : prevUser
        );
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, verifyOtp, resendOtp, requestPasswordReset, resetPassword, logout, changePassword, updateProfileImage, updateLoginAlert, toggleTwoFactor, verifyTwoFactorOtp, editProfileInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
