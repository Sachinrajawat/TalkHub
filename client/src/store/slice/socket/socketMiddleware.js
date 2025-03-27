// socketMiddleware.js
import { updateOnlineUsers, setSocketError } from './socket.slice'; // Changed from setOnlineUsers to updateOnlineUsers

export const socketMiddleware = (store) => (next) => (action) => {
if (action.type === 'socket/initializeSocket') {
const socket = store.getState().socketReducer.socket;


    if (socket) {
        socket.on('connect', () => {
            console.log('Socket connected successfully');
            store.dispatch(setSocketError(null));
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            store.dispatch(setSocketError(error.message));
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
            store.dispatch(setSocketError(error.message));
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('onlineUsers', (users) => {
            console.log('Online users updated:', users);
            store.dispatch(updateOnlineUsers(users));  // Changed from setOnlineUsers to updateOnlineUsers
        });
    }
}
return next(action);
};