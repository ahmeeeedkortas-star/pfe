# Cursor Prompt — Module 5S (Audits 5S)
## Plateforme QHSE XPERT-MECA — application Vite modulaire

> **Architecture réelle** : application **Vite 6** (vanilla JS + pages modulaires), **pas** un monolithe `qhse_v11.html`.
> Navigation : `goPage('fives-xxx')` ou `goModule('fives')`.
> Rendu : `page-registry.js` → `renderFives*()` dans `src/pages/fives/`.
> Données : `localStorage` via `src/data/fives-store.js` (`window.FIVES_STORE`).

---

## Rappels globaux plateforme

| Élément | Fichier |
|---------|---------|
| Module id nav | `fives` (pas `5s` dans le code, mais alias v11 → fives) |
| Config icônes | `src/config/modules.js` → `ICONS.fives` |
| Patch nav / titres | `src/patches/fives-module.js` |
| Registre pages | `src/core/page-registry.js` → `MODERN_PAGES` |
| Alias v11 | `src/core/page-aliases.js` (`5s-tb` → `fives-kpi`, etc.) |
| Styles | `src/styles/fives.css`, `src/styles/platform.css` |
| Exports CSV/PDF | `src/patches/list-export-registry.js` (`fives`, `fives-actions`) |

**Conventions** :
- Préfixe pages : `fives-*` (pas `5s-*` dans le code source).
- Utiliser `esc()` depuis `fives-utils.js` pour le HTML.
- Rechargement page : `window.reloadPage('fives-xxx')` ou `refreshFives('fives-xxx')`.
- Toasts : `window.xmToast(msg, '', '✓', '#16a34a')`.
- **Ne pas** concaténer des `onclick` avec guillemets imbriqués : préférer `data-fives-*` + `fives-crud.js` (event delegation).

---

## Pages disponibles (implémentées)

| ID plateforme | Fichier | Rôle |
|---------------|---------|------|
| `fives-kpi` | `src/pages/fives/fives-kpi.page.js` | Tableau de bord, KPI global, radar zones, liste audits |
| `fives-liste` | `src/pages/fives/fives-liste.page.js` | Historique des sessions d'audit |
| `fives-audit` | `src/pages/fives/fives-audit.page.js` | Session en cours : sélection zone + lien checklist |
| `fives-checklist` | `src/pages/fives/fives-checklist.page.js` | Notation C / NC / NA par critère |
| `fives-planning` | `src/pages/fives/fives-planning.page.js` | Échéances bi-hebdomadaires par zone |
| `fives-actions` | `src/pages/fives/fives-actions.page.js` | Plan d'actions (écarts NC) |
| `fives-fiche` | `src/pages/fives/fives-fiche.page.js` | Détail résultat d'une zone |

**Navigation barre latérale (5 entrées)** : kpi, audit, planning, checklist, actions.

### Alias qhse_v11 → moderne

```
5s-tb, 5s-kpi, env-5s     → fives-kpi
5s-audit                 → fives-audit
5s-planning              → fives-planning
5s-checklists            → fives-checklist
5s-resultats             → fives-liste
5s-actions               → fives-actions
```

### Pages v11 **non encore portées** (à créer si besoin métier)

`5s-ecarts`, `5s-suivi`, `5s-zones`, `5s-responsables`, `5s-rapports`, `5s-exports` — la logique partielle existe via checklist → actions auto et exports registre.

---

## Données — `window.FIVES_STORE` (localStorage `xm_fives_data`)

```js
{
  template: [ /* critères checklist */ ],
  audits: [ /* sessions */ ],
  actions: [ /* plans d'action */ ],
}
```

### Template checklist (`store.template[]`)

```js
{
  id: 'cl-1',           // uid stable
  n: 1,                 // numéro affiché
  pillar: 'trier',      // trier | ranger | nettoyer | standardiser | suivre
  label: 'Texte du critère…',
}
```

Piliers définis dans `src/data/fives-checklist-template.data.js` → `FIVES_PILLARS`.

Réponses audit : **`c`** (conforme), **`nc`** (non-conforme), **`na`** (non applicable), `null` (non renseigné).

### Audit (`store.audits[]`)

```js
{
  id: 'AUD5S-001',
  date: '16/05/2026',       // jj/mm/aaaa
  auditor: 'Responsable QHSE',
  period: 'Sem. 20',
  comment: '',
  statut: 'brouillon' | 'terminé',
  zoneResults: {
    'usin-cnc': {
      responses: [{ itemId, rep: 'c'|'nc'|'na', obs: '' }],
      kpi: 92,                // % conformes sur items notés c/nc
      atteint: true,          // kpi >= FIVES_KPI_GOAL (80)
      conformes, nonConformes,
      pointsForts, axes, comment,
      savedAt: ISO string,
    },
  },
  createdAt: ISO,
}
```

### Action (`store.actions[]`)

```js
{
  id: 'ACT5S-xxx',
  auditId, zoneId, itemId,   // lien optionnel checklist
  action: 'Description…',
  prio: 'Moyenne',           // Critique | Haute | Moyenne | Normale
  resp: '',
  echeance: '',              // jj/mm/aaaa
  statut: 'À faire',         // À faire | En cours | En retard | Clôturée
  createdAt: ISO,
}
```

### Zones (`FIVES_ZONES` — statique, pas dans le store)

Fichier : `src/data/fives-zones.data.js`

```js
{ id: 'usin-cnc', label: 'Usinage CNC', groupId: 'usinage', groupLabel: 'Usinage' }
// 9 zones : usinage (2), assemblage (5), magasin (3)
```

