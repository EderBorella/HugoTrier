import type { RootState } from "../../app/store";
import { ScreenType } from "../../types/game";

export const selectCurrentScreen = (state: RootState): ScreenType =>
  state.navigation.currentScreen;

export const selectIsScreen = (state: RootState, screen: ScreenType): boolean =>
  state.navigation.currentScreen === screen;
