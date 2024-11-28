const Flight = require('../models/Flight');

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const { flightNumber, origin, destination, departureTime, arrivalTime, status, seatCapacity, availableSeats, price } = req.body;

    const newFlight = new Flight({
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      status,
      seatCapacity,
      availableSeats,
      price
    });

    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding flight' });
  }
};

// Get all flights
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
};
