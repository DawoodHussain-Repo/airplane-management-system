const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Passenger/BookingCont');

// Create a new booking
router.post('/book', bookingController.createBooking);

// Get all bookings of a specific user (passengerId)
router.get('/bookings/:passengerId', bookingController.getBookings);

// Cancel a booking
router.put('/cancel/:bookingId', bookingController.cancelBooking);

module.exports = router;
