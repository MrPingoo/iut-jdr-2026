import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { calculateMaxHp } from '../utils/hpCalculator'
import XpBar from './XpBar'

export default function CharacterCard() {
  const { state } = useContext(GameContext)

  // Personnage par défaut : Grimjaw le Sombre
  const c = state.selectedCharacter || {
    name: 'Grimjaw le Sombre',
    race: 'Orc',
    class: 'Barbare',
    level: 15,
    stats: {
      strength: 20,
      constitution: 18,
      intelligence: 8,
      wisdom: 12,
      dexterity: 14,
      charisma: 10
    },
    image: '/assets/images/orc.png'
  }

  const currentHp = state.characterHp
  const maxHp = calculateMaxHp(c.level || 1)
  const hpPercentage = (currentHp / maxHp) * 100

  return (
    <div>
      <div className="character-avatar">
        <img className="character-portrait" src={c.image} alt={c.name} onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23333%22 width=%22120%22 height=%22120%22/%3E%3C/svg%3E' }} />
        <div className="character-name" id="character-name">{c.name}</div>
        <div className="character-info" id="character-info">{`${c.race} • ${c.class} • Niveau ${c.level}`}</div>
      </div>

      {/* Barre de PV */}
      <div className="hp-container">
        <div className="hp-label">Points de Vie</div>
        <div className="hp-bar-wrapper">
          <div className="hp-bar">
            <div className="hp-bar-fill" style={{ width: `${hpPercentage}%` }}></div>
            <div className="hp-text">{currentHp} / {maxHp}</div>
          </div>
        </div>
      </div>

      {/* Barre d'XP */}
      <XpBar currentXp={state.characterXp} currentLevel={c.level || 1} />

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Force</div>
          <div className="stat-value" id="stat-strength">{c.stats.strength}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Constitution</div>
          <div className="stat-value" id="stat-constitution">{c.stats.constitution}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Intelligence</div>
          <div className="stat-value" id="stat-intelligence">{c.stats.intelligence}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Sagesse</div>
          <div className="stat-value" id="stat-wisdom">{c.stats.wisdom}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Dextérité</div>
          <div className="stat-value" id="stat-dexterity">{c.stats.dexterity}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Charisme</div>
          <div className="stat-value" id="stat-charisma">{c.stats.charisma}</div>
        </div>
      </div>
    </div>
  )
}

