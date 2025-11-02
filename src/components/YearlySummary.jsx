/** @format */

// src/components/YearlySummary.jsx
import React from "react";

const YearlySummary = ({ data }) => {
  // Calculate yearly summary data based on your Excel formulas
  const calculateYearlySummary = () => {
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

    return months.map((month) => {
      const monthIncomes = data.incomes.filter(
        (income) => income.month === month
      );
      const monthExpenses = data.expenses.filter(
        (expense) => expense.month === month
      );
      const monthTeamPayments = data.teamPayments.filter(
        (payment) => payment.month === month
      );

      const totalIncome = monthIncomes.reduce(
        (sum, income) => sum + (parseFloat(income.amount) || 0),
        0
      );
      const totalExpenses = monthExpenses.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0
      );
      const totalTeamPayments = monthTeamPayments.reduce(
        (sum, payment) => sum + (parseFloat(payment.amountPaid) || 0),
        0
      );
      const netProfit = totalIncome - totalExpenses - totalTeamPayments;

      // Savings goals from your Excel
      const savingsGoals = {
        June: 50000,
        July: 125000,
        August: 125000,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
      };

      const savingsGoal = savingsGoals[month] || 0;
      const actualSavings = netProfit * 0.86; // Your formula: =E2*0.86
      const savedPercentage =
        savingsGoal > 0 ? (actualSavings / savingsGoal) * 100 : 0;

      return {
        month,
        totalIncome,
        totalExpenses,
        totalTeamPayments,
        netProfit,
        savingsGoal,
        actualSavings,
        savedPercentage,
      };
    });
  };

  const yearlyData = calculateYearlySummary();
  const currentYear = new Date().getFullYear();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate totals
  const totals = yearlyData.reduce(
    (acc, month) => ({
      totalIncome: acc.totalIncome + month.totalIncome,
      totalExpenses: acc.totalExpenses + month.totalExpenses,
      totalTeamPayments: acc.totalTeamPayments + month.totalTeamPayments,
      netProfit: acc.netProfit + month.netProfit,
      totalSavingsGoal: acc.totalSavingsGoal + month.savingsGoal,
      totalActualSavings: acc.totalActualSavings + month.actualSavings,
    }),
    {
      totalIncome: 0,
      totalExpenses: 0,
      totalTeamPayments: 0,
      netProfit: 0,
      totalSavingsGoal: 0,
      totalActualSavings: 0,
    }
  );

  const overallSavingsPercentage =
    totals.totalSavingsGoal > 0
      ? (totals.totalActualSavings / totals.totalSavingsGoal) * 100
      : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Yearly Summary {currentYear}
        </h2>
        <p className="text-gray-600">
          Complete financial overview with savings tracking
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Income
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totals.totalIncome)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totals.totalExpenses)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Net Profit</h3>
          <p
            className={`text-2xl font-bold ${
              totals.netProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(totals.netProfit)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Savings Achieved
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatPercentage(overallSavingsPercentage)}
          </p>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Expenses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Payments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings Goal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saved %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {yearlyData.map((monthData, index) => (
                <tr key={monthData.month} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {monthData.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {formatCurrency(monthData.totalIncome)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {formatCurrency(monthData.totalExpenses)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {formatCurrency(monthData.totalTeamPayments)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      monthData.netProfit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(monthData.netProfit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(monthData.savingsGoal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                    {formatCurrency(monthData.actualSavings)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        monthData.savedPercentage >= 100
                          ? "bg-green-100 text-green-800"
                          : monthData.savedPercentage >= 50
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {formatPercentage(monthData.savedPercentage)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Totals Row */}
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  {formatCurrency(totals.totalIncome)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                  {formatCurrency(totals.totalExpenses)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                  {formatCurrency(totals.totalTeamPayments)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    totals.netProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(totals.netProfit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {formatCurrency(totals.totalSavingsGoal)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                  {formatCurrency(totals.totalActualSavings)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${
                      overallSavingsPercentage >= 100
                        ? "bg-green-100 text-green-800"
                        : overallSavingsPercentage >= 50
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formatPercentage(overallSavingsPercentage)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Savings Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Savings Progress
        </h3>
        <div className="space-y-4">
          {yearlyData
            .filter((month) => month.savingsGoal > 0)
            .map((monthData) => (
              <div key={monthData.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {monthData.month}
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(monthData.actualSavings)} /{" "}
                    {formatCurrency(monthData.savingsGoal)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      monthData.savedPercentage >= 100
                        ? "bg-green-600"
                        : monthData.savedPercentage >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(monthData.savedPercentage, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default YearlySummary;
