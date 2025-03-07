import React, { useEffect, useState } from "react";
import { createPlaylist } from "../../redux/slices/userSlice/createPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Loader2, AlertCircle, CheckCircle } from "lucide-react";
function PlayList({ videoId }) {
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const { playlistVideo, playlistVideoStatus, playlistVideoError } =
    useSelector((state) => state.createPlaylistSlice);
    const id=useParams()
 const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkmode=darkModel
    let userID;
    const value = JSON.parse(localStorage.getItem("user"));
  userID=value.userId
  const handleClickPlayList = () => {
 console.log('hi');

      dispatch(
        createPlaylist({
          userId: userID,
          videoId: videoId || id.id,
          title: playlistName,
        })
      );
    
  };

  console.log(playlistVideo);
  console.log(playlistVideoStatus);
  console.log(playlistVideoError);
  return (
    <motion.div
    className={`p-6 rounded-2xl shadow-lg transition-all ${
      darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Add Playlist Button */}
   

    {/* Input Field */}
    <div className="mb-2">
      <input
        className={`w-full p-1 rounded-lg text-lg transition-all shadow-sm focus:outline-none focus:ring-2 ${
          darkmode
            ? "bg-gray-800 text-white border-gray-700 focus:ring-gray-500"
            : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500"
        } border`}
        type="text"
        placeholder="🎵 Enter Playlist Name"
        onChange={(e) => setPlaylistName(e.target.value)}
      />
    </div>
    <motion.button
      className={`flex items-center gap-2 px-2 py-2 rounded-xl text-sm font-medium transition-all shadow-md ${
        darkmode
          ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500"
      }`}
      onClick={handleClickPlayList}
      whileTap={{ scale: 0.95 }}
    >
      <PlusCircle size={18} /> Add Playlist
    </motion.button>
    {/* Playlist Status */}
    <div className="mt-5 text-lg font-medium flex justify-center items-center gap-2">
      {playlistVideoStatus === "loading" ? (
        <motion.div
          className="flex items-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <Loader2 className="animate-spin" size={22} />
          Loading...
        </motion.div>
      ) : playlistVideoStatus === "failed" ? (
        <motion.div
          className="flex items-center gap-2 text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AlertCircle size={22} />
          Error: {playlistVideoError?.message}
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center gap-2 text-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle size={22} />
          Playlist Loaded
        </motion.div>
      )}
    </div>
  </motion.div>
  );
}

export default PlayList;
