import type { Attribute } from "./game";

/**
 * Action types classification
 * UNIQUE: Grants Reality Points only on first completion (historical)
 * TEMPORAL: Grants Reality Points every time
 * INTERACTION: NPC/dialogue related
 * TRAINING: Improves attributes/proficiencies
 * TRAVEL: Moves between areas
 * DISCOVERY: Finds items/secrets
 */
export const ActionType = {
  UNIQUE: "unique",
  TEMPORAL: "temporal",
  INTERACTION: "interaction",
  TRAINING: "training",
  TRAVEL: "travel",
  DISCOVERY: "discovery",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];

/**
 * Action identifiers
 */

export const ActionId = {
  WAKE_UP: "wake_up",
  LOOK_WINDOW: "look_window",
  LEAVE_HOME: "leave_home",
  // etc...
} as const;

export type ActionId = (typeof ActionId)[keyof typeof ActionId];

/**
 * Cost structure for actions
 */

export interface ActionCost {
  time?: number | null; // Time cost in minutes
  gold?: number | null; // Monetary cost
  items?: string[] | null; // Required items
}

/**
 * Rewards granted on action completion
 */
export interface ActionRewards {
  realityPoints?: number;
  attributes?: Partial<Record<Attribute, number>>;
  proficiencies?: string[]; // Proficiency keys to increment
  items?: string[];
  flags?: string[];
}

/**
 * Requitements to show/execute an action
 */

export interface ActionRequirementSet {
  // Temporal
  timeWindow?: { min: number; max: number };
  // Narrative state
  flags?: string[];
  notFlags?: string[]; // Must NOT have these flags
  // History
  requiredActions?: string[]; // Must have completed these
  // Resources
  hasItems?: string[];
  minGold?: number;
  // Stats
  minAttributes?: Partial<Record<Attribute, number>>;
  minLoopNumber?: number;
  // Execution limits (for repeatable actions)
  maxExecutionsThisRun?: number; // Block after X times in current loop
  // Visibility
  hidden?: boolean;
}

/**
 * Complete action definition (immutable)
 */

export interface GameActionDefinition {
  id: ActionId;
  nameKey: string; // i18n key for name
  descriptionKey: string; // i18n key for description
  type: ActionType;
  areaId: string; // Where this action is available
  cost: ActionCost;
  rewards: ActionRewards;
  requirements: ActionRequirementSet[];
  narrativeTextKey: string; // i18n Text shown in narrative panel during execution
  travelTo?: string; // AreaId to move to on completion (for TRAVEL actions)
}
