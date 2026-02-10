import React from 'react'
import { getXpForLevel, getXpToNextLevel, getXpProgressPercentage } from '../utils/xpCalculator'

export default function XpBar({ currentXp, currentLevel }) {
  const nextLevel = currentLevel + 1
  const xpToNext = getXpToNextLevel(currentXp, currentLevel)
  const progressPercentage = getXpProgressPercentage(currentXp, currentLevel)
  const currentLevelXp = getXpForLevel(currentLevel)
  const nextLevelXp = getXpForLevel(nextLevel)
  const progressXp = currentXp - currentLevelXp
  const requiredXp = nextLevelXp - currentLevelXp

  const isMaxLevel = currentLevel >= 20

  return (
    <div className="xp-container">
      <div className="xp-label">
        {isMaxLevel ? (
          <span>Niveau Maximum Atteint</span>
        ) : (
          <>
            <span>Expérience</span>
            <span className="xp-to-next">Prochain niveau: {xpToNext} XP</span>
          </>
        )}
      </div>
      <div className="xp-bar-wrapper">
        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div className="xp-text">
            {isMaxLevel ? (
              <span>MAX</span>
            ) : (
              <span>{progressXp} / {requiredXp} XP</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

