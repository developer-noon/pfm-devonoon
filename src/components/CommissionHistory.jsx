/** @format */

// src/components/CommissionHistory.jsx
import React, { useState } from "react";

const CommissionHistory = ({ data }) => {
  const [filterPerson, setFilterPerson] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  // Get unique filter options
  const persons = ["All", ...data.persons];
  const months = [
    "All",
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
  const years = [
    "All",
    ...Array.from(new Set(data.transactions.map((t) => t.year))),
  ].sort((a, b) => b - a);

  // Filter transactions
  const filteredTransactions = data.transactions.filter((transaction) => {
    return (
      (filterPerson === "All" || transaction.person === filterPerson) &&
      (filterMonth === "All" || transaction.month === filterMonth) &&
      (filterYear === "All" || transaction.year.toString() === filterYear)
    );
  });

  const formatCurrency = (amount, currency = "PKR") => {
    if (currency === "USD") {
      return `$${amount.toFixed(2)}`;
    }
    return `₨ ${amount.toLocaleString("en-PK", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Commission History
        </h2>
        <p className="text-gray-600">View all commission transactions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Person
            </label>
            <select
              value={filterPerson}
              onChange={(e) => setFilterPerson(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {persons.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Transactions ({filteredTransactions.length})
          </h3>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No transactions found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try changing your filters or add new transactions
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total USD
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    USD Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Commission %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Commission PKR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Net Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {transaction.person}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {transaction.description || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      {formatCurrency(transaction.totalUSD, "USD")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.usdRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-semibold">
                      {transaction.commissionPercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      {formatCurrency(transaction.commissionPKR)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      {formatCurrency(transaction.netAmountPKR)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredTransactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(
                  filteredTransactions.reduce((sum, t) => sum + t.totalUSD, 0),
                  "USD"
                )}
              </p>
              <p className="text-sm text-gray-600">Total USD</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-xl font-bold text-red-600">
                {formatCurrency(
                  filteredTransactions.reduce(
                    (sum, t) => sum + t.commissionPKR,
                    0
                  )
                )}
              </p>
              <p className="text-sm text-gray-600">Total Commission</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">
                {filteredTransactions.length}
              </p>
              <p className="text-sm text-gray-600">Transactions</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-600">
                {new Set(filteredTransactions.map((t) => t.person)).size}
              </p>
              <p className="text-sm text-gray-600">Persons</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionHistory;
