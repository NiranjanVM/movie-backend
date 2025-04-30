// routes/watchlistRoutes.js
const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist'); // Watchlist model
const verifyToken = require('../middleware/auth'); // JWT middleware

// Add movie to watchlist
// routes/watchlistRoutes.js
// routes/watchlistRoutes.js

router.post('/', verifyToken, async (req, res) => {
    const { title, poster } = req.body;
    const userId = req.user?.userId;  // Get the userId from the decoded token

    if (!userId) {
        console.log("UserId missing from token");
        return res.status(400).json({ error: 'UserId missing' });
    }

    const newMovie = new Watchlist({
        title,
        poster,
        userId,  // Ensure this is correct
    });

    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        console.error("Error saving movie to watchlist:", err.message, err.stack);
        res.status(500).json({ error: 'Failed to add movie to watchlist' });
    }
});










// Get all movies in watchlist
router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find();
        res.status(200).json(watchlist);
    } catch (err) {
        console.error("Error fetching watchlist:", err);
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
});

// Remove movie from watchlist
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Watchlist.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie removed from watchlist' });
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(500).json({ error: 'Failed to remove from watchlist' });
    }
});

module.exports = router;
