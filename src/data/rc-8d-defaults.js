/**
 * Champs 8D par réclamation RC.
 */

export function createRc8dDefaults(overrides = {}) {
  return {
    d2What: '',
    d2Where: '',
    d2When: '',
    d2Who: '',
    d2Qty: '',
    d3Actions: [],
    d4CauseMain: '',
    d4Causes5P: [],
    d5Actions: [],
    d7Actions: [],
    emailClient: '',
    broadcastFrom: '',
    broadcastSent: false,
    broadcastDate: '',
    ...overrides,
  };
}

/** @param {Record<string, unknown>} rc */
export function ensureRc8dFields(rc) {
  if (!rc) return rc;
  const defaults = createRc8dDefaults();
  Object.keys(defaults).forEach((k) => {
    if (rc[k] === undefined) rc[k] = defaults[k];
  });
  if (!rc.d2What && rc.obj) rc.d2What = String(rc.obj);
  if (!Array.isArray(rc.d3Actions)) rc.d3Actions = [];
  if (!Array.isArray(rc.d4Causes5P)) rc.d4Causes5P = [];
  if (!Array.isArray(rc.d5Actions)) rc.d5Actions = [];
  if (!Array.isArray(rc.d7Actions)) rc.d7Actions = [];
  return rc;
}

export function getRcRef() {
  const data = window.RC_DATA || [];
  return window.STATE?.currentRC || data[0]?.n || null;
}

export function findRcRecord(ref) {
  const r = ref || getRcRef();
  if (!r) return null;
  const rc = (window.RC_DATA || []).find((x) => x.n === r);
  return rc ? ensureRc8dFields(rc) : null;
}
