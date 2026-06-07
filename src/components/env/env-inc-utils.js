/** Utilitaires — incidents environnementaux (alignés registre accidents SST). */
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function envGraviteStyle(g) {
  if (g === 'Critique') return { bg: '#fef2f2', tc: '#7f1d1d', bc: '#fecaca' };
  if (g === 'Majeure') return { bg: '#fef2f2', tc: '#991b1b', bc: '#fecaca' };
  if (g === 'Mineure') return { bg: '#fffbeb', tc: '#92400e', bc: '#fde68a' };
  return { bg: '#f9fafb', tc: '#64748b', bc: '#e2e8f0' };
}

export function envStatutBadge(s) {
  if (s === 'Clôturé') return 'bg3';
  if (s === 'En cours') return 'by';
  if (s === 'Ouvert') return 'br';
  return 'bgr';
}

export function refreshEnvIncidents() {
  window.reloadPage?.('env-incidents') ?? window.goPage?.('env-incidents');
}

export function envIncToast(msg, color = '#166534') {
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

export const ENV_INC_STEPS = ['Déclaration', 'Analyse', 'Actions', 'Validation', 'Clôture'];

export const ENV_ZONES = [
  'Atelier Usinage',
  'Zone Production',
  'Stockage',
  'Extérieur',
  'Bureaux',
  'Maintenance',
];
