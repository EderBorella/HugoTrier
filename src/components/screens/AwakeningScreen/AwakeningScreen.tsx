import { useAppDispatch } from "../../../app/hooks";
import { setScreen } from "../../../features/navigation/navigationSlice";
import { ScreenType } from "../../../types/game";
import styles from "./AwakeningScreen.module.scss";

export const AwakeningScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleStartDay = () => {
    dispatch(setScreen(ScreenType.MAIN));
  };

  return (
    <div className={styles.container}>
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header className={styles.header}>
        <h1 className={styles.title}>O Despertar</h1>
        <span className={styles.subtitle}>Um ponto fora do tempo.</span>
      </header>

      {/* ============================================ */}
      {/* NARRATIVE SESSION */}
      {/* ============================================ */}
      <section className={styles.narrativeSection}>
        <div className={styles.narrativeBox}>
          <p className={styles.narrativeText}>
            Você desperta em sua cama. O sol da manhã entra pela janela,
            exatamente como ontem. Mas diferente.
          </p>
          <p className={styles.narrativeText}>
            A invasão. A morte. O vazio. E agora, a chance de tentar novamente,
            um pouco mais preparado.
          </p>
          <span className={styles.label}>[NARRATIVE PLACEHOLDER]</span>
        </div>
      </section>

      {/* ============================================ */}
      {/* REALITY POINTS SESSION */}
      {/* ============================================ */}
      <section className={styles.prSection}>
        <div className={styles.prDisplay}>
          <span className={styles.prLabel}>Pontos de Realidade</span>
          <span className={styles.prValue}>0</span>
          <span className={styles.prHint}>
            (ganhe ao completar ações únicas)
          </span>
        </div>
        <span className={styles.label}>[PR PLACEHOLDER]</span>
      </section>

      {/* ============================================ */}
      {/* SKILLS SESSION */}
      {/* ============================================ */}
      <section className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Melhorias</h2>
        <span className={styles.label}>[LISTA PLACEHOLDER]</span>

        <div className={styles.skillList}>
          {/* Placeholder: future skills */}
          <div className={styles.skillCard}>
            <span className={styles.skillName}>Força +1</span>
            <span className={styles.skillCost}>3 PR</span>
            <span className={styles.skillDesc}>
              Aumenta atributo permanentemente
            </span>
            <button className={styles.buyButton} disabled>
              Comprar
            </button>
          </div>

          <div className={styles.skillCard}>
            <span className={styles.skillName}>Memória do Baú</span>
            <span className={styles.skillCost}>2 PR</span>
            <span className={styles.skillDesc}>Comece com 50 ouro</span>
            <button className={styles.buyButton} disabled>
              Comprar
            </button>
          </div>

          <div className={styles.skillCard}>
            <span className={styles.skillName}>Fluxo Temporal</span>
            <span className={styles.skillCost}>5 PR</span>
            <span className={styles.skillDesc}>Enfileire até 5 ações</span>
            <button className={styles.buyButton} disabled>
              Comprar
            </button>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ATTRIBUTES */}
      {/* ============================================ */}
      <section className={styles.attributesSection}>
        <h2 className={styles.sectionTitle}>Atributos</h2>
        <span className={styles.label}>[ATRIBUTOS PLACEHOLDER]</span>

        <div className={styles.attributesGrid}>
          <div className={styles.attributeBox}>
            <span className={styles.attrName}>Força</span>
            <span className={styles.attrValue}>0</span>
          </div>
          <div className={styles.attributeBox}>
            <span className={styles.attrName}>Destreza</span>
            <span className={styles.attrValue}>0</span>
          </div>
          <div className={styles.attributeBox}>
            <span className={styles.attrName}>Inteligência</span>
            <span className={styles.attrValue}>0</span>
          </div>
          <div className={styles.attributeBox}>
            <span className={styles.attrName}>Carisma</span>
            <span className={styles.attrValue}>0</span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROFICIENCES */}
      {/* ============================================ */}
      <section className={styles.proficiencySection}>
        <h2 className={styles.sectionTitle}>Proficiências</h2>
        <span className={styles.label}>[PROF PLACEHOLDER]</span>

        <div className={styles.profList}>
          <div className={styles.profItem}>
            <span>Esgrima: 0</span>
          </div>
          <div className={styles.profItem}>
            <span>Arquearia: 0</span>
          </div>
          <div className={styles.profItem}>
            <span>Magia: 0</span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MAIN ACTION */}
      {/* ============================================ */}
      <footer className={styles.actionArea}>
        <button className={styles.startButton} onClick={handleStartDay}>
          Iniciar Dia
        </button>

        {/* Test button: remove before release */}
        <button className={styles.testButton} onClick={handleStartDay}>
          ← Voltar (Teste)
        </button>
      </footer>
    </div>
  );
};
