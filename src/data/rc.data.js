/**
 * Données Réclamations Clients — source unique partagée avec le legacy.
 */
export { RC_DATA } from './rc.seed.js';
import { RC_DATA } from './rc.seed.js';
import { initRcRepository, listRc } from './rc-repository.js';

export function getRcData() {
  if (typeof window === 'undefined') return RC_DATA;
  initRcRepository();
  return listRc({ includeArchived: false, pageSize: 0 }).items;
}

export function syncRcDataToWindow() {
  if (typeof window === 'undefined') return;
  initRcRepository();
  if (!window.RC_DATA?.length) {
    window.RC_DATA = getRcData();
  }
}

export function nextRcNumber(data = getRcData()) {
  const nums = data
    .map((r) => parseInt(String(r.n).replace(/^RC-?/i, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `RC-${String(next).padStart(3, '0')}`;
}

export function formatRcDate(date = new Date()) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
