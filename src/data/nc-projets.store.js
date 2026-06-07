/**
 * Base projets NC — localStorage + fusion avec les NC existantes.
 */
import { getNcData } from './nc.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

const STORAGE_KEY = 'xm_nc_projets';

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
  window.dispatchEvent(new CustomEvent('nc-projets-updated'));
}

function projetsFromNcData() {
  return [...new Set(getNcData().map((r) => r.p).filter(Boolean))];
}

export function getNcProjets() {
  const saved = read();
  const base = canAutoSeed() ? DEFAULT_PROJETS : [];
  const merged = new Set([...base, ...projetsFromNcData(), ...(saved || [])]);
  return [...merged].sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
}

export function addNcProjet(code) {
  const trimmed = String(code || '').trim();
  if (!trimmed) return { ok: false, error: 'Code vide' };

  const list = getNcProjets();
  const exists = list.some((p) => p.toLowerCase() === trimmed.toLowerCase());
  if (exists) return { ok: true, name: list.find((p) => p.toLowerCase() === trimmed.toLowerCase()) };

  const saved = read() || [];
  saved.push(trimmed);
  write(saved);
  return { ok: true, name: trimmed };
}
