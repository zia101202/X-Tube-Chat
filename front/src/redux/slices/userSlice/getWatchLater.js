// src/slices/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabyProperty } from '../../../config/apiAxios/apiAxios';
// Define your async thunk

export const getWatchLaterVideos = createAsyncThunk('getWatchLaterVideos/videos', async ({endpoint,params}) => {

    const response = await getDatabyProperty( {endpoint,params});
    return response; // return the data from the API
  });
  

const getWatchLater = createSlice({
    name: 'getWatchLater',
    initialState: {
        WatchLatervalue: 0,
        WatchLaterdata:null,
        WatchLaterstatus: 'idle', 
        WatchLatererror: null,
    },
 
    extraReducers: (builder) => {
      builder
        .addCase(getWatchLaterVideos.pending, (state) => {
          state.WatchLaterstatus = 'loading'; // Update status to loading
        })
        .addCase(getWatchLaterVideos.fulfilled, (state, action) => {
          state.WatchLaterstatus = 'succeeded';
          state.WatchLaterdata = action.payload;
        })
        .addCase(getWatchLaterVideos.rejected, (state, action) => {
          state.WatchLaterstatus = 'failed'; // Update status to failed
          state.WatchLatererror = action.error.message; // Store the error message
        });
    },
  });
 
 
  export default getWatchLater.reducer;