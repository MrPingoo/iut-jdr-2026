import React, { createContext, useReducer, useEffect } from 'react'
import { getLocal, setLocal } from '../utils/storage.js'
import { getInitialHp } from '../utils/hpCalculator.js'
import { getLevelFromXp } from '../utils/xpCalculator.js'

const initialState = {
  selectedCharacter: null,
  dice: { lastResult: null },
  npcs: [],
  characterHp: 15, // Par défaut niveau 1
  npcHp: {},
  characterXp: 0,
  npcXp: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        selectedCharacter: action.payload,
        characterHp: getInitialHp(action.payload?.level || 1),
        characterXp: action.payload?.xp || 0
      }
    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacter: action.payload,
        characterHp: getInitialHp(action.payload?.level || 1),
        characterXp: action.payload?.xp || 0
      }
    case 'SET_NPCS':
      // Initialiser les HP et XP des NPCs selon leur niveau
      const npcHp = {}
      const npcXp = {}
      action.payload.forEach((npc, index) => {
        npcHp[index] = getInitialHp(npc.level || 1)
        npcXp[index] = npc.xp || 0
      })
      return { ...state, npcs: action.payload, npcHp, npcXp }
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
    case 'ADD_CHARACTER_XP':
      const newCharacterXp = state.characterXp + action.payload
      const newCharacterLevel = getLevelFromXp(newCharacterXp)
      const oldCharacterLevel = state.selectedCharacter?.level || 1

      // Mettre à jour le personnage avec le nouveau niveau et XP
      const updatedCharacter = {
        ...state.selectedCharacter,
        level: newCharacterLevel,
        xp: newCharacterXp
      }

      // Si niveau augmenté, restaurer les PV au max
      const updatedCharacterHp = newCharacterLevel > oldCharacterLevel
        ? getInitialHp(newCharacterLevel)
        : state.characterHp

      return {
        ...state,
        selectedCharacter: updatedCharacter,
        characterXp: newCharacterXp,
        characterHp: updatedCharacterHp
      }
    case 'ADD_NPC_XP':
      const npcIndex = action.payload.index
      const currentNpc = state.npcs[npcIndex]
      const newNpcXp = (state.npcXp[npcIndex] || 0) + action.payload.xp
      const newNpcLevel = getLevelFromXp(newNpcXp)
      const oldNpcLevel = currentNpc?.level || 1

      // Mettre à jour le NPC
      const updatedNpcs = [...state.npcs]
      updatedNpcs[npcIndex] = {
        ...currentNpc,
        level: newNpcLevel,
        xp: newNpcXp
      }

      // Si niveau augmenté, restaurer les PV au max
      const updatedNpcHp = newNpcLevel > oldNpcLevel
        ? getInitialHp(newNpcLevel)
        : state.npcHp[npcIndex]

      return {
        ...state,
        npcs: updatedNpcs,
        npcXp: {
          ...state.npcXp,
          [npcIndex]: newNpcXp
        },
        npcHp: {
          ...state.npcHp,
          [npcIndex]: updatedNpcHp
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
