const express = require('express');
const { createFlight, getFlights } = require('../controllers/flightController');
const router = express.Router();

// Route to create a new flight
router.post('/', createFlight);

// Route to get all flights
router.get('/', getFlights);

module.exports = router;
