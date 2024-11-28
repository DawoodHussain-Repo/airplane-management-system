import React, { useState } from "react";

const TrackingPanel = () => {
  const [assignedFlights] = useState([
    {
      id: 1,
      flightNumber: "AF123",
      destination: "New York (JFK)",
      departureTime: "2024-12-01 08:30 AM",
      status: "On Time",
      location: "Current Location: In Air",
      historicalData: [
        { date: "2024-11-25", status: "Scheduled", details: "Flight scheduled." },
        { date: "2024-11-28", status: "Delayed", details: "Flight delayed due to weather." },
      ],
      paymentRecords: [
        { date: "2024-11-20", amount: "$500", method: "Credit Card", status: "Paid" },
        { date: "2024-11-18", amount: "$300", method: "Bank Transfer", status: "Paid" },
      ],
    },
    {
      id: 2,
      flightNumber: "AF456",
      destination: "Los Angeles (LAX)",
      departureTime: "2024-12-03 02:45 PM",
      status: "Scheduled",
      location: "Current Location: Gate A5",
      historicalData: [
        { date: "2024-11-22", status: "Scheduled", details: "Flight scheduled." },
      ],
      paymentRecords: [
        { date: "2024-11-19", amount: "$600", method: "Credit Card", status: "Paid" },
      ],
    },
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);

  // Handle selecting a flight for tracking
  const handleSelectFlight = (flightId) => {
    const flight = assignedFlights.find((f) => f.id === flightId);
    setSelectedFlight(flight);
  };

  return (
    <div className="min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Tracking Panel</h2>

      {/* Flight Selection */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-medium mb-4">Assigned Flights</h3>
        <div className="space-y-4">
          {assignedFlights.map((flight) => (
            <div
              key={flight.id}
              className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSelectFlight(flight.id)}
            >
              <h4 className="font-semibold text-gray-100">{flight.flightNumber}</h4>
              <p className="text-gray-400">{flight.destination}</p>
              <p className="text-sm text-gray-500">Departure: {flight.departureTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Information */}
      {selectedFlight && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium mb-4">Tracking Information</h3>

          <div className="space-y-4">
            {/* Flight Info */}
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold">{selectedFlight.flightNumber}</h4>
              <p className="text-gray-400">Destination: {selectedFlight.destination}</p>
              <p className="text-gray-400">Departure: {selectedFlight.departureTime}</p>
              <p className="text-gray-400">Status: {selectedFlight.status}</p>
              <p className="text-gray-400">Current Location: {selectedFlight.location}</p>
            </div>

            {/* Historical Data */}
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Historical Data</h4>
              {selectedFlight.historicalData.length === 0 ? (
                <p className="text-gray-400">No historical data available.</p>
              ) : (
                selectedFlight.historicalData.map((data, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-400">{data.date}: {data.status}</p>
                    <p className="text-gray-500">Details: {data.details}</p>
                  </div>
                ))
              )}
            </div>

            {/* Payment Records */}
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Payment Records</h4>
              {selectedFlight.paymentRecords.length === 0 ? (
                <p className="text-gray-400">No payment records available.</p>
              ) : (
                selectedFlight.paymentRecords.map((payment, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-400">{payment.date}: {payment.amount}</p>
                    <p className="text-gray-500">Method: {payment.method}</p>
                    <p className="text-gray-400">Status: {payment.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPanel;
