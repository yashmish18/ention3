const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  console.log('Signup payload:', req.body); // Debug log
  const { name, email, phone, password } = req.body;
  if (!email || !password || !name || !phone) return res.status(400).json({ message: 'All fields required' });
  // Use email as username for uniqueness
  const username = email;
  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) return res.status(409).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, name, email, phone });
  await user.save();
  // Optionally, auto-login after signup:
  const token = jwt.sign({ id: user._id, username: user.username, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).json({ message: 'User created', token });
});

// Login (by email or username)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  // Try to find by email or username
  const user = await User.findOne({ $or: [{ email }, { username: email }] });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Get current user info from JWT
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally fetch user from DB for fresh info
    res.json({ user: decoded });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router; 