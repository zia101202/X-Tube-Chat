const WatchLater = require("../../models/watchLater/watchLater");
const Playlist = require("../../models/playlistModel/playlistModel");
const watchLaterController = async (req, res) => {
  console.log('watch later');
  try {
    const { videoId } = req.body;
    const userId = req.session.user_Id
    console.log(videoId);
    console.log(userId);
    const user = await WatchLater.findOne({ userId });
    if (user && user.videoId.includes(videoId)) {
      return res.status(409).json({ message: "already Exists" });
    } else if (user) {
      user.videoId.push(videoId);
      await user.save();
    } else {
      const watch = new WatchLater({ userId, videoId: [videoId] });
      await watch.save();
    }

    res.status(201).json({ message: "successful" });
  } catch (error) {
console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getWatchLaterController = async (req, res) => {


  try {
   
    const userId = req.session.user_Id
    console.log(userId);
    const watchlist = await WatchLater.findOne({ userId: userId })
      .populate("userId") 
      .populate("videoId"); 

    res.status(201).json({ message: "successful", watchlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createPlaylistController = async (req, res) => {
  console.log('play');
  try {
    const {  videoId, title } = req.body;

    const userId = req.session.user_Id
    let playlist = await Playlist.find({ title: title, user: userId });
   
    if (playlist.length===0) {
      const createPlaylist = new Playlist({
        title: title,
        user: userId,
      });

      // Save the newly created playlist and assign it to the `playlist` variable
      playlist = await createPlaylist.save();
      return res.status(201).json({ message: "Playlist created", playlist });
    }

    if (playlist[0]?.videos?.includes(videoId)) {
      return res
        .status(409)
        .json({ message: "Video already exists in playlist" });
    }
    playlist[0].videos.push(videoId);

    playlist = await playlist[0].save();
    return res
      .status(201)
      .json({ message: "Added to playlist successfully", playlist });
  } catch (error) {
    console.log(error);
  }
};

const getPlaylistController = async (req, res) => {
  console.log('playlistget');
  try {
   
    const userId = req.session.user_Id
    console.log(userId);
  const playlist = await Playlist.find({ user: userId })
      .populate({path:'videos'}) 
console.log(playlist);
    res.status(201).json({ message: "successful", playlist });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error });
    
  }
};
module.exports = {
  watchLaterController,
  getWatchLaterController,
  getPlaylistController,
  createPlaylistController,
};
