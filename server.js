// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const watchlistRouter = require('./routes/watchlistRoutes'); 
const watchedRoute = require('./routes/watchedRoutes'); 
const app = express();

app.use(cors());
app.use(express.json()); // To handle JSON requests

// Routes
app.use('/api/movie', movieRoutes);
app.use('/api/auth', authRoutes);  // Auth routes for login and register
app.use('/api/watchlist', watchlistRouter);
app.use('/api/watched', watchedRoute);

const MONGODB_URI = process.env.MONGODB_URI || 'your-atlas-connection-string-here';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error('Backend caught error:', err.stack);
    res.status(500).json({ error: 'Something broke on server.' });
  });
  
