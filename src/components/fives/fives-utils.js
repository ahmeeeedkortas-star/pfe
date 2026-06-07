/**
 * Utilitaires module 5S.
 */
import { seedFivesStore } from '../../data/fives-store.js';

export const FIVES_ACCENT = '#f59e0b';
export { FIVES_KPI_GOAL } from '../../data/fives-store.js';

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function kpiColor(kpi) {
  if (kpi == null) return '#94a3b8';
  if (kpi >= 80) return '#16a34a';
  if (kpi >= 60) return '#f59e0b';
  return '#dc2626';
}

export function kpiBadgeClass(atteint) {
  return atteint ? 'bg3' : 'by';
}

export function refreshFives(pageId = window.STATE?.page || 'fives-kpi') {
  if (typeof window.reloadPage === 'function') window.reloadPage(pageId);
  else if (typeof window.goPage === 'function') window.goPage(pageId);
}

export function ensureFives() {
  seedFivesStore();
}
