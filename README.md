# Chatter Box

Chatter Box is a real-time chat application built using the MERN stack. It allows users to chat with each other in real-time, featuring JWT authentication, password hashing with BCryptjs, media storage, and a responsive UI. This project also integrates **DevOps best practices** using **Jenkins, Docker, ELK (Elasticsearch, Logstash, Kibana), and JMeter** for logging, monitoring, CI/CD automation, and performance testing.

## Features

- **Real-Time Communication**: Instant messaging powered by WebSockets and `socket.io`.
- **User Authentication**: Secure JWT-based authentication with password encryption using `bcryptjs`.
- **Media Storage**: Integrates with Cloudinary for seamless media uploads and storage.
- **Responsive UI**: Modern, responsive interface built with Tailwind CSS.
- **Alerts**: Real-time notifications powered by `react-hot-toast`.
- **Logging & Monitoring**: Winston logs stored in **ELK stack (Elasticsearch, Logstash, Kibana)**.
- **CI/CD Pipeline**: Automated build, test, and deployment via **Jenkins**.
- **Performance Testing**: Load testing with **Apache JMeter**.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **WebSocket**: `socket.io`
- **Authentication**: JWT, `bcryptjs`
- **Media Storage**: Cloudinary
- **Logging & Monitoring**: Winston, ELK (Elasticsearch, Logstash, Kibana)
- **CI/CD**: Jenkins, Docker, Minikube
- **Performance Testing**: JMeter

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Git
- Docker
- Jenkins
- Apache JMeter (for performance testing)

### Clone the Repository

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/maazabdulbasith/ChatterBox.git
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
ELASTICSEARCH_URL=http://localhost:9200
```

### Client

In the `client` directory, create a `.env` file with the following content:

```plaintext
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_BACKEND_URL=your_backend_url (e.g., http://localhost:8080)
```

## Running the Application

### **Start the Server**
```bash
cd server
npm start
```

### **Start the Client**
```bash
cd client
npm start
```

## Running with Docker

### **Build and Run the Backend Container**
```bash
cd server
docker build -t chatter-box:latest .
docker run -p 3000:3000 chatter-box:latest
```

## Running CI/CD with Jenkins

1. Ensure **Jenkins** is installed and running.
2. Add the repository URL in Jenkins and configure the pipeline to read the **Jenkinsfile**.
3. Run the pipeline to automate **build, test, and deployment**.

## Running Logstash for ELK Stack

Ensure **Elasticsearch** is running, then start Logstash:
```bash
logstash -f server/config/logstash.conf
```

## Running Performance Tests with JMeter

1. Open **Apache JMeter**.
2. Load the **JMeter test plan**.
3. Run the test and analyze logs in Kibana.

## Future Improvements

- **Integrate Prometheus + Grafana** for real-time performance monitoring.
- **Enhance CI/CD** by adding security scanning.
- **Improve JMeter test coverage** by simulating more user behaviors.

## Conclusion

This project successfully integrates **full-stack development** with **DevOps best practices** using **Jenkins, ELK, Docker, and JMeter**. The CI/CD pipeline ensures seamless deployment, while ELK and JMeter provide real-time monitoring and performance analysis.

