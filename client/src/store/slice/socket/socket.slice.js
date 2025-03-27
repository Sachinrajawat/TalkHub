// socket.slice.js
import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
socket: null,
onlineUsers: [],
socketError: null,
};

export const socketSlice = createSlice({
name: 'socket',
initialState,
reducers: {
initializeSocket: (state, action) => {
try {
const userId = action.payload;
if (!userId) {
console.error('Cannot initialize socket: userId is undefined');
state.socketError = 'User ID is required';
return;
}


            // Check if socket already exists and is connected
            if (state.socket?.connected) {
                console.log('Socket already connected');
                return;
            }

            // Disconnect existing socket if any
            if (state.socket) {
                state.socket.disconnect();
                state.socket = null;
            }

            console.log("Initializing socket with userId:", userId);

            const newSocket = io(import.meta.env.VITE_DB_ORIGIN, {
                query: { userId },
                transports: ['websocket', 'polling'],
                withCredentials: true,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            state.socket = newSocket;
            state.socketError = null;
        } catch (error) {
            console.error('Socket initialization error:', error);
            state.socketError = error.message;
        }
    },
    updateOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
        if (state.socket) {
            state.socket.disconnect();
            state.socket = null;
            state.onlineUsers = [];
            state.socketError = null;
        }
    },
    setSocketError: (state, action) => {
        state.socketError = action.payload;
    }
},
});

export const {
initializeSocket,
updateOnlineUsers, // Make sure this matches
disconnectSocket,
setSocketError
} = socketSlice.actions;

export default socketSlice.reducer;