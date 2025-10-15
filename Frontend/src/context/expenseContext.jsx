import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../API/api";
const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);
export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await API.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);
    
    // Add Expense
    const addExpense = async (expenseData) => {
        setLoading(true);
        try {
            const response = await API.post("/expenses", expenseData);
            setExpenses((prevExpenses) => [...prevExpenses, response.data]);
        } catch (error) {
            console.error("Error adding expense:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ExpenseContext.Provider value={{ expenses, loading, addExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};
