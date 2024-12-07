const Booking = require('../../models/Booking');
const Flight = require('../../models/Flight');
const User = require('../../models/User');

exports.createBooking = async (req, res) => {
  try {
    const { passengerId, flightId, seatNumbers, amountPaid } = req.body;

    // Validate input fields
    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
      return res.status(400).json({ message: 'seatNumbers must be a non-empty array' });
    }

    // Validate user and flight
    const user = await User.findById(passengerId);
    const flight = await Flight.findById(flightId);

    if (!user || !flight) {
      return res.status(404).json({ message: 'User or Flight not found' });
    }

    // Ensure sufficient seats
    if (flight.availableSeats < seatNumbers.length) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    // Calculate total price
    const totalPrice = flight.price * seatNumbers.length;
    if (amountPaid !== totalPrice) {
      return res.status(400).json({ message: `Payment amount does not match total price of $${totalPrice}` });
    }

    // Create a single booking for all selected seats
    const booking = new Booking({
      passengerId,
      flightId,
      seatNumbers, // Pass the array of seat numbers directly
      amountPaid,
      status: 'Confirmed',
      paymentStatus: 'Pending',
      bookingDate: new Date(),
    });
    await booking.save();

    // Decrease available seats
    flight.availableSeats -= seatNumbers.length;
    await flight.save();

    return res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Error in createBooking:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get all bookings for a specific passenger
exports.getBookings = async (req, res) => {
  try {
    const { passengerId } = req.params;

    const bookings = await Booking.find({ passengerId }).populate('flightId');

    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Restore available seats
    const flight = await Flight.findById(booking.flightId);
    flight.availableSeats += 1;
    await flight.save();

    // Update booking status to cancelled
    booking.status = 'Cancelled';
    await booking.save();

    return res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
