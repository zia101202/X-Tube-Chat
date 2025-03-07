import React, { useEffect, useState } from "react";
import { getComment } from "../../redux/slices/userSlice/getComment";
import { CreateReplyComment } from "../../redux/slices/userSlice/replyComment";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";
import { CommentLike } from "../../redux/slices/userSlice/likeDislikeComment";
import { ReplyCommentLike } from "../../redux/slices/userSlice/likeDislikeReplyComment";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
export default function GetComment() {
  const [commentId, setCommentId] = useState("");
  const [replyContent, setreplyContent] = useState("");
  const { comment, commentsStatus, commentsError } = useSelector(
    (state) => state.getCommentSlice
  );
  const { darkModel } = useSelector((state) => state.darkModelSlice);
  const darkMode=darkModel
  const {
    likeDislikeComment,
    likeDislikeCommentStatus,
    likeDislikeCommentError,
  } = useSelector((state) => state.LikeDislikeComment);
  const {
    likeDislikeReplyComment,
    likeDislikeReplyCommentStatus,
    likeDislikeReplyCommentError,
  } = useSelector((state) => state.LikeDislikeReplyComment);

  const { id } = useParams();

  let userID;
  const value = JSON.parse(localStorage.getItem("user"));
userID=value.userId
  const { replyComment, replyCommentsStatus, replyCommentsError } = useSelector(
    (state) => state.replyComment
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComment(id));
  }, [likeDislikeCommentStatus,likeDislikeReplyCommentStatus]);

  const handleReply = (id) => {
    setCommentId(id);
  };
  const handlechange = (e) => {
    setreplyContent(e.target.value);
  };
  const handleReplySubmit = () => {
    dispatch(
      CreateReplyComment({
        userId: userID,
        commentId: commentId,
        content: replyContent,
      })
    );
  };

  const handleLikeComment = ({ id, user, like }) => {
    dispatch(CommentLike({ id, user, like }));
  };

  const handleReplyLikeComment = ({ id, user, like }) => {
    dispatch(ReplyCommentLike({ id, user, like }));
   
  };
  
  
  if(likeDislikeReplyCommentStatus=='loading'){
    return <>loading....</>
  }
  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
    {comment?.comments?.map((element) => (
      <motion.div
        key={element._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-4 pb-4 pt-4 px-8  border-gray-300 dark:border-gray-700">
          <img
            className="w-10 h-10 rounded-full"
            src={element.user.picture || "/profile.jpg"}
            alt={`${element.user.name}'s profile`}
          />
          <div className="flex-1">
            <div className="text-sm font-semibold">{element.user.nickname}</div>
            <p className="text-sm mt-2">{element.content}</p>
            <div className="flex items-center space-x-4 mt-2 text-gray-500 dark:text-gray-400">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLikeComment({ id: element._id, user: element.user, like: "like" })}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <ThumbsUp size={16} />
                <span className="text-sm">{element.likes?.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLikeComment({ id: element._id, user: userID, like: "dislike" })}
                className="flex items-center space-x-1 hover:text-red-500"
              >
                <ThumbsDown size={16} />
                <span className="text-sm">{element.dislikes?.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleReply(element._id)}
                className="flex items-center space-x-1 hover:text-green-500"
              >
                <MessageCircle size={16} />
                <span className="text-sm">Reply</span>
              </motion.button>
            </div>
            {commentId && (
              <div className="mt-2 flex items-center space-x-2">
              <input
                className="w-full border-b focus:outline-none focus:border-blue-500 bg-transparent dark:text-white dark:border-gray-600 border-gray-300"
                placeholder="Write a reply..."
                onChange={handlechange}
              />
              <button
                className="px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReplySubmit}
                disabled={!replyContent?.trim()}
              >
                Reply
              </button>
            </div>
            
            )}
          </div>
        </div>
        {element.replies.map((reply) => (
          <motion.div
            key={reply._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex space-x-4 mt-3 px-16 border-l-2 border-gray-300 dark:border-gray-700 pl-4"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={reply.userId.picture || "/profile.jpg"}
              alt={`${reply.userId.name}'s profile`}
            />
            <div className="flex-1">
              <div className="text-sm">{reply.content}</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReplyLikeComment({ id: reply._id, user: userID, like: "like" })}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <ThumbsUp size={16} />
              <span className="text-sm">{reply.likes.length}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReplyLikeComment({ id: reply._id, user: userID, like: "dislike" })}
              className="flex items-center space-x-1 hover:text-red-500"
            >
              <ThumbsDown size={16} />
              <span className="text-sm">{reply.dislikes.length}</span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    ))}
  </div>
  );
}
