# TalkHub - Real-Time Chat Application

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for real-time communication.

## Features

- 🔐 User Authentication
- 💬 Real-time Messaging
- 🟢 Online/Offline Status
- 👥 User Search
- 📱 Responsive Design
- 🌙 Dark Mode UI
- 🔍 Message History

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- Cookie Parser

## Installation

1. Clone the repository
```bash
git clone https://github.com/Sachinrajawat/TalkHub.git



I'll help you create a professional README.md file for your chat application:

Markdown

Collapse
# TalkHub - Real-Time Chat Application

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for real-time communication.

## Features

- 🔐 User Authentication
- 💬 Real-time Messaging
- 🟢 Online/Offline Status
- 👥 User Search
- 📱 Responsive Design
- 🌙 Dark Mode UI
- 🔍 Message History

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- Cookie Parser

## Installation

1. Clone the repository
```bash
git clone https://github.com/Sachinrajawat/TalkHub.git

2. Install dependencies for backend
cd server
npm install

3. Install dependencies for frontend

cd client
npm install

4. Set up environment variables
Create .env file in server directory:

ENV

PORT = 5000
MONGODB_URL = "your_mongodb_url"
JWT_SECRET = "your_jwt_secret"
JWT_EXPIRES = "2d"
COOKIE_EXPIRES = 2
CLIENT_URL = "http://localhost:5173"
Create .env file in client directory:

ENV

VITE_DB_URL = "http://localhost:5000/api/v1"
VITE_DB_ORIGIN = "http://localhost:5000"

5. Run the application
For Backend:

BASH

cd server
npm run dev
For Frontend:

BASH

cd client
npm run dev



Usage
Register a new account or login with existing credentials
Search for users in the sidebar
Click on a user to start chatting
Send messages in real-time
See online/offline status of users
API Endpoints
User Routes
POST /api/v1/user/register - Register new user
POST /api/v1/user/login - Login user
GET /api/v1/user/logout - Logout user
GET /api/v1/user/profile - Get user profile
Message Routes
POST /api/v1/message/send/:receiverId - Send message
GET /api/v1/message/get-messages/:receiverId - Get messages with specific user
