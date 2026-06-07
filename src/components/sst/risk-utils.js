export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function getCrit(r) {
  return r.g * r.f * r.d;
}

export function getNiv(c) {
  if (c > 60) return 'Critique';
  if (c > 30) return 'Élevé';
  if (c > 10) return 'Moyen';
  return 'Faible';
}

export function getNivC(niv) {
  if (niv === 'Critique') return { bg: '#fef2f2', bc: '#fecaca', tc: '#991b1b' };
  if (niv === 'Élevé') return { bg: '#fff7ed', bc: '#fed7aa', tc: '#9a3412' };
  if (niv === 'Moyen') return { bg: '#fffbeb', bc: '#fde68a', tc: '#92400e' };
  return { bg: '#f0fdf4', bc: '#bbf7d0', tc: '#065f46' };
}

export function getStatBadgeClass(s) {
  if (s === 'Traitement') return 'bb';
  if (s === 'Clôturé') return 'bg3';
  return 'bo';
}

export function nivEmoji(niv) {
  if (niv === 'Critique') return '🔴';
  if (niv === 'Élevé') return '🟠';
  if (niv === 'Moyen') return '🟡';
  return '🟢';
}

export function refreshSstRisques() {
  window.reloadPage?.('sec-risques') ?? window.goPage?.('sec-risques');
}

export function sstToast(msg, color = '#0f2044') {
  const d = document.createElement('div');
  d.className = 'xm-toast-register';
  d.style.background = color;
  d.textContent = msg;
  document.body.appendChild(d);
  setTimeout(() => {
    d.style.opacity = '0';
    setTimeout(() => d.remove(), 400);
  }, 2800);
}

export const ZONES = [
  'Atelier usinage',
  'Assemblage',
  'Maintenance',
  'Bureau',
  'Magasin',
  'Bâtiment B',
];

export const RESP_LIST = ['Ali M.', 'Karim S.', 'HSE', 'Youssef A.', 'RH', 'Mehdi R.'];

export const SST_STEPS = ['Identification', 'Évaluation', 'Actions', 'Validation', 'Clôture'];
