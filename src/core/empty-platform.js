/**
 * Mode plateforme vide — pas de données démo / seed automatique.
 * Activation : VITE_EMPTY_DATA=true, ?empty=1, ou localStorage xm_empty_platform=1
 */

export const EMPTY_FLAG_KEY = 'xm_empty_platform';
const DEMO_PURGED_KEY = 'xm_demo_purged';

/** Clés localStorage gérées par la plateforme (hors flag vide). */
export const PLATFORM_STORAGE_KEYS = [
  'xm_nc_entities',
  'xm_rc_entities',
  'xm_cl_data',
  'xm_fives_data',
  'xm_nc_projets',
  'xm_nc_project_meta',
  'xm_rc_trimestre_meta',
  'xm_rc_projets',
  'xm_sec_epi_employees',
  'xm_sec_epi_nc',
  'xm_sec_epi_controles',
  'xm_rc_clients',
  'xm_nc_attachments',
];

export function isEmptyPlatform() {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMPTY_DATA === 'false') {
      return false;
    }
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMPTY_DATA === 'true') {
      return true;
    }
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem(EMPTY_FLAG_KEY) === '1') return true;
      if (localStorage.getItem(EMPTY_FLAG_KEY) === '0') return false;
    }
    if (typeof location !== 'undefined') {
      const q = new URLSearchParams(location.search);
      if (q.get('empty') === '1' || q.get('empty') === 'true') return true;
      if (q.get('demo') === '1') return false;
    }
    /* Par défaut : aucune donnée démo (sauf ?demo=1 ou VITE_EMPTY_DATA=false) */
    return true;
  } catch {
    return true;
  }
}

export function canAutoSeed() {
  return !isEmptyPlatform();
}

export function clearPlatformStorage() {
  if (typeof localStorage === 'undefined') return;
  for (const key of PLATFORM_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k?.startsWith('xm_wizard_draft_')) sessionStorage.removeItem(k);
    }
  } catch {
    /* ignore */
  }
}

/** Initialise les globals window à [] pour bloquer les seeds legacy (if (!window.X)). */
export function initEmptyWindowGlobals() {
  if (typeof window === 'undefined') return;

  window.RC_DATA = window.RC_DATA || [];
  window.NC_DATA = window.NC_DATA || [];
  window.CL_DATA = window.CL_DATA || {};
  window.FIVES_STORE = window.FIVES_STORE || { template: [], audits: [], actions: [] };

  const listKeys = [
    'AUDITS_DATA',
    'ENV_ASPECTS_DATA',
    'ENV_DECHETS_DATA',
    'ENV_CHIMIQUES_DATA',
    'ENV_5S_DATA',
    'ENV_URGENCES_DATA',
    'ENV_ACTIONS',
    'SENS_DATA',
    'sst_risks',
    'acc_data',
    'SEC_ACTIONS',
    'SST_DOCS',
    'AUDIT_DOCS',
    'URG_PLANS',
    'nc_qrqc_acts',
    'CST_PESTEL',
    'CST_PARTIES',
    'CST_RISQUES',
    'CST_OBJECTIFS',
    'CST_CHANGEMENTS',
    'CST_REVUES',
    'CST_ACTIONS',
    'CST_DOCS',
  ];
  for (const k of listKeys) {
    if (window[k] == null) window[k] = [];
  }
  if (window.CST_SWOT == null) {
    window.CST_SWOT = { forces: [], faiblesses: [], opportunites: [], menaces: [] };
  }
}

/**
 * Au démarrage : active le flag, vide le stockage si demandé par URL ou env.
 */
export function bootstrapEmptyPlatform() {
  if (typeof window === 'undefined') return;

  const urlEmpty =
    typeof location !== 'undefined' &&
    (new URLSearchParams(location.search).get('empty') === '1' ||
      new URLSearchParams(location.search).get('empty') === 'true');

  const envEmpty =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMPTY_DATA === 'true';

  if (envEmpty) {
    try {
      localStorage.setItem(EMPTY_FLAG_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  if (urlEmpty) {
    try {
      localStorage.setItem(EMPTY_FLAG_KEY, '1');
    } catch {
      /* ignore */
    }
    clearPlatformStorage();
    if (typeof history !== 'undefined' && typeof location !== 'undefined') {
      const url = new URL(location.href);
      url.searchParams.delete('empty');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  if (isEmptyPlatform()) {
    try {
      localStorage.setItem(EMPTY_FLAG_KEY, '1');
    } catch {
      /* ignore */
    }
    /* Purge unique des anciennes données démo (ne efface pas vos saisies ultérieures) */
    if (urlEmpty || envEmpty) {
      clearPlatformStorage();
      try {
        localStorage.setItem(DEMO_PURGED_KEY, '1');
      } catch {
        /* ignore */
      }
    } else {
      try {
        if (localStorage.getItem(DEMO_PURGED_KEY) !== '1') {
          clearPlatformStorage();
          localStorage.setItem(DEMO_PURGED_KEY, '1');
        }
      } catch {
        /* ignore */
      }
    }
    initEmptyWindowGlobals();
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('xm-empty-platform', 'xm-no-heavy-motion');
    }
  } else if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('xm-empty-platform', 'xm-no-heavy-motion');
  }
}

/** Réactive les données démo (dev). */
export function enableQhseDemoData() {
  try {
    localStorage.setItem(EMPTY_FLAG_KEY, '0');
    localStorage.removeItem(DEMO_PURGED_KEY);
  } catch {
    /* ignore */
  }
  if (typeof location !== 'undefined') location.reload();
}

/** Réinitialise toutes les données et recharge (console ou devtools). */
export function resetPlatformToEmpty() {
  try {
    localStorage.setItem(EMPTY_FLAG_KEY, '1');
  } catch {
    /* ignore */
  }
  clearPlatformStorage();
  if (typeof location !== 'undefined') location.reload();
}

if (typeof window !== 'undefined') {
  window.resetQhseToEmpty = resetPlatformToEmpty;
  window.isQhseEmptyPlatform = isEmptyPlatform;
  window.enableQhseDemoData = enableQhseDemoData;
}
