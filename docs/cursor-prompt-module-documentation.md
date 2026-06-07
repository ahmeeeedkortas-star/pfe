# Cursor Prompt — Module Documentation
## Plateforme QHSE XPERT-MECA — React embarqué (Vite)

> **Architecture réelle** : sous-application **React 19 + TypeScript + Tailwind** dans `src/documentation/`, montée dans le shell QHSE via `src/pages/doc/doc-mount.page.js`.
> **Pas** de `PAGES['doc-*']` ni de `window.DOC_DATA` dans le monolithe.
> Persistance : **IndexedDB** (Dexie) — base `qhse_documentation`.
> Navigation plateforme : `goPage('doc-biblio')` → route React interne.

---

## Intégration dans la plateforme

| Élément | Fichier |
|---------|---------|
| Montage | `src/pages/doc/doc-mount.page.js` |
| Bootstrap React | `src/documentation/embed.tsx` → `mountDocumentationModule(el, path)` |
| Routes plateforme → React | `DOC_PAGE_ROUTES` dans `doc-mount.page.js` |
| Registre | `src/core/page-registry.js` — toutes les clés `doc-*` → `renderDocModule` / `bindDocModule` |
| Icônes nav | `src/config/modules.js` → `ICONS.doc` |
| Titres header | `src/patches/doc-module.js` |
| Styles shell | `src/styles/doc-module.css` + Tailwind dans `src/documentation/index.css` |
| Alias v11 | `src/core/page-aliases.js` |

### Mapping IDs plateforme → route React (MemoryRouter)

```js
// doc-mount.page.js — DOC_PAGE_ROUTES
'doc-dash' / 'doc-tb'           → '/'
'doc-liste' / 'doc-biblio'      → '/bibliotheque'
'doc-recherche' / 'doc-history' → '/recherche'
'doc-validation' / 'doc-valid' / 'doc-workflow' / 'doc-publish' → '/validation'
'doc-terrain' / 'doc-qr'          → '/terrain'
'doc-admin' / 'doc-acces'         → '/admin'
'doc-kpi'                       → '/kpi'
'doc-new' / 'doc-create'        → '/documents/nouveau'
// Routes dynamiques (React Router) :
//   /documents/:id
//   /documents/:id/workflow | /historique | /publication | /validation
```

**Important** : le module Documentation **ne se recharge pas** entre deux pages `doc-*` (optimisation router) ; seul le chemin mémoire change via `window.__DOC_NAV__(path)`.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| UI | React 19, React Router 7 (HashRouter dans embed) |
| CSS | Tailwind 4 (`@tailwindcss/vite`) |
| DB locale | Dexie → `src/documentation/db/database.ts` |
| Éditeur | Markdown / content HTML (`MarkdownEditor.tsx`, `DocumentForm.tsx`) |
| Liste Odoo | `components/odoo/OdooControlPanel.tsx`, `hooks/useOdooListView.ts` |
| Auth module | `context/AuthContext.tsx` (login local démo) |
| Config métier | `context/ConfigContext.tsx` + table `config` IndexedDB |

Entry dev autonome (optionnel) : `src/documentation/main.tsx` — la plateforme utilise **`embed.tsx`**.

---

## Pages React (écrans réels)

| Route React | Composant | Équivalent v11 |
|-------------|-----------|----------------|
| `/` | `DashboardPage.tsx` | `doc-tb` / KPI |
| `/bibliotheque` | `LibraryPage.tsx` | `doc-biblio` |
| `/recherche` | `SearchPage.tsx` | `doc-history` (recherche + historique) |
| `/validation` | `ValidationPage.tsx` | `doc-valid` / file d'attente |
| `/terrain` | `TerrainPage.tsx` | `doc-qr` |
| `/admin` | `AdminPage.tsx` | `doc-acces` + config |
| `/kpi` | `KpiDetailPage.tsx` | indicateurs détaillés |
| `/documents/nouveau` | `CreateDocumentPage.tsx` | `doc-create` |
| `/documents/:id` | `DocumentDetailPage.tsx` | fiche document |
| `/documents/:id/workflow` | `DocumentWorkflowPage.tsx` | `doc-workflow` |
| `/documents/:id/historique` | `DocumentHistoriquePage.tsx` | versions |
| `/documents/:id/publication` | `DocumentPublicationPage.tsx` | `doc-publish` |
| `/documents/:id/validation` | `DocumentValidationScreen.tsx` | validation détaillée |
| `/public/:id` | `PublicDocumentPage.tsx` | lecture QR / lien public |

