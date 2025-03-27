import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, updateOnlineUsers } from '../../store/slice/socket/socket.slice'
import { getOtherUserThunk } from '../../store/slice/user/user.thunk'
const Home = () => {
const dispatch = useDispatch();
const {isAuthenticated, userProfile} = useSelector(state=> state.userReducer);
// console.log(userProfile._id);
const {socket} = useSelector(state => state.socketReducer);

useEffect(() => {
if(isAuthenticated) {
dispatch(initializeSocket(userProfile?._id));
dispatch(getOtherUserThunk());
}
}, [isAuthenticated, dispatch]);

useEffect(() =>{
if(!socket) return;
socket.on("onlineUsers", (onlineUsers) =>{
dispatch(updateOnlineUsers(onlineUsers));
});
socket.on("newMessage", (newMessage) =>{
// console.log(newMessage);
dispatch(setNewMessage(newMessage ))
});

return () => {
socket.close();
}
},[socket]);

return (
<div className='flex'>
<UserSidebar />
<MessageContainer />
</div>
)
}

export default Home