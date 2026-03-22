import type { GameActionDefinition } from "../types/actions";
import { checkRequirements } from "./requirementChecker";
import type { RequirementContext } from "./requirementChecker";

export interface FilteredAction {
  definition: GameActionDefinition;
  available: boolean;
}

/**
 * Filter actions by current area, then check requirements.
 * Returns only visible actions with their availability status.
 */
export function getAvailableActions(
  allActions: Record<string, GameActionDefinition>,
  currentArea: string,
  ctx: RequirementContext,
): FilteredAction[] {
  return Object.values(allActions)
    .filter((action) => action.areaId === currentArea)
    .map((action) => {
      const result = checkRequirements(action.requirements, ctx, action.id);
      return { definition: action, ...result };
    })
    .filter((action) => action.visible)
    .map(({ definition, available }) => ({ definition, available }));
}
