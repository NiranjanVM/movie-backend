const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    watchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Watched', watchedSchema);
