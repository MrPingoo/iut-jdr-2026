import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import FlashMessage from '../components/FlashMessage'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: setAuthToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' })

  useEffect(() => {
    // Récupérer le message de succès depuis la navigation
    if (location.state?.message) {
      setFlashMessage({
        message: location.state.message,
        type: 'success'
      })
      // Nettoyer le state pour éviter que le message persiste
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Appel à l'API avec username (qui est l'email)
      const data = await login(email, password)

      // Sauvegarder le token
      setAuthToken(data.token)

      setFlashMessage({
        message: 'Connexion réussie ! Redirection...',
        type: 'success'
      })

      // Redirection vers le board après connexion
      setTimeout(() => {
        navigate('/board')
      }, 1000)
    } catch (err) {
      setFlashMessage({
        message: err.message || 'Erreur de connexion',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero-page">
      <FlashMessage
        message={flashMessage.message}
        type={flashMessage.type}
        onClose={() => setFlashMessage({ message: '', type: '' })}
      />
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">Se connecter</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Bienvenue, aventurier</p>

            {success && (
              <div className="form-success" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '4px', color: '#16a34a' }}>
                {success}
              </div>
            )}

            {error && (
              <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '4px', color: '#dc2626' }}>
                {error}
              </div>
            )}

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
                <button type="submit" className="hero-btn hero-btn-login" disabled={loading}>
                  <span className="btn-icon">🛡️</span>
                  {loading ? 'Connexion...' : 'Se connecter'}
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

