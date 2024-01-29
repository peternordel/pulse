import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [tempo, setTempo] = useState(60)

  function handleChange(e) {
    console.log(e.target.value)
    console.log("ticker function")
    setTempo(e.target.value)
  }

  function handleClick(e) {
    console.log(e)
    console.log("click function")
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="slidecontainer">
        <input type="range" min="10" max="300" value={tempo} className="slider" id="ticker" onChange={(e) => handleChange(e)} onClick={(e) => handleClick(e)}></input>
      </div>
      <h1>Pulse</h1>
      <div className="card">
        <button id="ticker" onClick={() => handleClick}>
          tempo is {tempo}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
