import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Users, TrendingUp, Calendar, Star, MessageSquare, X, ExternalLink } from 'lucide-react'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent } from '../data/content'

const Portfolio = () => {
  const [content, setContent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedInitiative, setSelectedInitiative] = useState(null)

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
  }, [])

  // Reset category filter when tab changes
  useEffect(() => {
    setSelectedCategory('All')
    setSearchTerm('')
  }, [selectedTab])

  const tabs = [
    { id: "all", label: content?.portfolio?.allTabLabel || "All Think Tanks", description: "View all initiatives across all transformation focus areas." },
    ...(content?.portfolio?.tabs || [
      { id: "data-strategy", label: "Data Strategy", description: "Initiatives focused on data governance, analytics, and strategic data utilization." },
      { id: "standardization", label: "Standardization", description: "Projects aimed at standardizing processes, systems, and practices across the organization." },
      { id: "digitalization", label: "Digitalization", description: "Efforts to digitize operations, enhance digital capabilities, and drive digital innovation." }
    ])
  ]

  const allInitiatives = content?.portfolio?.initiatives || []
  
  // Get categories based on current tab
  let tabInitiatives
  if (selectedTab === 'all') {
    // Show all initiatives when "All Think Tanks" is selected
    tabInitiatives = allInitiatives
  } else {
    // Only show initiatives that have a tab property matching the selected tab
    tabInitiatives = allInitiatives.filter(i => i.tab === selectedTab)
  }
  const categories = ['All', ...new Set(tabInitiatives.map(i => i.category).filter(Boolean))]

  // Filter initiatives: must match selected tab, search term, and category
  const filteredInitiatives = allInitiatives.filter(initiative => {
    // If "all" tab is selected, show all initiatives; otherwise match the tab
    const matchesTab = selectedTab === 'all' || initiative.tab === selectedTab
    const matchesSearch = initiative.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || initiative.category === selectedCategory
    return matchesTab && matchesSearch && matchesCategory
  })

  const currentTab = tabs.find(tab => tab.id === selectedTab)

  const handleViewDetails = (initiative) => {
    setSelectedInitiative(initiative)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const handleDiscussion = (initiative) => {
    alert(`Discussion feature coming soon!\n\nInitiative: ${initiative.title}\n\nThis would open a discussion thread or comments section.`)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">Initiative Portfolio</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-md">
            Explore active initiatives, access knowledge resources, and connect with teams driving digital transformation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs - Main Grouping */}
        <div className="mb-8">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-3">
              {content?.portfolio?.tabsHelpText || (
                <>
                  <span className="font-semibold text-gray-700">Tabs</span> organize initiatives by transformation focus area. 
                  <span className="font-semibold text-gray-700 ml-2">Categories</span> are sub-filters within each tab.
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mb-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTab(tab.id)
                  setSelectedCategory('All')
                }}
                className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
                  selectedTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {currentTab && (
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-6">
              <p className="text-gray-700 font-medium">{currentTab.description}</p>
              {selectedTab === 'all' && (
                <p className="text-sm text-gray-600 mt-2">
                  Browse all initiatives or use the tabs above to filter by focus area.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search initiatives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Filter by category within <span className="font-semibold text-primary">{currentTab?.label}</span>:
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Initiatives Grid */}
        {filteredInitiatives.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-primary">{filteredInitiatives.length}</span> of{' '}
              <span className="font-semibold">{tabInitiatives.length}</span> initiatives in{' '}
              <span className="font-semibold text-primary">{currentTab?.label}</span>
            </div>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-primary hover:underline"
              >
                Clear category filter
              </button>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((initiative) => (
            <div key={initiative.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    initiative.status === 'Active' ? 'bg-green-100 text-green-800' :
                    initiative.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {initiative.status}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{initiative.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{initiative.description}</p>
                </div>
              </div>

              {/* Tab, Category and Impact */}
              <div className="mb-4 pb-4 border-b space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {initiative.tab && (
                    <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark px-3 py-1 rounded-full">
                      {tabs.find(t => t.id === initiative.tab)?.label || initiative.tab}
                    </span>
                  )}
                  <button
                    onClick={() => handleCategoryClick(initiative.category)}
                    className="text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full transition-colors cursor-pointer"
                    title="Click to filter by this category"
                  >
                    {initiative.category}
                  </button>
                </div>
                <div className="flex justify-end">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    initiative.impact === 'High' ? 'bg-red-100 text-red-800' :
                    initiative.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {initiative.impact} Impact
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users size={16} />
                  <span>{initiative.teamSize}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(initiative.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                {initiative.rating > 0 && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{initiative.rating}</span>
                  </div>
                )}
              </div>

              {/* Knowledge & Resources */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Learnings:</h4>
                <div className="flex flex-wrap gap-2">
                  {initiative.knowledge.slice(0, 2).map((item, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                  {initiative.knowledge.length > 2 && (
                    <span className="text-xs text-primary">+{initiative.knowledge.length - 2} more</span>
                  )}
                </div>
              </div>

              {/* Resources */}
              {initiative.resources.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Resources:</h4>
                  <div className="space-y-1">
                    {initiative.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        onClick={(e) => {
                          if (resource.url === '#') {
                            e.preventDefault()
                            alert(`Resource: ${resource.title}\nType: ${resource.type}\n\nThis would open the ${resource.type.toLowerCase()}. In production, this would link to the actual resource.`)
                          }
                        }}
                        className="flex items-center space-x-2 text-sm text-primary hover:underline cursor-pointer"
                      >
                        <BookOpen size={14} />
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <button 
                  onClick={() => handleViewDetails(initiative)}
                  className="text-sm text-primary font-medium hover:underline flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ExternalLink size={14} />
                </button>
                <div className="flex items-center space-x-3 text-gray-500">
                  <button 
                    onClick={() => handleDiscussion(initiative)}
                    className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer"
                    title="View discussions"
                  >
                    <MessageSquare size={16} />
                    <span className="text-xs">{initiative.discussions}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInitiatives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              {tabInitiatives.length === 0 
                ? `No initiatives found in ${currentTab?.label || 'this tab'}.`
                : 'No initiatives found matching your search or category filter.'}
            </p>
            {tabInitiatives.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
            {tabInitiatives.length === 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Switch to another tab or add initiatives to this tab in the admin panel.
              </p>
            )}
          </div>
        )}

        {/* Initiative Detail Modal */}
        {selectedInitiative && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedInitiative(null)
              }
            }}
          >
            <div 
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-900">{selectedInitiative.title}</h2>
                <button
                  onClick={() => setSelectedInitiative(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  {selectedInitiative.tab && (
                    <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark px-3 py-1 rounded-full">
                      {tabs.find(t => t.id === selectedInitiative.tab)?.label || selectedInitiative.tab}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedInitiative.status === 'Active' ? 'bg-green-100 text-green-800' :
                    selectedInitiative.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedInitiative.status}
                  </span>
                  <button
                    onClick={() => handleCategoryClick(selectedInitiative.category)}
                    className="text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full transition-colors"
                  >
                    {selectedInitiative.category}
                  </button>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedInitiative.impact === 'High' ? 'bg-red-100 text-red-800' :
                    selectedInitiative.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedInitiative.impact} Impact
                  </span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">{selectedInitiative.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Team Size</p>
                    <p className="font-semibold text-gray-900">{selectedInitiative.teamSize} members</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedInitiative.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  {selectedInitiative.rating > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Rating</p>
                      <p className="font-semibold text-gray-900 flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{selectedInitiative.rating}</span>
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Discussions</p>
                    <p className="font-semibold text-gray-900">{selectedInitiative.discussions}</p>
                  </div>
                </div>

                {selectedInitiative.knowledge && selectedInitiative.knowledge.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Learnings</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInitiative.knowledge.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedInitiative.resources && selectedInitiative.resources.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Resources</h3>
                    <div className="space-y-2">
                      {selectedInitiative.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <BookOpen className="text-primary" size={20} />
                            <div>
                              <p className="font-semibold text-gray-900">{resource.title}</p>
                              <p className="text-sm text-gray-500">{resource.type}</p>
                            </div>
                          </div>
                          <ExternalLink className="text-gray-400 group-hover:text-primary transition-colors" size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => handleDiscussion(selectedInitiative)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <MessageSquare size={18} />
                    <span>Join Discussion</span>
                  </button>
                  <button
                    onClick={() => setSelectedInitiative(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Hub Section */}
        {content?.portfolio?.knowledgeHubSections && content.portfolio.knowledgeHubSections.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">{content.portfolio.knowledgeHubTitle || "Knowledge Hub"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.portfolio.knowledgeHubSections.map((section, index) => {
                const IconComponent = section.icon === "BookOpen" ? BookOpen : 
                                     section.icon === "Users" ? Users : TrendingUp
                return (
                  <div key={index} className="card">
                    <IconComponent className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {section.description}
                    </p>
                    <a href={section.linkUrl} className="text-primary font-medium hover:underline">
                      {section.linkText}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Dynamic Sections */}
        {content?.portfolio?.sections && content.portfolio.sections.length > 0 && (
          <SectionRenderer sections={content.portfolio.sections} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Portfolio

