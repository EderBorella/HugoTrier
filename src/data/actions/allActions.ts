import { ActionId, ActionType } from "../../types/actions";
import type { GameActionDefinition } from "../../types/actions";
import { AreaId } from "../../types/game";

export const allActions: Record<ActionId, GameActionDefinition> = {
  [ActionId.WAKE_UP]: {
    id: ActionId.WAKE_UP,
    nameKey: "actions.wake_up.name",
    descriptionKey: "actions.wake_up.description",
    type: ActionType.UNIQUE,
    areaId: AreaId.HOME,
    cost: { time: 15 },
    rewards: { realityPoints: 1, flags: ["AWAKE"] },
    requirements: [{}],
    narrativeTextKey: "narrative.wake_up",
  },

  [ActionId.LOOK_WINDOW]: {
    id: ActionId.LOOK_WINDOW,
    nameKey: "actions.look_window.name",
    descriptionKey: "actions.look_window.description",
    type: ActionType.DISCOVERY,
    areaId: AreaId.HOME,
    cost: { time: 5 },
    rewards: { flags: ["LOOKED_OUTSIDE"] },
    requirements: [{ timeWindow: { min: 0, max: 180 } }],
    narrativeTextKey: "narrative.look_window",
  },

  [ActionId.LEAVE_HOME]: {
    id: ActionId.LEAVE_HOME,
    nameKey: "actions.leave_home.name",
    descriptionKey: "actions.leave_home.description",
    type: ActionType.TRAVEL,
    areaId: AreaId.HOME,
    cost: { time: 10 },
    rewards: {},
    requirements: [],
    narrativeTextKey: "narrative.leave_home",
  },
};
