import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setScreen } from "../../../features/navigation/navigationSlice";
import { ScreenType } from "../../../types/game";
import styles from "./StartScreen.module.scss";

export const StartScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleNewGame = () => {
    dispatch(setScreen(ScreenType.MAIN));
  };

  const handleContinue = () => {
    // Lógica para continuar o jogo (ex: carregar progresso salvo)
    alert("Funcionalidade de continuar jogo ainda não implementada.");
  };

  const handleLoad = () => {
    // Lógica para carregar um jogo salvo
    alert("Funcionalidade de carregar jogo ainda não implementada.");
  };

  return (
    <div className={styles.container}>
      {/*============================= */}
      {/* LOGO */}
      {/*============================= */}
      <div className={styles.logoPlaceholder}>
        <span className={styles.logoText}>HUGO TRIER</span>
        <span className={styles.logoSubtext}> Chapter 1</span>
        <span className={styles.placeholderLabel}>[LOGO PLACEHOLDER]</span>
      </div>

      {/*============================= */}
      {/* MENU */}
      {/*============================= */}
      <nav className={styles.menu} role="navigation" aria-label="Main Menu">
        <button
          className={`${styles.button} ${styles.primary}`}
          onClick={handleNewGame}
          aria-label="New game"
        >
          Novo jogo
        </button>
        <button
          className={styles.button}
          onClick={handleContinue}
          aria-label="Continue game"
        >
          Continuar
        </button>
        <button
          className={styles.button}
          onClick={handleLoad}
          aria-label="Load game"
        >
          Carregar
        </button>
      </nav>

      {/*============================= */}
      {/* COLLAPSABLE MENU */}
      {/*============================= */}
      <div className={styles.settingsPlaceholder}>
        <button
          className={styles.iconButton}
          aria-label="Settings"
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/*============================= */}
      {/* FOOTER */}
      {/*============================= */}
      <footer className={styles.footer}>
        <span className={styles.footerText}>
          V0.1 - © 2026 Hugo Trier. All rights reserved.
        </span>
      </footer>
    </div>
  );
};
