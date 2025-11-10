import { useState, useEffect } from 'react'
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, ArrowRight, Download } from 'lucide-react'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent } from '../data/content'

const Playbook = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
  }, [])

  const frameworks = content?.playbook?.frameworks || []

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">Playbook</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-md">
            Self-service guides and resources to help you master the frameworks and methodologies driving our digital transformation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{content?.playbook?.quickNavTitle || "Quick Navigation"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {frameworks.map((framework) => (
              <button
                key={framework.id}
                onClick={() => {
                  toggleSection(framework.id)
                  // Scroll to the framework section
                  setTimeout(() => {
                    const element = document.getElementById(framework.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                }}
                className="card hover:shadow-lg transition-shadow text-center cursor-pointer"
              >
                <div className="text-4xl mb-3">{framework.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{framework.title}</h3>
                <p className="text-sm text-gray-600">{framework.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Framework Details */}
        <div className="space-y-6">
          {frameworks.map((framework) => (
            <div key={framework.id} id={framework.id} className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{framework.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{framework.title}</h2>
                    <p className="text-gray-600">{framework.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection(framework.id)}
                  className="text-primary hover:text-primary-dark"
                >
                  {expandedSection === framework.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              </div>

              {expandedSection === framework.id && (
                <div className="space-y-6 pt-6 border-t">
                  {framework.sections.map((section, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="section-subtitle mb-3">{section.title}</h3>
                      <p className="text-gray-600 mb-4">{section.content}</p>
                      <div className="space-y-2">
                        {section.topics.map((topic, topicIdx) => (
                          <div key={topicIdx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Resources */}
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h3 className="section-subtitle mb-4">Resources & Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {framework.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          onClick={(e) => {
                            if (resource.url === '#') {
                              e.preventDefault()
                              alert(`Resource: ${resource.title}\n\nThis would open the ${resource.type.toLowerCase()}. In a production environment, this would link to the actual resource.`)
                            }
                          }}
                          className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div>
                            <span className="text-xs font-semibold text-primary mb-1 block">
                              {resource.type}
                            </span>
                            <span className="text-gray-900 font-medium">{resource.title}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        {content?.playbook?.additionalResources && content.playbook.additionalResources.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">{content.playbook.additionalResourcesTitle || "Additional Resources"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.playbook.additionalResources.map((resource, index) => {
                const IconComponent = resource.icon === "Download" ? Download : 
                                     resource.icon === "BookOpen" ? BookOpen : CheckCircle
                return (
                  <div key={index} className="card">
                    <IconComponent className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {resource.description}
                    </p>
                    <button 
                      onClick={() => alert(`${resource.title} coming soon! This would open ${resource.linkAction}.`)}
                      className="text-primary font-medium hover:underline cursor-pointer"
                    >
                      {resource.linkText}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Dynamic Sections */}
        {content?.playbook?.sections && content.playbook.sections.length > 0 && (
          <SectionRenderer sections={content.playbook.sections} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Playbook

