const logWithUserId = (req, res, next) => {
    const userId = req.user ? req.user._id : 'guest'; // Replace `req.user` with your authentication logic
    req.logger = (message, level = 'info') => {
        console.log(`[UserID: ${userId}] ${message}`); // Replace with your logger (e.g., Winston)
    };
    next();
};

module.exports = logWithUserId;
