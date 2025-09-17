import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from "./slices/festivalSlice.js";
import festivalShowReducer from './slices/festivalShowSlices.js';

export default configureStore({
  reducer: {
    festival: festivalReducer,
    festivalShow: festivalShowReducer,
  }
});