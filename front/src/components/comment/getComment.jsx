import React, { useEffect, useState } from "react";
import { getComment } from "../../redux/slices/userSlice/getComment";
import { CreateReplyComment } from "../../redux/slices/userSlice/replyComment";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";
import { CommentLike } from "../../redux/slices/userSlice/likeDislikeComment";
import { ReplyCommentLike } from "../../redux/slices/userSlice/likeDislikeReplyComment";
export default function GetComment() {
  const [commentId, setCommentId] = useState("");
  const [replyContent, setreplyContent] = useState("");
  const { comment, commentsStatus, commentsError } = useSelector(
    (state) => state.getCommentSlice
  );

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

  const { userID } = useSelector((state) => state.userSlice);
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
  
  console.log(replyCommentsStatus)
  if(likeDislikeReplyCommentStatus=='loading'){
    return <>loading....</>
  }

  console.log( likeDislikeReplyComment)
  console.log(likeDislikeReplyCommentStatus)
  console.log(likeDislikeReplyCommentError)
  return (
    <div>
      {comment?.comments?.map((element) => (
        <div>
          <div className="flex space-x-4  pb-2 pt-2 px-8">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={element.user.picture}
              alt={`${element.user.name}'s profile`}
            />

            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-700">
                {element.user.nickname}
              </div>
              <p className="text-sm text-gray-800 mt-2">{element.content}</p>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
              <button
                onClick={() =>
                  handleLikeComment({
                    id: element._id,
                    user: element.user,
                    like: "like",
                  })
                }
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <ThumbUpIcon fontSize="small" />
                <span className="text-sm">{element.likes?.length}</span>
              </button>
              <button
                onClick={() =>
                  handleLikeComment({
                    id: element._id,
                    user: userID,
                    like: "dislike",
                  })
                }
                className="flex items-center space-x-1 hover:text-red-500"
              >
                <ThumbDownIcon fontSize="small" />
                <span className="text-sm">{element.dislikes?.length}</span>
              </button>

              <button
                onClick={() => handleReply(element._id)}
                className="flex items-center space-x-1 hover:text-red-500"
              >
                reply
              </button>

              {commentId && (
                <div>
                  <input placeholder="reply" onChange={handlechange} />
                  <button onClick={handleReplySubmit}>Add</button>
                </div>
              )}
            </div>
          </div>

          {element.replies.map((reply) => (
            <>
              <div className="flex space-x-4 mt-3 px-[80px]">
                <div>
                  {" "}
                  <img
                    className="w-[30px] h-[30px] rounded-full"
                    src={reply.userId.picture}
                    alt={`${reply.userId.name}'s profile`}
                  />
                </div>

                <div>{reply.content}</div>

                <button
                  onClick={() =>
                    handleReplyLikeComment({
                      id: reply._id,
                      user: userID,
                      like: "like",
                    })
                  }
                  className="flex items-center space-x-1 hover:text-red-500"
                >
                  <ThumbUpIcon fontSize="small" />
                  <span className="text-sm">{reply.likes.length}</span>
                </button>

                <button
                  onClick={() =>
                    handleReplyLikeComment({
                      id: reply._id,
                      user: userID,
                      like: "dislike",
                    })
                  }
                  className="flex items-center space-x-1 hover:text-red-500"
                >
                  <ThumbDownIcon fontSize="small" />
                  <span className="text-sm">{reply.dislikes.length}</span>
                </button>
              </div>
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
