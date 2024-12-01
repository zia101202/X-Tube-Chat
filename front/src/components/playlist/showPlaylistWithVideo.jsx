import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { createPlaylist } from "../../redux/slices/userSlice/createPlaylist";
import { useParams } from "react-router-dom";
import { watchLater } from "../../redux/slices/userSlice/watchLater";
import PlayList from "./playList";
function ShowplayListWithvideo() {
  const dispatch = useDispatch();
  const id=useParams()
  // Redux states
  const { getPlaylistdata, getPlayliststatus } = useSelector(
    (state) => state.getPlaylist
  );
  const { playlistVideo, playlistVideoStatus, playlistVideoError } =
    useSelector((state) => state.createPlaylistSlice);
  const { userID } = useSelector((state) => state.userSlice);
  const [showPlaylistList, setShowPlaylistList] = useState(false);

  const handleClickPlayList = (playlistName) => {
 console.log(playlistName)
 console.log(userID)
 console.log(id.id)
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

console.log(playlistVideo)
console.log(playlistVideoStatus)
console.log(playlistVideoError)
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
  const togglePlaylistList = () => {
    setShowPlaylistList((prev) => !prev);
  };

  const handleWatchLater = () => {
    console.log(userID)
    console.log(id.id)
    dispatch(watchLater({ userId: userID, videoId: id.id }));
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Playlists
      </h1>
      
      {/* Three Dots Button to toggle the playlist list */}
      <div className="flex justify-end mb-4">
        <button
          onClick={togglePlaylistList}
          className="text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* Show playlist list when `showPlaylistList` is true */}
      {showPlaylistList && getPlaylistdata && getPlaylistdata.playlist.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <ul>
            {getPlaylistdata.playlist.map((playlist) => (

              <li  onClick={()=>handleClickPlayList(playlist.title)} key={playlist._id} className="text-lg text-gray-800 p-2 hover:bg-gray-100 cursor-pointer">
                {playlist.title}
              </li>
            ))}
            <button className="bg-slate-500" onClick={() => handleWatchLater()}>watchLater</button>
            <PlayList/>
          </ul>
        </div>
      )}
 
      {/* If there are no playlists */}
      {getPlaylistdata && getPlaylistdata.playlist.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No playlists available.</p>
      )}
    </div>
  );
}

export default ShowplayListWithvideo;
