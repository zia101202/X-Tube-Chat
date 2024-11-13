import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData  } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const createPlaylist = createAsyncThunk('userSlice/createData', async ({userId, videoId,title}) => {
    console.log(userId)          
    console.log(videoId)
  
const response = await createData  ({ endpoint: `/personal/createPlaylist`,data:{userId,videoId,title}  });
  return response; // return the data from the API
});


const createPlaylistSlice = createSlice({
  name: 'createPlaylistSlice',
  initialState: {
    playlistVideo: null,
    playlistVideoStatus: 'idle', 
    playlistVideoError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.playlistVideoStatus = 'loading'; // Update playlistVideoStatus to loadingx
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlistVideoStatus = 'succeeded'; // Update playlistVideoStatus to succeeded
        state.playlistVideo = action.payload; // Assuming userId is returned from the API
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.playlistVideoStatus = 'failed'; // Update playlistVideoStatus to failed
        state.playlistVideoError = action.error.message;
        state.playlistVideoError = action.error; 
      });
  },
});

export default createPlaylistSlice.reducer;