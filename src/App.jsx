import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { GameProvider } from './context/GameContext.jsx'
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
    <GameProvider>
      {showNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/board" element={<Board />} />
        <Route path="/perso" element={<Perso />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </GameProvider>
  )
}
