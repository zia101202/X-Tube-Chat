// src/slices/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabyProperty } from '../../../config/apiAxios/apiAxios';
// Define your async thunk

export const getPlaylistVideos = createAsyncThunk('getPlaylistVideos/videos', async ({endpoint,params}) => {

    const response = await getDatabyProperty( {endpoint,params});
    console.log(response)
    return response; // return the data from the API
  });
  
console.log(getPlaylistVideos )
const getPlaylist = createSlice({
    name: 'getPlaylist',
    initialState: {
       
        getPlaylistdata:null,
         getPlayliststatus: 'idle', 
         getPlaylisterror: null,
    },
 
    extraReducers: (builder) => {
      builder
        .addCase(getPlaylistVideos.pending, (state) => {
          state.getPlayliststatus = 'loading'; // Update status to loading
        })
        .addCase(getPlaylistVideos.fulfilled, (state, action) => {
          state.getPlayliststatus = 'succeeded';
          state.getPlaylistdata = action.payload;
        })
        .addCase(getPlaylistVideos.rejected, (state, action) => {
          state.getPlayliststatus = 'failed'; // Update status to failed
          state.getPlaylisterror = action.error.message; // Store the error message
        });
    },
  });
 
 
  export default getPlaylist.reducer;