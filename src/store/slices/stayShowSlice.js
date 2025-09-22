import { createSlice } from "@reduxjs/toolkit";

const stayShowSlice = createSlice({
  name: 'stayShowSlice',
  initialState: {
    stayInfo: null,
  },
  reducers: {
    setStayInfo(state, action) {
      state.stayInfo = action.payload;
    },
  }
});

export const { setStayInfo } = stayShowSlice.actions;

export default stayShowSlice.reducer;