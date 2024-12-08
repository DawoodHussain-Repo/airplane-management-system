import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [flights, setFlights] = useState([]);
  const [history, setHistory] = useState([]); // State to hold travel history data
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const navigate = useNavigate();

  // Fetch flights data from the backend API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights/");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoadingFlights(false);
      }
    };

    fetchFlights();
  }, []);

  // Fetch travel history data from the backend API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        const response = await axios.get(`http://localhost:5000/api/bookings/bookings/${passengerId}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching travel history:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  const handleBookFlight = (flightId) => {
    const passengerId = localStorage.getItem("PassID");
    if (!passengerId || !flightId) {
      console.error("Missing passengerId or flightId");
      return;
    }

    // Navigate to the seat selection page with passengerId and flightId as query parameters
    navigate(`/passenger/seat-selection?passengerId=${passengerId}&flightId=${flightId}`);
  };

  return (
    <div className="dashboard min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>

        {/* Available Flights Section */}
        <div className="available-flights mb-8">
          <h3 className="text-2xl font-semibold mb-4">Available Flights</h3>
          {loadingFlights ? (
            <p>Loading flights...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flights.map((flight) => (
                <div key={flight._id} className="flight-card bg-gray-600 p-4 rounded-lg">
                  <h4 className="text-xl font-bold">{flight.flightNumber}</h4>
                  <p>From: {flight.origin}</p>
                  <p>To: {flight.destination}</p>
                  <p>Price: ${flight.price}</p>
                  <button
                    className="bg-yellow-500 py-2 px-4 rounded-lg mt-4"
                    onClick={() => handleBookFlight(flight._id)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Travel History Section */}
        <div className="travel-history mb-8">
          <h3 className="text-2xl font-semibold mb-4">Travel History</h3>
          {loadingHistory ? (
            <p>Loading travel history...</p>
          ) : (
            <div>
              {history.length > 0 ? (
                <ul>
                  {history.map((booking) => (
                    <li key={booking._id} className="bg-gray-600 p-4 rounded-lg mb-4">
                      <p>Flight Number: {booking.flightId.flightNumber}</p>
                      <p>From: {booking.flightId.origin}</p>
                      <p>To: {booking.flightId.destination}</p>
                      <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      <p>Status: {booking.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No travel history found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
