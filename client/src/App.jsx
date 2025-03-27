// App.jsx
import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";
import { initializeSocket, disconnectSocket } from "./store/slice/socket/socket.slice";
import { setupSocketEvents } from "./store/slice/socket/socketEvents";

function App() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const socket = useSelector((state) => state.socketReducer.socket);

  // Effect for initializing user profile
  useEffect(() => {
    if (!userProfile) {
      dispatch(getUserProfileThunk());
    }
  }, []);

  // Effect for socket initialization
  useEffect(() => {
    if (userProfile?._id && !socket) {
      console.log("Initializing socket for user:", userProfile._id);
      dispatch(initializeSocket(userProfile._id));
    }
  }, [userProfile, socket]);

  // Effect for setting up socket events
  useEffect(() => {
    if (socket) {
      setupSocketEvents(socket, dispatch);
    }

    return () => {
      if (socket) {
        dispatch(disconnectSocket());
      }
    };
  }, [socket]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;