/** @format */

// src/components/DashboardOverview.jsx
import React from "react";

const DashboardOverview = ({ data }) => {
  // Calculate current month metrics
  const calculateCurrentMonthMetrics = () => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    const currentMonthIncome = data.incomes
      .filter((income) => income.month === currentMonth)
      .reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);

    const currentMonthExpenses = data.expenses
      .filter((expense) => expense.month === currentMonth)
      .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

    const currentMonthTeamPayments = data.teamPayments
      .filter((payment) => payment.month === currentMonth)
      .reduce((sum, payment) => sum + (parseFloat(payment.amountPaid) || 0), 0);

    return {
      currentMonth,
      currentMonthIncome,
      currentMonthExpenses,
      currentMonthTeamPayments,
    };
  };

  const metrics = calculateCurrentMonthMetrics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Financial Dashboard
        </h2>
        <p className="text-gray-600">
          Overview of your {metrics.currentMonth} finances
        </p>
      </div>

      {/* Current Month Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {metrics.currentMonth} Income
          </h3>
          <p className="text-3xl font-bold text-green-600 mb-4">
            {formatCurrency(metrics.currentMonthIncome)}
          </p>
          <div className="space-y-3">
            {data.incomes
              .filter((income) => income.month === metrics.currentMonth)
              .slice(-5)
              .map((income, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium text-sm">{income.source}</p>
                    <p className="text-xs text-gray-500">
                      {income.description}
                    </p>
                  </div>
                  <p className="text-green-600 font-semibold text-sm">
                    {formatCurrency(income.amount)}
                  </p>
                </div>
              ))}
            {data.incomes.filter(
              (income) => income.month === metrics.currentMonth
            ).length === 0 && (
              <p className="text-gray-500 text-sm">
                No income recorded this month
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {metrics.currentMonth} Expenses
          </h3>
          <p className="text-3xl font-bold text-red-600 mb-4">
            {formatCurrency(metrics.currentMonthExpenses)}
          </p>
          <div className="space-y-3">
            {data.expenses
              .filter((expense) => expense.month === metrics.currentMonth)
              .slice(-5)
              .map((expense, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {expense.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-red-600 font-semibold text-sm ml-2">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              ))}
            {data.expenses.filter(
              (expense) => expense.month === metrics.currentMonth
            ).length === 0 && (
              <p className="text-gray-500 text-sm">
                No expenses recorded this month
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {metrics.currentMonth} Team Payments
          </h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            {formatCurrency(metrics.currentMonthTeamPayments)}
          </p>
          <div className="space-y-3">
            {data.teamPayments
              .filter((payment) => payment.month === metrics.currentMonth)
              .slice(-5)
              .map((payment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium text-sm">{payment.teamMember}</p>
                    <p className="text-xs text-gray-500">
                      {payment.taskProject}
                    </p>
                  </div>
                  <p className="text-blue-600 font-semibold text-sm">
                    {formatCurrency(payment.amountPaid)}
                  </p>
                </div>
              ))}
            {data.teamPayments.filter(
              (payment) => payment.month === metrics.currentMonth
            ).length === 0 && (
              <p className="text-gray-500 text-sm">
                No team payments this month
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {data.incomes.length}
            </p>
            <p className="text-sm text-gray-600">Total Income Records</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">
              {data.expenses.length}
            </p>
            <p className="text-sm text-gray-600">Total Expense Records</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {data.teamPayments.length}
            </p>
            <p className="text-sm text-gray-600">Team Payments</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {new Set(data.incomes.map((income) => income.month)).size}
            </p>
            <p className="text-sm text-gray-600">Active Months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
