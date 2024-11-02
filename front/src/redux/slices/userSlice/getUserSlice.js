// src/slices/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabyProperty } from '../../../config/apiAxios/apiAxios';
// Define your async thunk
export const GetDatabyProperty = createAsyncThunk('GetUserSlice/getuser', getDatabyProperty );

const GetUserSlice = createSlice({
    name: 'GetUserSlice',
    initialState: {
      value: 0,
      data: null,
      status: 'idle', 
      error: null,
    },
 
    extraReducers: (builder) => {
      builder
        .addCase(GetDatabyProperty.pending, (state) => {
          state.status = 'loading'; // Update status to loading
        })
        .addCase(GetDatabyProperty.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(GetDatabyProperty.rejected, (state, action) => {
          state.status = 'failed'; // Update status to failed
          state.error = action.error.message; // Store the error message
        });
    },
  });
  
 
  export default GetUserSlice.reducer;
  