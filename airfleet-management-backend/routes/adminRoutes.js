const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin Dashboard Route
router.get(
  '/dashboard',
  verifyToken(['Admin']),
  (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
  }
);

module.exports = router;
