import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AreaId, Attribute, Proficiency } from "../../types/game";
import type {
  CurrentRun,
  Counters,
  MetaProgression,
  GameState,
} from "../../types/game";

// ============================================
// INITIAL STATE
// ============================================

const initialCurrentRun: CurrentRun = {
  loopNumber: 1,
  currentTime: 0, // 06:00
  currentArea: AreaId.HOME,
  attributes: {
    [Attribute.STRENGTH]: 0,
    [Attribute.DEXTERITY]: 0,
    [Attribute.INTELLIGENCE]: 0,
    [Attribute.CHARISMA]: 0,
  },
  proficiencies: {
    [Proficiency.SWORDSMANSHIP]: 0,
    [Proficiency.ARCHERY]: 0,
    [Proficiency.MAGIC]: 0,
  },
  inventory: [],
  equipped: {},
  npcRelationships: {},
  completedActions: [],
  activeFlags: [],
  lastFiveActions: [],
};

const initialCounters: Counters = {
  run: {},
  total: {},
};

const initialMeta: MetaProgression = {
  totalRuns: 0,
  unlockedEndings: [],
  totalRealityPoints: 0,
  spentRealityPoints: 0,
  unlockedSkills: [],
  discoveredActions: [],
  npcInteractionsTotal: {},
  proficiencies: {
    [Proficiency.SWORDSMANSHIP]: 0,
    [Proficiency.ARCHERY]: 0,
    [Proficiency.MAGIC]: 0,
  },
};

const initialState: GameState = {
  currentRun: initialCurrentRun,
  counters: initialCounters,
  meta: initialMeta,
};

// ============================================
// SLICE
// ============================================

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    /**
     * Advance the time in the current run by a specified number of minutes.
     *
     * @param action.payload - Minutes to advance (e.g., 15 for +15 minutes)
     *
     * @example
     * dispatch(advanceTime(15)); // +15 minutes
     */
    advanceTime: (state, action: PayloadAction<number>) => {
      state.currentRun.currentTime += action.payload;

      // Cap in 960 (22:00)
      if (state.currentRun.currentTime > 960) {
        state.currentRun.currentTime = 960;
      }
    },

    /**
     * Define a specific time, for debbuging or special events.
     *
     * @param action.payload - Time in minutes (0 = 06:00, 960 = 22:00)
     */
    setTime: (state, action: PayloadAction<number>) => {
      state.currentRun.currentTime = Math.max(0, Math.min(960, action.payload));
    },

    /**
     * Change area in the current run.
     *
     * @param action.payload - AreaId to travel to
     */
    travelToArea: (state, action: PayloadAction<AreaId>) => {
      state.currentRun.currentArea = action.payload;
    },

    /**
     * Increment the counter for a specific action, both for the current run and total history.
     * Used when an action is completed
     * @param action.payload - Action ID to increment the counter for
     */
    incrementActionCounter: (state, action: PayloadAction<string>) => {
      const actionId = action.payload;

      // Actual run
      state.counters.run[actionId] = (state.counters.run[actionId] || 0) + 1;

      // Total history
      state.counters.total[actionId] =
        (state.counters.total[actionId] || 0) + 1;
    },

    /**
     * Complete unique action.
     * @param action.payload - Action ID to mark as completed
     */
    completeUniqueAction: (state, action: PayloadAction<string>) => {
      const actionId = action.payload;

      if (!state.currentRun.completedActions.includes(actionId)) {
        state.currentRun.completedActions.push(actionId);
      }

      if (!state.meta.discoveredActions.includes(actionId)) {
        state.meta.discoveredActions.push(actionId);
        // Ganha 1 PR na primeira vez
        state.meta.totalRealityPoints += 1;
      }
    },

    /**
     * Add history flag
     */
    addFlag: (state, action: PayloadAction<string>) => {
      if (!state.currentRun.activeFlags.includes(action.payload)) {
        state.currentRun.activeFlags.push(action.payload);
      }
    },

    /**
     * Update NPM relationship level by a delta, clamped between -18 and +18.
     *
     * @param action.payload - Object containing npcId and delta
     */
    updateRelationship: (
      state,
      action: PayloadAction<{ npcId: string; delta: number }>,
    ) => {
      const { npcId, delta } = action.payload;
      const current = state.currentRun.npcRelationships[npcId] || 0;
      // Clamp between -18 and +18
      state.currentRun.npcRelationships[npcId] = Math.max(
        -18,
        Math.min(18, current + delta),
      );
    },

    /**
     * Add item to inventory
     * @param action.payload - Item ID to add to inventory
     */
    addItem: (state, action: PayloadAction<string>) => {
      state.currentRun.inventory.push(action.payload);
    },

    /**
     * Equip item in a specific slot
     * @param action.payload - Object containing slot and itemId
     */
    equipItem: (
      state,
      action: PayloadAction<{
        slot: "weapon" | "armor" | "accessory";
        itemId: string;
      }>,
    ) => {
      const { slot, itemId } = action.payload;
      state.currentRun.equipped[slot] = itemId;
    },

    /**
     * RESET RUN - call to start the next loop.
     * Keep Meta, reset actual run and run counters.
     */
    resetRun: (state) => {
      // Incrementa contador de runs
      state.meta.totalRuns += 1;

      // Reseta run atual (mantém loopNumber para incrementar)
      const nextLoopNumber = state.currentRun.loopNumber + 1;

      state.currentRun = {
        ...initialCurrentRun,
        loopNumber: nextLoopNumber,
        // Aqui futuro: aplicar bônus de PR (atributos permanentes)
      };

      // Reseta contadores de run (mantém total)
      state.counters.run = {};
    },

    /**
     * Compra habilidade com PR
     * (Futuro: expandir para diferentes tipos)
     */
    purchaseSkill: (
      state,
      action: PayloadAction<{ skillId: string; cost: number }>,
    ) => {
      const { skillId, cost } = action.payload;
      const available =
        state.meta.totalRealityPoints - state.meta.spentRealityPoints;

      if (available >= cost && !state.meta.unlockedSkills.includes(skillId)) {
        state.meta.spentRealityPoints += cost;
        state.meta.unlockedSkills.push(skillId);
      }
    },

    /**
     * Increment level of a proficiency in the current run (e.g., SWORDSMANSHIP, ARCHERY, MAGIC).
     *
     * @example
     * dispatch(incrementProficiency(Proficiency.FENCING)); // +1 esgrima
     */
    incrementRunProficiency: (state, action: PayloadAction<Proficiency>) => {
      const prof = action.payload;
      state.currentRun.proficiencies[prof] += 1;
      // No upper limit for now, but can add logic here if needed in the future
    },

    incrementMetaProficiency: (
      state,
      action: PayloadAction<{ prof: Proficiency }>,
    ) => {
      const { prof } = action.payload;
      state.meta.proficiencies[prof] += 1;
    },

    /**
     * Carrega estado completo (para save/load)
     */
    loadGameState: (_state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
  },
});

export const {
  advanceTime,
  setTime,
  travelToArea,
  incrementActionCounter,
  completeUniqueAction,
  addFlag,
  updateRelationship,
  addItem,
  equipItem,
  resetRun,
  purchaseSkill,
  loadGameState,
} = gameSlice.actions;

export default gameSlice.reducer;
