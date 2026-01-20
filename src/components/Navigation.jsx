import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../context/GameContext'

export default function Navigation() {
  const navigate = useNavigate()
  const { state } = useContext(GameContext)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleNavigation = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavigation('/')}>
          🎲 JDR
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button className="nav-link" onClick={() => handleNavigation('/')}>
              🏠 Accueil
            </button>
          </li>
          {state.selectedCharacter ? (
            <>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/game')}>
                  🎮 Partie
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/board')}>
                  📋 Mes Personnages
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/perso')}>
                  ⚔️ Fiche Personnage
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link logout" onClick={() => handleNavigation('/')}>
                  🚪 Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/login')}>
                  🛡️ Se connecter
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavigation('/create')}>
                  ⚔️ Créer un compte
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

