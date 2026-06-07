/** Store — Consommations énergétiques (ISO 14001). Persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_conso';

const SEED = [
  { id: 'CONSO-001', mois: '2026-05', electricite: 25430, eau: 152, air: 4200, carburant: 400, notes: '' },
  { id: 'CONSO-002', mois: '2026-04', electricite: 26100, eau: 160, air: 4350, carburant: 412, notes: '' },
  { id: 'CONSO-003', mois: '2026-03', electricite: 24800, eau: 148, air: 4100, carburant: 395, notes: '' },
  { id: 'CONSO-004', mois: '2026-02', electricite: 27000, eau: 162, air: 4400, carburant: 425, notes: '' },
  { id: 'CONSO-005', mois: '2026-01', electricite: 25900, eau: 155, air: 4250, carburant: 408, notes: '' },
  { id: 'CONSO-006', mois: '2025-12', electricite: 28100, eau: 170, air: 4500, carburant: 430, notes: '' },
];

export const CONSO_OBJECTIFS = {
  electricite: { val: 24000, unite: 'kWh', label: 'Électricité' },
  eau: { val: 140, unite: 'm³', label: 'Eau' },
  air: { val: 4000, unite: 'm³', label: 'Air comprimé' },
  carburant: { val: 380, unite: 'L', label: 'Carburant' },
};

function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch {}
  return null;
}

function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function seedEnvConso() {
  if (!window.ENV_CONSO_DATA) {
    const stored = load();
    window.ENV_CONSO_DATA = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_CONSO_DATA);
  }
}

export function getConso() {
  seedEnvConso();
  return window.ENV_CONSO_DATA;
}

export function saveConso() {
  save(window.ENV_CONSO_DATA || []);
}

export function addConso(item) {
  const d = getConso();
  const ids = d.map((x) => parseInt(x.id.replace('CONSO-', ''), 10)).filter(Boolean);
  const max = ids.length ? Math.max(...ids) : 0;
  d.push({ ...item, id: `CONSO-${String(max + 1).padStart(3, '0')}` });
  saveConso();
  return d;
}

export function updateConso(id, changes) {
  const d = getConso();
  const idx = d.findIndex((x) => x.id === id);
  if (idx !== -1) { d[idx] = { ...d[idx], ...changes }; saveConso(); }
  return d;
}

export function deleteConso(id) {
  window.ENV_CONSO_DATA = getConso().filter((x) => x.id !== id);
  saveConso();
}

export function moisLabel(mois) {
  if (!mois) return '';
  const [y, m] = mois.split('-');
  const noms = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `${noms[parseInt(m, 10) - 1] || m} ${y}`;
}
