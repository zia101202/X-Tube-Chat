import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData  } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const watchLater = createAsyncThunk('watchLaterSlice/watchLater', async ({userId, videoId}) => {
    console.log(userId)          
    console.log(videoId)
const response = await createData  ({ endpoint: `/personal/watchLater`,data:{userId,videoId}  });
  return response; // return the data from the API
});


const watchLaterVideo = createSlice({
  name: 'watchLaterVideo',
  initialState: {
    watchLaterVideo: null,
    watchLaterVideoStatus: 'idle', 
    watchLaterVideoError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(watchLater.pending, (state) => {
        state.watchLaterVideoStatus = 'loading'; // Update watchLaterVideoStatus to loadingx
      })
      .addCase(watchLater.fulfilled, (state, action) => {
        state.watchLaterVideoStatus = 'succeeded'; // Update watchLaterVideoStatus to succeeded
        state.watchLaterVideo = action.payload; // Assuming userId is returned from the API
      })
      .addCase(watchLater.rejected, (state, action) => {
        state.watchLaterVideoStatus = 'failed'; // Update watchLaterVideoStatus to failed
        state.watchLaterVideoError = action.error.message;
        state.watchLaterVideoError = action.error; 
      });
  },
});

export default watchLaterVideo.reducer;