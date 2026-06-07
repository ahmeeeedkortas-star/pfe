/**
 * Alias d’IDs de pages qhse_v11.html → plateforme modulaire actuelle.
 * Utilisé par le router avant tout rendu / navigation.
 */

/** @type {Record<string, string>} */
export const PAGE_ALIASES = {
  /* Documentation (v11 natif) */
  'doc-dash': 'doc-tb',
  'doc-liste': 'doc-biblio',
  'doc-new': 'doc-create',
  'doc-validation': 'doc-biblio',
  'doc-workflow': 'doc-biblio',
  'doc-valid': 'doc-biblio',
  'doc-publish': 'doc-biblio',
  'doc-recherche': 'doc-history',
  'doc-terrain': 'doc-biblio',
  'doc-qr': 'doc-biblio',
  'doc-acces': 'doc-biblio',
  'doc-admin': 'doc-tb',

  /* 5S */
  '5s-planning': '5s-audit',
  'fives-planning': '5s-audit',
  '5s-checklists': '5s-checklist',
  '5s-resultats': '5s-tb',
  '5s-kpi': '5s-tb',
  '5s-suivi': '5s-actions',
  'fives-kpi': '5s-tb',

  /* Environnement */
  'env-kpi': 'env-dash',

  /* Contexte & Stratégie */
  'cst-contexte': 'cst-swot',
  'cst-perimetre': 'cst-swot',
  'cst-changements': 'cst-tb',
  'cst-docs': 'cst-tb',
  'cst-doc-read': 'cst-tb',
  'cst-history': 'cst-tb',

  /* Audit */
  'audit-plan': 'audit-planning',
  'audit-check': 'audit-checklist',
  'audit-rapport': 'audit-tb',
  'audit-cloture': 'audit-tb',
  'audit-kpi': 'audit-tb',

  /* EPI → checklists SST intégrées */
  'epi-tb': 'sec-cl-epi',
  'epi-employes': 'sec-cl-epi',
  'epi-affect': 'sec-cl-epi',
  'epi-ctrl': 'sec-epi-controles',
  'epi-renouv': 'sec-epi-renouv',
  'epi-nc': 'sec-epi-nc',
  'epi-kpi': 'sec-kpi',
  'epi-docs': 'doc-biblio',

  /* Raccourcis historiques */
  'sec-tb': 'sec-kpi',
  ind: 'env-dash',
  reunion: 'nc-qrqc',
  smi: 'doc-biblio',
  'sec-docs': 'doc-biblio',
  'audit-docs': 'audit-docs',
};

/**
 * @param {string} pageId
 * @returns {string}
 */
export function resolvePageAlias(pageId) {
  if (!pageId) return pageId;
  return PAGE_ALIASES[pageId] ?? pageId;
}

/** Pages par module (défaut) pour goModule */
export const MODULE_DEFAULT_PAGE = {
  accueil: 'accueil',
  rc: 'rc-liste',
  nc: 'nc-liste',
  cst: 'cst-politique',
  audit: 'audit-tb',
  doc: 'doc-tb',
  fives: '5s-tb',
  sec: 'sec-kpi',
  env: 'env-dash',
};
