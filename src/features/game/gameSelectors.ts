// src/features/game/gameSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import {
  formatGameTime,
  calculateDayProgress,
  getTimePeriod,
} from "../../utils/timeCalculator";
import { allActions } from "../../data/actions/allActions";
import { getAvailableActions } from "../../utils/actionFilter";

// ============================================
// BASIC SELECTORS (NOT MEMOIZED YET)
// ============================================

export const selectCurrentRun = (state: RootState) => state.game.currentRun;
export const selectMeta = (state: RootState) => state.game.meta;
export const selectCounters = (state: RootState) => state.game.counters;
export const selectCurrentTime = (state: RootState) =>
  state.game.currentRun.currentTime;
export const selectIsProcessing = (state: RootState) =>
  state.game.isProcessingAction;
export const selectCurrentActionId = (state: RootState) =>
  state.game.currentActionId;

// ============================================
// MEMOIZED SELECTORS (createSelector)
// ============================================

/**
 * Formatted time for display "06:00 AM"
 */
export const selectFormattedTime = createSelector([selectCurrentTime], (time) =>
  formatGameTime(time),
);

/**
 * Day progress percentage (0-100)
 */
export const selectDayProgress = createSelector([selectCurrentTime], (time) =>
  calculateDayProgress(time),
);

/**
 * Time of day period (morning/afternoon/evening)
 */
export const selectTimePeriod = createSelector([selectCurrentTime], (time) =>
  getTimePeriod(time),
);

/**
 * Check if it's 22:00 (end of day)
 */
export const selectIsEndOfDay = createSelector(
  [selectCurrentTime],
  (time) => time >= 960,
);

/**
 * Available actions for the current area, filtered by requirements.
 */
export const selectAreaActions = createSelector(
  [selectCurrentRun, selectCounters, selectMeta],
  (currentRun, counters, meta) => {
    const ctx = { currentRun, counters, meta };
    return getAvailableActions(allActions, currentRun.currentArea, ctx);
  },
);

/**
 * Effective proficiency (base meta + run bonus)
 */
export const selectEffectiveProficiency = createSelector(
  [
    (state: RootState) => state.game.meta.proficiencies,
    (state: RootState) => state.game.currentRun.proficiencies,
    (_state: RootState, prof: string) => prof,
  ],
  (
    metaProfs: Record<string, number>,
    runProfs: Record<string, number>,
    prof: string,
  ) => {
    const base = metaProfs[prof] || 0;
    const bonus = runProfs[prof] || 0;
    return base + bonus;
  },
);
