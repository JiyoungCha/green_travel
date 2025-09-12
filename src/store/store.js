import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from "../components/festivals/FestivalList";

export default configureStore({
  reducer: {
    festival: festivalReducer,
  }
});