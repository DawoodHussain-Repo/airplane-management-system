import React, { useState } from "react";

const Dashboard = () => {
  // Sample data for assigned flights
  const [assignedFlights] = useState([
    {
      id: 1,
      flightNumber: "AF123",
      departureTime: "2024-12-01 08:30 AM",
      destination: "New York (JFK)",
      status: "On Time",
    },
    {
      id: 2,
      flightNumber: "AF456",
      departureTime: "2024-12-03 02:45 PM",
      destination: "Los Angeles (LAX)",
      status: "Scheduled",
    },
    {
      id: 3,
      flightNumber: "AF789",
      departureTime: "2024-11-28 11:15 AM",
      destination: "Chicago (ORD)",
      status: "Completed",
    },
  ]);

  // Sample data for notifications
  const [notifications] = useState([
    {
      id: 1,
      message: "Flight AF123 has been delayed due to weather conditions.",
      timestamp: "2024-11-27 10:30 AM",
      type: "warning", // Notification type for styling
    },
    {
      id: 2,
      message: "Flight AF456 schedule has been updated. New departure time: 2024-12-03 03:15 PM.",
      timestamp: "2024-11-26 02:00 PM",
      type: "info",
    },
    {
      id: 3,
      message: "Flight AF789 has completed its journey successfully.",
      timestamp: "2024-11-28 12:00 PM",
      type: "success",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-white">Dashboard</h2>

      {/* Assigned Flights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {assignedFlights.map((flight) => (
          <div
            key={flight.id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{flight.flightNumber}</h3>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  flight.status === "On Time"
                    ? "bg-green-500 text-white"
                    : flight.status === "Scheduled"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {flight.status}
              </span>
            </div>
            <p className="text-gray-300">{flight.destination}</p>
            <p className="text-sm text-gray-400">Departure: {flight.departureTime}</p>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium mb-4 text-white">Recent Notifications</h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.type === "warning"
                  ? "bg-yellow-500 text-white"
                  : notification.type === "info"
                  ? "bg-blue-500 text-white"
                  : notification.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              <p className="text-white">{notification.message}</p>
              <p className="text-xs text-white mt-2">{notification.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
