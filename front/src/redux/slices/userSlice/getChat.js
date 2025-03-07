import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getChat = createAsyncThunk("/chat/getchat", async ({ to, from }) => {
  const response = await axios.get(`${import.meta.env.VITE_API_UR}/chat/getChats`, {params: { to, from }
  , withCredentials: true});
  
  return response.data;
});

const ChatDataSlice = createSlice({
  name: "ChatDataSlice",
  initialState: {
    chatData: null,
    chatStatus: "idle",
    chatError: null, // Add chatError state for error handling
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.chatStatus = "pending";
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.chatStatus = "fulfilled";
        state.chatData = action.payload; // Use action.payload to get data
      })
      .addCase(getChat.rejected, (state, action) => {
        state.chatStatus = "rejected";
        state.chatError = action.error; // Use action.error.message to get the error message
      });
  },
});

export default ChatDataSlice.reducer;
