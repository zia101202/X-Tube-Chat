import { createData } from "../../../config/apiAxios/apiAxios"; // Adjust the import path as necessary
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registration = createAsyncThunk(
  "registrationSlice/registration",
  async ({ endpoint, data }) => {
    console.log(endpoint, data);
    const response = await createData({ endpoint, data });
    console.log(response);
    return response;
  }
);

const registrationSlice = createSlice({
  name: "registrationSlice", // Corrected here
  initialState: {
    registrationData: null,
    registrationStatus: "idle",
    registrationError: null,
  },
  reducers: {}, // You can add synchronous reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.registrationData = action.payload;
        state.registrationStatus = "succeed";
      })
      .addCase(registration.rejected, (state, action) => {
        state.registrationError = action.error;
        state.registrationStatus = "failed"; // Add a failed state for clarity
      })
      .addCase(registration.pending, (state) => {
        state.registrationStatus = "pending"; // Fixed typo
      });
  },
});

export default registrationSlice.reducer;
