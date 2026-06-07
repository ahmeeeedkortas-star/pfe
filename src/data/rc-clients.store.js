/**
 * Base clients RC — localStorage + fusion avec les RC existantes.
 */
import { getRcData } from './rc.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

const STORAGE_KEY = 'xm_rc_clients';

const DEFAULT_CLIENTS = ['Client A', 'Client B', 'Client C', 'Client D', 'Airbus', 'Safran'];

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('rc-clients-updated'));
}

function clientsFromRcData() {
  return [...new Set(getRcData().map((r) => r.cl).filter(Boolean))];
}

/** Liste triée des clients */
export function getRcClients() {
  const saved = read();
  const base = canAutoSeed() ? DEFAULT_CLIENTS : [];
  const merged = new Set([...base, ...clientsFromRcData(), ...(saved || [])]);
  return [...merged].sort((a, b) => a.localeCompare(b, 'fr'));
}

/** Ajoute un client (ignore doublons insensibles à la casse) */
export function addRcClient(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return { ok: false, error: 'Nom vide' };

  const list = getRcClients();
  const exists = list.some((c) => c.toLowerCase() === trimmed.toLowerCase());
  if (exists) return { ok: true, name: list.find((c) => c.toLowerCase() === trimmed.toLowerCase()) };

  const saved = read() || [];
  saved.push(trimmed);
  write(saved);
  return { ok: true, name: trimmed };
}
