// PatientLogin.js
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './PatientLogin.css' // Adjust the import path as needed

export default function PatientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)
    const auth = getAuth()

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res.user) {
        // Redirect patient to their home page
        navigate('/patient')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="patient-login-container">
      <h2 className="page-title">Patient Log In</h2>
      
      <form onSubmit={handleSubmit} className="patient-login-form">
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>

        {!isPending && <button className="login-btn" type="submit">Log In</button>}
        {isPending && <button className="login-btn" type="submit" disabled>Loading...</button>}

        {error && <p className="error">{error}</p>}
      </form>

      <div className="signup-link">
        <p>Don’t have an account? <Link to="/patient-signup">Sign Up</Link></p>
      </div>
    </div>
  )
}
