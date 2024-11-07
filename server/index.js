// index.js
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

// Database Connection
connectDB(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(error);
    });

// Export app for Vercel
module.exports = app;
