import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  advanceTime,
  incrementActionCounter,
  completeUniqueAction,
  addFlag,
  startAction,
  finishAction,
  travelToArea,
} from "../../../features/game/gameSlice";
import { selectIsProcessing } from "../../../features/game/gameSelectors";
import { ActionType } from "../../../types/actions";
import type { GameActionDefinition } from "../../../types/actions";
import type { AreaId } from "../../../types/game";
import styles from "./ActionButton.module.scss";

const ACTION_COLORS: Record<string, string> = {
  [ActionType.UNIQUE]: "#d4af37",
  [ActionType.TEMPORAL]: "#c0c0c0",
  [ActionType.INTERACTION]: "#4a90d9",
  [ActionType.TRAINING]: "#5cb85c",
  [ActionType.TRAVEL]: "#f0ad4e",
  [ActionType.DISCOVERY]: "#9b59b6",
};

interface ActionButtonProps {
  definition: GameActionDefinition;
  available: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  definition,
  available,
}) => {
  const dispatch = useAppDispatch();
  const isProcessing = useAppSelector(selectIsProcessing);
  const isDisabled = !available || isProcessing;

  const handleClick = useCallback(() => {
    if (isDisabled) return;

    dispatch(startAction(definition.id));

    // Advance time
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

    dispatch(finishAction());
  }, [dispatch, definition, isDisabled]);

  const color = ACTION_COLORS[definition.type] ?? "#2c3e50";

  return (
    <button
      className={`${styles.actionButton} ${isDisabled ? styles.disabled : ""}`}
      style={{ "--action-color": color } as React.CSSProperties}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span className={styles.name}>{definition.nameKey}</span>
      <span className={styles.meta}>
        <span className={styles.type}>{definition.type}</span>
        {definition.cost.time != null && (
          <span className={styles.time}>{definition.cost.time}min</span>
        )}
      </span>
    </button>
  );
};
