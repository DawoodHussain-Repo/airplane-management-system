import React, { useState } from "react";

const FlightBookingManagement = () => {
  const [flights] = useState([
    { id: 1, flightNo: "AF100", destination: "New York", departure: "2024-11-25T08:00" },
    { id: 2, flightNo: "AF200", destination: "London", departure: "2024-11-25T10:00" },
    { id: 3, flightNo: "AF300", destination: "Paris", departure: "2024-11-25T12:00" },
    { id: 4, flightNo: "AF400", destination: "Tokyo", departure: "2024-11-25T14:00" },
    { id: 5, flightNo: "AF500", destination: "Berlin", departure: "2024-11-25T16:00" },
  ]);

  const [searchParams, setSearchParams] = useState({ route: "", date: "" });
  const [bookedFlights, setBookedFlights] = useState([]);
  const [searchResults, setSearchResults] = useState(flights);

  const handleSearchFlights = () => {
    const { route, date } = searchParams;
    const filteredFlights = flights.filter(
      (flight) =>
        (!route || flight.destination.toLowerCase().includes(route.toLowerCase())) &&
        (!date || flight.departure.includes(date))
    );
    setSearchResults(filteredFlights);
  };

  const handleClearSearch = () => {
    setSearchParams({ route: "", date: "" });
    setSearchResults(flights);
  };

  const handleBookFlight = (flightId) => {
    const flightToBook = flights.find((flight) => flight.id === flightId);
    if (!bookedFlights.some((booked) => booked.id === flightId)) {
      setBookedFlights([...bookedFlights, flightToBook]);
    }
  };

  const handleUnbookFlight = (flightId) => {
    setBookedFlights(bookedFlights.filter((flight) => flight.id !== flightId));
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar for search */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
          <input
            type="text"
            placeholder="Route (e.g., New York)"
            value={searchParams.route}
            onChange={(e) => setSearchParams({ ...searchParams, route: e.target.value })}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            className="w-full p-3 mb-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500"
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
        <div className="flex flex-col w-full md:w-2/3 gap-6">
          {/* Available Flights */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            <div>
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
                      <tr key={flight.id} className="hover:bg-gray-700">
                        <td className="p-4 border border-gray-600">{flight.flightNo}</td>
                        <td className="p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-4 border border-gray-600">
                          {new Date(flight.departure).toLocaleString()}
                        </td>
                        <td className="p-4 border border-gray-600 text-center">
                          <button
                            onClick={() => handleBookFlight(flight.id)}
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
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Booked Flights</h2>
            <div>
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
                      <tr key={flight.id} className="hover:bg-gray-700">
                        <td className="p-4 border border-gray-600">{flight.flightNo}</td>
                        <td className="p-4 border border-gray-600">{flight.destination}</td>
                        <td className="p-4 border border-gray-600">
                          {new Date(flight.departure).toLocaleString()}
                        </td>
                        <td className="p-4 border border-gray-600 text-center">
                          <button
                            onClick={() => handleUnbookFlight(flight.id)}
                            className="text-red-400 hover:underline"
                          >
                            Unbook
                          </button>
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
