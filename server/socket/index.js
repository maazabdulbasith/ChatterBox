const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');
const UserModel = require('../models/UserModel');
const { ConversationModel, MessageModel } = require('../models/ConversationModel');
const getConversation = require('../helpers/getConversation');
const logger = require('../utils/logger'); // Import Winston logger

const app = express();

/*** Socket server setup ***/
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});

/*** Track online users ***/
const onlineUser = new Set();

// Socket.io connection handler
io.on('connection', async (socket) => {
    logger.info("User connected", { socketId: socket.id }); // Log connection event

    const token = socket.handshake.auth.token;

    try {
        // Extract user details using the provided token
        const user = await getUserDetailsFromToken(token);

        if (!user || !user._id) {
            logger.error('Invalid user details');
            return;
        }

        // Add user to their own "room" and track them as online
        socket.join(user._id.toString());
        onlineUser.add(user._id.toString());

        // Emit the list of currently online users
        io.emit('onlineUser', Array.from(onlineUser));

        // Handle "message-page" event
        socket.on('message-page', async (userId) => {
            logger.info('Fetching message-page for user', { userId });

            // Fetch the details of the user being messaged
            const userDetails = await UserModel.findById(userId).select("-password");

            // Emit user details to the client
            const payload = {
                _id: userDetails?._id,
                name: userDetails?.name,
                email: userDetails?.email,
                profile_pic: userDetails?.profile_pic,
                online: onlineUser.has(userId),
            };
            socket.emit('message-user', payload);

            // Fetch previous messages for the conversation
            const getConversationMessage = await ConversationModel.findOne({
                "$or": [
                    { sender: user._id, receiver: userId },
                    { sender: userId, receiver: user._id },
                ],
            })
                .populate('messages')
                .sort({ updatedAt: -1 });

            // Send the messages to the client
            socket.emit('message', getConversationMessage?.messages || []);
        });

        // Handle "new message" event
        socket.on('new message', async (data) => {
            logger.info('New message received', { sender: data.sender, receiver: data.receiver });

            // Check if a conversation exists between the two users
            let conversation = await ConversationModel.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender },
                ],
            });

            // If no conversation exists, create a new one
            if (!conversation) {
                const createConversation = await ConversationModel({
                    sender: data?.sender,
                    receiver: data?.receiver,
                });
                conversation = await createConversation.save();
            }

            // Save the new message
            const message = new MessageModel({
                text: data.text,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                msgByUserId: data?.msgByUserId,
            });
            const saveMessage = await message.save();

            // Update the conversation with the new message
            await ConversationModel.updateOne({ _id: conversation?._id }, {
                "$push": { messages: saveMessage?._id },
            });

            // Fetch the updated conversation with all messages
            const getConversationMessage = await ConversationModel.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender },
                ],
            })
                .populate('messages')
                .sort({ updatedAt: -1 });

            // Send the messages to both sender and receiver
            io.to(data?.sender).emit('message', getConversationMessage?.messages || []);
            io.to(data?.receiver).emit('message', getConversationMessage?.messages || []);

            // Update the sidebar conversations for both users
            const conversationSender = await getConversation(data?.sender);
            const conversationReceiver = await getConversation(data?.receiver);

            io.to(data?.sender).emit('conversation', conversationSender);
            io.to(data?.receiver).emit('conversation', conversationReceiver);
        });

        // Handle "sidebar" event
        socket.on('sidebar', async (currentUserId) => {
            logger.info("Fetching sidebar for current user", { currentUserId });

            // Fetch all conversations for the current user
            const conversation = await getConversation(currentUserId);

            // Emit the conversations to the client
            socket.emit('conversation', conversation);
        });

        // Handle "seen" event
        socket.on('seen', async (msgByUserId) => {
            logger.info("Marking messages as seen", { msgByUserId });

            // Fetch the conversation between the two users
            let conversation = await ConversationModel.findOne({
                "$or": [
                    { sender: user._id, receiver: msgByUserId },
                    { sender: msgByUserId, receiver: user._id },
                ],
            });

            const conversationMessageId = conversation?.messages || [];

            // Mark messages as seen for the relevant conversation
            await MessageModel.updateMany(
                { _id: { "$in": conversationMessageId }, msgByUserId: msgByUserId },
                { "$set": { seen: true } },
            );

            // Update the sidebar conversations for both users
            const conversationSender = await getConversation(user._id.toString());
            const conversationReceiver = await getConversation(msgByUserId);

            io.to(user._id.toString()).emit('conversation', conversationSender);
            io.to(msgByUserId).emit('conversation', conversationReceiver);
        });

        // Handle "disconnect" event
        socket.on('disconnect', () => {
            onlineUser.delete(user._id.toString());
            logger.info('User disconnected', { socketId: socket.id }); // Log disconnection
        });
    } catch (error) {
        logger.error('Error during socket connection', { error }); // Log errors
    }
});

module.exports = {
    app,
    server,
};
