/**
 * Registre de pages avec chargement lazy par module QHSE.
 */
import { renderRcListe } from '../pages/rc/rc-liste.page.js';
import { renderRcNew, bindRcNew } from '../pages/rc/rc-new.page.js';
import { renderRcActions, bindRcActions } from '../pages/rc/rc-actions.page.js';
import { renderNcListe } from '../pages/nc/nc-liste.page.js';
import { renderNcNew, bindNcNew } from '../pages/nc/nc-new.page.js';
import { renderNcKpi, bindNcKpi } from '../pages/nc/nc-kpi.page.js';
import { renderNcQrqcRapport, bindNcQrqcRapport } from '../pages/nc/nc-qrqc-rapport.page.js';
import { renderNcActions, bindNcActions } from '../pages/nc/nc-actions.page.js';
import { renderRcKpi, bindRcKpi } from '../pages/rc/rc-kpi.page.js';
import { renderSecChecklist } from '../pages/sec/sec-checklist.page.js';
import {
  bindChecklistInstancesList,
  renderChecklistInstancesList,
} from '../pages/sec/sec-checklist-instances.page.js';
import { bindSecChecklistRegistre, renderSecChecklistRegistre } from '../pages/sec/sec-checklist-registre.page.js';
import { SEC_CHECKLIST_CONFIGS, SEC_CHECKLIST_PAGES } from '../data/sec-checklist-configs.js';
import { renderSecUrgence } from '../pages/sec/sec-urgence.page.js';
import {
  ensureDocV11Data,
  renderDocV11Biblio,
  renderDocV11Read,
  renderDocV11Edit,
  renderDocV11Create,
  renderDocV11History,
} from '../pages/doc/doc-v11.page.js';
import { renderSecKpi } from '../pages/sec/sec-kpi.page.js';
import { renderSecChecklistsList } from '../pages/sec/sec-checklists-list.page.js';
import { renderSecRisques } from '../pages/sec/sec-risques.page.js';
import { renderSecAccidents } from '../pages/sec/sec-accidents.page.js';
import { renderEnvAspects } from '../pages/env/env-aspects.page.js';
import { renderEnvDash } from '../pages/env/env-dash.page.js';
import { renderEnvDechets } from '../pages/env/env-dechets.page.js';
import { renderEnvConso } from '../pages/env/env-conso.page.js';
import { renderEnvObjectifs } from '../pages/env/env-objectifs.page.js';
import { renderEnvIncidents } from '../pages/env/env-incidents.page.js';
import { renderSettingsPage } from '../pages/settings/settings.page.js';
import {
  ensureAuditV11Data,
  renderAuditV11Dashboard,
  renderAuditV11Planning,
  renderAuditV11Liste,
  renderAuditV11Checklist,
  renderAuditV11Constats,
  renderAuditV11Actions,
  renderAuditV11Docs,
  renderAuditV11Auditeurs,
  renderAuditV11Config,
} from '../pages/audit/audit-v11.page.js';
import { renderCstTb } from '../pages/cst/cst-tb.page.js';
import { renderCstSwot } from '../pages/cst/cst-swot.page.js';
import { renderCstPestel } from '../pages/cst/cst-pestel.page.js';
import { renderCstParties } from '../pages/cst/cst-parties.page.js';
import { renderCstRisques } from '../pages/cst/cst-risques.page.js';
import { renderCstObjectifs } from '../pages/cst/cst-objectifs.page.js';
import { renderCstChangements } from '../pages/cst/cst-changements.page.js';
import { renderCstRevue } from '../pages/cst/cst-revue.page.js';
import { renderCstPolitique } from '../pages/cst/cst-politique.page.js';
import { renderCstActions } from '../pages/cst/cst-actions.page.js';
import {
  ensureFivesV11Data,
  renderFivesV11Dashboard,
  renderFivesV11Planning,
  renderFivesV11Audit,
  renderFivesV11Checklist,
  renderFivesV11Ecarts,
  renderFivesV11Actions,
  renderFivesV11Zones,
  renderFivesV11Responsables,
  renderFivesV11Rapports,
  renderFivesV11Exports,
} from '../pages/fives/fives-v11.page.js';
const SEC_CL_SINGLE_PAGES = Object.entries(SEC_CHECKLIST_PAGES)
  .filter(([id, key]) => {
    if (key === '__custom__' || key === '__instance__' || key === '__registre__') return false;
    if (String(key).startsWith('__equip_')) return false;
    return !SEC_CHECKLIST_CONFIGS[key]?.multiInstance;
  })
  .map(([id]) => id);

