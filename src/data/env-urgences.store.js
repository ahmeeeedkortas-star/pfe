/** Store — Situations d'urgence environnementales (ISO 14001). Persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_urgences';

const SEED = [
  { id: 'URG-001', type: 'Fuite huile', zone: 'Atelier usinage', sit: 'Déversement huile machine CN', niv: 'Élevé', action: 'Déployer absorbants, neutraliser', resp: 'Ali Mohamed', equip: 'Kit absorbants', s: 'Actif', dateRev: '2026-12-01' },
  { id: 'URG-002', type: 'Incendie chimique', zone: 'Magasin chimique', sit: 'Incendie solvants inflammables', niv: 'Très élevé', action: 'Extincteur CO2, évacuation immédiate', resp: 'HSE', equip: 'Extincteur CO2', s: 'Actif', dateRev: '2026-12-01' },
  { id: 'URG-003', type: 'Pollution eau', zone: 'Zone peinture', sit: 'Ruissellement peinture vers réseau', niv: 'Élevé', action: 'Barrage anti-pollution', resp: 'KORTAS.A', equip: 'Barrage + kit neutralisation', s: 'Actif', dateRev: '2026-12-01' },
  { id: 'URG-004', type: 'Fuite produit chimique', zone: 'Maintenance', sit: 'Fuite acide dilué', niv: 'Moyen', action: 'EPI complet, kit absorption acide', resp: 'KORTAS.A', equip: 'Kit neutralisation acide', s: 'Actif', dateRev: '2026-12-01' },
];

export const EQUIPEMENTS_URGENCE = [
  { nom: 'Kit absorbants', qte: 8, loc: 'Atelier usinage', dispo: true },
  { nom: 'Extincteur CO2', qte: 12, loc: 'Magasin chimique', dispo: true },
  { nom: 'Barrage anti-pollution', qte: 3, loc: 'Zone peinture', dispo: true },
  { nom: 'Douche de sécurité', qte: 2, loc: 'Maintenance', dispo: true },
  { nom: 'Kit neutralisation acide', qte: 4, loc: 'Maintenance', dispo: true },
];

export const CONTACTS_URGENCE = [
  { nom: 'Ali Mohamed', role: 'Responsable HSE', tel: '06 12 34 56 78', c: '#dc2626' },
  { nom: 'Chef maintenance', role: 'Maintenance', tel: '06 98 76 54 32', c: '#ea580c' },
  { nom: 'Dr. Nadia', role: 'Médecin du travail', tel: '06 55 23 11 22', c: '#16a34a' },
  { nom: 'Youssef Ahmed', role: 'Responsable sécurité', tel: '06 32 21 11 00', c: '#0284c7' },
];

function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch {}
  return null;
}

function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function seedEnvUrgences() {
  if (!window.ENV_URGENCES_DATA) {
    const stored = load();
    window.ENV_URGENCES_DATA = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_URGENCES_DATA);
  }
}

export function getUrgences() {
  seedEnvUrgences();
  return window.ENV_URGENCES_DATA;
}

export function saveUrgences() {
  save(window.ENV_URGENCES_DATA || []);
}

function nextId() {
  const ids = getUrgences().map((d) => parseInt(d.id.replace('URG-', ''), 10)).filter(Boolean);
  const max = ids.length ? Math.max(...ids) : 0;
  return `URG-${String(max + 1).padStart(3, '0')}`;
}

export function addUrgence(item) {
  const d = getUrgences();
  d.push({ ...item, id: nextId() });
  saveUrgences();
  return d;
}

export function updateUrgence(id, changes) {
  const d = getUrgences();
  const idx = d.findIndex((x) => x.id === id);
  if (idx !== -1) { d[idx] = { ...d[idx], ...changes }; saveUrgences(); }
  return d;
}

export function deleteUrgence(id) {
  window.ENV_URGENCES_DATA = getUrgences().filter((x) => x.id !== id);
  saveUrgences();
  return window.ENV_URGENCES_DATA;
}

export const URGENCE_TYPES = ['Fuite huile', 'Incendie chimique', 'Pollution eau', 'Fuite produit chimique', 'Déversement', 'Pollution air', 'Autre'];
export const URGENCE_NIVEAUX = ['Très élevé', 'Élevé', 'Moyen', 'Faible'];
