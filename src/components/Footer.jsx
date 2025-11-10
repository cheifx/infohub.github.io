import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Logo from './Logo'
import { loadContent } from '../data/content'

const Footer = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
  }, [])

  const footer = content?.footer || {
    description: "Empowering digital transformation through innovation, collaboration, and continuous learning.",
    quickLinksTitle: "Quick Links",
    resourcesTitle: "Resources",
    connectTitle: "Connect",
    connectDescription: "Questions or ideas? We'd love to hear from you.",
    connectButtonText: "Get in Touch",
    copyright: "Digital RPT Lab"
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="small" variant="dark" />
            </div>
            <p className="text-gray-400 text-sm">
              {footer.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.quickLinksTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary">About</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-primary">Portfolio</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.resourcesTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/playbook" className="text-gray-400 hover:text-primary">Playbook</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.connectTitle}</h3>
            <p className="text-gray-400 text-sm mb-2">
              {footer.connectDescription}
            </p>
            <Link to="/contact" className="btn-primary inline-block text-sm">
              {footer.connectButtonText}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

