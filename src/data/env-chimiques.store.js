/** Store — Produits chimiques / FDS (ISO 14001). Persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_chimiques';

const SEED = [
  { id: 'PC-001', prod: 'Acétone', fam: 'Solvant', qte: 5, unite: 'L', empl: 'Magasin chimique', fds: true, exp: '2026-06-10', etat: 'OK', danger: 'Inflammable / Irritant', fournisseur: 'Solvants Pro', ref: 'SDS-001' },
  { id: 'PC-002', prod: 'Huile soluble', fam: 'Lubrifiant', qte: 20, unite: 'L', empl: 'Usinage CN', fds: true, exp: '2026-01-25', etat: 'Périmé', danger: 'Nocif pour l\'environnement', fournisseur: 'LubTech', ref: 'SDS-002' },
  { id: 'PC-003', prod: 'Dégraissant', fam: 'Nettoyant', qte: 3, unite: 'L', empl: 'Maintenance', fds: true, exp: '2026-07-25', etat: 'Stock bas', danger: 'Irritant', fournisseur: 'CleanPro', ref: 'SDS-003' },
  { id: 'PC-004', prod: 'Peinture industrielle', fam: 'Peinture', qte: 14, unite: 'L', empl: 'Atelier peinture', fds: false, exp: '2026-05-30', etat: 'OK', danger: 'Toxique / Inflammable', fournisseur: 'PaintCo', ref: '' },
  { id: 'PC-005', prod: 'White spirit', fam: 'Solvant', qte: 7, unite: 'L', empl: 'Magasin chimique', fds: true, exp: '2026-07-05', etat: 'OK', danger: 'Inflammable', fournisseur: 'Solvants Pro', ref: 'SDS-005' },
];

function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch {}
  return null;
}

function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function seedEnvChimiques() {
  if (!window.ENV_CHIMIQUES_DATA) {
    const stored = load();
    window.ENV_CHIMIQUES_DATA = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_CHIMIQUES_DATA);
  }
}

export function getChimiques() {
  seedEnvChimiques();
  return window.ENV_CHIMIQUES_DATA;
}

export function saveChimiques() {
  save(window.ENV_CHIMIQUES_DATA || []);
}

function nextId() {
  const ids = getChimiques().map((d) => parseInt(d.id.replace('PC-', ''), 10)).filter(Boolean);
  const max = ids.length ? Math.max(...ids) : 0;
  return `PC-${String(max + 1).padStart(3, '0')}`;
}

export function addChimique(item) {
  const d = getChimiques();
  d.push({ ...item, id: nextId() });
  saveChimiques();
  return d;
}

export function updateChimique(id, changes) {
  const d = getChimiques();
  const idx = d.findIndex((x) => x.id === id);
  if (idx !== -1) { d[idx] = { ...d[idx], ...changes }; saveChimiques(); }
  return d;
}

export function deleteChimique(id) {
  window.ENV_CHIMIQUES_DATA = getChimiques().filter((x) => x.id !== id);
  saveChimiques();
  return window.ENV_CHIMIQUES_DATA;
}

export function getEtat(p) {
  const exp = new Date(p.exp);
  const now = new Date();
  if (exp < now) return 'Périmé';
  const diffDays = (exp - now) / (1000 * 60 * 60 * 24);
  if (p.qte < 2) return 'Stock bas';
  if (diffDays < 30) return 'Expiration proche';
  return 'OK';
}

export const CHIMIQUE_FAMILLES = ['Solvant', 'Lubrifiant', 'Nettoyant', 'Peinture', 'Acide', 'Base', 'Gaz', 'Autre'];
export const CHIMIQUE_EMPLACEMENTS = ['Magasin chimique', 'Usinage CN', 'Maintenance', 'Atelier peinture', 'Laboratoire'];
export const CHIMIQUE_UNITES = ['L', 'kg', 'flacons', 'm³', 'Unités'];
export const PICTOS_FAM = { Solvant: '🧪', Lubrifiant: '🛢', Nettoyant: '🧴', Peinture: '🎨', Acide: '⚗', Base: '⚗', Gaz: '💨', Autre: '🔬' };
