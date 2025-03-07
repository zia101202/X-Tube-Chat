import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { createPlaylist } from "../../redux/slices/userSlice/createPlaylist";
import { useParams } from "react-router-dom";
import { watchLater } from "../../redux/slices/userSlice/watchLater";
import PlayList from "./playList";
import { MoreVertical, Loader2, AlertCircle, ListVideo } from "lucide-react";
import { motion } from "framer-motion";
function ShowplayListWithvideo() {
  const dispatch = useDispatch();
  const id=useParams()
  // Redux states
  const { getPlaylistdata, getPlayliststatus } = useSelector(
    (state) => state.getPlaylist
  );
  const { playlistVideo, playlistVideoStatus, playlistVideoError } =
    useSelector((state) => state.createPlaylistSlice);
         const { watchLaterVideo, watchLaterVideoStatus,watchLaterVideoError}=useSelector((state)=>state.watchLaterVideo)

 const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkmode=darkModel

  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId
  const [showPlaylistList, setShowPlaylistList] = useState(false);

  const handleClickPlayList = (playlistName) => {
      dispatch(
        createPlaylist({
          userId: userID,
          videoId: id.id,
          title: playlistName,
        })
      );
    
  };
  useEffect(() => {
    if (userID) {
      dispatch(
        getPlaylistVideos({
          endpoint: "personal/getPlaylist",
          params: { userId: userID },
        })
      );
    }
  }, [dispatch, userID]);

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

  // Toggle visibility of the playlist list
  

  console.log(getPlaylistdata);
  const handleWatchLater = () => {

    dispatch(watchLater({ userId: userID, videoId: id.id }));
  };
  console.log(watchLaterVideoError);

  
  return (
    <div>
       
         {watchLaterVideoStatus === "loading" && (
        <motion.p
          className="flex items-center justify-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <Loader2 className="animate-spin" size={22} />
          Loading...
        </motion.p>
      )}
       {watchLaterVideoError?.message && (
        <motion.p
          className="text-red-500 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AlertCircle size={22} />
          {watchLaterVideoError?.message}
        </motion.p>
      )}
         <motion.div
          className={`p-4 rounded-lg border ${
            darkmode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          } shadow-md`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p>Available Playlists </p>
          <ul>
            {getPlaylistdata?.playlist?.map((playlist) => (
              <motion.li
                key={playlist?._id}
                onClick={() => handleClickPlayList(playlist?.title)}
                className="flex items-center gap-2 text-lg p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ListVideo size={20} />
                {playlist.title}
              </motion.li>
            ))}
          </ul>
          <motion.button
                         className="flex items-center gap-2 text-lg p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-700"

            onClick={handleWatchLater}
            whileTap={{ scale: 0.95 }}
          >
            <ListVideo size={20} />
            Watch Later
          </motion.button>

          <PlayList />
        </motion.div>
           </div>
  );
}

export default ShowplayListWithvideo;
