import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GameContext } from '../context/GameContext'
import { createCharacter, updateCharacter, getCharacter } from '../utils/api'
import FlashMessage from '../components/FlashMessage'

const RACES = ['Nain', 'Elfe', 'Gnome', 'Humain', 'Tiefling', 'Orc']
const CLASSES = ['Barbare', 'Barde', 'Clerc', 'Druide', 'Magicien', 'Occultiste', 'Paladin', 'Rôdeur', 'Roublard']

const CHARACTER_IMAGES = {
  'Humain': '/assets/images/humain.png',
  'Elfe': '/assets/images/elfe.png',
  'Nain': '/assets/images/naim.png',
  'Gnome': '/assets/images/gnome.png',
  'Orc': '/assets/images/orc.png',
  'Tiefling': '/assets/images/tiefling.png'
}

const STAT_LABELS = {
  strength: 'Force',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Sagesse',
  dexterity: 'Dextérité',
  charisma: 'Charisme'
}

export default function Perso() {
  const navigate = useNavigate()
  const { id } = useParams() // Pour l'édition d'un personnage existant
  const { dispatch } = useContext(GameContext)

  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
    playerCount: 4,
    strength: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    dexterity: 10,
    charisma: 10
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' })

  // Charger le personnage si on est en mode édition
  useEffect(() => {
    if (id) {
      loadCharacter(id)
    }
  }, [id])

  const loadCharacter = async (characterId) => {
    try {
      setIsLoading(true)
      setError(null)
      const character = await getCharacter(characterId)

      setFormData({
        name: character.name || '',
        race: character.race || '',
        class: character.class || '',
        playerCount: character.players || 4,
        strength: character.statistic?.strength || 10,
        constitution: character.statistic?.constitution || 10,
        intelligence: character.statistic?.intelligence || 10,
        wisdom: character.statistic?.wisdom || 10,
        dexterity: character.statistic?.dexterity || 10,
        charisma: character.statistic?.charisma || 10
      })
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement du personnage:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.race || !formData.class) {
      setFlashMessage({
        message: 'Veuillez remplir tous les champs obligatoires (Nom, Race, Classe)',
        type: 'warning'
      })
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Préparer les données pour l'API (format backend Symfony)
      const characterData = {
        name: formData.name,
        race: formData.race,
        class: formData.class,
        players: parseInt(formData.playerCount),
        lvl: 1,
        statistic: {
          strength: parseInt(formData.strength),
          constitution: parseInt(formData.constitution),
          intelligence: parseInt(formData.intelligence),
          wisdom: parseInt(formData.wisdom),
          dexterity: parseInt(formData.dexterity),
          charisma: parseInt(formData.charisma)
        }
      }

      let result
      if (id) {
        // Mode édition
        result = await updateCharacter(id, characterData)
        setFlashMessage({
          message: `${formData.name} a été modifié avec succès !`,
          type: 'success'
        })
      } else {
        // Mode création
        result = await createCharacter(characterData)
        setFlashMessage({
          message: `${formData.name} a été créé avec succès !`,
          type: 'success'
        })
      }

      // Mettre à jour le contexte pour la sélection
      const character = {
        id: result.id || id,
        name: formData.name,
        race: formData.race,
        class: formData.class,
        level: characterData.lvl,
        stats: {
          strength: parseInt(formData.strength),
          constitution: parseInt(formData.constitution),
          intelligence: parseInt(formData.intelligence),
          wisdom: parseInt(formData.wisdom),
          dexterity: parseInt(formData.dexterity),
          charisma: parseInt(formData.charisma)
        },
        image: CHARACTER_IMAGES[formData.race]
      }

      dispatch({ type: 'SELECT_CHARACTER', payload: character })

      // Rediriger vers la liste des personnages après un délai pour voir le message
      setTimeout(() => {
        navigate('/board')
      }, 1500)
    } catch (err) {
      setError(err.message)
      setFlashMessage({
        message: `Erreur: ${err.message}`,
        type: 'error'
      })
      console.error('Erreur lors de la sauvegarde du personnage:', err)
    } finally {
      setIsLoading(false)
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
        <div className="hero-content character-sheet">
          <div className="hero-content-inner">
            <h1 className="hero-title">Fiche Personnage</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">{id ? 'Modifiez votre héros' : 'Créez votre héros'}</p>

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

            {isLoading && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#ffd700'
              }}>
                ⏳ Chargement...
              </div>
            )}

            <form className="hero-form" onSubmit={handleSubmit}>
              {/* Informations de base */}
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="character-name" className="form-label">Nom du personnage</label>
                  <input
                    type="text"
                    id="character-name"
                    className="form-input"
                    placeholder="Entrez le nom de votre héros"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="race" className="form-label">Race</label>
                  <select
                    id="race"
                    className="form-select"
                    value={formData.race}
                    onChange={(e) => handleChange('race', e.target.value)}
                    required
                  >
                    <option value="">Choisissez une race</option>
                    {RACES.map(race => (
                      <option key={race} value={race}>{race}</option>
                    ))}
                  </select>
                </div>

                <div className="form-col">
                  <label htmlFor="class" className="form-label">Classe</label>
                  <select
                    id="class"
                    className="form-select"
                    value={formData.class}
                    onChange={(e) => handleChange('class', e.target.value)}
                    required
                  >
                    <option value="">Choisissez une classe</option>
                    {CLASSES.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nombre de joueurs */}
              <div className="form-group">
                <label htmlFor="player-count" className="form-label">Nombre de joueurs dans la partie</label>
                <div className="range-container">
                  <input
                    type="range"
                    id="player-count"
                    className="form-range"
                    min="4"
                    max="6"
                    value={formData.playerCount}
                    onChange={(e) => handleChange('playerCount', e.target.value)}
                  />
                  <div className="player-count-display">
                    Nombre de joueurs : <span className="range-value">{formData.playerCount}</span>
                  </div>
                </div>
              </div>

              {/* Caractéristiques */}
              <h3 className="section-title">Caractéristiques</h3>

              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Compétence</th>
                    <th>Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(STAT_LABELS).map(stat => (
                    <tr key={stat}>
                      <td><label htmlFor={stat}>{STAT_LABELS[stat]}</label></td>
                      <td>
                        <input
                          type="range"
                          id={stat}
                          className="form-range stat-range"
                          min="8"
                          max="20"
                          value={formData[stat]}
                          onChange={(e) => handleChange(stat, e.target.value)}
                        />
                        <span className="range-value">{formData[stat]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="hero-buttons">
                <button type="submit" className="hero-btn hero-btn-create" disabled={isLoading}>
                  <span className="btn-icon">⚔️</span>
                  {isLoading ? 'Sauvegarde...' : (id ? 'Modifier le personnage' : 'Créer le personnage')}
                </button>
                <button
                  type="button"
                  className="hero-btn hero-btn-login"
                  onClick={() => navigate('/board')}
                  disabled={isLoading}
                >
                  <span className="btn-icon">🔙</span>
                  Retour à la liste
                </button>
              </div>
            </form>

            <div className="hero-footer">
              <div className="hero-footer-links">
                <a href="#" className="hero-footer-link">Règles du jeu</a>
                <a href="#" className="hero-footer-link">Guide des races</a>
                <a href="#" className="hero-footer-link">Guide des classes</a>
                <a href="#" className="hero-footer-link">Aide</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

