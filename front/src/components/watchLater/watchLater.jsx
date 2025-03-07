import React, { useEffect } from "react";
import { getWatchLaterVideos } from "../../redux/slices/userSlice/getWatchLater";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function WatchLater() {
  const navigate = useNavigate();
  const { WatchLaterdata ,  WatchLaterstatus, WatchLatererror} = useSelector((state) => state.getWatchLater);
 
  const dispatch = useDispatch();

    const { darkModel } = useSelector((state) => state.darkModelSlice);
      const darkMode=darkModel
     

  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId

 console.log(WatchLaterdata);
 console.log( WatchLaterstatus);
 console.log(WatchLatererror);
  useEffect(() => {
   
      dispatch(
        getWatchLaterVideos({
          endpoint: "personal/getWatchLater",
          params: { userId: userID },
        })
      );
    
  }, []);

  // Navigate to the video player
  const handlevideo = (id) => {
   
    navigate(`/play/${id}`);
  };

  const videoList = WatchLaterdata?.watchlist?.videoId || [];

  return (
    <>
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen p-6 transition-all duration-300`}>
      {videoList.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">
            🎥 Watch Later Videos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoList.map((video) => (
              <motion.div
                key={video._id}
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-md rounded-lg p-4 border`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.video
                  className="w-full h-auto cursor-pointer rounded-lg shadow-md"
                  src={video.secure_url}
                  controls
                  onClick={() => handlevideo(video._id)}
                  whileHover={{ scale: 1.02 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 text-lg">🚫 No videos in your watch later list.</p>
        </motion.div>
      )}
    </div>
    </>
  );
}
