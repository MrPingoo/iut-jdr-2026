import React, { createContext, useReducer, useEffect } from 'react'
import { getLocal, setLocal } from '../utils/storage.js'
import { getInitialHp } from '../utils/hpCalculator.js'

const initialState = {
  selectedCharacter: null,
  dice: { lastResult: null },
  npcs: [],
  characterHp: 15, // Par défaut niveau 1
  npcHp: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        selectedCharacter: action.payload,
        characterHp: getInitialHp(action.payload?.level || 1)
      }
    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacter: action.payload,
        characterHp: getInitialHp(action.payload?.level || 1)
      }
    case 'SET_NPCS':
      // Initialiser les HP des NPCs selon leur niveau
      const npcHp = {}
      action.payload.forEach((npc, index) => {
        npcHp[index] = getInitialHp(npc.level || 1)
      })
      return { ...state, npcs: action.payload, npcHp }
    case 'ROLL_DICE':
      return { ...state, dice: { lastResult: action.payload } }
    case 'SET_CHARACTER_HP':
      const maxHp = getInitialHp(state.selectedCharacter?.level || 1)
      return { ...state, characterHp: Math.max(0, Math.min(maxHp, action.payload)) }
    case 'SET_NPC_HP':
      const npc = state.npcs[action.payload.index]
      const npcMaxHp = getInitialHp(npc?.level || 1)
      return {
        ...state,
        npcHp: {
          ...state.npcHp,
          [action.payload.index]: Math.max(0, Math.min(npcMaxHp, action.payload.hp))
        }
      }
    default:
      return state
  }
}

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = getLocal('selectedCharacter')
    if (saved) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: saved })
    }
  }, [])

  useEffect(() => {
    if (state.selectedCharacter) {
      setLocal('selectedCharacter', state.selectedCharacter)
    }
  }, [state.selectedCharacter])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
