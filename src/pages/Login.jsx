import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation simple
    if (email && password) {
      // Redirection vers le board après connexion
      navigate('/board')
    }
  }

  return (
    <div className="hero-page">
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">Se connecter</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Bienvenue, aventurier</p>

            <form className="hero-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Adresse e-mail</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="hero-buttons">
                <button type="submit" className="hero-btn hero-btn-login">
                  <span className="btn-icon">🛡️</span>
                  Se connecter
                </button>
                <button
                  type="button"
                  className="hero-btn hero-btn-create"
                  onClick={() => navigate('/')}
                >
                  <span className="btn-icon">🔙</span>
                  Retour
                </button>
              </div>
            </form>

            <div className="hero-footer">
              <div className="hero-footer-links">
                <button
                  className="hero-footer-link"
                  onClick={() => navigate('/create')}
                >
                  Créer un compte
                </button>
                <a href="#" className="hero-footer-link">Mot de passe oublié ?</a>
                <a href="#" className="hero-footer-link">Aide</a>
                <a href="#" className="hero-footer-link">Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

