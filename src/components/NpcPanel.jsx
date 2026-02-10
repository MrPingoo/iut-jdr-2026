import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { calculateMaxHp } from '../utils/hpCalculator'

export default function NpcPanel() {
  const { state, dispatch } = useContext(GameContext)
  const npcs = state.npcs || []
  const npcHp = state.npcHp || {}

  if (!npcs || npcs.length === 0) {
    return null
  }

  return (
    <div className="companions-panel">
      <h3 className="companions-title">
        <span className="npc-icon">👥</span>
        Compagnons d'aventure
      </h3>
      <div className="companions-list">
        {npcs.map((npc, index) => {
          const maxHp = calculateMaxHp(npc.level || 1)
          const currentHp = npcHp[index] || maxHp
          const hpPercentage = (currentHp / maxHp) * 100

          return (
            <div key={index} className="companion-card">
              <div className="companion-header">
                <span className="companion-name">{npc.name}</span>
                <span className="companion-level">Niv. {npc.level}</span>
              </div>
              <div className="companion-info">
                <span className="companion-race">{npc.race}</span>
                <span className="companion-separator">•</span>
                <span className="companion-class">{npc.class}</span>
              </div>
              {npc.personality && (
                <div className="companion-personality">
                  <em>{npc.personality}</em>
                </div>
              )}

              {/* Barre de PV pour le compagnon */}
              <div className="hp-container companion-hp">
                <div className="hp-bar-wrapper">
                  <div className="hp-bar hp-bar-small">
                    <div className="hp-bar-fill" style={{ width: `${hpPercentage}%` }}></div>
                    <div className="hp-text hp-text-small">{currentHp} / {maxHp}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
