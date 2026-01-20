import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../context/GameContext'

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
  const { state, dispatch } = useContext(GameContext)

  const [formData, setFormData] = useState({
    name: state.selectedCharacter?.name || '',
    race: state.selectedCharacter?.race || '',
    class: state.selectedCharacter?.class || '',
    playerCount: 4,
    strength: state.selectedCharacter?.stats?.strength || 10,
    constitution: state.selectedCharacter?.stats?.constitution || 10,
    intelligence: state.selectedCharacter?.stats?.intelligence || 10,
    wisdom: state.selectedCharacter?.stats?.wisdom || 10,
    dexterity: state.selectedCharacter?.stats?.dexterity || 10,
    charisma: state.selectedCharacter?.stats?.charisma || 10
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.race || !formData.class) {
      alert('Veuillez remplir tous les champs obligatoires (Nom, Race, Classe)')
      return
    }

    const character = {
      name: formData.name,
      race: formData.race,
      class: formData.class,
      level: 1,
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
    navigate('/board')
  }

  return (
    <div className="hero-page">
      <div className="background-pattern"></div>
      <div className="hero-container">
        <div className="hero-content character-sheet">
          <div className="hero-content-inner">
            <h1 className="hero-title">Fiche Personnage</h1>
            <div className="hero-divider"></div>
            <p className="hero-subtitle">Créez votre héros</p>

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
                <button type="submit" className="hero-btn hero-btn-create">
                  <span className="btn-icon">⚔️</span>
                  Créer le personnage
                </button>
                <button
                  type="button"
                  className="hero-btn hero-btn-login"
                  onClick={() => navigate('/')}
                >
                  <span className="btn-icon">🔙</span>
                  Retour à l'accueil
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

