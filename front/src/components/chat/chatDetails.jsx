import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice/getAllUsers";
import { useLocation } from "react-router-dom";
import { getChat } from "../../redux/slices/userSlice/getChat";
import { motion } from "framer-motion";
const socket = io(import.meta.env.VITE_API_UR, {
  reconnection: true, // Enable auto-reconnect
  reconnectionAttempts: 5, // Try 5 times before giving up
  reconnectionDelay: 1000, // Wait 1 second before retrying
});

const ChatDetails = ({user}) => {
  const [message, setMessage] = useState(null);
  const [messagesReceive, setMessages] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const reciver = user?._id;
  console.log(user);
  const { chatData } = useSelector((state) => state.ChatDataSlice);
  const [file, setFile] = useState(null);
  const [Loadfile, setLoadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ReceivepreviewUrl, setReceivePreviewUrl] = useState(null);
  const [Receivefile, setReceiveFile] = useState(null);
  const [usersLive, setUsers] = useState([]);
  const [currentUsersLive, setcurrentUsersLive] = useState([]);
  const [getMessages, setgetMessages] = useState([]);
  const dataRef = useRef(null);
 
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode=darkModel
 











  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
  userID = value.userId;
  console.log(userID);
  useEffect(() => {
    const handlePrivateMessage = ({ from, message, file }) => {
      console.log("Received private message");
      setMessages(message);
      console.log(file);
      setReceiveFile(file);
    };

    socket.on("private_message", handlePrivateMessage);

    return () => {
      socket.off("private_message", handlePrivateMessage); // Ensure the listener is removed on cleanup
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  console.log(Receivefile);

  if (Receivefile != null) {
    const displayImage = URL.createObjectURL(new Blob([Receivefile]));
    setReceivePreviewUrl(displayImage);
  }

  useEffect(() => {
    socket.emit("register", userID);
  }, []);

  useEffect(() => {
    socket.on("updateUsers", (users) => {
      setUsers(users);
      console.log(users);
    });
  }, []);
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
  });
  useEffect(() => {
    if (Loadfile != null) {
      setPreviewUrl(URL.createObjectURL(file));
      console.log(previewUrl);
      socket.emit("private_message", {
        to: reciver,
        from: userID,
        file: Loadfile,
      });
    }
  }, [Loadfile]);
  console.log(Loadfile);

  const handleSendMessage = () => {
    console.log(userID);
    console.log(value);

  console.log(getMessages);
    socket.emit("register", userID);
    socket.emit("private_message", {
      to: reciver,
      from: userID,
      message,
      value,
    });
    let dataMessages = { 
      ...getMessages, 
      availableUserMessages: { 
        ...getMessages.availableUserMessages, // ✅ Copy nested object
        messages: [ // ✅ Create a new array
          ...getMessages.availableUserMessages.messages, 
          {
            message,
            fromUserId: value,
            createdAt: new Date().toISOString()
          }
        ]
      }
    };
    
    setgetMessages(dataMessages); // ✅ React detects the change
    
    

  };
  console.log(getMessages);

  useEffect(() => {
    setgetMessages(chatData)
    localStorage.setItem('messages',JSON.stringify(getMessages))
  }, [chatData]);
  useEffect(() => {
    dispatch(getChat({ to: reciver, from: userID }));
  }, []);

  const handleFileSelection = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      setLoadFile(reader.result);
    };
    reader.readAsDataURL(file);
  };


 console.log(chatData);




  const handleImage = () => {
    setFile(null);
  };

  useEffect(() => {
    setcurrentUsersLive(usersLive.filter((user) => user.userId == reciver));
  }, [usersLive]);

  console.log(getMessages);















  useEffect(() => {
    socket.on("private_message", ({ from, message, file,value }) => {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
     let totalMessages= JSON.parse(localStorage.getItem("messages"))
      setMessages(message);
      console.log(value);
      console.log(totalMessages);
      console.log(message);
      let dataMessages = { 
        ...totalMessages, 
        availableUserMessages: { 
          ...totalMessages.availableUserMessages, // ✅ Copy nested object
          messages: [ // ✅ Create a new array
            ...totalMessages.availableUserMessages.messages, 
            {
              message: message,
              fromUserId: value,
              createdAt: new Date().toISOString()
            }
          ]
        }
      };
      console.log(dataMessages);
      setgetMessages(dataMessages);




      dataRef.current = file;
      console.log(file);
      setReceiveFile(file); //image file is receving but causing too many rerenders
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);
  return (
  <div className={`h-screen flex flex-col transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
      {/* Header Section */}
      <div className={`flex items-center space-x-4 p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <img className="w-12 h-12 rounded-full border-2 border-blue-500" src={user.picture} alt="User" />
        <p className="text-xl font-semibold">{user.name}</p>
        <span className={`px-2 py-1 rounded-lg ${currentUsersLive?.length > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {currentUsersLive?.length > 0 ? "Online 🟢" : "Offline 🔴"}
        </span>
      </div>

      {/* Remove Image Button */}
      <button onClick={handleImage} className="self-start m-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition">
        Remove Image 🗑️
      </button>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {getMessages?.availableUserMessages?.messages?.map((msg, index) => (
          <motion.div
            key={index}
            className={`flex ${msg.fromUserId.id === user.id ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Message Box */}
            <div className={`flex p-3 rounded-xl max-w-[70%] break-words shadow-sm ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <div>
                <p className="text-sm font-medium">{msg.fromUserId.name || "Unknown User"}</p>
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true }).format(new Date(msg.createdAt))}
                </p>
              </div>
              <div className="w-12 h-12 overflow-hidden rounded-full ml-3">
                <img src={msg.fromUserId.picture || msg.fromUserId.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Image/Video Preview */}
        {previewUrl && <img src={previewUrl} alt="Selected" className="w-48 mt-4 rounded-lg shadow-md" />}
        {ReceivepreviewUrl && <img src={ReceivepreviewUrl} alt="Received" className="w-48 mt-4 rounded-lg shadow-md" />}
      </div>

      {/* Message Input Section */}
      <div className={`p-4 shadow-md flex items-center space-x-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`w-full p-3 rounded-lg border focus:ring-2 ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "border-gray-300 focus:ring-blue-500"}`}
        />

        {/* File Upload */}
        <label className="cursor-pointer">
          <i className={`fas fa-paperclip text-lg ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}`}></i>
          <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelection} />
        </label>

        {/* Send Button */}
        <button onClick={handleSendMessage} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