---

## Modèle de données (`src/documentation/types/index.ts`)

### Document (IndexedDB `documents`)

```ts
{
  id: string;              // UUID
  code: string;            // ex. DOC-001 (auto nextDocumentCode)
  title: string;
  type: string;            // depuis AppConfig.documentTypes
  process: string;
  zone: string;
  location?: string;
  postId?: string;
  isoNorm?: string;
  currentVersion: string;  // ex. "1.0"
  status: DocumentStatus;
  responsible: string;
  createdAt: string;       // ISO
  updatedAt: string;
  publishedAt?: string;
  publishedBy?: string;
  reviewDueAt?: string;
  content: string;         // HTML / markdown stocké
  createdBy: string;
}
```

### Statuts (`DocumentStatus`) — **différent du v11**

```ts
'Brouillon' | 'En attente QHSE' | 'En attente Direction' | 'Publié' | 'Archivé'
```

| v11 | Moderne |
|-----|---------|
| Validé, Actif, En validation, Obsolète, Brouillon | Brouillon → En attente QHSE → En attente Direction → Publié → Archivé |

Couleurs UI : `components/ui/StatusBadge.tsx`.

### Workflow (`src/documentation/lib/workflow.ts`)

7 étapes affichées :

```
Création → Validation Resp. QHSE → Validation Direction/Process Owner →
Publication → Utilisation terrain → Révision → Archivage
```

Index dérivé du **statut** via `workflowStepIndex(status)` — pas de champ `wfStep` numérique comme v11.

### Tables Dexie associées

- `versions` — historique contenu par version
- `validationLogs` — submit / approve / reject
- `readLogs` — traçabilité lecture
- `nonConformities` — NC liées document
- `users` — comptes démo module
- `config` — types, processus, zones, normes ISO, seuils

---

## Services métier (à utiliser, pas `window.DOC_*`)

| Service | Fichier | Rôle |
|---------|---------|------|
| CRUD documents | `services/documentService.ts` | `listDocuments`, `createDocument`, `updateDocument`, `submitForValidation`, `approveQhse`, `approveDirection`, `rejectDocument`, `publishDocument`, `archiveDocument` |
| Config | `services/configService.ts` | Types, processus, zones, préfixe code |
| KPI | `services/kpiService.ts` | Dashboard indicateurs |
| Seed démo | `services/seedService.ts` | Bouton « Créer les exemples » sur dashboard |
| Auth | `services/authService.ts` | Login local |
| Permissions | `lib/permissions.ts` | Matrice rôle × action |

**Hooks** : `hooks/useDocuments.ts`, `hooks/useDocument.ts`, `hooks/useOdooListView.ts`, `hooks/useKpis.ts`.

---

## Workflow document (moderne)

```
createDocument(asDraft=true)  →  Brouillon
        │
        ▼ submitForValidation()
En attente QHSE
        │
        ├─ approveQhse() ──► En attente Direction
        │         │
        │         └─ approveDirection() ──► Publié (+ publishedAt)
        │
        └─ rejectDocument() ──► Brouillon

publishDocument() / archiveDocument() selon écrans
```

**Ne pas** réimplémenter `docValidate(id)` / `docSendValid()` globaux du v11 — appeler les fonctions `documentService.ts`.

---

## UI / patterns React

### Bibliothèque (`LibraryPage.tsx`)

- Panneau Odoo : recherche, filtres, favoris, vues liste / kanban (`OdooControlPanel`, `DocumentKanbanView`, `DocumentTable`).
- Filtres via `useOdooListView` + `lib/odooList.ts`.

### Création (`CreateDocumentPage.tsx` + `DocumentForm.tsx`)

