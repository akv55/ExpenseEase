import React from "react";
import API from "../API/api";
const GroupExpenseContext = React.createContext();

export const useGroupExpense = () => React.useContext(GroupExpenseContext);
export const GroupExpenseProvider = ({ children }) => {
    const [groupExpenses, setGroupExpenses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    // Fetch group expenses
    const getGroupExpenses = async (groupId) => {
        setLoading(true);
        try {
            const res = await API.get(`/group-expenses/group/${groupId}`);
            setGroupExpenses(res.data);
        } catch (err) {
            console.error("Error fetching group expenses:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add group expense
    const addGroupExpense = async (expenseData) => {
        try {
            const res = await API.post("/group-expenses/create", expenseData);
            setGroupExpenses([...groupExpenses, res.data.expense]);
            return res.data.expense;
        } catch (err) {
            console.error("Error adding group expense:", err);
            throw err; // Re-throw so component can catch it
        }
    };

    return (
        <GroupExpenseContext.Provider
            value={{ groupExpenses, loading, getGroupExpenses, addGroupExpense }}
        >
            {children}
        </GroupExpenseContext.Provider>
    );
};