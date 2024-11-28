import React, { useState } from "react";

const flightData = [
  { id: 1, flightNo: "AF100", status: "In Air", location: "35.6895° N, 139.6917° E", speed: "890 km/h", altitude: "36,000 ft" },
  { id: 2, flightNo: "AF200", status: "Landed", location: "40.7128° N, 74.0060° W", speed: "0 km/h", altitude: "0 ft" },
  { id: 3, flightNo: "AF300", status: "In Air", location: "48.8566° N, 2.3522° E", speed: "920 km/h", altitude: "38,000 ft" },
  { id: 4, flightNo: "AF400", status: "In Air", location: "51.5074° N, 0.1278° W", speed: "850 km/h", altitude: "35,000 ft" },
  { id: 5, flightNo: "AF500", status: "Landed", location: "34.0522° N, 118.2437° W", speed: "0 km/h", altitude: "0 ft" },
];

const paymentRecords = [
  { flightNo: "AF100", passenger: "John Doe", amount: "$500", date: "2024-11-10" },
  { flightNo: "AF200", passenger: "Jane Smith", amount: "$350", date: "2024-11-11" },
  { flightNo: "AF300", passenger: "Mark Taylor", amount: "$450", date: "2024-11-12" },
  { flightNo: "AF400", passenger: "Emily Davis", amount: "$600", date: "2024-11-13" },
  { flightNo: "AF500", passenger: "Michael Brown", amount: "$700", date: "2024-11-14" },
];

const TrackingPanel = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredFlights = flightData.filter((flight) => {
    const matchesSearch = flight.flightNo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "real-time" && flight.status === "In Air") ||
      (filter === "historical" && flight.status !== "In Air");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
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
              <div key={flight.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{flight.flightNo}</span>
                  <span
                    className={`text-sm font-semibold ${
                      flight.status === "In Air" ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {flight.status}
                  </span>
                </div>
                <div className="mt-2 text-gray-300">
                  <p>
                    <strong>Location:</strong> {flight.location}
                  </p>
                  <p>
                    <strong>Speed:</strong> {flight.speed}
                  </p>
                  <p>
                    <strong>Altitude:</strong> {flight.altitude}
                  </p>
                </div>
                <hr className="my-2 border-gray-600" />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No flights match the search/filter criteria.</p>
          )}
        </div>
      </div>

      {/* Payment Records */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Payment Records</h2>
        <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-md max-h-[200px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-gray-400">
              <tr>
                <th className="p-3 border border-gray-700">Flight No.</th>
                <th className="p-3 border border-gray-700">Passenger</th>
                <th className="p-3 border border-gray-700">Amount</th>
                <th className="p-3 border border-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((record, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} text-gray-300`}>
                  <td className="p-3 border border-gray-700">{record.flightNo}</td>
                  <td className="p-3 border border-gray-700">{record.passenger}</td>
                  <td className="p-3 border border-gray-700">{record.amount}</td>
                  <td className="p-3 border border-gray-700">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackingPanel;
