import { useState } from 'react'
import tick from './assets/tick.wav'
import './App.css'
import Knob from './knob.jsx'

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
    //changes the tempo immediately if already ticking
    if (isTicking) {
      clearInterval(intervalId)
      setIntervalId(setInterval(() => sound.play(), 60000/e.target.value))
    }
  }

  return (
    <>
      <div className="slidecontainer">
        <Knob
          degrees={350}
          min={10}
          max={300}
          value={0}
          size={750}
        />
        <button id="counter" onClick={handleClick}>{tempo}</button>
      </div>
      {/* <div>
        <input type="range" min="10" max="300" orient="circular" step="1" value={tempo} className="slider" id="ticker" onChange={handleChange}></input>
        <button id="counter" onClick={handleClick}>{tempo}</button>
      </div> */}
    </>
  )
}
