/** @format */

// src/components/WorkHoursDashboard.jsx
import React, { useState, useEffect } from "react";
import WorkHoursSidebar from "./WorkHoursSidebar";
import WorkHoursTracker from "./WorkHoursTracker";
import WorkHoursAnalytics from "./WorkHoursAnalytics";

const WorkHoursDashboard = () => {
  const [activeSection, setActiveSection] = useState("tracker");
  const [workHoursData, setWorkHoursData] = useState({
    workSessions: [],
    clients: ["Chris"], // Default client
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("workHoursData");
    if (savedData) {
      setWorkHoursData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("workHoursData", JSON.stringify(workHoursData));
  }, [workHoursData]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "analytics":
        return <WorkHoursAnalytics data={workHoursData} />;
      case "tracker":
      default:
        return (
          <WorkHoursTracker
            data={workHoursData}
            setWorkHoursData={setWorkHoursData}
          />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <WorkHoursSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-4 md:p-6">{renderActiveSection()}</main>
    </div>
  );
};

export default WorkHoursDashboard;
