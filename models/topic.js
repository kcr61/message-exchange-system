const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;