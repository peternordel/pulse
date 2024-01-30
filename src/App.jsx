import { useState } from 'react'
import tick from './assets/tick.wav'
import './App.css'

export default function App() {
  const [tempo, setTempo] = useState(60)
  const [isTicking, setIsTicking] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const sound = new Audio(tick)

  //handleClick will toggle ticking mode to inverse (i.e. if it currently is ticking, will change to not ticking, and vice versa)
  function handleClick() {
    if (!isTicking) {
      //handles first tick so it plays immediately
      sound.play()
      //handles all future ticks
      setIntervalId(setInterval(() => sound.play(), 60000/tempo))
      setIsTicking(isTicking => !isTicking)
    } else {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsTicking(isTicking => !isTicking)
    }
  }

  return (
    <>
      <div>
        <h1>Pulse</h1>
      </div>
      <div className="slidecontainer">
        <input type="range" min="10" max="300" value={tempo} className="slider" id="ticker" onChange={(e) => setTempo(e.target.value)}></input>
      </div>
      <div className="card">
        <button id="counter" onClick={handleClick}>
          {tempo}
        </button>
      </div>
    </>
  )
}
