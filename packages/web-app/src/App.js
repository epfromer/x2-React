import React from 'react'
import './App.css'
import { HelloWorld } from '@foo/shared'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {HelloWorld}, web-app
        </p>
      </header>
    </div>
  )
}

export default App
