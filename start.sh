#!/usr/bin/env bash

# 🎲 Script de démarrage - JDR React Application
# Ce script démarre l'application React en développement

echo "=========================================="
echo "🎲 JDR React - Démarrage de l'application"
echo "=========================================="
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo "👉 Télécharge Node.js depuis https://nodejs.org"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"
echo ""

# Naviguer vers le dossier react
cd "$(dirname "$0")"
echo "📁 Dossier courant: $(pwd)"
echo ""

# Vérifier que les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install --no-audit --no-fund
    echo "✅ Dépendances installées"
    echo ""
fi

# Démarrer le serveur de développement
echo "🚀 Démarrage du serveur de développement..."
echo ""
echo "⏳ Attends quelques secondes..."
echo ""

npm run dev


