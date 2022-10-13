import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navs",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openNavs: (state) => {
      state.isOpen = true;
    },
    closeNavs: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openNavs, closeNavs } = navSlice.actions;

export default navSlice.reducer;
