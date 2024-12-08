import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

const FlightSchedule = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNo: "",
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editFlightId, setEditFlightId] = useState(null);

  const API_URL = "http://localhost:5000/api/flights"; // Update with your API URL

  // Fetch flights on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get(API_URL);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleAddFlight = async () => {
    if (!newFlight.flightNo || !newFlight.origin || !newFlight.destination || !newFlight.departure || !newFlight.arrival) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        flightNumber: newFlight.flightNo,
        origin: newFlight.origin,
        destination: newFlight.destination,
        departureTime: newFlight.departure,
        arrivalTime: newFlight.arrival,
        seatCapacity: 200,
        availableSeats: 200,
        price: 100,
        crewAssigned: [], // Placeholder
      });
      setFlights((prevFlights) => [...prevFlights, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding flight:", error);
      alert("Failed to add flight. Check console for details.");
    }
  };

  const handleEditFlight = (id) => {
    const flightToEdit = flights.find((flight) => flight._id === id);
    setNewFlight({
      flightNo: flightToEdit.flightNumber,
      origin: flightToEdit.origin,
      destination: flightToEdit.destination,
      departure: flightToEdit.departureTime,
      arrival: flightToEdit.arrivalTime,
    });
    setIsEditing(true);
    setEditFlightId(id);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editFlightId}`, {
        flightNumber: newFlight.flightNo,
        origin: newFlight.origin,
        destination: newFlight.destination,
        departureTime: newFlight.departure,
        arrivalTime: newFlight.arrival,
      });
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight._id === editFlightId ? response.data : flight
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error saving flight edits:", error);
      alert("Failed to save changes. Check console for details.");
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== id));
    } catch (error) {
      console.error("Error deleting flight:", error);
      alert("Failed to delete flight. Check console for details.");
    }
  };

  const resetForm = () => {
    setNewFlight({ flightNo: "", origin: "", destination: "", departure: "", arrival: "" });
    setIsEditing(false);
    setEditFlightId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-700 min-h-[600px] text-white">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
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
              placeholder="Origin"
              value={newFlight.origin}
              onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
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
            <input
              type="datetime-local"
              value={newFlight.arrival}
              onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
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

        <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Flight Schedule</h2>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead className="sticky top-0 bg-gray-700 z-10">
                <tr className="bg-gray-700">
                  <th className="p-4 border border-gray-600 text-left">Flight No.</th>
                  <th className="p-4 border border-gray-600 text-left">Origin</th>
                  <th className="p-4 border border-gray-600 text-left">Destination</th>
                  <th className="p-4 border border-gray-600 text-left">Departure</th>
                  <th className="p-4 border border-gray-600 text-left">Arrival</th>
                  <th className="p-4 border border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No flights available.
                    </td>
                  </tr>
                ) : (
                  flights.map((flight) => (
                    <tr key={flight._id} className="hover:bg-gray-700">
                      <td className="p-4 border border-gray-600">{flight.flightNumber}</td>
                      <td className="p-4 border border-gray-600">{flight.origin}</td>
                      <td className="p-4 border border-gray-600">{flight.destination}</td>
                      <td className="p-4 border border-gray-600">
                        {new Date(flight.departureTime).toLocaleString()}
                      </td>
                      <td className="p-4 border border-gray-600">
                        {new Date(flight.arrivalTime).toLocaleString()}
                      </td>
                      <td className="p-4 border border-gray-600 text-center">
                        <button
                          onClick={() => handleEditFlight(flight._id)}
                          className="text-yellow-500 mx-2"
                        >
                          <Edit className="inline w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFlight(flight._id)}
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
