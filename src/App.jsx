import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [tempo, setTempo] = useState(60)

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
      <div class="slidecontainer">
        <input type="range" min="10" max="300" value="60" class="slider" id="myRange"></input>
      </div>
      <h1>Vite + React test</h1>
      <div className="card">
        <button id="ticker" onClick={() => setTempo((tempo) => tempo + 1)}>
          count is {tempo}
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
