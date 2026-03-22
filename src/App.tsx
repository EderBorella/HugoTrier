import "./App.css";
import { selectCurrentScreen } from "./features/navigation/navigationSelectors";
import { StartScreen } from "./components/screens/StartScreen/StartScreen";
import { MainScreen } from "./components/screens/MainScreen/MainScreen";
import { AwakeningScreen } from "./components/screens/AwakeningScreen/AwakeningScreen";
import { useAppSelector } from "./app/hooks";

export const App: React.FC = () => {
  const currentScreen = useAppSelector(selectCurrentScreen);

  return (
    <main>
      {currentScreen === "start" && <StartScreen />}
      {currentScreen === "main" && <MainScreen />}
      {currentScreen === "awakening" && <AwakeningScreen />}

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
    </main>
  );
};
