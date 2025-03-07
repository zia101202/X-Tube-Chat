import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetAllVideos } from "../../redux/slices/userSlice/getAllvideos";
import VideoPlayerPrivate from "../videoCard/videoCard";
import { LikeVideo } from "../../redux/slices/userSlice/likeDislike";
import CommentSection from "../comment/comment";
import { FaHeart, FaRegHeart,FaShareAlt, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { MoreVertical } from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ShowplayListWithvideo from "../playlist/showPlaylistWithVideo";
import { formatDistanceToNow } from "date-fns";
import GetUsersVideo from "../getUsersVideo/getUsersVideo";
import ColumnVideos from "../getUsersVideo/columnVideos";
const Play = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState(false);
  const [filtervideo, setfiltervideo] = useState(null);
  const dispatch = useDispatch();
  const { data, status: videoStatus } = useSelector(
    (state) => state.GetAllVideosSlice
  );
 const [dots,setDots]=useState(false)
  const { likeDislikeData, likeDislikeDataStatus, likeDislikeDataError } =
    useSelector((state) => state.LikeVideo);
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  let userID;
  
  const value = JSON.parse(localStorage.getItem("user"));
  userID=value.userId
const darkmode=darkModel
  const location = useLocation();
  const video = location.state?.video;

  const { id } = useParams();

  useEffect(() => {
    if (data) {
      setfiltervideo(data.filter((element) => element._id === id));
    }
  }, [data, video, videoStatus]);

  const toggleDescription = () => {
    setExpandedDescriptions(!expandedDescriptions);
  };

  const handleLike = () => {
    dispatch(
      LikeVideo({
        videoid: video._id,
        like: "like",
        userId: userID,
      })
    );
  };

  const handleDislike = () => {
    console.log(video._id);
    console.log(userID);
    dispatch(
      LikeVideo({ videoid: video._id, like: "dislike", userId: userID })
    );
  };

  useEffect(() => {
    if (likeDislikeDataStatus == "succeeded") {
      dispatch(GetAllVideos("video/GetAllVideos"));
    }
  }, [likeDislikeDataStatus]);

  if (!filtervideo) {
    return <p>No video data available</p>;
  }
  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // Custom file name
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Download failed:", error);
    }
  };


    const handleShare = (videoUrl, title) => {
      if (navigator.share) {
        navigator
          .share({
            title: title,
            url: videoUrl
          })
          .then(() => console.log("Shared successfully!"))
          .catch((error) => console.log("Error sharing:", error));
      } else {
        alert("Web Share API not supported in this browser. Copy the link manually.");
      }
    };
    const handleDots=()=>{
      setDots(!dots)
    }
  return (
    <>
    <div
      className={`  ${
        darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div >
            <VideoPlayerPrivate
              publicId={filtervideo[0]?.secure_url}
              video={filtervideo[0]?.type}
            />
          </div>

      <motion.div
        className={`container mx-auto  ${
          darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       
       

        {status === "loading" && (
          <p className="text-center text-xl animate-pulse">
            {darkmode ? "🌙 Loading..." : "☀️ Loading..."}
          </p>
        )}

        {status === "failed" && (
          <p className="text-center text-xl text-red-500">
            Error: {error?.message || error}
          </p>
        )}
<div style={{ display: window.innerWidth > 700 ? "flex relative" : "relative block" }}>
<div className="flex-[70%]">
        {/* Video Card */}
        <motion.div
          className={`    rounded-lg  overflow-hidden transform transition duration-300 hover:scale-105
        ${darkmode ? " border-gray-700" : "bg-white border-gray-300"}
      `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          

          <div className="pl-4 pr-6 py-6 ">
            <div
              className={` ${
                darkmode ? "text-gray-100" : "text-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-bold text-[18px]"> {filtervideo[0]?.title}</p>
  <div className="  flex items-center  w-full">
  {/* 1️⃣ First Div (Profile Image) */}
  <div>
    <img
      src={filtervideo[0]?.uploadedBy?.picture}
      alt={filtervideo[0]?.uploadedBy?.nickname}
      className="w-12 h-12 rounded-full border-2 shadow-md"
    />
  </div>

  {/* 2️⃣ Second Div (Title) */}
  <div className="flex-1  ml-4"> 
   
    {filtervideo[0]?.uploadedBy?.name}
  </div> 

  {/* 3️⃣ Third Div (Buttons & Playlist) - Forced to Right */}
  <div className="flex  items-center space-x-4 ">
    {/* Download Button */}

    <motion.div
              className="space-x-2 flex items-center justify-between text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Like Button */}
              <motion.div
                className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full shadow-md transition-all
              ${
                darkmode
                  ? "bg-gray-700 hover:bg-red-700"
                  : "bg-white hover:bg-red-100"
              }
            `}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.5 }}
                >
                  {filtervideo[0]?.likes?.length > 0 ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart
                      className={`text-xl ${
                        darkmode ? "text-gray-300" : "text-gray-500"
                      }`}
                    />
                  )}
                </motion.div>
                <span className="font-bold">
                  {filtervideo[0]?.likes?.length}
                </span>
              </motion.div>

              {/* Dislike Button */}
              <motion.div
                className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full shadow-md transition-all
              ${
                darkmode
                  ? "bg-gray-700 hover:bg-blue-700"
                  : "bg-white hover:bg-blue-100"
              }
            `}
                whileTap={{ scale: 0.9 }}
                onClick={handleDislike}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.5 }}
                >
                  {filtervideo[0]?.dislikes?.length > 0 ? (
                    <FaThumbsDown className="text-blue-500 text-xl" />
                  ) : (
                    <FaRegThumbsDown
                      className={`text-xl ${
                        darkmode ? "text-gray-300" : "text-gray-500"
                      }`}
                    />
                  )}
                </motion.div>
                <span className="font-bold">
                  {filtervideo[0]?.dislikes?.length}
                </span>
              </motion.div>

              
            </motion.div>
    <div
      className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full shadow-md transition-all
        ${
          darkmode
            ? "bg-gray-700 hover:bg-red-700"
            : "bg-white hover:bg-red-100"
        }
      `}
    
      onClick={() => handleDownload(filtervideo[0]?.secure_url, "media")}
    >
      <FiDownload size={20} /> <p className="ml-[10px]">download </p>
    </div>

    {/* Share Button */}
    <button
      className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full shadow-md transition-all
        ${
          darkmode
            ? "bg-gray-700 hover:bg-red-700"
            : "bg-white hover:bg-red-100"
        }
      `}
   
      onClick={() => handleShare(filtervideo[0]?.secure_url, filtervideo[0]?.title)}
    >
      <FaShareAlt size={17} />  <p className="ml-[10px]">Share</p>
    </button>

   
   
  <div  className="cursor-pointer" onClick={handleDots}><MoreVertical/></div>


  </div>
  {
    dots &&
    <div className="absolute top-[6.5%] right-[33.8%] z-[9999] !important">
    <ShowplayListWithvideo />
    
    </div>
  }
 

</div>
              </div> 
            <p
              className={`mt-4 ${darkmode ? "text-gray-300" : "text-gray-700"}`}
            >
              {expandedDescriptions
                ? filtervideo[0]?.description
                : `${filtervideo[0]?.description?.substring(0, 100)}...`}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDescription();
                }}
                className="text-blue-500 ml-2 hover:underline transition-all duration-300"
              >
                {expandedDescriptions ? "Show Less" : "Show More"}
              </button>
            </p>

            {/* User Profile */}
            <motion.div
              className="flex items-center mt-6 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex space-x-3">
                <p
                  className={`text-sm ${
                    darkmode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {filtervideo[0]?.uploadDate
                    ? formatDistanceToNow(
                        new Date(filtervideo[0]?.uploadDate),
                        { addSuffix: true }
                      )
                    : "Unknown date"}
                </p>
                <span> Views: {filtervideo[0]?.views} 👀</span>
              </div>
            </motion.div>

            {/* Like, Dislike, and Views */}
            
          </div>
        </motion.div>

      

        
           <CommentSection /></div>
         
          <div  className="flex-[30%]">    <ColumnVideos /></div>
      
          </div>
          
      </motion.div>
      
    </div>
  
    </>
  );
};

export default Play;
