# ArgentBank - Client Side

ArgentBank est une application bancaire permettant aux utilisateurs de gérer leurs comptes.

## Installation
1. Clonez le projet : `git clone https://github.com/votre-utilisateur/argentbank.git`
2. Installez les dépendances : `npm install`

## Démarrer l'application
Lancez l'application en mode développement : `npm start`

## Fonctionnalités
- Authentification des utilisateurs avec JWT
- Consultation des soldes des comptes
- Historique des transactions
- Modification des informations du profil utilisateur

## Technologies Utilisées

- React 18
- Redux Toolkit pour la gestion de l'état
- React Router v6 pour la navigation
- Axios pour les appels API
- TailwindCSS pour le stylisme

## Déploiement
Pour créer un build optimisé : `npm run build`

## Structure du Projet

- `public/` : Contient les fichiers statiques
- `src/` : Contient le code source de l'application
  - `components/` : Composants réutilisables
  - `pages/` : Pages principales de l'application
  - `services/` : Modules pour les appels API
  - `App.js` : Composant principal de l'application
  - `index.js` : Point d'entrée de l'application
