const express = require('express');
const { registerUser, getAllCrew } = require('../controllers/userController');
const router = express.Router();

// Route to register a new crew member
router.post('/crew', registerUser);

// Route to get all crew members
router.get('/crew', getAllCrew);

module.exports = router;
