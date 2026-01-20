import './Home.css'

function Home() {
  return (
    <section className="hero" id="about">
      <div className="hero-content">
        <h1 className="hero-title">Niklas Kristiansen</h1>
        <p className="hero-subtitle">Software Engineer in Seattle</p>
        <p className="hero-description">
          I build cloud platforms, developer tools, and AI-powered automation. 
          Currently at Arzeda, where I'm scaling an internal LLM agent platform 
          and leading infrastructure across AWS and Azure.
        </p>
        <p className="hero-description">
          Passionate about how AI and ML are transforming industries, from healthcare 
          and scientific research to creative work and everyday productivity. 
          Especially excited about biotech's role in building a sustainable future 
          and curing diseases.
        </p>
      </div>
    </section>
  )
}

export default Home
