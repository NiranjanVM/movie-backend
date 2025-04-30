const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
