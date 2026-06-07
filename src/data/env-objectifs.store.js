/** Objectifs environnementaux ISO 14001 — persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_objectifs_v1';

const SEED = [
  {
    id: 'OBJ-001',
    titre: 'Réduire consommation énergie de -10%',
    indicateur: 'kWh/mois',
    ciblePct: -10,
    valInit: 28500,
    valActuelle: 25430,
    valCible: 25650,
    echeance: '31/12/2026',
    resp: 'HSE Manager',
    statut: 'En cours',
    notes: '',
  },
  {
    id: 'OBJ-002',
    titre: 'Augmenter taux de recyclage de +20%',
    indicateur: '% recyclé',
    ciblePct: 20,
    valInit: 62,
    valActuelle: 68,
    valCible: 80,
    echeance: '31/12/2026',
    resp: 'HSE Manager',
    statut: 'En cours',
    notes: '',
  },
  {
    id: 'OBJ-003',
    titre: 'Réduire consommation eau de -15%',
    indicateur: 'm³/mois',
    ciblePct: -15,
    valInit: 165,
    valActuelle: 152,
    valCible: 140,
    echeance: '30/06/2026',
    resp: 'HSE Manager',
    statut: 'En cours',
    notes: '',
  },
  {
    id: 'OBJ-004',
    titre: 'Zéro incident environnemental majeur',
    indicateur: 'nb incidents',
    ciblePct: 0,
    valInit: 0,
    valActuelle: 0,
    valCible: 0,
    echeance: '31/12/2026',
    resp: 'Direction',
    statut: 'En cours',
    notes: 'Objectif annuel',
  },
  {
    id: 'OBJ-005',
    titre: 'Réduire déchets dangereux de -10%',
    indicateur: 'kg/mois',
    ciblePct: -10,
    valInit: 450,
    valActuelle: 420,
    valCible: 405,
    echeance: '31/12/2026',
    resp: 'KORTAS.A',
    statut: 'En cours',
    notes: '',
  },
];

function load() {
  try {
    const r = localStorage.getItem(KEY);
    if (r) return JSON.parse(r);
  } catch {
    /* ignore */
  }
  return null;
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function seedEnvObjectifs() {
  if (!window.ENV_OBJECTIFS_DATA) {
    const stored = load();
    window.ENV_OBJECTIFS_DATA = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_OBJECTIFS_DATA);
  }
}

export function getObjectifs() {
  seedEnvObjectifs();
  return window.ENV_OBJECTIFS_DATA;
}

export function calcObjectifProgress(o) {
  const { valInit: vi, valActuelle: va, valCible: vc, ciblePct } = o;
  if (vc === vi) return va <= vc ? 100 : 0;
  const pct = Math.round(((va - vi) / (vc - vi)) * 100);
  return Math.max(0, Math.min(100, pct));
}

export function addObjectif(item) {
  const d = getObjectifs();
  const n = d.length + 1;
  d.push({ ...item, id: `OBJ-${String(n).padStart(3, '0')}` });
  save(d);
}

export function updateObjectif(id, changes) {
  const d = getObjectifs();
  const i = d.findIndex((x) => x.id === id);
  if (i !== -1) {
    d[i] = { ...d[i], ...changes };
    save(d);
  }
}

export function deleteObjectif(id) {
  window.ENV_OBJECTIFS_DATA = getObjectifs().filter((x) => x.id !== id);
  save(window.ENV_OBJECTIFS_DATA);
}
