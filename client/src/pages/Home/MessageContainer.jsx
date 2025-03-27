import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(state => state.userReducer);
  const { messages } = useSelector(state => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser, dispatch]);

  return (
    <>
      {!selectedUser ? (
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <h2>Welcome to GUP SHUP</h2>
          <p className="text-xl">Please select a person to continue your chat</p>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col">
          {/* User Info Section */}
          <div className="px-3 border-b border-b-white/10">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages Container */}
          <div className="h-full overflow-y-auto p-3">
            {messages?.length > 0 ? (
              messages.map((messageDetails, index) => (
                <Message 
                  key={messageDetails?._id || `message-${index}`} // Ensure a unique key
                  messageDetails={messageDetails}
                />
              ))
            ) : (
              <p className="text-center text-gray-400">No messages yet</p>
            )}
          </div>

          {/* Send Message Section */}
          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
