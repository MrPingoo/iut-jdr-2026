const API_BASE_URL = 'http://localhost:8080/api'

/**
 * Connexion utilisateur
 * @param {string} username - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<{token: string}>}
 */
export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/login_check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erreur de connexion' }))
    throw new Error(error.message || 'Identifiants incorrects')
  }

  return response.json()
}

/**
 * Inscription utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<any>}
 */
export async function register(email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erreur d\'inscription' }))
    throw new Error(error.message || 'Erreur lors de l\'inscription')
  }

  return response.json()
}

/**
 * Récupère le token JWT depuis le localStorage
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem('jwt_token')
}

/**
 * Sauvegarde le token JWT dans le localStorage
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem('jwt_token', token)
}

/**
 * Supprime le token JWT du localStorage
 */
export function removeToken() {
  localStorage.removeItem('jwt_token')
}

/**
 * Vérifie si l'utilisateur est connecté
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken()
}

/**
 * Effectue une requête authentifiée à l'API
 * @param {string} endpoint - Endpoint de l'API (ex: '/characters')
 * @param {object} options - Options fetch
 * @returns {Promise<any>}
 */
export async function fetchAPI(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Token expiré ou invalide
    removeToken()
    throw new Error('Session expirée, veuillez vous reconnecter')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erreur API' }))
    throw new Error(error.message || 'Erreur lors de la requête')
  }

  return response.json()
}

/**
 * Crée un nouveau personnage
 * @param {object} characterData - Données du personnage
 * @returns {Promise<any>}
 */
export async function createCharacter(characterData) {
  return fetchAPI('/characters', {
    method: 'POST',
    body: JSON.stringify(characterData),
  })
}

/**
 * Récupère la liste de tous les personnages
 * @returns {Promise<Array>}
 */
export async function getCharacters() {
  return fetchAPI('/characters')
}

/**
 * Récupère un personnage spécifique
 * @param {number} id - ID du personnage
 * @returns {Promise<any>}
 */
export async function getCharacter(id) {
  return fetchAPI(`/characters/${id}`)
}

/**
 * Met à jour un personnage
 * @param {number} id - ID du personnage
 * @param {object} characterData - Données à mettre à jour
 * @returns {Promise<any>}
 */
export async function updateCharacter(id, characterData) {
  return fetchAPI(`/characters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(characterData),
  })
}

/**
 * Supprime un personnage
 * @param {number} id - ID du personnage
 * @returns {Promise<any>}
 */
export async function deleteCharacter(id) {
  return fetchAPI(`/characters/${id}`, {
    method: 'DELETE',
  })
}

// ========================================
// GAME MASTER - ChatGPT Integration
// ========================================

/**
 * Démarre une nouvelle session de jeu avec ChatGPT
 * @param {object} character - Données du personnage
 * @param {number} players - Nombre de joueurs
 * @param {string} setting - Décor de l'aventure
 * @returns {Promise<{success: boolean, sessionId: string, introduction: string, timestamp: number}>}
 */
export async function startGameSession(character, players = 4, setting = "Terres Désolées d'Azeroth") {
  return fetchAPI('/game/start', {
    method: 'POST',
    body: JSON.stringify({
      character,
      players,
      setting
    }),
  })
}

/**
 * Envoie une action du joueur au Game Master (ChatGPT)
 * @param {object} params - Paramètres de l'action
 * @param {object} params.character - Personnage qui effectue l'action
 * @param {string} params.action - Description de l'action
 * @param {object} params.context - Contexte de la partie (lieu, événements précédents, etc.)
 * @param {array} params.history - Historique des messages pour maintenir le contexte
 * @returns {Promise<{success: boolean, response: string, timestamp: number}>}
 */
export async function sendPlayerAction({ character, action, context = {}, history = [] }) {
  return fetchAPI('/game/action', {
    method: 'POST',
    body: JSON.stringify({
      character,
      action,
      context,
      history
    }),
  })
}

/**
 * Envoie le résultat d'un jet de dé au Game Master
 * @param {object} params - Paramètres du jet de dé
 * @param {object} params.character - Personnage qui lance le dé
 * @param {object} params.diceRoll - Détails du jet (type, résultat, modificateur, etc.)
 * @param {string} params.context - Contexte du jet de dé
 * @param {array} params.history - Historique des messages
 * @returns {Promise<{success: boolean, response: string, timestamp: number}>}
 */
export async function sendDiceResult({ character, diceRoll, context = '', history = [] }) {
  return fetchAPI('/game/dice-result', {
    method: 'POST',
    body: JSON.stringify({
      character,
      diceRoll,
      context,
      history
    }),
  })
}

/**
 * Génère une action pour un PNJ compagnon
 * @param {object} params - Paramètres du PNJ
 * @param {object} params.npc - Données du PNJ (nom, race, classe)
 * @param {string} params.situation - Situation actuelle
 * @param {array} params.history - Historique des messages
 * @returns {Promise<{success: boolean, npcResponse: string, npcName: string, timestamp: number}>}
 */
export async function getNpcAction({ npc, situation, history = [] }) {
  return fetchAPI('/game/npc-action', {
    method: 'POST',
    body: JSON.stringify({
      npc,
      situation,
      history
    }),
  })
}
