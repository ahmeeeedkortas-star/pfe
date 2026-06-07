# Source HTML — Plateforme QHSE

## Fichier attendu

Placez votre monolithe à la racine du projet, **dans cet ordre de priorité** :

1. `qhse_v5__2_.html` ← version complète (~748 Ko)
2. `qhse_v5.html`
3. `qhse.html` ← repli actuel

## Synchroniser le code modulaire

```bash
npm run extract
```

Cette commande :

- lit la source détectée (`scripts/resolve-source.mjs`)
- extrait CSS → `src/styles/legacy-bundle.css`
- extrait JS → `src/legacy/`
- découpe les pages → `src/legacy/pages/*.pages.js`
- injecte les helpers 8D/QRQC → `scripts/patch-v5-helpers.mjs`

Puis :

```bash
npm run dev
```

## Helpers v5 (modules natifs)

Disponibles sur `window` après chargement :

- `renderCauseSelector`, `render5Pourquoi`, `render5M`
- `getWhyChain`, `get5MSummary`
- `renderActionsEditor`
- Checklists SST : `CL_DATA`, `initCL`, `clScore`, `clSetRep`, `clSetObs`, `clSave`, `clGenNC`, `renderDynChecklist`

Code : `src/components/qhse/` — configs checklists : `src/data/sec-checklist-configs.js`

Pages dynamiques (priorité legacy) : `sec-cl-ext`, `sec-cl-sst`, `sec-cl-phar`, `sec-cl-veh`, `sec-cl-epi`, `sec-cl-evaq`

## Animations (spec v5)

- CSS : `src/styles/animations.css` (keyframes, `--spring`, `--smooth`, toasts, stagger)
- JS : `src/app/xm-motion.js` → `xmToast`, `confettiBurst`, transitions `goPage`, tilt cartes, ripple boutons
- Initialisation : `installXmMotion()` dans `src/app/init.js`

## Pages modernes (prioritaires sur legacy)

| Page       | Module |
|-----------|--------|
| `rc-liste` | `src/pages/rc/rc-liste.page.js` |
| `nc-liste` | `src/pages/nc/nc-liste.page.js` |
