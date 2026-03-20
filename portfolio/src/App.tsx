import { useState } from "react";
import GameState from "./components/GameState";
import "./App.css";

function App() {
  const everyPage = ["About", "Experience", "Projects"];
  const [started, setStarted] = useState(true);
  const [availablePages, setPages] = useState<string[]>([]);

  const handleSkipButton = () => {
    setPages(everyPage);
  };

  const startGame = () => {
    setStarted(true)
  }

  return (
    <>
      <GameState
        started={started}
        allPages={everyPage}
        currPages={availablePages}
        setPages={setPages}
      />
      <button onClick={handleSkipButton}>
        I don't wanna play. Just show me the navigation.
      </button>
      <button onClick={startGame}>
        Start playing
      </button>
    </>
  );
}

export default App;
