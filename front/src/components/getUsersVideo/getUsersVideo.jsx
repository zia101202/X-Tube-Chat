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
import  "./style.css";
const GetUsersVideo = ({classValues}) => {
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
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">User Videos</h1>
      <div className="flex space-x-2">
      <button 
       onClick={toggleDarkMode} 
       className="p-2 h-[43px] rounded-full bg-gray-700 text-white shadow-lg transition-transform hover:scale-110"
       
     >
       {darkModel ? <LightModeIcon /> : <DarkModeIcon />}
     </button>
        <div className="cursor-pointer" onClick={ProfileUpdate}>
        <img
  className="min-w-[43px] h-[43px] rounded-full shadow-lg"
  src={userDetails?.profilePicture || "/profile.jpg"}
  alt="User Profile"
/>

     <div className="ml-[10px]"> {userDetails?.name}</div>  
     </div>
      </div>
  </div>
  
    {status === "loading" &&  <motion.div
        className="absolute w-12 h-12 rounded-full border-4 border-blue-500 border-opacity-50 animate-pulse"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />}
    {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}

    {status === "succeeded" && data && data.length > 0 ? (
      <div className="videosHome">
        {data.map((media) => {
          const isExpanded = expandedDescriptions[media._id] || false;
          const isVideo = media?.type?.startsWith("video/");
          const isImage = media?.type?.startsWith("image/");

          return (
            <div
              key={media?._id}
              className={`max-w-[350px]  ${darkMode ? "" : "bg-white"}  overflow-hidden cursor-pointer transition-transform hover:scale-105`}
              onClick={() => handleVideoClick(media)}
            >
              <div className="max-w-[350px]  flex items-center justify-center bg-black">
                {isVideo ? (
                  <VideoPlayerPrivate publicId={media?.secure_url} video={media?.type} type="video" crossOrigin="anonymous"  />
                ) : isImage ? (
                  <img src={media?.secure_url} alt={media?.title || "Uploaded Media"} className="w-full h-full object-cover aspect-video" />
                ) : null}
              </div>

              <div className="p-4">
              <div className="flex items-center mt-2">
                 
                
                <img
                    src={media?.uploadedBy?.picture ? media?.uploadedBy?.picture : "/profile.jpg"}
                    alt={media?.uploadedBy?.nickname}
                    className="w-9 h-9 rounded-full mr-2 border border-gray-500"
                  />
                 <h2 className="text-[15px]">{media.title}</h2>
                
               </div>
                
                <div    className={`ml-[43px] mt-2 flex  ${darkMode ? " text-white" : "bg-white text-gray-900"} `} >
                <span className="text-xs mr-[10px] ">Views: {media?.views}</span>

                <p className="text-xs "> {media?.uploadDate ? formatDistanceToNow(new Date(media.uploadDate), { addSuffix: true }) : "Unknown date"}</p>
                  
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

export default GetUsersVideo;