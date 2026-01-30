import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { GameProvider } from './context/GameContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navigation from './components/Navigation.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Create from './pages/Create.jsx'
import Board from './pages/Board.jsx'
import Perso from './pages/Perso.jsx'
import Game from './pages/Game.jsx'

export default function App() {
  const location = useLocation()

  // Les pages qui ne doivent pas avoir la navigation
  const hideNavPages = ['/game']
  const showNav = !hideNavPages.includes(location.pathname)

  return (
    <AuthProvider>
      <GameProvider>
        {showNav && <Navigation />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
          <Route path="/perso" element={<ProtectedRoute><Perso /></ProtectedRoute>} />
          <Route path="/perso/:id" element={<ProtectedRoute><Perso /></ProtectedRoute>} />
          <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        </Routes>
      </GameProvider>
    </AuthProvider>
  )
}
