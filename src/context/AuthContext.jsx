import React, { createContext, useContext, useState, useEffect } from 'react'
import { getToken, setToken as saveToken, removeToken, isAuthenticated } from '../utils/api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken())
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    if (isAuthenticated()) {
      setTokenState(getToken())
      // On pourrait décoder le token JWT ici pour obtenir les infos utilisateur
      // Pour l'instant, on marque juste l'utilisateur comme connecté
      setUser({ authenticated: true })
    }
    setLoading(false)
  }, [])

  const login = (newToken) => {
    saveToken(newToken)
    setTokenState(newToken)
    setUser({ authenticated: true })
  }

  const logout = () => {
    removeToken()
    setTokenState(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
