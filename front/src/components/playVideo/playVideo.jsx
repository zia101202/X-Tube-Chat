import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetAllVideos } from "../../redux/slices/userSlice/getAllvideos";
import VideoPlayer from "../videoCard/videoCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { LikeVideo } from "../../redux/slices/userSlice/likeDislike";
import CommentSection from "../comment/comment";
import { watchLater } from "../../redux/slices/userSlice/watchLater";
import { useParams } from "react-router-dom";
const Play = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState(false);
  const [filtervideo, setfiltervideo] = useState();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.GetAllVideosSlice);
  const { userID, status, error } = useSelector((state) => state.userSlice);
  const { likeDislikeData, likeDislikeDataStatus, likeDislikeDataError } =
    useSelector((state) => state.LikeVideo);
  const { watchLaterVideo, watchLaterVideoStatus, watchLaterVideoError } =
    useSelector((state) => state.watchLaterVideo);
  
  const location = useLocation();
  const video = location.state?.video;

  const { id } = useParams();
  useEffect(() => {
    setfiltervideo(data?.filter((element) => element._id === video?._id));
  }, [data, video]);

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

  const handleWatchLater = () => {
    console.log("hihih");
    dispatch(watchLater({ userId: userID, videoId: id }));
  };

  console.log(watchLaterVideo);
  console.log(watchLaterVideoStatus);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Videos</h1>
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "failed" && (
          <p className="text-center text-red-500">
            Error: {error?.message || error}
          </p>
        )}

        <VideoPlayer
          publicId={filtervideo[0]?.public_id}
          width="300px"
          className="w-full h-48"
        />
        <div className="p-4">
          <h2 className="font-semibold text-lg">{filtervideo[0]?.title}</h2>
          <p className="text-gray-600">
            {expandedDescriptions
              ? filtervideo[0]?.description
              : `${filtervideo[0]?.description.substring(0, 50)}...`}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDescription();
              }}
              className="text-blue-500 ml-1"
            >
              {expandedDescriptions ? "Show Less" : "Show More"}
            </button>
          </p>
          <div className="flex items-center mt-2">
            <img
              src={filtervideo[0]?.uploadedBy.picture}
              alt={filtervideo[0]?.uploadedBy.nickname}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium">
                {filtervideo[0]?.uploadedBy.nickname}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(filtervideo[0]?.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex items-center">
              <FavoriteIcon
                onClick={handleLike}
                className="text-red-500"
                fontSize="small"
              />
              <span className="text-sm ml-1">
                {filtervideo[0]?.likes.length}
              </span>
            </div>
            <div className="flex items-center">
              <ThumbDownAltIcon
                onClick={handleDislike}
                className="text-blue-500"
                fontSize="small"
              />
              <span className="text-sm ml-1">
                {filtervideo[0]?.dislikes.length}
              </span>
            </div>
            <span className="text-sm">Views: {filtervideo[0]?.views}</span>
          </div>
        </div>
      </div>
      <div>{status}</div>
      <div onClick={() => handleWatchLater()}>watchLater</div>
      <CommentSection />
    </>
  );
};

export default Play;
