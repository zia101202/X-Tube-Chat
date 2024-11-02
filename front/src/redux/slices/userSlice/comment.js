import { createData } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Define your async thunk
export const createComment = createAsyncThunk('commentSlice/createData', async (userData) => {
  const response = await createData({ endpoint: '/comments/create', data: userData });
  return response; // return the data from the API
});

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState: {
    comment: null,
    commentsStatus: 'idle', 
    commentsError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.commentsStatus = 'loading'; // Update status to loading
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded'; // Update status to succeeded
        state.comment = action.payload; // Assuming userId is returned from the API
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentsStatus = 'failed'; // Update status to failed
        state.commentsError = action.error.message;
        state.commentsError = action.error; 
      });
  },
});

export default commentSlice.reducer;