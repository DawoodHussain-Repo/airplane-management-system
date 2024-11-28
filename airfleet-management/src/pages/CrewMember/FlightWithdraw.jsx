import React, { useState } from "react";

const FlightWithdrawalRequests = () => {
  const flights = [
    {
      id: 1,
      flightNumber: "AF123",
      departureTime: "2024-12-01 08:30 AM",
      destination: "New York (JFK)",
      status: "Upcoming",
    },
    {
      id: 2,
      flightNumber: "AF456",
      departureTime: "2024-12-03 02:45 PM",
      destination: "Los Angeles (LAX)",
      status: "Upcoming",
    },
    {
      id: 3,
      flightNumber: "AF789",
      departureTime: "2024-11-28 11:15 AM",
      destination: "Chicago (ORD)",
      status: "Completed",
    },
  ];

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");

  // Handle withdrawal request submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFlight) {
      // Send withdrawal request to backend (Example: Using fetch API)
      setRequestMessage(`Request for withdrawal from flight ${selectedFlight.flightNumber} has been sent.`);
      // Add backend API call here to send the request to Admin.
      // Example: fetch('/api/withdrawal', { method: 'POST', body: JSON.stringify({ flightId: selectedFlight.id }) });
    } else {
      setRequestMessage("Please select a flight to withdraw.");
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Flight Withdrawal Requests</h2>

      {/* Display Available Flights */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-medium text-gray-300 mb-4">Assigned Flights</h3>
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="border p-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
              onClick={() => setSelectedFlight(flight)}
            >
              <h4 className="font-semibold text-gray-300">{flight.flightNumber}</h4>
              <p className="text-gray-400">{flight.departureTime} - {flight.destination}</p>
              <p className="text-sm text-gray-500">Status: {flight.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Withdrawal Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium text-gray-300 mb-4">Request Withdrawal from Flight</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display selected flight details */}
          {selectedFlight ? (
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-300">Selected Flight: {selectedFlight.flightNumber}</h4>
              <p className="text-gray-400">{selectedFlight.departureTime} - {selectedFlight.destination}</p>
            </div>
          ) : (
            <p className="text-gray-500">Please select a flight to withdraw from.</p>
          )}

          {/* Flex container with gap for spacing */}
          <div className="flex gap-6 justify-between items-center">
            {/* Red Button with adjusted size */}
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Submit Withdrawal Request
            </button>
            
            {/* Clear Selection Button */}
            <button
              type="button"
              className="bg-gray-600 text-gray-300 px-6 py-2 rounded-md hover:bg-gray-500 transition duration-200"
              onClick={() => setSelectedFlight(null)}
            >
              Clear Selection
            </button>
          </div>
        </form>

        {/* Display request message */}
        {requestMessage && (
          <div className="mt-6 text-center">
            <p className="text-gray-300">{requestMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightWithdrawalRequests;
