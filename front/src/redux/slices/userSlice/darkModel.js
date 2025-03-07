import { createSlice } from '@reduxjs/toolkit';

const darkModelSlice = createSlice({
    name: "darkModelSlice",
    initialState: {
      darkModel: true,
    },
    reducers: {
      setDarkModel: (state, action) => {
        state.darkModel = action.payload;
      },    
    }
    })

    export const { setDarkModel } = darkModelSlice.actions;
    export default darkModelSlice.reducer