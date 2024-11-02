import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllVideos } from "../../redux/slices/userSlice/getAllvideos";
import VideoPlayer from "../videoCard/videoCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useLocation } from "react-router-dom";
import { LikeVideo } from "../../redux/slices/userSlice/likeDislike";
import CommentSection from "../comment/comment"

const Play = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state) => state.GetAllVideosSlice
  );
  const { userID} = useSelector(
    (state) => state.userSlice
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState(false);
  useEffect(() => {
    dispatch(GetAllVideos("video/GetAllVideos"));
  }, [dispatch]);
  const toggleDescription = (videoId) => {
    setExpandedDescriptions(!expandedDescriptions);
  };
  const location = useLocation();
  const video = location.state?.video; 
console.log(video)
  if (!video) {
    return <p>No video data available</p>;
  }
  const userId= userID
  const videoid= video._id
 
  const dislike='dislike'
  const like=dislike
  const handleLike = async () => {
    const like='like'
    dispatch(LikeVideo({videoid,like,userId}))
  };

// {video._id}/like`,{userID:userID}x
const handledisLike=()=>{
  dispatch(LikeVideo({videoid,like,userId}))
}
  
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Videos</h1>
      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      <VideoPlayer
        publicId={video.public_id}
        width="300px"
        className="w-full h-48"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{video.title}</h2>
        <p className="text-gray-600">
          {expandedDescriptions
            ? video.description
            : `${video.description.substring(0, 50)}...`}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on button click
              toggleDescription(video._id);
            }}
            className="text-blue-500 ml-1"
          >
            {expandedDescriptions ? "Show Less" : "Show More"}
          </button>
        </p>
        <div className="flex items-center mt-2">
          <img
            src={video.uploadedBy.picture}
            alt={video.uploadedBy.nickname}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-medium">{video.uploadedBy.nickname}</p>
            <p className="text-xs text-gray-500">
              {new Date(video.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex items-center">
            <FavoriteIcon onClick={handleLike} className="text-red-500" fontSize="small" />
            <span className="text-sm ml-1">{video.likes.length}</span>
          </div>
          <div className="flex items-center">
            <ThumbDownAltIcon onClick={handledisLike} className="text-blue-500" fontSize="small" />
            <span className="text-sm ml-1">{video.dislikes.length}</span>
          </div>
          <span className="text-sm">Views: {video.views}</span>
        </div>
      </div>
    </div>
    <CommentSection/>
    </>
    
  );
};

export default Play;
