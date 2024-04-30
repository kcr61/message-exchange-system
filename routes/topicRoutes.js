const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Topic management routes
router.post('/create-topic', topicController.createTopic);
router.get('/subscribe/:topicId', topicController.subscribeTopic);
router.get('/unsubscribe/:topicId', topicController.unsubscribeTopic);

module.exports = router;