export const ScreenType = {
  START: "start",
  MAIN: "main",
  DIALOGUE: "dialogue",
  AWAKENING: "awakening",
  ENDING: "ending",
} as const;

export type ScreenType = (typeof ScreenType)[keyof typeof ScreenType];

// ============================================
// ATTRIBUTES AND PROFICIENCIES
// ============================================

export const Attribute = {
  STRENGTH: "strength",
  DEXTERITY: "dexterity",
  INTELLIGENCE: "intelligence",
  CHARISMA: "charisma",
} as const;

export type Attribute = (typeof Attribute)[keyof typeof Attribute];

export const Proficiency = {
  SWORDSMANSHIP: "swordsmanship",
  ARCHERY: "archery",
  MAGIC: "magic",
} as const;

export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];

// ============================================
// AREAS
// ============================================

export const AreaId = {
  HOME: "home",
  MARKET: "market",
  TOWER: "tower",
  FOREST: "forest",
  GATE: "gate",
} as const;

export type AreaId = (typeof AreaId)[keyof typeof AreaId];

// ============================================
// RUN CURRENT STATE
// ============================================

export interface CurrentRun {
  loopNumber: number;
  currentTime: number; // 0 = 06:00, 960 = 22:00
  currentArea: AreaId;
  attributes: Record<Attribute, number>;
  proficiencies: Record<Proficiency, number>;
  inventory: string[]; // Placeholder for inventory items
  equipped: {
    weapon?: string;
    armor?: string;
    accessory?: string;
  };
  npcRelationships: Record<string, number>; // Placeholder for NPC relationship levels
  completedActions: string[]; // Placeholder for completed actions/events
  activeFlags: string[]; // Placeholder for active flags/status effects
  lastFiveActions?: string[]; // Placeholder for the last action taken
}

// ============================================
// COUNTER
// ============================================

export interface Counters {
  run: Record<string, number>; // Ações nesta run
  total: Record<string, number>; // Ações no histórico total
}

// ============================================
// META-PROGRESSION
// ============================================

export interface MetaProgression {
  totalRuns: number;
  unlockedEndings: string[];
  totalRealityPoints: number;
  spentRealityPoints: number;
  unlockedSkills: string[];
  discoveredActions: string[];
  npcInteractionsTotal: Record<string, number>;
  proficiencies: Record<Proficiency, number>;
  activeFlags: string[]; // Persistent flags (from PR purchases, permanent unlocks)
}

export interface GameState {
  currentRun: CurrentRun;
  counters: Counters;
  meta: MetaProgression;
  isProcessingAction: boolean;
  currentActionId: string | null;
}

// ============================================
// EXPORTS
// ============================================
