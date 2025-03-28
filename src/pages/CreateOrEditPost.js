// CreateOrEditPost.js
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { db } from '../firebase/config'
import './CreateOrEditPost.css'
import { ThemeContext } from './ThemeContext'

export default function CreateOrEditPost() {
  const { id } = useParams()              // If this exists, we’re editing
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser
  const { theme, toggleTheme } = useContext(ThemeContext)

  // Form fields
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [pageTitle, setPageTitle] = useState('Create a New Post')

  // You can define your category options here or fetch from somewhere
  const categories = ['Cardio', 'Neuro', 'Pulmo', 'Ortho']

  // 1) If we have an ID, fetch existing post to edit
  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        setPageTitle('Edit Your Post')
        try {
          const ref = doc(db, 'posts', id)
          const snapshot = await getDoc(ref)
          if (snapshot.exists()) {
            const existingPost = snapshot.data()
            // Pre-fill form
            setContent(existingPost.content)
            setCategory(existingPost.category)
          } else {
            setError('Post not found.')
          }
        } catch (err) {
          setError('Failed to load post data.')
        }
      }
    }
    loadPost()
  }, [id])

  // 2) Handle submit for both create & edit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!category) {
      setError('Please select a category.')
      return
    }

    setIsPending(true)
    try {
      if (!user) {
        setError('User not logged in.')
        setIsPending(false)
        return
      }

      if (id) {
        // EDIT MODE: update existing doc
        const ref = doc(db, 'posts', id)
        await updateDoc(ref, {
          content,
          category
          // We might keep status as is, or allow user to set it, up to you
        })
      } else {
        // CREATE MODE: add a new doc
        const ref = collection(db, 'posts')
        await addDoc(ref, {
          content,
          category,
          status: 'unresolved',      // default
          createdBy: user.uid,       // who made this post
          createdByName: user.displayName || 'Anonymous',
          createdAt: new Date()      // optional if you want a timestamp
        })
      }

      // 3) Navigate back to patient home (or wherever you'd like)
      navigate('/patient')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/landing');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // 4) Render any error or the form
  if (error) {
    return (
      <div className={`create-or-edit ${theme}`}>
        <div className="landing-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
        <h2 className="page-title">{pageTitle}</h2>
        <p className="error">{error}</p>
      </div>
    )
  }

  return (
    <div className={`create-or-edit ${theme}`}>
      <div className="landing-header">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <h2 className="page-title">{pageTitle}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Post Content:</span>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
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

        {!isPending && (
          <button type="submit" class = "createbtn">
            {id ? 'Update Post' : 'Create Post'}
          </button>
        )}
        {isPending && (
          <button  class = "createbtn" type="submit" disabled>
            Saving...
          </button>
        )}
      </form>
    </div>
  )
}
