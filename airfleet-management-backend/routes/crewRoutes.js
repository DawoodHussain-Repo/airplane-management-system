const express = require('express');
const router = express.Router();
const CrewAssignment = require('../models/CrewAssignment');

// GET: Fetch all assigned crew
router.get('/assigned', async (req, res) => {
  try {
    const assignedCrew = await CrewAssignment.find()
      .populate('crewMemberId') // Populate crew member details
      .populate('flightId'); // Populate flight details
    res.status(200).json(assignedCrew);
  } catch (error) {
    console.error('Error fetching assigned crew:', error);
    res.status(400).json({ message: 'Error fetching assigned crew', error });
  }
});

// POST: Assign crew member to a flight
router.post('/assign', async (req, res) => {
  const { crewMemberId, flightId } = req.body;
  try {
    const newAssignment = new CrewAssignment({
      crewMemberId,
      flightId,
      assignmentDate: new Date(),
    });
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    console.error('Error assigning crew member:', error);
    res.status(400).json({ message: 'Error assigning crew member', error });
  }
});

// DELETE: Remove crew member from a flight
router.delete('/remove', async (req, res) => {
  const { crewMemberId, flightId } = req.body;
  try {
    const assignment = await CrewAssignment.findOneAndDelete({
      crewMemberId,
      flightId,
    });
    res.status(200).json({ message: 'Crew member removed successfully' });
  } catch (error) {
    console.error('Error removing crew member:', error);
    res.status(400).json({ message: 'Error removing crew member', error });
  }
});

module.exports = router;
