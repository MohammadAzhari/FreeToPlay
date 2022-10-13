import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../../components/Card";

interface InitialState {
  favo: CardProps[];
}

const initialState: InitialState = {
  favo: [],
};

export const favoSlice = createSlice({
  name: "favo",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CardProps>) => {
      const isFound = state.favo.findIndex((i) => i.id === action.payload.id);
      if (isFound === -1) {
        state.favo = [...state.favo, action.payload];
      }
    },
    removeItem: (state, action: PayloadAction<CardProps>) => {
      const arr = state.favo;
      state.favo = arr.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem } = favoSlice.actions;

export default favoSlice.reducer;
