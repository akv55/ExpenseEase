import React, { createContext, useContext, useState, useEffect, use } from "react";
import API from "../API/api";
const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Create group
    const createGroup = async (groupData) => {
        try {
            const res = await API.post("/groups", groupData);
            setGroups([...groups, res.data]);
            return res.data;
        } catch (err) {
            console.error("Error Creating group:", err);
            throw err; // Re-throw so component can catch it
        }
    };
   
    return (
        <GroupContext.Provider value={{ groups, loading, createGroup }}>
            {children}
        </GroupContext.Provider>
    );

};