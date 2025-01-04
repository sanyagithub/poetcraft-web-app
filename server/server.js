/**
 * BACKEND: server.js
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const answerRoutes = require("./routes/answers");
const stressCheckRoutes = require('./routes/stressCheck');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3002', // Allow only your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow cookies and credentials
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/answers", answerRoutes);

app.use('/api/stress-check', stressCheckRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
