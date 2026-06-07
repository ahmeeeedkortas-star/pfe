/**
 * Barre d’actions checklist 5S — boutons modernes avec icônes SVG.
 */
import { renderIcon } from '../../components/icons/icon-render.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function actionBtn(icon, label, variant = 'default', attrs = '') {
  return `<button type="button" class="ss5-cl-action ss5-cl-action--${variant}" ${attrs}>
    <span class="ss5-cl-action__ic">${renderIcon(icon, { size: 15 })}</span>
    <span class="ss5-cl-action__lb">${esc(label)}</span>
  </button>`;
}

function btnGroup(label, buttons) {
  return `<div class="ss5-cl-btn-group" role="group" aria-label="${esc(label)}">
    <span class="ss5-cl-btn-group-label">${esc(label)}</span>
    ${buttons}
  </div>`;
}

/**
 * @param {string} zoneId
 */
export function renderFivesChecklistToolbar(zoneId) {
  const z = esc(zoneId);
  return `<div class="ss5-cl-toolbar card">
    <div class="ss5-cl-toolbar-top">
      <span id="ss5-cl-autosave" class="ss5-autosave-hint">Prêt</span>
    </div>
    <div class="ss5-cl-toolbar-groups">
      ${btnGroup(
        'Principal',
        actionBtn('save', 'Enregistrer', 'primary', `data-zone="${z}" id="ss5-cl-save-btn"`) +
          actionBtn('check-circle', 'Valider checklist', 'accent', `data-ss5-action="validate" data-zone="${z}"`)
      )}
      ${btnGroup(
        'Édition',
        actionBtn('settings', 'Modifier checklist', 'default', 'data-ss5-action="template"') +
          actionBtn('list', 'Sections', 'default', 'data-ss5-action="sections"')
      )}
      ${btnGroup(
        'Export',
        actionBtn('download', 'Exporter CSV', 'default', `data-ss5-action="export" data-zone="${z}"`) +
          actionBtn('file', 'Rapport', 'default', `data-ss5-action="report" data-zone="${z}"`)
      )}
      ${btnGroup(
        'Analyse',
        actionBtn('alert', 'Écarts', 'danger', `data-ss5-action="ecarts" data-zone="${z}"`)
      )}
      ${btnGroup(
        'Affichage',
        actionBtn('search', 'Filtrer', 'ghost', 'data-ss5-action="filter-toggle" id="ss5-cl-filter-btn"')
      )}
    </div>
    <div class="ss5-cl-filter-bar" id="ss5-cl-filter-bar">
      <label class="fl" style="margin:0">Réponses</label>
      <select class="sel" id="ss5-cl-filter-rep">
        <option value="">Toutes</option>
        <option value="non">Non conformes uniquement</option>
        <option value="oui">Conformes uniquement</option>
        <option value="empty">Non évaluées</option>
        <option value="na">N/A</option>
      </select>
      <label class="fl" style="margin:0">Pilier</label>
      <select class="sel" id="ss5-cl-filter-pillar">
        <option value="">Tous les piliers</option>
        <option value="S1">1S — Seiri</option>
        <option value="S2">2S — Seiton</option>
        <option value="S3">3S — Seiso</option>
        <option value="S4">4S — Seiketsu</option>
        <option value="S5">5S — Shitsuke</option>
      </select>
      <button type="button" class="ss5-cl-action ss5-cl-action--ghost" data-ss5-action="filter-clear">Effacer filtres</button>
      <span class="ss5-cl-filter-count" id="ss5-cl-filter-count"></span>
    </div>
  </div>`;
}
