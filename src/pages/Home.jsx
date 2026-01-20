import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="hero-page">
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">Donjons et Dragons</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Entrez dans votre monde</p>

            <div className="hero-buttons">
              <button
                className="hero-btn hero-btn-login"
                onClick={() => navigate('/login')}
              >
                <span className="btn-icon">🛡️</span>
                Se connecter
              </button>
              <button
                className="hero-btn hero-btn-create"
                onClick={() => navigate('/create')}
              >
                <span className="btn-icon">⚔️</span>
                Créer un compte
              </button>
            </div>

            <div className="hero-footer">
              <div className="hero-footer-links">
                <a href="#" className="hero-footer-link">Aide</a>
                <a href="#" className="hero-footer-link">Support</a>
                <a href="#" className="hero-footer-link">Forums</a>
                <a href="#" className="hero-footer-link">Boutique</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

