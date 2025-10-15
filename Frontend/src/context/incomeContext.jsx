import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../API/api";

const IncomeContext = createContext();

export const useIncome = () => useContext(IncomeContext);

export const IncomeProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch incomes
    const getIncomes = async () => {
        setLoading(true);
        try {
            const res = await API.get("/incomes");
            setIncomes(res.data);
        } catch (err) {
            console.error("Error fetching incomes:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add income
    const addIncome = async (incomeData) => {
        try {
            const res = await API.post("/incomes", incomeData);
            setIncomes([...incomes, res.data]);
            return res.data;
        } catch (err) {
            console.error("Error adding income:", err);
            throw err; // Re-throw so component can catch it
        }
    };
    
    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeContext.Provider value={{ incomes, loading, getIncomes, addIncome, }}>
            {children}
        </IncomeContext.Provider>
    );
};