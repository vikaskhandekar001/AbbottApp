const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token'); // Assuming you have a Token model for storing refresh tokens

exports.signup = async (req, res) => {
  try {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'Email already registered',
        error_code: 'USER_ALREADY_EXISTS',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword});

    const token = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '10m'},
    );

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {token, userId: user._id},
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error_code: 'SERVER_ERROR',
      details: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  console.log('inside backend', email, password);
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({error: 'User not found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({error: 'Incorrect password'});

    const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '7m',
    });

    const refreshToken = jwt.sign(
      {userId: user._id},
      process.env.JWT_REFRESH_SECRET, // You can use a different secret for refresh token
      {expiresIn: '15m'}, // Refresh token expires in 15 minutes
    );

    const existingToken = await Token.findOne({userId: user._id});
    if (existingToken) {
      existingToken.token = refreshToken; // Update existing refresh token
      existingToken.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Set expiry for refresh token
      await existingToken.save();
    } else {
      const newToken = new Token({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // Expiration time
      });
      await newToken.save();
    }

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({error: 'Server error', details: err.message});
  }
};
