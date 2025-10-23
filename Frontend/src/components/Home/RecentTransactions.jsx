import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaMoneyBillWave } from "react-icons/fa";
import { useIncome } from "../../context/incomeContext";
import { useExpense } from "../../context/expenseContext";

const RecentTransactions = () => {
  const { incomes } = useIncome();
  const { expenses } = useExpense();
  const [transactions, setTransactions] = useState([]);

  // Combine and sort by date
  useEffect(() => {
    if (incomes && expenses) {
      const combined = [
        ...incomes.map((item) => ({ ...item, type: "income" })),
        ...expenses.map((item) => ({ ...item, type: "expense" })),
      ];

      // Sort by date (latest first)
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Show only last 10 transactions
      setTransactions(combined.slice(0, 10));
    }
  }, [incomes, expenses]);

  return (
    <div>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No recent transactions available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-all
              hover:`${tx.description}
              "
            >
              {/* Left side: category and description */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full ${
                    tx.type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {tx.type === "income" ? (
                    <FaArrowDown className="text-green-600" />
                  ) : (
                    <FaArrowUp className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {tx.category}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                      {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side: amount */}
              <p
                className={`font-semibold ${
                  tx.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}₹{tx.amount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
