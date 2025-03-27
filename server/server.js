import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling']
    },
    pingTimeout: 60000,
    pingInterval: 25000,
});

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Store connected users
const connectedUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
    try {
        console.log('A user connected');
        
        const userId = socket.handshake.query.userId;
        console.log('User connected with ID:', userId);

        if (userId) {
            connectedUsers.set(userId, socket.id);
            // Emit updated online users list to all connected clients
            io.emit('onlineUsers', Array.from(connectedUsers.keys()));

            // Handle new messages
            socket.on('newMessage', (data) => {
                try {
                    const { receiverId, message } = data;
                    const receiverSocketId = connectedUsers.get(receiverId);
                    
                    if (receiverSocketId) {
                        // Send to specific receiver
                        io.to(receiverSocketId).emit('newMessage', {
                            senderId: userId,
                            receiverId,
                            message,
                            createdAt: new Date()
                        });
                    }
                } catch (error) {
                    console.error('Error handling message:', error);
                }
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', userId);
                connectedUsers.delete(userId);
                // Emit updated online users list after disconnect
                io.emit('onlineUsers', Array.from(connectedUsers.keys()));
            });

            // Add error handling
            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
        }

    } catch (error) {
        console.error('Error in socket connection:', error);
    }
});

// routes
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// middleware
import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export io instance if you need to use it in other files
export { io };