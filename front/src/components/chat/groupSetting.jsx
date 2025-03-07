import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllUsers } from "../../redux/slices/userSlice/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
function GroupSetting() {
  const location = useLocation();
  const groupData = location.state;
  const [AddMembers, setMembers] = useState([]);
  const [typeValue, settypeValue] = useState([]);
  const { dataAllUsers, StatusAllUser, errorStatusAllUsers } = useSelector(
    (state) => state.GetAllUserDataSlice
  );
const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode=darkModel
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers("/api/users"));
  }, []);

  const handleClickOfpicture = (user, typeValue) => {
    settypeValue(typeValue);
    console.log(user);
    console.log(typeValue);
    if(!AddMembers.includes(user._id)) {
        setMembers([...AddMembers, user._id]);
    }
  
    console.log(AddMembers);
  };

  const handleAdd = () => {
    axios
      .post(`${import.meta.env.VITE_API_UR}/chat/AddMembers`, {
        groupId: groupData._id,
        member: AddMembers,
        type: typeValue,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(
          "Error adding members:",
          err.response?.data || err.message
        );
      });
  };

  const filteredUsers = dataAllUsers?.users?.filter((user) => {
    return !groupData.members.some((member) => member.userId === user.userId);
  });
  console.log(groupData);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      {/* Group Name */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Group: {groupData.groupName}
      </h2>

      {/* Admin Section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          Admin:
        </h3>
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full border-2 border-blue-500"
            src={groupData.createrId.picture}
            alt="Admin Profile"
          />
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {groupData.createrId.name}
          </p>
        </div>
      </div>

      {/* Members Section */}
      <div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          Members:
        </h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {groupData.members.map((member) => (
            <motion.div
              key={member.userId}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <img
                onClick={() => handleClickOfpicture(member, "remove")}
                className="w-12 h-12 rounded-full border-2 border-green-500 cursor-pointer hover:border-red-500 transition"
                src={member.picture}
                alt={`${member.name}'s Profile`}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {member.name}
              </p>
            </motion.div>
          ))}

          {typeValue === "remove" && AddMembers.length > 0 && (
            <button
              onClick={handleAdd}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Available Users Section */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Available Users:
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mt-4">
        {filteredUsers?.length > 0 &&
          filteredUsers?.map((user) => (
            <motion.div
              key={user.userId}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <img
                onClick={() => handleClickOfpicture(user, "add")}
                className="w-12 h-12 rounded-full border-2 border-gray-400 hover:border-blue-500 transition"
                src={user.picture}
                alt=""
              />
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {user.name}
              </p>
            </motion.div>
          ))}
      </div>

      {/* Add Button */}
      {typeValue === "add" && AddMembers.length > 0 && (
        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Members
        </button>
      )}
    </div>
  </div>
  );
}

export default GroupSetting;
