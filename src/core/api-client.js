/**
 * Client API optionnel — synchronise avec le backend Express (npm run server).
 * Sans serveur : l'app continue avec localStorage uniquement.
 */
const API_BASE = '/api';

export async function apiHealth() {
  try {
    const r = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    return r.ok;
  } catch {
    return false;
  }
}

export async function apiList(collection, query = {}) {
  const qs = new URLSearchParams(query).toString();
  const r = await fetch(`${API_BASE}/${collection}${qs ? `?${qs}` : ''}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function apiCreate(collection, body) {
  const r = await fetch(`${API_BASE}/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function syncNcToServer() {
  if (!(await apiHealth())) return false;
  const { listNc } = await import('../data/nc-repository.js');
  const items = listNc({ includeArchived: true, pageSize: 0 }).items;
  for (const row of items) {
    try {
      await apiCreate('nc', row);
    } catch {
      /* doublon ou erreur — ignorer en démo */
    }
  }
  return true;
}
