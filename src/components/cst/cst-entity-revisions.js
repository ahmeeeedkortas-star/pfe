/**
 * Révisions et traçabilité par entité — module CST (ISO 7.5).
 */
import { nowTimeCst, todayCst } from '../../pages/cst/cst-store.js';

export function getCstCurrentUser() {
  return (
    window.STATE?.user?.nom ||
    window.STATE?.user?.name ||
    window.CURRENT_USER ||
    window.__qhseUser ||
    'Utilisateur'
  );
}

export function ensureEntityTrace(item, defaults = {}) {
  if (!item) return item;
  const now = todayCst();
  if (!item.createdAt) item.createdAt = defaults.createdAt || now;
  if (!item.dateMaj) item.dateMaj = item.createdAt;
  if (!item.createdBy) item.createdBy = defaults.createdBy || getCstCurrentUser();
  if (!item.updatedBy) item.updatedBy = item.createdBy;
  if (!item.statut) item.statut = defaults.statut || 'Actif';
  if (!item.revisions) item.revisions = [];
  if (!item.version) item.version = item.version || 'V1';
  return item;
}

export function recordEntityRevision(item, snapshot, user, motif = 'Modification') {
  ensureEntityTrace(item);
  const u = user || getCstCurrentUser();
  const revNum = (item.revisions?.length || 0) + 1;
  item.revisions = item.revisions || [];
  item.revisions.unshift({
    version: `V${revNum}`,
    date: todayCst(),
    time: nowTimeCst(),
    user: u,
    motif,
    snapshot: snapshot ? JSON.parse(JSON.stringify(snapshot)) : null,
  });
  if (item.revisions.length > 50) item.revisions = item.revisions.slice(0, 50);
  item.dateMaj = todayCst();
  item.updatedBy = u;
  item.version = `V${revNum}`;
  return item;
}

export function initNewEntity(item, user) {
  const u = user || getCstCurrentUser();
  const now = todayCst();
  item.createdAt = now;
  item.dateMaj = now;
  item.createdBy = u;
  item.updatedBy = u;
  item.statut = item.statut || 'Actif';
  item.version = 'V1';
  item.revisions = [
    {
      version: 'V1',
      date: now,
      time: nowTimeCst(),
      user: u,
      motif: 'Création',
      snapshot: null,
    },
  ];
  return item;
}

export function recordSingletonRevision(obj, snapshot, user, motif = 'Modification') {
  ensureEntityTrace(obj);
  return recordEntityRevision(obj, snapshot, user, motif);
}

export function parseFrDate(str) {
  if (!str) return null;
  const m = String(str).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  return new Date(+m[3], +m[2] - 1, +m[1]);
}

export function matchesPeriod(dateStr, period) {
  if (!period || period === 'all') return true;
  const d = parseFrDate(dateStr);
  if (!d || Number.isNaN(d.getTime())) return true;
  const now = new Date();
  if (period === 'month') {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  if (period === 'quarter') {
    const q = Math.floor(now.getMonth() / 3);
    return Math.floor(d.getMonth() / 3) === q && d.getFullYear() === now.getFullYear();
  }
  if (period === 'year') {
    return d.getFullYear() === now.getFullYear();
  }
  if (/^\d{4}$/.test(period)) {
    return d.getFullYear() === +period;
  }
  if (/^\d{4}-\d{2}$/.test(period)) {
    const [y, mo] = period.split('-').map(Number);
    return d.getFullYear() === y && d.getMonth() + 1 === mo;
  }
  return true;
}

export function applyTraceFilters(items, filter, opts = {}) {
  const dateField = opts.dateField || 'dateMaj';
  const userField = opts.userField || 'updatedBy';
  const statutField = opts.statutField || 'statut';
  const respField = opts.respField || 'responsable';
  const f = filter || {};

  return items.filter((it) => {
    const dateVal = it[dateField] || it.createdAt || '';
    if (f.period && !matchesPeriod(dateVal, f.period)) return false;
    if (f.responsable) {
      const resp = (it[userField] || it[respField] || it.createdBy || '').toLowerCase();
      if (!resp.includes(f.responsable.toLowerCase())) return false;
    }
    if (f.statut && it[statutField] && it[statutField] !== f.statut) return false;
    if (f.q) {
      const hay = Object.values(it).join(' ').toLowerCase();
      if (!hay.includes(f.q.toLowerCase())) return false;
    }
    return true;
  });
}
