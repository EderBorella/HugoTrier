import React, { useState, useEffect } from "react";
import styles from "./NarrativePanel.module.scss";

interface NarrativePanelProps {
  text?: string;
  isActive: boolean;
  duration: number;
}

export const NarrativePanel: React.FC<NarrativePanelProps> = ({
  text,
  isActive = false,
  duration = 0,
}) => {
  const [started, setStarted] = useState(false);

  // Start CSS transition on the next frame after mount/activation
  useEffect(() => {
    if (isActive && duration > 0) {
      setStarted(false);
      const raf = requestAnimationFrame(() => {
        setStarted(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setStarted(false);
    }
  }, [isActive, duration]);

  const placeholderText =
    text ||
    "Hugo acorda em sua cama. O sol entra pela janela. " +
      "Algo parece estranho, mas ele não consegue identificar o quê. " +
      "Escolha uma ação abaixo para começar.";

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <div className={styles.textArea}>
        <p className={styles.text}>{placeholderText}</p>
      </div>

      {isActive && (
        <div className={styles.progressArea}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: started ? "100%" : "0%",
                transition: started
                  ? `width ${duration}ms linear`
                  : "none",
              }}
            />
          </div>
          <span className={styles.progressLabel}>Executando...</span>
        </div>
      )}

      <span className={styles.label}>[PAINEL NARRATIVO PLACEHOLDER]</span>
    </div>
  );
};