**Pas** de CRUD zones/responsables séparés (contrairement au v11 `SS5_ZONES` / `SS5_RESPS`).

### Variables d'état UI (`window.*`)

```js
window.fivesAuditId      // audit en cours
window.fivesZoneId       // zone sélectionnée (ex. 'usin-cnc')
window.s5FQ                // recherche liste audits
// Filtres actions : via data-fives-* dans fives-actions.page.js
```

---

## API données (`src/data/fives-store.js`)

| Fonction | Usage |
|----------|--------|
| `loadFivesStore()` / `persistFivesStore()` | Lecture / écriture localStorage |
| `getFivesTemplate()` | Modèle checklist |
| `getFivesAudits()` / `getFivesAudit(id)` | Audits |
| `getFivesActions()` | Actions |
| `addFivesAudit({ date, auditor, period })` | Nouvelle session |
| `saveZoneAuditResult(auditId, zoneId, payload)` | Enregistre réponses + calcule KPI |
| `calcZoneKpi(responses)` | KPI zone + seuil 80 % |
| `getGlobalKpi()` / `getZoneKpiMap()` | Agrégats dashboard |
| `getLatestZoneResult(zoneId)` | Dernier résultat zone |
| `getNextAuditDue(zoneId)` | Planning (+14 jours) |
| `addFivesAction` / `updateFivesAction` / `deleteFivesAction` | CRUD actions |
| `addTemplateRow` / `updateTemplateRow` / `removeTemplateRow` | Édition modèle checklist |
| `seedFivesStore()` | Données démo si `canAutoSeed()` |

**Auto-actions** : `saveZoneAuditResult` appelle `autoCreateActionsFromNc` pour chaque réponse `nc`.

---

## CRUD UI (`src/components/fives/fives-crud.js`)

Installation : `installFivesCrud()` dans `src/app/init.js`.

| Action | Fonction / attribut |
|--------|---------------------|
| Nouvel audit | `fivesStartNewAudit()` — bouton `data-fives-start-audit` |
| Créer audit (modal) | `data-fives-create-audit` |
| Sauver zone checklist | `fivesSaveZoneAudit()` — `data-fives-save-zone` |
| Ajouter critère checklist | `data-fives-add-row` |
| Éditer / supprimer ligne template | `data-fives-edit-row`, `data-fives-del-row` |
| Action + / éditer / supprimer | `data-fives-add-action`, `data-fives-edit-action`, `data-fives-del-action` |

Checklist DOM : `src/components/fives/fives-checklist.js` → `readResponsesFromDom()`.

---

## Logique métier (différences v11)

| v11 monolithe | Plateforme actuelle |
|---------------|---------------------|
| 5 piliers S/T/N/S4/S5 séparés | 5 piliers français : trier, ranger, nettoyer, standardiser, suivre |
| Scores par pilier + moyenne | KPI = % items **conformes** (`c`) sur items notés (`c`+`nc`) |
| `SS5_ECARTS` registre séparé | Écarts → **actions** auto (`rep === 'nc'`) |
| `oui` / `non` / `na` | `c` / `nc` / `na` |
| `ss5Export(type)` global | `xmExportList('fives')` / `xmExportList('fives-actions')` |
| Modales `ss5Modal` onclick strings | Modales `openModal` + `data-fives-*` |

```js
// KPI zone (simplifié)
const stats = calcZoneKpi(responses);
// stats.kpi = Math.round(conformes / (conformes + nonConformes) * 100)
// stats.atteint = stats.kpi >= 80  (FIVES_KPI_GOAL)
```

---

## Ajouter une nouvelle page 5S

1. **`src/pages/fives/fives-xxx.page.js`**  
   Exporter `renderFivesXxx()` (+ `bindFivesXxx` si événements).

2. **`src/core/page-registry.js`**  
   ```js
   'fives-xxx': () => renderFivesXxx(),
   ```

3. **`src/config/modules.js`** — `ICONS.fives` (optionnel si accessible via autre page).

4. **`src/patches/fives-module.js`** — `window.TITLES['fives-xxx']`.

5. **`src/core/page-aliases.js`** — si alias v11 : `'5s-xxx': 'fives-xxx'`.

6. **Exports** — enregistrer dans `list-export-registry.js` si liste exportable.

7. **Pattern UI** :
   ```html
   <div data-page="fives-xxx" class="xm-register">
     ${renderMiniToolbar('fives', extraButtons, { pageId: 'fives-xxx' })}
     <div class="card">…<table class="tbl xm-export-table">…</div>
   </div>
   ```

---

## Cheat sheet navigation

| Action | Code |
|--------|------|
| Module 5S | `goModule('fives')` |
| Dashboard | `goPage('fives-kpi')` |
| Nouvel audit | `fivesStartNewAudit()` ou bouton `data-fives-start-audit` |
| Audit + zone | `window.fivesAuditId='AUD5S-001'; window.fivesZoneId='usin-cnc'; goPage('fives-checklist')` |
| Export audits | `xmExportList('fives')` |
| Export actions | `xmExportList('fives-actions')` |
| Recharger page | `reloadPage('fives-kpi')` |

---

## Fichiers à lire avant toute modification 5S

1. `src/data/fives-store.js`
2. `src/data/fives-zones.data.js`
3. `src/components/fives/fives-crud.js`
4. `src/pages/fives/fives-audit.page.js` + `fives-checklist.page.js`
5. `src/patches/fives-module.js`
