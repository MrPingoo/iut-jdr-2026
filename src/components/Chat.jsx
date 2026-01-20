import React, { useContext, useState, useRef, useEffect } from 'react'
import { GameContext } from '../context/GameContext'

const INITIAL_MESSAGES = [
  { id: 1, author: 'Maître du Jeu', text: 'Bienvenue dans les Terres Désolées d\'Azeroth, braves aventuriers ! Vous vous tenez devant l\'entrée du donjon maudit de Rochenoire...', type: 'dm' },
  { id: 2, author: 'Narrateur', text: 'Un vent glacial souffle à travers les couloirs sombres. Vous entendez des grondements sourds provenant des profondeurs du donjon.', type: 'narrator' },
  { id: 3, author: 'Système', text: 'Grimjaw le Sombre fait un test de Perception. Lancez un dé à 20 faces !', type: 'system' },
  { id: 4, author: 'Action', text: 'Grimjaw s\'avance prudemment, sa hache à la main, scrutant les ombres à la recherche de dangers...', type: 'action' },
  { id: 5, author: 'Maître du Jeu', text: 'Excellent ! Vous remarquez des traces de pattes de gobelins sur le sol poussiéreux. Il semble qu\'ils soient passés récemment...', type: 'dm' },
  { id: 6, author: 'Système', text: 'Initiative de combat ! Tous les joueurs lancent 1d20 + modificateur de Dextérité.', type: 'system' },
  { id: 7, author: 'Narrateur', text: 'Soudain, trois gobelins bondissent des ombres ! Leurs yeux rouges brillent de malice tandis qu\'ils brandissent leurs cimeterres rouillés !', type: 'narrator' },
  { id: 8, author: 'Maître du Jeu', text: 'Le premier gobelin charge vers Grimjaw avec un cri perçant ! Faites un jet de sauvegarde de Dextérité !', type: 'dm' },
  { id: 9, author: 'Grimjaw le Sombre', text: 'Je lève ma hache et contre-attaque avec rage ! *rugit de colère*', type: 'action' },
  { id: 10, author: 'Système', text: 'Jet d\'attaque : 18 + 7 = 25 ! Touché critique !', type: 'system' },
  { id: 11, author: 'Narrateur', text: 'La hache de Grimjaw fend l\'air avec une précision mortelle, tranchant profondément dans la chair du gobelin...', type: 'narrator' },
  { id: 12, author: 'Maître du Jeu', text: 'Excellent coup ! Le gobelin s\'effondre dans un gargouillis. Les deux autres gobelins semblent maintenant terrorisés...', type: 'dm' },
  { id: 13, author: 'Système', text: 'Les gobelins tentent de fuir ! Jet de moral : 3 - Échec !', type: 'system' },
  { id: 14, author: 'Narrateur', text: 'Un écho lointain résonne dans les couloirs... D\'autres créatures ont entendu le combat et se dirigent vers vous !', type: 'narrator' }
]

export default function Chat() {
  const { state, dispatch } = useContext(GameContext)
  const [input, setInput] = useState('')
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [chatMessages])

  function getMessageClass(type) {
    switch(type) {
      case 'dm': return 'message-dm'
      case 'system': return 'message-system'
      case 'narrator': return 'message-narrator'
      case 'action': return 'message-action'
      default: return 'message-action'
    }
  }

  function sendMessage() {
    const text = input.trim()
    if (!text) return

    const characterName = state.selectedCharacter?.name || 'Grimjaw le Sombre'
    const newMessage = {
      id: Date.now(),
      author: characterName,
      text: text,
      type: 'action'
    }

    setChatMessages([...chatMessages, newMessage])
    dispatch({ type: 'SEND_MESSAGE', payload: newMessage })
    setInput('')

    // Réponse automatique du Maître du Jeu (simulation)
    setTimeout(() => {
      const responses = [
        "Excellent ! Lancez un dé pour déterminer le succès de votre action.",
        "Intéressant... Les conséquences de vos actes se révèleront bientôt.",
        "Votre action attire l'attention des créatures environnantes...",
        "Brillant ! Cette approche pourrait bien vous sauver la vie.",
        "Attention ! Vous entendez des pas qui se rapprochent..."
      ]

      const dmMessage = {
        id: Date.now() + 1,
        author: 'Maître du Jeu',
        text: responses[Math.floor(Math.random() * responses.length)],
        type: 'dm'
      }

      setChatMessages(prev => [...prev, dmMessage])
      dispatch({ type: 'RECEIVE_MESSAGE', payload: dmMessage })
    }, 1500)
  }

  function handleDiceClick() {
    dispatch({ type: 'ROLL_DICE', payload: Math.floor(Math.random()*20)+1 })
  }

  return (
    <>
      <div className="chat-messages" id="chat-messages" ref={messagesRef}>
        {chatMessages.map(m => (
          <div key={m.id} className="message">
            <span className={getMessageClass(m.type)}>{m.author} :</span> {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <div className="input-container">
          <textarea
            className="chat-input"
            id="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Décrivez votre action ou parlez au Maître du Jeu..."
            rows={3}
          />
        </div>
        <div className="game-controls">
          <button className="btn-send" id="send-btn" onClick={sendMessage}>
            📝 Envoyer
          </button>
          <button className="btn-dice" id="dice-btn" onClick={handleDiceClick}>
            🎲 Lancer le dé
          </button>
        </div>
      </div>
    </>
  )
}

