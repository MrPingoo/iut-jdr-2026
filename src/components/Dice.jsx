import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import { rollD20 } from '../utils/dice'

export default function Dice() {
  const { state, dispatch } = useContext(GameContext)
  const [visible, setVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState(20)

  useEffect(() => {
    if (state.dice.lastResult !== null) {
      setDisplayValue(state.dice.lastResult)
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 2000)
      return () => clearTimeout(t)
    }
  }, [state.dice.lastResult])

  function handleRoll() {
    // Animation: rounds before final
    let count = 0
    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random()*20)+1)
      count++
      if (count >= 15) {
        clearInterval(interval)
        const r = rollD20()
        dispatch({ type: 'ROLL_DICE', payload: r })
      }
    }, 100)
  }

  return (
    <div className="dice-result" id="dice-result" style={{ display: visible ? 'block' : 'none' }} onClick={() => setVisible(false)}>
      <div className="dice-animation">🎲</div>
      <div className="dice-value" id="dice-value">{displayValue}</div>
      <div style={{ color: '#c9aa71', marginTop: '1rem' }}>Résultat du dé !</div>
    </div>
  )
}

