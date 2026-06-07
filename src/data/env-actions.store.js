/** Store — Plans d'actions environnementaux (ISO 14001). Persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_actions';

const SEED = [
  { id: 1, action: 'Installer bac rétention huile', origine: 'Aspect ASP-001', resp: 'HSE', fin: '2026-05-20', statut: 'En cours', prio: 'Critique', prog: 45, type: 'Technique', desc: 'Bac 200L zone usinage CN01-CN03' },
  { id: 2, action: 'Réduire consommation eau -10%', origine: 'Consommations', resp: 'Maintenance', fin: '2026-05-25', statut: 'En cours', prio: 'Haute', prog: 30, type: 'Optimisation', desc: 'Détection fuites + régulateurs pression' },
  { id: 3, action: 'Trier déchets dangereux', origine: 'Déchet DEC-005', resp: 'Logistique', fin: '2026-05-25', statut: 'À faire', prio: 'Critique', prog: 0, type: 'Opérationnel', desc: 'Mise en conformité stockage DIS 2025-003' },
  { id: 4, action: 'Optimiser tri déchets métalliques', origine: 'Déchet DEC-001', resp: 'Logistique', fin: '2026-05-30', statut: 'En cours', prio: 'Normale', prog: 60, type: 'Opérationnel', desc: 'Nouveau container trié par alliage' },
  { id: 5, action: 'Sensibilisation environnement', origine: 'Plan ISO 14001', resp: 'RH', fin: '2026-05-30', statut: 'À faire', prio: 'Normale', prog: 0, type: 'Formation', desc: 'Session 2h tous opérateurs juin 2026' },
  { id: 6, action: 'Audit fournisseur chimiques', origine: 'Produit PC-002', resp: 'KORTAS.A', fin: '2026-04-15', statut: 'En retard', prio: 'Haute', prog: 20, type: 'Audit', desc: 'Audit conformité fournisseur acétone' },
  { id: 7, action: 'MAJ plan urgence env.', origine: 'Urgence URG-003', resp: 'HSE', fin: '2026-04-10', statut: 'En retard', prio: 'Haute', prog: 15, type: 'Documentation', desc: 'Révision procédure fuite peinture' },
  { id: 8, action: 'Renouvellement FDS produits', origine: 'Produit PC-004', resp: 'KORTAS.A', fin: '2026-02-28', statut: 'Clôturée', prio: 'Haute', prog: 100, type: 'Administratif', desc: '18 FDS mises à jour — SDS Manager' },
  { id: 9, action: 'Installer LED atelier usinage', origine: 'Consommations', resp: 'Maintenance', fin: '2026-06-30', statut: 'À faire', prio: 'Normale', prog: 0, type: 'Technique', desc: 'Remplacement éclairage 120 points lumineux' },
  { id: 10, action: 'Formation tri sélectif', origine: 'Plan ISO 14001', resp: 'RH', fin: '2026-06-15', statut: 'Clôturée', prio: 'Normale', prog: 100, type: 'Formation', desc: 'Formation tri + affichage zones' },
];

function load() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch {}
  return null;
}

function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

export function seedEnvActions() {
  if (!window.ENV_ACTIONS) {
    const stored = load();
    window.ENV_ACTIONS = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    if (!stored && canAutoSeed()) save(window.ENV_ACTIONS);
  }
}

export function getEnvActions() {
  seedEnvActions();
  return window.ENV_ACTIONS;
}

export function saveEnvActions() {
  save(window.ENV_ACTIONS || []);
}

function nextId() {
  const ids = getEnvActions().map((a) => a.id).filter(Number.isInteger);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

export function addEnvAction(item) {
  const d = getEnvActions();
  d.push({ ...item, id: nextId() });
  saveEnvActions();
  return d;
}

export function updateEnvAction(id, changes) {
  const d = getEnvActions();
  const idx = d.findIndex((x) => x.id === id);
  if (idx !== -1) { d[idx] = { ...d[idx], ...changes }; saveEnvActions(); }
  return d;
}

export function deleteEnvAction(id) {
  window.ENV_ACTIONS = getEnvActions().filter((x) => x.id !== id);
  saveEnvActions();
  return window.ENV_ACTIONS;
}

export const ACTION_TYPES = ['Technique', 'Optimisation', 'Opérationnel', 'Formation', 'Audit', 'Documentation', 'Administratif'];
export const ACTION_PRIOS = ['Critique', 'Haute', 'Normale', 'Faible'];
export const ACTION_STATUTS = ['À faire', 'En cours', 'En retard', 'Clôturée'];
export const ACTION_RESPS = ['HSE', 'Maintenance', 'Logistique', 'RH', 'KORTAS.A', 'Direction', 'Production'];

export const TYPE_COLORS = {
  Technique: { tc: '#1e40af', bg: '#dbeafe' },
  Optimisation: { tc: '#7c3aed', bg: '#f5f3ff' },
  Opérationnel: { tc: '#065f46', bg: '#d1fae5' },
  Formation: { tc: '#92400e', bg: '#fef3c7' },
  Audit: { tc: '#c2410c', bg: '#ffedd5' },
  Documentation: { tc: '#991b1b', bg: '#fce7f3' },
  Administratif: { tc: '#475569', bg: '#f1f5f9' },
};
