import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsProcessing } from "../../../features/game/gameSelectors";
import { TimeDisplay } from "../../game/TimeDisplay/TimeDisplay";
import { NarrativePanel } from "../../game/NarrativePanel/NarrativePanel";
import { ActionList } from "../../game/ActionList/ActionList";
import styles from "./MainScreen.module.scss";

export const MainScreen: React.FC = () => {
  const isProcessing = useAppSelector(selectIsProcessing);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <TimeDisplay />
        <div className={styles.areaInfo}>
          <span className={styles.areaName}>Casa dos Trier</span>
          <span className={styles.areaLabel}>[AREA PLACEHOLDER]</span>
        </div>
      </header>

      {/* MAIN: CENTER WITH THREE PANELS */}
      <main className={styles.mainContent}>
        {/* TOP - MAP */}
        <section className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>
            <span className={styles.mapText}>MAP: Casa dos Trier</span>
            <span className={styles.mapDimensions}>800x200</span>
            <span className={styles.label}>[MAP PLACEHOLDER]</span>
          </div>
        </section>

        {/* MID - NARRATIVE PANEL */}
        <section className={styles.narrativeSection}>
          <NarrativePanel isActive={isProcessing} />
        </section>

        {/* BOTTOM: ACTION LIST */}
        <section className={styles.actionsSection}>
          <ActionList />
        </section>
      </main>

      {/* LEFT SIDEBAR */}
      <aside className={styles.sidebarLeft}>
        <div className={styles.placeholderBox}>
          <span>[ITEMS PLACEHOLDER]</span>
        </div>
        <div className={styles.placeholderBox}>
          <span>[BAG PLACEHOLDER]</span>
        </div>
      </aside>

      {/* RIGHT SIDEBAR */}
      <aside className={styles.sidebarRight}>
        <div className={styles.placeholderBox}>
          <span>[SKILLS PLACEHOLDER]</span>
        </div>
        <div className={styles.placeholderBox}>
          <span>[RELATIONSHIP PLACEHOLDER]</span>
        </div>
      </aside>
    </div>
  );
};
