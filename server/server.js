/**
 * BACKEND: server.js
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const answerRoutes = require("./routes/answers");
const stressCheckRoutes = require('./routes/stressCheck');
const paymentRoutes = require('./routes/payment');

require('dotenv').config();

const app = express();

// Request logging middleware
app.use((req, res, next) => {
    console.log('Request received:', {
        path: req.path,
        method: req.method,
        origin: req.headers.origin,
        headers: req.headers
    });
    next();
});

// CORS middleware
app.use(cors({
    origin: ['http://localhost:3002', 'https://www.poetcraft.org', 'https://poetcraft.org'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);
app.use('/api/stress-check', stressCheckRoutes);
app.use("api/payment", paymentRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Catch-all route for undefined paths
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Use environment variable for port with fallback
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
