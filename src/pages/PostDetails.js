// PostDetails.js
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { db } from '../firebase/config' // adjust path if needed
import './PostDetails.css'
import { ThemeContext } from './ThemeContext' // Corrected path assuming ThemeContext is in the same dir

// Define the allowed doctor email domain endings (same as in DoctorLogin)
const allowedDoctorDomains = [
  '@tf.doctor.cardio.com',
  '@tf.doctor.neuro.com',
  '@tf.doctor.pulmo.com',
  '@tf.doctor.ortho.com',
]

export default function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext)

  // Current user
  const auth = getAuth()
  const currentUser = auth.currentUser

  // --- *** UPDATED CHECK *** ---
  // Check if the current user's email ends with any of the allowed doctor domains
  const isDoctor = currentUser && allowedDoctorDomains.some(domain => currentUser.email.endsWith(domain));
  // A patient is anyone logged in who is *not* a doctor based on the above check
  const isPatient = currentUser && !isDoctor;
  // --- *** END OF UPDATE *** ---


  // 1) Fetch the post from Firestore
  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        const ref = doc(db, 'posts', id)
        const snapshot = await getDoc(ref)
        if (!snapshot.exists()) {
          setError('Post not found.')
        } else {
          // Initialize messages array if it doesn't exist in Firestore data
          const postData = snapshot.data();
          setPost({ ...postData, messages: postData.messages || [], id: snapshot.id });
        }
      } catch (err) {
        console.error("Error loading post:", err);
        setError('Failed to load the post.')
      } finally {
        setIsLoading(false);
      }
    }
    if (currentUser) { // Only load if user is logged in
       loadPost()
    } else {
        setError("You must be logged in to view post details.");
        setIsLoading(false);
        // Optional: Redirect to login after delay
        // setTimeout(() => navigate('/landing'), 3000);
    }
  }, [id, currentUser]) // Rerun if id or user changes

  // 2) Mark as resolved (doctor-only)
  const handleMarkResolved = async () => {
    if (!post || !isDoctor) return; // Extra check for isDoctor
    try {
      const ref = doc(db, 'posts', post.id)
      await updateDoc(ref, { status: 'resolved' })
      // Update local state immediately for responsiveness
      setPost(prev => ({ ...prev, status: 'resolved' }))
    } catch (err) {
      console.error("Error marking resolved:", err);
      setError('Could not update post status.')
    }
  }

  // 3) Send a new message (doctor or patient)
  const handleSendMessage = async () => {
    // Ensure user, post exist, and message is not empty
    if (!currentUser || !post || !newMessage.trim()) {
        if (!newMessage.trim()) setError("Message cannot be empty.");
        return;
    }
     setError(null); // Clear previous errors

    try {
      // Build the new message object - this part correctly uses the updated isDoctor check
      const messageObj = {
        authorId: currentUser.uid,
        // authorName: currentUser.displayName || currentUser.email, // Optional: store display name or email
        authorRole: isDoctor ? 'doctor' : 'patient',
        text: newMessage.trim(),
        timestamp: new Date() // Use Firestore Server Timestamp for better consistency if preferred: serverTimestamp()
      }

      // Ensure post.messages is an array before spreading
      const existingMessages = Array.isArray(post.messages) ? post.messages : [];
      const updatedMessages = [...existingMessages, messageObj]

      // Update in Firestore
      const ref = doc(db, 'posts', post.id)
      await updateDoc(ref, { messages: updatedMessages })

      // Update local state immediately
      setPost(prev => ({ ...prev, messages: updatedMessages }))
      setNewMessage('') // Clear the input field
    } catch (err) {
      console.error("Error sending message:", err);
      setError('Could not send message. Please try again.')
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/landing'); // Or appropriate login page
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to log out."); // Show error to user
    }
  };

  // 4) Render the component
  // Handle loading/error states before accessing post data
  if (isLoading) return <div className={`post-details-container ${theme} post-details-loading`}>Loading...</div>
  if (error) return <div className={`post-details-container ${theme} post-details-error`}>{error}</div>
  if (!post) return <div className={`post-details-container ${theme}`}>Post data is not available.</div> // Should be covered by error/loading but good fallback

  return (
    <div className={`post-details-container ${theme}`}>
      {/* Header with Theme Toggle and Logout */}
      <div className="landing-header">
        {currentUser && ( // Only show buttons if logged in
          <>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
         {!currentUser && ( // Optional: Link to login if not logged in
           <button onClick={() => navigate('/landing')}>Go to Login</button>
         )}
      </div>

      {/* Post Information */}
      <h2>Post Details</h2>
      <div className="post-info">
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Status:</strong> <span className={`status-${post.status}`}>{post.status}</span></p>
        <p><strong>Created by:</strong> {post.createdByName || 'Patient'}</p> {/* Default to 'Patient' if name missing */}
        <p className="post-content"><strong>Content:</strong> {post.content}</p>
      </div>


      {/* Conversation Thread */}
      <div className="messages-thread">
        <h4>Conversation</h4>
        {post.messages && post.messages.length > 0 ? (
          post.messages.map((msg, idx) => (
            // Ensure msg and authorRole exist before accessing
            msg && msg.authorRole && (
              <div key={idx} className={`message ${msg.authorRole}`}>
                <p>
                  {/* Display role with capitalization */}
                  <strong>{msg.authorRole.charAt(0).toUpperCase() + msg.authorRole.slice(1)}:</strong>
                  {' '}
                  {msg.text}
                   {/* Optional: Display timestamp */}
                   {/* <span className="message-timestamp">{msg.timestamp?.toDate().toLocaleString()}</span> */}
                </p>
              </div>
            )
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      {/* Reply Section - only show if logged in */}
      {currentUser && (
        <div className="reply-section">
          {/* Doctor can mark unresolved as resolved */}
          {isDoctor && post.status === 'unresolved' && (
            <button
              onClick={handleMarkResolved}
              className="resolve-btn action-btn" // Added common class for styling
            >
              Mark as Resolved
            </button>
          )}

          {/* Reply Text Area and Send Button */}
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows="3" // Give a bit more space
          />
          <button onClick={handleSendMessage} className="reply-btn action-btn">
            Send Message
          </button>
        </div>
      )}
       {/* Show message if not logged in */}
       {!currentUser && (
           <p className="login-prompt">Please log in to participate in the conversation.</p>
       )}
    </div>
  )
}