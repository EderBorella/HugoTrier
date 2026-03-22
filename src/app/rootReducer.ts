import { combineReducers } from "@reduxjs/toolkit";

// =================================================
// SLICES
// =================================================
import navigationReducer from "../features/navigation/navigationSlice";
import gameReducer from "../features/game/gameSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  game: gameReducer,
});

export { rootReducer };
