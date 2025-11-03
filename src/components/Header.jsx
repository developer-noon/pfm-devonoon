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
      setIsMobileMenuOpen(false);
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

  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Smaller on mobile */}
          <div className="flex-shrink-0 flex items-center">
            <svg
              width="40"
              height="40"
              className="md:w-12 md:h-12"
              viewBox="0 0 191 191"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_2193_2)">
                <rect
                  x="35.4072"
                  y="35.4071"
                  width="120"
                  height="120"
                  rx="16.3059"
                  fill="white"
                />
              </g>
              <path
                d="M94.9466 94.8722C46.2711 45.9671 46.2711 143.777 94.9466 94.8722Z"
                stroke="url(#paint0_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.7989 94.8722C143.474 45.9671 143.474 143.777 94.7989 94.8722Z"
                stroke="url(#paint1_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.873 94.9461C143.778 46.2706 45.9679 46.2706 94.873 94.9461Z"
                stroke="url(#paint2_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.873 94.7984C143.778 143.474 45.9679 143.474 94.873 94.7984Z"
                stroke="url(#paint3_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.8204 94.9248C163.82 95.0872 94.658 25.9249 94.8204 94.9248Z"
                stroke="url(#paint4_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.9248 94.8204C95.0872 163.82 25.9249 94.658 94.9248 94.8204Z"
                stroke="url(#paint5_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.8205 94.8203C94.6581 163.82 163.82 94.6579 94.8205 94.8203Z"
                stroke="url(#paint6_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <path
                d="M94.9249 94.9248C25.925 95.0871 95.0873 25.9248 94.9249 94.9248Z"
                stroke="url(#paint7_radial_2193_2)"
                strokeWidth="4.87463"
              />
              <defs>
                <filter
                  id="filter0_d_2193_2"
                  x="0.000164032"
                  y="-3.8147e-06"
                  width="190.814"
                  height="190.814"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="17.7035" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.72 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2193_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2193_2"
                    result="shape"
                  />
                </filter>
                <radialGradient
                  id="paint0_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8727 94.8722) rotate(90) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8727 94.8722) rotate(90) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.873 94.8722) rotate(-180) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint3_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.873 94.8722) rotate(-180) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint4_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8726 94.8726) rotate(-135) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint5_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8726 94.8726) rotate(-135) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint6_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8727 94.8725) rotate(-45) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
                <radialGradient
                  id="paint7_radial_2193_2"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(94.8727 94.8725) rotate(-45) scale(14.1177 36.4328)"
                >
                  <stop stopColor="#767676" />
                  <stop offset="1" stopColor="#2C2C2C" />
                </radialGradient>
              </defs>
            </svg>
            <h1 className=" helvetica-font ml-2 text-lg md:text-xl font-bold text-gray-900 hidden sm:block">
              PFM Devonoon
            </h1>
          </div>

          {/* Navigation - Hidden on mobile, visible on medium screens and up */}
          {currentUser && (
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <button
                onClick={() => handleNavigation("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "home"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("finance")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "finance"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Finance Manage
              </button>
              <button
                onClick={() => handleNavigation("work-hours")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "work-hours"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Work Hours Manage
              </button>
            </nav>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile auth buttons when not logged in */}
            {!currentUser && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {currentUser.displayName
                        ? currentUser.displayName.charAt(0).toUpperCase()
                        : currentUser.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:block max-w-32 truncate">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as <br />
                      <span className="font-medium truncate block">
                        {currentUser.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Navigation for logged in users */}
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavigation("home")}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    currentView === "home"
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("finance")}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    currentView === "finance"
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Finance Manage
                </button>
                <button
                  onClick={() => handleNavigation("work-hours")}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    currentView === "work-hours"
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Work Hours Manage
                </button>

                {/* User info and logout */}
                <div className="border-t pt-3 mt-3">
                  <div className="px-3 py-2 text-sm text-gray-500 bg-gray-50 rounded">
                    <div className="font-medium text-gray-700">
                      {currentUser.displayName || "User"}
                    </div>
                    <div className="truncate">{currentUser.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              /* Auth options for not logged in users */
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
