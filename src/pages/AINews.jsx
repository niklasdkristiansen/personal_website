import { useState } from 'react'
import './AINews.css'

const BLOGS = [
  { name: 'DigitalOcean Community', url: 'https://www.digitalocean.com/community/tags/ai', desc: 'Hands-on AI tutorials' },
  { name: 'BAIR Blog', url: 'https://bair.berkeley.edu/blog/', desc: 'Academic AI research' },
  { name: 'OpenAI Blog', url: 'https://openai.com/blog', desc: 'Research & model releases' },
  { name: 'KDnuggets', url: 'https://www.kdnuggets.com/', desc: 'Data science & ML' },
  { name: 'Towards Data Science', url: 'https://towardsdatascience.com/', desc: 'Applied ML tutorials' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/', desc: 'AI research news' },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog', desc: 'Open-source ML & LLMs' },
  { name: 'Towards AI', url: 'https://towardsai.net/', desc: 'AI learning & community' },
  { name: 'Holistic AI', url: 'https://www.holisticai.com/blog', desc: 'AI governance & ethics' },
  { name: 'Analytics Vidhya', url: 'https://www.analyticsvidhya.com/blog/', desc: 'Data science skills' },
  { name: 'Machine Learning Mastery', url: 'https://machinelearningmastery.com/blog/', desc: 'ML fundamentals' },
  { name: 'Anthropic Blog', url: 'https://www.anthropic.com/news', desc: 'Claude & AI safety' },
]

const PODCASTS = [
  { name: 'How I AI', url: 'https://www.howiai.com/', desc: 'Practical AI workflows with live demos' },
  { name: 'High Agency', url: 'https://www.highagency.com/', desc: 'Building AI products in production' },
  { name: 'Latent Space', url: 'https://www.latent.space/', desc: 'AI engineering deep dives' },
  { name: 'Practical AI', url: 'https://changelog.com/practicalai', desc: 'Making AI practical & accessible' },
  { name: 'The AI Podcast (Nvidia)', url: 'https://blogs.nvidia.com/ai-podcast/', desc: 'AI impact across industries' },
  { name: 'Me, Myself, and AI', url: 'https://sloanreview.mit.edu/tag/me-myself-and-ai/', desc: 'MIT Sloan + BCG on AI wins' },
  { name: 'In Machines We Trust', url: 'https://www.technologyreview.com/inmachineswetrust', desc: 'MIT Tech Review on AI in daily life' },
  { name: 'DeepMind: The Podcast', url: 'https://www.deepmind.com/the-podcast', desc: 'AI research from Google DeepMind' },
  { name: 'Eye on AI', url: 'https://www.eye-on.ai/', desc: 'Weekly AI news & analysis' },
  { name: 'TWIML AI', url: 'https://twimlai.com/', desc: 'This Week in ML & AI' },
  { name: 'Lex Fridman Podcast', url: 'https://lexfridman.com/podcast/', desc: 'Deep conversations on AI & science' },
  { name: 'The Robot Brains', url: 'https://www.therobotbrains.ai/', desc: 'Pieter Abbeel interviews AI leaders' },
  { name: 'The Gradient Podcast', url: 'https://thegradientpub.substack.com/s/podcast', desc: 'Deep technical AI research talks' },
  { name: 'Data Skeptic', url: 'https://dataskeptic.com/', desc: 'ML, stats & AI theory explained' },
  { name: 'AI in Business', url: 'https://emerj.com/ai-podcast/', desc: 'AI tactics for business leaders' },
]

const YOUTUBE = [
  { name: 'Dave Ebbelaar', url: 'https://www.youtube.com/@daveebbelaar', desc: 'AI engineering & LLM development' },
  { name: 'Two Minute Papers', url: 'https://www.youtube.com/@TwoMinutePapers', desc: 'AI research in bite-sized videos' },
  { name: 'DeepLearning.AI', url: 'https://www.youtube.com/@Deeplearningai', desc: 'Andrew Ng\'s career-focused AI courses' },
  { name: 'AI Explained', url: 'https://www.youtube.com/@aiexplained-official', desc: 'Deep dives into AI developments' },
  { name: 'Tina Huang', url: 'https://www.youtube.com/@TinaHuang1', desc: 'Data science & AI career growth' },
  { name: 'The AI Advantage', url: 'https://www.youtube.com/@aiaboratory', desc: 'Practical AI tools & workflows' },
  { name: 'Skill Leap AI', url: 'https://www.youtube.com/@SkillLeapAI', desc: 'AI tool tutorials & reviews' },
  { name: 'Wes Roth', url: 'https://www.youtube.com/@WesRoth', desc: 'AGI news & AI breakthroughs' },
  { name: 'Dwarkesh Patel', url: 'https://www.youtube.com/@DwsarkeshPatel', desc: 'Long-form AI researcher interviews' },
  { name: 'Siraj Raval', url: 'https://www.youtube.com/@SirajRaval', desc: 'Energetic ML coding tutorials' },
  { name: 'Matt Wolfe', url: 'https://www.youtube.com/@maboratory', desc: 'AI tools & FutureTools.io' },
  { name: 'AI Foundations', url: 'https://www.youtube.com/@ai-foundations', desc: 'Vibe coding & AI automation' },
  { name: 'Alex Finn', url: 'https://www.youtube.com/@AlexFinnAI', desc: 'No-code AI app building' },
  { name: 'Andrej Karpathy', url: 'https://www.youtube.com/@AndrejKarpathy', desc: 'Former Tesla AI Director\'s tutorials' },
  { name: '3Blue1Brown', url: 'https://www.youtube.com/@3blue1brown', desc: 'Beautiful math & neural net visuals' },
]

const ChevronIcon = ({ isOpen }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

function ExpandableSection({ title, emoji, items, comingSoon }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="expandable-section">
      <button 
        className={`section-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="section-title">
          <span className="section-emoji">{emoji}</span>
          <span className="section-name">{title}</span>
          <span className="section-count">{items.length > 0 ? items.length : 'Coming soon'}</span>
        </div>
        <ChevronIcon isOpen={isOpen} />
      </button>
      
      {isOpen && (
        <div className="section-content">
          {comingSoon || items.length === 0 ? (
            <p className="coming-soon-text">Coming soon...</p>
          ) : (
            <ul className="resource-list">
              {items.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    <div className="resource-info">
                      <span className="resource-name">{item.name}</span>
                      <span className="resource-desc">{item.desc}</span>
                    </div>
                    <ExternalLinkIcon />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function AINews() {
  return (
    <div className="ai-news-page">
      {/* Header */}
      <header className="page-header">
        <h1 className="page-title">Staying Up to Date with AI</h1>
        <p className="page-subtitle">Blogs, podcasts, and channels I follow</p>
      </header>

      {/* Expandable Sections */}
      <section className="resources-section">
        <div className="resources-container">
          <ExpandableSection 
            title="Blogs Worth Following" 
            emoji="📝" 
            items={BLOGS}
          />
          <ExpandableSection 
            title="Podcasts" 
            emoji="🎙️" 
            items={PODCASTS}
          />
          <ExpandableSection 
            title="YouTube Channels" 
            emoji="📺" 
            items={YOUTUBE}
          />
        </div>
      </section>
    </div>
  )
}

export default AINews
