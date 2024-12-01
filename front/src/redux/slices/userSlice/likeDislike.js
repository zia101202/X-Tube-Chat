import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDataPartially } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const LikeVideo = createAsyncThunk('LikeDislikeVideo', async ({videoid,like, userId}) => {
  console.log(like)
const response = await createDataPartially({ endpoint: `/video/${videoid}/${like}`, userID: userId });
console.log(response)
  return response; // return the data from the API
});


const LikeVideoSlice = createSlice({
  name: 'LikeVideo',
  initialState: {
    likeDislikeData: null,
    likeDislikeDataStatus: 'idle', 
    likeDislikeDataError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(LikeVideo.pending, (state) => {
        state.likeDislikeDataStatus = 'loading'; // Update likeDislikeDataStatus to loadingx
      })
      .addCase(LikeVideo.fulfilled, (state, action) => {
        state.likeDislikeDataStatus = 'succeeded'; // Update likeDislikeDataStatus to succeeded
        state.likeDislikeData = action.payload; // Assuming userId is returned from the API
      })
      .addCase(LikeVideo.rejected, (state, action) => {
        state.likeDislikeDataStatus = 'failed'; // Update likeDislikeDataStatus to failed
        state.likeDislikeDataError = action.error.message;
        state.likeDislikeDataError = action.error; 
      });
  },
});

export default LikeVideoSlice.reducer;