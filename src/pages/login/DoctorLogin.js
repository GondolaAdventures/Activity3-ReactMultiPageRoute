// DoctorLogin.js
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './DoctorLogin.css' // Make sure the path is correct
import { ThemeContext } from '../ThemeContext'

// Define the allowed doctor email domain endings
const allowedDomains = [
  '@tf.doctor.cardio.com',
  '@tf.doctor.neuro.com',
  '@tf.doctor.pulmo.com',
  '@tf.doctor.ortho.com',
]

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext)

  // Function to extract specialty from a valid email
  const getSpecialtyFromEmail = (email) => {
    const domainPart = email.split('@')[1]; // e.g., tf.doctor.cardio.com
    const parts = domainPart.split('.'); // ['tf', 'doctor', 'cardio', 'com']
    // Assuming the structure is always tf.doctor.[specialty].com
    if (parts.length === 4 && parts[0] === 'tf' && parts[1] === 'doctor' && parts[3] === 'com') {
       // Capitalize the first letter for consistency if needed, e.g., Cardio
       const specialty = parts[2];
       return specialty.charAt(0).toUpperCase() + specialty.slice(1); 
    }
    return null; // Should not happen if validation passed, but good practice
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // 1) Validate domain
    const isValidDomain = allowedDomains.some(domain => email.endsWith(domain));
    if (!isValidDomain) {
      setError(`Please use a valid doctor email (${allowedDomains.join(', ')}).`)
      return
    }

    // Extract specialty after validation
    const specialty = getSpecialtyFromEmail(email);
    if (!specialty) {
        // This case should technically not be reached if validation passed
        setError('Could not determine specialty from email domain.'); 
        return;
    }


    setIsPending(true)
    const auth = getAuth()

    try {
      // 2) Attempt sign in
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res.user) {
        // 3) Redirect to Doctor Dashboard, passing specialty
        navigate('/doctor', { state: { specialty } })
      }
    } catch (err) {
       // Customize Firebase auth errors if desired
       if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
         setError('Invalid login credentials.');
       } else {
         setError('Failed to log in. Please try again.');
       }
       console.error("Login error:", err); // Keep console log for debugging
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className={`doctor-login-container ${theme}`}>
      <div className="landing-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <h2 className="page-title">Doctor Log In</h2>
      
      <form onSubmit={handleSubmit} className={`doctor-login-form ${theme}`}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="e.g., name@tf.doctor.cardio.com"
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