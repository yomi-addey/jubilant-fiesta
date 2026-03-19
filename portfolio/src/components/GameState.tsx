import GamePieces from "./GamePieces"

interface GameStateProp {
    started: boolean
}

const GameState = ({started} : GameStateProp) => {
    return (<div>
        { started && <GamePieces />}
    </div>)
}

export default GameState;