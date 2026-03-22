import React from "react";
import styles from "./NarrativePanel.module.scss";

interface NarrativePanelProps {
  text?: string;
  isActive: boolean;
}

export const NarrativePanel: React.FC<NarrativePanelProps> = ({
  text,
  isActive = false,
}) => {
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
            <div className={styles.progressFill} style={{ width: "0%" }} />
          </div>
          <span className={styles.progressLabel}>Executando...</span>
        </div>
      )}

      <span className={styles.label}>[PAINEL NARRATIVO PLACEHOLDER]</span>
    </div>
  );
};
