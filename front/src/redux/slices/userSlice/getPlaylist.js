// src/slices/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabyProperty } from '../../../config/apiAxios/apiAxios';
// Define your async thunk

export const getPlaylistVideos = createAsyncThunk('getPlaylistVideos/videos', async ({endpoint,params}) => {

    const response = await getDatabyProperty( {endpoint,params});
    return response; // return the data from the API
  });
  

const getPlaylist = createSlice({
    name: 'getPlaylist',
    initialState: {
       
        Playlistdata:null,
         Playliststatus: 'idle', 
         Playlisterror: null,
    },
 
    extraReducers: (builder) => {
      builder
        .addCase(getPlaylistVideos.pending, (state) => {
          state. Playliststatus = 'loading'; // Update status to loading
        })
        .addCase(getPlaylistVideos.fulfilled, (state, action) => {
          state. Playliststatus = 'succeeded';
          state.Playlistdata = action.payload;
        })
        .addCase(getPlaylistVideos.rejected, (state, action) => {
          state. Playliststatus = 'failed'; // Update status to failed
          state. Playlisterror = action.error.message; // Store the error message
        });
    },
  });
 
 
  export default getPlaylist.reducer;