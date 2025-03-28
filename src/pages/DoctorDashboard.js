// DoctorDashboard.js
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config' // adjust as needed
import './Home.css' // shared css
import { ThemeContext } from './ThemeContext'
import { getAuth, signOut } from 'firebase/auth'

export default function DoctorDashboard() {
  const [posts, setPosts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const navigate = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const auth = getAuth()

  // Fetch all posts (since doctor sees all)
  useEffect(() => {
    const ref = collection(db, 'posts')
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      setPosts(results)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/landing');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Filter by category and status
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = categoryFilter
      ? post.category === categoryFilter
      : true
    const matchesStatus = statusFilter
      ? post.status === statusFilter
      : true

    return matchesCategory && matchesStatus
  })

  // Handle card click to view post details
  const handleCardClick = (id) => {
    navigate(`/post/${id}`)
  }

  return (
    <div className={`home ${theme}`}>
      <div className="landing-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <h2>Doctor Dashboard</h2>

      {/* FILTER CONTROLS */}
      <div className="filter-controls">
        <label>
          <span>Filter by Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">-- All Categories --</option>
            <option value="Cardio">Cardio</option>
            <option value="Neuro">Neuro</option>
            <option value="Pulmo">Pulmo</option>
            <option value="Ortho">Ortho</option>
            {/* Add more categories if desired */}
          </select>
        </label>

        <label>
          <span>Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">-- All Status --</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>
      </div>

      {/* POSTS LIST */}
      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`card ${post.status}`} 
              onClick={() => handleCardClick(post.id)}
            >
              <h3>{post.content.slice(0, 50)}...</h3>
              <p>
                <strong>Category:</strong> {post.category}
              </p>
              <p>
                <strong>Created By:</strong> {post.createdByName}
              </p>
              <p>
                <strong>Status:</strong> {post.status}
              </p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  )
}
