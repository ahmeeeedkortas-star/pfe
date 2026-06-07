export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function fmtDate(d) {
  if (!d) return '—';
  const p = d.split('-');
  if (p.length !== 3) return d;
  return `${p[2]}/${p[1]}/${p[0]}`;
}

export function graviteStyle(g) {
  if (g === 'Grave') return { bg: '#fef2f2', tc: '#991b1b', bc: '#fecaca' };
  if (g === 'Moyenne') return { bg: '#fff7ed', tc: '#9a3412', bc: '#fed7aa' };
  if (g === 'Légère') return { bg: '#f0fdf4', tc: '#065f46', bc: '#bbf7d0' };
  return { bg: '#f9fafb', tc: '#6b7a99', bc: '#e5e7eb' };
}

export function statutBadgeClass(s) {
  if (s === 'Clôturé') return 'bg3';
  if (s === 'En cours') return 'by';
  if (s === 'Ouvert') return 'bb';
  return 'bgr';
}

export function refreshAccidents() {
  window.reloadPage?.('sec-accidents') ?? window.goPage?.('sec-accidents');
}

export function accToast(msg, color = '#0f2044') {
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

export const ACC_STEPS = ['Déclaré', 'Analyse', 'Actions', 'Validation', 'Clôture'];

export const DEPTS = ['Usinage', 'Assemblage', 'Maintenance', 'Magasin', 'Bureau'];
