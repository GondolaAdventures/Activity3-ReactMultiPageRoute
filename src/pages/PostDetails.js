// PostDetails.js
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase/config' // adjust path if needed
import './PostDetails.css'

export default function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Current user
  const auth = getAuth()
  const currentUser = auth.currentUser

  // Helper booleans
  const isDoctor = currentUser && currentUser.email.endsWith('@tf.doctor.com')
  const isPatient = currentUser && !isDoctor

  // 1) Fetch the post from Firestore
  useEffect(() => {
    const loadPost = async () => {
      try {
        const ref = doc(db, 'posts', id)
        const snapshot = await getDoc(ref)
        if (!snapshot.exists()) {
          setError('Post not found.')
          return
        }
        setPost({ ...snapshot.data(), id: snapshot.id })
      } catch (err) {
        setError('Failed to load the post.')
      }
    }
    loadPost()
  }, [id])

  // 2) Mark as resolved (doctor-only)
  const handleMarkResolved = async () => {
    if (!post) return
    try {
      const ref = doc(db, 'posts', post.id)
      await updateDoc(ref, { status: 'resolved' })
      setPost(prev => ({ ...prev, status: 'resolved' }))
    } catch (err) {
      setError('Could not update post status.')
    }
  }

  // 3) Send a new message (doctor or patient)
  const handleSendMessage = async () => {
    if (!post) return
    if (!newMessage.trim()) return

    try {
      // Build the new message object
      const messageObj = {
        authorId: currentUser.uid,
        authorRole: isDoctor ? 'doctor' : 'patient',
        text: newMessage.trim(),
        timestamp: new Date().toISOString() // or new Date()
      }

      // Merge into existing array or create a new one
      const existingMessages = post.messages || []
      const updatedMessages = [...existingMessages, messageObj]

      // Update in Firestore
      const ref = doc(db, 'posts', post.id)
      await updateDoc(ref, { messages: updatedMessages })

      // Update local state
      setPost(prev => ({ ...prev, messages: updatedMessages }))
      setNewMessage('')
    } catch (err) {
      setError('Could not send message.')
    }
  }

  // Handle loading/error states
  if (error) return <div className="post-details-error">{error}</div>
  if (!post) return <div className="post-details-loading">Loading...</div>

  // 4) Render the post + conversation
  return (
    <div className="post-details-container">
      <h2>Post Details</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Status:</strong> {post.status}</p>
      <p><strong>Created by:</strong> {post.createdByName}</p>
      <p className="post-content">{post.content}</p>

      {/* Conversation Thread */}
      <div className="messages-thread">
        <h4>Conversation</h4>
        {post.messages && post.messages.length > 0 ? (
          post.messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.authorRole}`}>
              <p>
                <strong>{msg.authorRole === 'doctor' ? 'Doctor' : 'Patient'}:</strong> {msg.text}
              </p>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      {/* If user is doctor or patient, allow them to reply */}
      {(isDoctor || isPatient) && (
        <div className="reply-section">
          {/* Doctor can also mark unresolved as resolved */}
          {isDoctor && post.status === 'unresolved' && (
            <button 
              onClick={handleMarkResolved} 
              className="resolve-btn"
            >
              Mark as Resolved
            </button>
          )}

          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} className="reply-btn">
            Send
          </button>
        </div>
      )}
    </div>
  )
}
