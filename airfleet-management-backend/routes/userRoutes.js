const express = require('express');
const { addUser, getAllUsers,getAllCrew, getAllPassengers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Add a user (Crew or Passenger)
router.post('/', addUser);

// Get all crew members
router.get('/crew', getAllCrew);

// Get all passengers
router.get('/passengers', getAllPassengers);

// Update a user
router.put('/:userId', updateUser);

// Delete a user
router.delete('/:userId', deleteUser);

// Get all users (Crew + Passengers)
router.get('/', getAllUsers);
module.exports = router;
