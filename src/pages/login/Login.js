import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()  
    setIsPending(true)
    setError(null)
    const auth = getAuth()
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res.user) {
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.pageTitle}>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
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
        { !isPending && <button type="submit">Login</button> }
        { isPending && <button type="submit" disabled>Loading...</button> }
        { error && <p className={styles.error}>{error}</p> }
      </form>
      <div className={styles.signupLink}>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
