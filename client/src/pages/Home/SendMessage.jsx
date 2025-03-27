import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    if (!selectedUser?._id) return; // Prevent sending if no user is selected

    dispatch(
      sendMessageThunk({
        receiverId: selectedUser._id,
        message,
      })
    );
    setMessage(""); // Clear input field after sending
  };

  return (
    <div className="w-full p-3 flex gap-3">
      <input
        type="text"
        placeholder="Type here..."
        className="input input-bordered input-primary w-full"
        value={message} // Ensure controlled input
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send on Enter key press
      />
      <button 
        onClick={handleSendMessage} 
        className="btn btn-square btn-outline btn-primary"
        disabled={!message.trim()} // Disable button if input is empty
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default SendMessage;
