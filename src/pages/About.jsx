import { useState, useEffect } from 'react'
import { Target, Users, Calendar, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent } from '../data/content'

const About = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
  }, [])

  const teamMembers = content?.about?.team || []
  const timeline = content?.about?.timeline || []
  const businessGoals = content?.about?.businessGoals || []
  const transformationCanvas = {
    vision: content?.about?.vision || '',
    mission: content?.about?.mission || '',
    values: content?.about?.values || [],
    keyMetrics: content?.about?.keyMetrics || [],
  }
  const processSteps = content?.about?.processSteps || []

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">About the Transformation</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-md">
            Discover our journey, vision, and the people driving digital transformation across the organization.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Vision & Mission */}
        <section>
          <div className="flex items-start mb-6">
            <Target className="w-10 h-10 text-primary mr-3 flex-shrink-0 mt-1" />
            <h2 className="section-title">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="section-subtitle mb-3">Our Vision</h3>
              <p className="text-gray-600">{transformationCanvas.vision}</p>
            </div>
            <div className="card">
              <h3 className="section-subtitle mb-3">Our Mission</h3>
              <p className="text-gray-600">{transformationCanvas.mission}</p>
            </div>
          </div>
        </section>

        {/* Transformation Canvas */}
        <section>
          <div className="flex items-start mb-6">
            <Lightbulb className="w-10 h-10 text-primary mr-3 flex-shrink-0 mt-1" />
            <h2 className="section-title">Transformation Canvas</h2>
          </div>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="section-subtitle mb-4">Core Values</h3>
                <div className="space-y-2">
                  {transformationCanvas.values.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="section-subtitle mb-4">Key Metrics</h3>
                <div className="space-y-2">
                  {transformationCanvas.keyMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Goals */}
        <section>
          <div className="flex items-start mb-6">
            <TrendingUp className="w-10 h-10 text-primary mr-3 flex-shrink-0 mt-1" />
            <h2 className="section-title">Business Goals</h2>
          </div>
          <div className="space-y-4">
            {businessGoals.map((item, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{item.goal}</h3>
                  <span className="text-primary font-bold">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="flex items-start mb-6">
            <Calendar className="w-10 h-10 text-primary mr-3 flex-shrink-0 mt-1" />
            <h2 className="section-title">Transformation Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-primary' :
                    phase.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}>
                    {phase.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 card">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status === 'completed' ? 'Completed' :
                         phase.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-2">{phase.period}</p>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Team */}
        <section>
          <div className="flex items-start mb-6">
            <Users className="w-10 h-10 text-primary mr-3 flex-shrink-0 mt-1" />
            <h2 className="section-title">Our Core Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-1">{member.role}</p>
                <p className="text-sm text-gray-500">{member.department}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Overview */}
        <section>
          <h2 className="section-title mb-6">{content?.about?.processTitle || 'Our Process'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((process, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{process.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Sections */}
        {content?.about?.sections && content.about.sections.length > 0 && (
          <SectionRenderer sections={content.about.sections} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default About

