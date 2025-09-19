import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig.js";
import axios from "axios";

const stayIndex = createAsyncThunk(
  'staySlices/stayIndex',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    
    const url = `${axiosConfig.BASE_URL}/searchStay2`;
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        MobileOS: axiosConfig.MOBILE_OS,
        MobileApp: axiosConfig.MOBILE_APP,
        _type: axiosConfig.TYPE,
        arrange: axiosConfig.ARRANGE,
        numOfRows: axiosConfig.NUMER_OF_ROWS,
        pageNo: state.stay.page,
      }
    }

    const response = await axios.get(url, config);
    
    return response.data.response.body;
  }
);

export { stayIndex };