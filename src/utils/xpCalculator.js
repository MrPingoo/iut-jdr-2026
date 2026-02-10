/**
 * Calcule l'XP nécessaire pour atteindre un niveau donné
 * Progression exponentielle pour rendre les niveaux supérieurs plus difficiles
 *
 * @param {number} level - Niveau cible (1-20)
 * @returns {number} XP nécessaire pour ce niveau
 */
export function getXpForLevel(level) {
  // Niveau 1 = 0 XP (départ)
  if (level <= 1) return 0

  // Formule exponentielle : XP = 100 × (niveau - 1)²
  // Niveau 2: 100 XP
  // Niveau 3: 400 XP
  // Niveau 4: 900 XP
  // ...
  // Niveau 20: 36100 XP
  return 100 * Math.pow(level - 1, 2)
}

/**
 * Calcule le niveau basé sur l'XP actuelle
 *
 * @param {number} currentXp - XP actuelle du personnage
 * @returns {number} Niveau correspondant
 */
export function getLevelFromXp(currentXp) {
  // Parcourir les niveaux de 20 à 1 pour trouver le niveau actuel
  for (let level = 20; level >= 1; level--) {
    if (currentXp >= getXpForLevel(level)) {
      return level
    }
  }
  return 1
}

/**
 * Calcule l'XP manquante pour passer au niveau suivant
 *
 * @param {number} currentXp - XP actuelle
 * @param {number} currentLevel - Niveau actuel
 * @returns {number} XP manquante
 */
export function getXpToNextLevel(currentXp, currentLevel) {
  if (currentLevel >= 20) return 0 // Niveau max atteint

  const nextLevelXp = getXpForLevel(currentLevel + 1)
  return nextLevelXp - currentXp
}

/**
 * Calcule le pourcentage de progression vers le niveau suivant
 *
 * @param {number} currentXp - XP actuelle
 * @param {number} currentLevel - Niveau actuel
 * @returns {number} Pourcentage (0-100)
 */
export function getXpProgressPercentage(currentXp, currentLevel) {
  if (currentLevel >= 20) return 100 // Niveau max

  const currentLevelXp = getXpForLevel(currentLevel)
  const nextLevelXp = getXpForLevel(currentLevel + 1)
  const progressXp = currentXp - currentLevelXp
  const requiredXp = nextLevelXp - currentLevelXp

  return Math.min(100, Math.max(0, (progressXp / requiredXp) * 100))
}

/**
 * Table d'XP par niveau
 */
export const XP_TABLE = Array.from({ length: 21 }, (_, i) => ({
  level: i,
  xp: getXpForLevel(i)
}))

