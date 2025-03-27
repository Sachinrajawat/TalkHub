// store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/user.slice'
import messageReducer from './slice/message/message.slice'
import socketReducer from './slice/socket/socket.slice'
import { socketMiddleware } from './slice/socket/socketMiddleware.js'

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }).concat(socketMiddleware)
});