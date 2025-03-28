// PatientSignup.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config' // adjust path as needed
import './PatientSignup.css' // Or rename as you like

export default function PatientSignup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('') // Sickness category
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()
  
  // You can define a set of categories or fetch from elsewhere
  const categories = ['Cardio', 'Neuro', 'Pulmo', 'Ortho']

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Make sure a category is selected
    if (!category) {
      setError('Please select a sickness category.')
      return
    }

    setIsPending(true)
    setError(null)
    const auth = getAuth()

    try {
      // 1) Create user in Firebase Auth
      const res = await createUserWithEmailAndPassword(auth, email, password)

      // 2) Update displayName in Firebase Auth
      await updateProfile(res.user, { displayName })

      // 3) Store extra user info in Firestore (e.g., role, category)
      const userRef = doc(db, 'users', res.user.uid)
      await setDoc(userRef, {
        displayName,
        email,
        category,
        role: 'patient',  // optional, for clarity
      })

      // 4) Redirect to patient home (or wherever)
      navigate('/patient')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="patient-signup">
      <h2 className="page-title">Patient Sign Up</h2>
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

        <label>
          <span>Sickness Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        {!isPending && <button type="submit">Sign Up</button>}
        {isPending && <button type="submit" disabled>Loading...</button>}
      </form>
    </div>
  )
}
