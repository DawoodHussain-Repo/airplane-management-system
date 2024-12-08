import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlightBookingManagement = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ route: "", date: "" });
  const [bookedFlights, setBookedFlights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights/");
        setFlights(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();
  }, []);

  const handleSearchFlights = () => {
    const { route, date } = searchParams;
    const filteredFlights = flights.filter(
      (flight) =>
        (!route || flight.destination.toLowerCase().includes(route.toLowerCase())) &&
        (!date || flight.departureTime.includes(date))
    );
    setSearchResults(filteredFlights);
  };

  const handleClearSearch = () => {
    setSearchParams({ route: "", date: "" });
    setSearchResults(flights);
  };

  const handleBookFlight = (flightId) => {
    const flightToBook = flights.find((flight) => flight._id === flightId);
    if (!bookedFlights.some((booked) => booked._id === flightId)) {
      setBookedFlights([...bookedFlights, flightToBook]);
    }
  };

  const handleUnbookFlight = (flightId) => {
    setBookedFlights(bookedFlights.filter((flight) => flight._id !== flightId));
  };

  const handleProceedToSeatSelection = (flightId) => {
    const passengerId = localStorage.getItem("PassID");

    if (!passengerId) {
      console.error("Passenger ID is not found in localStorage");
      return;
    }

    navigate(`/passenger/seat-selection?passengerId=${passengerId}&flightId=${flightId}`);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-700 text-white p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar for search */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Search Flights</h2>
          <input
            type="text"
            placeholder="Route (e.g., New York)"
            value={searchParams.route}
            onChange={(e) => setSearchParams({ ...searchParams, route: e.target.value })}
            className="w-full p-4 mb-6 bg-gray-700 rounded-lg text-white focus:ring focus:ring-yellow-500"
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            className="w-full p-4 mb-6 bg-gray-700 rounded-lg text-white focus:ring focus:ring-yellow-500"
          />
          <div className="flex gap-4">
            <button
              onClick={handleSearchFlights}
              className="w-1/2 bg-yellow-500 py-3 rounded-lg hover:bg-yellow-600 transition-all font-semibold"
            >
              Search
            </button>
            <button
              onClick={handleClearSearch}
              className="w-1/2 bg-red-500 py-3 rounded-lg hover:bg-red-600 transition-all font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full lg:w-2/3 gap-6">
          {/* Available Flights */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            <div className="overflow-x-auto">
              {searchResults.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 border border-gray-600 text-left">Flight No.</th>
                      <th className="p-4 border border-gray-600 text-left">Destination</th>
                      <th className="p-4 border border-gray-600 text-left">Departure</th>
                      <th className="p-4 border border-gray-600 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((flight) => (
                      <tr key={flight._id} className="hover:bg-gray-700">
                        <td className="p-4 border border-gray-600">{flight.flightNumber}</td>
                        <td className="p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-4 border border-gray-600">
                          {new Date(flight.departureTime).toLocaleString()}
                        </td>
                        <td className="p-4 border border-gray-600 text-center">
                          <button
                            onClick={() => handleBookFlight(flight._id)}
                            className="text-green-400 hover:underline"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-400">No flights found.</p>
              )}
            </div>
          </div>

          {/* Booked Flights */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Your Booked Flights</h2>
            <div className="overflow-x-auto">
              {bookedFlights.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 border border-gray-600 text-left">Flight No.</th>
                      <th className="p-4 border border-gray-600 text-left">Destination</th>
                      <th className="p-4 border border-gray-600 text-left">Departure</th>
                      <th className="p-4 border border-gray-600 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedFlights.map((flight) => (
                      <tr key={flight._id} className="hover:bg-gray-700">
                        <td className="p-4 border border-gray-600">{flight.flightNumber}</td>
                        <td className="p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-4 border border-gray-600">
                          {new Date(flight.departureTime).toLocaleString()}
                        </td>
                        <td className="p-4 border border-gray-600 text-center">
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={() => handleUnbookFlight(flight._id)}
                              className="w-full sm:w-32 bg-red-500 py-3 rounded-lg hover:bg-red-600 transition-all font-semibold"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleProceedToSeatSelection(flight._id)}
                              className="w-full sm:w-32 bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition-all font-semibold"
                            >
                              Proceed to Seat Selection
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-400">No flights booked yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingManagement;
