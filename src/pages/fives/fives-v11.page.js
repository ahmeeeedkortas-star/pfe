import { ensureFivesV11SeedData } from './fives-v11-data.js';
import { installFivesV11CrudFromV11 } from './fives-v11-crud.js';
import { enhanceFivesV11Crud } from './fives-enhance-crud.js';
import { loadFivesV11, persistFivesV11 } from './fives-persist.js';
import { installFivesReports } from './fives-reports.js';
import { installFivesFeatures, enhanceFivesTbHtml } from './fives-features.js';
import { renderFivesChecklistPage } from './fives-checklist.page.js';
import { bindFivesChecklistPage, installFivesChecklistGlobals } from './fives-checklist-bind.js';
import { renderFivesRapportsPage, installFivesRapportsGlobals } from './fives-rapports.page.js';
import { renderFivesAuditsPage } from './fives-audits.page.js';
import { bindFivesAuditsPage, installFivesAuditsGlobals } from './fives-audits-bind.js';
import { renderFivesActionsPage } from './fives-actions.page.js';
import { bindFivesActionsPage, installFivesActionsGlobals } from './fives-actions-bind.js';
import {
  v11_5s_tb,
  v11_5s_ecarts,
  v11_5s_zones,
  v11_5s_responsables,
  v11_5s_exports,
} from '../../modules-v11/generated/index.js';

export function ensureFivesV11Data() {
  if (!loadFivesV11()) {
    ensureFivesV11SeedData();
    persistFivesV11();
  }
}

export function installFivesV11Crud() {
  ensureFivesV11Data();
  installFivesV11CrudFromV11();
  enhanceFivesV11Crud();
  installFivesReports();
  installFivesFeatures();
  installFivesChecklistGlobals();
  installFivesRapportsGlobals();
  installFivesAuditsGlobals();
  installFivesActionsGlobals();
}

function wrap(fn, enhancer) {
  return () => {
    ensureFivesV11Data();
    let html = fn();
    if (enhancer) html = enhancer(html);
    return html;
  };
}

export const renderFivesV11Dashboard = wrap(v11_5s_tb, enhanceFivesTbHtml);
export const renderFivesV11Planning = () => {
  ensureFivesV11Data();
  return renderFivesAuditsPage();
};
export const renderFivesV11Audit = () => {
  ensureFivesV11Data();
  return renderFivesAuditsPage();
};
export const renderFivesV11Ecarts = wrap(v11_5s_ecarts);
export const renderFivesV11Actions = () => {
  ensureFivesV11Data();
  return renderFivesActionsPage();
};
export const renderFivesV11Zones = wrap(v11_5s_zones);
export const renderFivesV11Responsables = wrap(v11_5s_responsables);
export const renderFivesV11Exports = wrap(v11_5s_exports);

export function renderFivesV11Checklist() {
  ensureFivesV11Data();
  return renderFivesChecklistPage();
}

export function renderFivesV11Rapports() {
  ensureFivesV11Data();
  if (!window.ss5ReportSel) {
    const first = (window.SS5_AUDITS || []).find((a) => a.statut === 'Réalisé' && a.score != null);
    if (first) window.ss5ReportSel = first.id;
  }
  return renderFivesRapportsPage();
}

export function bindFivesPageAfterRender(pageId) {
  if (pageId === '5s-checklist') bindFivesChecklistPage();
  if (pageId === '5s-audit' || pageId === '5s-planning') bindFivesAuditsPage();
  if (pageId === '5s-actions') bindFivesActionsPage();
}

export function renderFivesV11Kpi() {
  ensureFivesV11Data();
  return enhanceFivesTbHtml(v11_5s_tb());
}

export function renderFivesV11Suivi() {
  ensureFivesV11Data();
  return renderFivesActionsPage();
}
