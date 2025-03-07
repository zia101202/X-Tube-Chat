import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData  } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const ReplyCommentLike = createAsyncThunk('ReplyCommentLike/likeDislikeCommentReply', async ({id,like, user}) => {
   
const response = await createData  ({ endpoint: `/comments/${like}ReplyComment`,data:{userID:user,commentId:id}  });
  return response; // return the data from the API
});


const LikeDislikeReplyComment = createSlice({
  name: 'LikeDislikeReplyComment',
  initialState: {
    likeDislikeReplyComment: null,
    likeDislikeReplyCommentStatus: 'idle', 
    likeDislikeReplyCommentError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ReplyCommentLike.pending, (state) => {
        state.likeDislikeReplyCommentStatus = 'loading'; // Update likeDislikeReplyCommentStatus to loadingx
      })
      .addCase(ReplyCommentLike.fulfilled, (state, action) => {
        state.likeDislikeReplyCommentStatus = 'succeeded'; // Update likeDislikeReplyCommentStatus to succeeded
        state.likeDislikeReplyComment = action.payload; // Assuming userId is returned from the API
      })
      .addCase(ReplyCommentLike.rejected, (state, action) => {
        state.likeDislikeReplyCommentStatus = 'failed'; // Update likeDislikeReplyCommentStatus to failed
        state.likeDislikeReplyCommentError = action.error.message;
        state.likeDislikeReplyCommentError = action.error; 
      });
  },
});

export default LikeDislikeReplyComment.reducer;