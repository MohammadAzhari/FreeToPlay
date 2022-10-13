import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Platform = ("PC" | "WEB")[];
type Gener =
  | "MMORPG"
  | "Shooter"
  | "Anime"
  | "Strategy"
  | "Sci-Fi"
  | "Racing"
  | "Social"
  | "Sports"
  | "all";
export type Sort = "alpha" | "date" | "default";

interface InitialState {
  platform: Platform;
  gener: Gener;
  sort: Sort;
  search: string;
}

const initialState: InitialState = {
  platform: [],
  gener: "all",
  sort: "default",
  search: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changePlatform: (state, action: PayloadAction<Platform>) => {
      state.platform = action.payload;
    },
    changeGener: (state, action: PayloadAction<Gener>) => {
      state.gener = action.payload;
    },
    changeSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { changeGener, changePlatform, changeSort, changeSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
