/** @format */

// src/components/CommissionCalculator.jsx
import React, { useState } from "react";

const CommissionCalculator = ({ data, setCommissionData }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    person: "Chris",
    totalUSD: "",
    usdRate: "",
    commissionPercentage: "",
    description: "",
  });

  const [newPerson, setNewPerson] = useState("");

  // Add new person
  const handleAddPerson = () => {
    if (newPerson.trim() && !data.persons.includes(newPerson.trim())) {
      setCommissionData((prev) => ({
        ...prev,
        persons: [...prev.persons, newPerson.trim()],
      }));
      setNewPerson("");
    }
  };

  // Calculate commission
  const calculateCommission = () => {
    const totalUSD = parseFloat(formData.totalUSD) || 0;
    const usdRate = parseFloat(formData.usdRate) || 0;
    const commissionPercentage = parseFloat(formData.commissionPercentage) || 0;

    const totalPKR = totalUSD * usdRate;
    const commissionUSD = totalUSD * (commissionPercentage / 100);
    const commissionPKR = commissionUSD * usdRate;

    return {
      totalPKR,
      commissionUSD,
      commissionPKR,
      netAmountUSD: totalUSD - commissionUSD,
      netAmountPKR: totalPKR - commissionPKR,
    };
  };

  const commission = calculateCommission();

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      id: Date.now().toString(),
      ...formData,
      totalUSD: parseFloat(formData.totalUSD),
      usdRate: parseFloat(formData.usdRate),
      commissionPercentage: parseFloat(formData.commissionPercentage),
      ...commission,
      month: new Date(formData.date).toLocaleString("default", {
        month: "long",
      }),
      year: new Date(formData.date).getFullYear(),
      timestamp: new Date().toISOString(),
    };

    setCommissionData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, transaction],
    }));

    // Reset form but keep date and person
    setFormData((prev) => ({
      ...prev,
      totalUSD: "",
      usdRate: "",
      commissionPercentage: "",
      description: "",
    }));

    alert("Commission calculated and saved successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Commission Calculator
        </h2>
        <p className="text-gray-600">Calculate commissions in USD and PKR</p>
      </div>

      {/* Add Person Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Manage Persons
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              placeholder="Enter new person name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddPerson}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Person
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Available Persons:</p>
          <div className="flex flex-wrap gap-2">
            {data.persons.map((person, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {person}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Calculate Commission
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person *
              </label>
              <select
                name="person"
                value={formData.person}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {data.persons.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total USD Amount *
              </label>
              <input
                type="number"
                name="totalUSD"
                value={formData.totalUSD}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1 USD to PKR Rate *
              </label>
              <input
                type="number"
                name="usdRate"
                value={formData.usdRate}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="280.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Percentage *
              </label>
              <input
                type="number"
                name="commissionPercentage"
                value={formData.commissionPercentage}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10.00"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project description or notes..."
              />
            </div>
          </div>

          {/* Results Display */}
          {formData.totalUSD &&
            formData.usdRate &&
            formData.commissionPercentage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Commission Calculation Results
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Total PKR</p>
                    <p className="text-xl font-bold text-green-600">
                      ₨{" "}
                      {commission.totalPKR.toLocaleString("en-PK", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">
                      Commission (USD)
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      ${commission.commissionUSD.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">
                      Commission (PKR)
                    </p>
                    <p className="text-xl font-bold text-purple-600">
                      ₨{" "}
                      {commission.commissionPKR.toLocaleString("en-PK", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Your Net (PKR)</p>
                    <p className="text-xl font-bold text-green-600">
                      ₨{" "}
                      {commission.netAmountPKR.toLocaleString("en-PK", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

          <button
            type="submit"
            className="w-full px-6 py-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-lg"
          >
            Save Commission Calculation
          </button>
        </form>
      </div>

      {/* Quick Stats */}
      {data.transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {data.transactions.length}
              </p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {data.persons.length}
              </p>
              <p className="text-sm text-gray-600">Persons</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(data.transactions.map((t) => t.month)).size}
              </p>
              <p className="text-sm text-gray-600">Active Months</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
