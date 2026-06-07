# Conformité plateforme QHSE — qhse_v11.html vs code actuel

> Référence : prompt **qhse_v11.html** (~15 500 lignes monolithe)  
> Implémentation : **Vite 6** + modules JS + module Documentation **React** (`src/documentation/`)

## Architecture

| Exigence v11 | Statut | Implémentation actuelle |
|--------------|--------|-------------------------|
| SPA Vanilla JS | ✅ Adapté | Vite, pas de framework global ; React **uniquement** pour Documentation |
| Injection `#content` | ✅ | `goPage` / `renderPage` dans `src/core/router.js` |
| `STATE` + `window.*` données | ✅ | `STATE`, `RC_DATA`, `NC_DATA`, repositories IndexedDB/localStorage |
| `ICONS` / `TITLES` par module | ✅ | `src/config/modules.js`, `src/patches/icons-global.js` |
| `PAGES` map | ✅ | `MODERN_PAGES` + lazy `legacy/pages/*.js` |
| Police Inter | ✅ | Google Fonts + CSS plateforme |
| `xmToast` | ✅ | `src/legacy/notifications.js` / patches |

## Modules & pages

| Module v11 | Sidebar | Statut | Notes |
|------------|---------|--------|-------|
| Accueil | ✅ | ✅ | `home.pages.js`, mode dark |
| RC | ✅ | ✅ | Liste moderne + Odoo CP ; fiche/8D legacy |
| NC | ✅ | ✅ | Liste Odoo ; **nc-new → QRQC** ajouté ; fiche/QRQC legacy |
| 5S | ✅ | ✅ | Module `fives` ; alias `5s-*` → `fives-*` |
| EPI | Menu dédié v11 | ⚠️ | Intégré **SST / checklists EPI** (`sec-cl-epi`, alias `epi-*`) |
| Documentation | ✅ | ✅ | React : `doc-dash`, `doc-liste`, … ; alias `doc-tb`, `doc-biblio`, … |
| Audit | ✅ | ✅ | Pages modernes + legacy |
| SST (`sec`) | ✅ | ✅ | KPI, risques, checklists, urgence, actions |
| ENV | ✅ | ✅ | `env-dash`, `env-dechets` modernes ; reste legacy |
| CST | ✅ | ✅ | Pages `cst-*` ; `cst-contexte` → `cst-tb` |

### Alias de routes (v11 → actuel)

Fichier : `src/core/page-aliases.js` — appliqué dans `goPage()` avant rendu.

Exemples : `doc-biblio` → `doc-liste`, `5s-tb` → `fives-kpi`, `env-kpi` → `env-dash`, `epi-tb` → `sec-cl-epi`.

## Design system CSS

| Élément v11 | Statut |
|-------------|--------|
| Variables `:root` (--navy, --blue, …) | ✅ `src/styles/base/variables.css` |
| `.card`, `.btn`, `.badge`, `.tbl`, `.tabs` | ✅ legacy-bundle + modules |
| `.filter-bar` | ✅ + panneau **Odoo** `odoo-panel.css` |
| `.d8-bar`, `.audit-steps`, QRQC | ✅ legacy pages RC/NC/Audit |
| Animations `pgIn`, KPI | ✅ `animations.css`, patches motion |

## Données & helpers

| Exigence | Statut |
|----------|--------|
| `RC_DATA`, `NC_DATA` | ✅ + repositories archivage/pagination |
| `RC_ACTIONS`, `NC_ACTIONS`, `SEC_ACTIONS`, `ENV_ACTIONS` | ✅ |
| `badgeG` / `badgeS` | ✅ |
| `filterRC` / `filterNC` | ✅ + favoris/regroupement Odoo |
| `openAddAction`, `changeStatut` | ✅ `action-handlers.js` |
| `DatePicker` v2 | ✅ `date-hierarchy-filter` |
| `exportFilteredData` | ✅ listes + toolbar |

## Flux NC (v11)

| Étape | Statut |
|-------|--------|
| `nc-new` formulaire + brouillon session | ✅ brouillon `_ncDraft` / wizard |
| Enregistrer → liste | ✅ |
| **Enregistrer & QRQC** | ✅ `data-ncn-save-qrqc` → `STATE.currentNcId`, `qrqcData_*`, `nc-qrqc` |
| QRQC 4 étapes | ✅ legacy `nc.pages.js` (contenu étape 1 encore partiellement statique) |
| Clôture → statut Clôturé | ⚠️ via KPI / boutons legacy |

## Documentation (12 écrans maquette)

| Écran | Statut |
|-------|--------|
| Dashboard, Bibliothèque, Création, Validation, Publication/QR, Recherche, Historique, Droits, Terrain, KPI, Aperçu | ✅ React `src/documentation/` |
| Workflow 7 étapes | ✅ routes `/documents/:id/workflow` |

## Écarts connus (non bloquants)

1. **Monolithe unique** : code réparti en ~100 fichiers ; comportement équivalent via router.
2. **EPI** : pas de module sidebar séparé ; accès via SST / alias `epi-*`.
3. **QRQC dynamique** : données préchargées ; UI étape 1 pas encore 100 % liée à `qrqcData_*` (legacy).
4. **~80 pages v11** : certaines uniquement en legacy (`env-conso`, `env-chimiques`, …) — pas encore réécrites en modules dédiés.
5. **Paramètres / Utilisateurs** : entrées sidebar désactivées (comme prévu plateforme vide).
6. **Stack Documentation** : Dexie + React (évolution vs 100 % vanilla v11).

## Fichiers clés modifiés (conformité)

- `src/core/page-aliases.js` — compatibilité IDs v11
- `src/core/router.js` — résolution alias
- `src/core/page-registry.js` — `env-dash`, `env-dechets`
- `src/pages/nc/nc-new.page.js` — flux QRQC
- `src/components/shared/odoo-control-panel.js` — listes RC/NC
- `src/documentation/*` — module documentaire complet

## Vérification

```bash
npm run dev    # http://localhost:5173/
npm run build
npm test
```

Tests manuels recommandés : `goPage('doc-biblio')`, `goPage('5s-tb')`, NC nouvelle → **Enregistrer & QRQC**, listes RC/NC filtres Odoo.
