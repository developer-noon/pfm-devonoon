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
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Work Hours Management
              </h2>
              <p className="text-gray-600">Coming Soon - Under Development</p>
            </div>
          </div>
        );
      case "home":
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

