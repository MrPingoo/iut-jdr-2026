# 🎲 JDR React - Application de Jeu de Rôle

Application de Jeu de Rôle (D&D) interactive construite avec **React + Vite** et authentifiée via **Symfony API + JWT**.

## 📋 Description

Cette application est une plateforme complète de Jeu de Rôle avec gestion des personnages, système de combat, et authentification sécurisée.

### ✨ Fonctionnalités

- ✅ **Authentification JWT** (inscription, connexion, déconnexion)
- ✅ **Routes protégées** avec redirection automatique
- ✅ **Gestion des personnages** avec statistiques
- ✅ **Chat en temps réel** avec messages du Maître du Jeu
- ✅ **Système de dé** (D20) avec animation
- ✅ **Persistance de session** (localStorage + JWT)
- ✅ **Design WoW authentique** avec animations dorées
- ✅ **Interface responsive** (desktop/mobile)
- ✅ **Menu adaptatif** selon l'état d'authentification

## 🚀 Installation et démarrage

### Prérequis
- Node.js 16+ (LTS recommandé)
- npm ou yarn
- Symfony API lancée sur http://localhost:8080

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

## 🔐 Authentification

### Endpoints API utilisés

- `POST /api/register` - Inscription
  ```json
  { "email": "user@exemple.com", "password": "Azerty$123" }
  ```

- `POST /api/login_check` - Connexion
  ```json
  { "username": "user@exemple.com", "password": "Azerty$123" }
  ```

### Pages

- `/login` - Connexion
- `/create` - Inscription
- `/board` - Gestion des personnages (protégé)
- `/perso` - Fiche personnage (protégé)
- `/game` - Partie de jeu (protégé)

Voir `API_DOCUMENTATION.md` pour la documentation complète.

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
│   ├── main.jsx                    # Point d'entrée React
│   ├── App.jsx                     # Composant principal avec routes
│   ├── styles.css                  # CSS global
│   ├── pages/
│   │   ├── Home.jsx                # Page d'accueil
│   │   ├── Login.jsx               # Page de connexion (avec API)
│   │   ├── Create.jsx              # Page d'inscription (avec API)
│   │   ├── Board.jsx               # Gestion des personnages
│   │   ├── Perso.jsx               # Fiche personnage détaillée
│   │   └── Game.jsx                # Partie de jeu avec chat et dés
│   ├── components/
│   │   ├── Navigation.jsx          # Menu de navigation
│   │   ├── ProtectedRoute.jsx      # Protection des routes
│   │   ├── CharacterCard.jsx       # Carte de personnage
│   │   ├── Chat.jsx                # Zone de chat
│   │   └── Dice.jsx                # Système de dé
│   ├── context/
│   │   ├── AuthContext.jsx         # Contexte d'authentification
│   │   └── GameContext.jsx         # Contexte du jeu
│   └── utils/
│       ├── api.js                  # Appels API (login, register, fetch)
│       ├── storage.js              # localStorage utilities
│       └── dice.js                 # Dé D20
├── public/
│   └── assets/images/              # Images des personnages
├── API_DOCUMENTATION.md            # Documentation complète de l'API
├── IMPLEMENTATION_SUMMARY.md       # Résumé de l'implémentation
├── FILES_CHANGES.md                # Liste des changements
├── QUICK_START.md                  # Commandes rapides
├── TEST_CHECKLIST.md               # Checklist de tests
├── index.html
├── package.json
├── vite.config.js
└── README.md                       # Ce fichier
```

## 📚 Documentation

- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Documentation complète de l'API d'authentification
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Résumé de l'implémentation et flux d'authentification
- **[FILES_CHANGES.md](FILES_CHANGES.md)** - Liste détaillée des fichiers créés et modifiés
- **[QUICK_START.md](QUICK_START.md)** - Commandes rapides pour démarrer
- **[TEST_CHECKLIST.md](TEST_CHECKLIST.md)** - Checklist complète pour tester l'application

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


