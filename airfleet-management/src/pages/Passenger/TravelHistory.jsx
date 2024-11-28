import React, { useState } from "react";

const TravelHistory = () => {
  // Mock data for past flights (for demonstration purposes)
  const [pastFlights, setPastFlights] = useState([
    {
      id: 1,
      flightNo: "AF100",
      destination: "New York",
      departure: "2024-10-10T08:00",
      bookingReference: "ABC123456",
      receipt: "https://www.example.com/receipt/AF100",
    },
    {
      id: 2,
      flightNo: "AF200",
      destination: "London",
      departure: "2024-09-20T10:00",
      bookingReference: "DEF654321",
      receipt: "https://www.example.com/receipt/AF200",
    },
    {
      id: 3,
      flightNo: "AF300",
      destination: "Paris",
      departure: "2024-08-15T12:00",
      bookingReference: "GHI987654",
      receipt: "https://www.example.com/receipt/AF300",
    },
  ]);

  // Format the departure time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Your Travel History</h2>

        {/* Past Flight Details */}
        <div className="space-y-6">
          {pastFlights.length > 0 ? (
            pastFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600"
              >
                <h3 className="text-xl font-semibold">
                  Flight {flight.flightNo} - {flight.destination}
                </h3>
                <p className="text-sm text-gray-400">
                  Departure: {formatTime(flight.departure)}
                </p>
                <p className="text-sm text-gray-400">
                  Booking Reference: {flight.bookingReference}
                </p>
                <a
                  href={flight.receipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                >
                  View Receipt
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No past flights found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelHistory;
