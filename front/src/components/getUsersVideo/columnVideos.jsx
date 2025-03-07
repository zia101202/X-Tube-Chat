import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllVideos } from "../../redux/slices/userSlice/getAllvideos";
import VideoPlayerPrivate from "../videoCard/videoCard";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { setDarkModel } from "../../redux/slices/userSlice/darkModel";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ProfileUpdate from "../profile/profile";
const ColumnVideos = ({classValues}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.GetAllVideosSlice);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const { darkModel } = useSelector((state) => state.darkModelSlice);

const darkMode=darkModel
  useEffect(() => {
    dispatch(GetAllVideos("video/GetAllVideos"));
  }, [dispatch]);

  const toggleDescription = (videoId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleVideoClick = (video) => {
    navigate(`/play/${video._id}`, { state: { video } });
  };

 
    const toggleDarkMode = () => {
      console.log('ji');
      dispatch(setDarkModel(!darkModel)); 
    };
    console.log(darkModel);
    const userDetails = JSON.parse(localStorage.getItem("user"));
    console.log(userDetails);
  
    const ProfileUpdate=()=>{
      navigate("/profile")
    }
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen px-3`}> 
  
  
    {status === "loading" &&  <motion.div
        className="absolute w-12 h-12 rounded-full border-4 border-blue-500 border-opacity-50 animate-pulse"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />}
    {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}

    {status === "succeeded" && data && data.length > 0 ? (
      <div classValues="grid grid-cols-1 space-y-4">
        {data.map((media) => {
          const isExpanded = expandedDescriptions[media._id] || false;
          const isVideo = media?.type?.startsWith("video/");
          const isImage = media?.type?.startsWith("image/");

          return (
            <div
              key={media?._id}
              className={` my-[20px] flex ${darkMode ? "" : "bg-white"} shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105`}
              onClick={() => handleVideoClick(media)}
            >
              <div className="max-w-[220px]  max-h-[220px] mr-[10px] flex items-center justify-center bg-black">
                {isVideo ? (
                  <VideoPlayerPrivate publicId={media?.secure_url} video={media?.type} type="video" crossOrigin="anonymous"  />
                ) : isImage ? (
                  <img src={media?.secure_url} alt={media?.title || "Uploaded Media"} className="w-full h-full object-cover aspect-video" />
                ) : null}
              </div>

              <div className="text-[10px] ">
              <div className="flex items-center mt-2">
                 
                
                
                 <h2 className="font-semibold text-[14px] ">{media.title}</h2>
                
               </div>
                
                <div    className={`mt-2 flex space-x-3 ${darkMode ? " text-white" : "bg-white text-gray-900"} `} >
                <span >Views: {media?.views}</span>

                <p> {media?.uploadDate ? formatDistanceToNow(new Date(media.uploadDate), { addSuffix: true }) : "Unknown date"}</p>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      status === "succeeded" && <p className="text-center">No videos available.</p>
    )}
  </div>
  );
};

export default ColumnVideos;