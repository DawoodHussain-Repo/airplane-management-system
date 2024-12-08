import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackingPanel = () => {
  const [bookingData, setBookingData] = useState(null);
  const [flightStatus, setFlightStatus] = useState("On Time");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch booking data from the API when the component mounts
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // Retrieve the passenger ID from localStorage
        const passengerId = localStorage.getItem("PassID");

        if (passengerId) {
          // Make an API call to get the booking information
          const response = await axios.get(`http://localhost:5000/api/bookings/bookings/${passengerId}`);
          setBookingData(response.data[0]); // Assuming the response contains an array, we get the first element
        } else {
          console.error("Passenger ID not found in localStorage.");
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  // Simulate flight status updates (mocked)
  useEffect(() => {
    if (bookingData) {
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
      seat: bookingData?.seatNumbers ? bookingData.seatNumbers.join(", ") : "Not Selected",
    };

    setTransactionHistory([...transactionHistory, newTransaction]);
  };

  // Display the booking and transaction details
  return (
    <div className="tracking-panel min-h-[500px] bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Tracking Panel</h2>

        {loading ? (
          <p>Loading booking details...</p>
        ) : bookingData ? (
          <div>
            <div className="booking-details mb-6">
              <h3 className="text-2xl font-semibold">Booking Details</h3>
              <p>Flight: {bookingData.flightId?.flightNumber || "Not Available"}</p>
              <p>Seat(s): {bookingData.seatNumbers?.join(", ") || "Not Selected"}</p>
              <p>Payment Status: {bookingData.paymentStatus}</p>
              <p>Amount Paid: ${bookingData.amountPaid}</p>
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
                    <p>Seat(s): {transaction.seat}</p>
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
