import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData  } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const CommentLike = createAsyncThunk('userSlice/createData', async ({id,like, user}) => {
    console.log(id)
    console.log(like)
    console.log(user)
const response = await createData  ({ endpoint: `/comments/${like}Comment`,data:{userID:user,commentId:id}  });
  return response; // return the data from the API
});


const LikeDislikeComment = createSlice({
  name: 'LikeDislikeComment',
  initialState: {
    likeDislikeComment: null,
    likeDislikeCommentStatus: 'idle', 
    likeDislikeCommentError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CommentLike.pending, (state) => {
        state.likeDislikeCommentStatus = 'loading'; // Update likeDislikeCommentStatus to loadingx
      })
      .addCase(CommentLike.fulfilled, (state, action) => {
        state.likeDislikeCommentStatus = 'succeeded'; // Update likeDislikeCommentStatus to succeeded
        state.likeDislikeComment = action.payload; // Assuming userId is returned from the API
      })
      .addCase(CommentLike.rejected, (state, action) => {
        state.likeDislikeCommentStatus = 'failed'; // Update likeDislikeCommentStatus to failed
        state.likeDislikeCommentError = action.error.message;
        state.likeDislikeCommentError = action.error; 
      });
  },
});

export default LikeDislikeComment.reducer;