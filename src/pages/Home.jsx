import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Home.css'

function Home() {
  const orbsRef = useRef([])

  useEffect(() => {
    if (window.innerWidth <= 1024) return

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          const speed = (index + 1) * 20
          const xMove = (x - 0.5) * speed
          const yMove = (y - 0.5) * speed
          orb.style.transform = `translate(${xMove}px, ${yMove}px)`
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero" id="about">
      <div className="hero-content">
        <div className="hero-badge">Welcome to my corner of the internet</div>
        <h1 className="hero-title">
          <span className="line">Hello, I'm</span>
          <span className="line highlight">Your Name</span>
        </h1>
        <p className="hero-description">
          I'm passionate about the intersection of technology and human potential. 
          Currently exploring the frontiers of artificial intelligence and sharing 
          insights along the way. By day, I build things that matter. By night, 
          I dive deep into research papers and emerging tech.
        </p>
        <div className="hero-cta">
          <Link to="/ai-news" className="btn btn-primary">
            Explore AI News
          </Link>
          <a href="mailto:your@email.com" className="btn btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-card card-1">
          <span className="card-icon">🤖</span>
          <span>AI Research</span>
        </div>
        <div className="floating-card card-2">
          <span className="card-icon">💡</span>
          <span>Innovation</span>
        </div>
        <div className="floating-card card-3">
          <span className="card-icon">🚀</span>
          <span>Future Tech</span>
        </div>
        <div className="orb orb-1" ref={el => orbsRef.current[0] = el}></div>
        <div className="orb orb-2" ref={el => orbsRef.current[1] = el}></div>
      </div>
    </section>
  )
}

export default Home
