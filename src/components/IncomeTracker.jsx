/** @format */

// src/components/IncomeTracker.jsx
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const IncomeTracker = ({ data, setFinanceData }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    month: new Date().toLocaleString("default", { month: "long" }),
    source: "",
    description: "",
    paymentMethod: "Bank BOP",
    amount: "",
    category: "Freelance",
    expectedSaving: "",
  });

  const paymentMethods = ["Bank BOP", "Jazzcash", "Cash", "Other"];
  const categories = ["Freelance", "Job", "Investment", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "incomes"), {
        ...formData,
        amount: parseFloat(formData.amount),
        createdAt: serverTimestamp(),
      });

      const newIncome = {
        id: docRef.id,
        ...formData,
        amount: parseFloat(formData.amount),
      };

      setFinanceData((prev) => ({
        ...prev,
        incomes: [...prev.incomes, newIncome],
      }));

      // Reset form
      setFormData({
        date: new Date().toISOString().split("T")[0],
        month: new Date().toLocaleString("default", { month: "long" }),
        source: "",
        description: "",
        paymentMethod: "Bank BOP",
        amount: "",
        category: "Freelance",
        expectedSaving: "",
      });

      alert("Income added successfully!");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Error adding income. Please try again.");
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add New Income
        </h2>
        <p className="text-gray-600">Track your income sources and amounts</p>
      </div>

      {/* Add Income Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>
            <input
              type="text"
              name="month"
              value={formData.month}
              readOnly
              className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source *
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="BHATTI, OFFICE, etc."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Amazon Branding, Monthly, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Saving
            </label>
            <input
              type="text"
              name="expectedSaving"
              value={formData.expectedSaving}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="70000 (20)"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full px-6 py-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-lg"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeTracker;
