// DoctorDashboard.js
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config' // adjust as needed
import './Home.css' // shared css
import { ThemeContext } from './ThemeContext' // Corrected path assuming ThemeContext is in the same dir
import { getAuth, signOut } from 'firebase/auth'

export default function DoctorDashboard() {
  const [posts, setPosts] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate()
  const location = useLocation() // Hook to get state passed during navigation
  const { theme, toggleTheme } = useContext(ThemeContext)
  const auth = getAuth()

  // Get the doctor's specialty passed from the login component
  const doctorSpecialty = location.state?.specialty; // e.g., "Cardio"

  // Fetch posts filtered by the doctor's specialty
  useEffect(() => {
    // Ensure specialty is available before querying
    if (!doctorSpecialty) {
      setError("Doctor specialty not found. Please log in again.");
      setIsLoading(false);
      // Optional: redirect back to login after a delay or show error prominently
      // setTimeout(() => navigate('/doctor-login'), 3000); 
      return; // Stop execution if no specialty
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    // Create a query to fetch posts matching the doctor's specialty
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('category', '==', doctorSpecialty)); // Filter by category

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      setPosts(results)
      setIsLoading(false);
    }, (err) => { // Handle potential errors during snapshot listening
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setIsLoading(false);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe()

  }, [doctorSpecialty]) // Rerun effect if doctorSpecialty changes (though it shouldn't normally after login)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/landing'); // Navigate to landing or login page after logout
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to log out."); // Show error to user
    }
  };

  // Filter by status (category filter is now handled by the Firestore query)
  const filteredPosts = posts.filter((post) => {
    const matchesStatus = statusFilter
      ? post.status === statusFilter
      : true
    // No need for category check here anymore
    return matchesStatus
  })

  // Handle card click to view post details
  const handleCardClick = (id) => {
    navigate(`/post/${id}`) // Assuming you have a route like /post/:postId
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
      {/* Display the specific dashboard title */}
      <h2>{doctorSpecialty ? `${doctorSpecialty} Doctor Dashboard` : 'Doctor Dashboard'}</h2>

      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}


      {/* FILTER CONTROLS - Only Status Filter */}
      <div className="filter-controls">
         {/* Removed Category Filter */}
        <label>
          <span>Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={isLoading} // Disable while loading
          >
            <option value="">-- All Status --</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>
      </div>

      {/* POSTS LIST */}
      <div className="posts-list">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`card ${post.status}`} // Keep status class for styling
              onClick={() => handleCardClick(post.id)}
              style={{ cursor: 'pointer' }} // Indicate clickable
            >
              {/* Show more relevant info */}
              <h3>Post ID: {post.id.substring(0, 8)}...</h3>
              <p><strong>Content Preview:</strong> {post.content.slice(0, 70)}...</p>
              {/* Category is implicit now, but maybe still show it? */}
              {/* <p><strong>Category:</strong> {post.category}</p> */}
              <p><strong>Created By:</strong> {post.createdByName || 'Unknown User'}</p>
              <p><strong>Status:</strong> {post.status}</p>
              {/* You might want to add a timestamp */}
              {/* <p><strong>Created At:</strong> {post.createdAt?.toDate().toLocaleString()}</p> */}
            </div>
          ))
        ) : (
          // Check if the initial load finished and still no posts
          !isLoading && <p>No posts found matching your specialty ({doctorSpecialty}) and filter criteria.</p>
        )}
      </div>
    </div>
  )
}