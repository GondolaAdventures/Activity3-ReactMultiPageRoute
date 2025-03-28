// Landing.js
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './ThemeContext'
import './Landing.css'

export default function Landing() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={`landing ${theme}`}>
      <div className="landing-header">
        <h1>Team Fortress Hospital</h1>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <p>Please select your role:</p>

      <div className="choose-role">
        <Link to="/doctor-login">
          <button>Doctor</button>
        </Link>
        <Link to="/patient-login">
          <button>Patient</button>
        </Link>
      </div>
    </div>
  )
}
