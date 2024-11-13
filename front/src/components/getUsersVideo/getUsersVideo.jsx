import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllVideos } from "../../redux/slices/userSlice/getAllvideos";
import VideoPlayer from "../videoCard/videoCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const GetUsersVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for navigation
  const { data, status, error } = useSelector(
    (state) => state.GetAllVideosSlice
  );
  const [VideoId, setVideoId] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    dispatch(GetAllVideos("video/GetAllVideos"));
  }, [dispatch]);

  const toggleDescription = (videoId) => {
    setVideoId(videoId)
    setExpandedDescriptions((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };
  console.log(data);
  // Function to handle video click and navigate
  const handleVideoClick = (video) => {
   
    navigate(`/play/${video._id}`, { state: { video } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Videos</h1>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}

      {status === "succeeded" && data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((video) => {
            const isExpanded = expandedDescriptions[video._id] || false;

            return (
              <div
                key={video._id}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleVideoClick(video)} // navigate to play video
              >
                <VideoPlayer
                  publicId={video.public_id}
                  width="300px"
                  className="w-full h-48"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{video.title}</h2>
                  <p className="text-gray-600">
                    {isExpanded
                      ? video.description
                      : `${video.description.substring(0, 50)}...`}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation on button click
                        toggleDescription(video._id);
                      }}
                      className="text-blue-500 ml-1"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  </p>
                  <div className="flex items-center mt-2">
                    <img
                      src={video.uploadedBy.picture}
                      alt={video.uploadedBy.nickname}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {video.uploadedBy.nickname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(video.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="flex items-center">
                      <FavoriteIcon className="text-red-500" fontSize="small" />
                      <span className="text-sm ml-1">{video.likes.length}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbDownAltIcon
                        className="text-blue-500"
                        fontSize="small"
                      />
                      <span className="text-sm ml-1">{video.dislikes.length}</span>
                    </div>
                    <span className="text-sm">Views: {video.views}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        status === "succeeded" && (
          <p className="text-center">No videos available.</p>
        )
      )}
    </div>
  );
};

export default GetUsersVideo;
