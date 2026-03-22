import type { ActionRequirementSet } from "../types/actions";
import type { CurrentRun, Counters, MetaProgression, Attribute } from "../types/game";

export interface RequirementContext {
  currentRun: CurrentRun;
  counters: Counters;
  meta: MetaProgression;
}

export interface RequirementResult {
  available: boolean;
  visible: boolean;
}

/**
 * Check a single ActionRequirementSet against game state.
 */
function checkSingleRequirement(
  req: ActionRequirementSet,
  ctx: RequirementContext,
  actionId: string,
): RequirementResult {
  let available = true;

  // Merge run + meta flags for unified checking
  const allFlags = [
    ...ctx.currentRun.activeFlags,
    ...ctx.meta.activeFlags,
  ];

  // timeWindow
  if (req.timeWindow) {
    const t = ctx.currentRun.currentTime;
    if (t < req.timeWindow.min || t > req.timeWindow.max) {
      available = false;
    }
  }

  // flags (must have ALL — checks both run and meta flags)
  if (req.flags) {
    if (!req.flags.every((f) => allFlags.includes(f))) {
      available = false;
    }
  }

  // notFlags (must NOT have ANY — checks both run and meta flags)
  if (req.notFlags) {
    if (req.notFlags.some((f) => allFlags.includes(f))) {
      available = false;
    }
  }

  // requiredActions (must have completed ALL in current run)
  if (req.requiredActions) {
    if (
      !req.requiredActions.every((a) =>
        ctx.currentRun.completedActions.includes(a),
      )
    ) {
      available = false;
    }
  }

  // hasItems
  if (req.hasItems) {
    if (!req.hasItems.every((i) => ctx.currentRun.inventory.includes(i))) {
      available = false;
    }
  }

  // minAttributes
  if (req.minAttributes) {
    for (const [attr, minVal] of Object.entries(req.minAttributes)) {
      const current = ctx.currentRun.attributes[attr as Attribute] ?? 0;
      if (current < (minVal ?? 0)) {
        available = false;
      }
    }
  }

  // minLoopNumber
  if (req.minLoopNumber != null) {
    if (ctx.currentRun.loopNumber < req.minLoopNumber) {
      available = false;
    }
  }

  // maxExecutionsThisRun
  if (req.maxExecutionsThisRun != null) {
    const execCount = ctx.counters.run[actionId] ?? 0;
    if (execCount >= req.maxExecutionsThisRun) {
      available = false;
    }
  }

  // hidden: when requirements not met, action is invisible
  if (req.hidden && !available) {
    return { available: false, visible: false };
  }

  return { available, visible: true };
}

/**
 * Check an array of ActionRequirementSet (OR logic).
 * Action is available if ANY set passes.
 * Action is visible if ANY set is visible.
 * Empty array = always available and visible.
 */
export function checkRequirements(
  requirements: ActionRequirementSet[],
  ctx: RequirementContext,
  actionId: string,
): RequirementResult {
  if (requirements.length === 0) {
    return { available: true, visible: true };
  }

  let anyAvailable = false;
  let anyVisible = false;

  for (const req of requirements) {
    const result = checkSingleRequirement(req, ctx, actionId);
    if (result.visible) anyVisible = true;
    if (result.available) anyAvailable = true;
  }

  return { available: anyAvailable, visible: anyVisible };
}
