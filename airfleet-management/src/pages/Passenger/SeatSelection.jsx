import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const SeatSelection = () => {
  const [flightData, setFlightData] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse passengerId and flightId from the URL query string
  const params = new URLSearchParams(location.search);
  const passengerId = params.get("passengerId");
  const flightId = params.get("flightId");

  // Fetch flight data from API
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
        const flight = response.data;

        setFlightData(flight);

        // Generate seat layout
        const rows = Math.ceil(flight.seatCapacity / 6); // Assume 6 seats per row (A-F)
        const layout = [];
        let seatCount = 0;

        for (let row = 1; row <= rows; row++) {
          const rowSeats = [];
          for (let col of ["A", "B", "C", "D", "E", "F"]) {
            seatCount++;
            rowSeats.push({
              row,
              seat: col,
              isAvailable: seatCount <= flight.availableSeats,
            });
          }
          layout.push(...rowSeats);
        }
        setSeatLayout(layout);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlightData();
  }, [flightId]);

  // Handles seat selection
  const handleSelectSeat = (seat) => {
    if (seat.isAvailable) {
      const isSelected = selectedSeats.some((s) => s.row === seat.row && s.seat === seat.seat);
      if (isSelected) {
        // Deselect the seat
        setSelectedSeats(selectedSeats.filter((s) => !(s.row === seat.row && s.seat === seat.seat)));
      } else {
        // Select the seat
        setSelectedSeats([...selectedSeats, seat]);
      }
    } else {
      alert("This seat is already booked.");
    }
  };

  // Calculate the total price based on selected seats
  useEffect(() => {
    if (flightData) {
      setAmountPaid(selectedSeats.length * flightData.price);
    }
  }, [selectedSeats, flightData]);

  // Confirm seat selection and book
  const handleConfirmBooking = async () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat.");
      return;
    }

    const seatNumbers = selectedSeats.map((seat) => `${seat.row}${seat.seat}`);
    try {
      await axios.post("http://localhost:5000/api/bookings/book", {
        passengerId,
        flightId,
        seatNumbers,
        amountPaid,
      });

      // SweetAlert2 popup
      Swal.fire({
        icon: "success",
        title: "Flight Booked Successfully!",
        text: `Your seats: ${seatNumbers.join(", ")}`,
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/passenger/tracking`); // Navigate after popup confirmation
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Failed to confirm booking. Please try again.",
        confirmButtonText: "Retry",
      });
    }
  };

  if (!flightData) {
    return <div className="text-center text-white">Loading flight data...</div>;
  }

  return (
    <div className="flex min-h-[500px] bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      {/* Seat Selection Section */}
      <div className="w-2/3 max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Select Your Seat</h2>
        <div
          className="grid grid-cols-6 gap-2 mb-6 overflow-y-auto max-h-[400px] p-2 bg-gray-700 rounded-lg"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#4B5563 #1F2937" }}
        >
          {seatLayout.map((seat, index) => (
            <button
              key={index}
              className={`p-2 rounded-lg font-semibold text-sm ${
                seat.isAvailable
                  ? selectedSeats.some((s) => s.row === seat.row && s.seat === seat.seat)
                    ? "bg-yellow-500" // Yellow for selected seats
                    : "bg-gray-700 hover:bg-gray-600" // Default available seat color
                  : "bg-red-500 cursor-not-allowed" // Red for unavailable (booked) seats
              }`}
              onClick={() => handleSelectSeat(seat)}
              disabled={!seat.isAvailable}
            >
              {seat.row}
              {seat.seat}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="w-1/3 ml-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
        <div className="text-lg mb-4">
          <p>
            <strong>Flight Number:</strong> {flightData.flightNumber}
          </p>
          <p>
            <strong>Destination:</strong> {flightData.destination}
          </p>
          <p>
            <strong>Price per Seat:</strong> ${flightData.price}
          </p>
        </div>
        {selectedSeats.length > 0 && (
          <div className="text-lg bg-gray-700 p-4 rounded-lg mb-4">
            <p>
              <strong>Selected Seats:</strong>{" "}
              {selectedSeats.map((seat) => `${seat.row}${seat.seat}`).join(", ")}
            </p>
            <p>
              <strong>Total Price:</strong> ${amountPaid}
            </p>
          </div>
        )}
        <button
          onClick={handleConfirmBooking}
          className="bg-green-500 py-3 px-6 w-full rounded-lg text-white hover:bg-green-600 font-semibold"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};
export default SeatSelection;
