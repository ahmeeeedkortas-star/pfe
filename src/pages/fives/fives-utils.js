/** Utilitaires partagés module 5S */

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function parseFrDate(s) {
  const m = String(s).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

export function formatFrDate(d) {
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function isoToFr(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export function scoreColor(v) {
  if (v == null) return '#94a3b8';
  return v >= 80 ? '#16a34a' : v >= 60 ? '#ea580c' : '#dc2626';
}

export function statutBadge(statut) {
  const map = {
    Réalisé: 'ss5-badge ss5-badge--ok',
    Planifié: 'ss5-badge ss5-badge--plan',
    'En retard': 'ss5-badge ss5-badge--late',
  };
  const cls = map[statut] || 'ss5-badge';
  return `<span class="${cls}">${esc(statut)}</span>`;
}

export function getAuditors() {
  const fromAudits = [...new Set((window.SS5_AUDITS || []).map((a) => a.auditeur).filter(Boolean))];
  const fromResps = (window.SS5_RESPS || []).map((r) => r.nom);
  return [...new Set([...fromResps, ...fromAudits])].sort();
}

export function filterAudits(audits, opts = {}) {
  const fZ = opts.zone || window.ss5AudFZ || 'Tous';
  const fS = opts.statut || window.ss5AudFS || 'Tous';
  const fA = opts.auditeur || window.ss5AudFA || 'Tous';
  const fQ = (opts.q ?? window.ss5AudFQ ?? '').toLowerCase();
  const tab = opts.tab || window.ss5AudTab || 'tous';

  return audits.filter((a) => {
    if (fZ !== 'Tous' && a.zone !== fZ) return false;
    if (fS !== 'Tous' && a.statut !== fS) return false;
    if (fA !== 'Tous' && a.auditeur !== fA) return false;
    if (fQ && ![a.zone, a.auditeur, a.id].join(' ').toLowerCase().includes(fQ)) return false;
    if (tab === 'planifies' && a.statut !== 'Planifié') return false;
    if (tab === 'realises' && a.statut !== 'Réalisé') return false;
    if (tab === 'retard' && a.statut !== 'En retard') return false;
    return true;
  });
}
