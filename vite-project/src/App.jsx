// src/App.jsx
import React from 'react'

function App() {
  return (
    <div className="container py-5">
      <h1 className="display-4 text-primary mb-4">Bootstrap is working ✅</h1>

      <div className="mb-3">
        <button className="btn btn-primary me-2">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sample Card</h5>
          <p className="card-text">This is a simple card to verify Bootstrap styles.</p>
        </div>
      </div>
    </div>
  )
}

export default App
