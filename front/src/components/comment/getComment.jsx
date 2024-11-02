import React, { useEffect, useState } from "react";
import { getComment } from "../../redux/slices/userSlice/getComment";
import {CreateReplyComment} from "../../redux/slices/userSlice/replyComment";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
export default function GetComment() {
  const [commentId, setCommentId] = useState("");
  const [replyContent, setreplyContent] = useState("");
  const { comment, commentsStatus, commentsError } = useSelector(
    (state) => state.getCommentSlice
  );
  const { replyComment, replyCommentsStatus, replyCommentsError } = useSelector(
    (state) => state.replyComment
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComment("67222116f3f0a829e2d5903c"));
  }, []);


  console.log(replyComment);
  console.log(replyCommentsStatus);
  console.log(replyCommentsError);
  const handleReply = (id) => {
    console.log("hi");
    setCommentId(id);
    console.log(id);
  };
  const handlechange = (e) => {
    setreplyContent(e.target.value);
  };
  const handleReplySubmit=()=>{
    dispatch(CreateReplyComment({ userId:"671e2fe426a11e76f79ba2e6",  commentId:commentId, content:replyContent }));
  }
  return (
    <div>
      {comment?.comments?.map((element) => (
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
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <ThumbUpIcon fontSize="small" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500">
              <ThumbDownIcon fontSize="small" />
              <span className="text-sm">Dislike</span>
            </button>
            <button
              onClick={() => handleReply(element._id)}
              className="flex items-center space-x-1 hover:text-red-500"
            >
              reply
            </button>

            {commentId && <div><input placeholder="reply" onChange={handlechange} /><button onClick={handleReplySubmit}>Add</button></div>}
          </div>
        </div>
      ))}
    </div>
  );
}
