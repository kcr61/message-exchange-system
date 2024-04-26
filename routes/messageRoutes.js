const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Message posting route
router.post('/post', messageController.postMessage);

module.exports = router;