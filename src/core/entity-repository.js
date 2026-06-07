/**
 * Repository générique — CRUD, soft delete (deletedAt), filtres, pagination.
 * Persistance localStorage (SPA QHSE sans backend obligatoire).
 */
import { dateInRange } from './parse-fr-date.js';
import { canAutoSeed } from './empty-platform.js';

/**
 * @template T
 * @param {{
 *   storageKey: string,
 *   windowKey?: string,
 *   seed?: T[],
 *   idField?: string,
 * }} config
 */
export function createEntityRepository(config) {
  const { storageKey, windowKey, seed = [], idField = 'id' } = config;
  let hydrated = false;

  function readRaw() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return null;
  }

  function writeRaw(items) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* ignore */
    }
    if (windowKey && typeof window !== 'undefined') {
      window[windowKey] = items;
    }
  }

  function hydrate() {
    if (hydrated) return getAll();
    let items = readRaw();
    if (!items?.length) {
      items = canAutoSeed()
        ? seed.map((row) => ({
            ...row,
            deletedAt: row.deletedAt ?? null,
            priority: row.priority ?? row.prio ?? null,
            status: row.status ?? row.s ?? null,
          }))
        : [];
      writeRaw(items);
    }
    if (windowKey && typeof window !== 'undefined') {
      window[windowKey] = items;
    }
    hydrated = true;
    return items;
  }

  function getAll() {
    const items = readRaw() || hydrate();
    return items;
  }

  function persist(items) {
    writeRaw(items);
    hydrated = true;
  }

  function resolveId(row) {
    return row[idField] ?? row.n ?? row.id;
  }

  /**
   * @param {object} opts
   * @param {boolean} [opts.includeArchived]
   * @param {Record<string, unknown>} [opts.filters]
   * @param {number} [opts.page]
   * @param {number} [opts.pageSize]
   * @param {(a: T, b: T) => number} [opts.sort]
   */
  function list(opts = {}) {
    const {
      includeArchived = false,
      filters = {},
      page = 1,
      pageSize = 0,
      sort,
    } = opts;

    let rows = getAll().filter((r) => (includeArchived ? !!r.deletedAt : !r.deletedAt));

    const q = String(filters.q || '').toLowerCase().trim();
    if (q) {
      rows = rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
    }
    if (filters.status && filters.status !== 'Tous') {
      rows = rows.filter((r) => (r.s || r.status || r.statut) === filters.status);
    }
    if (filters.priority && filters.priority !== 'Tous') {
      rows = rows.filter((r) => (r.priority || r.g || r.prio) === filters.priority);
    }
    if (filters.responsible && filters.responsible !== 'Tous') {
      rows = rows.filter((r) => (r.r || r.resp || r.responsable) === filters.responsible);
    }
    if (filters.dateFrom || filters.dateTo) {
      rows = rows.filter((r) => dateInRange(r.d || r.date, filters.dateFrom, filters.dateTo));
    }
    if (typeof filters.custom === 'function') {
      rows = rows.filter(filters.custom);
    }

    if (sort) rows = [...rows].sort(sort);

    const total = rows.length;
    if (pageSize > 0) {
      const start = (Math.max(1, page) - 1) * pageSize;
      rows = rows.slice(start, start + pageSize);
    }

    return { items: rows, total, page, pageSize };
  }

  function getById(id) {
    return getAll().find((r) => resolveId(r) === id) || null;
  }

  function create(row) {
    const items = getAll();
    const entry = {
      ...row,
      deletedAt: null,
      createdAt: row.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    items.push(entry);
    persist(items);
    return entry;
  }

  function update(id, patch) {
    const items = getAll();
    const idx = items.findIndex((r) => resolveId(r) === id);
    if (idx < 0) return null;
    items[idx] = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
    persist(items);
    return items[idx];
  }

  function archive(id) {
    return update(id, { deletedAt: new Date().toISOString() });
  }

  function restore(id) {
    return update(id, { deletedAt: null });
  }

  function hardDelete(id) {
    const items = getAll().filter((r) => resolveId(r) !== id);
    persist(items);
  }

  return {
    hydrate,
    getAll,
    list,
    getById,
    create,
    update,
    archive,
    restore,
    hardDelete,
    persist,
    idField,
  };
}
