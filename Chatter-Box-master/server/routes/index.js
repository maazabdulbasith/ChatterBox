const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');
const logout = require('../controller/logout');
const updateUserDetails = require('../controller/updateUserDetails');
const searchUser = require('../controller/searchUser');
const logger = require('../utils/logger'); // Import logger

const router = express.Router();

// Middleware to add user-specific logging
const logUserAction = (req, res, next) => {
    const userId = req.user ? req.user._id : 'guest'; // Assuming `req.user` is set after authentication
    req.logger = (message, level = 'info') => {
        // Log userID with the message using Winston
        logger.log(level, `[UserID: ${userId}] ${message}`);
    };
    next();
};

// Create user API
router.post('/register', logUserAction, registerUser);

// Check user email
router.post('/email', logUserAction, checkEmail);

// Check user password
router.post('/password', logUserAction, checkPassword);

// Login user details
router.get('/user-details', logUserAction, userDetails);

// Logout user
router.get('/logout', logUserAction, logout);

// Update user details
router.post('/update-user', logUserAction, updateUserDetails);

// Search user
router.post('/search-user', logUserAction, searchUser);

module.exports = router;
