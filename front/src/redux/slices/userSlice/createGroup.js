import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDataWithImagesFun} from "../../../config/apiAxios/apiAxios";
import { getDatabyProperty } from "../../../config/apiAxios/apiAxios";
export const createDataWithImages  = createAsyncThunk(
  "/create/group",
  async ({ endpoint, formData }) => {
    console.log(endpoint)
    console.log(FormData )
    console.log('he;;llo')
    const response = await createDataWithImagesFun({ endpoint, formData });
    return response;
  }
);
export const getGroups=createAsyncThunk("/Get/AllGroups",async({endpoint,params})=>{
  console.log(endpoint)
 const response=await getDatabyProperty({endpoint,params})
 return response
})


const groupSlice = createSlice({
  name: "groupSlice",
  initialState: {
    groupData: null,
    groupStatus: "idle",
    error: null,
    getAllGroupData: null,
    getAllGroupStatus: "idle",
    getAllerror: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createDataWithImages .fulfilled, (state, action) => {
        state.groupData = action.payload;
        state.groupStatus = "succeed";
      })
      .addCase(createDataWithImages .rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createDataWithImages .pending, (state) => {
        state.groupStatus = "pending";
      }).addCase(getGroups.fulfilled, (state, action) => {
        state.getAllGroupData = action.payload;
        state.getAllGroupStatus = "succeed";
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.getAllerror = action.error.message;
      })
      .addCase(getGroups.pending, (state) => {
        state.getAllGroupStatus= "pending";
      })
  },
});

export default groupSlice.reducer;
