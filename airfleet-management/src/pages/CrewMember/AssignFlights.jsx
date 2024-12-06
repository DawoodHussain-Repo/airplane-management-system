import React, { useEffect, useState } from "react";
import Modal from "../../components/crewMembers/Modal"; // Import the modal

const AssignedFlights = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch flights data from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights");
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Fetch flight details for a particular flight
  const fetchFlightDetails = async (flightId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/flights/${flightId}`);
      const data = await response.json();
      setSelectedFlightDetails(data);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching flight details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlightDetails(null);
  };

  return (
    <div className="container mx-auto p-6 lg:p-12 bg-gray-800">
      <h2 className="text-3xl font-semibold text-center text-gray-100 mb-8">
        Assigned Flights
      </h2>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">
                Flight Number
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">
                Departure Time
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">
                Destination
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">
                Status
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {flights.map((flight) => (
              <tr
                key={flight._id}
                className="border-t border-b hover:bg-gray-200 transition duration-300"
              >
                <td className="py-4 px-6">{flight.flightNumber}</td>
                <td className="py-4 px-6">
                  {new Date(flight.departureTime).toLocaleString()}
                </td>
                <td className="py-4 px-6">{flight.destination}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-white text-xs ${
                      flight.status === "In Air" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {flight.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => fetchFlightDetails(flight._id)}
                    className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-6 rounded-md text-xs"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show flight details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        flightDetails={selectedFlightDetails || {}}
      />
    </div>
  );
};

export default AssignedFlights;
