import React, { useState, useEffect } from "react";

const ScheduledFlights = () => {
  // State to hold the flight data
  const [flights, setFlights] = useState([]);
  
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flights from the backend API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights/");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        // Set flights data
        setFlights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Format the departure time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper function to determine flight status color
  const getStatusColor = (status) => {
    switch (status) {
      case "In Air":
        return "text-blue-500"; // Blue for flights in the air
      case "Delayed":
        return "text-yellow-500"; // Yellow for delayed flights
      case "Scheduled":
        return "text-green-500"; // Green for scheduled flights
      case "Completed":
        return "text-gray-500"; // Gray for completed flights
      case "Cancelled":
        return "text-red-500"; // Red for cancelled flights
      default:
        return "text-gray-300"; // Default gray color for unknown status
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">All Flights</h2>

        {/* Loading and error handling */}
        {loading && <p className="text-center text-gray-400">Loading flights...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Flight Details */}
        <div className="space-y-6">
          {flights.map((flight) => (
            <div key={flight._id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600">
              <h3 className="text-xl font-semibold">Flight {flight.flightNumber} - {flight.destination}</h3>
              <p className="text-sm text-gray-400">Departure: {formatTime(flight.departureTime)}</p>
              <p className={`text-sm ${getStatusColor(flight.status)}`}>
                Status: {flight.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduledFlights;
