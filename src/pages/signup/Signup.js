import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import styles from './Signup.module.css'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // Optionally update the user profile with a display name
      await updateProfile(res.user, { displayName })
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.signup}>
      <h2 className={styles.pageTitle}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Display Name:</span>
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            required 
          />
        </label>
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <label>
          <span>Password:</span>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
