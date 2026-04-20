import './Projects.css'

const PROJECTS = [
  {
    name: 'AutoStox',
    url: 'https://staging.autostox.ai',
    tagline: 'AI-driven stock research and automated trading',
    tech: '.NET 10 / Angular 19 full-stack with Python research sandbox (FastAPI, scikit-learn, yfinance); PostgreSQL on GKE via Terraform + Cloud Build',
    emoji: '📈'
  },
  {
    name: 'PlayGames.social',
    url: 'https://playgames.social',
    tagline: 'Real-time multiplayer Sudoku and GeoGuess',
    tech: 'Next.js 15 / React 19 + FastAPI with native WebSockets, PostgreSQL, Clerk auth, Azure App Service',
    emoji: '🎮'
  },
  {
    name: 'stamina-buyer',
    url: 'https://github.com/niklasdkristiansen/stamina-buyer',
    tagline: 'Desktop automation for in-game purchases',
    tech: 'Python OpenCV + pyautogui automation; Typer CLI + customtkinter GUI, packaged with Hatch and PyInstaller',
    emoji: '🤖'
  }
]

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

function Projects() {
  return (
    <div className="projects-page">
      <header className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Things I'm building</p>
      </header>

      <section className="projects-section">
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <a 
              key={index}
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-emoji">{project.emoji}</div>
              <div className="project-info">
                <h2 className="project-name">{project.name}</h2>
                <p className="project-desc">{project.tagline}</p>
                <p className="project-tech">{project.tech}</p>
              </div>
              <ExternalLinkIcon />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
