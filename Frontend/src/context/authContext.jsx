import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../API/api.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Check for token and fetch user profile on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Assume user is set from login/signup, or fetch if needed
            // const res = await API.get("/auth/profile");
            // setUser(res.data.user);
        }
        setLoading(false);
    }, []);
    // Signup function
    const signup = async (formData) => {
        const res = await API.post("/auth/signup", formData);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
    };
    // Login function
    const login = async (formData) => {
        const res = await API.post("/auth/login", formData);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
    };
    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
