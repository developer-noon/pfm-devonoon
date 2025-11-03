/** @format */

// src/components/YearlySummary.jsx
import React, { useState } from "react";

const YearlySummary = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [viewType, setViewType] = useState("overview"); // overview, detailed, trends

  // Get available years from data
  const getAvailableYears = () => {
    const years = new Set();
    data.incomes.forEach((income) => {
      if (income.date) {
        years.add(new Date(income.date).getFullYear());
      }
    });
    data.expenses.forEach((expense) => {
      if (expense.date) {
        years.add(new Date(expense.date).getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  };

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
    "All",
  ];

  // Calculate comprehensive analytics
  const calculateAnalytics = () => {
    const filteredIncomes = data.incomes.filter((income) => {
      const incomeYear = income.date
        ? new Date(income.date).getFullYear()
        : selectedYear;
      const incomeMonth = income.month;
      return (
        incomeYear === selectedYear &&
        (selectedMonth === "All" || incomeMonth === selectedMonth)
      );
    });

    const filteredExpenses = data.expenses.filter((expense) => {
      const expenseYear = expense.date
        ? new Date(expense.date).getFullYear()
        : selectedYear;
      const expenseMonth = expense.month;
      return (
        expenseYear === selectedYear &&
        (selectedMonth === "All" || expenseMonth === selectedMonth)
      );
    });

    const filteredTeamPayments = data.teamPayments.filter((payment) => {
      const paymentYear = payment.date
        ? new Date(payment.date).getFullYear()
        : selectedYear;
      const paymentMonth = payment.month;
      return (
        paymentYear === selectedYear &&
        (selectedMonth === "All" || paymentMonth === selectedMonth)
      );
    });

    // Basic totals
    const totalIncome = filteredIncomes.reduce(
      (sum, income) => sum + (parseFloat(income.amount) || 0),
      0
    );
    const totalExpenses = filteredExpenses.reduce(
      (sum, expense) => sum + (parseFloat(expense.amount) || 0),
      0
    );
    const totalTeamPayments = filteredTeamPayments.reduce(
      (sum, payment) => sum + (parseFloat(payment.amountPaid) || 0),
      0
    );
    const netProfit = totalIncome - totalExpenses - totalTeamPayments;

    // Income analysis
    const incomeBySource = {};
    const incomeByCategory = {};
    filteredIncomes.forEach((income) => {
      incomeBySource[income.source] =
        (incomeBySource[income.source] || 0) + (parseFloat(income.amount) || 0);
      incomeByCategory[income.category] =
        (incomeByCategory[income.category] || 0) +
        (parseFloat(income.amount) || 0);
    });

    // Expense analysis
    const expenseTrends = {};
    filteredExpenses.forEach((expense) => {
      // Simple categorization based on description keywords
      let category = "Other";
      const desc = expense.description.toLowerCase();
      if (
        desc.includes("food") ||
        desc.includes("lunch") ||
        desc.includes("dinner") ||
        desc.includes("zinger")
      ) {
        category = "Food";
      } else if (
        desc.includes("shopping") ||
        desc.includes("shirt") ||
        desc.includes("pant")
      ) {
        category = "Shopping";
      } else if (desc.includes("petrol") || desc.includes("transport")) {
        category = "Transport";
      } else if (
        desc.includes("bill") ||
        desc.includes("wifi") ||
        desc.includes("electric")
      ) {
        category = "Bills";
      } else if (desc.includes("medical") || desc.includes("health")) {
        category = "Healthcare";
      }

      expenseTrends[category] =
        (expenseTrends[category] || 0) + (parseFloat(expense.amount) || 0);
    });

    // Monthly breakdown
    const monthlyData = {};
    months.slice(0, 12).forEach((month) => {
      const monthIncomes = filteredIncomes.filter(
        (income) => income.month === month
      );
      const monthExpenses = filteredExpenses.filter(
        (expense) => expense.month === month
      );
      const monthTeamPayments = filteredTeamPayments.filter(
        (payment) => payment.month === month
      );

      monthlyData[month] = {
        income: monthIncomes.reduce(
          (sum, income) => sum + (parseFloat(income.amount) || 0),
          0
        ),
        expenses: monthExpenses.reduce(
          (sum, expense) => sum + (parseFloat(expense.amount) || 0),
          0
        ),
        teamPayments: monthTeamPayments.reduce(
          (sum, payment) => sum + (parseFloat(payment.amountPaid) || 0),
          0
        ),
        netProfit: 0,
      };
      monthlyData[month].netProfit =
        monthlyData[month].income -
        monthlyData[month].expenses -
        monthlyData[month].teamPayments;
    });

    return {
      totals: { totalIncome, totalExpenses, totalTeamPayments, netProfit },
      incomeAnalysis: {
        bySource: incomeBySource,
        byCategory: incomeByCategory,
      },
      expenseAnalysis: expenseTrends,
      monthlyData,
      records: {
        incomes: filteredIncomes.length,
        expenses: filteredExpenses.length,
        teamPayments: filteredTeamPayments.length,
      },
    };
  };

  const analytics = calculateAnalytics();
  const availableYears = getAvailableYears();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

  const formatPercentage = (value, total) => {
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Financial Analytics
            </h2>
            <p className="text-gray-600">
              Comprehensive analysis of your financial data
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {["overview", "detailed", "trends"].map((type) => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  className={`px-3 py-2 text-sm font-medium rounded-md capitalize ${
                    viewType === type
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview View */}
      {viewType === "overview" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Total Income
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(analytics.totals.totalIncome)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {analytics.records.incomes} records
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Total Expenses
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(analytics.totals.totalExpenses)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {analytics.records.expenses} records
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Team Payments
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(analytics.totals.totalTeamPayments)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {analytics.records.teamPayments} records
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Net Profit
              </h3>
              <p
                className={`text-2xl font-bold ${
                  analytics.totals.netProfit >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(analytics.totals.netProfit)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Profit/Loss</p>
            </div>
          </div>

          {/* Income Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Income by Source
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.incomeAnalysis.bySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, amount]) => (
                    <div
                      key={source}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {source}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-semibold">
                          {formatCurrency(amount)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatPercentage(
                            amount,
                            analytics.totals.totalIncome
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Expense Categories
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.expenseAnalysis)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => (
                    <div
                      key={category}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-600 font-semibold">
                          {formatCurrency(amount)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatPercentage(
                            amount,
                            analytics.totals.totalExpenses
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed View */}
      {viewType === "detailed" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Expenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Team Payments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Net Profit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {months.slice(0, 12).map((month) => (
                    <tr key={month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {formatCurrency(analytics.monthlyData[month].income)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {formatCurrency(analytics.monthlyData[month].expenses)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {formatCurrency(
                          analytics.monthlyData[month].teamPayments
                        )}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                          analytics.monthlyData[month].netProfit >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(analytics.monthlyData[month].netProfit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Trends View */}
      {viewType === "trends" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Financial Health
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">
                  {analytics.totals.totalIncome > 0
                    ? formatPercentage(
                        analytics.totals.netProfit,
                        analytics.totals.totalIncome
                      )
                    : "0%"}
                </p>
                <p className="text-sm text-gray-600 mt-2">Profit Margin</p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">
                  {analytics.totals.totalIncome > 0
                    ? formatPercentage(
                        analytics.totals.totalExpenses,
                        analytics.totals.totalIncome
                      )
                    : "0%"}
                </p>
                <p className="text-sm text-gray-600 mt-2">Expense Ratio</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">
                  {analytics.totals.totalIncome > 0
                    ? formatPercentage(
                        analytics.totals.totalTeamPayments,
                        analytics.totals.totalIncome
                      )
                    : "0%"}
                </p>
                <p className="text-sm text-gray-600 mt-2">Team Cost Ratio</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Records Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {analytics.records.incomes}
                </div>
                <p className="text-gray-600">Income Records</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {analytics.records.expenses}
                </div>
                <p className="text-gray-600">Expense Records</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {analytics.records.teamPayments}
                </div>
                <p className="text-gray-600">Team Payments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlySummary;
