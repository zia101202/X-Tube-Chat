// src/slices/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../../config/apiAxios/apiAxios';
// Define your async thunk

export const GetAllVideos = createAsyncThunk('GetAllVideos/videos', async (endpoint) => {
    const response = await getData(endpoint);
    return response; // return the data from the API
  });
  

const GetAllVideosSlice = createSlice({
    name: 'GetAllVideosSlice',
    initialState: {
      value: 0,
      data: [],
      status: 'idle', 
      error: null,
    },
 
    extraReducers: (builder) => {
      builder
        .addCase(GetAllVideos.pending, (state) => {
          state.status = 'loading'; // Update status to loading
        })
        .addCase(GetAllVideos.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(GetAllVideos.rejected, (state, action) => {
          state.status = 'failed'; // Update status to failed
          state.error = action.error.message; // Store the error message
        });
    },
  });
  
 
  export default GetAllVideosSlice.reducer;
  