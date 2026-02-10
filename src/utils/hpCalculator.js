/**
 * Calcule les PV maximum basés sur le niveau du personnage
 * Niveau 1: 15 PV
 * Niveau 20: 35 PV
 * Progression linéaire entre les niveaux
 *
 * @param {number} level - Niveau du personnage (1-20)
 * @returns {number} PV maximum
 */
export function calculateMaxHp(level) {
  // Assurer que le niveau est entre 1 et 20
  const clampedLevel = Math.max(1, Math.min(20, level || 1))

  // Formule linéaire : HP = 15 + ((level - 1) * 20 / 19)
  // Niveau 1: 15 + 0 = 15 PV
  // Niveau 20: 15 + (19 * 20 / 19) = 15 + 20 = 35 PV
  const baseHp = 15
  const hpPerLevel = 20 / 19 // Progression de 20 PV sur 19 niveaux

  return Math.round(baseHp + ((clampedLevel - 1) * hpPerLevel))
}

/**
 * Obtient les PV initiaux pour un personnage selon son niveau
 *
 * @param {number} level - Niveau du personnage
 * @returns {number} PV initiaux (maximum)
 */
export function getInitialHp(level) {
  return calculateMaxHp(level)
}

