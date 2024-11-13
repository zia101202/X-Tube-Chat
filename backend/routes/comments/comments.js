const express = require('express');
const router = express.Router();
const {createComment,likeComment,dislikeReplyComment,likeReplyComment,dislikeComment,getCommentsByVideo,updateComment,deleteComment,replyComment} = require('../../controllers/comments/comments'); // Adjust the path as necessary

router.post('/create', createComment);
router.post('/replyComment', replyComment); // Create a new comment
router.get('/get/:videoId', getCommentsByVideo); // Get comments by video ID
router.put('/update/:commentId', updateComment); // Update a comment
router.delete('/deleteComment/:commentId', deleteComment); // Delete a comment
router.post('/likeComment', likeComment);
router.post('/dislikeComment', dislikeComment);
router.post('/dislikeReplyComment', dislikeReplyComment);
router.post('/likeReplyComment', likeReplyComment);
module.exports = router;
