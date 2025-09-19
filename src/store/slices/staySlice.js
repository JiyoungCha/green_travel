import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    staylist: [],
    page: 0,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: builder => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        if (action.payload && action.payload.items && action.payload.items.item) {
          state.staylist = action.payload.items.item;
          console.log(action.payload, action.type);
        } else {
          state.staylist = [];
        } 
      })
      .addCase(stayIndex.rejected, (state, action) => {
        state.staylist = [];
        state.error = action.error.message;
      })      
  }
});

// export const { stayList } = staySlice.actions;

export default staySlice.reducer;