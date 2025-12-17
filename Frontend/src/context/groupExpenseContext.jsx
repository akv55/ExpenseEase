import React, { useMemo } from "react";
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
            setGroupExpenses(res.data?.data || res.data);
        } catch (err) {
            console.error("Error fetching group expenses:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Convert groupExpenses → transactions (derived state)
    const transactions = useMemo(() => {
        return groupExpenses.map((expense) => ({
            id: expense._id,
            title: expense.title,
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            date: expense.createdAt,
            settled: expense.settled,
            splitAmong: expense.participants?.length || 0,
            paidBy: {
                name: expense.paidBy?.name || "Unknown",
                contribution: expense.amount,
            },
            yourShare:
                expense.participants?.find(
                    (p) => p.user?._id === expense.currentUserId
                )?.share || 0,

            participants:
                expense.participants?.map((p) => ({
                    name: p.user?.name || "User",
                    share: p.share,
                    status: p.settled ? "paid" : "pending",
                })) || [],
        }));
    }, [groupExpenses]);

    // Add group expense
    const addGroupExpense = async (expenseData) => {
        try {
            const res = await API.post("/group-expenses/create", expenseData);
            setGroupExpenses((prev) => [...prev, res.data.expense]);
            return res.data.expense;
        } catch (err) {
            console.error("Error adding group expense:", err);
            throw err;
        }
    };

    return (
        <GroupExpenseContext.Provider
            value={{
                groupExpenses,
                loading,
                getGroupExpenses,
                addGroupExpense,
                transactions,
            }}
        >
            {children}
        </GroupExpenseContext.Provider>
    );
};
