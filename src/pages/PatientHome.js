// PatientHome.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase/config'
import './Home.css'

export default function PatientHome() {
  const [posts, setPosts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (!user) return

    // Real-time snapshot of all posts but we'll filter locally by createdBy
    const ref = collection(db, 'posts')
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      // Keep only posts where createdBy === current user
      const userPosts = results.filter(
        (post) => post.createdBy === user.uid
      )
      setPosts(userPosts)
    })
    return () => unsubscribe()
  }, [user])

  // Filter by category
  const filteredPosts = posts.filter((post) => {
    return categoryFilter ? post.category === categoryFilter : true
  })

  // Create new post
  const handleCreatePost = () => {
    navigate('/patient/create')
  }

  // Edit post
  const handleEditPost = (id) => {
    navigate(`/patient/edit/${id}`)
  }

  // Delete post
  const handleDeletePost = async (id) => {
    await deleteDoc(doc(db, 'posts', id))
  }

  // Click to see post detail (optional for patients)
  const handleCardClick = (id) => {
    navigate(`/post/${id}`)
  }

  return (
    <div className="home">
      <h2>My Posts</h2>

      <div className="patient-controls">
        <button onClick={handleCreatePost} className="create-btn">
          Create New Post
        </button>

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
          </select>
        </label>
      </div>

      {/* DISPLAY POSTS */}
      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className={`card ${post.status}`}
            >
              {/* Clicking the card can go to detail view */}
              <div onClick={() => handleCardClick(post.id)}>
                <h3>{post.content.slice(0, 50)}...</h3>
                <p>
                  <strong>Category:</strong> {post.category}
                </p>
                <p>
                  <strong>Status:</strong> {post.status}
                </p>
              </div>

              <div className="card-actions">
                <button onClick={() => handleEditPost(post.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  )
}
