import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectAreaActions } from "../../../features/game/gameSelectors";
import { ActionButton } from "../ActionButton/ActionButton";
import styles from "./ActionList.module.scss";

export const ActionList: React.FC = () => {
  const areaActions = useAppSelector(selectAreaActions);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Ações Disponíveis</h3>
        <span className={styles.count}>{areaActions.length}</span>
      </div>

      <div className={styles.list}>
        {areaActions.map((action) => (
          <ActionButton
            key={action.definition.id}
            definition={action.definition}
            available={action.available}
          />
        ))}
      </div>

      {areaActions.length === 0 && (
        <p className={styles.label}>Nenhuma ação disponível aqui.</p>
      )}
    </div>
  );
};
