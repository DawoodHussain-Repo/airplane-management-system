import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ crew, setShowModal, setCrewMembers }) => {
  const [name, setName] = useState(crew ? crew.name : "");
  const [position, setPosition] = useState(crew ? crew.position : "");
  const [contact, setContact] = useState(crew ? crew.contact : "");

  const handleSubmit = () => {
    if (crew) {
      // Edit crew logic
      setCrewMembers((prev) =>
        prev.map((c) =>
          c.id === crew.id
            ? { ...c, name, position, contact }
            : c
        )
      );
    } else {
      // Add new crew logic
      setCrewMembers((prev) => [
        ...prev,
        { id: Date.now(), name, position, contact },
      ]);
    }
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{crew ? "Edit Crew Member" : "Add Crew Member"}</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
