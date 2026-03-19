import { useState } from 'react'
import GameState from './components/GameState'
import './App.css'

function App() {
  const [started, setStarted] = useState(true)

  return (
    <>
      <GameState started={started}/>
    </>
  )
}

export default App;
