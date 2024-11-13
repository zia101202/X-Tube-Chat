import { createSlice } from "@reduxjs/toolkit";


const selecedVideoSlice = createSlice({
  name: "selecedVideoSlice",
  initialState: {
    video: null,
  },
  reducers: {
    addSelectedVideo: (state, action) => {
      state.video = action.payload;
    },
  },
});
export const { addSelectedVideo } = selecedVideoSlice.actions;
export default selecedVideoSlice.reducer;
