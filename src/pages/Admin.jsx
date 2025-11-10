import { useState, useEffect } from 'react'
import { Save, Eye, Home, Settings, FileText, Users, Briefcase, BookOpen, Mail, Plus, Trash2, GripVertical, Calendar, Download, Copy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { contentData, saveContent, loadContent } from '../data/content'
import SectionEditor from '../components/SectionEditor'

const Admin = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(contentData)
  const [activeTab, setActiveTab] = useState('landing')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const loaded = loadContent()
    setData(loaded)
  }, [])

  const handleChange = (path, value) => {
    const keys = path.split('.')
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev))
      let current = newData
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]] = { ...current[keys[i]] }
      }
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleArrayChange = (path, index, field, value) => {
    const keys = path.split('.')
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev))
      let current = newData
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]] = { ...current[keys[i]] }
      }
      const array = [...current[keys[keys.length - 1]]]
      array[index] = { ...array[index], [field]: value }
      current[keys[keys.length - 1]] = array
      return newData
    })
  }

  const handleAddItem = (path) => {
    const keys = path.split('.')
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev))
      let current = newData
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]] = { ...current[keys[i]] }
      }
      const array = current[keys[keys.length - 1]] || []
      let newItem = {}
      if (path.includes('newsItems')) {
        newItem = { id: Date.now(), title: '', content: '', author: '', date: new Date().toISOString().split('T')[0], category: 'News', likes: 0, comments: 0, shares: 0 }
      } else if (path.includes('businessGoals')) {
        newItem = { goal: '', progress: 0 }
      } else if (path.includes('initiatives')) {
        newItem = { id: Date.now(), title: '', description: '', category: '', tab: '', status: 'Active', teamSize: 0, startDate: new Date().toISOString().split('T')[0], impact: 'Medium', knowledge: [], resources: [], rating: 0, discussions: 0 }
      } else if (path.includes('tabs')) {
        newItem = { id: `tab-${Date.now()}`, label: '', description: '' }
      } else if (path.includes('team')) {
        newItem = { name: '', role: '', department: '' }
      } else if (path.includes('timeline')) {
        newItem = { phase: '', period: '', status: 'planned', description: '' }
      } else if (path.includes('contactInfo')) {
        newItem = { title: '', content: '', description: '' }
      } else if (path.includes('teamMembers') && path.includes('contact')) {
        newItem = { name: '', role: '', email: '' }
      } else if (path.includes('processSteps')) {
        newItem = { step: '', title: '', description: '' }
      } else if (path.includes('knowledgeHubSections')) {
        newItem = { icon: 'BookOpen', title: '', description: '', linkText: '', linkUrl: '' }
      } else if (path.includes('additionalResources')) {
        newItem = { icon: 'Download', title: '', description: '', linkText: '', linkAction: '' }
      }
      current[keys[keys.length - 1]] = [...array, newItem]
      return newData
    })
  }

  const handleRemoveItem = (path, index) => {
    const keys = path.split('.')
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev))
      let current = newData
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] }
      }
      const array = [...current[keys[keys.length - 1]]]
      array.splice(index, 1)
      current[keys[keys.length - 1]] = array
      return newData
    })
  }

  const handleSave = () => {
    saveContent(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Reload the page to see changes
    window.location.reload()
  }

  const handleExport = () => {
    // Export content as a downloadable JavaScript file
    const contentString = JSON.stringify(data, null, 2)
    const fileContent = `// Content data structure - editable via admin panel
// Export generated on ${new Date().toISOString()}
export let contentData = ${contentString}

// Load content from localStorage or use default
export const loadContent = () => {
  try {
    const saved = localStorage.getItem('rptInfoHub_content')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with defaults to ensure all keys exist
      return { ...contentData, ...parsed }
    }
  } catch (error) {
    console.error('Error loading content:', error)
  }
  return contentData
}

// Save content to localStorage
export const saveContent = (content) => {
  try {
    localStorage.setItem('rptInfoHub_content', JSON.stringify(content))
    return true
  } catch (error) {
    console.error('Error saving content:', error)
    return false
  }
}
`

    // Create blob and download
    const blob = new Blob([fileContent], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Content exported! Replace src/data/content.js with the downloaded file, then commit and push to GitHub.')
  }

  const handleCopyToClipboard = () => {
    // Copy content as JSON to clipboard
    const contentString = JSON.stringify(data, null, 2)
    navigator.clipboard.writeText(contentString).then(() => {
      alert('Content copied to clipboard! You can paste it into src/data/content.js')
    }).catch(err => {
      console.error('Failed to copy:', err)
      alert('Failed to copy to clipboard. Use Export instead.')
    })
  }

  const tabs = [
    { id: 'landing', label: 'Landing Page', icon: Home },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'playbook', label: 'Playbook', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'footer', label: 'Footer', icon: FileText },
    { id: 'navigation', label: 'Navigation', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Settings className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-white">Content Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Eye size={18} />
                <span>View Site</span>
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                    saved
                      ? 'bg-green-500 text-white'
                      : 'bg-primary hover:bg-primary-dark text-white'
                  }`}
                >
                  <Save size={18} />
                  <span>{saved ? 'Saved!' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  title="Export content to update GitHub Pages"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                  title="Copy content JSON to clipboard"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Editor */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          {activeTab === 'landing' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Landing Page Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.landing?.hero?.title || ''}
                  onChange={(e) => handleChange('landing.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.landing?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('landing.hero.subtitle', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Stats</h3>
                {data.landing?.stats?.map((stat, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Stat #{index + 1}</h4>
                      <button
                        onClick={() => {
                          const stats = [...(data.landing?.stats || [])]
                          stats.splice(index, 1)
                          handleChange('landing.stats', stats)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Icon (TrendingUp, Users, Lightbulb)</label>
                        <input
                          type="text"
                          value={stat.icon || ''}
                          onChange={(e) => {
                            const stats = [...(data.landing?.stats || [])]
                            stats[index] = { ...stats[index], icon: e.target.value }
                            handleChange('landing.stats', stats)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => {
                            const stats = [...(data.landing?.stats || [])]
                            stats[index] = { ...stats[index], label: e.target.value }
                            handleChange('landing.stats', stats)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => {
                            const stats = [...(data.landing?.stats || [])]
                            stats[index] = { ...stats[index], value: e.target.value }
                            handleChange('landing.stats', stats)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const stats = [...(data.landing?.stats || [])]
                    stats.push({ icon: 'TrendingUp', label: '', value: '' })
                    handleChange('landing.stats', stats)
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                >
                  <Plus size={16} />
                  <span>Add Stat</span>
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">News Items</h3>
                  <button
                    onClick={() => handleAddItem('landing.newsItems')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add News Item</span>
                  </button>
                </div>
                {data.landing?.newsItems?.map((item, index) => (
                  <div key={item.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-white">News Item #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('landing.newsItems', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleArrayChange('landing.newsItems', index, 'title', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Author</label>
                        <input
                          type="text"
                          value={item.author || ''}
                          onChange={(e) => handleArrayChange('landing.newsItems', index, 'author', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Content</label>
                      <textarea
                        value={item.content || ''}
                        onChange={(e) => handleArrayChange('landing.newsItems', index, 'content', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                        <input
                          type="text"
                          value={item.category || ''}
                          onChange={(e) => handleArrayChange('landing.newsItems', index, 'category', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Date</label>
                        <input
                          type="date"
                          value={item.date || ''}
                          onChange={(e) => handleArrayChange('landing.newsItems', index, 'date', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Likes</label>
                        <input
                          type="number"
                          value={item.likes || 0}
                          onChange={(e) => handleArrayChange('landing.newsItems', index, 'likes', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.landing?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('landing.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.landing?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.landing?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('landing.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.landing?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('landing.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.landing?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('landing.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">About Page Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Vision</label>
                <textarea
                  value={data.about?.vision || ''}
                  onChange={(e) => handleChange('about.vision', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Mission</label>
                <textarea
                  value={data.about?.mission || ''}
                  onChange={(e) => handleChange('about.mission', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.about?.hero?.title || ''}
                  onChange={(e) => handleChange('about.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary mb-4"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.about?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('about.hero.subtitle', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary mb-4"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Business Goals</h3>
                  <button
                    onClick={() => handleAddItem('about.businessGoals')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Goal</span>
                  </button>
                </div>
                {data.about?.businessGoals?.map((goal, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-white">Goal #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('about.businessGoals', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Goal</label>
                    <input
                      type="text"
                      value={goal.goal || ''}
                      onChange={(e) => {
                        const goals = [...(data.about?.businessGoals || [])]
                        goals[index] = { ...goals[index], goal: e.target.value }
                        handleChange('about.businessGoals', goals)
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white mb-2"
                    />
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={goal.progress || 0}
                      onChange={(e) => {
                        const goals = [...(data.about?.businessGoals || [])]
                        goals[index] = { ...goals[index], progress: parseInt(e.target.value) || 0 }
                        handleChange('about.businessGoals', goals)
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Timeline</h3>
                  <button
                    onClick={() => handleAddItem('about.timeline')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Phase</span>
                  </button>
                </div>
                {data.about?.timeline?.map((phase, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Phase #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('about.timeline', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Phase</label>
                        <input
                          type="text"
                          value={phase.phase || ''}
                          onChange={(e) => {
                            const timeline = [...(data.about?.timeline || [])]
                            timeline[index] = { ...timeline[index], phase: e.target.value }
                            handleChange('about.timeline', timeline)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Period</label>
                        <input
                          type="text"
                          value={phase.period || ''}
                          onChange={(e) => {
                            const timeline = [...(data.about?.timeline || [])]
                            timeline[index] = { ...timeline[index], period: e.target.value }
                            handleChange('about.timeline', timeline)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Status</label>
                      <select
                        value={phase.status || 'planned'}
                        onChange={(e) => {
                          const timeline = [...(data.about?.timeline || [])]
                          timeline[index] = { ...timeline[index], status: e.target.value }
                          handleChange('about.timeline', timeline)
                        }}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                      <textarea
                        value={phase.description || ''}
                        onChange={(e) => {
                          const timeline = [...(data.about?.timeline || [])]
                          timeline[index] = { ...timeline[index], description: e.target.value }
                          handleChange('about.timeline', timeline)
                        }}
                        rows="2"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Team Members</h3>
                  <button
                    onClick={() => handleAddItem('about.team')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Member</span>
                  </button>
                </div>
                {data.about?.team?.map((member, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Member #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('about.team', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Name</label>
                        <input
                          type="text"
                          value={member.name || ''}
                          onChange={(e) => {
                            const team = [...(data.about?.team || [])]
                            team[index] = { ...team[index], name: e.target.value }
                            handleChange('about.team', team)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Role</label>
                        <input
                          type="text"
                          value={member.role || ''}
                          onChange={(e) => {
                            const team = [...(data.about?.team || [])]
                            team[index] = { ...team[index], role: e.target.value }
                            handleChange('about.team', team)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
                        <input
                          type="text"
                          value={member.department || ''}
                          onChange={(e) => {
                            const team = [...(data.about?.team || [])]
                            team[index] = { ...team[index], department: e.target.value }
                            handleChange('about.team', team)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Values</h3>
                <textarea
                  value={(data.about?.values || []).join(', ')}
                  onChange={(e) => {
                    const values = e.target.value.split(',').map(v => v.trim()).filter(Boolean)
                    handleChange('about.values', values)
                  }}
                  rows="2"
                  placeholder="Enter values separated by commas"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-400 mt-1">Separate multiple values with commas</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
                <textarea
                  value={(data.about?.keyMetrics || []).join(', ')}
                  onChange={(e) => {
                    const metrics = e.target.value.split(',').map(m => m.trim()).filter(Boolean)
                    handleChange('about.keyMetrics', metrics)
                  }}
                  rows="2"
                  placeholder="Enter metrics separated by commas"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-400 mt-1">Separate multiple metrics with commas</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Process Title</label>
                <input
                  type="text"
                  value={data.about?.processTitle || ''}
                  onChange={(e) => handleChange('about.processTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Process Steps</h3>
                  <button
                    onClick={() => handleAddItem('about.processSteps')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Step</span>
                  </button>
                </div>
                {data.about?.processSteps?.map((step, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Step #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('about.processSteps', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Step Number</label>
                        <input
                          type="text"
                          value={step.step || ''}
                          onChange={(e) => {
                            const steps = [...(data.about?.processSteps || [])]
                            steps[index] = { ...steps[index], step: e.target.value }
                            handleChange('about.processSteps', steps)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => {
                            const steps = [...(data.about?.processSteps || [])]
                            steps[index] = { ...steps[index], title: e.target.value }
                            handleChange('about.processSteps', steps)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                        <input
                          type="text"
                          value={step.description || ''}
                          onChange={(e) => {
                            const steps = [...(data.about?.processSteps || [])]
                            steps[index] = { ...steps[index], description: e.target.value }
                            handleChange('about.processSteps', steps)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.about?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('about.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.about?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.about?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('about.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.about?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('about.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.about?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('about.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Portfolio Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.portfolio?.hero?.title || ''}
                  onChange={(e) => handleChange('portfolio.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.portfolio?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('portfolio.hero.subtitle', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Portfolio Tabs</h3>
                  <button
                    onClick={() => {
                      const tabs = [...(data.portfolio?.tabs || [])]
                      tabs.push({ id: `tab-${Date.now()}`, label: '', description: '' })
                      handleChange('portfolio.tabs', tabs)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Tab</span>
                  </button>
                </div>
                {data.portfolio?.tabs?.map((tab, tabIndex) => (
                  <div key={tabIndex} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Tab #{tabIndex + 1}</h4>
                      <button
                        onClick={() => {
                          const tabs = [...(data.portfolio?.tabs || [])]
                          tabs.splice(tabIndex, 1)
                          handleChange('portfolio.tabs', tabs)
                        }}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Tab ID (e.g., data-strategy)</label>
                        <input
                          type="text"
                          value={tab.id || ''}
                          onChange={(e) => {
                            const tabs = [...(data.portfolio?.tabs || [])]
                            tabs[tabIndex] = { ...tabs[tabIndex], id: e.target.value }
                            handleChange('portfolio.tabs', tabs)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Label</label>
                        <input
                          type="text"
                          value={tab.label || ''}
                          onChange={(e) => {
                            const tabs = [...(data.portfolio?.tabs || [])]
                            tabs[tabIndex] = { ...tabs[tabIndex], label: e.target.value }
                            handleChange('portfolio.tabs', tabs)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                      <textarea
                        value={tab.description || ''}
                        onChange={(e) => {
                          const tabs = [...(data.portfolio?.tabs || [])]
                          tabs[tabIndex] = { ...tabs[tabIndex], description: e.target.value }
                          handleChange('portfolio.tabs', tabs)
                        }}
                        rows="2"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Initiatives</h3>
                  <button
                    onClick={() => handleAddItem('portfolio.initiatives')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Initiative</span>
                  </button>
                </div>
                {data.portfolio?.initiatives?.map((initiative, index) => (
                  <div key={initiative.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-white">Initiative #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('portfolio.initiatives', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={initiative.title || ''}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'title', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
                        <input
                          type="text"
                          value={initiative.category || ''}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'category', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Tab</label>
                        <select
                          value={initiative.tab || ''}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'tab', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        >
                          <option value="">Select Tab</option>
                          {data.portfolio?.tabs?.map(tab => (
                            <option key={tab.id} value={tab.id}>{tab.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                      <textarea
                        value={initiative.description || ''}
                        onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'description', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                        <select
                          value={initiative.status || 'Active'}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'status', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        >
                          <option>Active</option>
                          <option>Planning</option>
                          <option>Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Team Size</label>
                        <input
                          type="number"
                          value={initiative.teamSize || 0}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'teamSize', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Start Date</label>
                        <input
                          type="date"
                          value={initiative.startDate || ''}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'startDate', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Impact</label>
                        <select
                          value={initiative.impact || 'Medium'}
                          onChange={(e) => handleArrayChange('portfolio.initiatives', index, 'impact', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        >
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">All Tab Label</label>
                <input
                  type="text"
                  value={data.portfolio?.allTabLabel || ''}
                  onChange={(e) => handleChange('portfolio.allTabLabel', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Tabs Help Text</label>
                <textarea
                  value={data.portfolio?.tabsHelpText || ''}
                  onChange={(e) => handleChange('portfolio.tabsHelpText', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Knowledge Hub Title</label>
                <input
                  type="text"
                  value={data.portfolio?.knowledgeHubTitle || ''}
                  onChange={(e) => handleChange('portfolio.knowledgeHubTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Knowledge Hub Sections</h3>
                  <button
                    onClick={() => handleAddItem('portfolio.knowledgeHubSections')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.portfolio?.knowledgeHubSections?.map((section, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Section #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('portfolio.knowledgeHubSections', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Icon (BookOpen, Users, TrendingUp)</label>
                        <input
                          type="text"
                          value={section.icon || ''}
                          onChange={(e) => {
                            const sections = [...(data.portfolio?.knowledgeHubSections || [])]
                            sections[index] = { ...sections[index], icon: e.target.value }
                            handleChange('portfolio.knowledgeHubSections', sections)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={section.title || ''}
                          onChange={(e) => {
                            const sections = [...(data.portfolio?.knowledgeHubSections || [])]
                            sections[index] = { ...sections[index], title: e.target.value }
                            handleChange('portfolio.knowledgeHubSections', sections)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                      <textarea
                        value={section.description || ''}
                        onChange={(e) => {
                          const sections = [...(data.portfolio?.knowledgeHubSections || [])]
                          sections[index] = { ...sections[index], description: e.target.value }
                          handleChange('portfolio.knowledgeHubSections', sections)
                        }}
                        rows="2"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Link Text</label>
                        <input
                          type="text"
                          value={section.linkText || ''}
                          onChange={(e) => {
                            const sections = [...(data.portfolio?.knowledgeHubSections || [])]
                            sections[index] = { ...sections[index], linkText: e.target.value }
                            handleChange('portfolio.knowledgeHubSections', sections)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Link URL</label>
                        <input
                          type="text"
                          value={section.linkUrl || ''}
                          onChange={(e) => {
                            const sections = [...(data.portfolio?.knowledgeHubSections || [])]
                            sections[index] = { ...sections[index], linkUrl: e.target.value }
                            handleChange('portfolio.knowledgeHubSections', sections)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.portfolio?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('portfolio.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.portfolio?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.portfolio?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('portfolio.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.portfolio?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('portfolio.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.portfolio?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('portfolio.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'playbook' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Playbook Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.playbook?.hero?.title || ''}
                  onChange={(e) => handleChange('playbook.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.playbook?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('playbook.hero.subtitle', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Frameworks</h3>
                  <button
                    onClick={() => {
                      const frameworks = [...(data.playbook?.frameworks || [])]
                      frameworks.push({
                        id: `framework-${Date.now()}`,
                        title: '',
                        icon: '📚',
                        description: '',
                        sections: [],
                        resources: []
                      })
                      handleChange('playbook.frameworks', frameworks)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Framework</span>
                  </button>
                </div>
                {data.playbook?.frameworks?.map((framework, fIndex) => (
                  <div key={framework.id || fIndex} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-white">Framework #{fIndex + 1}</h4>
                      <button
                        onClick={() => {
                          const frameworks = [...(data.playbook?.frameworks || [])]
                          frameworks.splice(fIndex, 1)
                          handleChange('playbook.frameworks', frameworks)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={framework.title || ''}
                          onChange={(e) => {
                            const frameworks = [...(data.playbook?.frameworks || [])]
                            frameworks[fIndex] = { ...frameworks[fIndex], title: e.target.value }
                            handleChange('playbook.frameworks', frameworks)
                          }}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Icon (emoji)</label>
                        <input
                          type="text"
                          value={framework.icon || ''}
                          onChange={(e) => {
                            const frameworks = [...(data.playbook?.frameworks || [])]
                            frameworks[fIndex] = { ...frameworks[fIndex], icon: e.target.value }
                            handleChange('playbook.frameworks', frameworks)
                          }}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                      <textarea
                        value={framework.description || ''}
                        onChange={(e) => {
                          const frameworks = [...(data.playbook?.frameworks || [])]
                          frameworks[fIndex] = { ...frameworks[fIndex], description: e.target.value }
                          handleChange('playbook.frameworks', frameworks)
                        }}
                        rows="2"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-300">Sections</label>
                        <button
                          onClick={() => {
                            const frameworks = [...(data.playbook?.frameworks || [])]
                            const sections = [...(frameworks[fIndex].sections || [])]
                            sections.push({ title: '', content: '', topics: [] })
                            frameworks[fIndex] = { ...frameworks[fIndex], sections }
                            handleChange('playbook.frameworks', frameworks)
                          }}
                          className="text-primary text-xs hover:text-primary-light"
                        >
                          + Add Section
                        </button>
                      </div>
                      {(framework.sections || []).map((section, sIndex) => (
                        <div key={sIndex} className="bg-gray-800/50 rounded p-3 mb-2">
                          <input
                            type="text"
                            placeholder="Section Title"
                            value={section.title || ''}
                            onChange={(e) => {
                              const frameworks = [...(data.playbook?.frameworks || [])]
                              const sections = [...(frameworks[fIndex].sections || [])]
                              sections[sIndex] = { ...sections[sIndex], title: e.target.value }
                              frameworks[fIndex] = { ...frameworks[fIndex], sections }
                              handleChange('playbook.frameworks', frameworks)
                            }}
                            className="w-full px-3 py-1 bg-gray-900 border border-gray-700 rounded text-white text-sm mb-2"
                          />
                          <textarea
                            placeholder="Section Content"
                            value={section.content || ''}
                            onChange={(e) => {
                              const frameworks = [...(data.playbook?.frameworks || [])]
                              const sections = [...(frameworks[fIndex].sections || [])]
                              sections[sIndex] = { ...sections[sIndex], content: e.target.value }
                              frameworks[fIndex] = { ...frameworks[fIndex], sections }
                              handleChange('playbook.frameworks', frameworks)
                            }}
                            rows="2"
                            className="w-full px-3 py-1 bg-gray-900 border border-gray-700 rounded text-white text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Quick Navigation Title</label>
                <input
                  type="text"
                  value={data.playbook?.quickNavTitle || ''}
                  onChange={(e) => handleChange('playbook.quickNavTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Additional Resources Title</label>
                <input
                  type="text"
                  value={data.playbook?.additionalResourcesTitle || ''}
                  onChange={(e) => handleChange('playbook.additionalResourcesTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Additional Resources</h3>
                  <button
                    onClick={() => handleAddItem('playbook.additionalResources')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Resource</span>
                  </button>
                </div>
                {data.playbook?.additionalResources?.map((resource, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Resource #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('playbook.additionalResources', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Icon (Download, BookOpen, CheckCircle)</label>
                        <input
                          type="text"
                          value={resource.icon || ''}
                          onChange={(e) => {
                            const resources = [...(data.playbook?.additionalResources || [])]
                            resources[index] = { ...resources[index], icon: e.target.value }
                            handleChange('playbook.additionalResources', resources)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={resource.title || ''}
                          onChange={(e) => {
                            const resources = [...(data.playbook?.additionalResources || [])]
                            resources[index] = { ...resources[index], title: e.target.value }
                            handleChange('playbook.additionalResources', resources)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                      <textarea
                        value={resource.description || ''}
                        onChange={(e) => {
                          const resources = [...(data.playbook?.additionalResources || [])]
                          resources[index] = { ...resources[index], description: e.target.value }
                          handleChange('playbook.additionalResources', resources)
                        }}
                        rows="2"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Link Text</label>
                        <input
                          type="text"
                          value={resource.linkText || ''}
                          onChange={(e) => {
                            const resources = [...(data.playbook?.additionalResources || [])]
                            resources[index] = { ...resources[index], linkText: e.target.value }
                            handleChange('playbook.additionalResources', resources)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Link Action</label>
                        <input
                          type="text"
                          value={resource.linkAction || ''}
                          onChange={(e) => {
                            const resources = [...(data.playbook?.additionalResources || [])]
                            resources[index] = { ...resources[index], linkAction: e.target.value }
                            handleChange('playbook.additionalResources', resources)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.playbook?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('playbook.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.playbook?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.playbook?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('playbook.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.playbook?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('playbook.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.playbook?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('playbook.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Page Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.contact?.hero?.title || ''}
                  onChange={(e) => handleChange('contact.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.contact?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('contact.hero.subtitle', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Contact Information</h3>
                  <button
                    onClick={() => handleAddItem('contact.contactInfo')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Contact Info</span>
                  </button>
                </div>
                {data.contact?.contactInfo?.map((info, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Contact #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('contact.contactInfo', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={info.title || ''}
                          onChange={(e) => {
                            const items = [...(data.contact?.contactInfo || [])]
                            items[index] = { ...items[index], title: e.target.value }
                            handleChange('contact.contactInfo', items)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Content</label>
                        <input
                          type="text"
                          value={info.content || ''}
                          onChange={(e) => {
                            const items = [...(data.contact?.contactInfo || [])]
                            items[index] = { ...items[index], content: e.target.value }
                            handleChange('contact.contactInfo', items)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                        <input
                          type="text"
                          value={info.description || ''}
                          onChange={(e) => {
                            const items = [...(data.contact?.contactInfo || [])]
                            items[index] = { ...items[index], description: e.target.value }
                            handleChange('contact.contactInfo', items)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Team Members</h3>
                  <button
                    onClick={() => handleAddItem('contact.teamMembers')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Team Member</span>
                  </button>
                </div>
                {data.contact?.teamMembers?.map((member, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Member #{index + 1}</h4>
                      <button
                        onClick={() => handleRemoveItem('contact.teamMembers', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Name</label>
                        <input
                          type="text"
                          value={member.name || ''}
                          onChange={(e) => {
                            const members = [...(data.contact?.teamMembers || [])]
                            members[index] = { ...members[index], name: e.target.value }
                            handleChange('contact.teamMembers', members)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Role</label>
                        <input
                          type="text"
                          value={member.role || ''}
                          onChange={(e) => {
                            const members = [...(data.contact?.teamMembers || [])]
                            members[index] = { ...members[index], role: e.target.value }
                            handleChange('contact.teamMembers', members)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={member.email || ''}
                          onChange={(e) => {
                            const members = [...(data.contact?.teamMembers || [])]
                            members[index] = { ...members[index], email: e.target.value }
                            handleChange('contact.teamMembers', members)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Response Times</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">High Urgency</label>
                    <input
                      type="text"
                      value={data.contact?.responseTimes?.high || ''}
                      onChange={(e) => handleChange('contact.responseTimes.high', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Medium Urgency</label>
                    <input
                      type="text"
                      value={data.contact?.responseTimes?.medium || ''}
                      onChange={(e) => handleChange('contact.responseTimes.medium', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Low Urgency</label>
                    <input
                      type="text"
                      value={data.contact?.responseTimes?.low || ''}
                      onChange={(e) => handleChange('contact.responseTimes.low', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Form Title</label>
                <input
                  type="text"
                  value={data.contact?.formTitle || ''}
                  onChange={(e) => handleChange('contact.formTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Get in Touch Title</label>
                <input
                  type="text"
                  value={data.contact?.getInTouchTitle || ''}
                  onChange={(e) => handleChange('contact.getInTouchTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Core Team Title</label>
                <input
                  type="text"
                  value={data.contact?.coreTeamTitle || ''}
                  onChange={(e) => handleChange('contact.coreTeamTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Response Times Title</label>
                <input
                  type="text"
                  value={data.contact?.responseTimesTitle || ''}
                  onChange={(e) => handleChange('contact.responseTimesTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.contact?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('contact.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.contact?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.contact?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('contact.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.contact?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('contact.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.contact?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('contact.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Events Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={data.events?.hero?.title || ''}
                  onChange={(e) => handleChange('events.hero.title', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Hero Subtitle</label>
                <textarea
                  value={data.events?.hero?.subtitle || ''}
                  onChange={(e) => handleChange('events.hero.subtitle', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Events</h3>
                  <button
                    onClick={() => {
                      const events = [...(data.events?.events || [])]
                      events.push({
                        id: Date.now(),
                        title: '',
                        description: '',
                        date: new Date().toISOString().split('T')[0],
                        time: '',
                        location: '',
                        type: 'Workshop',
                        capacity: 50,
                        registered: 0,
                        status: 'open',
                        organizer: '',
                        tags: [],
                        agenda: []
                      })
                      handleChange('events.events', events)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Event</span>
                  </button>
                </div>
                {data.events?.events?.map((event, index) => (
                  <div key={event.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-white">Event #{index + 1}</h4>
                      <button
                        onClick={() => {
                          const events = [...(data.events?.events || [])]
                          events.splice(index, 1)
                          handleChange('events.events', events)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={event.title || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'title', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Type</label>
                        <input
                          type="text"
                          value={event.type || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'type', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Date</label>
                        <input
                          type="date"
                          value={event.date || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'date', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Time</label>
                        <input
                          type="text"
                          value={event.time || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'time', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                          placeholder="10:00 AM - 2:00 PM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                        <input
                          type="text"
                          value={event.location || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'location', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Organizer</label>
                        <input
                          type="text"
                          value={event.organizer || ''}
                          onChange={(e) => handleArrayChange('events.events', index, 'organizer', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Capacity</label>
                        <input
                          type="number"
                          value={event.capacity || 0}
                          onChange={(e) => handleArrayChange('events.events', index, 'capacity', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                        <select
                          value={event.status || 'open'}
                          onChange={(e) => handleArrayChange('events.events', index, 'status', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        >
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                      <textarea
                        value={event.description || ''}
                        onChange={(e) => handleArrayChange('events.events', index, 'description', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Page Sections (WYSIWYG)</h3>
                  <button
                    onClick={() => {
                      const sections = [...(data.events?.sections || [])]
                      sections.push({ id: `section-${Date.now()}`, title: '', content: '', order: sections.length })
                      handleChange('events.sections', sections)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Section</span>
                  </button>
                </div>
                {data.events?.sections?.map((section, index) => (
                  <div key={section.id || index} className="bg-gray-700/50 rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="text-lg font-semibold text-white">Section #{index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          const sections = [...(data.events?.sections || [])]
                          sections.splice(index, 1)
                          handleChange('events.sections', sections)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => {
                          const sections = [...(data.events?.sections || [])]
                          sections[index] = { ...sections[index], title: e.target.value }
                          handleChange('events.sections', sections)
                        }}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        placeholder="Enter section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Section Content (WYSIWYG)</label>
                      <div className="bg-white rounded-lg">
                        <SectionEditor
                          value={section.content || ''}
                          onChange={(content) => {
                            const sections = [...(data.events?.sections || [])]
                            sections[index] = { ...sections[index], content }
                            handleChange('events.sections', sections)
                          }}
                          placeholder="Enter rich text content for this section..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Footer Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                <textarea
                  value={data.footer?.description || ''}
                  onChange={(e) => handleChange('footer.description', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Quick Links Title</label>
                <input
                  type="text"
                  value={data.footer?.quickLinksTitle || ''}
                  onChange={(e) => handleChange('footer.quickLinksTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Resources Title</label>
                <input
                  type="text"
                  value={data.footer?.resourcesTitle || ''}
                  onChange={(e) => handleChange('footer.resourcesTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Connect Title</label>
                <input
                  type="text"
                  value={data.footer?.connectTitle || ''}
                  onChange={(e) => handleChange('footer.connectTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Connect Description</label>
                <textarea
                  value={data.footer?.connectDescription || ''}
                  onChange={(e) => handleChange('footer.connectDescription', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Connect Button Text</label>
                <input
                  type="text"
                  value={data.footer?.connectButtonText || ''}
                  onChange={(e) => handleChange('footer.connectButtonText', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={data.footer?.copyright || ''}
                  onChange={(e) => handleChange('footer.copyright', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">Navigation Content</h2>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Navigation Items</h3>
                  <button
                    onClick={() => {
                      const items = [...(data.navigation?.items || [])]
                      items.push({ path: '', label: '' })
                      handleChange('navigation.items', items)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                </div>
                {data.navigation?.items?.map((item, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold text-white">Item #{index + 1}</h4>
                      <button
                        onClick={() => {
                          const items = [...(data.navigation?.items || [])]
                          items.splice(index, 1)
                          handleChange('navigation.items', items)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Path</label>
                        <input
                          type="text"
                          value={item.path || ''}
                          onChange={(e) => {
                            const items = [...(data.navigation?.items || [])]
                            items[index] = { ...items[index], path: e.target.value }
                            handleChange('navigation.items', items)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Label</label>
                        <input
                          type="text"
                          value={item.label || ''}
                          onChange={(e) => {
                            const items = [...(data.navigation?.items || [])]
                            items[index] = { ...items[index], label: e.target.value }
                            handleChange('navigation.items', items)
                          }}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin

