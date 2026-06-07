# Système de Gestion Documentaire QHSE

Application web **React + TypeScript + Tailwind CSS** (Vite) pour la gestion documentaire QHSE en atelier mécanique. Persistance locale via **IndexedDB** (Dexie.js). **Aucune donnée métier n’est préchargée** au démarrage.

## Installation

```bash
cd documentation-app
npm install
npm run dev
```

URL : **http://localhost:5174/**

Build production :

```bash
npm run build
npm run preview
```

## Connexion (mock)

Quatre comptes sont créés automatiquement au premier login (mot de passe : `demo`) :

| Identifiant | Rôle |
|-------------|------|
| `operateur` | Opérateur |
| `qualite` | Qualité |
| `ingenieur` | Ingénieur |
| `direction` | Direction |

## Configuration

### Fichier `public/config.default.json`

Valeurs initiales (types, processus, zones, seuils KPI). Chargé une seule fois si la base est vide.

### Interface admin (rôle Direction)

Menu **Configuration** : modifier listes (types, processus, zones, postes terrain, normes ISO), seuil « non lu », délai revue ISO, préfixe des codes document.

### Données de test (optionnel)

Bouton **Créer des exemples** dans Configuration — uniquement si aucun document n’existe.

## Fonctionnalités

- **Tableau de bord** — KPI dynamiques, graphiques Recharts, alertes
- **Bibliothèque** — tableau, recherche, filtres issus des documents existants
- **Création** — formulaire, code auto `DOC-XXX`, Markdown, brouillon / validation
- **Workflow** — Brouillon → QHSE → Direction → Publié → Archivé
- **QR code** — à la publication (`react-qr-code`)
- **Versions** — historique, diff textuel, restauration en brouillon
- **RBAC** — rôles Opérateur / Qualité / Ingénieur / Direction
- **Terrain** — postes configurables, QR par poste, simulation scan
- **Lecture publique** — `/#/public/:id` pour documents publiés

## Structure du projet

```
src/
  components/   # UI réutilisable
  context/      # Auth, Config
  db/           # Dexie
  hooks/
  pages/
  services/     # documents, KPI, auth, config, seed
  types/
public/
  config.default.json
```

## Intégration plateforme QHSE existante

Ce module est **autonome** (port 5174) pour ne pas mélanger avec l’app vanilla `QHSE/` (port 5173). Intégration possible via iframe ou lien sidebar vers `http://localhost:5174`.

## Persistance

- Base IndexedDB : `qhse_documentation`
- Session utilisateur : `localStorage` (`qhse_doc_session`)

Pour réinitialiser : Configuration → **Tout effacer**, ou supprimer les données du site dans le navigateur.
