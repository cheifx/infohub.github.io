import { useState, useEffect } from 'react'
import { MessageCircle, Heart, Share2, Plus, TrendingUp, Users, Lightbulb, Sparkles, ArrowRight, Calendar, Clock, MapPin, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent } from '../data/content'

const Landing = () => {
  const [content, setContent] = useState(null)
  const [newsItems, setNewsItems] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  
  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
    if (loaded.landing?.newsItems) {
      setNewsItems(loaded.landing.newsItems.map(item => ({ ...item, liked: false })))
    }
    if (loaded.events?.events) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const events = loaded.events.events
        .filter(event => {
          const eventDate = new Date(event.date)
          eventDate.setHours(0, 0, 0, 0)
          return eventDate >= today
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3) // Show only next 3 events
      setUpcomingEvents(events)
    }
  }, [])

  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'News' })
  const [showSubmitForm, setShowSubmitForm] = useState(false)

  const handleLike = (id) => {
    setNewsItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    )
  }

  const handleComment = (id) => {
    const comment = prompt('Add a comment:')
    if (comment) {
      setNewsItems(items =>
        items.map(item =>
          item.id === id
            ? { ...item, comments: item.comments + 1 }
            : item
        )
      )
      alert('Comment added! (This is a demo - comments are not persisted)')
    }
  }

  const handleShare = (id) => {
    const item = newsItems.find(i => i.id === id)
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content,
        url: window.location.href
      }).catch(() => {
        // Fallback if share fails
        navigator.clipboard.writeText(`${item.title}\n${window.location.href}`)
        alert('Link copied to clipboard!')
      })
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`${item.title}\n${window.location.href}`)
      alert('Link copied to clipboard!')
    }
    setNewsItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, shares: item.shares + 1 }
          : item
      )
    )
  }

  const handleSubmitPost = (e) => {
    e.preventDefault()
    const post = {
      id: newsItems.length + 1,
      ...newPost,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    }
    setNewsItems([post, ...newsItems])
    setNewPost({ title: '', content: '', category: 'News' })
    setShowSubmitForm(false)
  }

  const stats = content?.landing?.stats || [
    { icon: TrendingUp, label: 'Active Initiatives', value: '50+' },
    { icon: Users, label: 'Team Members', value: '200+' },
    { icon: Lightbulb, label: 'Ideas Submitted', value: '150+' },
  ]

  const hero = content?.landing?.hero || {
    title: "Welcome to Digital RPT Lab",
    subtitle: "Your central hub for digital transformation news, initiatives, and resources. Stay connected, stay informed, and be part of the change.",
    ctaPrimary: "Explore News Feed",
    ctaSecondary: "View Initiatives"
  }

  const iconMap = {
    TrendingUp,
    Users,
    Lightbulb
  }

  return (
    <div className="tech-grid">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Transforming Tomorrow, Today</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="#news" 
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/portfolio" 
                className="btn-secondary-white flex items-center space-x-2"
              >
                <span>{hero.ctaSecondary}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = typeof stat.icon === 'string' ? iconMap[stat.icon] : stat.icon
            return (
              <div key={index} className="stat-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-3">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* News Feed and Events Section - Side by Side */}
      <div id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="section-title">News & Community Feed</h2>
                <p className="text-gray-600 text-lg">
                  Stay connected with the latest updates, success stories, and insights from our digital transformation journey.
                </p>
              </div>
            </div>
            <div className="mb-4">
              <button
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="btn-primary flex items-center space-x-2 whitespace-nowrap"
              >
                <Plus size={20} />
                <span>Submit News</span>
              </button>
            </div>

        {/* Submit Form */}
        {showSubmitForm && (
          <div className="card mb-8">
            <h3 className="section-subtitle mb-4">Submit a News Item</h3>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>News</option>
                  <option>Update</option>
                  <option>Success Story</option>
                  <option>Event</option>
                  <option>Milestone</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">Submit</button>
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News Items */}
        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              className="card-glow fade-in hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/10 to-primary-dark/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{item.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {item.author?.split(' ').map(n => n[0]).join('') || 'U'}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.author}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      item.liked 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-500 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={18} fill={item.liked ? 'currentColor' : 'none'} />
                    <span className="font-semibold">{item.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleComment(item.id)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-all"
                    title="Add a comment"
                  >
                    <MessageCircle size={18} />
                    <span className="font-semibold">{item.comments}</span>
                  </button>
                  <button 
                    onClick={() => handleShare(item.id)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-all"
                    title="Share this post"
                  >
                    <Share2 size={18} />
                    <span className="font-semibold">{item.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
          </div>

          {/* Upcoming Events - Takes 1/3 width, full width on mobile */}
          {upcomingEvents.length > 0 && (
            <div id="events" className="lg:col-span-1">
              <div className="mb-8">
                <h2 className="section-title">Upcoming Events</h2>
                <p className="text-gray-600 text-lg mb-4">
                  Join us for workshops, training sessions, and community gatherings. Register for events that interest you.
                </p>
                <Link
                  to="/events"
                  className="btn-primary inline-flex items-center space-x-2 whitespace-nowrap"
                >
                  <Calendar size={20} />
                  <span>View All Events</span>
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.date)
                  const spotsLeft = event.capacity - event.registered
                  const isFull = spotsLeft <= 0

                  return (
                    <div key={event.id} className="card hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-primary">
                              {eventDate.getDate()}
                            </div>
                            <div className="text-xs text-gray-600">
                              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 pr-2">{event.title}</h3>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary flex-shrink-0">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{event.description}</p>

                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                              <span className="truncate">{event.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Users className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
                              <span>
                                {event.registered} / {event.capacity} registered
                                {!isFull && ` (${spotsLeft} spots left)`}
                              </span>
                            </div>
                          </div>

                          <Link
                            to="/events"
                            className="btn-primary w-full flex items-center justify-center space-x-2 text-sm py-2"
                          >
                            <UserPlus size={16} />
                            <span>{isFull ? 'View Details' : 'Register Now'}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Sections */}
      {content?.landing?.sections && content.landing.sections.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionRenderer sections={content.landing.sections} />
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Landing

