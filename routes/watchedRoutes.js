const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const Watched = require('../models/Watched'); // Watched model
const verifyToken = require('../middleware/auth');

// Add movie to watched
router.post('/',verifyToken, async (req, res) => {
    const { title, poster } = req.body;

    const newWatchedMovie = new Watched({ title, poster });
    try {
        const saved = await newWatchedMovie.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to mark movie as watched" });
    }
});
// Get all movies in watched
router.get('/', async (req, res) => {
    try {
        const watched = await Watched.find();
        res.status(200).json(watched);
    } catch (err) {
        console.error("Error fetching watched list:", err);
        res.status(500).json({ error: 'Failed to fetch watched list' });
    }
});

// Remove movie from watched
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Watched.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie removed from watched' });
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(500).json({ error: 'Failed to remove from watched' });
    }
});

module.exports = router;
