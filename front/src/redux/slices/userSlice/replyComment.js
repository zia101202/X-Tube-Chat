import { createData } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Define your async thunk
export const CreateReplyComment = createAsyncThunk('/comments/replyComment', async (userData) => {
  const response = await createData({ endpoint: '/comments/replyComment', data: userData });
  return response; // return the data from the API
});

const replyComment = createSlice({
  name: 'replyComment',
  initialState: {
    replyComment: null,
    replyCommentsStatus: 'idle', 
    replyCommentsError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateReplyComment.pending, (state) => {
        state.replyCommentsStatus = 'loading'; // Update status to loading
      })
      .addCase(CreateReplyComment.fulfilled, (state, action) => {
        state.replyCommentsStatus = 'succeeded'; // Update status to succeeded
        state.replyComment = action.payload; // Assuming userId is returned from the API
      })
      .addCase(CreateReplyComment.rejected, (state, action) => {
        state.replyCommentsStatus = 'failed'; // Update status to failed
        state.replyCommentsError = action.error.message;
        state.replyCommentsError = action.error; 
      });
  },
});

export default replyComment.reducer;