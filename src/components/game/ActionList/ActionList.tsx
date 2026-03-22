import React from "react";
import styles from "./ActionList.module.scss";

export const ActionList: React.FC = () => {
  const placeholderActions = [
    {
      id: "wake_up",
      name: "Acordar",
      time: 15,
      color: "#d4af37",
      type: "unique",
    },
    {
      id: "check_window",
      name: "Olhar pela janela",
      time: 5,
      color: "#9b59b6",
      type: "discovery",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Ações Disponíveis</h3>
        <span className={styles.count}>{placeholderActions.length}</span>
      </div>

      <span className={styles.label}>[LISTA PLACEHOLDER]</span>

      <div className={styles.list}>
        {placeholderActions.map((action) => (
          <button
            key={action.id}
            className={`${styles.actionButton} ${styles[action.type]}`}
            style={{ "--action-color": action.color } as React.CSSProperties}
            disabled
          >
            <span className={styles.name}>{action.name}</span>
            <span className={styles.meta}>
              <span className={styles.type}>{action.type}</span>
              <span className={styles.time}>⏱️ {action.time}min</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
