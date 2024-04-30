const app = require('../app');
const Topic = require('../models/topic');
const User = require('../models/user');
const { Observer, Subscriber } = require('../utils/observer');

const topicObserver = new Observer();

exports.createTopic = async (req, res) => {
    try {
        const { name } = req.body;
        const topic = new Topic({ name });
        await topic.save();

        const user = await User.findOne({ userId: req.cookies.authToken });
        user.subscribedTopics.push(topic._id);
        await user.save();

        const subscriber = new Subscriber(user.userId);
        topicObserver.subscribe(subscriber);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating topic');
    }
};

exports.subscribeTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const user = await User.findOne({ userId: req.cookies.authToken });

        if (!user.subscribedTopics.includes(topicId)) {
            user.subscribedTopics.push(topicId);
            await user.save();

            const subscriber = new Subscriber(user.userId);
            topicObserver.subscribe(subscriber);
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error subscribing to topic');
    }
};

exports.unsubscribeTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const user = await User.findOne({ userId: req.cookies.authToken });

        user.subscribedTopics = user.subscribedTopics.filter(id => id.toString() !== topicId);
        await user.save();

        const subscriber = new Subscriber(user.userId);
        topicObserver.unsubscribe(subscriber);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error unsubscribing from topic');
    }
};
