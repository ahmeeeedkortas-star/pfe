export { NC_DATA } from './nc.seed.js';
import { NC_DATA } from './nc.seed.js';
import { initNcRepository, listNc } from './nc-repository.js';

export function getNcData() {
  if (typeof window === 'undefined') return NC_DATA;
  initNcRepository();
  return listNc({ includeArchived: false, pageSize: 0 }).items;
}

export function nextNcNumber(data = getNcData()) {
  const nums = data
    .map((r) => parseInt(String(r.n).replace(/^NC-?/i, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `NC-${String(next).padStart(3, '0')}`;
}

export function formatNcDate(date = new Date()) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
