import React, { createContext, useContext, useState, useCallback } from "react";
import API from "../API/api";
const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all groups for the logged-in user
    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const res = await API.get("/groups");
            setGroups(res.data || []);
            return res.data;
        } catch (err) {
            console.error("Error fetching groups:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Create group
    const createGroup = async (groupData) => {
        try {
            const res = await API.post("/groups", groupData);
            setGroups((prev) => [...prev, res.data]);
            return res.data;
        } catch (err) {
            console.error("Error Creating group:", err);
            throw err; // Re-throw so component can catch it
        }
    };
   
    return (
        <GroupContext.Provider value={{ groups, loading, fetchGroups, createGroup }}>
            {children}
        </GroupContext.Provider>
    );

};