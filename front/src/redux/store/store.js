// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice  from '../slices/userSlice/userSlice'
import GetUserSlice from '../slices/userSlice/getUserSlice'
import GetAllVideosSlice from '../slices/userSlice/getAllvideos/'
import LikeVideo  from '../slices/userSlice/likeDislike'
import commentSlice  from '../slices/userSlice/comment'
import getCommentSlice  from '../slices/userSlice/getComment'
import replyComment  from '../slices/userSlice/replyComment'
const store = configureStore({
  reducer: {
    userSlice: userSlice,
    GetUserSlice:GetUserSlice,
    GetAllVideosSlice:GetAllVideosSlice,
    LikeVideo:LikeVideo,
    commentSlice:commentSlice,
    getCommentSlice,
    replyComment
  },
});

export default store;

