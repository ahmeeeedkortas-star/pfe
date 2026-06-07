export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function auditToast(msg, color = '#2563eb') {
  if (window.xmToast) window.xmToast(msg, '', 'check-circle', color);
}

export function refreshAuditListe() {
  window.reloadPage?.('audit-liste') ?? window.goPage?.('audit-liste');
}

export function getAudits() {
  return window.AUDITS_DATA || [];
}

export function statBadge(statut) {
  if (statut === 'Clôturé') return 'bg3';
  if (statut === 'En cours') return 'by';
  return 'bb';
}

export function typeColor(type) {
  const m = {
    Interne: '#2563eb',
    'ISO 9001': '#7c3aed',
    Sécurité: '#dc2626',
    Environnement: '#16a34a',
    Fournisseur: '#ea580c',
  };
  return m[type] || '#64748b';
}

export function scoreLabel(score) {
  if (score == null) return '—';
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Satisfaisant';
  return 'À améliorer';
}

export function scoreColor(score) {
  if (score == null) return '#94a3b8';
  if (score >= 90) return '#16a34a';
  if (score >= 75) return '#f59e0b';
  return '#dc2626';
}

export const MONTHS_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export function monthFromDate(dateStr) {
  if (!dateStr) return -1;
  const m = parseInt(String(dateStr).slice(5, 7), 10);
  return m >= 1 && m <= 12 ? m - 1 : -1;
}
