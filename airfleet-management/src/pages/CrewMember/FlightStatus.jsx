import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightStatusManagement = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [milestone, setMilestone] = useState('');
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    // Fetch all flights from the backend
    axios.get('http://localhost:5000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  // Handle the form submission to update flight status
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFlight && milestone) {
      const updatedStatus = {
        status: milestone,
        location: "40.7128° N, 74.0060° W",  // You can dynamically update this as well
        speed: "900 km/h",  // You can dynamically update this as well
        altitude: "36,000 ft",  // You can dynamically update this as well
      };

      axios.put(`http://localhost:5000/api/flights/${selectedFlight._id}`, updatedStatus)
        .then(response => {
          setUpdateMessage(`Milestone "${milestone}" has been updated for flight ${selectedFlight.flightNumber}.`);
          setStatusUpdates(prevUpdates => [
            ...prevUpdates,
            { flightNumber: selectedFlight.flightNumber, status: `${milestone} - ${new Date().toLocaleString()}` }
          ]);
          setMilestone(""); // Reset milestone input
        })
        .catch(error => {
          console.error('Error updating flight status:', error);
          setUpdateMessage('Error updating flight status. Please try again.');
        });
    } else {
      setUpdateMessage('Please select a flight and milestone.');
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar for flight selection */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Select Flight</h2>
          <div className="space-y-4 overflow-y-auto max-h-[500px]"> {/* Scrollable container */}
            {flights.map((flight) => (
              <div
                key={flight._id}
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
