import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackingPanel = () => {
  const [assignedFlights, setAssignedFlights] = useState([]); // Holds all flights data
  const [selectedFlight, setSelectedFlight] = useState(null); // Holds the selected flight details
  const [paymentRecords, setPaymentRecords] = useState([]); // Holds payment records for the selected flight
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showNoPaymentModal, setShowNoPaymentModal] = useState(false); // To show the "No Payment" popup

  // Fetch all flights when the component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/flights/");
        setAssignedFlights(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch flights. Please try again.");
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Fetch details of the selected flight and its payment records
  const handleSelectFlight = async (flightId) => {
    try {
      setLoading(true);
      setError(null);

      // Clear payment records while loading new data
      setPaymentRecords([]);

      // Fetch flight details
      const flightResponse = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
      setSelectedFlight(flightResponse.data);

      // Fetch payment records
      const paymentResponse = await axios.get(`http://localhost:5000/api/flights/${flightId}/payments`);
      setPaymentRecords(paymentResponse.data);

      // Show modal if no payments are found
      setShowNoPaymentModal(paymentResponse.data.length === 0);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flight details or payment records.");
      setLoading(false);
    }
  };

  // Close the No Payment popup
  const closeNoPaymentModal = () => {
    setShowNoPaymentModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Tracking Panel</h2>

      {/* Flight Selection */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">Assigned Flights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assignedFlights.map((flight) => (
            <div
              key={flight._id}
              className="p-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleSelectFlight(flight._id)}
            >
              <h4 className="font-bold text-lg">{flight.flightNumber}</h4>
              <p className="text-sm text-gray-300">{flight.destination}</p>
              <p className="text-xs text-gray-400">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Information */}
      {selectedFlight && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Tracking Information</h3>

          <div className="space-y-6">
            {/* Flight Info */}
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold">{selectedFlight.flightNumber}</h4>
              <p className="text-gray-300">Destination: {selectedFlight.destination}</p>
              <p className="text-gray-400">
                Departure: {new Date(selectedFlight.departureTime).toLocaleString()}
              </p>
              <p className="text-gray-400">Status: {selectedFlight.status}</p>
              <p className="text-gray-400">Current Location: {selectedFlight.location}</p>
            </div>

            {/* Payment Records */}
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Payment Records</h4>
              {paymentRecords.length === 0 ? (
                <p className="text-gray-400">No payment records available.</p>
              ) : (
                paymentRecords.map((payment, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-300">
                      {new Date(payment.date).toLocaleDateString()}: {payment.amount}
                    </p>
                    <p className="text-sm text-gray-400">Method: {payment.method}</p>
                    <p className="text-sm text-gray-400">Status: {payment.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* No Payment Records Modal */}
      {showNoPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white max-w-sm mx-auto">
            <h4 className="text-xl font-bold">No Payments Found</h4>
            <p className="mt-2">This flight has not been paid for yet.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={closeNoPaymentModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
    </div>
  );
};

export default TrackingPanel;
