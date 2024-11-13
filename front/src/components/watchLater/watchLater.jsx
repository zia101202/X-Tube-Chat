import React, { useEffect } from "react";
import { getWatchLaterVideos } from "../../redux/slices/userSlice/getWatchLater";
import { useDispatch, useSelector } from "react-redux";
export default function WatchLater() {
  const { WatchLatervalue, WatchLaterdata, WatchLaterstatus, WatchLatererror } =
    useSelector((state) => state.getWatchLater);
  const { userID, status, error } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getWatchLaterVideos({
        endpoint: "personal/getWatchLater",
        params: { userId: userID },
      })
    );
  }, []);

  console.log(WatchLaterdata);

  return <div>Watch Later videos</div>;
}