/** Pages réécrites en modules propres (priorité sur legacy). */
export const MODERN_PAGES = {
  'rc-liste': () => renderRcListe(),
  'rc-new': () => {
    bindRcNew();
    return renderRcNew();
  },
  'rc-actions': () => {
    bindRcActions();
    return renderRcActions();
  },
  'nc-liste': () => renderNcListe(),
  'nc-new': () => {
    bindNcNew();
    return renderNcNew();
  },
  'nc-kpi': () => {
    bindNcKpi();
    return renderNcKpi();
  },
  'nc-actions': () => {
    bindNcActions();
    return renderNcActions();
  },
  'nc-rapport': () => {
    bindNcQrqcRapport();
    return renderNcQrqcRapport();
  },
  'rc-kpi': () => {
    bindRcKpi();
    return renderRcKpi();
  },
  'rc-rapport': () => {
    window.rcKpiTab = 'dashboard';
    bindRcKpi();
    return renderRcKpi();
  },
  'nc-cloture': () => {
    window.ncKpiTab = 'dashboard';
    bindNcKpi();
    return renderNcKpi();
  },
  'rc-cloture': () => {
    window.rcKpiTab = 'dashboard';
    bindRcKpi();
    return renderRcKpi();
  },
  ...Object.fromEntries(SEC_CL_SINGLE_PAGES.map((id) => [id, () => renderSecChecklist(id)])),
  'sec-cl-ext': () => renderSecChecklist('sec-cl-ext'),
  'sec-cl-phar': () => renderSecChecklist('sec-cl-phar'),
  'sec-cl-veh': () => renderSecChecklist('sec-cl-veh'),
  'sec-cl-sst': () => renderSecChecklist('sec-cl-sst'),
  'sec-cl-ext-equip': () => {
    bindChecklistInstancesList();
    return renderChecklistInstancesList('sec-cl-ext');
  },
  'sec-cl-phar-equip': () => {
    bindChecklistInstancesList();
    return renderChecklistInstancesList('sec-cl-phar');
  },
  'sec-cl-veh-equip': () => {
    bindChecklistInstancesList();
    return renderChecklistInstancesList('sec-cl-veh');
  },
  'sec-cl-sst-equip': () => {
    bindChecklistInstancesList();
    return renderChecklistInstancesList('sec-cl-sst');
  },
  'sec-cl-registre': () => {
    bindSecChecklistRegistre();
    return renderSecChecklistRegistre();
  },
  'sec-cl-instance': () => renderSecChecklist('sec-cl-instance'),
  'sec-cl-custom': () => renderSecChecklist('sec-cl-custom'),
  'sec-kpi': () => renderSecKpi(),
  'sec-tb': () => renderSecKpi(),
  'sec-checklists': () => renderSecChecklistsList(),
  'sec-urgence': () => renderSecUrgence(),
  'doc': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-tb': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-biblio': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-read': () => renderDocV11Read(),
  'doc-edit': () => renderDocV11Edit(),
  'doc-create': () => renderDocV11Create(),
  'doc-workflow': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-valid': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-publish': () => {
    ensureDocV11Data();
    return renderDocV11Biblio();
  },
  'doc-history': () => renderDocV11History(),
  'doc-kpi': () => renderDocV11Biblio(),
  'sec-docs': () => renderSecDocs(),
  'sec-risques': () => renderSecRisques(),
  'sec-accidents': () => renderSecAccidents(),
  'sec-epi': () => renderSecChecklist('sec-cl-epi'),
  'sec-epi-sans': () => renderSecChecklist('sec-cl-epi'),
  'sec-epi-controles': () => renderSecChecklist('sec-cl-epi'),
  'sec-epi-nc': () => renderSecChecklist('sec-cl-epi'),
  'sec-epi-renouv': () => renderSecChecklist('sec-cl-epi'),
  'sec-epi-historique': () => renderSecChecklist('sec-cl-epi'),
  'env-dash': () => renderEnvDash(),
  'env-kpi': () => renderEnvDash(),
  'env-aspects': () => renderEnvAspects(),
  'env-dechets': () => renderEnvDechets(),
  'env-conso': () => renderEnvConso(),
  'env-objectifs': () => renderEnvObjectifs(),
  'env-incidents': () => renderEnvIncidents(),
  'audit': () => {
    ensureAuditV11Data();
    return renderAuditV11Dashboard();
  },
  'audit-tb': () => renderAuditV11Dashboard(),
  'audit-planning': () => renderAuditV11Planning(),
  'audit-liste': () => renderAuditV11Liste(),
  'audit-checklist': () => renderAuditV11Checklist(),
  'audit-constats': () => renderAuditV11Constats(),
  'audit-actions': () => renderAuditV11Actions(),
  'audit-docs': () => renderAuditV11Docs(),
  'audit-auditeurs': () => renderAuditV11Auditeurs(),
  'audit-config': () => renderAuditV11Config(),
  'cst-tb': () => renderCstTb(),
  'cst-swot': () => renderCstSwot(),
  'cst-pestel': () => renderCstPestel(),
  'cst-parties': () => renderCstParties(),
  'cst-risques': () => renderCstRisques(),
  'cst-objectifs': () => renderCstObjectifs(),
  'cst-changements': () => renderCstChangements(),
  'cst-revue': () => renderCstRevue(),
  'cst-politique': () => renderCstPolitique(),
  'cst-actions': () => renderCstActions(),
  'cst-docs': () => renderCstTb(),
  'cst-doc-read': () => renderCstTb(),
  'cst-history': () => renderCstTb(),
  'cst-perimetre': () => renderCstSwot(),
  'cst-contexte': () => renderCstSwot(),
  '5s': () => {
    ensureFivesV11Data();
    return renderFivesV11Dashboard();
  },
  '5s-tb': () => renderFivesV11Dashboard(),
  '5s-planning': () => renderFivesV11Planning(),
  '5s-audit': () => renderFivesV11Audit(),
  '5s-checklist': () => renderFivesV11Checklist(),
  '5s-kpi': () => renderFivesV11Dashboard(),
  '5s-ecarts': () => renderFivesV11Ecarts(),
  '5s-actions': () => renderFivesV11Actions(),
  '5s-suivi': () => renderFivesV11Actions(),
  '5s-zones': () => renderFivesV11Zones(),
  '5s-responsables': () => renderFivesV11Responsables(),
  '5s-rapports': () => renderFivesV11Rapports(),
  '5s-exports': () => renderFivesV11Exports(),
  'fives-kpi': () => renderFivesV11Dashboard(),
  'fives-liste': () => renderFivesV11Audit(),
  'fives-audit': () => renderFivesV11Audit(),
  'fives-checklist': () => renderFivesV11Checklist(),
  'fives-planning': () => renderFivesV11Planning(),
  'fives-actions': () => renderFivesV11Actions(),
  'fives-fiche': () => renderFivesV11Dashboard(),
  'env-5s': () => renderFivesV11Dashboard(),
  settings: () => renderSettingsPage(),
};

