import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISwitchItem {
  down: boolean;
  up: boolean;
}

const initialState:ISwitchItem = {
  down: false,
  up: false,
}

const switchItemSlice = createSlice({
  name: 'switchItem',
  initialState,
  reducers: {
    down: (state, action:PayloadAction<boolean>) => {
      state.down = action.payload;
    },
    up: (state, action:PayloadAction<boolean>) => {
      state.up = action.payload;
    }
  }
})

export const { down, up } = switchItemSlice.actions;
export default switchItemSlice.reducer;
