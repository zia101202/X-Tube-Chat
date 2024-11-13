// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice  from '../slices/userSlice/userSlice'
import GetUserSlice from '../slices/userSlice/getUserSlice'
import GetAllVideosSlice from '../slices/userSlice/getAllvideos/'
import LikeVideo  from '../slices/userSlice/likeDislike'
import commentSlice  from '../slices/userSlice/comment'
import getCommentSlice  from '../slices/userSlice/getComment'
import replyComment  from '../slices/userSlice/replyComment'
import  selecedVideoSlice  from '../slices/userSlice/selectedVideo'
import     LikeDislikeComment from '../slices/userSlice/likeDislikeComment'
import LikeDislikeReplyComment from '../slices/userSlice/likeDislikeReplyComment'
import watchLaterVideo from '../slices/userSlice/watchLater'
import getWatchLater from '../slices/userSlice/getWatchLater'
import  createPlaylistSlice from '../slices/userSlice/getWatchLater'
import  getPlaylist from '../slices/userSlice/getWatchLater'
 
const store = configureStore({
  reducer: {
    userSlice: userSlice,
    GetUserSlice:GetUserSlice,
    GetAllVideosSlice:GetAllVideosSlice,
    LikeVideo:LikeVideo,
    commentSlice:commentSlice,
    getCommentSlice,
    replyComment,
    selecedVideoSlice,
    LikeDislikeComment,
    LikeDislikeReplyComment,
    watchLaterVideo,
    getWatchLater,
    createPlaylistSlice,
    getPlaylist
  },
});

export default store;

