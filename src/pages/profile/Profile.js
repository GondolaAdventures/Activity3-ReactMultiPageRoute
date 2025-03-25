import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.css'

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const auth = getAuth()
  const db = getFirestore()

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const userRef = doc(db, "users", user.uid)
      getDoc(userRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            setUserData(docSnap.data())
          }
        })
        .catch(error => console.error("Error fetching user data:", error))
    } else {
      navigate('/login')
    }
  }, [auth, db, navigate])

  if (!userData) return <div>Loading...</div>

  return (
    <div className={styles.profile}>
      <h2 className={styles.pageTitle}>Profile</h2>
      <p className={styles.profileInfo}>
        <strong>Name:</strong> {userData.name || "N/A"}
      </p>
      <p className={styles.profileInfo}>
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  )
}
