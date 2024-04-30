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
  app.post('/login', async (req, res) => {
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const { userId, password } = req.body;
      const user = await collection.findOne({ userId, password });
      //T3.2- set authentication cookie
      if (user) {
        res.cookie('authToken', userId, { maxAge: 3600000, httpOnly: true });
        res.redirect('/');
      } else {
        res.redirect('/login?error=Invalid%20credentials');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    } finally {
      await client.close();
    }
  });
};
