const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');
const logger = require('./utils/logger'); // Import Winston logger
const logWithUserId = require('./middleware/loggingMiddleware'); // Import logging middleware

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookiesParser());
app.use(logWithUserId); // Apply the logging middleware

const PORT = process.env.PORT || 8080;

// Root endpoint
app.get('/', (request, response) => {
    request.logger('Root endpoint accessed'); // Log the request with userId
    response.json({
        message: "Server running at " + PORT
    });
});

// API endpoints
app.use('/api', router);

// Database connection and server start
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            logger.info(`Server running at ${PORT}`); // Log server start
            console.log("server running at " + PORT);
        });
    })
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`); // Log DB connection error
        process.exit(1); // Exit on critical failure
    });
