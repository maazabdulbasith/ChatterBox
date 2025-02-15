const winston = require('winston');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

// Create the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Output logs in JSON format
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),
    ],
});

// Add console transport for development environment
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple() // Keep simple format for console output
        ),
    }));
}

module.exports = logger;
