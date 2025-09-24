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
    },
    setStayList: (state, action) => {
      state.staylist = action.payload;
     }  
  },
  extraReducers: builder => {
    builder
      .addCase(stayIndex.fulfilled, (state, action) => {
        if (action.payload && action.payload.items && action.payload.items.item) {
          const newItems = action.payload.items.item;
          // 기존 contentid 목록을 Set으로 만들어 빠른 조회를 가능하게 함
          const existingStayIds = new Set(state.staylist.map(item => item.contentid));
          // 새로 가져온 아이템 중, 기존 목록에 없는 것만 필터링
          const uniqueNewItems = newItems.filter(item => !existingStayIds.has(item.contentid));

          if (uniqueNewItems.length > 0) {
              state.staylist.push(...uniqueNewItems);
              state.page = action.payload.pageNo;
              state.scrollEventFlg =true;
            } else {
               state.scrollEventFlg = false;
             }
            
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

export const { setScrollEventFlg, setStayList } = staySlice.actions;

export default staySlice.reducer;