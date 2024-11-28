import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";

const FlightSchedule = () => {
  const [flights, setFlights] = useState([
    { id: 1, flightNo: "AF100", destination: "New York", departure: "2024-11-25T08:00" },
    { id: 2, flightNo: "AF200", destination: "London", departure: "2024-11-25T10:00" },
    { id: 3, flightNo: "AF300", destination: "Paris", departure: "2024-11-25T12:00" },
    { id: 4, flightNo: "AF400", destination: "Tokyo", departure: "2024-11-25T14:00" },
    { id: 5, flightNo: "AF500", destination: "Berlin", departure: "2024-11-25T16:00" },
    { id: 6, flightNo: "AF600", destination: "Madrid", departure: "2024-11-25T18:00" },
    { id: 7, flightNo: "AF700", destination: "Rome", departure: "2024-11-25T20:00" },
  ]);
  const [newFlight, setNewFlight] = useState({ flightNo: "", destination: "", departure: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editFlightId, setEditFlightId] = useState(null);

  const handleAddFlight = () => {
    if (!newFlight.flightNo || !newFlight.destination || !newFlight.departure) {
      alert("Please fill in all fields");
      return;
    }
    if (isFlightConflict(newFlight.departure)) {
      alert("Flight conflict detected! Please choose a different departure time.");
      return;
    }
    const newFlightObj = { ...newFlight, id: Date.now() };
    setFlights((prevFlights) => [...prevFlights, newFlightObj]);
    resetForm();
  };

  const handleEditFlight = (id) => {
    const flightToEdit = flights.find((flight) => flight.id === id);
    setNewFlight(flightToEdit);
    setIsEditing(true);
    setEditFlightId(id);
  };

  const handleSaveEdit = () => {
    if (isFlightConflict(newFlight.departure)) {
      alert("Flight conflict detected! Please choose a different departure time.");
      return;
    }
    const updatedFlights = flights.map((flight) =>
      flight.id === editFlightId ? { ...flight, ...newFlight } : flight
    );
    setFlights(updatedFlights);
    resetForm();
  };

  const handleDeleteFlight = (id) => {
    const updatedFlights = flights.filter((flight) => flight.id !== id);
    setFlights(updatedFlights);
  };

  const isFlightConflict = (newDeparture) => {
    if (!newDeparture) return false;
    const newFlightTime = new Date(newDeparture).getTime();
    return flights.some((flight) => {
      const flightTime = new Date(flight.departure).getTime();
      return Math.abs(newFlightTime - flightTime) <= 30 * 60 * 1000; // 30 minutes conflict check
    });
  };

  const resetForm = () => {
    setNewFlight({ flightNo: "", destination: "", departure: "" });
    setIsEditing(false);
    setEditFlightId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 min-h-[600px] text-white">
      {/* Container */}
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Flight Form Section */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Flight" : "Add New Flight"}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Flight No."
              value={newFlight.flightNo}
              onChange={(e) => setNewFlight({ ...newFlight, flightNo: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Destination"
              value={newFlight.destination}
              onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            />
            <input
              type="datetime-local"
              value={newFlight.departure}
              onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
              className="w-full p-3 border rounded-md text-black"
            />
            <button
              onClick={isEditing ? handleSaveEdit : handleAddFlight}
              className="w-full bg-yellow-500 py-3 rounded-md hover:bg-yellow-600 transition-colors"
            >
              {isEditing ? "Save Changes" : "Add Flight"}
            </button>
          </div>
        </div>

        {/* Flight Schedule Table Section */}
        <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Flight Schedule</h2>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead className="sticky top-0 bg-gray-700 z-10">
                <tr className="bg-gray-700">
                  <th className="p-4 border border-gray-600 text-left">Flight No.</th>
                  <th className="p-4 border border-gray-600 text-left">Destination</th>
                  <th className="p-4 border border-gray-600 text-left">Departure</th>
                  <th className="p-4 border border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No flights available.
                    </td>
                  </tr>
                ) : (
                  flights.map((flight) => (
                    <tr key={flight.id} className="hover:bg-gray-700">
                      <td className="p-4 border border-gray-600">{flight.flightNo}</td>
                      <td className="p-4 border border-gray-600">{flight.destination}</td>
                      <td className="p-4 border border-gray-600">
                        {new Date(flight.departure).toLocaleString()}
                      </td>
                      <td className="p-4 border border-gray-600 text-center">
                        <button
                          onClick={() => handleEditFlight(flight.id)}
                          className="text-yellow-500 mx-2"
                        >
                          <Edit className="inline w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFlight(flight.id)}
                          className="text-red-500 mx-2"
                        >
                          <Trash2 className="inline w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSchedule;
