/** Utilitaires dates NC (liste, filtres hiérarchiques). */
export { MOIS_LABELS, DATE_FILTER_LEVELS } from './rc-date.utils.js';
import { MOIS_LABELS, isoWeekInfo } from './rc-date.utils.js';

export function parseNcDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('/').map((x) => parseInt(x, 10));
  if (parts.length < 3 || Number.isNaN(parts[1])) return null;
  const [day, month, year] = parts;
  const trimestre = month <= 3 ? 'T1' : month <= 6 ? 'T2' : month <= 9 ? 'T3' : 'T4';
  return { day, month, year, trimestre };
}

export function getNcDateKey(nc, level) {
  const p = parseNcDate(nc.d);
  if (!p) return null;
  switch (level) {
    case 'annee':
      return String(p.year);
    case 'trimestre':
      return `${p.trimestre} ${p.year}`;
    case 'mois':
      return `${MOIS_LABELS[p.month - 1]} ${p.year}`;
    case 'semaine': {
      const { week, weekYear } = isoWeekInfo(p.year, p.month, p.day);
      return `S${week} ${weekYear}`;
    }
    case 'jour':
      return nc.d;
    default:
      return null;
  }
}

export function matchNcDateFilter(nc, level, value) {
  if (!value || value === 'Tous') return true;
  return getNcDateKey(nc, level) === value;
}

const TRIM_ORDER = { T1: 1, T2: 2, T3: 3, T4: 4 };

function sortDateKeys(keys, level) {
  if (level === 'annee') return keys.sort((a, b) => Number(b) - Number(a));
  if (level === 'trimestre') {
    return keys.sort((a, b) => {
      const [ta, ya] = a.split(' ');
      const [tb, yb] = b.split(' ');
      return Number(yb) - Number(ya) || TRIM_ORDER[tb] - TRIM_ORDER[ta];
    });
  }
  if (level === 'mois') {
    return keys.sort((a, b) => {
      const parse = (s) => {
        const parts = s.split(' ');
        const y = Number(parts[parts.length - 1]);
        const m = MOIS_LABELS.indexOf(parts[0]);
        return { y, m };
      };
      const pa = parse(a);
      const pb = parse(b);
      return pb.y - pa.y || pb.m - pa.m;
    });
  }
  if (level === 'semaine') {
    return keys.sort((a, b) => {
      const wa = parseInt(a.match(/S(\d+)/)?.[1] || '0', 10);
      const wb = parseInt(b.match(/S(\d+)/)?.[1] || '0', 10);
      const ya = parseInt(a.match(/(\d{4})$/)?.[1] || '0', 10);
      const yb = parseInt(b.match(/(\d{4})$/)?.[1] || '0', 10);
      return yb - ya || wb - wa;
    });
  }
  if (level === 'jour') {
    return keys.sort((a, b) => {
      const toT = (s) => {
        const p = parseNcDate(s);
        return p ? new Date(p.year, p.month - 1, p.day).getTime() : 0;
      };
      return toT(b) - toT(a);
    });
  }
  return keys;
}

const TRIMESTRES_LIST = ['T1', 'T2', 'T3', 'T4'];

function countByDateKey(data, level) {
  const counts = new Map();
  data.forEach((nc) => {
    const k = getNcDateKey(nc, level);
    if (k) counts.set(k, (counts.get(k) || 0) + 1);
  });
  return counts;
}

function buildAllMonthOptions(data, counts) {
  const years = getNcYears(data);
  const keys = [];
  years.forEach((year) => {
    MOIS_LABELS.forEach((label) => {
      keys.push(`${label} ${year}`);
    });
  });
  return keys.map((k) => ({
    value: k,
    label: k,
    count: counts.get(k) ?? 0,
  }));
}

function buildAllTrimestreOptions(data, counts) {
  const years = getNcYears(data);
  const keys = [];
  years.forEach((year) => {
    TRIMESTRES_LIST.forEach((t) => keys.push(`${t} ${year}`));
  });
  return sortDateKeys(keys, 'trimestre').map((k) => ({
    value: k,
    label: k,
    count: counts.get(k) || 0,
  }));
}

export function buildNcDateFilterOptions(data, level) {
  const counts = countByDateKey(data, level);
  if (level === 'mois') return buildAllMonthOptions(data, counts);
  if (level === 'trimestre') return buildAllTrimestreOptions(data, counts);
  const keys = sortDateKeys([...counts.keys()], level);
  return keys.map((k) => ({ value: k, label: k, count: counts.get(k) || 0 }));
}

export function getNcYears(data) {
  const years = new Set([new Date().getFullYear()]);
  data.forEach((nc) => {
    const p = parseNcDate(nc.d);
    if (p?.year) years.add(p.year);
  });
  return [...years].sort((a, b) => b - a);
}

export function getDefaultNcDateFilter() {
  return { level: 'annee', value: 'Tous' };
}

export function ensureNcDateFilter() {
  if (!window.ncDateFilter?.level) {
    window.ncDateFilter = getDefaultNcDateFilter();
  }
  return window.ncDateFilter;
}
