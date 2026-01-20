import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AINews from './pages/AINews'
import './App.css'

function App() {
  return (
    <Router>
      <div className="grain-overlay"></div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-news" element={<AINews />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
