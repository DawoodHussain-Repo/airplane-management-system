import React, { useState, useEffect } from "react";

const Dashboard = () => {
  // Load personal booking information from localStorage
  const storedBookingData = JSON.parse(localStorage.getItem("bookingData"));
  const [bookingData, setBookingData] = useState(storedBookingData || null);

  // Mocked available flights data
  const availableFlights = [
    { flightNumber: "AF100", departure: "New York", arrival: "London", price: "$500" },
    { flightNumber: "AF200", departure: "Los Angeles", arrival: "Paris", price: "$650" },
    { flightNumber: "AF300", departure: "San Francisco", arrival: "Tokyo", price: "$700" },
  ];

  // Mocked travel history data
  const travelHistory = [
    { flightNumber: "AF100", departure: "New York", arrival: "London", date: "2024-06-15" },
    { flightNumber: "AF200", departure: "Los Angeles", arrival: "Paris", date: "2024-09-22" },
  ];

  // Display the dashboard
  return (
    <div className="dashboard min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>

        {/* Available Flights Section */}
        <div className="available-flights mb-8">
          <h3 className="text-2xl font-semibold mb-4">Available Flights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFlights.map((flight, index) => (
              <div key={index} className="flight-card bg-gray-600 p-4 rounded-lg">
                <h4 className="text-xl font-bold">{flight.flightNumber}</h4>
                <p>From: {flight.departure}</p>
                <p>To: {flight.arrival}</p>
                <p>Price: {flight.price}</p>
                <button className="bg-yellow-500 py-2 px-4 rounded-lg mt-4">Book Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Booking Information Section */}
        <div className="personal-booking mb-8">
          <h3 className="text-2xl font-semibold mb-4">Personal Booking Information</h3>
          {bookingData ? (
            <div className="booking-details bg-gray-600 p-4 rounded-lg">
              <p>Flight Number: {bookingData.selectedSeat ? "AF100" : "Not Booked"}</p>
              <p>Seat: {bookingData.selectedSeat ? `${bookingData.selectedSeat.row}${bookingData.selectedSeat.seat}` : "Not Selected"}</p>
              <p>Payment Status: {bookingData.paymentStatus}</p>
            </div>
          ) : (
            <p>No booking information found.</p>
          )}
        </div>

        {/* Travel History Section */}
        <div className="travel-history mb-8">
          <h3 className="text-2xl font-semibold mb-4">Travel History</h3>
          {travelHistory.length > 0 ? (
            <ul>
              {travelHistory.map((history, index) => (
                <li key={index} className="bg-gray-600 p-4 rounded-lg mb-4">
                  <p>Flight Number: {history.flightNumber}</p>
                  <p>Departure: {history.departure}</p>
                  <p>Arrival: {history.arrival}</p>
                  <p>Date: {history.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No travel history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
