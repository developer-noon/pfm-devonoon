/** @format */

// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "income-tracker", label: "Income Tracker", icon: "💰" },
    { id: "expense-tracker", label: "Expense Tracker", icon: "🛒" },
    { id: "team-payments", label: "Team Payments", icon: "👥" },
    { id: "yearly-summary", label: "Yearly Summary", icon: "📈" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-sm border-r md:min-h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Finance Management
        </h2>
        <p className="text-sm text-gray-600">Complete financial tracking</p>
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

export default Sidebar;
