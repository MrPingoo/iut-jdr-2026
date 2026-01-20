import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../context/GameContext'

const CHARACTER_IMAGES = {
  'Humain': '/assets/images/humain.png',
  'Elfe': '/assets/images/elfe.png',
  'Nain': '/assets/images/naim.png',
  'Gnome': '/assets/images/gnome.png',
  'Orc': '/assets/images/orc.png',
  'Tiefling': '/assets/images/tiefling.png'
}

export default function Board() {
  const navigate = useNavigate()
  const { dispatch } = useContext(GameContext)

  // Exemple de personnages
  const [characters] = useState([
    { id: 1, name: 'Grimjaw le Sombre', race: 'Orc', class: 'Barbare' },
    { id: 2, name: 'Elaria Luneverte', race: 'Elfe', class: 'Rôdeur' },
    { id: 3, name: 'Thorin Barbe-de-Fer', race: 'Nain', class: 'Paladin' },
    { id: 4, name: 'Lyralei Ventelame', race: 'Elfe', class: 'Magicien' },
    { id: 5, name: 'Zephyr l\'Ombre', race: 'Humain', class: 'Roublard' }
  ])

  const handleSelectCharacter = (character) => {
    const selectedCharacter = {
      name: character.name,
      race: character.race,
      class: character.class,
      level: 10,
      stats: {
        strength: 15,
        constitution: 14,
        intelligence: 12,
        wisdom: 13,
        dexterity: 16,
        charisma: 10
      },
      image: CHARACTER_IMAGES[character.race] || CHARACTER_IMAGES['Humain']
    }

    dispatch({ type: 'SELECT_CHARACTER', payload: selectedCharacter })
    navigate('/game')
  }

  return (
    <div className="hero-page">
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content board-container">
          <div className="hero-content-inner">
            <div className="board-header">
              <h1 className="hero-title">Mes Personnages</h1>
              <div className="hero-divider"></div>
              <p className="hero-subtitle">Gérez vos héros et commencez l'aventure</p>
            </div>

            <div className="character-list">
              <table className="character-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Race / Classe</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.length === 0 ? (
                    <tr>
                      <td colSpan="3">
                        <div className="empty-state">
                          <div className="empty-state-icon">⚔️</div>
                          <div className="empty-state-text">Aucun personnage créé pour le moment</div>
                          <p>Commencez par créer votre premier héros !</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    characters.map(char => (
                      <tr key={char.id}>
                        <td className="character-name">{char.name}</td>
                        <td>
                          <span className="race">{char.race}</span>
                          {' / '}
                          <span className="class">{char.class}</span>
                        </td>
                        <td className="action-cell">
                          <div className="action-buttons">
                            <button
                              className="action-btn btn-play"
                              onClick={() => handleSelectCharacter(char)}
                            >
                              ▶ Jouer
                            </button>
                            <button
                              className="action-btn btn-edit"
                              onClick={() => navigate('/perso')}
                            >
                              ✏ Éditer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="create-character-section">
              <button
                className="hero-btn-create-new"
                onClick={() => navigate('/perso')}
              >
                <span className="btn-icon">✨</span>
                Créer un nouveau personnage
              </button>
            </div>

            <div className="hero-footer" style={{ marginTop: '3rem' }}>
              <div className="hero-footer-links">
                <button
                  className="hero-footer-link"
                  onClick={() => navigate('/')}
                >
                  Retour à l'accueil
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

