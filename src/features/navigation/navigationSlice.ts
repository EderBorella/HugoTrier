import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ScreenType } from "../../types/game";

interface NavigationState {
  currentScreen: ScreenType;
}

const initialState: NavigationState = {
  currentScreen: ScreenType.START,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<ScreenType>) => {
      state.currentScreen = action.payload;
    },
    goBack: (state) => {
      state.currentScreen = ScreenType.START;
    },
  },
});

export const { setScreen, goBack } = navigationSlice.actions;
export default navigationSlice.reducer;
