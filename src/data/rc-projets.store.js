/**
 * Base projets RC — localStorage + fusion avec les RC existantes.
 */
import { getRcData } from './rc.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

const STORAGE_KEY = 'xm_rc_projets';

const DEFAULT_PROJETS = ['M076', 'M077', 'M078', 'M079', 'M080', 'M081', 'M085', 'M090', 'P002'];

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
  window.dispatchEvent(new CustomEvent('rc-projets-updated'));
}

function projetsFromRcData() {
  return [...new Set(getRcData().map((r) => r.p).filter(Boolean))];
}

/** Liste triée des projets */
export function getRcProjets() {
  const saved = read();
  const base = canAutoSeed() ? DEFAULT_PROJETS : [];
  const merged = new Set([...base, ...projetsFromRcData(), ...(saved || [])]);
  return [...merged].sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
}

/** Ajoute un projet */
export function addRcProjet(code) {
  const trimmed = String(code || '').trim();
  if (!trimmed) return { ok: false, error: 'Code vide' };

  const list = getRcProjets();
  const exists = list.some((p) => p.toLowerCase() === trimmed.toLowerCase());
  if (exists) return { ok: true, name: list.find((p) => p.toLowerCase() === trimmed.toLowerCase()) };

  const saved = read() || [];
  saved.push(trimmed);
  write(saved);
  return { ok: true, name: trimmed };
}
