import React, { useState, useEffect } from "react";

const TrackingPanel = () => {
  // Load booking data from local storage
  const storedData = JSON.parse(localStorage.getItem("bookingData"));

  const [bookingData, setBookingData] = useState(storedData || null);
  const [flightStatus, setFlightStatus] = useState("On Time");
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Fetching real-time tracking information (mocked)
  useEffect(() => {
    if (bookingData) {
      // Simulate a function that fetches flight status updates from an API
      const flightStatusUpdate = setInterval(() => {
        setFlightStatus(getRandomFlightStatus());
      }, 5000); // Updating every 5 seconds for demo

      return () => clearInterval(flightStatusUpdate);
    }
  }, [bookingData]);

  // Simulated random flight status
  const getRandomFlightStatus = () => {
    const statuses = ["On Time", "Delayed", "Boarding", "Departed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Add a new transaction to history (for demo)
  const addTransaction = () => {
    const newTransaction = {
      date: new Date().toLocaleString(),
      amount: "$500",
      status: "Completed",
      seat: bookingData.selectedSeat ? `${bookingData.selectedSeat.row}${bookingData.selectedSeat.seat}` : "Not Selected",
    };

    setTransactionHistory([...transactionHistory, newTransaction]);
  };

  // Update local storage whenever booking data changes
  useEffect(() => {
    if (bookingData) {
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }
  }, [bookingData]);

  // Display the booking and transaction details
  return (
    <div className="tracking-panel min-h-[500px] bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Tracking Panel</h2>

        {bookingData ? (
          <div>
            <div className="booking-details mb-6">
              <h3 className="text-2xl font-semibold">Booking Details</h3>
              <p>Flight: {bookingData.selectedSeat ? `AF100` : "Not Booked"}</p>
              <p>Seat: {bookingData.selectedSeat ? `${bookingData.selectedSeat.row}${bookingData.selectedSeat.seat}` : "Not Selected"}</p>
              <p>Payment Status: {bookingData.paymentStatus}</p>
            </div>

            <div className="flight-status mb-6">
              <h3 className="text-2xl font-semibold">Current Flight Status</h3>
              <p>Status: {flightStatus}</p>
            </div>

            <div className="transaction-history mb-6">
              <h3 className="text-2xl font-semibold">Transaction History</h3>
              <button
                className="bg-yellow-500 py-2 px-4 rounded-lg mb-4"
                onClick={addTransaction}
              >
                Add Transaction (Demo)
              </button>

              <ul>
                {transactionHistory.map((transaction, index) => (
                  <li key={index} className="bg-gray-600 p-4 rounded-lg mb-2">
                    <p>Date: {transaction.date}</p>
                    <p>Amount: {transaction.amount}</p>
                    <p>Status: {transaction.status}</p>
                    <p>Seat: {transaction.seat}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No booking data found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPanel;
