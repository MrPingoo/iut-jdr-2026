import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../context/GameContext'
import { getCharacters, deleteCharacter } from '../utils/api'
import FlashMessage from '../components/FlashMessage'

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

  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' })

  // Charger les personnages depuis l'API au montage du composant
  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getCharacters()
      setCharacters(data)
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement des personnages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCharacter = async (characterId, characterName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${characterName} ?`)) {
      return
    }

    try {
      await deleteCharacter(characterId)
      // Recharger la liste des personnages
      loadCharacters()
      setFlashMessage({
        message: `${characterName} a été supprimé avec succès`,
        type: 'success'
      })
    } catch (err) {
      setFlashMessage({
        message: `Erreur lors de la suppression : ${err.message}`,
        type: 'error'
      })
      console.error('Erreur lors de la suppression:', err)
    }
  }

  const handleSelectCharacter = (character) => {
    const selectedCharacter = {
      id: character.id,
      name: character.name,
      race: character.race,
      class: character.class,
      level: character.lvl || 1,
      stats: {
        strength: character.statistic?.strength || 10,
        constitution: character.statistic?.constitution || 10,
        intelligence: character.statistic?.intelligence || 10,
        wisdom: character.statistic?.wisdom || 10,
        dexterity: character.statistic?.dexterity || 10,
        charisma: character.statistic?.charisma || 10
      },
      image: CHARACTER_IMAGES[character.race] || CHARACTER_IMAGES['Humain']
    }

    dispatch({ type: 'SELECT_CHARACTER', payload: selectedCharacter })
    navigate('/game')
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
        <div className="hero-content board-container">
          <div className="hero-content-inner">
            <div className="board-header">
              <h1 className="hero-title">Mes Personnages</h1>
              <div className="hero-divider"></div>
              <p className="hero-subtitle">Gérez vos héros et commencez l'aventure</p>
            </div>

            {error && (
              <div style={{
                backgroundColor: '#ff4444',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                ⚠️ {error}
              </div>
            )}

            {isLoading ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#ffd700'
              }}>
                ⏳ Chargement des personnages...
              </div>
            ) : (
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
                              onClick={() => navigate(`/perso/${char.id}`)}
                            >
                              ✏ Éditer
                            </button>
                            <button
                              className="action-btn btn-delete"
                              onClick={() => handleDeleteCharacter(char.id, char.name)}
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            )}

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

