import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createData } from '../../../config/apiAxios/apiAxios'; // Adjust the import path as necessary

// Define your async thunk
export const createUser = createAsyncThunk('userSlice/createData', async (userData) => {
  const response = await createData({ endpoint: '/api/users', data: userData });
  return response; // return the data from the API
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userID: null,
    status: 'idle', 
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading'; // Update status to loading
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Update status to succeeded
        console.log(action.payload)
        state.userID = action.payload?.user?._id; // Assuming userId is returned from the API
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'; // Update status to failed
        state.error = action.error.message;
        state.error = action.error; 
      });
  },
});

export default userSlice.reducer;
