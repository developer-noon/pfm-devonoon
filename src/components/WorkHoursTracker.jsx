/** @format */

// src/components/WorkHoursTracker.jsx
import React, { useState } from "react";

const WorkHoursTracker = ({ data, setWorkHoursData }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    officeArrival: "09:00",
    loggedOff: "18:00",
    workSessions: [
      {
        client: "Chris",
        tasks: "",
        hours: "",
        startTime: "09:00",
        endTime: "18:00",
      },
    ],
  });

  const [newClient, setNewClient] = useState("");

  const handleAddClient = () => {
    if (newClient.trim() && !data.clients.includes(newClient.trim())) {
      setWorkHoursData((prev) => ({
        ...prev,
        clients: [...prev.clients, newClient.trim()],
      }));
      setNewClient("");
    }
  };

  const handleAddWorkSession = () => {
    setFormData((prev) => ({
      ...prev,
      workSessions: [
        ...prev.workSessions,
        {
          client: data.clients[0],
          tasks: "",
          hours: "",
          startTime: "09:00",
          endTime: "18:00",
        },
      ],
    }));
  };

  const handleRemoveWorkSession = (index) => {
    setFormData((prev) => ({
      ...prev,
      workSessions: prev.workSessions.filter((_, i) => i !== index),
    }));
  };

  const handleWorkSessionChange = (index, field, value) => {
    const updatedSessions = [...formData.workSessions];
    updatedSessions[index][field] = value;

    // Calculate hours if both start and end times are provided
    if (
      (field === "startTime" || field === "endTime") &&
      updatedSessions[index].startTime &&
      updatedSessions[index].endTime
    ) {
      const start = new Date(`2000-01-01T${updatedSessions[index].startTime}`);
      const end = new Date(`2000-01-01T${updatedSessions[index].endTime}`);
      const hours = (end - start) / (1000 * 60 * 60);
      updatedSessions[index].hours = hours > 0 ? hours.toFixed(2) : "0";
    }

    setFormData((prev) => ({ ...prev, workSessions: updatedSessions }));
  };

  const calculateTotalHours = () => {
    return formData.workSessions.reduce((total, session) => {
      return total + (parseFloat(session.hours) || 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const workDay = {
      id: Date.now().toString(),
      date: formData.date,
      officeArrival: formData.officeArrival,
      loggedOff: formData.loggedOff,
      workSessions: formData.workSessions.map((session) => ({
        ...session,
        hours: parseFloat(session.hours) || 0,
      })),
      totalHours: calculateTotalHours(),
      month: new Date(formData.date).toLocaleString("default", {
        month: "long",
      }),
      year: new Date(formData.date).getFullYear(),
    };

    setWorkHoursData((prev) => ({
      ...prev,
      workSessions: [...prev.workSessions, workDay],
    }));

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      officeArrival: "09:00",
      loggedOff: "18:00",
      workSessions: [
        {
          client: data.clients[0],
          tasks: "",
          hours: "",
          startTime: "09:00",
          endTime: "18:00",
        },
      ],
    });

    alert("Work hours logged successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Work Hours Tracker
        </h2>
        <p className="text-gray-600">
          Track your daily work sessions and client hours
        </p>
      </div>

      {/* Add Client Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Manage Clients
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="Enter new client name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddClient}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Client
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Available Clients:</p>
          <div className="flex flex-wrap gap-2">
            {data.clients.map((client, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work Hours Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Log Work Hours
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Arrival *
              </label>
              <input
                type="time"
                value={formData.officeArrival}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    officeArrival: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logged Off *
              </label>
              <input
                type="time"
                value={formData.loggedOff}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    loggedOff: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Work Sessions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                Work Sessions
              </h4>
              <button
                type="button"
                onClick={handleAddWorkSession}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                + Add Session
              </button>
            </div>

            <div className="space-y-4">
              {formData.workSessions.map((session, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium text-gray-900">
                      Session {index + 1}
                    </h5>
                    {formData.workSessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWorkSession(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client
                      </label>
                      <select
                        value={session.client}
                        onChange={(e) =>
                          handleWorkSessionChange(
                            index,
                            "client",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {data.clients.map((client) => (
                          <option key={client} value={client}>
                            {client}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={session.startTime}
                        onChange={(e) =>
                          handleWorkSessionChange(
                            index,
                            "startTime",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={session.endTime}
                        onChange={(e) =>
                          handleWorkSessionChange(
                            index,
                            "endTime",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hours
                      </label>
                      <input
                        type="number"
                        value={session.hours}
                        onChange={(e) =>
                          handleWorkSessionChange(
                            index,
                            "hours",
                            e.target.value
                          )
                        }
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tasks Description
                    </label>
                    <textarea
                      value={session.tasks}
                      onChange={(e) =>
                        handleWorkSessionChange(index, "tasks", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the tasks worked on..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Hours */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total Hours Today:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {calculateTotalHours().toFixed(2)} hours
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Log Work Hours
          </button>
        </form>
      </div>

      {/* Recent Entries */}
      {data.workSessions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Entries
          </h3>
          <div className="space-y-3">
            {data.workSessions
              .slice(-5)
              .reverse()
              .map((entry, index) => (
                <div
                  key={entry.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-gray-900">
                        {entry.date}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {entry.officeArrival} - {entry.loggedOff}
                      </span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {entry.totalHours.toFixed(2)}h
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.workSessions.map((session, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {session.client}: {session.tasks}
                        </span>
                        <span>{session.hours.toFixed(2)}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkHoursTracker;
