const {Comment,ReplyComment} = require('../../models/commentsModel/commentsModel'); // Adjust the path as necessary

const createComment = async (req, res) => {
  const { userId, videoId, content,likes,dislikes } = req.body; // Expecting these values in the request body

  console.log(userId)
  console.log(videoId)
  console.log(content)
  try {
    const comment = new Comment({
      user: userId,
      video: videoId,
      content,
      likes,
      dislikes
    });

    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const replyComment = async (req, res) => {
  const { userId,  commentId, content,likes,dislikes } = req.body; // Expecting these values in the request body

  try{
    
    const Reply = new ReplyComment({ userId,  commentId, content,likes,dislikes });
    await Reply.save();
  
  const comment = await Comment.findById(commentId);
  comment.replies.push(Reply._id);
  await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.log('hi')
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all comments for a specific video
const getCommentsByVideo = async (req, res) => {
  const { videoId } = req.params; // Video ID from the request parameters
console.log(videoId)
  try {
    const comments = await Comment.find({ video: videoId }).populate('replies'); 
  console.log(comments)
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { commentId } = req.params; // Comment ID from the request parameters
  const { content } = req.body; // New content from the request body

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true } // Return the updated document
    );

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params; // Comment ID from the request parameters

  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {createComment, getCommentsByVideo , updateComment, deleteComment ,replyComment};
