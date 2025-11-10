import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './pages/Landing'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Playbook from './pages/Playbook'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  // Use basename for production (GitHub Pages), empty for development
  const basename = import.meta.env.PROD ? '/infohub.github.io' : ''
  
  return (
    <Router basename={basename}>
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

