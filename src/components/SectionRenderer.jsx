import { useMemo } from 'react'

const SectionRenderer = ({ sections = [] }) => {
  const sortedSections = useMemo(() => {
    return [...sections].sort((a, b) => (a.order || 0) - (b.order || 0))
  }, [sections])

  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {sortedSections.map((section, index) => (
        <section key={section.id || index} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {section.title && (
            <h2 className="section-title mb-6">{section.title}</h2>
          )}
          {section.content && (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </section>
      ))}
    </div>
  )
}

export default SectionRenderer

