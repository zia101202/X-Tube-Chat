import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDataWithImages } from "../../redux/slices/userSlice/createGroup";
import { getAllUsers } from "../../redux/slices/userSlice/getAllUsers";
import { motion } from "framer-motion";
const CreateGroup = () => {
  const [groupName, setGroupName] = useState(null);
  const [Validation, setValidation] = useState(false);
  const [card, SetCard] = useState(false);
  const [Image, setImage] = useState(null);
  const [members, setMembers] = useState([]);
  const { userID } = useSelector((state) => state.userSlice);
  const { dataAllUsers, StatusAllUser, errorStatusAllUsers } = useSelector(
    (state) => state.GetAllUserDataSlice
  );
  const dispatch = useDispatch();
  const { darkModel } = useSelector((state) => state.darkModelSlice);
    const darkMode=darkModel
  useEffect(() => {
    dispatch(getAllUsers("/api/users"));
  },[])
  const handleChange = (e) => {
    groupName;
    setGroupName(e.target.value);
  };

  const handleClickOfpicture = (user) => {
    console.log(members)
    
      console.log(members.includes(user._id))
    if (!members.includes(user._id)) {
      
      setMembers([...members,user._id]) 
    }else{
   
      setMembers(members.filter((id)=>id!==user._id))
    }
  };

  function handleAddGroup() {
    if (groupName == null || members.length == 0) {
      setValidation(true);
    }
    const formData = new FormData();
    formData.append("groupImage", Image);
    formData.append("createrId", userID);
    formData.append("groupName", groupName);
    formData.append("members", JSON.stringify(members));

    console.log(formData.get("groupImage"));
    dispatch(
      createDataWithImages({
        endpoint: "/chat/CreateGroup",
        formData,
      })
    );
  }

  const handleimage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGroup = () => {
    SetCard(!card);
  };
  console.log(dataAllUsers);
 console.log(StatusAllUser);
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="p-4 space-y-3 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* 🌙 Dark Mode Toggle */}
     

      {/* 🧑‍🤝‍🧑 Users List */}
      {dataAllUsers?.users?.map((user) => (
        <motion.div
          key={user._id}
          className="flex items-center space-x-4 p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer shadow-sm"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleClickOfpicture(user)}
        >
          {/* User Picture */}
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-500"
            src={user.picture || "default-profile.png"}
            alt="User"
          />

          {/* User Name & Selected Checkmark */}
          <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            {user.name}
            {members.includes(user._id) && (
              <span className="text-green-500 text-xl">✔</span>
            )}
          </p>
        </motion.div>
      ))}

      {/* ➕ Create Group Button */}
      <button
        onClick={handleGroup}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-lg"
      >
        Create Group ➕
      </button>

      {/* 🏷️ Group Creation Modal */}
      {card && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* ❌ Close Button */}
            <div
              onClick={handleGroup}
              className="text-gray-500 hover:text-red-500 text-xl cursor-pointer text-right"
            >
              ✖
            </div>

            {/* ✏️ Group Name Input */}
            <input
              type="text"
              placeholder="Group Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 mt-2"
            />

            {/* 🚨 Validation Messages */}
            {Validation && !groupName && (
              <p className="text-red-500 mt-1">⚠️ Fill in the Group Name</p>
            )}
            {Validation && members.length === 0 && (
              <p className="text-red-500 mt-1">⚠️ Add Users to the Group</p>
            )}

            {/* 📸 Group Picture Upload */}
            <p className="mt-3 font-medium text-gray-900 dark:text-white">
              📸 Select Group Picture
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleimage}
              className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
            />

            {/* ✅ Add Group Button */}
            <button
              onClick={handleAddGroup}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Group ✅
            </button>
          </motion.div>
        </div>
      )}
    </div>
  </div>
  );
};

export default CreateGroup;
