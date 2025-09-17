import { createSlice } from "@reduxjs/toolkit";

const festivalShowSlices = createSlice({
  name: 'festivalShowSlices',
  initialState: {
    festivalInfo: {},
  },
  reducers: {
    setfestivalInfo(state, action) {
      state.festivalInfo = action.payload;
    },
  }
});

export const {
 setfestivalInfo
} = festivalShowSlices.actions;

export default festivalShowSlices.reducer;