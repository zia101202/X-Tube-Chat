const {Comment,ReplyComment} = require('../../models/commentsModel/commentsModel'); // Adjust the path as necessary

const createComment = async (req, res) => {
  const { userID, videoId, content,likes,dislikes } = req.body; // Expecting these values in the request body

  try {
    const comment = new Comment({
      user: userID,
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


const likeComment = async (req, res) => {
  try {
   
    const {userID ,commentId} = req.body;  
    const OneComment = await Comment.findById(commentId);
    if (OneComment.likes.includes(userID)) {
       OneComment.likes = OneComment.likes.filter(id => id.toString() !== userID.toString());
    } else {
      OneComment.dislikes = OneComment.dislikes.filter(id => id.toString() !== userID.toString());
      OneComment.likes.push(userID);
    }
    await OneComment.save();
    res.status(200).json({ message: 'Like status updated', OneComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
};

// Function to dislike a video
const dislikeComment = async (req, res) => {
  try {
  
    const {userID ,commentId} = req.body;   
 
    const OneComment = await Comment.findById(commentId);


    if (OneComment.dislikes.includes(userID)) {
      OneComment.dislikes = OneComment.dislikes.filter(id => id.toString() !== userID.toString());
    } else {
      OneComment.likes = OneComment.likes.filter(id => id.toString() !== userID.toString());
      OneComment.dislikes.push(userID);
      
    }
    await OneComment.save();
   
    res.status(200).json({ message: 'Dislike status updated', OneComment  });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dislike' });
  }
};



const replyComment = async (req, res) => {
  const { userID,  commentId, content,likes,dislikes } = req.body; // Expecting these values in the request body

  try{
    
    const Reply = new ReplyComment({ userID,  commentId, content,likes,dislikes });
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

const likeReplyComment = async (req, res) => {
  try {
   
    const {userID ,commentId} = req.body; 
  
    console.log(userID) 
    console.log(commentId)
    const OneComment = await ReplyComment.findById(commentId);
    if (OneComment.likes.includes(userID)) {
       OneComment.likes = OneComment.likes.filter(id => id.toString() !== userID.toString());
    } else {
      OneComment.dislikes = OneComment.dislikes.filter(id => id.toString() !== userID.toString());
      OneComment.likes.push(userID);
    }
    await OneComment.save();
    res.status(200).json({ message: 'Like status updated', OneComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
};

// Function to dislike a video
const dislikeReplyComment = async (req, res) => {
  try {
  
    const {userID ,commentId} = req.body;   
 
    const OneComment = await ReplyComment.findById(commentId);
    console.log(OneComment)

    if (OneComment.dislikes.includes(userID)) {
      OneComment.dislikes = OneComment.dislikes.filter(id => id.toString() !== userID.toString());
    } else {
      OneComment.likes = OneComment.likes.filter(id => id.toString() !== userID.toString());
      OneComment.dislikes.push(userID);
     }
    await OneComment.save();
    res.status(200).json({ message: 'Dislike status updated', OneComment  });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dislike' });
  }
};





// Get all comments for a specific video
const getCommentsByVideo = async (req, res) => {
  const { videoId } = req.params; // Video ID from the request parameters

  try {
    const comments = await Comment.find({ video: videoId }).populate({path:'replies', populate:{path:'userID'}});
  
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


module.exports = {createComment, getCommentsByVideo , updateComment, deleteComment ,replyComment,likeComment,dislikeComment,dislikeReplyComment,likeReplyComment};
