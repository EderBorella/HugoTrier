import React from "react";
import styles from "./TimeDisplay.module.scss";
import { useAppSelector } from "../../../app/hooks";
import {
  selectFormattedTime,
  selectDayProgress,
  selectTimePeriod,
} from "../../../features/game/gameSelectors";

/**
 * Time Display
 *
 * Reads current time from the game state and displays it in a user-friendly format.
 * TODO: Animate transitions between time periods (morning/afternoon/evening) and day progress bar.
 */

export const TimeDisplay: React.FC = () => {
  const time = useAppSelector(selectFormattedTime);
  const progress = useAppSelector(selectDayProgress);
  const period = useAppSelector(selectTimePeriod);

  const periodIcon = {
    morning: "🌅",
    afternoon: "☀️",
    evening: "🌙",
  }[period];

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{periodIcon}</div>
      <div className={styles.time}>{time}</div>
      <div className={styles.barContainer}>
        <div
          className={`${styles.progressBar} ${styles[period]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={styles.label}>{period.toUpperCase()}</span>
    </div>
  );
};
