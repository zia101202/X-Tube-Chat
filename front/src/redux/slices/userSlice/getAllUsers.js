import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from '../../../config/apiAxios/apiAxios';

// Correct usage of createAsyncThunk
export const getAllUsers = createAsyncThunk('GetAllRegisterUser', async (endpoint) => {
  const response = await getData(  endpoint);
  console.log(response)
  return response;
});

const GetAllUserDataSlice = createSlice({
  name: 'GetAllUserDataSlice',
  initialState: {
    dataAllUsers: [],  // Initialized as an empty array
    StatusAllUser: 'idle',
    errorStatusAllUsers: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.  StatusAllUser = 'loading'; // Update status to loading
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state. StatusAllUser = 'succeeded';
        state.dataAllUsers = action.payload; // Update state with the fetched data
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state. StatusAllUser = 'failed'; // Update status to failed
        state.errorStatusAllUsers = action.error.message; // Store the error message
      });
  },
});

export  default  GetAllUserDataSlice.reducer ;
