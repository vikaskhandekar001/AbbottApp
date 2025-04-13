const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Assuming you've split out models
const UserDetails = require('../models/UserDetails'); // Same here

// Middleware to verify access token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1]; // Expected format: Bearer <token>

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.userId = decoded.userId;
    next();
  });
};

// GET /api/profile-info
router.get('/profile-info', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('userDetails');

    if (!user)
      return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({
      status: 'success',
      data: {
        name: user.name,
        email: user.email,
        userDetails: user.userDetails,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      details: err.message,
    });
  }
});

module.exports = router;
