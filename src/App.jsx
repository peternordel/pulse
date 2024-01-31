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
    }
    else {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setIsTicking(isTicking => !isTicking)
  }

  function handleChange (e) {
    setTempo(e.target.value)
    if (isTicking) {
      clearInterval(intervalId)
      setIntervalId(setInterval(() => sound.play(), 60000/e.target.value))
    }
  }

  return (
    <div id="root">
      <h1>Pulse</h1>
      <div className="slidecontainer">
        <input type="range" min="10" max="300" orient="circular" step="1" value={tempo} className="slider" id="ticker" onChange={handleChange}></input>
        <button id="counter" onClick={handleClick}>{tempo}</button>
      </div>
    </div>
  )
}
