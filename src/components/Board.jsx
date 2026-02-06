import React from 'react'
import CharacterCard from './CharacterCard.jsx'
import NpcPanel from './NpcPanel.jsx'

export default function Board() {
  return (
    <div className="game-sidebar">
      <div className="character-panel">
        <CharacterCard />
      </div>
      <NpcPanel />
    </div>
  )
}
