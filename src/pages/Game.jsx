import React from 'react'
import { useNavigate } from 'react-router-dom'
import Board from '../components/Board'
import Chat from '../components/Chat'
import Dice from '../components/Dice'

export default function Game() {
  const navigate = useNavigate()

  return (
    <div className="hero-page game-page">
      <div className="background-pattern"></div>

      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
        <button
          className="btn-back"
          onClick={() => navigate('/board')}
          title="Retour au tableau de bord"
        >
          <span className="btn-back-icon">←</span>
          <span>Retour</span>
        </button>
      </div>

      <div className="game-layout">
        <Board />
        <div className="game-main">
          <div className="chat-area">
            <Chat />
          </div>
        </div>
      </div>
      <Dice />
    </div>
  )
}

