# Digital RPT Lab - Info Hub

A modern, interactive information hub for the Digital RPT Lab digital transformation project. This platform serves as the central location for news, initiatives, resources, and community engagement.

## Features

### 1. Landing Page (News & Community Hub)
- Interactive news feed with like, comment, and share functionality
- Submit news items and updates
- Real-time engagement metrics
- Community-driven content

### 2. About the Transformation
- Vision and mission statements
- Transformation canvas with values and key metrics
- Business goals with progress tracking
- Transformation timeline with phase status
- Core team member profiles
- Process overview

### 3. Initiative Portfolio
- Comprehensive marketplace of digital transformation initiatives
- Search and filter capabilities
- Initiative details with knowledge resources
- Community discussions and ratings
- Knowledge hub integration

### 4. Playbook
- Self-service guides for frameworks and methodologies:
  - Agile Project Management (Scrum, Kanban)
  - Lean Startup Cycle
  - Design Thinking
  - DevOps Practices
- Expandable sections with detailed content
- Resource templates and tools
- Quick navigation

### 5. Contact
- Contact form with urgency levels
- Direct contact information
- Core team directory
- Response time guidelines

## Technology Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
rptInfoHub/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Playbook.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Branding

- **Primary Color**: #0a8276 (Teal/Turquoise)
- **Design Style**: Clean, straightforward, contemporary
- **Typography**: System fonts with Tailwind defaults

## Customization

### Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#0a8276',
    dark: '#086b61',
    light: '#0d9d8e',
  },
}
```

### Content

All content is currently in the component files. For production, consider:
- Moving content to a CMS or API
- Implementing a backend for form submissions
- Adding authentication for user-specific features
- Integrating with real data sources

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Internal use for Digital RPT Lab digital transformation project.

