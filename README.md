# 🎲 JDR React - Converti depuis game.html

Application de Jeu de Rôle (D&D) interactive construite avec **React + Vite**.

## 📋 Description

Cette application reproduit **100% du design et du CSS** de `game.html` en une application React moderne et réactive.

### ✨ Fonctionnalités

- ✅ **Chat en temps réel** avec messages du Maître du Jeu
- ✅ **Système de dé** (D20) avec animation
- ✅ **Gestion des personnages** avec statistiques
- ✅ **Persistance locale** (localStorage)
- ✅ **Design WoW authentique** avec animations dorées
- ✅ **Interface responsive** (desktop/mobile)
- ✅ **Scrollbar personnalisée** stylisée

## 🚀 Installation et démarrage

### Prérequis
- Node.js 16+ (LTS recommandé)
- npm ou yarn

### Étapes

1. **Place-toi dans le dossier React** :
```bash
cd /Users/julian/Documents/www/IUT/2025_2026/php/jdr/react
```

2. **Installe les dépendances** :
```bash
npm install
```

3. **Lance le serveur de développement** :
```bash
npm run dev
```
L'application s'ouvrira à `http://localhost:5173`

## 📦 Build pour production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 👀 Aperçu et test

```bash
npm run preview
```

## 📁 Structure du projet

```
react/
├── src/
│   ├── main.jsx                 # Point d'entrée React
│   ├── App.jsx                  # Composant principal
│   ├── styles.css               # CSS (100% identique à game.html)
│   ├── components/
│   │   ├── Board.jsx            # Panneau latéral + personnage
│   │   ├── CharacterCard.jsx    # Affichage du personnage
│   │   ├── Chat.jsx             # Zone de chat
│   │   └── Dice.jsx             # Système de dé
│   ├── context/
│   │   └── GameContext.jsx      # Gestion de l'état global (React Context)
│   └── utils/
│       ├── storage.js           # Utilitaires localStorage
│       └── dice.js              # Utilitaires dé (D20)
├── public/
│   └── assets/images/           # Images locales (PNG)
├── index.html                   # Template HTML
├── package.json
├── vite.config.js              # Configuration Vite
└── README.md
```

## 🎮 Utilisation

### Chat
- Écris une action/message dans le textarea
- Appuie sur **Entrée** ou clique sur **📝 Envoyer**
- Le Maître du Jeu répond automatiquement (simulation)

### Dé
- Clique sur **🎲 Lancer le dé** pour lancer un D20
- L'animation affiche le résultat pendant 2 secondes

### Personnage
- Le personnage par défaut est **Grimjaw le Sombre** (Orc Barbare Niveau 15)
- Les statistiques sont affichées dans le panneau gauche
- Support pour changer de personnage via `localStorage`

## 💾 Persistance des données

Le personnage sélectionné est sauvegardé dans `localStorage` sous la clé `selectedCharacter`.

Pour charger un personnage personnalisé :

```javascript
localStorage.setItem('selectedCharacter', JSON.stringify({
  name: "Mon Personnage",
  race: "Elfe",
  class: "Rôdeur",
  level: 10,
  stats: {
    strength: 15,
    constitution: 14,
    intelligence: 12,
    wisdom: 16,
    dexterity: 18,
    charisma: 13
  },
  image: "/assets/images/elfe.png"
}));
```

## 🖼️ Images

Les images des personnages sont stockées dans `public/assets/images/` :
- `orc.png`
- `elfe.png`
- `humain.png`
- `nain.png` (typo : devrait être "nain" mais présent comme "naim")
- `gnome.png`
- `tiefling.png`

## 🎨 CSS & Design

Le CSS est **100% identique** à celui de `game.html` incluant :
- Gradients dorés (WoW)
- Animations de scintillement
- Scrollbar personnalisée stylisée
- Animations de dé
- Responsive design
- Polices Cinzel (serif élégante)

## 🔧 Dépendances

### Production
- `react`: UI framework
- `react-dom`: Intégration React au DOM

### Développement
- `vite`: Build tool ultra-rapide
- `@vitejs/plugin-react`: Plugin React pour Vite

## 📝 Notes importantes

- Le chat est **local/simulé** (pas de backend)
- Les réponses du MJ sont aléatoires parmi une liste prédéfinie
- Les messages ne sont **pas persistés** entre les rafraîchissements (par défaut)
- L'application fonctionne **offline** (aucune API distante requise)

## 🐛 Troubleshooting

### Les images ne s'affichent pas
→ Vérifie que `react/public/assets/images/` contient les fichiers PNG

### Erreur "Cannot find module"
→ Exécute `npm install` à nouveau

### Port 5173 déjà utilisé
→ Modifie `vite.config.js` et change la valeur `port: 5173` à un autre numéro

## 📖 Ressources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [World of Warcraft API](https://develop.battle.net/)

---

**Créé avec ❤️ pour les aventuriers de Warcraft**


