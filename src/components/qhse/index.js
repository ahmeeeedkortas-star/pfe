/**
 * Helpers QHSE — exposés sur window pour compatibilité legacy / v5.
 */
import {
  render5Pourquoi,
  render5M,
  getWhyChain,
  get5MSummary,
} from './analysis-5p-5m.js';
import { renderCauseSelector } from './cause-selector.js';
import { renderActionsEditor, bindWorkflowActions, bindWorkflowInputs } from './actions-editor.js';
import { installChecklistHelpers } from './dynamic-checklist.js';
import { canAutoSeed } from '../../core/empty-platform.js';

export function installQhseHelpers() {
  Object.assign(window, {
    render5Pourquoi,
    render5M,
    getWhyChain,
    get5MSummary,
    renderCauseSelector,
    renderActionsEditor,
  });
  bindWorkflowActions();
  bindWorkflowInputs();
  installChecklistHelpers();
  seedNcQrqcActs();
}

function seedNcQrqcActs() {
  if (!canAutoSeed()) {
    if (!window.nc_qrqc_acts) window.nc_qrqc_acts = [];
    return;
  }
  if (window.nc_qrqc_acts?.length) return;
  window.nc_qrqc_acts = [
    { id: 1, action: 'Arrêt machine CN01', type: 'Immédiate', resp: 'A. Ali', delai: '02/05/2026', statut: 'À faire' },
    { id: 2, action: 'Remplacement outil usé', type: 'Corrective', resp: 'M. Karim', delai: '03/05/2026', statut: 'À faire' },
    { id: 3, action: 'MAJ procédure contrôle dimensionnel', type: 'Préventive', resp: 'S. Yassine', delai: '05/05/2026', statut: 'À faire' },
  ];
}

export {
  render5Pourquoi,
  render5M,
  getWhyChain,
  get5MSummary,
  renderCauseSelector,
  renderActionsEditor,
};
