/** @format */

// src/components/Header.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ currentView, setCurrentView, isLoggedIn, setIsLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleAuthClick = () => {
    if (currentUser) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">
              Finance Manager Pro
            </h1>
          </div>

          {/* Navigation - Hidden on mobile, visible on medium screens and up */}
          {currentUser && (
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => {
                  setCurrentView("home");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "home"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentView("finance");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "finance"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Finance Manage
              </button>
              <button
                onClick={() => {
                  setCurrentView("work-hours");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "work-hours"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Work Hours Manage
              </button>
            </nav>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {currentUser.displayName
                        ? currentUser.displayName.charAt(0).toUpperCase()
                        : currentUser.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as <br />
                      <span className="font-medium">{currentUser.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && currentUser && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setCurrentView("home");
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === "home"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView("finance");
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === "finance"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Finance Manage
            </button>
            <button
              onClick={() => {
                setCurrentView("work-hours");
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === "work-hours"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Work Hours Manage
            </button>

            {/* Mobile Auth Buttons */}
            <div className="border-t pt-4">
              {currentUser ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
