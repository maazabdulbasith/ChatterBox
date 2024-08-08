

```markdown
# Chatter Box

Chatter Box is a real-time chat application built using the MERN stack. It allows users to chat with each other in real-time, featuring JWT authentication, password hashing with BCryptjs, media storage, and a responsive UI.

## Features

- **Real-Time Communication**: Instant messaging powered by WebSockets and `socket.io`.
- **User Authentication**: Secure JWT-based authentication with password encryption using `bcryptjs`.
- **Media Storage**: Integrates with Cloudinary for seamless media uploads and storage.
- **Responsive UI**: Modern, responsive interface built with Tailwind CSS.
- **Alerts**: Real-time notifications powered by `react-hot-toast`.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **WebSocket**: `socket.io`
- **Authentication**: JWT, `bcryptjs`
- **Media Storage**: Cloudinary

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Git

### Clone the Repository

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/adnanshariff9/Chatter-Box.git
cd Chatter-Box
```

### Install Dependencies

#### Server

Navigate to the `server` directory and install the dependencies:

```bash
cd server
npm install
```

#### Client

Navigate to the `client` directory and install the dependencies:

```bash
cd client
npm install
```

## Environment Variables

Create `.env` files in both the `server` and `client` directories with the following environment variables:

### Server

In the `server` directory, create a `.env` file with the following content:

```plaintext
FRONTEND_URL=your_frontend_url (e.g., http://localhost:3000)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

### Client

In the `client` directory, create a `.env` file with the following content:

```plaintext
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_BACKEND_URL=your_backend_url (e.g., http://localhost:8080)
```
```
