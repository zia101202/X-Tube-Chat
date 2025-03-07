import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../../redux/slices/userSlice/createGroup";
import { getAllUsers } from "../../redux/slices/userSlice/getAllUsers";
import io from "socket.io-client";
import ChatDetails from './chatDetails'
import { motion } from "framer-motion";
const socket = io(import.meta.env.VITE_API_UR, {
  reconnection: true,         // Enable auto-reconnect
  reconnectionAttempts: 5,    // Try 5 times before giving up
  reconnectionDelay: 1000,    // Wait 1 second before retrying
});

const Chat = () => {
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode=darkModel
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user,setUser]=useState(null)
  const { dataAllUsers, StatusAllUser, errorStatusAllUsers } = useSelector(
    (state) => state.GetAllUserDataSlice
  );
  const { getAllGroupData, getAllGroupStatus, getAllerror } = useSelector(
    (state) => state.groupSlice
  );
  const [usersLive,setUsers]=useState() 
 
 


  const params = {
    userId: "6745927f801574dfaf37298f",
  };
  useEffect(() => {
    dispatch(getGroups({ endpoint: "/chat/getGroups", params }));
  }, []);

  useEffect(() => {
    dispatch(getAllUsers("/api/users"));
  }, []);

  const handleClickOfpicture = (user) => {

    setUser(user)
    console.log(user);
   
  };
console.log(dataAllUsers);
  const handleClickOfpictureGroup = (group) => {
    console.log(group);
    navigate(`/GroupDetails/${group._id}`, { state: { group } })};
console.log(getAllGroupData);


let userID;
  
const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId


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





  return (
    <>
  <div className={`flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-all duration-300`}>
      
      {/* Left Sidebar (Users & Groups) */}
      <div className={`h-screen p-4 w-[34%] overflow-y-scroll scrollbar-thin ${darkMode ? "scrollbar-gray-700 scrollbar-track-gray-800" : "scrollbar-gray-300 scrollbar-track-gray-200"}`}>
        
        {/* Users Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {dataAllUsers?.users?.map((user) => (
            <motion.div
              key={user.id}
              className={`flex items-center space-x-4 p-3 rounded-lg shadow-md cursor-pointer mb-4 transition-all duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"}`}
              onClick={() => handleClickOfpicture(user)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img className="w-12 h-12 rounded-full" src={user.picture} alt={user.name} />
              <p className="text-lg font-medium">{user.name}</p>
              <span className={`text-sm px-2 py-1 rounded-lg ${usersLive?.some((u) => u.userId === user._id) ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {usersLive?.some((u) => u.userId === user._id) ? "Online" : "Offline"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Groups Section */}
        {getAllGroupData && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Groups</h2>

            {/* Admin Groups */}
            {getAllGroupData?.data?.groupsAdmin?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Admin Groups</h3>
                {getAllGroupData?.data?.groupsAdmin?.map((group) => (
                  <motion.div
                    key={group.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg shadow-md cursor-pointer mb-4 transition-all duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"}`}
                    onClick={() => handleClickOfpictureGroup(group)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img className="w-12 h-12 rounded-full" src={`${import.meta.env.VITE_API_UR}/${group.profilePath}`} alt={group.groupName} />
                    <p className="text-lg font-medium">{group.groupName}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Member Groups */}
            {getAllGroupData?.data?.groupsMember?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Member Groups</h3>
                {getAllGroupData?.data?.groupsMember?.map((group) => (
                  <motion.div
                    key={group.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg shadow-md cursor-pointer mb-4 transition-all duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"}`}
                    onClick={() => handleClickOfpictureGroup(group)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img className="w-12 h-12 rounded-full" src={`${import.meta.env.VITE_API_UR}/${group?.profilePath}`} alt={group.groupName} />
                    <p className="text-lg font-medium">{group.groupName}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section (Chat Window) */}
      <div className="w-[66%]">
        {user && <ChatDetails user={user} />}
      </div>
    </div>
   
  </>
  
  );
};

export default Chat;
