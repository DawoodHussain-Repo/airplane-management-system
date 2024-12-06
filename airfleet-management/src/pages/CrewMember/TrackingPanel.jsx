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

      // Fetch flight details
      const flightResponse = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
      setSelectedFlight(flightResponse.data);

      // Fetch payment records
      const paymentResponse = await axios.get(`http://localhost:5000/api/flights/${flightId}/payments`);
      if (paymentResponse.data.length === 0) {
        setShowNoPaymentModal(true); // Show the modal if no payments
      } else {
        setPaymentRecords(paymentResponse.data);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flight details or payment records. Please try again.");
      setLoading(false);
    }
  };

  // Close the No Payment popup
  const closeNoPaymentModal = () => {
    setShowNoPaymentModal(false);
  };

  // Render loading or error state
  if (loading) {
    return <div className="text-white text-center p-6">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  return (
    <div className="min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Tracking Panel</h2>

      {/* Flight Selection */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-medium mb-4">Assigned Flights</h3>
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {assignedFlights.map((flight) => (
            <div
              key={flight._id}
              className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSelectFlight(flight._id)}
            >
              <h4 className="font-semibold text-gray-100">{flight.flightNumber}</h4>
              <p className="text-gray-400">{flight.destination}</p>
              <p className="text-sm text-gray-500">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
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
                    <p className="text-gray-400">{new Date(payment.date).toLocaleDateString()}: {payment.amount}</p>
                    <p className="text-gray-500">Method: {payment.method}</p>
                    <p className="text-gray-400">Status: {payment.status}</p>
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
            <h4 className="text-xl font-semibold">No Payments Found</h4>
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
    </div>
  );
};

export default TrackingPanel;
