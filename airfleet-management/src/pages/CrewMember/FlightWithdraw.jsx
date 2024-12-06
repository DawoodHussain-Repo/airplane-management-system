import React, { useState, useEffect } from "react";

const FlightWithdrawalRequests = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [userId, setUserId] = useState(null); // This will hold the logged-in user's ID

  // Fetch logged-in user info (Assuming you have a JWT or session)
  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT
        setUserId(decodedToken.userId); // Assuming the userId is stored inside the decoded token
      }
    };

    fetchUserId();
  }, []);

  // Fetch flights data from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights");
        const data = await response.json();
        if (response.ok) {
          setFlights(data);
        } else {
          setRequestMessage("Error fetching flights.");
        }
      } catch (error) {
        setRequestMessage("Error fetching flights.");
      }
    };

    fetchFlights();
  }, []);

  // Handle withdrawal request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFlight && userId) {
      try {
        const response = await fetch("http://localhost:5000/api/withdrawals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flightId: selectedFlight._id,
            userId: userId,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setRequestMessage(`Request for withdrawal from flight ${selectedFlight.flightNumber} has been sent.`);
        } else {
          setRequestMessage(data.message || "Error sending withdrawal request.");
        }
      } catch (error) {
        setRequestMessage("Error sending withdrawal request.");
      }
    } else {
      setRequestMessage("Please select a flight and make sure you are logged in.");
    }
  };
// Handle updating request status
const handleUpdateStatus = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/withdrawals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestStatus: status }),
    });
    const data = await response.json();
    if (response.ok) {
      // Update request message and selected flight status after update
      setRequestMessage(`Withdrawal request status updated to ${status}.`);
      setFlights((prevFlights) => 
        prevFlights.map((flight) =>
          flight._id === id ? { ...flight, status: status } : flight
        )
      );
    } else {
      setRequestMessage(data.message || "Error updating status.");
    }
  } catch (error) {
    setRequestMessage("Error updating status.");
  }
};


  // Handle deletion of withdrawal request
  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/withdrawals/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setRequestMessage("Withdrawal request deleted successfully.");
      } else {
        setRequestMessage(data.message || "Error deleting withdrawal request.");
      }
    } catch (error) {
      setRequestMessage("Error deleting withdrawal request.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-yellow-400">Flight Withdrawal Requests</h2>

      <div className="flex flex-col md:flex-row justify-between">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg mb-6 md:mr-6 h-full">
          <h3 className="text-2xl font-medium text-gray-300 mb-6">Assigned Flights</h3>

          {/* Scrollable container for flights */}
          <div className="h-72 overflow-y-auto space-y-4">
            {flights.map((flight) => (
              <div
                key={flight._id}
                className={`border p-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedFlight && selectedFlight._id === flight._id ? "bg-gray-600" : ""
                }`}
                onClick={() => setSelectedFlight(flight)}
              >
                <h4 className="font-semibold text-gray-300 text-lg">{flight.flightNumber}</h4>
                <p className="text-gray-400">{flight.departureTime} - {flight.destination}</p>
                <p className="text-sm text-gray-500">Status: {flight.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Withdrawal Form */}
        <div className="w-full md:w-3/4 bg-gray-800 p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-medium text-gray-300 mb-6">Request Withdrawal from Flight</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display selected flight details */}
            {selectedFlight ? (
              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-300 text-xl">Selected Flight: {selectedFlight.flightNumber}</h4>
                <p className="text-gray-400 text-lg">{selectedFlight.departureTime} - {selectedFlight.destination}</p>
              </div>
            ) : (
              <p className="text-gray-500">Please select a flight to withdraw from.</p>
            )}

            <div className="flex gap-6 justify-between items-center">
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-red-400 hover:to-red-500 transition duration-200 ease-in-out"
              >
                Submit Withdrawal Request
              </button>

              {/* Clear Selection Button */}
              <button
                type="button"
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 transition duration-200 ease-in-out"
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

      {/* Option to update or delete request */}
      {selectedFlight && (
        <div className="mt-6 flex gap-6 justify-center">
          <button
            onClick={() => handleUpdateStatus(selectedFlight._id, "Approved")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 transition duration-200 ease-in-out"
          >
            Approve Withdrawal
          </button>
          <button
            onClick={() => handleUpdateStatus(selectedFlight._id, "Rejected")}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 transition duration-200 ease-in-out"
          >
            Reject Withdrawal
          </button>
          <button
            onClick={() => handleDeleteRequest(selectedFlight._id)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition duration-200 ease-in-out"
          >
            Delete Withdrawal Request
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightWithdrawalRequests;
