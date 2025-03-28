// App.js
import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your pages
import Landing from './pages/Landing'
import DoctorLogin from './pages/login/DoctorLogin'
import PatientLogin from './pages/login/PatientLogin'
import PatientSignup from './pages/signup/PatientSignup'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientHome from './pages/PatientHome'
import CreateOrEditPost from './pages/CreateOrEditPost'
import PostDetails from './pages/PostDetails'
import NotFound from './pages/NotFound'

// Import your ThemeContext
import { ThemeContext } from './pages/ThemeContext'
// Import your global CSS (which might define .light, .dark, etc.)
import './index.css'

function App() {
  // Access the current theme from context
  const { theme } = useContext(ThemeContext)

  // Whenever 'theme' changes, update the <body> class
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />

          {/* Doctor Login */}
          <Route path="/doctor-login" element={<DoctorLogin />} />

          {/* Patient Login & Signup */}
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-signup" element={<PatientSignup />} />

          {/* Doctor Dashboard */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Patient Home */}
          <Route path="/patient" element={<PatientHome />} />

          {/* Create/Edit Post (Patient) */}
          <Route path="/patient/create" element={<CreateOrEditPost />} />
          <Route path="/patient/edit/:id" element={<CreateOrEditPost />} />

          {/* Post Detail Page (Doctor or Patient view) */}
          <Route path="/post/:id" element={<PostDetails />} />

          {/* Catch-all for non-existing routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
