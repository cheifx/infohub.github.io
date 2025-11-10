import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users, UserPlus, CheckCircle, X, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import Footer from '../components/Footer'
import SectionRenderer from '../components/SectionRenderer'
import { loadContent, saveContent } from '../data/content'

const Events = () => {
  const [content, setContent] = useState(null)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState({ name: '', email: '', department: '' })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState('calendar') // 'calendar' or 'list'

  useEffect(() => {
    const loaded = loadContent()
    setContent(loaded)
    if (loaded.events?.events) {
      setEvents(loaded.events.events)
    }
  }, [])

  const handleRegister = (eventId) => {
    setSelectedEvent(events.find(e => e.id === eventId))
    setShowRegistration(true)
  }

  const handleRegistrationSubmit = (e) => {
    e.preventDefault()
    if (!registrationData.name || !registrationData.email) {
      alert('Please fill in all required fields')
      return
    }

    // Update event registration count
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        const newRegistered = event.registered + 1
        if (newRegistered >= event.capacity) {
          alert('Event is now full! You have been added to the waitlist.')
        } else {
          alert(`Successfully registered for ${event.title}!`)
        }
        return { ...event, registered: newRegistered }
      }
      return event
    })

    setEvents(updatedEvents)
    
    // Save to content
    const updatedContent = { ...content }
    updatedContent.events.events = updatedEvents
    saveContent(updatedContent)
    setContent(updatedContent)

    // Save registration to localStorage (for demo)
    const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]')
    registrations.push({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      ...registrationData,
      registeredAt: new Date().toISOString()
    })
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations))

    setShowRegistration(false)
    setRegistrationData({ name: '', email: '', department: '' })
    setSelectedEvent(null)
  }

  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const hero = content?.events?.hero || {
    title: "Upcoming Events",
    subtitle: "Join us for workshops, training sessions, and community gatherings."
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">{hero.title}</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-md">
            {hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* View Toggle */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="mb-12">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentMonth).map((date, index) => {
                  const dayEvents = getEventsForDate(date)
                  const isToday = date && date.toDateString() === new Date().toDateString()
                  const isPast = date && date < new Date().setHours(0, 0, 0, 0)

                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-2 border rounded-lg ${
                        isToday
                          ? 'bg-primary/10 border-primary'
                          : isPast
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary' : 'text-gray-700'}`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className="text-xs bg-primary text-white px-1 py-0.5 rounded truncate cursor-pointer hover:bg-primary-dark"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedEvent(event)
                                  setShowRegistration(false)
                                }}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div 
                                className="text-xs text-gray-500 cursor-pointer hover:text-primary"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Show first event from remaining
                                  setSelectedEvent(dayEvents[2])
                                  setShowRegistration(false)
                                }}
                              >
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-6 mb-12">
            {upcomingEvents.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-500 text-lg">No upcoming events scheduled.</p>
              </div>
            ) : (
              upcomingEvents.map(event => {
                const eventDate = new Date(event.date)
                const isPast = eventDate < new Date().setHours(0, 0, 0, 0)
                const spotsLeft = event.capacity - event.registered
                const isFull = spotsLeft <= 0

                return (
                  <div
                    key={event.id}
                    className={`card hover:shadow-lg transition-shadow ${
                      isPast ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                          <div className="text-2xl font-bold text-primary">
                            {eventDate.getDate()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {monthNames[eventDate.getMonth()].substring(0, 3)}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {event.type}
                              </span>
                              {event.tags?.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-5 h-5 mr-2 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-2 text-primary" />
                            <span>
                              {event.registered} / {event.capacity} registered
                              {!isFull && ` (${spotsLeft} spots left)`}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <UserPlus className="w-5 h-5 mr-2 text-primary" />
                            <span>Organized by {event.organizer}</span>
                          </div>
                        </div>

                        {event.agenda && event.agenda.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Agenda:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {event.agenda.map((item, idx) => (
                                <li key={idx} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex gap-3">
                          {!isPast && !isFull && event.status === 'open' && (
                            <button
                              onClick={() => handleRegister(event.id)}
                              className="btn-primary flex items-center space-x-2"
                            >
                              <UserPlus size={18} />
                              <span>Register Now</span>
                            </button>
                          )}
                          {isFull && (
                            <button
                              disabled
                              className="btn-secondary flex items-center space-x-2 opacity-50 cursor-not-allowed"
                            >
                              <X size={18} />
                              <span>Event Full</span>
                            </button>
                          )}
                          {isPast && (
                            <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">
                              <CheckCircle size={18} className="mr-2" />
                              Past Event
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && !showRegistration && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedEvent(null)
            }}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-900">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {selectedEvent.type}
                  </span>
                  {selectedEvent.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">{selectedEvent.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Registration</p>
                      <p className="font-semibold text-gray-900">
                        {selectedEvent.registered} / {selectedEvent.capacity} registered
                        {selectedEvent.capacity - selectedEvent.registered > 0 && (
                          <span className="text-primary ml-2">
                            ({selectedEvent.capacity - selectedEvent.registered} spots left)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedEvent.organizer && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Organized by</p>
                    <p className="font-semibold text-gray-900">{selectedEvent.organizer}</p>
                  </div>
                )}

                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Agenda</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {selectedEvent.agenda.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  {(() => {
                    const eventDate = new Date(selectedEvent.date)
                    const isPast = eventDate < new Date().setHours(0, 0, 0, 0)
                    const spotsLeft = selectedEvent.capacity - selectedEvent.registered
                    const isFull = spotsLeft <= 0

                    if (isPast) {
                      return (
                        <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">
                          <CheckCircle size={18} className="mr-2" />
                          Past Event
                        </span>
                      )
                    }

                    if (isFull) {
                      return (
                        <button
                          disabled
                          className="flex-1 btn-secondary flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                        >
                          <X size={18} />
                          <span>Event Full</span>
                        </button>
                      )
                    }

                    if (selectedEvent.status === 'open') {
                      return (
                        <button
                          onClick={() => {
                            setShowRegistration(true)
                          }}
                          className="flex-1 btn-primary flex items-center justify-center space-x-2"
                        >
                          <UserPlus size={18} />
                          <span>Register Now</span>
                        </button>
                      )
                    }

                    return null
                  })()}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistration && selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowRegistration(false)
              setSelectedEvent(null)
            }}
          >
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
                <button
                  onClick={() => {
                    setShowRegistration(false)
                    setSelectedEvent(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedEvent.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
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
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department (Optional)
                  </label>
                  <input
                    type="text"
                    value={registrationData.department}
                    onChange={(e) => setRegistrationData({ ...registrationData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Confirm Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegistration(false)
                      setSelectedEvent(null)
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dynamic Sections */}
        {content?.events?.sections && content.events.sections.length > 0 && (
          <SectionRenderer sections={content.events.sections} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Events

