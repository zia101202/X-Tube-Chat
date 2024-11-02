import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDataPartially } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const LikeVideo = createAsyncThunk('userSlice/createData', async ({videoid,like, userId}) => {
  console.log(videoid);
  console.log(userId);
const response = await createDataPartially({ endpoint: `/video/${videoid}/${like}`, userID: userId });
  return response; // return the data from the API
});


const LikeVideoSlice = createSlice({
  name: 'LikeVideo',
  initialState: {
    userID: null,
    status: 'idle', 
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(LikeVideo.pending, (state) => {
        state.status = 'loading'; // Update status to loadingx
      })
      .addCase(LikeVideo.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Update status to succeeded
        state.userID = action.payload?.user._id; // Assuming userId is returned from the API
      })
      .addCase(LikeVideo.rejected, (state, action) => {
        state.status = 'failed'; // Update status to failed
        state.error = action.error.message;
        state.error = action.error; 
      });
  },
});

export default LikeVideoSlice.reducer;