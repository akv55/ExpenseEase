import React, { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";
import { useIncome } from "../../context/incomeContext";
import { useExpense } from "../../context/expenseContext";

const RecentTransactions = () => {
  const { incomes } = useIncome();
  const { expenses } = useExpense();

  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null); // for popup

  // Combine income + expense and sort
  useEffect(() => {
    if (incomes && expenses) {
      const combined = [
        ...incomes.map((item) => ({ ...item, type: "income" })),
        ...expenses.map((item) => ({ ...item, type: "expense" })),
      ];
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(combined.slice(0, 10)); // show last 10
    }
  }, [incomes, expenses]);

  return (
    <div >
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No transactions yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx, index) => (
            <li
              key={index}
              onClick={() => setSelectedTx(tx)} // open popup
              className="flex items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full ${tx.type === "income" ? "bg-green-100" : "bg-red-100"
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
              <p
                className={`font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {tx.type === "income" ? "+" : "-"}₹{tx.amount}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Popup Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative animate-fadeIn">
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${selectedTx.type === "income" ? "bg-green-100" : "bg-red-100"
                  } mb-4`}
              >
                {selectedTx.type === "income" ? (
                  <FaArrowDown className="text-green-600 text-2xl" />
                ) : (
                  <FaArrowUp className="text-red-600 text-2xl" />
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                {selectedTx.category}
              </h3>
              <p
                className={`text-lg font-semibold ${selectedTx.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {selectedTx.type === "income" ? "+" : "-"}₹{selectedTx.amount}
              </p>
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span>{new Date(selectedTx.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 p-3 rounded-lg bg-gray-50">
                <p>
                  {selectedTx.description
                    ? selectedTx.description
                    : "No description provided."}
                </p>
              </div>

            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
