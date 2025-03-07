import React, { useState } from "react";
import { createComment } from "../../redux/slices/userSlice/comment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import GetComment from "./getComment";
import { motion } from "framer-motion";
import {MessageCircle, Send} from "lucide-react"

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { commentsError, commentsStatus, comment } = useSelector(
    (state) => state.commentSlice
  );
    const { darkModel } = useSelector((state) => state.darkModelSlice);
     const darkMode=darkModel
  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId
  const location = useLocation();
  const video = location.state?.video;
 
  const handleAddComment = () => {
    
    dispatch(
      createComment({ userId: userID, videoId: video._id, content: newComment })
    );
  };

  console.log(commentsStatus);
  console.log(commentsError);
  console.log(comment);
  const handleLikeComment = (index) => {};

  const handleReply = (index, replyText) => {};

  return (
    <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`w-full   mt-8 px-6  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}
  >
    {/* Comment Input */}
    <div className="flex items-center space-x-4 mb-4">
    <input
  type="text"
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  className={`w-full p-2 border-b focus:outline-none focus:border-blue-500 bg-transparent ${
    darkMode ? 'text-white border-gray-600' : 'border-gray-300'
  }`}
  placeholder="Add a comment..."
/>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleAddComment}
  className="mt-2 px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={!newComment.trim()}
>
  <Send size={16} />
  <span>Comment</span>
</motion.button>

    </div>
   
    <GetComment darkMode={darkMode} />
    {commentsStatus === 'loading' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Loading comments...</motion.p>}
    {commentsStatus === 'succeeded' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Comment added</motion.p>}
  </motion.div>
  );
};



export default CommentSection;
