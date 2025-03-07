import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { RiMore2Fill } from "react-icons/ri"; // Import the "three dots" icon from react-icons
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";

function GetplayList() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(null); // Track which menu is open

  // Redux states
  const { getPlaylistdata, getPlayliststatus } = useSelector(
    (state) => state.getPlaylist
  );
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode=darkModel
  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId
  const navigate = useNavigate();
  // Fetch playlists when userID changes
  useEffect(() => {
 
      dispatch(
        getPlaylistVideos({
          endpoint: "personal/getPlaylist",
          params: { userId: userID },
        })
      );
    
  }, []);

  // Loading state
  console.log(getPlayliststatus);
  if (getPlayliststatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (getPlayliststatus === "failed") {
    return (
      <div className="text-red-500 text-center mt-10">
        <p>Failed to load playlists. Please try again later.</p>
      </div>
    );
  }
 

  const handleMenuToggle = (playlistId) => {
    
    setShowMenu(showMenu === playlistId ? null : playlistId); // Toggle menu visibility
  };
  const handleplaylistClick = (id) => {
    navigate(`/play/${id}`);
  };

console.log( getPlaylistdata);
console.log(getPlayliststatus);
    
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen p-6 transition-all duration-300`}>
    <motion.h1
      className="text-3xl font-bold text-center mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      🎵 My Playlists
    </motion.h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {getPlaylistdata && getPlaylistdata?.playlist.length > 0 ? (
        getPlaylistdata?.playlist.map((playlist) => (
          <motion.div
            key={playlist._id}
            className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-md rounded-lg p-4 border relative transition-transform duration-300 hover:scale-105`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold truncate">{playlist.title}</h2>

            <div className="mt-2 space-y-3">
              {playlist.videos?.map((video) => (
                <div key={video._id} className="border-b pb-2">
                  <motion.video
                    className="py-2 w-[60px] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => handleplaylistClick(video._id)}
                    src={video.secure_url}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <p className="font-medium">{video.title}</p>
                  <p className="text-sm opacity-70">
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </p>

                  {/* Like & Dislike Buttons */}
                  <motion.div 
                    className="flex items-center justify-start space-x-4 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Like Button */}
                    <motion.button 
                      className="flex items-center space-x-1 p-2 rounded-full shadow border transition-all"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(video._id)}
                      style={{
                        backgroundColor: darkMode ? "#2D3748" : "#fff",
                        borderColor: darkMode ? "#4A5568" : "#E2E8F0",
                      }}
                    >
                      {video.likes?.length > 0 ? (
                        <FaHeart className="text-red-500 text-lg" />
                      ) : (
                        <FaRegHeart className="text-gray-500 text-lg" />
                      )}
                      <span className="font-semibold">{video.likes?.length}</span>
                    </motion.button>

                    {/* Dislike Button */}
                    <motion.button 
                      className="flex items-center space-x-1 p-2 rounded-full shadow border transition-all"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDislike(video._id)}
                      style={{
                        backgroundColor: darkMode ? "#2D3748" : "#fff",
                        borderColor: darkMode ? "#4A5568" : "#E2E8F0",
                      }}
                    >
                      {video.dislikes?.length > 0 ? (
                        <FaThumbsDown className="text-blue-500 text-lg" />
                      ) : (
                        <FaRegThumbsDown className="text-gray-500 text-lg" />
                      )}
                      <span className="font-semibold">{video.dislikes?.length}</span>
                    </motion.button>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Three dots menu button */}
            <button
              onClick={() => handleMenuToggle(playlist._id)}
              className="absolute top-2 right-2"
            >
              <RiMore2Fill size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
            </button>

            {/* Menu options */}
            {showMenu === playlist._id && (
              <motion.div 
                className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"} absolute top-8 right-2 shadow-md rounded-lg border w-40`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  <li className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                    ✏️ Edit Playlist
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-red-500 hover:text-white cursor-pointer">
                    🗑️ Delete Playlist
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))
      ) : (
        <motion.p 
          className="opacity-70 col-span-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ❌ No playlists available.
        </motion.p>
      )}
    </div>
  </div>
  );
}

export default GetplayList;
