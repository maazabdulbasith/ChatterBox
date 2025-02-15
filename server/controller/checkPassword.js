const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;

        // Log the request with userId
        request.logger(`Password check initiated for user with ID: ${userId}`);

        // Find user in the database
        const user = await UserModel.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Compare password
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            // Log the failure of password verification
            request.logger(`Password mismatch for user with ID: ${userId}`);

            return response.status(400).json({
                message: "Please check password",
                error: true
            });
        }

        // Create JWT token
        const tokenData = {
            id: user._id,
            email: user.email 
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        // Log successful login attempt
        request.logger(`Login successful for user with ID: ${userId}`);

        // Send token in cookie
        return response.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
        });

    } catch (error) {
        // Log the error
        request.logger(`Error during password check for user with ID: ${userId}, Error: ${error.message}`);

        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkPassword;
