const Video = require("../../models/videoModel/videoModel");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploadedBy") // Populate the entire user object
      .exec();

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to like a video
const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userID;

    if (id == null || userId == null) {
      return res.status(400).json({ message: " user or video ID not define" });
    }
    // Find the video by ID
    const video = await Video.findById(id);

    // If the user already liked the video, remove the like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // If the user has disliked the video, remove the dislike first

      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );

      video.likes.push(userId);
    }

    await video.save();
    res.status(200).json({ message: "Like status updated", video });
  } catch (error) {
    res.status(500).json({ error: "Failed to update like" });
  }
};

// Function to dislike a video
const dislikeVideo = async (req, res) => {
  try {
    // Assuming req.user contains the authenticated user's info
    const { id } = req.params;
    const userId = req.body.userID;
    // Find the video by ID
    if (id == null || userId == null) {
      return res.status(400).json({ message: " user or video ID not define" });
    }
    const video = await Video.findById(id);

    // If the user already disliked the video, remove the dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // If the user has liked the video, remove the like first
      video.likes = video.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      // Add the dislike
      video.dislikes.push(userId);
    }

    await video.save();
    res.status(200).json({ message: "Dislike status updated", video });
  } catch (error) {
    res.status(500).json({ error: "Failed to update dislike" });
  }
};

const incrementViewCount = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    video.views += 1;
    await video.save();
    res.json({ message: "View incremented", views: video.views });
  } catch (err) {
    res.status(500).json({ error: "Error incrementing view count" });
  }
};

const getVideoWithDetails = async (req, res) => {
  const { id } = req.params; // Get the video ID from request parameters

  try {
    const video = await Video.findById(id).populate("comment"); // Populate comments if necessary

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const addView=async(req,res)=>{
   const  {videoId}=req.body
try{
  const video= await Video.findOne({ public_id :videoId})
  if(video==null){
   return res.status(400).json({message:"video not found"})
  }
  video.views+=1
  await video.save()
  res.status(200).json({message:"view added"})
}catch(err){

  res.status(500).json({error:err})
}


}

module.exports = {
  getAllVideos,
  incrementViewCount,
  dislikeVideo,
  likeVideo,
  getVideoWithDetails,
  addView
};
