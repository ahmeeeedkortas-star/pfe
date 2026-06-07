/** Store — Registre des déchets (ISO 14001). Persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_dechets';

const SEED = [
  { id: 'DEC-001', d: '2026-05-15', type: 'Métalliques', desc: 'Copeaux usinage CN', qte: 120, unite: 'kg', zone: 'Usinage CN', stockOk: true, enlev: '2026-05-15', presta: 'Eco Recycling', s: 'Enlevé' },
  { id: 'DEC-002', d: '2026-05-12', type: 'Huiles usagées', desc: 'Huile de coupe usagée', qte: 85, unite: 'L', zone: 'Usinage CN', stockOk: true, enlev: '2026-05-18', presta: 'Metal Green', s: 'En attente' },
  { id: 'DEC-003', d: '2026-05-13', type: 'Cartons', desc: 'Emballages fournisseurs', qte: 200, unite: 'kg', zone: 'Magasin', stockOk: true, enlev: '2026-05-15', presta: 'Veero Carton', s: 'Enlevé' },
  { id: 'DEC-004', d: '2026-05-14', type: 'Plastiques', desc: 'Films plastiques', qte: 80, unite: 'kg', zone: 'Assemblage', stockOk: true, enlev: '2026-05-20', presta: 'Plast Recycle', s: 'En attente' },
  { id: 'DEC-005', d: '2026-05-16', type: 'Dangereux', desc: 'Chiffons souillés', qte: 25, unite: 'kg', zone: 'Maintenance', stockOk: false, enlev: null, presta: 'Hazard Clean', s: 'Non conforme' },
  { id: 'DEC-006', d: '2026-05-17', type: 'Dangereux', desc: 'Solvants usés', qte: 40, unite: 'L', zone: 'Peinture', stockOk: false, enlev: null, presta: 'Hazard Clean', s: 'Non conforme' },
];

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function seedEnvDechets() {
  if (!window.ENV_DECHETS_DATA) {
    const stored = load();
    window.ENV_DECHETS_DATA = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_DECHETS_DATA);
  }
}

export function getDechets() {
  seedEnvDechets();
  return window.ENV_DECHETS_DATA;
}

export function saveDechets() {
  save(window.ENV_DECHETS_DATA || []);
}

function nextId() {
  const ids = getDechets().map((d) => parseInt(d.id.replace('DEC-', ''), 10)).filter(Boolean);
  const max = ids.length ? Math.max(...ids) : 0;
  return `DEC-${String(max + 1).padStart(3, '0')}`;
}

export function addDechet(item) {
  const d = getDechets();
  d.push({ ...item, id: nextId() });
  saveDechets();
  return d;
}

export function updateDechet(id, changes) {
  const d = getDechets();
  const idx = d.findIndex((x) => x.id === id);
  if (idx !== -1) { d[idx] = { ...d[idx], ...changes }; saveDechets(); }
  return d;
}

export function deleteDechet(id) {
  window.ENV_DECHETS_DATA = getDechets().filter((x) => x.id !== id);
  saveDechets();
  return window.ENV_DECHETS_DATA;
}

export const DECHET_TYPES = ['Métalliques', 'Huiles usagées', 'Cartons', 'Plastiques', 'Dangereux', 'DEEE', 'Piles/batteries', 'Verre', 'Bois', 'Autres'];
export const DECHET_ZONES = ['Usinage CN', 'Assemblage', 'Magasin', 'Maintenance', 'Peinture', 'Bureau', 'Contrôle réception'];
export const DECHET_STATUTS = ['En attente', 'Enlevé', 'Non conforme'];
export const DECHET_UNITES = ['kg', 'L', 'T', 'Unités', 'm³'];
export const DECHET_PRESTAS = ['Eco Recycling', 'Metal Green', 'Veero Carton', 'Plast Recycle', 'Hazard Clean', 'Autre'];
