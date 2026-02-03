import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

export default function NpcPanel() {
  const { state } = useContext(GameContext)
  const npcs = state.npcs || []

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
        {npcs.map((npc, index) => (
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
          </div>
        ))}
      </div>
    </div>
  )
}
