import React, { useState } from "react";
import "./CrewManagement.css";

// Dummy crew member data
const crewMembers = [
  { id: 1, name: "John Doe", role: "Pilot", status: "Available" },
  { id: 2, name: "Jane Smith", role: "Flight Attendant", status: "Unavailable" },
  { id: 3, name: "Michael Johnson", role: "Pilot", status: "Available" },
  { id: 4, name: "Emily Davis", role: "Flight Attendant", status: "Available" },
  { id: 5, name: "David Brown", role: "Captain", status: "Unavailable" },
];

const flights = [
  { id: 1, flightNo: "AF100", destination: "New York" },
  { id: 2, flightNo: "AF200", destination: "London" },
  { id: 3, flightNo: "AF300", destination: "Paris" },
];

const CrewManagement = () => {
  const [assignedCrew, setAssignedCrew] = useState([]);
  const [selectedCrew, setSelectedCrew] = useState("");
  const [selectedFlight, setSelectedFlight] = useState("");

  const handleAssignCrew = () => {
    if (selectedCrew && selectedFlight) {
      const alreadyAssigned = assignedCrew.some(
        (assignment) =>
          assignment.crewId === selectedCrew && assignment.flightId === selectedFlight
      );
  
      if (!alreadyAssigned) {
        setAssignedCrew([...assignedCrew, { crewId: selectedCrew, flightId: selectedFlight }]);
      } else {
        alert("This crew member is already assigned to this flight!");
      }
    }
  };
  

  const handleRemoveCrew = (crewId, flightId) => {
    const updatedAssignments = assignedCrew.filter(
      (assignment) =>
        !(assignment.crewId === crewId && assignment.flightId === flightId)
    );
    setAssignedCrew(updatedAssignments);
  };

  return (
    <div className="crew-management-page">
      <div className="overlay"></div> {/* For background overlay */}
      <div className="crew-management-container">
        <h1>Crew Management</h1>
        <p>Manage crew members, assignments, and availability.</p>

        {/* Assign Crew Form */}
        <div className="form-section">
          <h3>Assign Crew to Flight</h3>
          <select value={selectedCrew} onChange={(e) => setSelectedCrew(e.target.value)}>
            <option value="">Select Crew Member</option>
            {crewMembers
              .filter((crew) => crew.status === "Available")
              .map((crew) => (
                <option key={crew.id} value={crew.id}>
                  {crew.name} - {crew.role}
                </option>
              ))}
          </select>
          <select value={selectedFlight} onChange={(e) => setSelectedFlight(e.target.value)}>
            <option value="">Select Flight</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.flightNo} - {flight.destination}
              </option>
            ))}
          </select>
          <button onClick={handleAssignCrew}>Assign Crew</button>
        </div>

        {/* Assigned Crew List */}
        <h2>Assigned Crew</h2>
        <div className="assigned-crew-list">
          {assignedCrew.length > 0 ? (
            assignedCrew.map((assignment, index) => (
              <div key={index} className="assignment-item">
                <p>
                  Crew ID: {assignment.crewId}, Flight ID: {assignment.flightId}
                  <button onClick={() => handleRemoveCrew(assignment.crewId, assignment.flightId)}>
                    Remove
                  </button>
                </p>
              </div>
            ))
          ) : (
            <p>No crew assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrewManagement;
