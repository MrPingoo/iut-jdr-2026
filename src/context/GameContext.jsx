import React, { createContext, useReducer, useEffect } from 'react'
import { getLocal, setLocal } from '../utils/storage.js'

const initialState = {
  selectedCharacter: null,
  dice: { lastResult: null },
  npcs: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      return { ...state, selectedCharacter: action.payload }
    case 'SELECT_CHARACTER':
      return { ...state, selectedCharacter: action.payload }
    case 'SET_NPCS':
      return { ...state, npcs: action.payload }
    case 'ROLL_DICE':
      return { ...state, dice: { lastResult: action.payload } }
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
