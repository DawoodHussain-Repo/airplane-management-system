import React, { useState, useEffect } from "react";

const ScheduledFlights = () => {
  // Mock scheduled flights data
  const [flights, setFlights] = useState([
    { id: 1, flightNo: "AF100", destination: "New York", departure: "2024-12-01T08:00", status: "On Time" },
    { id: 2, flightNo: "AF200", destination: "London", departure: "2024-12-01T10:00", status: "On Time" },
    { id: 3, flightNo: "AF300", destination: "Paris", departure: "2024-12-01T12:00", status: "Delayed" },
    { id: 4, flightNo: "AF400", destination: "Tokyo", departure: "2024-12-01T14:00", status: "On Time" },
    { id: 5, flightNo: "AF500", destination: "Berlin", departure: "2024-12-01T16:00", status: "Cancelled" },
  ]);

  // Format the departure time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Scheduled Flights</h2>

        {/* Flight Details */}
        <div className="space-y-6">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600">
              <h3 className="text-xl font-semibold">Flight {flight.flightNo} - {flight.destination}</h3>
              <p className="text-sm text-gray-400">Departure: {formatTime(flight.departure)}</p>
              <p className={`text-sm ${flight.status === "On Time" ? "text-green-500" : flight.status === "Delayed" ? "text-yellow-500" : "text-red-500"}`}>
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
