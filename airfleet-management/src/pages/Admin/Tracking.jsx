import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackingPanel = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [flights, setFlights] = useState([]);
  const [trackingData, setTrackingData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [error, setError] = useState("");

  // Fetch all flights from the backend (initial data load)
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights"); // Replace with your actual endpoint
        setFlights(response.data);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Failed to fetch flight data.");
      }
    };
    fetchFlights();
  }, []);

 // Fetch tracking data for a selected flight
const fetchTrackingData = async (flightId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/flights/${flightId}`);
    if (response.data) {
      setTrackingData(response.data);
      setSelectedFlight(response.data);
    } else {
      setError("No tracking data available.");
    }
  } catch (err) {
    console.error("Error fetching tracking data:", err);
    setError("Failed to fetch tracking information.");
  }
};


  const filteredFlights = flights.filter((flight) => {
    const matchesSearch = flight.flightNumber.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "real-time" && flight.status === "In Air") ||
      (filter === "historical" && flight.status !== "In Air");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-[800px] bg-gradient-to-br from-gray-00 to-gray-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Tracking Panel</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by flight number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-yellow-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-yellow-400"
        >
          <option value="all">All Flights</option>
          <option value="real-time">Real-Time Tracking</option>
          <option value="historical">Historical Data</option>
        </select>
      </div>

      {/* Flight Data */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Flight Data</h2>
        <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md max-h-[300px] overflow-y-auto">
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <div key={flight._id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{flight.flightNumber}</span>
                  <span
                    className={`text-sm font-semibold ${
                      flight.status === "In Air" ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {flight.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedFlight(flight);
                      fetchTrackingData(flight._id);
                    }}
                    className="px-3 py-1 text-sm bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-300"
                  >
                    Track
                  </button>
                </div>
                <hr className="my-2 border-gray-600" />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No flights match the search/filter criteria.</p>
          )}
        </div>
      </div>

      {/* Tracking Data */}
      {selectedFlight && trackingData && (
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Tracking Information</h2>
          <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md">
            <p>
              <strong>Flight Number:</strong> {trackingData.flightNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  trackingData.status === "In Air" ? "text-green-400" : "text-gray-400"
                }`}
              >
                {trackingData.status}
              </span>
            </p>
            <p>
              <strong>Location:</strong> {trackingData.location}
            </p>
            <p>
              <strong>Speed:</strong> {trackingData.speed}
            </p>
            <p>
              <strong>Altitude:</strong> {trackingData.altitude}
            </p>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TrackingPanel;
