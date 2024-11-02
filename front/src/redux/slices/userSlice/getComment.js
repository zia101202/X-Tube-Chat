import { getData } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Define your async thunk
export const getComment = createAsyncThunk('getCommentSlice/createData', async (id) => {
    
  const response = await getData(`/comments/get/${id}`);
  return response; // return the data from the API
});


const getCommentSlice = createSlice({
  name: 'getCommentSlice',
  initialState: {
    comment: null,
    commentsStatus: 'idle', 
    commentsError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComment.pending, (state) => {
        state.commentsStatus = 'loading'; // Update status to loading
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded'; // Update status to succeeded
        state.comment = action.payload; // Assuming userId is returned from the API
      })
      .addCase(getComment.rejected, (state, action) => {
        state.commentsStatus = 'failed'; // Update status to failed
        state.commentsError = action.error.message;
        state.commentsError = action.error; 
      });
  },
});

export default getCommentSlice.reducer;