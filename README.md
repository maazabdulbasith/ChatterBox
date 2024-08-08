# Chatter Box

Chatter Box is a real-time chat application built using the MERN stack. It allows users to chat with each other in real-time, with features like JWT authentication, password hashing using BCryptjs, media storage, and responsive UI.

## Features

- **Real-Time Communication**: Powered by WebSockets and `socket.io` for instant messaging.
- **User Authentication**: Secure JWT-based authentication with password encryption using `bcryptjs`.
- **Media Storage**: Integrates with Cloudinary for seamless media uploads and storage.
- **Responsive UI**: Built with Tailwind CSS for a modern, responsive interface.
- **Alerts**: Real-time alerts powered by `react-hot-toast`.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **WebSocket**: socket.io
- **Authentication**: JWT, bcryptjs
- **Media Storage**: Cloudinary

## Installation

### Prerequisites

- Node.js
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/adnanshariff9/Chatter-Box.git
cd Chatter-Box

### Install Dependencies
**Server**
cd server
npm install

**Client**
cd client
npm install

### Environment Variables
Create .env files in both the server and client directories with the following variables:
**server**
FRONTEND_URL= your_frontend_port_number (eg. http://localhost:3000)
MONGODB_URI= your_mongodb_connection_string
JWT_SECRET_KEY= your_jwt_secret_key

**client**
REACT_APP_CLOUDINARY_CLOUD_NAME= your_cloudinary_cloud_name
REACT_APP_BACKEND_URL= your_backend_port_number (eg. http://localhost:8080)
