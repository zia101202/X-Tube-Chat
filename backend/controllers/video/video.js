const Video = require('../../models/videoModel/videoModel');

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('uploadedBy') // Populate the entire user object
      .exec();
      
console.log(videos)
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Function to like a video
const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userID;  // Assuming req.user contains the authenticated user's info

    // Find the video by ID
    const video = await Video.findById(id);
console.log(video)
console.log(userId)
console.log(id)
    // If the user already liked the video, remove the like
    if (video.likes.includes(userId)) {
      console.log('like')
      console.log(video.likes = video.likes.filter(id => id.toString() !== userId.toString()))
      video.likes = video.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // If the user has disliked the video, remove the dislike first
      console.log('dislike')
      console.log(video.dislikes.filter(id => id.toString() !== userId.toString()))
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId.toString());
      console.log('dislike3')
      video.likes.push(userId);
      console.log('dislike4vv')
    }

    await video.save();
    res.status(200).json({ message: 'Like status updated', video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
};

// Function to dislike a video
const dislikeVideo = async (req, res) => {
  try {
    // Assuming req.user contains the authenticated user's info
    const { id } = req.params;
    const userId = req.body.userID; 
    // Find the video by ID
    const video = await Video.findById(id);

    // If the user already disliked the video, remove the dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId.toString());
    } else {
      // If the user has liked the video, remove the like first
      video.likes = video.likes.filter(id => id.toString() !== userId.toString());
      // Add the dislike
      video.dislikes.push(userId);
    }

    await video.save();
    res.status(200).json({ message: 'Dislike status updated', video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dislike' });
  }
};




const incrementViewCount = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    video.views += 1;
    await video.save();
    res.json({ message: 'View incremented', views: video.views });
  } catch (err) {
    res.status(500).json({ error: 'Error incrementing view count' });
  }
};


const getVideoWithDetails = async (req, res) => {
  const { id } = req.params; // Get the video ID from request parameters
console.log(req.params)
  try {
    const video = await Video.findById(id).populate('comment'); // Populate comments if necessary

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllVideos,
  incrementViewCount,
  dislikeVideo,
  likeVideo,
  getVideoWithDetails,
};
