/** @format */

// src/components/WorkHoursAnalytics.jsx
import React, { useState } from "react";

const WorkHoursAnalytics = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState("month"); // month, week, year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const years = [2023, 2024, 2025];

  // Calculate analytics based on filter
  const calculateAnalytics = () => {
    let filteredSessions = [...data.workSessions];

    // Filter by time period
    if (timeFilter === "month") {
      filteredSessions = filteredSessions.filter((session) => {
        const sessionDate = new Date(session.date);
        return (
          sessionDate.getMonth() === selectedMonth &&
          sessionDate.getFullYear() === selectedYear
        );
      });
    } else if (timeFilter === "year") {
      filteredSessions = filteredSessions.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate.getFullYear() === selectedYear;
      });
    } else if (timeFilter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filteredSessions = filteredSessions.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate >= oneWeekAgo;
      });
    }

    // Calculate totals
    const totalHours = filteredSessions.reduce(
      (sum, session) => sum + session.totalHours,
      0
    );
    const totalDays = new Set(filteredSessions.map((session) => session.date))
      .size;
    const averageHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0;

    // Calculate average arrival and logoff times
    const arrivalTimes = filteredSessions.map((session) => {
      const [hours, minutes] = session.officeArrival.split(":").map(Number);
      return hours + minutes / 60;
    });

    const logoffTimes = filteredSessions.map((session) => {
      const [hours, minutes] = session.loggedOff.split(":").map(Number);
      return hours + minutes / 60;
    });

    const averageArrival =
      arrivalTimes.length > 0
        ? arrivalTimes.reduce((sum, time) => sum + time, 0) /
          arrivalTimes.length
        : 0;

    const averageLogoff =
      logoffTimes.length > 0
        ? logoffTimes.reduce((sum, time) => sum + time, 0) / logoffTimes.length
        : 0;

    // Format average times
    const formatTime = (decimalHours) => {
      const hours = Math.floor(decimalHours);
      const minutes = Math.round((decimalHours - hours) * 60);
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    // Calculate client hours
    const clientHours = {};
    filteredSessions.forEach((session) => {
      session.workSessions.forEach((workSession) => {
        clientHours[workSession.client] =
          (clientHours[workSession.client] || 0) + workSession.hours;
      });
    });

    // Calculate daily breakdown
    const dailyHours = {};
    filteredSessions.forEach((session) => {
      dailyHours[session.date] =
        (dailyHours[session.date] || 0) + session.totalHours;
    });

    // Calculate productivity metrics
    const productiveDays = Object.values(dailyHours).filter(
      (hours) => hours >= 6
    ).length;
    const productivityRate =
      totalDays > 0 ? (productiveDays / totalDays) * 100 : 0;

    return {
      totalHours,
      totalDays,
      averageHoursPerDay,
      averageArrival: formatTime(averageArrival),
      averageLogoff: formatTime(averageLogoff),
      clientHours,
      dailyHours,
      productiveDays,
      productivityRate,
      filteredSessions,
    };
  };

  const analytics = calculateAnalytics();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Hours Analytics
        </h2>
        <p className="text-gray-600">
          Comprehensive analysis of your work patterns
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          {timeFilter === "month" && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}

          {timeFilter === "year" && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Hours
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {analytics.totalHours.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {analytics.filteredSessions.length} sessions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Average Hours/Day
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {analytics.averageHoursPerDay.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {analytics.totalDays} working days
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Avg. Arrival
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {analytics.averageArrival}
          </p>
          <p className="text-sm text-gray-600 mt-1">Average start time</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Avg. Logoff
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {analytics.averageLogoff}
          </p>
          <p className="text-sm text-gray-600 mt-1">Average end time</p>
        </div>
      </div>

      {/* Client Hours Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Client Hours Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(analytics.clientHours)
            .sort(([, a], [, b]) => b - a)
            .map(([client, hours]) => (
              <div key={client} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{client}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-blue-600 font-semibold">
                    {hours.toFixed(2)} hours
                  </span>
                  <span className="text-sm text-gray-500">
                    {((hours / analytics.totalHours) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Productivity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Metrics
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  Productive Days (6+ hours)
                </span>
                <span className="font-medium">
                  {analytics.productiveDays} days
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analytics.productivityRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {analytics.productivityRate.toFixed(1)}% productivity rate
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Hours Trend
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Object.entries(analytics.dailyHours)
              .sort(([a], [b]) => new Date(b) - new Date(a))
              .map(([date, hours]) => (
                <div
                  key={date}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span className="text-sm text-gray-600">{date}</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-semibold ${
                        hours >= 8
                          ? "text-green-600"
                          : hours >= 6
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {hours.toFixed(2)}h
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Work Sessions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Arrival
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Logoff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Clients
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.filteredSessions
                .slice(-10)
                .reverse()
                .map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.officeArrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.loggedOff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                      {session.totalHours.toFixed(2)}h
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {session.workSessions.map((ws) => ws.client).join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkHoursAnalytics;
