const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db/connect');
const authenticationRoute = require('./routes/authenticationRoute');
const candidateRoutes = require('./routes/candidateRoutes');
const voterRoutes = require('./routes/voterRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authenticationRoute);
app.use('/api', candidateRoutes);
app.use('/api', voterRoutes);
app.use('/images', express.static(path.join(__dirname, 'votingSystem')));

// Root route to avoid 404 on base URL
app.get('/', (req, res) => {
    res.send('Welcome to the Voting App API');
});

// Database Connection
connectDB(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log("Database connection error:", error);
        process.exit(1); // Optional: exit if DB connection fails
    });

// 404 Route Handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Export app for Vercel
module.exports = app;
