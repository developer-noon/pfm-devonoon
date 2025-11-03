/** @format */

// src/components/WorkHoursSidebar.jsx
import React from "react";

const WorkHoursSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "tracker", label: "Time Tracker", icon: "⏱️" },
    { id: "analytics", label: "Analytics", icon: "📊" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-sm border-r md:min-h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Work Hours</h2>
        <p className="text-sm text-gray-600">
          Track and analyze your work time
        </p>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
              activeSection === item.id
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default WorkHoursSidebar;
