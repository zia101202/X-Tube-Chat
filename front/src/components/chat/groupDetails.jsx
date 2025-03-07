import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice/getAllUsers";
import { useLocation } from "react-router-dom";
import { getChat } from "../../redux/slices/userSlice/getChat";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const socket = io("http://localhost:5000"); // Backend URL

const GroupDetails = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const { userID, status, error } = useSelector((state) => state.userSlice);
  const { chatData, chatStatus, chatError } = useSelector(
    (state) => state.ChatDataSlice
  );
  const { darkModel } = useSelector((state) => state.darkModelSlice);
    const darkMode=darkModel
const  reciver=[location?.state?.group?.createrId,]
location?.state?.group?.members.map((member) => reciver.push(member._id))

useEffect(() => {
  socket.emit("register", userID);
}, [reciver]);

useEffect(() => {
  socket.on("Group_Messages", ({ group,from, message }) => {
    setMessages((prevMessages) => [...prevMessages, { from, message }]);

    console.log({ group,from, message }); // Fixed log statement
  });
 
  return () => {
    socket.off("Group_Messages"); // Corrected event name for cleanup
  };
}, []);



  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("Group_Messages", {
        group: location?.state?.group._id,
        to: reciver,
        from: userID,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    dispatch(getChat({ to: reciver, from: userID }));
  }, []);
  console.log(messages);
console.log(chatData);

console.log(
  "/chat/AddMembers");

  const handleSettingGroup=()=>{
     Navigate('/GroupSetting' ,{state:location?.state?.group})
  }



  

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md">
        <button
          onClick={handleSettingGroup}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
        >
          <i className="fas fa-cogs text-xl"></i> {/* Settings icon */}
        </button>

        {/* Group Info */}
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            src={`${import.meta.env.VITE_API_UR}/${location?.state?.group?.profilePath}`}
            alt="group"
          />
          <p className="text-lg font-semibold text-gray-700 dark:text-white">
            {location?.state?.group?.groupName}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-800">
        <div className="space-y-4">
          {/* Render Messages */}
          {location?.state?.group?.messages?.map((message, index) => (
            <motion.div
              key={index}
              className={`flex ${
                message?.userId?.isMe ? "justify-end" : "justify-start"
              } space-x-3`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Picture */}
              {!message?.userId?.isMe && (
                <img
                  src={message?.userId?.picture}
                  alt={message?.userId?.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                />
              )}

              {/* Message Bubble */}
              <div className="max-w-[80%]">
                <div
                  className={`p-3 rounded-lg shadow-sm ${
                    message?.userId?.isMe
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {!message?.userId?.isMe && (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {message?.userId?.name}
                    </p>
                  )}
                  <p>{message?.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    }).format(new Date(message.createdAt))}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          <i className="fas fa-paper-plane"></i> {/* Plane icon */}
        </button>
      </div>
    </div>
  
  
  );
};

export default GroupDetails;
