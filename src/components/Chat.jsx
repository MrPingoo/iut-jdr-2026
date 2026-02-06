import React, { useContext, useState, useRef, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import { startGameSession, sendPlayerAction, sendDiceResult, getNpcAction } from '../utils/api'
import FlashMessage from './FlashMessage'

export default function Chat() {
  const { state, dispatch } = useContext(GameContext)
  const [input, setInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [messageHistory, setMessageHistory] = useState([]) // Pour ChatGPT
  const [isLoading, setIsLoading] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' })
  const [pendingDiceContext, setPendingDiceContext] = useState(null)
  const messagesRef = useRef(null)

  // Auto-scroll vers le bas lors de nouveaux messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [chatMessages])

  // Démarrer la session de jeu automatiquement quand un personnage est sélectionné
  useEffect(() => {
    if (state.selectedCharacter && !gameStarted) {
      initializeGame()
    }
  }, [state.selectedCharacter])

  // Gérer les résultats de jets de dés depuis le contexte
  useEffect(() => {
    if (state.dice?.lastResult && pendingDiceContext) {
      handleDiceRoll(state.dice.lastResult)
    }
  }, [state.dice?.lastResult])

  /**
   * Initialise la session de jeu avec ChatGPT
   */
  async function initializeGame() {
    if (!state.selectedCharacter) return

    setIsLoading(true)
    try {
      const response = await startGameSession(
        state.selectedCharacter,
        4, // Nombre de joueurs par défaut
        "Terres Désolées d'Azeroth"
      )

      setSessionId(response.sessionId)
      setGameStarted(true)

      // Stocker les PNJs dans le contexte global
      dispatch({ type: 'SET_NPCS', payload: response.npcs || [] })

      // Ajouter le message d'introduction
      const introMessage = {
        id: Date.now(),
        author: 'Maître du Jeu',
        text: response.introduction,
        type: 'dm'
      }

      setChatMessages([introMessage])
      setMessageHistory([
        { role: 'assistant', content: response.introduction }
      ])

      // Afficher les PNJs générés
      const npcCount = response.npcs?.length || 0
      const npcNames = response.npcs?.map(npc => npc.name).join(', ') || ''

      setFlashMessage({
        message: `La partie a commencé ! ${npcCount} compagnon${npcCount > 1 ? 's' : ''} vous accompagne${npcCount > 1 ? 'nt' : ''} : ${npcNames}`,
        type: 'success'
      })
    } catch (error) {
      console.error('Erreur lors du démarrage de la partie:', error)
      setFlashMessage({
        message: `Erreur: ${error.message}`,
        type: 'error'
      })

      // Message de fallback
      const fallbackMessage = {
        id: Date.now(),
        author: 'Système',
        text: 'Impossible de contacter le Maître du Jeu. Veuillez vérifier votre connexion.',
        type: 'system'
      }
      setChatMessages([fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Détermine la classe CSS du message selon son type
   */
  function getMessageClass(type) {
    switch(type) {
      case 'dm': return 'message-dm'
      case 'system': return 'message-system'
      case 'narrator': return 'message-narrator'
      case 'action': return 'message-action'
      case 'npc': return 'message-npc'
      default: return 'message-action'
    }
  }

  /**
   * Envoie un message du joueur
   */
  async function sendMessage() {
    const text = input.trim()
    if (!text || isLoading) return

    const characterName = state.selectedCharacter?.name || 'Aventurier'

    // Ajouter le message du joueur
    const playerMessage = {
      id: Date.now(),
      author: characterName,
      text: text,
      type: 'action'
    }

    setChatMessages(prev => [...prev, playerMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Envoyer l'action au Game Master (ChatGPT)
      const response = await sendPlayerAction({
        character: state.selectedCharacter,
        action: text,
        context: {
          location: "Donjon de Rochenoire",
          sessionId: sessionId
        },
        history: messageHistory
      })

      // Mettre à jour l'historique pour ChatGPT
      const newHistory = [
        ...messageHistory,
        { role: 'user', content: text },
        { role: 'assistant', content: response.response }
      ]
      setMessageHistory(newHistory)

      // Ajouter la réponse du Maître du Jeu
      const dmMessage = {
        id: Date.now() + 1,
        author: 'Maître du Jeu',
        text: response.response,
        type: 'dm'
      }

      setChatMessages(prev => [...prev, dmMessage])

      // Vérifier si le MJ demande un jet de dé
      if (response.response.toLowerCase().includes('jet de') ||
          response.response.toLowerCase().includes('lancez') ||
          response.response.toLowerCase().includes('dd ')) {
        setPendingDiceContext(text) // Stocker le contexte pour le prochain jet
      }

      // Optionnel: Générer une réponse d'un PNJ de temps en temps
      if (Math.random() > 0.7) { // 30% de chance
        setTimeout(() => generateNpcResponse(response.response), 2000)
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      setFlashMessage({
        message: `Erreur: ${error.message}`,
        type: 'error'
      })

      // Message d'erreur
      const errorMessage = {
        id: Date.now() + 1,
        author: 'Système',
        text: 'Le Maître du Jeu ne répond pas. Veuillez réessayer.',
        type: 'system'
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Génère une réponse d'un PNJ compagnon
   */
  async function generateNpcResponse(situation) {
    // Utiliser les PNJs du contexte global
    const availableNpcs = state.npcs && state.npcs.length > 0 ? state.npcs : [
      { name: 'Elara la Sage', race: 'Elfe', class: 'Magicien', personality: 'intellectuel' },
      { name: 'Thorin Bouclier-de-Fer', race: 'Nain', class: 'Paladin', personality: 'loyal' },
      { name: 'Lyssa Ombre-Rapide', race: 'Humain', class: 'Roublard', personality: 'rusé' }
    ]

    const randomNpc = availableNpcs[Math.floor(Math.random() * availableNpcs.length)]

    try {
      const response = await getNpcAction({
        npc: randomNpc,
        situation: situation,
        history: messageHistory.slice(-4) // Seulement les 4 derniers messages
      })

      const npcMessage = {
        id: Date.now(),
        author: response.npcName,
        text: response.npcResponse,
        type: 'npc'
      }

      setChatMessages(prev => [...prev, npcMessage])
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse du PNJ:', error)
    }
  }

  /**
   * Gère le clic sur le bouton de dé
   */
  function handleDiceClick() {
    const result = Math.floor(Math.random() * 20) + 1
    dispatch({ type: 'ROLL_DICE', payload: result })

    // Afficher le résultat dans le chat
    const diceMessage = {
      id: Date.now(),
      author: 'Système',
      text: `🎲 ${state.selectedCharacter?.name || 'Joueur'} a lancé un d20 : ${result}`,
      type: 'system'
    }
    setChatMessages(prev => [...prev, diceMessage])
  }

  /**
   * Traite le résultat d'un jet de dé avec ChatGPT
   */
  async function handleDiceRoll(result) {
    if (!pendingDiceContext || isLoading) return

    setIsLoading(true)

    // Calculer le modificateur basé sur les stats du personnage
    const modifier = Math.floor((state.selectedCharacter?.stats?.dexterity || 10) / 2) - 5
    const total = result + modifier

    try {
      const response = await sendDiceResult({
        character: state.selectedCharacter,
        diceRoll: {
          type: 'd20',
          result: result,
          modifier: modifier,
          total: total,
          skillCheck: 'Action'
        },
        context: pendingDiceContext,
        history: messageHistory
      })

      // Mettre à jour l'historique
      const newHistory = [
        ...messageHistory,
        { role: 'user', content: `Résultat du dé: ${result} + ${modifier} = ${total}` },
        { role: 'assistant', content: response.response }
      ]
      setMessageHistory(newHistory)

      // Ajouter la réponse du MJ
      const dmMessage = {
        id: Date.now() + 2,
        author: 'Maître du Jeu',
        text: response.response,
        type: 'dm'
      }

      setChatMessages(prev => [...prev, dmMessage])
      setPendingDiceContext(null) // Réinitialiser le contexte

    } catch (error) {
      console.error('Erreur lors du traitement du jet de dé:', error)
      setFlashMessage({
        message: `Erreur: ${error.message}`,
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <FlashMessage
        message={flashMessage.message}
        type={flashMessage.type}
        onClose={() => setFlashMessage({ message: '', type: '' })}
      />


      <div className="chat-messages" id="chat-messages" ref={messagesRef}>
        {chatMessages.length === 0 && !isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#888',
            fontStyle: 'italic'
          }}>
            En attente du Maître du Jeu...
          </div>
        )}

        {chatMessages.map(m => (
          <div key={m.id} className="message">
            <div className="message-header">
              <span className={getMessageClass(m.type)}>{m.author}</span>
            </div>
            <div className="message-content">
              {m.text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < m.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message">
            <span className="message-system">Système :</span>
            <em>Le Maître du Jeu réfléchit...</em> ⏳
          </div>
        )}
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
            disabled={isLoading || !gameStarted}
          />
        </div>
        <div className="game-controls">
          <button
            className="btn-send"
            id="send-btn"
            onClick={sendMessage}
            disabled={isLoading || !input.trim() || !gameStarted}
          >
            📝 Envoyer
          </button>
          <button
            className="btn-dice"
            id="dice-btn"
            onClick={handleDiceClick}
            disabled={isLoading || !gameStarted}
          >
            🎲 Lancer le dé
          </button>
        </div>
      </div>
    </>
  )
}

