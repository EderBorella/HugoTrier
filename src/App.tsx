import "./App.css";
import { selectCurrentScreen } from "./features/navigation/navigationSelectors";
import { StartScreen } from "./components/screens/StartScreen/StartScreen";
import { MainScreen } from "./components/screens/MainScreen/MainScreen";
import { AwakenigScreen } from "./components/screens/AwakeningScreen/AwakeningScreen";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  advanceTime,
  resetRun,
  completeUniqueAction,
} from "./features/game/gameSlice";

const TestGameSlice = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  console.log("Game state:", game);

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>Teste M2.1 — Game Slice</h2>

      <div style={{ marginBottom: 20 }}>
        <p>Loop: {game.currentRun.loopNumber}</p>
        <p>
          Tempo: {game.currentRun.currentTime} min (06:
          {game.currentRun.currentTime.toString().padStart(2, "0")})
        </p>
        <p>Área: {game.currentRun.currentArea}</p>
        <p>PR Total: {game.meta.totalRealityPoints}</p>
        <p>PR Gasto: {game.meta.spentRealityPoints}</p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => dispatch(advanceTime(15))}>+15 min</button>
        <button onClick={() => dispatch(advanceTime(60))}>+1 hora</button>
        <button onClick={() => dispatch(completeUniqueAction("wake_up"))}>
          Completar "Acordar" (+1 PR)
        </button>
        <button onClick={() => dispatch(resetRun())}>
          Novo Loop (resetRun)
        </button>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const currentScreen = useAppSelector(selectCurrentScreen);

  return (
    <main>
      {currentScreen === "start" && <StartScreen />}
      {currentScreen === "main" && <MainScreen />}

      {/* Placeholders para telas futuras */}
      {currentScreen === "awakening" && <AwakenigScreen />}

      {currentScreen === "dialogue" && (
        <div style={{ padding: 20 }}>
          <h1>Tela: dialogue</h1>
          <p>(M3.2 — implementar DialogueScreen)</p>
        </div>
      )}

      {currentScreen === "ending" && (
        <div style={{ padding: 20 }}>
          <h1>Tela: ending</h1>
          <p>(M3.5 — implementar EndingScreen)</p>
        </div>
      )}
      <TestGameSlice />
    </main>
  );
};
