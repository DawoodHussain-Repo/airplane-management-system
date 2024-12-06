import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const crewEmail = localStorage.getItem("crewEmail"); // Get crew email from local storage

  const [assignedFlights, setAssignedFlights] = useState([]); // Flights assigned to the crew
  const [otherFlights, setOtherFlights] = useState([]); // Flights for the carousel/scroll
  const [notifications, setNotifications] = useState([]); // Notifications for the specific crew member
  const [loading, setLoading] = useState(true); // Loading state for API calls

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assigned flights (assuming an API returns an array of flights)
        const flightResponse = await axios.get("http://localhost:5000/api/flights");

        // Fetch notifications for the specific crew member
        const notificationResponse = await axios.get(`http://localhost:5000/api/notifications/byEmail/${crewEmail}`);

        // Log the notification response for debugging
        console.log("Notification Response:", notificationResponse.data);

        // Ensure response data is an array before setting state
        setAssignedFlights(flightResponse.data.slice(0, 3)); // First 3 flights
        setOtherFlights(flightResponse.data.slice(3)); // Remaining flights for carousel
        setNotifications(Array.isArray(notificationResponse.data) ? notificationResponse.data : []); // Safe check for notifications
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false); // Stop loading on error
        setNotifications([]); // Set notifications to an empty array if error occurs
      }
    };

    fetchData();
  }, [crewEmail]);

  // If the data is loading, show a loading state
  if (loading) {
    return <div className="text-white text-center p-6">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-white">Dashboard</h2>

      {/* Assigned Flights Section (Top 3 Visible Flights) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Scrollable Section for Other Flights (Continuous Scroll) */}
      {otherFlights.length > 0 && (
        <div className="overflow-hidden bg-gray-700 p-4 rounded-lg shadow-lg mb-8">
          <div className="flex animate-scroll space-x-6">
            {otherFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{flight.flightNumber}</h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      flight.status === "In Air"
                        ? "bg-green-500 text-white"
                        : flight.status === "Scheduled"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-500 text-white"
                        
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
        </div>
      )}

      {/* Notifications Section (Top Notifications Visible) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium mb-4 text-white">Recent Notifications</h3>
        <div className="space-y-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.type === "critical"
                    ? "bg-red-600 text-white" // Important notifications
                    : notification.type === "warning"
                    ? "bg-yellow-500 text-white"
                    : notification.type === "info"
                    ? "bg-blue-500 text-white"
                    : notification.type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                <p className="text-white text-sm sm:text-base">{notification.message}</p>
                <p className="text-xs sm:text-sm text-white mt-2">{notification.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
