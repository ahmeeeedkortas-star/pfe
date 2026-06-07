export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/** Score = G × Fréquence × Critère réversibilité */
export function getScore(a) {
  return (+a.g || 1) * (+a.freq || 1) * (+a.crit || 1);
}

export function getNiv(score) {
  if (score >= 24) return 'Critique';
  if (score >= 12) return 'Significatif';
  if (score >= 6) return 'Modéré';
  return 'Faible';
}

export function getNivC(niv) {
  if (niv === 'Critique') return { bg: '#fef2f2', bc: '#fecaca', tc: '#991b1b' };
  if (niv === 'Significatif') return { bg: '#fff7ed', bc: '#fed7aa', tc: '#9a3412' };
  if (niv === 'Modéré') return { bg: '#fffbeb', bc: '#fde68a', tc: '#92400e' };
  return { bg: '#f0fdf4', bc: '#bbf7d0', tc: '#065f46' };
}

export function getMaitriseBadgeClass(s) {
  if (s === 'Maîtrisé') return 'bg3';
  if (s === 'En cours') return 'by';
  return 'bo';
}

export function nivEmoji(niv) {
  if (niv === 'Critique') return '🔴';
  if (niv === 'Significatif') return '🟠';
  if (niv === 'Modéré') return '🟡';
  return '🟢';
}

export function graviteLabel(g) {
  const n = +g;
  if (n === 3) return 'Élevé';
  if (n === 2) return 'Modéré';
  return 'Faible';
}

export function syncAspectNiv(a) {
  const score = getScore(a);
  a.niv = getNiv(score);
  return a;
}

export function refreshEnvAspects() {
  window.reloadPage?.('env-aspects') ?? window.goPage?.('env-aspects');
}

export function aspToast(msg, color = '#166534') {
  if (window.xmToast) window.xmToast(msg, '', 'check-circle', color);
}

export const ASP_STEPS = ['Identification', 'Évaluation', 'Actions', 'Validation', 'Clôture'];

export const ACTIVITES = [
  'Usinage CN',
  'Peinture',
  'Assemblage',
  'Maintenance',
  'Stockage',
  'Tous ateliers',
  'Bureau',
];

export const RESP_LIST = ['HSE', 'Maintenance', 'Production', 'Qualité', 'KORTAS.A', 'Logistique'];

export const ENV_ACCENT = '#16a34a';
