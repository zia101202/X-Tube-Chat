import React, { useState } from "react";
import { createComment } from "../../redux/slices/userSlice/comment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import GetComment from "./getComment";

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { commentsError, commentsStatus, comment } = useSelector(
    (state) => state.commentSlice
  );
  const { error, status, userID } = useSelector((state) => state.userSlice);
  const location = useLocation();
  const video = location.state?.video;
  const handleAddComment = () => {
    console.log(userID)
    dispatch(
      createComment({ userId: userID, videoId: video._id, content: newComment })
    );
  };

  const handleLikeComment = (index) => {};

  const handleReply = (index, replyText) => {};

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      {/* Comment Input */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Add a public comment..."
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
      <ReplyBox />
      <GetComment />
    </div>
  );
};

const ReplyBox = ({ onReply }) => {
  const [reply, setReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = () => {
    if (reply.trim()) {
      onReply(reply);
      setReply("");
      setShowReplyBox(false);
    }
  };

  return (
    <div>
      {showReplyBox ? (
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full p-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Add a reply..."
          />
          <button
            onClick={handleReplySubmit}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Reply
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowReplyBox(true)}
          className="text-gray-500 text-sm hover:text-blue-500"
        >
          Reply
        </button>
      )}
    </div>
  );
};

export default CommentSection;
