/** @format */

// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FinanceDashboard from "./components/FinanceDashboard";
import WorkHoursDashboard from "./components/WorkHoursDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [currentView, setCurrentView] = useState("home");
  const { currentUser } = useAuth();

  const renderCurrentView = () => {
    switch (currentView) {
      case "finance":
        return <FinanceDashboard />;
      case "work-hours":
        return <WorkHoursDashboard />;
      case "home":
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        isLoggedIn={!!currentUser}
        setIsLoggedIn={() => {}}
      />
      {renderCurrentView()}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<AppContent />} />
          <Route
            path="/finance"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
