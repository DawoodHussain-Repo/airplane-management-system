import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SeatSelection = () => {
  // Mock flight data
  const flightData = {
    id: 1,
    flightNo: "AF100",
    destination: "New York",
    availableSeats: [
      { row: 1, seat: "A", isAvailable: true },
      { row: 1, seat: "B", isAvailable: true },
      { row: 1, seat: "C", isAvailable: true },
      { row: 2, seat: "A", isAvailable: true },
      { row: 2, seat: "B", isAvailable: false }, // Booked seat
      { row: 2, seat: "C", isAvailable: true },
      { row: 3, seat: "A", isAvailable: true },
      { row: 3, seat: "B", isAvailable: true },
      { row: 3, seat: "C", isAvailable: true },
      
      // Add more rows as needed
    ],
  };

  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigate = useNavigate();

  // Handles seat selection
  const handleSelectSeat = (seat) => {
    if (seat.isAvailable) {
      // Toggle seat selection
      if (selectedSeat && selectedSeat.row === seat.row && selectedSeat.seat === seat.seat) {
        // Deselect the seat if already selected
        setSelectedSeat(null);
      } else {
        // Select the seat
        setSelectedSeat(seat);
      }
    } else {
      alert("This seat is already booked.");
    }
  };

  // Confirm seat selection and navigate to confirmation page
  const handleConfirmSelection = () => {
    if (!selectedSeat) {
      alert("Please select a seat.");
    } else {
      alert(`You have selected seat ${selectedSeat.row}${selectedSeat.seat}`);
      // Optionally, store the seat selection in the app's state (e.g., context or redux)
      // Redirect to a confirmation or booking summary page
      navigate("/passenger/tracking");
    }
  };

  return (
    <div className="min-h-[500px] bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Select Your Seat</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Display seats */}
          {flightData.availableSeats.map((seat, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg font-semibold text-lg ${
                seat.isAvailable
                  ? selectedSeat?.row === seat.row && selectedSeat?.seat === seat.seat
                    ? "bg-yellow-500"  // Yellow for selected seats
                    : "bg-gray-700 hover:bg-gray-600"  // Default available seat color
                  : "bg-red-500 cursor-not-allowed"  // Red for unavailable (booked) seats
              }`}
              onClick={() => handleSelectSeat(seat)}
              disabled={!seat.isAvailable}
            >
              {seat.row}{seat.seat}
            </button>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleConfirmSelection}
            className="bg-yellow-500 py-3 px-6 rounded-lg text-white hover:bg-yellow-600 font-semibold"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
