import React from 'react'
import CharacterCard from './CharacterCard.jsx'

export default function Board() {
  return (
    <div className="game-sidebar">
      <div className="character-panel">
        <CharacterCard />
      </div>
      <div className="companions-panel">
        <h3 className="companions-title">Compagnons d'aventure</h3>
        <table className="companions-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Race/Classe</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elaria Luneverte</td>
              <td>Elfe Druide</td>
              <td className="companion-status status-alive">Vivant</td>
            </tr>
            <tr>
              <td>Thorin Barbe-de-Fer</td>
              <td>Nain Paladin</td>
              <td className="companion-status status-alive">Vivant</td>
            </tr>
            <tr>
              <td>Lyralei Ventelame</td>
              <td>Elfe Rôdeur</td>
              <td className="companion-status status-alive">Vivant</td>
            </tr>
            <tr>
              <td>Zephyr l'Ombre</td>
              <td>Humain Roublard</td>
              <td className="companion-status status-dead">Mort</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
