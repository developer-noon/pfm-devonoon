/** @format */

// src/components/FinanceDashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardOverview from "./DashboardOverview";
import IncomeTracker from "./IncomeTracker";
import ExpenseTracker from "./ExpenseTracker";
import TeamPayments from "./TeamPayments";
import YearlySummary from "./YearlySummary";
// Add this import at the top
import WorkHoursTracker from "./WorkHoursTracker";

const FinanceDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [financeData, setFinanceData] = useState({
    incomes: [],
    expenses: [],
    teamPayments: [],
    yearlySummary: [],
  });

  const renderActiveSection = () => {
    switch (activeSection) {
      case "income-tracker":
        return (
          <IncomeTracker data={financeData} setFinanceData={setFinanceData} />
        );
      case "expense-tracker":
        return (
          <ExpenseTracker data={financeData} setFinanceData={setFinanceData} />
        );
      case "team-payments":
        return (
          <TeamPayments data={financeData} setFinanceData={setFinanceData} />
        );
      case "yearly-summary":
        return (
          <YearlySummary data={financeData} setFinanceData={setFinanceData} />
        );
      case "dashboard":
      default:
        return <DashboardOverview data={financeData} />;
      // case "work-hours":
      //   return (
      //     <WorkHoursTracker
      //       data={financeData}
      //       setFinanceData={setFinanceData}
      //     />
      //   );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-4 md:p-6">{renderActiveSection()}</main>
    </div>
  );
};

export default FinanceDashboard;
