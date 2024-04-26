const app = require('../app');
const User = require('../models/user');
const { Subscriber } = require('../utils/observer');

exports.registerUser = async (req, res) => {
  app.post('/register', async (req, res) => {
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const { userId, password } = req.body;
      const result = await collection.insertOne({ userId, password });
      console.log(`Inserted document: ${result.insertedId}`);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error registering user');
    } finally {
      await client.close();
    }
  });
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
