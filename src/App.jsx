import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './pages/Landing'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Playbook from './pages/Playbook'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

// Component to handle 404 redirect
function RedirectHandler() {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    // Only run in production (GitHub Pages)
    if (import.meta.env.PROD) {
      const search = window.location.search
      if (search && search.startsWith('?')) {
        // Extract path from query string (format: ?/admin)
        const path = search.slice(1).split('&')[0].replace(/~and~/g, '&')
        if (path && path.startsWith('/')) {
          // Remove the base path if it's in the path
          const cleanPath = path.replace('/infohub.github.io', '')
          // Only navigate if we're not already on that path
          if (location.pathname !== cleanPath) {
            navigate(cleanPath, { replace: true })
          }
        }
      }
    }
  }, [navigate, location.pathname])
  
  return null
}

function App() {
  // Use basename for production (GitHub Pages), empty for development
  const basename = import.meta.env.PROD ? '/infohub.github.io' : ''
  
  return (
    <Router basename={basename}>
      <RedirectHandler />
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

