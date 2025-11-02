/** @format */

// src/components/DashboardOverview.jsx
import React from "react";

const DashboardOverview = ({ data }) => {
  // Calculate metrics based on your Excel formulas
  const calculateMetrics = () => {
    const currentMonth = new Date().getMonth();
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

    const juneIncome = data.incomes
      .filter((income) => income.month === "June")
      .reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);

    const julyIncome = data.incomes
      .filter((income) => income.month === "July")
      .reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);

    const augustIncome = data.incomes
      .filter((income) => income.month === "August")
      .reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);

    const juneExpenses = data.expenses
      .filter((expense) => expense.month === "June")
      .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

    const julyExpenses = data.expenses
      .filter((expense) => expense.month === "July")
      .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

    const augustExpenses = data.expenses
      .filter((expense) => expense.month === "August")
      .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

    const juneTeamPayments = data.teamPayments
      .filter((payment) => payment.month === "June")
      .reduce((sum, payment) => sum + (parseFloat(payment.amountPaid) || 0), 0);

    const julyTeamPayments = data.teamPayments
      .filter((payment) => payment.month === "July")
      .reduce((sum, payment) => sum + (parseFloat(payment.amountPaid) || 0), 0);

    const augustTeamPayments = data.teamPayments
      .filter((payment) => payment.month === "August")
      .reduce((sum, payment) => sum + (parseFloat(payment.amountPaid) || 0), 0);

    const netProfitYTM =
      juneIncome +
      julyIncome +
      augustIncome -
      (juneExpenses + julyExpenses + augustExpenses) -
      (juneTeamPayments + julyTeamPayments + augustTeamPayments);

    const totalSavingsGoal = 50000 + 125000 + 125000; // From your Excel
    const actualSaved = netProfitYTM * 0.86; // Your formula: =E2*0.86
    const savingsGoalAchieved =
      totalSavingsGoal > 0 ? (actualSaved / totalSavingsGoal) * 100 : 0;

    return {
      juneIncome,
      julyIncome,
      augustIncome,
      juneExpenses,
      julyExpenses,
      augustExpenses,
      juneTeamPayments,
      julyTeamPayments,
      augustTeamPayments,
      netProfitYTM,
      totalSavingsGoal,
      actualSaved,
      savingsGoalAchieved,
    };
  };

  const metrics = calculateMetrics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

  const metricCards = [
    { title: "Year-to-June Income", value: metrics.juneIncome, color: "green" },
    { title: "Year-to-July Income", value: metrics.julyIncome, color: "green" },
    {
      title: "Year-to-August Income",
      value: metrics.augustIncome,
      color: "green",
    },
    {
      title: "Year-to-June Expenses",
      value: metrics.juneExpenses,
      color: "red",
    },
    {
      title: "Year-to-July Expenses",
      value: metrics.julyExpenses,
      color: "red",
    },
    {
      title: "Year-to-August Expenses",
      value: metrics.augustExpenses,
      color: "red",
    },
    {
      title: "Year-to-June Team Payments",
      value: metrics.juneTeamPayments,
      color: "blue",
    },
    {
      title: "Year-to-July Team Payments",
      value: metrics.julyTeamPayments,
      color: "blue",
    },
    {
      title: "Year-to-August Team Payments",
      value: metrics.augustTeamPayments,
      color: "blue",
    },
    {
      title: "Net Profit YTM",
      value: metrics.netProfitYTM,
      color: metrics.netProfitYTM >= 0 ? "green" : "red",
    },
    {
      title: "Total Savings Goal",
      value: metrics.totalSavingsGoal,
      color: "purple",
    },
    { title: "Actual Saved", value: metrics.actualSaved, color: "green" },
    {
      title: "Savings Goal Achieved %",
      value: `${metrics.savingsGoalAchieved.toFixed(1)}%`,
      color: metrics.savingsGoalAchieved >= 100 ? "green" : "yellow",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Financial Dashboard
        </h2>
        <p className="text-gray-600">
          Complete overview of your finances based on your Excel structure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {metric.title}
            </h3>
            <p
              className={`text-2xl font-bold ${
                metric.color === "green"
                  ? "text-green-600"
                  : metric.color === "red"
                  ? "text-red-600"
                  : metric.color === "blue"
                  ? "text-blue-600"
                  : metric.color === "purple"
                  ? "text-purple-600"
                  : "text-yellow-600"
              }`}
            >
              {metric.title.includes("%")
                ? metric.value
                : formatCurrency(metric.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Income
          </h3>
          {data.incomes.slice(-3).map((income, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-medium">{income.source}</p>
                <p className="text-sm text-gray-500">{income.month}</p>
              </div>
              <p className="text-green-600 font-semibold">
                {formatCurrency(income.amount)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Expenses
          </h3>
          {data.expenses.slice(-3).map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-medium truncate">
                  {expense.description.substring(0, 30)}...
                </p>
                <p className="text-sm text-gray-500">{expense.month}</p>
              </div>
              <p className="text-red-600 font-semibold">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Payments
          </h3>
          {data.teamPayments.slice(-3).map((payment, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-medium">{payment.teamMember}</p>
                <p className="text-sm text-gray-500">{payment.month}</p>
              </div>
              <p className="text-blue-600 font-semibold">
                {formatCurrency(payment.amountPaid)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
