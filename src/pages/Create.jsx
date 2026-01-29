import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../utils/api'

export default function Create() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = (value) => {
    setPassword(value)
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword)
    }
  }

  const handleConfirmChange = (value) => {
    setConfirmPassword(value)
    setPasswordMatch(password === value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!passwordMatch) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (!username || !email || !password) {
      setError('Tous les champs sont requis')
      return
    }

    setLoading(true)

    try {
      // Appel à l'API d'inscription
      await register(email, password)

      // Redirection vers la page de connexion après inscription
      navigate('/login', { state: { message: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.' } })
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero-page">
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">Créer un compte</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Rejoignez l'aventure</p>

            {error && (
              <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '4px', color: '#dc2626' }}>
                {error}
              </div>
            )}

            <form className="hero-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="Mot de passe sécurisé"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">Répéter le mot de passe</label>
                <input
                  type="password"
                  id="confirm-password"
                  className={`form-input ${!passwordMatch && confirmPassword ? 'error' : ''}`}
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  required
                />
                {!passwordMatch && confirmPassword && (
                  <p className="form-error">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              <div className="hero-buttons">
                <button
                  type="submit"
                  className="hero-btn hero-btn-create"
                  disabled={!passwordMatch || loading}
                >
                  <span className="btn-icon">⚔️</span>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </button>
                <button
                  type="button"
                  className="hero-btn hero-btn-login"
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
                  onClick={() => navigate('/login')}
                >
                  Déjà un compte ?
                </button>
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

