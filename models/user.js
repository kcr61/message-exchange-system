const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;