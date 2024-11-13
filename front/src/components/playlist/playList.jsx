import React, { useEffect } from "react";
import { createPlaylist } from "../../redux/slices/userSlice/createPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistVideos } from "../../redux/slices/userSlice/createPlaylist";

function PlayList() {
  const { playlistVideo, playlistVideoStatus, playlistVideoError } =
    useSelector((state) => state.createPlaylistSlice);
  const { Playlistdata, Playliststatus, Playlisterror } = useSelector(
    (state) => state.getPlaylist
  );
  const { error, status, userID } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only dispatch if createPlaylist is not already in progress
    if (status !== "loading") {
      dispatch(
        createPlaylist({
          userId: "671e26fe26a11e76f79ba2b3",
          videoId: "672ba13e6f0708ed041149fb",
          title: "cartoon",
        })
      );
    }
  }, [dispatch, status]); // status dependency to avoid repeated calls

  useEffect(() => {
    if (userID) { // Ensure userID is available before dispatching
      dispatch(
        getPlaylistVideos({
          endpoint: "personal/getPlaylist",
          params: { userId: userID },
        })
      );
    }
  }, [dispatch, userID]); // Include userID to re-fetch when it changes

  console.log(playlistVideo);
  console.log(playlistVideoStatus);
  console.log(playlistVideoError);

  console.log(Playlistdata);
  console.log(Playliststatus);
  console.log(Playlisterror);

  return <div>playlist</div>;
}

export default PlayList;