const MODULE_LOADERS = {
  accueil: () => import('../legacy/pages/home.pages.js'),
  rc: () => import('../legacy/pages/rc.pages.js'),
  nc: () => import('../legacy/pages/nc.pages.js'),
  env: () => import('../legacy/pages/env.pages.js'),
  sec: () => import('../legacy/pages/sec.pages.js'),
};

const loaded = new Set();

export function getModuleId(pageId) {
  if (pageId === 'accueil') return 'accueil';
  if (pageId.startsWith('sec-cl-')) return 'sec';
  if (pageId === 'reunion' || pageId === 'smi' || pageId === 'ind') return 'env';
  if (pageId === 'env') return 'env';
  const prefix = pageId.split('-')[0];
  if (MODULE_LOADERS[prefix]) return prefix;
  return null;
}

export async function ensureModule(moduleId) {
  if (!moduleId || loaded.has(moduleId)) return;
  const load = MODULE_LOADERS[moduleId];
  if (!load) return;
  const mod = await load();
  Object.assign(window.PAGES, mod.default);
  loaded.add(moduleId);
}

export async function renderPage(pageId) {
  if (!window.PAGES) window.PAGES = {};

  if (MODERN_PAGES[pageId]) {
    return MODERN_PAGES[pageId]();
  }

  const moduleId = getModuleId(pageId);
  await ensureModule(moduleId);

  const fn = window.PAGES[pageId];
  if (typeof fn === 'function') return fn();
  return null;
}

/** Précharge un module (ex. au survol sidebar). */
export function preloadModule(moduleId) {
  ensureModule(moduleId).catch(() => {});
}
