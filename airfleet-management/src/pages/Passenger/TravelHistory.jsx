import React, { useState, useEffect } from "react";

const TravelHistory = () => {
  const [pastFlights, setPastFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null); // For the popup modal

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        if (!passengerId) {
          throw new Error("Passenger ID not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/bookings/bookings/${passengerId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        const transformedFlights = data.map((booking) => ({
          id: booking._id,
          flightNo: booking.flightId.flightNumber,
          origin: booking.flightId.origin,
          destination: booking.flightId.destination,
          departure: booking.flightId.departureTime,
          arrival: booking.flightId.arrivalTime,
          seatNumbers: booking.seatNumbers.join(", "),
          bookingDate: booking.bookingDate,
          amountPaid: booking.amountPaid,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
        }));

        setPastFlights(transformedFlights);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleDownloadReceipt = (flight) => {
    const receiptContent = `
      Flight Number: ${flight.flightNo}
      Origin: ${flight.origin}
      Destination: ${flight.destination}
      Departure: ${formatTime(flight.departure)}
      Arrival: ${formatTime(flight.arrival)}
      Seat Numbers: ${flight.seatNumbers}
      Booking Date: ${formatTime(flight.bookingDate)}
      Amount Paid: $${flight.amountPaid}
      Status: ${flight.status}
      Payment Status: ${flight.paymentStatus}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${flight.flightNo}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Your Travel History</h2>
        {loading ? (
          <p className="text-center text-gray-300 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pastFlights.length > 0 ? (
          <div
            className="space-y-6 overflow-y-scroll max-h-96 pr-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          >
            {pastFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200"
              >
                <h3 className="text-2xl font-semibold mb-2">
                  Flight {flight.flightNo} - {flight.destination}
                </h3>
                <p className="text-sm text-gray-300 mb-1">
                  Origin: {flight.origin}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Departure: {formatTime(flight.departure)}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Arrival: {formatTime(flight.arrival)}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Seat Numbers: {flight.seatNumbers}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Amount Paid: ${flight.amountPaid}
                </p>
                <button
                  onClick={() => setSelectedFlight(flight)}
                  className="inline-block mt-3 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-yellow-400 transition-colors duration-200"
                >
                  View Receipt
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No past flights found.</p>
        )}
      </div>

      {/* Popup Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">
              Receipt for Flight {selectedFlight.flightNo}
            </h3>
            <p>Origin: {selectedFlight.origin}</p>
            <p>Destination: {selectedFlight.destination}</p>
            <p>Departure: {formatTime(selectedFlight.departure)}</p>
            <p>Arrival: {formatTime(selectedFlight.arrival)}</p>
            <p>Seat Numbers: {selectedFlight.seatNumbers}</p>
            <p>Booking Date: {formatTime(selectedFlight.bookingDate)}</p>
            <p>Amount Paid: ${selectedFlight.amountPaid}</p>
            <p>Status: {selectedFlight.status}</p>
            <p>Payment Status: {selectedFlight.paymentStatus}</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleDownloadReceipt(selectedFlight)}
                className="bg-green-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-green-400"
              >
                Download
              </button>
              <button
                onClick={() => setSelectedFlight(null)}
                className="bg-red-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelHistory;
