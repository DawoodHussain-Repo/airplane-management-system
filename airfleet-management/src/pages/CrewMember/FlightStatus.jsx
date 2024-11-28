import React, { useState } from "react";

const FlightStatusManagement = () => {
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
  const [milestone, setMilestone] = useState("");
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");

  // Handle milestone update submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFlight && milestone) {
      const newStatus = `${milestone} - ${new Date().toLocaleString()}`;
      setStatusUpdates((prevUpdates) => [
        ...prevUpdates,
        { flightNumber: selectedFlight.flightNumber, status: newStatus },
      ]);
      setUpdateMessage(`Milestone "${milestone}" has been updated for flight ${selectedFlight.flightNumber}.`);
      setMilestone(""); // Reset the milestone input
    } else {
      setUpdateMessage("Please select a flight and milestone.");
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar for flight selection */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Select Flight</h2>
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

        {/* Main Content */}
        <div className="flex flex-col w-full md:w-2/3 gap-6">
          {/* Milestone Update Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Update Flight Milestone</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Display selected flight details */}
              {selectedFlight ? (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-300">Selected Flight: {selectedFlight.flightNumber}</h4>
                  <p className="text-gray-400">{selectedFlight.departureTime} - {selectedFlight.destination}</p>
                </div>
              ) : (
                <p className="text-gray-400">Please select a flight to update its status.</p>
              )}

              {/* Milestone Input */}
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  placeholder="Enter milestone (e.g., Boarding completed)"
                  className="bg-gray-700 text-white p-3 rounded-lg w-full"
                />
                <button
                  type="submit"
                  className="w-1/4 bg-yellow-500 py-3 rounded-lg hover:bg-yellow-600 transition-all font-semibold ml-4"
                >
                  Update Status
                </button>
              </div>
            </form>

            {/* Display request message */}
            {updateMessage && (
              <div className="mt-6 text-center">
                <p className="text-gray-300">{updateMessage}</p>
              </div>
            )}
          </div>

          {/* Status Updates */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-2xl font-bold mb-4">Flight Status Updates</h3>
            {statusUpdates.length > 0 ? (
              <ul className="space-y-4">
                {statusUpdates.map((update, index) => (
                  <li
                    key={index}
                    className="border p-4 rounded-lg bg-gray-700"
                  >
                    <p className="font-semibold text-gray-300">{update.flightNumber}</p>
                    <p className="text-gray-400">{update.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No status updates available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightStatusManagement;