- Formulaire structuré : titre, type, processus, zone, responsable, contenu.
- Import PDF possible (`PdfDropzone.tsx`).

### Validation (`ValidationPage.tsx`, `DocumentValidationScreen.tsx`)

- File documents en attente, actions approuver / rejeter avec commentaire.

### Terrain (`TerrainPage.tsx`)

- QR / consultation terrain (équivalent `doc-qr`).

### Admin (`AdminPage.tsx`)

- Matrice permissions `PermissionsMatrix.tsx` + réglages config.

---

## Différences majeures vs prompt v11 (`qhse_v11.html`)

| Sujet | v11 | Plateforme actuelle |
|-------|-----|---------------------|
| Stockage | `window.DOC_DATA[]` mémoire | IndexedDB Dexie |
| Rendu | String HTML `PAGES['doc-*']` | Composants React |
| IDs | `DOC-001` | `code` + UUID `id` |
| Fonctions globales | `docCreate()`, `docValidate()` | `documentService.createDocument()` async |
| Grille / liste | `window.doc_view` grid/list | Odoo list + kanban |
| QR | Champ `qrCode` sur document | `TerrainPage` + route `/public/:id` |
| Éditeur | `contenteditable` + `docFormat()` | `MarkdownEditor` / HTML dans formulaire |

---

## Ajouter une fonctionnalité Documentation

1. **Composant / page** sous `src/documentation/pages/` ou `components/`.
2. **Route** dans `src/documentation/App.tsx`.
3. **Si accessible depuis la barre QHSE** :
   - Ajouter id dans `DOC_PAGE_ROUTES` (`doc-mount.page.js`).
   - Ajouter entrée `ICONS.doc` (`modules.js` + `doc-module.js`).
   - Enregistrer dans `page-registry.js` si nouvel id `doc-*`.
4. **Données** : étendre types + `database.ts` version upgrade si nouvel index.
5. **Service** : logique dans `documentService.ts` ou service dédié.
6. **Ne pas** modifier `legacy/pages.js` monolithe sauf migration volontaire.

### Exemple : nouvelle page plateforme `doc-rapports`

```js
// doc-mount.page.js
'doc-rapports': '/rapports',

// page-registry.js
'doc-rapports': () => renderDocModule('doc-rapports'),

// App.tsx
<Route path="rapports" element={<ReportsPage />} />
```

---

## Exports

Le module Documentation **n'utilise pas** `window.xmExportList` du shell vanilla.

Options :
- Implémenter export CSV depuis `LibraryPage` / `DocumentTable` via `documentService.listDocuments()`.
- Réutiliser pattern `src/components/shared/export-csv.js` en important depuis un composant React.

---

## Cheat sheet

| Action | Code / navigation |
|--------|-------------------|
| Ouvrir bibliothèque | `goPage('doc-biblio')` |
| Dashboard doc | `goPage('doc-dash')` ou `doc-tb` |
| Créer document | `goPage('doc-create')` |
| Validation | `goPage('doc-validation')` |
| Terrain / QR | `goPage('doc-terrain')` |
| Admin / droits | `goPage('doc-acces')` |
| Route interne document | `navigate('/documents/' + id)` (dans React) |
| Seed démo | Dashboard → bannière seed (`seedService.ts`) |

---

## Fichiers à lire avant toute modification Documentation

1. `src/pages/doc/doc-mount.page.js`
2. `src/documentation/embed.tsx` + `App.tsx`
3. `src/documentation/types/index.ts`
4. `src/documentation/services/documentService.ts`
5. `src/documentation/db/database.ts`
6. `src/documentation/pages/LibraryPage.tsx`
7. `src/documentation/components/odoo/OdooControlPanel.tsx`

---

## Lancer le module en dev

```bash
npm run dev
# Plateforme : http://localhost:5173/ → module Documentation

# Optionnel — module React seul (hors shell) :
# depuis src/documentation avec config Vite dédiée si présente
```

En cas d'erreur Dexie « KeyPath not indexed », vérifier migrations `database.ts` (ex. version 2 index `users.role`).
