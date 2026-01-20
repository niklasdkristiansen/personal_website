import { useState, useEffect } from 'react'
import './AINews.css'

// Blog sources configuration
const BLOG_SOURCES = [
  {
    id: 'digitalocean',
    name: 'DigitalOcean Community',
    url: 'https://www.digitalocean.com/community/tags/ai',
    description: 'Practical, hands-on AI tutorials and real-world implementation guidance',
    audience: 'Developers, DevOps engineers, AI builders',
    color: '#0080FF',
    logo: '🌊',
  },
  {
    id: 'bair',
    name: 'BAIR Blog',
    url: 'https://bair.berkeley.edu/blog/',
    description: 'Cutting-edge academic AI research and experimental ideas',
    audience: 'Researchers, graduate students, advanced AI enthusiasts',
    color: '#003262',
    logo: '🎓',
  },
  {
    id: 'openai',
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog',
    description: 'Official research updates, model releases, and AI safety discussions',
    audience: 'Developers, product leaders, AI practitioners',
    color: '#10a37f',
    logo: '🤖',
  },
  {
    id: 'kdnuggets',
    name: 'KDnuggets',
    url: 'https://www.kdnuggets.com/',
    description: 'Broad coverage of data science, ML techniques, tools, and careers',
    audience: 'Data scientists, ML engineers, career-focused learners',
    color: '#FF6600',
    logo: '📊',
  },
  {
    id: 'tds',
    name: 'Towards Data Science',
    url: 'https://towardsdatascience.com/',
    description: 'Applied ML tutorials, explainers, and real-world case studies',
    audience: 'Intermediate to advanced data scientists',
    color: '#00C853',
    logo: '📈',
  },
  {
    id: 'marktechpost',
    name: 'MarkTechPost',
    url: 'https://www.marktechpost.com/',
    description: 'Fast-moving AI research news and technical model breakdowns',
    audience: 'AI engineers, researchers, technical professionals',
    color: '#E91E63',
    logo: '📰',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog',
    description: 'Open-source ML, LLM development, and production workflows',
    audience: 'ML engineers, NLP researchers, open-source contributors',
    color: '#FFD21E',
    logo: '🤗',
  },
  {
    id: 'towardsai',
    name: 'Towards AI',
    url: 'https://towardsai.net/',
    description: 'Learning AI concepts and engaging with the AI community',
    audience: 'AI enthusiasts, early-career practitioners, self-learners',
    color: '#7C4DFF',
    logo: '🧠',
  },
  {
    id: 'holisticai',
    name: 'Holistic AI',
    url: 'https://www.holisticai.com/blog',
    description: 'AI governance, ethics, risk management, and regulation',
    audience: 'Policy leaders, compliance teams, responsible AI practitioners',
    color: '#00BCD4',
    logo: '⚖️',
  },
  {
    id: 'analyticsvidhya',
    name: 'Analytics Vidhya',
    url: 'https://www.analyticsvidhya.com/blog/',
    description: 'Building practical data science and AI skills from the ground up',
    audience: 'Students, career switchers, early practitioners',
    color: '#2196F3',
    logo: '📚',
  },
  {
    id: 'mlmastery',
    name: 'Machine Learning Mastery',
    url: 'https://machinelearningmastery.com/blog/',
    description: 'Step-by-step learning of ML fundamentals and techniques',
    audience: 'Beginners to intermediate ML learners',
    color: '#4CAF50',
    logo: '🎯',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Blog',
    url: 'https://www.anthropic.com/news',
    description: 'Claude best practices, AI research, and AI safety',
    audience: 'Developers building with Claude, product teams',
    color: '#D4A574',
    logo: '🔬',
  },
]

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

// Format date for display
function formatDate(dateString) {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      // If it's not a valid date, return the original string (might be "Jan 15, 2026" format)
      return dateString
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

function AINews() {
  const [postDates, setPostDates] = useState({})

  useEffect(() => {
    // Fetch from GitHub raw URL (works after first Action run)
    // Falls back to local file during development
    const fetchPostDates = async () => {
      try {
        // Try GitHub raw URL first
        const response = await fetch(
          'https://raw.githubusercontent.com/niklasdkristiansen/personal_website/main/public/posts.json'
        )
        if (response.ok) {
          const data = await response.json()
          setPostDates(data.blogs || {})
        }
      } catch {
        // Fallback to local file
        try {
          const response = await fetch('/posts.json')
          if (response.ok) {
            const data = await response.json()
            setPostDates(data.blogs || {})
          }
        } catch {
          console.log('Could not fetch post dates')
        }
      }
    }
    fetchPostDates()
  }, [])

  return (
    <div className="ai-news-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-content">
          <span className="page-tag">AI News Hub</span>
          <h1 className="page-title">AI & ML News</h1>
          <p className="page-subtitle">
            Curated sources for the latest in AI and machine learning
          </p>
        </div>
      </header>

      {/* Sources Grid */}
      <section className="sources-section">
        <div className="sources-container">
          <div className="sources-grid">
            {BLOG_SOURCES.map(source => {
              const postInfo = postDates[source.id]
              const lastPostDate = postInfo?.lastPost ? formatDate(postInfo.lastPost) : null
              
              return (
                <a 
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-card-large"
                  style={{ '--source-color': source.color }}
                >
                  <div className="source-header">
                    <span className="source-logo">{source.logo}</span>
                    <div className="source-info">
                      <h2 className="source-name">{source.name}</h2>
                      <p className="source-description">{source.description}</p>
                    </div>
                  </div>
                  
                  <div className="source-footer">
                    <div className="source-meta">
                      <span className="source-audience">{source.audience}</span>
                      {lastPostDate && (
                        <span className="source-last-post">Latest: {lastPostDate}</span>
                      )}
                    </div>
                    <span className="source-link-icon">
                      <ExternalLinkIcon />
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AINews
