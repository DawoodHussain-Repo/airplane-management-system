import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";

const CrewManagement = () => {
  const [crewMembers, setCrewMembers] = useState([]); // State for crew members
  const [flights, setFlights] = useState([]); // State for flights
  const [assignedCrew, setAssignedCrew] = useState([]); // State for assigned crew
  const [selectedCrew, setSelectedCrew] = useState(""); // Selected crew
  const [selectedFlight, setSelectedFlight] = useState(""); // Selected flight
  const [message, setMessage] = useState(""); // Message for status updates
  // Fetch data from the backend API on page load
  useEffect(() => {
    fetchCrewMembers();
    fetchFlights();
    fetchAssignedCrew();
  }, []);

  // Function to fetch Crew Members
  const fetchCrewMembers = () => {
    axios
      .get("http://localhost:5000/api/users/crew")
      .then((response) => setCrewMembers(response.data))
      .catch((error) => {
        console.error("Error fetching crew members:", error);
        setMessage("Error fetching crew members.");
      });
  };

  // Function to fetch Flights
  const fetchFlights = () => {
    axios
      .get("http://localhost:5000/api/flights")
      .then((response) => setFlights(response.data))
      .catch((error) => {
        console.error("Error fetching flights:", error);
        setMessage("Error fetching flights.");
      });
  };

  // Function to fetch assigned crew for flights
  const fetchAssignedCrew = () => {
    axios
      .get("http://localhost:5000/api/crew/assigned")
      .then((response) => setAssignedCrew(response.data))
      .catch((error) => {
        console.error("Error fetching assigned crew:", error);
        setMessage("Error fetching assigned crew.");
      });
  };

  // Handle assigning crew to a flight
  const handleAssignCrew = () => {
    if (selectedCrew && selectedFlight) {
      // Optimistic UI update before backend call
      const newAssignment = {
        crewMemberId: selectedCrew,
        flightId: selectedFlight,
      };

      setAssignedCrew((prevAssignedCrew) => [
        ...prevAssignedCrew,
        {
          ...newAssignment,
          crewMemberId: { firstName: "Crew", lastName: "Member" }, // Placeholder until backend populates
          flightId: { flightNumber: "Flight No.", destination: "Destination" }, // Placeholder
        },
      ]);

      axios
        .post("http://localhost:5000/api/crew/assign", newAssignment)
        .then((response) => {
          setMessage("Crew member assigned successfully.");
          fetchAssignedCrew(); // Re-fetch assigned crew after successful assignment
        })
        .catch((error) => {
          setMessage("Error assigning crew member.");
          console.error("Error:", error);
        });
    } else {
      setMessage("Please select both crew member and flight.");
    }
  };

  // Handle removing crew from a flight
  const handleRemoveCrew = (crewId, flightId) => {
    // Optimistic UI update before backend call
    setAssignedCrew((prevAssignedCrew) =>
      prevAssignedCrew.filter(
        (assignment) =>
          assignment.crewMemberId._id !== crewId || assignment.flightId._id !== flightId
      )
    );

    axios
      .delete("http://localhost:5000/api/crew/remove", {
        data: { crewMemberId: crewId, flightId },
      })
      .then(() => {
        setMessage("Crew member removed successfully.");
        fetchAssignedCrew(); // Re-fetch assigned crew after successful removal
      })
      .catch((error) => {
        setMessage("Error removing crew member.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
        <h1 className="text-xl font-bold">Airline Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
          <FaHome />
          Home
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Assign Crew Form */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Assign Crew</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crew Member Select */}
            <select
              value={selectedCrew}
              onChange={(e) => setSelectedCrew(e.target.value)}
              className="p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Crew Member</option>
              {crewMembers.length === 0 ? (
                <option disabled>No crew members available</option>
              ) : (
                crewMembers.map((crew) => (
                  <option key={crew._id} value={crew._id}>
                    {crew.firstName} {crew.lastName} - {crew.role}
                  </option>
                ))
              )}
            </select>

            {/* Flight Select */}
            <select
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
              className="p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Flight</option>
              {flights.map((flight) => (
                <option key={flight._id} value={flight._id}>
                  {flight.flightNumber} - {flight.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Assign Crew Button */}
          <button
            onClick={handleAssignCrew}
            className="mt-4 w-full bg-yellow-500 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Assign Crew
          </button>
        </div>

        {/* Assigned Crew List */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Assigned Crew</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {assignedCrew.length === 0 ? (
              <p>No crew assigned yet.</p>
            ) : (
              assignedCrew.map((assignment) => (
                <div key={assignment._id} className="flex justify-between p-3 bg-gray-900 rounded-lg shadow text-sm">
                  <p>
                    Crew: {assignment.crewMemberId.firstName} {assignment.crewMemberId.lastName}, Flight: {assignment.flightId.flightNumber}
                  </p>
                  <button
                    onClick={() => handleRemoveCrew(assignment.crewMemberId._id, assignment.flightId._id)}
                    className="px-4 py-1 bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Feedback or Status Message */}
        {message && <div className="bg-gray-900 p-4 mt-4 rounded text-center">{message}</div>}
      </div>
    </div>
  );
};

export default CrewManagement;
