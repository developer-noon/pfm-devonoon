/** @format */

// src/components/ExpenseTracker.jsx
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const ExpenseTracker = ({ data, setFinanceData }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    month: new Date().toLocaleString("default", { month: "long" }),
    description: "",
    amount: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        ...formData,
        amount: parseFloat(formData.amount),
        createdAt: serverTimestamp(),
      });

      const newExpense = {
        id: docRef.id,
        ...formData,
        amount: parseFloat(formData.amount),
      };

      setFinanceData((prev) => ({
        ...prev,
        expenses: [...prev.expenses, newExpense],
      }));

      // Reset form
      setFormData({
        date: new Date().toISOString().split("T")[0],
        month: new Date().toLocaleString("default", { month: "long" }),
        description: "",
        amount: "",
      });

      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error adding expense. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const date = new Date(value);
      const monthName = date.toLocaleString("default", { month: "long" });
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        month: monthName,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

  // Calculate monthly expenses like Excel: =SUMIFS($D$2:D2, $B$2:B2, B2)
  const calculateMonthlyExpenses = () => {
    const monthlyTotals = {};
    data.expenses.forEach((expense) => {
      if (!monthlyTotals[expense.month]) {
        monthlyTotals[expense.month] = 0;
      }
      monthlyTotals[expense.month] += parseFloat(expense.amount) || 0;
    });
    return monthlyTotals;
  };

  const monthlyExpenses = calculateMonthlyExpenses();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Expense Tracker
        </h2>
        <p className="text-gray-600">Track your daily expenses and spending</p>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Expense
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <input
              type="text"
              name="month"
              value={formData.month}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shopping, Food, Bills, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Expense History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Monthly Expense
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.expenses.map((expense, index) => (
                <tr key={expense.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.month}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-md">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(monthlyExpenses[expense.month] || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.expenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No expense records found. Add your first expense above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
