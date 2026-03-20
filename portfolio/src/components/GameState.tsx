import GamePieces from "./GamePieces";

interface GameStateProp {
  started: boolean;
  allPages: string[];
  currPages: string[];
  setPages: (pages: string[]) => string[];
}

const GameState = ({
  started,
  allPages,
  currPages,
  setPages,
}: GameStateProp) => {
  return (
    <div>
      {started && (
        <GamePieces
          allPages={allPages}
          currentPages={currPages}
          setPages={setPages}
        />
      )}
    </div>
  );
};

export default GameState;
