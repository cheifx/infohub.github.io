// Content data structure - editable via admin panel
export let contentData = {
  landing: {
    hero: {
      title: "Welcome to Digital RPT Lab",
      subtitle: "Your central hub for digital transformation news, initiatives, and resources. Stay connected, stay informed, and be part of the change.",
      ctaPrimary: "Explore News Feed",
      ctaSecondary: "View Initiatives"
    },
    sections: [],
    stats: [
      { icon: "TrendingUp", label: "Active Initiatives", value: "50+" },
      { icon: "Users", label: "Team Members", value: "200+" },
      { icon: "Lightbulb", label: "Ideas Submitted", value: "150+" }
    ],
    newsItems: [
      {
        id: 1,
        title: "Digital Transformation Milestone: 50 Initiatives Launched",
        content: "We're excited to announce that we've reached a major milestone with 50 active initiatives across the organization. This represents a significant step forward in our digital transformation journey.",
        author: "Sarah Chen",
        date: "2024-01-15",
        category: "Milestone",
        likes: 42,
        comments: 8,
        shares: 15
      },
      {
        id: 2,
        title: "New Playbook Section: Design Thinking Framework",
        content: "We've added comprehensive guidelines on Design Thinking to our Playbook. Learn how to apply this human-centered approach to solve complex problems and drive innovation in your projects.",
        author: "Michael Rodriguez",
        date: "2024-01-12",
        category: "Update",
        likes: 38,
        comments: 12,
        shares: 22
      },
      {
        id: 3,
        title: "Success Story: Customer Portal Initiative",
        content: "The Customer Portal initiative has successfully improved customer satisfaction by 35% and reduced support tickets by 28%. Read about the journey and key learnings from the team.",
        author: "Emily Watson",
        date: "2024-01-10",
        category: "Success Story",
        likes: 56,
        comments: 15,
        shares: 31
      },
      {
        id: 4,
        title: "Upcoming Workshop: Agile Project Management",
        content: "Join us for an interactive workshop on Agile Project Management fundamentals. Perfect for teams starting their agile journey. Registration opens next week.",
        author: "David Kim",
        date: "2024-01-08",
        category: "Event",
        likes: 29,
        comments: 6,
        shares: 18
      }
    ]
  },
  about: {
    hero: {
      title: "About the Transformation",
      subtitle: "Discover our journey, vision, and the people driving digital transformation across the organization."
    },
    sections: [],
    vision: "To become a digitally-native organization that leverages technology to create exceptional value for customers and employees while driving sustainable growth.",
    mission: "Empower every team member with the tools, knowledge, and mindset to drive continuous innovation and digital excellence.",
    values: ["Innovation", "Collaboration", "Customer-Centricity", "Agility", "Transparency"],
    keyMetrics: ["Customer Satisfaction", "Employee Engagement", "Time to Market", "Operational Efficiency", "Innovation Rate"],
    businessGoals: [
      { goal: "Increase operational efficiency by 30%", progress: 65 },
      { goal: "Improve customer satisfaction scores by 25%", progress: 72 },
      { goal: "Reduce time-to-market for new products by 40%", progress: 58 },
      { goal: "Achieve 80% employee engagement in digital initiatives", progress: 68 },
      { goal: "Generate $10M in cost savings through automation", progress: 45 }
    ],
    timeline: [
      { phase: "Phase 1: Foundation", period: "Q1 2024", status: "completed", description: "Establish core team, define vision, and set up infrastructure" },
      { phase: "Phase 2: Pilot Programs", period: "Q2 2024", status: "completed", description: "Launch 10 pilot initiatives and establish frameworks" },
      { phase: "Phase 3: Scale", period: "Q3-Q4 2024", status: "in-progress", description: "Scale successful pilots and expand to 50+ initiatives" },
      { phase: "Phase 4: Optimize", period: "2025", status: "planned", description: "Optimize processes, measure impact, and continuous improvement" }
    ],
    team: [
      { name: "Sarah Chen", role: "Transformation Lead", department: "Strategy" },
      { name: "Michael Rodriguez", role: "Agile Coach", department: "Operations" },
      { name: "Emily Watson", role: "Innovation Manager", department: "Product" },
      { name: "David Kim", role: "Change Management Lead", department: "HR" },
      { name: "Lisa Anderson", role: "Technology Architect", department: "IT" },
      { name: "James Wilson", role: "Data Analytics Lead", department: "Analytics" }
    ],
    processTitle: "Our Process",
    processSteps: [
      { step: "1", title: "Discover", description: "Identify opportunities and understand user needs" },
      { step: "2", title: "Design", description: "Create solutions using design thinking principles" },
      { step: "3", title: "Develop", description: "Build and test using agile methodologies" },
      { step: "4", title: "Deploy", description: "Launch, measure, and iterate continuously" }
    ]
  },
  portfolio: {
    hero: {
      title: "Initiative Portfolio",
      subtitle: "Explore active initiatives, access knowledge resources, and connect with teams driving digital transformation."
    },
    sections: [],
    allTabLabel: "All Think Tanks",
    tabsHelpText: "Tabs organize initiatives by transformation focus area. Categories are sub-filters within each tab.",
    tabs: [
      { id: "data-strategy", label: "Data Strategy", description: "Initiatives focused on data governance, analytics, and strategic data utilization." },
      { id: "standardization", label: "Standardization", description: "Projects aimed at standardizing processes, systems, and practices across the organization." },
      { id: "digitalization", label: "Digitalization", description: "Efforts to digitize operations, enhance digital capabilities, and drive digital innovation." }
    ],
    knowledgeHubTitle: "Knowledge Hub",
    knowledgeHubSections: [
      {
        icon: "BookOpen",
        title: "Best Practices Library",
        description: "Curated collection of proven methodologies and frameworks from successful initiatives.",
        linkText: "Explore Library →",
        linkUrl: "/playbook"
      },
      {
        icon: "Users",
        title: "Community Discussions",
        description: "Connect with initiative teams, share experiences, and learn from peers.",
        linkText: "Join Discussion →",
        linkUrl: "/"
      },
      {
        icon: "TrendingUp",
        title: "Success Metrics",
        description: "Track performance, measure impact, and understand what drives success.",
        linkText: "View Metrics →",
        linkUrl: "/about"
      }
    ],
    initiatives: [
      {
        id: 1,
        title: "Enterprise Data Governance Framework",
        description: "Establishing comprehensive data governance policies and frameworks to ensure data quality, security, and compliance across the organization.",
        tab: "data-strategy",
        category: "Data Governance",
        status: "Active",
        teamSize: 12,
        startDate: "2024-01-15",
        impact: "High",
        knowledge: ["Data governance best practices", "Compliance frameworks", "Data quality management"],
        resources: [
          { type: "Playbook", title: "Data Governance Guide", url: "#" },
          { type: "Template", title: "Data Policy Template", url: "#" }
        ],
        rating: 4.8,
        discussions: 24
      },
      {
        id: 2,
        title: "Real-time Analytics Dashboard",
        description: "Comprehensive analytics platform providing real-time insights to drive data-driven decision making across departments.",
        tab: "data-strategy",
        category: "Data & Analytics",
        status: "Active",
        teamSize: 15,
        startDate: "2024-01-20",
        impact: "High",
        knowledge: ["Data visualization techniques", "Real-time data pipelines", "Dashboard design principles"],
        resources: [
          { type: "Playbook", title: "Analytics Framework", url: "#" },
          { type: "Tool", title: "Dashboard Template Library", url: "#" }
        ],
        rating: 4.7,
        discussions: 31
      },
      {
        id: 3,
        title: "Process Standardization Initiative",
        description: "Standardizing core business processes across departments to improve efficiency, reduce errors, and enable better collaboration.",
        tab: "standardization",
        category: "Process Improvement",
        status: "Active",
        teamSize: 18,
        startDate: "2024-02-01",
        impact: "High",
        knowledge: ["Process mapping", "BPM methodologies", "Change management"],
        resources: [
          { type: "Guide", title: "Process Standardization Playbook", url: "#" },
          { type: "Template", title: "Process Documentation Template", url: "#" }
        ],
        rating: 4.6,
        discussions: 28
      },
      {
        id: 4,
        title: "Technology Stack Standardization",
        description: "Unifying technology platforms and tools across the organization to reduce complexity and improve interoperability.",
        tab: "standardization",
        category: "IT Infrastructure",
        status: "Active",
        teamSize: 10,
        startDate: "2024-01-10",
        impact: "Medium",
        knowledge: ["Technology evaluation", "Vendor management", "Integration strategies"],
        resources: [
          { type: "Playbook", title: "Tech Stack Selection Guide", url: "#" },
          { type: "Case Study", title: "Standardization Success Stories", url: "#" }
        ],
        rating: 4.5,
        discussions: 19
      },
      {
        id: 5,
        title: "Customer Portal Digitalization",
        description: "Revolutionizing customer self-service with an intuitive digital portal that reduces support tickets by 40% and improves satisfaction scores.",
        tab: "digitalization",
        category: "Customer Experience",
        status: "Active",
        teamSize: 12,
        startDate: "2024-01-15",
        impact: "High",
        knowledge: ["User research methodologies", "React best practices", "API integration patterns"],
        resources: [
          { type: "Playbook", title: "Design Thinking Guide", url: "#" },
          { type: "Case Study", title: "Customer Portal Success Story", url: "#" }
        ],
        rating: 4.8,
        discussions: 24
      },
      {
        id: 6,
        title: "Automated Invoice Processing",
        description: "AI-powered invoice processing system that reduces manual work by 70% and accelerates payment cycles.",
        tab: "digitalization",
        category: "Process Automation",
        status: "Active",
        teamSize: 8,
        startDate: "2024-02-01",
        impact: "High",
        knowledge: ["Machine learning basics", "OCR implementation", "Workflow automation"],
        resources: [
          { type: "Guide", title: "AI Integration Playbook", url: "#" },
          { type: "Template", title: "Automation Checklist", url: "#" }
        ],
        rating: 4.6,
        discussions: 18
      }
    ]
  },
  playbook: {
    hero: {
      title: "Playbook",
      subtitle: "Self-service guides and resources to help you master the frameworks and methodologies driving our digital transformation."
    },
    sections: [],
    quickNavTitle: "Quick Navigation",
    frameworks: [
      {
        id: "agile",
        title: "Agile Project Management",
        icon: "🔄",
        description: "Learn how to run projects using Agile methodologies including Scrum, Kanban, and hybrid approaches.",
        sections: [
          {
            title: "Agile Fundamentals",
            content: "Agile is an iterative approach to project management and software development that helps teams deliver value to their customers faster and with fewer headaches.",
            topics: [
              "The Agile Manifesto and its principles",
              "Agile vs. Waterfall: When to use what",
              "Benefits of Agile methodology",
              "Common Agile misconceptions"
            ]
          },
          {
            title: "Scrum Framework",
            content: "Scrum is the most popular Agile framework, designed to help teams work together to deliver value incrementally.",
            topics: [
              "Scrum roles: Product Owner, Scrum Master, Development Team",
              "Scrum events: Sprint Planning, Daily Standup, Sprint Review, Retrospective",
              "Scrum artifacts: Product Backlog, Sprint Backlog, Increment",
              "Sprint planning and estimation techniques"
            ]
          },
          {
            title: "Kanban Method",
            content: "Kanban is a visual workflow management method that helps teams visualize work, limit work-in-progress, and maximize efficiency.",
            topics: [
              "Kanban board setup and configuration",
              "Work-in-Progress (WIP) limits",
              "Flow metrics and cycle time",
              "Continuous improvement with Kanban"
            ]
          },
          {
            title: "Agile Ceremonies",
            content: "Regular ceremonies keep teams aligned and continuously improving.",
            topics: [
              "Daily Standup: Structure and best practices",
              "Sprint Planning: How to plan effectively",
              "Sprint Review: Demonstrating value",
              "Retrospective: Continuous improvement"
            ]
          }
        ],
        resources: [
          { type: "Template", title: "Sprint Planning Template", url: "#" },
          { type: "Guide", title: "Agile Estimation Guide", url: "#" },
          { type: "Checklist", title: "Daily Standup Checklist", url: "#" }
        ]
      },
      {
        id: "lean-startup",
        title: "Lean Startup Cycle",
        icon: "🚀",
        description: "Build, Measure, Learn - Master the Lean Startup methodology to validate ideas quickly and efficiently.",
        sections: [
          {
            title: "Lean Startup Principles",
            content: "The Lean Startup methodology provides a scientific approach to creating and managing startups and getting a desired product to customers' hands faster.",
            topics: [
              "Build-Measure-Learn feedback loop",
              "Validated learning over assumptions",
              "Minimum Viable Product (MVP) concept",
              "Pivot vs. Persevere decision framework"
            ]
          },
          {
            title: "Building MVPs",
            content: "An MVP is the version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort.",
            topics: [
              "Identifying core value proposition",
              "MVP types and selection criteria",
              "Rapid prototyping techniques",
              "Testing assumptions with MVPs"
            ]
          },
          {
            title: "Measuring Success",
            content: "Metrics that matter: Focus on actionable metrics that drive decision-making.",
            topics: [
              "Vanity metrics vs. actionable metrics",
              "Key metrics: Acquisition, Activation, Retention, Revenue, Referral",
              "Cohort analysis and user segmentation",
              "A/B testing fundamentals"
            ]
          },
          {
            title: "Learning and Iterating",
            content: "Use validated learning to make informed decisions about whether to pivot or persevere.",
            topics: [
              "Conducting customer interviews",
              "Analyzing feedback and data",
              "Making pivot decisions",
              "Scaling successful experiments"
            ]
          }
        ],
        resources: [
          { type: "Template", title: "MVP Planning Template", url: "#" },
          { type: "Guide", title: "Customer Interview Guide", url: "#" },
          { type: "Tool", title: "Experiment Tracking Sheet", url: "#" }
        ]
      },
      {
        id: "design-thinking",
        title: "Design Thinking",
        icon: "💡",
        description: "Human-centered approach to innovation that integrates the needs of people, possibilities of technology, and requirements for business success.",
        sections: [
          {
            title: "Design Thinking Process",
            content: "Design Thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success.",
            topics: [
              "The five stages: Empathize, Define, Ideate, Prototype, Test",
              "Non-linear and iterative nature",
              "When to use Design Thinking",
              "Design Thinking mindset and principles"
            ]
          },
          {
            title: "Empathize",
            content: "Understanding the human needs involved, re-framing the problem in human-centric ways, and creating empathy maps.",
            topics: [
              "User research methods: Interviews, observations, surveys",
              "Creating empathy maps and personas",
              "Identifying user pain points and needs",
              "Building user journey maps"
            ]
          },
          {
            title: "Define & Ideate",
            content: "Defining the core problems and generating creative solutions.",
            topics: [
              "Problem statement formulation",
              "How Might We (HMW) questions",
              "Brainstorming techniques",
              "Ideation methods: Brainstorming, SCAMPER, Mind Mapping"
            ]
          },
          {
            title: "Prototype & Test",
            content: "Creating low-fidelity prototypes and testing with real users to gather feedback.",
            topics: [
              "Prototyping methods and tools",
              "Low-fidelity vs. high-fidelity prototypes",
              "User testing best practices",
              "Iterating based on feedback"
            ]
          }
        ],
        resources: [
          { type: "Template", title: "Empathy Map Template", url: "#" },
          { type: "Guide", title: "User Journey Mapping Guide", url: "#" },
          { type: "Tool", title: "Prototyping Toolkit", url: "#" }
        ]
      },
      {
        id: "devops",
        title: "DevOps Practices",
        icon: "⚙️",
        description: "Bridge the gap between development and operations with continuous integration, delivery, and deployment.",
        sections: [
          {
            title: "DevOps Fundamentals",
            content: "DevOps is a set of practices that combines software development and IT operations to shorten the development lifecycle.",
            topics: [
              "DevOps culture and principles",
              "CI/CD pipeline concepts",
              "Infrastructure as Code (IaC)",
              "Monitoring and observability"
            ]
          },
          {
            title: "Continuous Integration",
            content: "Automate the integration of code changes from multiple contributors into a single software project.",
            topics: [
              "Setting up CI pipelines",
              "Automated testing strategies",
              "Code quality gates",
              "Build automation best practices"
            ]
          },
          {
            title: "Continuous Deployment",
            content: "Automatically deploy code changes to production after passing automated tests.",
            topics: [
              "Deployment strategies: Blue-Green, Canary, Rolling",
              "Feature flags and toggles",
              "Rollback procedures",
              "Zero-downtime deployments"
            ]
          }
        ],
        resources: [
          { type: "Template", title: "CI/CD Pipeline Template", url: "#" },
          { type: "Guide", title: "Infrastructure as Code Guide", url: "#" },
          { type: "Checklist", title: "Deployment Checklist", url: "#" }
        ]
      }
    ],
    additionalResourcesTitle: "Additional Resources",
    additionalResources: [
      {
        icon: "Download",
        title: "Template Library",
        description: "Download ready-to-use templates for all frameworks and methodologies.",
        linkText: "Browse Templates →",
        linkAction: "template-library"
      },
      {
        icon: "BookOpen",
        title: "Video Tutorials",
        description: "Step-by-step video guides to help you get started quickly.",
        linkText: "Watch Videos →",
        linkAction: "video-tutorials"
      },
      {
        icon: "CheckCircle",
        title: "Certification Program",
        description: "Earn certifications in Agile, Design Thinking, and other methodologies.",
        linkText: "Learn More →",
        linkAction: "certification"
      }
    ]
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Have questions, ideas, or need guidance? We're here to help. Reach out to our core team for support with your digital transformation journey."
    },
    sections: [],
    formTitle: "Send us a Message",
    contactInfo: [
      {
        title: "Email",
        content: "digital-transformation@rptlab.com",
        description: "Send us an email anytime"
      },
      {
        title: "Phone",
        content: "+1 (555) 123-4567",
        description: "Mon-Fri 9am-5pm EST"
      },
      {
        title: "Office",
        content: "123 Innovation Drive",
        description: "Suite 500, Digital RPT Lab"
      }
    ],
    getInTouchTitle: "Get in Touch",
    coreTeamTitle: "Core Team",
    responseTimesTitle: "Response Times",
    teamMembers: [
      { name: "Sarah Chen", role: "Transformation Lead", email: "sarah.chen@rptlab.com" },
      { name: "Michael Rodriguez", role: "Agile Coach", email: "michael.r@rptlab.com" },
      { name: "Emily Watson", role: "Innovation Manager", email: "emily.w@rptlab.com" }
    ],
    responseTimes: {
      high: "Within 4 hours",
      medium: "Within 24 hours",
      low: "Within 2-3 business days"
    }
  },
  footer: {
    description: "Empowering digital transformation through innovation, collaboration, and continuous learning.",
    quickLinksTitle: "Quick Links",
    resourcesTitle: "Resources",
    connectTitle: "Connect",
    connectDescription: "Questions or ideas? We'd love to hear from you.",
    connectButtonText: "Get in Touch",
    copyright: "Digital RPT Lab"
  },
  navigation: {
    items: [
      { path: "/", label: "Home" },
      { path: "/about", label: "About the Transformation" },
      { path: "/portfolio", label: "Initiative Portfolio" },
      { path: "/playbook", label: "Playbook" },
      { path: "/events", label: "Events" },
      { path: "/contact", label: "Contact" }
    ]
  },
  events: {
    hero: {
      title: "Upcoming Events",
      subtitle: "Join us for workshops, training sessions, and community gatherings. Register for events that interest you and be part of our digital transformation journey."
    },
    sections: [],
    events: [
      {
        id: 1,
        title: "Agile Project Management Workshop",
        description: "Join us for an interactive workshop on Agile Project Management fundamentals. Perfect for teams starting their agile journey.",
        date: "2024-02-15",
        time: "10:00 AM - 2:00 PM",
        location: "Conference Room A / Online",
        type: "Workshop",
        capacity: 50,
        registered: 23,
        status: "open",
        organizer: "David Kim",
        tags: ["Agile", "Training", "Workshop"],
        agenda: [
          "Introduction to Agile principles",
          "Scrum framework overview",
          "Hands-on exercises",
          "Q&A session"
        ]
      },
      {
        id: 2,
        title: "Design Thinking Masterclass",
        description: "Learn how to apply Design Thinking to solve complex problems and drive innovation in your projects.",
        date: "2024-02-20",
        time: "9:00 AM - 5:00 PM",
        location: "Innovation Lab / Online",
        type: "Masterclass",
        capacity: 30,
        registered: 18,
        status: "open",
        organizer: "Emily Watson",
        tags: ["Design Thinking", "Innovation", "Training"],
        agenda: [
          "Design Thinking process",
          "Empathy mapping",
          "Prototyping techniques",
          "Case studies"
        ]
      },
      {
        id: 3,
        title: "Digital Transformation Town Hall",
        description: "Quarterly town hall meeting to share progress, celebrate wins, and discuss upcoming initiatives.",
        date: "2024-03-01",
        time: "2:00 PM - 4:00 PM",
        location: "Main Auditorium / Online",
        type: "Town Hall",
        capacity: 200,
        registered: 145,
        status: "open",
        organizer: "Sarah Chen",
        tags: ["Town Hall", "All Hands", "Update"],
        agenda: [
          "Q1 progress review",
          "Success stories",
          "Upcoming initiatives",
          "Open Q&A"
        ]
      }
    ]
  }
}

// Save function for admin panel
export const saveContent = (newContent) => {
  contentData = { ...contentData, ...newContent }
  if (typeof window !== 'undefined') {
    localStorage.setItem('rptContentData', JSON.stringify(contentData))
  }
}

// Load function
export const loadContent = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('rptContentData')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        contentData = { ...contentData, ...parsed }
      } catch (e) {
        console.error('Error loading content:', e)
      }
    }
  }
  return contentData
}

// Initialize
if (typeof window !== 'undefined') {
  loadContent()
}

