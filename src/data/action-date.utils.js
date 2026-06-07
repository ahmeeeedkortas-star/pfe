/** Filtres période pour actions (échéance / début) — Jour, Semaine, Mois, Année. */
import { isoWeekInfo, parseRcDate } from './rc-date.utils.js';

export const ACTION_PERIOD_LEVELS = [
  { id: 'jour', label: 'Jour', inputType: 'date' },
  { id: 'semaine', label: 'Semaine', inputType: 'week' },
  { id: 'mois', label: 'Mois', inputType: 'month' },
  { id: 'annee', label: 'Année', inputType: 'year' },
];

export function parseActionDate(dateStr) {
  return parseRcDate(dateStr);
}

export function getActionDateParts(action, field = 'fin') {
  const raw = field === 'debut' ? action.debut : action.fin;
  if (!raw || raw === '—') return null;
  return parseActionDate(raw);
}

/**
 * @param {object} action
 * @param {{ level: string, value: string, field?: string, enabled?: boolean }} filter
 */
export function matchActionPeriodFilter(action, filter) {
  if (!filter?.enabled || !filter?.value) return true;
  const p = getActionDateParts(action, filter.field || 'fin');
  if (!p) return false;

  const { level, value } = filter;
  switch (level) {
    case 'jour': {
      const iso = `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
      return iso === value;
    }
    case 'semaine': {
      const m = /^(\d{4})-W(\d{1,2})$/.exec(value);
      if (!m) return true;
      const { week, weekYear } = isoWeekInfo(p.year, p.month, p.day);
      return Number(m[1]) === weekYear && Number(m[2]) === week;
    }
    case 'mois': {
      const [y, mo] = value.split('-').map(Number);
      return p.year === y && p.month === mo;
    }
    case 'annee':
      return String(p.year) === String(value);
    default:
      return true;
  }
}

export function ensureActionPeriodFilter(prefix) {
  const key = `${prefix}ActPeriod`;
  if (!window[key]) {
    window[key] = { level: 'mois', value: '', field: 'fin', enabled: false };
  }
  return window[key];
}

export function resetActionPeriodFilter(prefix) {
  const key = `${prefix}ActPeriod`;
  window[key] = { level: 'mois', value: '', field: 'fin', enabled: false };
}

/** @param {object[]} actions */
export function collectActionYears(actions, field = 'fin') {
  const years = new Set();
  for (const a of actions) {
    const p = getActionDateParts(a, field);
    if (p?.year) years.add(p.year);
  }
  const y = new Date().getFullYear();
  years.add(y);
  return [...years].sort((a, b) => b - a);
}

export function formatPeriodSummary(filter) {
  if (!filter?.enabled || !filter.value) return 'Toutes les périodes';
  const lvl = ACTION_PERIOD_LEVELS.find((l) => l.id === filter.level);
  const field = filter.field === 'debut' ? 'début' : 'échéance';
  if (filter.level === 'jour') {
    const [y, m, d] = filter.value.split('-');
    return `${d}/${m}/${y} (${field})`;
  }
  if (filter.level === 'semaine') return `${filter.value.replace('-W', ' · S')} (${field})`;
  if (filter.level === 'mois') {
    const [y, m] = filter.value.split('-');
    const months = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `${months[Number(m) - 1] || m} ${y} (${field})`;
  }
  if (filter.level === 'annee') return `${filter.value} (${field})`;
  return `${lvl?.label || ''} · ${filter.value}`;
}
