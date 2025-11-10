import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent } from '../data/content'

const Contact = () => {
  const [content, setContent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    topic: '',
    urgency: 'Medium',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.')
      return
    }

    // Simulate form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        department: '',
        topic: '',
        urgency: 'Medium',
        message: '',
      })
    }, 3000)
  }

  const contactInfo = content?.contact?.contactInfo || []
  const teamMembers = content?.contact?.teamMembers || []
  const responseTimes = content?.contact?.responseTimes || {
    high: "Within 4 hours",
    medium: "Within 24 hours",
    low: "Within 2-3 business days"
  }

  // Map icon names to components
  const iconMap = {
    Mail,
    Phone,
    MapPin
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">Contact Us</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-md">
            Have questions, ideas, or need guidance? We're here to help. Reach out to our core team 
            for support with your digital transformation journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="section-title mb-6">{content?.contact?.formTitle || "Send us a Message"}</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Message sent successfully!</p>
                    <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <p className="text-red-900">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="e.g., IT, Operations, Product"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="Low">Low - General inquiry</option>
                      <option value="Medium">Medium - Need response within 2-3 days</option>
                      <option value="High">High - Urgent, need immediate attention</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Initiative Support">Initiative Support</option>
                    <option value="Framework Guidance">Framework Guidance</option>
                    <option value="Technical Assistance">Technical Assistance</option>
                    <option value="Training Request">Training Request</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="card">
              <h2 className="section-subtitle mb-6">{content?.contact?.getInTouchTitle || "Get in Touch"}</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = iconMap[info.icon] || Mail
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-gray-900 font-medium">{info.content}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Core Team */}
            <div className="card">
              <h2 className="section-subtitle mb-6">{content?.contact?.coreTeamTitle || "Core Team"}</h2>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-gray-600 hover:text-primary"
                    >
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="card bg-primary/5">
              <h3 className="font-semibold text-gray-900 mb-2">{content?.contact?.responseTimesTitle || "Response Times"}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>High Urgency:</strong> {responseTimes.high}</li>
                <li>• <strong>Medium Urgency:</strong> {responseTimes.medium}</li>
                <li>• <strong>Low Urgency:</strong> {responseTimes.low}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        {content?.contact?.sections && content.contact.sections.length > 0 && (
          <SectionRenderer sections={content.contact.sections} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Contact

