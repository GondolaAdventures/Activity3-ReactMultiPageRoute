// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Import the ThemeProvider from ThemeContext
import { ThemeProvider } from './pages/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* Wrap the App inside ThemeProvider so App.js can use the theme context */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
