const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) =>
  jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Register Route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ success: false, message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = generateToken(newUser.id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error('❌ Register Error:', err.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ success: false, message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ success: false, message: 'Invalid credentials' });

      const token = generateToken(user.id);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error('❌ Login Error:', err.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
