import React from "react";

const AssignedFlights = () => {
  const flights = [
    {
      id: 1,
      flightNumber: "AF123",
      departureTime: "2024-12-01 08:30 AM",
      destination: "New York (JFK)",
      status: "Upcoming",
    },
    {
      id: 2,
      flightNumber: "AF456",
      departureTime: "2024-12-03 02:45 PM",
      destination: "Los Angeles (LAX)",
      status: "Upcoming",
    },
    {
      id: 3,
      flightNumber: "AF789",
      departureTime: "2024-11-28 11:15 AM",
      destination: "Chicago (ORD)",
      status: "Completed",
    },
  ];

  return (
    <div className="container mx-auto p-6 lg:p-12 bg-gray-800"> {/* Gray background added */}
      <h2 className="text-3xl font-semibold text-center text-gray-100 mb-8">Assigned Flights</h2>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">Flight Number</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">Departure Time</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">Destination</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">Status</th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {flights.map((flight) => (
              <tr
                key={flight.id}
                className="border-t border-b hover:bg-gray-200 transition duration-300"
              >
                <td className="py-4 px-6">{flight.flightNumber}</td>
                <td className="py-4 px-6">{flight.departureTime}</td>
                <td className="py-4 px-6">{flight.destination}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-white text-xs ${
                      flight.status === "Upcoming"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {flight.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {flight.status === "Upcoming" && (
                    <button className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-6 rounded-md text-xs">
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedFlights;
