const app = require('../app');
const User = require('../models/user');
const { Subscriber } = require('../utils/observer');

exports.registerUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'User ID already exists' });
    }

    // Create a new user
    const newUser = new User({ userId, password });
    await newUser.save();

    // You can optionally set a cookie or return a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ userId, password });

    if (!user) {
      // If the user is not found or the password is incorrect
      return res.redirect('/login?error=Invalid%20credentials');
    }

    // Set the authentication cookie
    res.cookie('authToken', userId, { maxAge: 3600000, httpOnly: true });

    // Redirect to the home page or another route
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
