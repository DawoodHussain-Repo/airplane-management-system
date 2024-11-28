const User = require('../models/User');

// Register a new crew member
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, contactDetails, status } = req.body;

    const newUser = new User({
      role: 'Crew',
      firstName,
      lastName,
      email,
      passwordHash, // You should hash the password properly here in production
      contactDetails,
      status
    });

    await newUser.save();
    res.status(201).json({ message: 'Crew member added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding crew member' });
  }
};

// Get all crew members
exports.getAllCrew = async (req, res) => {
  try {
    const crewMembers = await User.find({ role: 'Crew' });
    res.status(200).json(crewMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crew members' });
  }
};
