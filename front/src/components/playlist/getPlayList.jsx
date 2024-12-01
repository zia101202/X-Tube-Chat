import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { RiMore2Fill } from "react-icons/ri"; // Import the "three dots" icon from react-icons
import { useNavigate } from "react-router-dom";
function GetplayList() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(null); // Track which menu is open

  // Redux states
  const { getPlaylistdata, getPlayliststatus } = useSelector(
    (state) => state.getPlaylist
  );
  const { userID } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  // Fetch playlists when userID changes
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

  // Loading state
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
  console.log(getPlaylistdata?.playlist[0].videos[0].secure_url);

  const handleMenuToggle = (playlistId) => {
    setShowMenu(showMenu === playlistId ? null : playlistId); // Toggle menu visibility
  };
  const handleplaylistClick = (id) => {
    navigate(`/play/${id}`);
  };
  console.log(getPlaylistdata);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Playlists
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getPlaylistdata && getPlaylistdata?.playlist.length > 0 ? (
          getPlaylistdata?.playlist.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative"
            >
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {playlist.title}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                Videos:{" "}
                {playlist.videos?.map((video) => (
                  <>
                    {" "}
                    <video
                      className="py-[4px]"
                      onClick={() => handleplaylistClick(video._id)}
                      src={video.secure_url}
                    />
                    <p>{video.title}</p>
                    <p>{new Date(video.uploadDate).toLocaleDateString()}</p>
               
                  </>
                ))}
              </p>

              {/* Three dots menu button */}
              <button
                onClick={() => handleMenuToggle(playlist._id)}
                className="absolute top-2 right-2 text-gray-600"
              >
                <RiMore2Fill size={20} />
              </button>

              {/* Menu options */}
              {showMenu === playlist._id && (
                <div className="absolute top-8 right-2 bg-white shadow-md rounded-lg border border-gray-200 w-40">
                  <ul>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                      Edit Playlist
                    </li>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                      Delete Playlist
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No playlists available.
          </p>
        )}
      </div>
    </div>
  );
}

export default GetplayList;
