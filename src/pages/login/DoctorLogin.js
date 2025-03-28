// DoctorLogin.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './DoctorLogin.css' // Make sure the path is correct

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // 1) Validate domain
    if (!email.endsWith('@tf.doctor.com')) {
      setError('Please use a valid @tf.doctor.com email.')
      return
    }

    setIsPending(true)
    const auth = getAuth()

    try {
      // 2) Attempt sign in
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res.user) {
        // 3) Redirect to Doctor Dashboard
        navigate('/doctor')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="doctor-login-container">
      <h2 className="page-title">Doctor Log In</h2>
      
      <form onSubmit={handleSubmit} className="doctor-login-form">
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

        {!isPending && (
          <button type="submit" className="login-btn">
            Log In
          </button>
        )}
        {isPending && (
          <button type="submit" className="login-btn" disabled>
            Loading...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
