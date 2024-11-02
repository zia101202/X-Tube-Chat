const express = require('express');
const router = express.Router();
const {createComment,getCommentsByVideo,updateComment,deleteComment,replyComment} = require('../../controllers/comments/comments'); // Adjust the path as necessary

router.post('/create', createComment);
router.post('/replyComment', replyComment); // Create a new comment
router.get('/get/:videoId', getCommentsByVideo); // Get comments by video ID
router.put('/update/:commentId', updateComment); // Update a comment
router.delete('/deleteComment/:commentId', deleteComment); // Delete a comment

module.exports = router;
