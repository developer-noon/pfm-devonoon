/** @format */

// src/components/CommissionAnalytics.jsx
import React, { useState } from "react";

const CommissionAnalytics = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState("month"); // month, year, all
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from(new Set(data.transactions.map((t) => t.year))).sort(
    (a, b) => b - a
  );

  // Calculate analytics based on filter
  const calculateAnalytics = () => {
    let filteredTransactions = [...data.transactions];

    if (timeFilter === "month") {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      filteredTransactions = filteredTransactions.filter(
        (t) =>
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
      );
    } else if (timeFilter === "year") {
      filteredTransactions = filteredTransactions.filter(
        (t) => new Date(t.date).getFullYear() === selectedYear
      );
    }

    // Person-wise analytics
    const personStats = {};
    filteredTransactions.forEach((transaction) => {
      if (!personStats[transaction.person]) {
        personStats[transaction.person] = {
          totalUSD: 0,
          totalCommissionPKR: 0,
          count: 0,
          averageCommission: 0,
        };
      }

      personStats[transaction.person].totalUSD += transaction.totalUSD;
      personStats[transaction.person].totalCommissionPKR +=
        transaction.commissionPKR;
      personStats[transaction.person].count += 1;
    });

    // Calculate averages
    Object.keys(personStats).forEach((person) => {
      personStats[person].averageCommission =
        personStats[person].totalCommissionPKR / personStats[person].count;
    });

    // Monthly trends
    const monthlyStats = {};
    filteredTransactions.forEach((transaction) => {
      const month = transaction.month;
      if (!monthlyStats[month]) {
        monthlyStats[month] = {
          totalUSD: 0,
          totalCommissionPKR: 0,
          count: 0,
        };
      }

      monthlyStats[month].totalUSD += transaction.totalUSD;
      monthlyStats[month].totalCommissionPKR += transaction.commissionPKR;
      monthlyStats[month].count += 1;
    });

    // Overall totals
    const totals = {
      totalUSD: filteredTransactions.reduce((sum, t) => sum + t.totalUSD, 0),
      totalCommissionPKR: filteredTransactions.reduce(
        (sum, t) => sum + t.commissionPKR,
        0
      ),
      totalTransactions: filteredTransactions.length,
      averageCommissionRate:
        filteredTransactions.reduce(
          (sum, t) => sum + t.commissionPercentage,
          0
        ) / filteredTransactions.length,
      averageUSDRate:
        filteredTransactions.reduce((sum, t) => sum + t.usdRate, 0) /
        filteredTransactions.length,
    };

    return {
      personStats,
      monthlyStats,
      totals,
      filteredTransactions,
    };
  };

  const analytics = calculateAnalytics();

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
          Commission Analytics
        </h2>
        <p className="text-gray-600">Detailed analysis of commission data</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>

          {timeFilter === "year" && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total USD Volume
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(analytics.totals.totalUSD, "USD")}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {analytics.totals.totalTransactions} transactions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Commission
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(analytics.totals.totalCommissionPKR)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Paid out</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Avg. Commission Rate
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {analytics.totals.averageCommissionRate.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Average percentage</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Avg. USD Rate
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {analytics.totals.averageUSDRate.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">PKR per USD</p>
        </div>
      </div>

      {/* Person-wise Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance by Person
        </h3>
        <div className="space-y-4">
          {Object.entries(analytics.personStats)
            .sort(([, a], [, b]) => b.totalCommissionPKR - a.totalCommissionPKR)
            .map(([person, stats]) => (
              <div
                key={person}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900">{person}</h4>
                  <span className="text-sm text-gray-500">
                    {stats.count} transactions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total USD</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(stats.totalUSD, "USD")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Total Commission</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(stats.totalCommissionPKR)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Avg. Commission</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatCurrency(stats.averageCommission)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Monthly Trends */}
      {Object.keys(analytics.monthlyStats).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Trends
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.monthlyStats)
              .sort(([a], [b]) => {
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
                return months.indexOf(a) - months.indexOf(b);
              })
              .map(([month, stats]) => (
                <div
                  key={month}
                  className="flex justify-between items-center py-3 border-b"
                >
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{month}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({stats.count} transactions)
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-semibold">
                        {formatCurrency(stats.totalUSD, "USD")}
                      </p>
                      <p className="text-xs text-gray-500">USD Volume</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600 font-semibold">
                        {formatCurrency(stats.totalCommissionPKR)}
                      </p>
                      <p className="text-xs text-gray-500">Commission</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Commission Distribution */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Commission Distribution
        </h3>
        <div className="space-y-2">
          {Object.entries(analytics.personStats)
            .sort(([, a], [, b]) => b.totalCommissionPKR - a.totalCommissionPKR)
            .map(([person, stats]) => {
              const percentage =
                (stats.totalCommissionPKR /
                  analytics.totals.totalCommissionPKR) *
                100;
              return (
                <div key={person} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{person}</span>
                    <span className="text-gray-600">
                      {formatCurrency(stats.totalCommissionPKR)} (
                      {percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CommissionAnalytics;
