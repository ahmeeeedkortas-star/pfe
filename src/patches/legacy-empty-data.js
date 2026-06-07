/**
 * Après chargement de legacy/core.js — retire les jeux de données démo
 * (RC_DATA, NC_DATA, actions, notifications) en mode plateforme vide.
 */
import { isEmptyPlatform } from '../core/empty-platform.js';

const LEGACY_LIST_KEYS = [
  'RC_DATA',
  'NC_DATA',
  'RC_ACTIONS',
  'NC_ACTIONS',
  'SEC_ACTIONS',
  'NOTIFICATIONS',
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

/** Vide les tableaux démo injectés par legacy/core.js et notifications.js. */
export function stripLegacyDemoData() {
  if (!isEmptyPlatform() || typeof window === 'undefined') return;

  window.RC_DATA = [];
  window.NC_DATA = [];
  window.RC_ACTIONS = [];
  window.NC_ACTIONS = [];
  window.SEC_ACTIONS = [];
  window.NOTIFICATIONS = [];
  window.CL_DATA = window.CL_DATA || {};
  window.FIVES_STORE = { template: [], audits: [], actions: [] };

  for (const k of LEGACY_LIST_KEYS) {
    if (k === 'RC_DATA' || k === 'NC_DATA') continue;
    if (k.startsWith('CST_') && k !== 'CST_SWOT') {
      window[k] = [];
    } else if (window[k] != null && Array.isArray(window[k])) {
      window[k] = [];
    }
  }
  if (!window.CST_SWOT) {
    window.CST_SWOT = { forces: [], faiblesses: [], opportunites: [], menaces: [] };
  } else {
    window.CST_SWOT = { forces: [], faiblesses: [], opportunites: [], menaces: [] };
  }
  window.CST_POLITIQUE = null;
}
