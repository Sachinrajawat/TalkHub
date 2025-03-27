import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from "../../store/slice/user/user.slice";

const User = ({userDetails}) => {

  const dispatch = useDispatch();
  const {selectedUser} = useSelector(state=>state.userReducer);
  // console.log(selectedUser);
  const { onlineUsers } = useSelector(state=> state.socketReducer);
  const isUserOnline=onlineUsers?.includes(userDetails?._id);
  const handleUserClick = () =>{
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div onClick={handleUserClick}
    className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg py-1 px-2 cursor-pointer 
    ${userDetails?._id === selectedUser?._id && 'bg-gray-700'}`}>
        
    <div className={`avatar ${isUserOnline && 'online'}`}>
      <div className="w-12 rounded-full">
        <img src={userDetails?.avatar} />
      </div>
    </div>
    <div>
    <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
    <p className="text-xs">{userDetails?.username}</p>
    </div>
    </div>
  );
};

export default User;
