import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    staylist: [],
    page: 0,
    error: null,
    scrollEventFlg: true,
  },
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        if (action.payload && action.payload.items && action.payload.items.item) {
          state.staylist = [...state.staylist, ...action.payload.items.item];
          state.page = action.payload.pageNo;
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        } 
      })
      .addCase(stayIndex.rejected, (state, action) => {
        state.error = action.error.message;
        state.scrollEventFlg = false;
      })      
  }
});

export const { setScrollEventFlg } = staySlice.actions;

export default staySlice.reducer;