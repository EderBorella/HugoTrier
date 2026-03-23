import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GameActionDefinition } from "../../types/actions";
import { ActionType } from "../../types/actions";
import type { AreaId } from "../../types/game";
import { calculateRealTime } from "../../utils/timeCalculator";
import {
  startAction,
  finishAction,
  advanceTime,
  incrementActionCounter,
  completeUniqueAction,
  addFlag,
  travelToArea,
} from "./gameSlice";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Async thunk for executing a game action.
 *
 * Flow: startAction → delay → rewards → finishAction
 */
export const executeAction = createAsyncThunk(
  "game/executeAction",
  async (definition: GameActionDefinition, { dispatch }) => {
    const duration = calculateRealTime(definition.cost.time ?? 0);

    // Begin processing
    dispatch(startAction({ actionId: definition.id, duration }));

    // Wait for real-time delay (3-10s)
    await sleep(duration);

    // Apply time cost
    if (definition.cost.time) {
      dispatch(advanceTime(definition.cost.time));
    }

    // Increment counter
    dispatch(incrementActionCounter(definition.id));

    // Apply rewards
    if (definition.type === ActionType.UNIQUE) {
      dispatch(completeUniqueAction(definition.id));
    }

    if (definition.rewards.flags) {
      for (const flag of definition.rewards.flags) {
        dispatch(addFlag(flag));
      }
    }

    // Travel
    if (definition.travelTo) {
      dispatch(travelToArea(definition.travelTo as AreaId));
    }

    // Done
    dispatch(finishAction());
  },
);
