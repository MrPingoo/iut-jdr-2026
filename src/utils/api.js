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
