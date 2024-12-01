import React, { useEffect, useState } from "react";
import { createPlaylist } from "../../redux/slices/userSlice/createPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/getPlaylist";
import { useParams } from "react-router-dom";
function PlayList({ videoId }) {
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const { playlistVideo, playlistVideoStatus, playlistVideoError } =
    useSelector((state) => state.createPlaylistSlice);
    const id=useParams()
  const { status, userID } = useSelector((state) => state.userSlice);

  const handleClickPlayList = () => {
    console.log("jjj");
    if (status !== "loading") {
      dispatch(
        createPlaylist({
          userId: userID,
          videoId: videoId || id.id,
          title: playlistName,
        })
      );
    }
  };

  return (
    <div>
      <button className="border-blue-100" onClick={handleClickPlayList}>
        Add Playlist{" "}
      </button>
      <div>
        <input
          className="border border-blue-300"
          type="text"
          placeholder="PlayList Name"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PlayList;
