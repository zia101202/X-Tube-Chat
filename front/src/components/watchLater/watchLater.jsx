import React, { useEffect } from "react";
import { getWatchLaterVideos } from "../../redux/slices/userSlice/getWatchLater";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WatchLater() {
  const navigate = useNavigate();
  const { WatchLaterdata } = useSelector((state) => state.getWatchLater);
  const { userID } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // Fetch watch later videos when userID changes
  useEffect(() => {
    if (userID) {
      dispatch(
        getWatchLaterVideos({
          endpoint: "personal/getWatchLater",
          params: { userId: userID },
        })
      );
    }
  }, [userID, dispatch]);

  // Navigate to the video player
  const handlevideo = (id) => {
    navigate(`/play/${id}`);
  };

  console.log(WatchLaterdata)
  const videoList = WatchLaterdata?.watchlist?.videoId || [];
console.log(WatchLaterdata)
console.log(videoList)
  return (
    <>
      {videoList!=null ?(
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Watch Later Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoList.map((video) => (
              <div key={video._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                <video
                  className="w-full h-auto cursor-pointer"
                  src={video.secure_url}
                  controls
                  onClick={() => handlevideo(video._id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No videos in your watch later list.</p>
        </div>
      )}
    </>
  );
}
