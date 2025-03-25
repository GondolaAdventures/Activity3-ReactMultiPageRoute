// File: src/App.js

import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom'
import './App.css'

// Firebase imports
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Page components
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Article from './pages/Article'
import FormArticle from './pages/FormArticle'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'  // New import for the Signup page

function App() {
  // Track user authentication status
  const [user, setUser] = useState(null)
  // Track whether we've finished checking auth state
  const [initializing, setInitializing] = useState(true)

  // Listen for auth state changes once the component mounts
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setInitializing(false)
    })
    // Cleanup the listener on unmount
    return () => unsubscribe()
  }, [])

  // Show a loading indicator while checking auth status
  if (initializing) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>My Articles</h1>
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/new">New Article</NavLink>
          </div>
        </nav>

        {/* Define routes with conditional access */}
        <Routes>
          {/* Protected routes (require user to be logged in) */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/articles/:urlId" element={user ? <Article /> : <Navigate to="/login" />} />
          <Route path="/edit/:urlId" element={user ? <FormArticle /> : <Navigate to="/login" />} />
          <Route path="/new" element={user ? <FormArticle /> : <Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

          {/* Catch-all: redirect unknown paths to Home (which is also protected) */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
