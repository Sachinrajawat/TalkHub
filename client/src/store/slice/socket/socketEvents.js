// socketEvents.js
import { updateOnlineUsers, setSocketError } from './socket.slice';

export const setupSocketEvents = (socket, dispatch) => {
    if (!socket) return;

    socket.on('connect', () => {
        console.log('Socket connected successfully');
        dispatch(setSocketError(null));
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        dispatch(setSocketError(error.message));
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
        dispatch(setSocketError(error.message));
    });

    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });

    socket.on('onlineUsers', (users) => {
        console.log('Online users updated:', users);
        dispatch(updateOnlineUsers(users));
    });
};