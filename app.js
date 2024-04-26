const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const { uri } = require('./config');
const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const Topic = require('./models/topic');
const Message = require('./models/message');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');
const messageController = require('./controllers/messageController');
const { Observer, Subscriber } = require('./utils/observer');

const topicObserver = new Observer();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Set up MongoDB connection
mongoose.connect(uri, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

// User authentication routes
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

// Topic management routes
app.post('/create-topic', topicController.createTopic);
app.get('/subscribe/:topicId', topicController.subscribeTopic);
app.get('/unsubscribe/:topicId', topicController.unsubscribeTopic);

// Message posting route
app.post('/post-message', messageController.postMessage);

// Home route
app.get('/', async (req, res) => {
  try {
    const authToken = req.cookies.authToken;
    if (authToken) {
      const user = await User.findOne({ userId: authToken }).populate('subscribedTopics');
      const subscribedTopics = user.subscribedTopics.map(topic => ({
        ...topic.toObject(),
        messages: topic.messages.slice(-2)
      }));

      const availableTopics = await Topic.find({ _id: { $nin: user.subscribedTopics } });

      res.render('index', { subscribedTopics, availableTopics });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading home page');
  }
});

// Login route
app.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

// Register route
app.get('/register', (req, res) => {
  res.render('register');
});
