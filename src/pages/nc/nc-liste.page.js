/**
 * Page NC — Liste (panneau Odoo + tableau).
 */
import { badgeGravity, badgeStatus } from '../../components/ui/Badge.js';
import { bindDateHierarchyFilter, renderDateHierarchyFilter } from '../../components/filters/date-hierarchy-filter.js';
import { getNcData } from '../../data/nc.data.js';
import { getNcProjets } from '../../data/nc-projets.store.js';
import { ensureNcDateFilter, getDefaultNcDateFilter } from '../../data/nc-date.utils.js';
import { renderKpiStatCard } from '../../components/icons/ui-helpers.js';
import {
  bindOdooControlPanel,
  renderOdooControlPanel,
} from '../../components/shared/odoo-control-panel.js';
import { NC_FILTER_PRESETS, NC_GROUP_BY } from '../../core/odoo-list-engine.js';
import { initNcRepository } from '../../data/nc-repository.js';
import { renderListToolbar } from '../../components/shared/list-toolbar.js';

function rowHtml(r) {
  return `<tr>
    <td><span class="link" data-nav="nc-fiche">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td>
    <td>${r.p}</td>
    <td>${r.dep}</td>
    <td style="max-width:200px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.desc}">${r.desc}</td>
    <td>${badgeGravity(r.g)}</td>
    <td>${badgeStatus(r.s)}</td>
    <td>${r.r}</td>
    <td>${r.dl}</td>
    <td><button type="button" class="btn bsm" data-nav="nc-fiche">Voir</button></td>
  </tr>`;
}

export function renderNcListe() {
  ensureNcDateFilter();
  initNcRepository();
  const data = getNcData();
  const total = data.length;
  const ouv = data.filter((r) => r.s !== 'Clôturé').length;
  const crit = data.filter((r) => r.g === 'Critique').length;
  const clo = data.filter((r) => r.s === 'Clôturé').length;
  const projs = getNcProjets();
  const deps = [...new Set(data.map((r) => r.dep))].sort();
  const rows = data.map(rowHtml).join('');

  const filtersHtml = `
    <div class="odoo-dd-filters-grid">
      ${renderDateHierarchyFilter(data, { prefix: 'nc' })}
      <select id="nc-fp" class="sel" data-nc-filter><option value="Tous">Projet : Tous</option>${projs.map((p) => `<option value="${p}">${p}</option>`).join('')}</select>
      <select id="nc-fd" class="sel" data-nc-filter><option value="Tous">Département : Tous</option>${deps.map((d) => `<option value="${d}">${d}</option>`).join('')}</select>
      <select id="nc-fs" class="sel" data-nc-filter><option value="Tous">Statut : Tous</option><option>En cours</option><option>Ouvert</option><option>Clôturé</option></select>
      <select id="nc-fg" class="sel" data-nc-filter><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
    </div>`;

  return `
  <div data-page="nc-liste">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:12px">
    ${renderKpiStatCard('Total NC', total, 'var(--blue)', 'alert')}
    ${renderKpiStatCard('Ouvertes', ouv, 'var(--orange)', 'unlock')}
    ${renderKpiStatCard('Critiques', crit, 'var(--red)', 'siren')}
    ${renderKpiStatCard('Clôturées', clo, 'var(--green)', 'check-circle')}
  </div>

  ${renderListToolbar({ prefix: 'nc', showPriority: true, priorityOptions: ['Tous', 'Critique', 'Majeure', 'Mineure'] })}

  ${renderOdooControlPanel({
    prefix: 'nc',
    title: 'Non-conformités',
    subtitle: 'Liste · domaines · regroupement (style Odoo)',
    searchId: 'nc-fq',
    searchPlaceholder: 'Rechercher N°, description, département…',
    dataFilterAttr: 'data-nc-filter',
    presets: NC_FILTER_PRESETS,
    groupByOptions: NC_GROUP_BY,
    filtersHtml,
    countId: 'nc-cnt',
    actionsHtml: `<button type="button" class="btn bsm" data-xm-export-csv="nc">Excel</button>
      <button type="button" class="btn bsm" data-xm-export-pdf="nc">PDF</button>
      <button type="button" class="btn bsm bp" data-nav="nc-new">+ Nouvelle NC</button>
      <button type="button" class="btn bsm bp" data-nav="nc-kpi">📊 KPI</button>`,
  })}

  <div class="card" style="padding:0;overflow:hidden;margin-top:0">
    <div style="overflow-x:auto">
      <table class="tbl odoo-list-table" style="min-width:860px">
        <thead><tr>
          <th>N° NC</th><th>Date</th><th>Projet</th><th>Département</th>
          <th>Description</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th>Actions</th>
        </tr></thead>
        <tbody id="nc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>
  </div>`;
}

export function bindNcListeFilters() {
  bindDateHierarchyFilter('nc');
  window.xmUpdatePagination?.('nc');

  document.querySelectorAll('[data-nc-filter]').forEach((el) => {
    el.addEventListener('input', () => window.filterNC?.());
    el.addEventListener('change', () => window.filterNC?.());
  });

  bindOdooControlPanel('nc', {
    presets: NC_FILTER_PRESETS,
    groupByOptions: NC_GROUP_BY,
    searchId: 'nc-fq',
    onApply: () => window.filterNC?.(),
    onReset: () => {
      const fq = document.getElementById('nc-fq');
      if (fq) fq.value = '';
      window.ncDateFilter = getDefaultNcDateFilter();
      ['nc-fp', 'nc-fd', 'nc-fs', 'nc-fg'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = 'Tous';
      });
      const dv = document.getElementById('nc-date-value');
      if (dv) dv.value = 'Tous';
      window.filterNC?.();
    },
  });

  window.filterNC?.();
}
