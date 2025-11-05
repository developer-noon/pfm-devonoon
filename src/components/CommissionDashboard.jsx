/** @format */

// src/components/CommissionDashboard.jsx
import React, { useState, useEffect } from "react";
import CommissionSidebar from "./CommissionSidebar";
import CommissionCalculator from "./CommissionCalculator";
import CommissionHistory from "./CommissionHistory";
import CommissionAnalytics from "./CommissionAnalytics";

const CommissionDashboard = () => {
  const [activeSection, setActiveSection] = useState("calculator");
  const [commissionData, setCommissionData] = useState({
    transactions: [],
    persons: ["Chris"], // Default person
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("commissionData");
    if (savedData) {
      setCommissionData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("commissionData", JSON.stringify(commissionData));
  }, [commissionData]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "history":
        return <CommissionHistory data={commissionData} />;
      case "analytics":
        return <CommissionAnalytics data={commissionData} />;
      case "calculator":
      default:
        return (
          <CommissionCalculator
            data={commissionData}
            setCommissionData={setCommissionData}
          />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <CommissionSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-4 md:p-6">{renderActiveSection()}</main>
    </div>
  );
};

export default CommissionDashboard;
