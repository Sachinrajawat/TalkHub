import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUserThunk, logoutUserThunk } from "../../store/slice/user/user.thunk";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector(state => state.userReducer);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  }

  // Fetch other users when component mounts
  useEffect(() => {
    dispatch(getOtherUserThunk());
  }, [dispatch]);

  // Handle search and filtering
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredUsers(otherUsers || []);
    } else {
      const filtered = otherUsers?.filter(user => 
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(filtered || []);
    }
  }, [searchValue, otherUsers]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-1 text-[#7480FF] text-xl font-semibold">
        GUP SHUP
      </h1>

      {/* Search Input */}
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input 
            type="text" 
            className="grow" 
            placeholder="Search" 
            value={searchValue}
            onChange={handleSearchChange}
          />
          <FaSearch />
        </label>
      </div>

      {/* Users List */}
      <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map(userDetails => (
            <User key={userDetails?._id} userDetails={userDetails} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            {searchValue ? "No users found" : "Loading users..."}
          </div>
        )}
      </div>

      {/* User Profile and Logout */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img 
                src={userProfile?.avatar} 
                alt={userProfile?.username}
                onError={(e) => {
                  e.target.src = 'default-avatar.png'; // Add a default avatar image
                }}
              />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>
        <button 
          onClick={handleLogout} 
          className="btn btn-primary btn-sm px-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;