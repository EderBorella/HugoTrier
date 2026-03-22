// src/components/screens/MainScreen/MainScreen.tsx (atualizado)

import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setScreen } from "../../../features/navigation/navigationSlice";
import { ScreenType } from "../../../types/game";
import { TimeDisplay } from "../../game/TimeDisplay/TimeDisplay";
import { NarrativePanel } from "../../game/NarrativePanel/NarrativePanel";
import { ActionList } from "../../game/ActionList/ActionList";
import styles from "./MainScreen.module.scss";
import { advanceTime } from "../../../features/game/gameSlice";

export const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleBackToStart = () => {
    dispatch(setScreen(ScreenType.START));
  };

  const handleGoToAwakening = () => {
    dispatch(setScreen(ScreenType.AWAKENING));
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <TimeDisplay time="06:00 AM" />
        <div className={styles.areaInfo}>
          <span className={styles.areaName}>Trier's House</span>
          <span className={styles.areaLabel}>[AREA PLACEHOLDER]</span>
        </div>
      </header>

      {/* ============================================ */}
      {/* MAIN: CENTER WITH THREE PANELS */}
      {/* ============================================ */}
      <main className={styles.mainContent}>
        {/* TOP - MAP */}
        <section className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>
            <span className={styles.mapText}>MAP: Trier's House</span>
            <span className={styles.mapDimensions}>800×200</span>
            <span className={styles.label}>[MAP PLACEHOLDER]</span>
          </div>
        </section>

        {/* MID - NARRATIVE PANEL */}
        <section className={styles.narrativeSection}>
          <NarrativePanel isActive={false} />
        </section>

        {/* BOTTON: ACTION LIST */}
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

      {/* FOOTER TEST */}
      <footer className={styles.testNav}>
        <button onClick={handleBackToStart} className={styles.testButton}>
          ← Back (Test M1)
        </button>
        <button onClick={handleGoToAwakening} className={styles.testButton}>
          Go to Awakening (Test M1.5) →
        </button>
        <button
          onClick={() => dispatch(advanceTime(60))}
          className={styles.testButton}
        >
          +1h (Teste)
        </button>
        <button
          onClick={() => dispatch(advanceTime(240))}
          className={styles.testButton}
        >
          +4h (Teste)
        </button>
      </footer>
    </div>
  );
};
