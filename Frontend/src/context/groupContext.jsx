import React, { createContext, useContext, useState, useCallback } from "react";
import API from "../API/api";
const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [invites, setInvites] = useState([]);
    const [invitesLoading, setInvitesLoading] = useState(false);

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

    // Fetch a single group by id (includes members)
    const fetchGroupById = useCallback(async (groupId) => {
        if (!groupId) throw new Error("groupId is required");
        try {
            const res = await API.get(`/groups/${groupId}`);
            return res.data;
        } catch (err) {
            console.error("Error fetching group by id:", err);
            throw err;
        }
    }, []);
    
    // Create group
    const createGroup = async (groupData) => {
        try {
            const res = await API.post("/groups", groupData);
            const createdGroup = res.data?.group || res.data;
            setGroups((prev) => [...prev, createdGroup]);
            return res.data;
        } catch (err) {
            console.error("Error Creating group:", err);
            throw err; // Re-throw so component can catch it
        }
    };
    
    const fetchInvites = useCallback(async (status = "pending") => {
        setInvitesLoading(true);
        try {
            const res = await API.get("/group-invites", {
                params: { status },
            });
            setInvites(res.data || []);
            return res.data;
        } catch (err) {
            console.error("Error fetching invites:", err);
            throw err;
        } finally {
            setInvitesLoading(false);
        }
    }, []);

    const respondToInvite = async (inviteId, action) => {
        if (!inviteId) throw new Error("inviteId is required");
        try {
            const res = await API.post(`/group-invites/${inviteId}/respond`, { action });
            if (action === "accept") {
                await fetchGroups();
            }
            return res.data;
        } catch (err) {
            console.error("Error responding to invite:", err);
            throw err;
        }
    };

    const sendGroupInvites = async ({ groupId, memberIds, note }) => {
        if (!groupId) throw new Error("groupId is required");
        if (!Array.isArray(memberIds) || memberIds.length === 0) {
            throw new Error("Provide at least one member to invite");
        }
        try {
            const res = await API.post("/group-invites/send", {
                groupId,
                memberIds,
                note,
            });
            return res.data;
        } catch (err) {
            console.error("Error sending group invites:", err);
            throw err;
        }
    };
   
    return (
        <GroupContext.Provider
            value={{
                groups,
                loading,
                invites,
                invitesLoading,
                fetchGroups,
                fetchGroupById,
                fetchInvites,
                respondToInvite,
                sendGroupInvites,
                createGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );

};