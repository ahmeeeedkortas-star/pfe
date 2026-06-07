/**
 * Persistance données 5S (globals v11 SS5_*).
 */
const SS5_STORAGE_KEY = 'qhse_ss5_v11_v1';

const KEYS = [
  'SS5_ZONES',
  'SS5_AUDITS',
  'SS5_ECARTS',
  'SS5_ACTIONS',
  'SS5_RESPS',
  'SS5_CL_TEMPLATE',
  'SS5_CL_DATA',
  'SS5_CL_META',
  'SS5_KPI_HIST',
];

export function persistFivesV11() {
  try {
    const payload = {};
    KEYS.forEach((k) => {
      if (window[k] !== undefined) payload[k] = window[k];
    });
    localStorage.setItem(SS5_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota */
  }
}

export function loadFivesV11() {
  try {
    const raw = localStorage.getItem(SS5_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    KEYS.forEach((k) => {
      if (data[k] !== undefined) window[k] = data[k];
    });
    return true;
  } catch {
    return false;
  }
}
