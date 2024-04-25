const Message = require('../models/message');
const Topic = require('../models/topic');
const { topicObserver } = require('../observer');

exports.postMessage = async (req, res) => {
    try {
        const { topicId, content } = req.body;
        const userId = req.cookies.authToken;

        const message = new Message({ userId, topicId, content });
        await message.save();

        const topic = await Topic.findById(topicId);
        topic.messages.push(message._id);
        await topic.save();

        topicObserver.notify(`New message in topic ${topic.name}: ${content}`);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error posting message');
    }
};