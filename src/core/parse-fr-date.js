/**
 * Parse / compare dates jj/mm/aaaa.
 */
export function parseFrDate(s) {
  const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatFrDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/** @param {string} dateStr jj/mm/aaaa @param {string} from @param {string} to */
export function dateInRange(dateStr, from, to) {
  const d = parseFrDate(dateStr);
  if (!d) return true;
  if (from) {
    const f = parseFrDate(from);
    if (f && d < f) return false;
  }
  if (to) {
    const t = parseFrDate(to);
    if (t && d > t) return false;
  }
  return true;
}
