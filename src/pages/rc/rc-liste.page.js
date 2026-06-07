/**
 * Page RC — Liste des réclamations (panneau Odoo + tableau).
 */
import { badgeGravity, badgeStatus } from '../../components/ui/Badge.js';
import { bindDateHierarchyFilter, renderDateHierarchyFilter } from '../../components/filters/date-hierarchy-filter.js';
import { getRcData } from '../../data/rc.data.js';
import { getRcClients } from '../../data/rc-clients.store.js';
import { getRcProjets } from '../../data/rc-projets.store.js';
import { ensureRcDateFilter, getDefaultRcDateFilter } from '../../data/rc-date.utils.js';
import { renderKpiStatCard } from '../../components/icons/ui-helpers.js';
import {
  bindOdooControlPanel,
  renderOdooControlPanel,
} from '../../components/shared/odoo-control-panel.js';
import { RC_FILTER_PRESETS, RC_GROUP_BY } from '../../core/odoo-list-engine.js';
import { initRcRepository } from '../../data/rc-repository.js';

function rowHtml(r) {
  return `<tr>
    <td><span class="link" data-nav="rc-fiche">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td>
    <td><span style="background:#eff6ff;color:#1e40af;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600">${r.p}</span></td>
    <td><strong>${r.cl}</strong></td>
    <td>${r.dep}</td>
    <td style="max-width:180px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.obj}">${r.obj}</td>
    <td>${badgeGravity(r.g)}</td>
    <td>${badgeStatus(r.s)}</td>
    <td>${r.r}</td>
    <td>${r.dl}</td>
    <td><button type="button" class="btn bsm" data-nav="rc-fiche">Voir</button></td>
  </tr>`;
}

export function renderRcListe() {
  initRcRepository();
  ensureRcDateFilter();
  const data = getRcData();
  const total = data.length;
  const ouv = data.filter((r) => r.s !== 'Clôturée').length;
  const crit = data.filter((r) => r.g === 'Critique').length;
  const clo = data.filter((r) => r.s === 'Clôturée').length;
  const projs = getRcProjets();
  const clients = getRcClients();
  const rows = data.map(rowHtml).join('');

  const filtersHtml = `
    <div class="odoo-dd-filters-grid">
      ${renderDateHierarchyFilter(data)}
      <select id="rc-fp" class="sel" data-rc-filter><option value="Tous">Projet : Tous</option>${projs.map((p) => `<option value="${p}">${p}</option>`).join('')}</select>
      <select id="rc-fc" class="sel" data-rc-filter><option value="Tous">Client : Tous</option>${clients.map((c) => `<option value="${c}">${c}</option>`).join('')}</select>
      <select id="rc-fs" class="sel" data-rc-filter><option value="Tous">Statut : Tous</option><option>En traitement</option><option>En analyse</option><option>Ouvert</option><option>Clôturée</option></select>
      <select id="rc-fg" class="sel" data-rc-filter><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
    </div>`;

  return `
  <div data-page="rc-liste">
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${renderKpiStatCard('Total RC', total, 'var(--blue)', 'list')}
    ${renderKpiStatCard('Ouvertes', ouv, 'var(--orange)', 'unlock')}
    ${renderKpiStatCard('Critiques', crit, 'var(--red)', 'siren')}
    ${renderKpiStatCard('Clôturées', clo, 'var(--green)', 'check-circle')}
    ${renderKpiStatCard('Délai moyen', '8,6 j', 'var(--navy)', 'clock')}
  </div>

  ${renderOdooControlPanel({
    prefix: 'rc',
    title: 'Réclamations clients',
    subtitle: 'Liste · filtres · regroupement (style Odoo)',
    searchId: 'rc-fq',
    searchPlaceholder: 'Rechercher N°, client, problème…',
    dataFilterAttr: 'data-rc-filter',
    presets: RC_FILTER_PRESETS,
    groupByOptions: RC_GROUP_BY,
    filtersHtml,
    countId: 'rc-cnt',
    actionsHtml: `<button type="button" class="btn bsm" data-xm-export-csv="rc">Excel</button>
      <button type="button" class="btn bsm" data-xm-export-pdf="rc">PDF</button>
      <button type="button" class="btn bsm bp" data-nav="rc-new">+ Nouvelle RC</button>
      <button type="button" class="btn bsm bp" data-nav="rc-kpi">📊 KPI</button>`,
  })}

  <div class="card" style="padding:0;overflow:hidden;margin-top:0">
    <div style="overflow-x:auto">
      <table class="tbl odoo-list-table" style="min-width:900px">
        <thead><tr>
          <th>N° RC</th><th>Date</th><th>Projet</th><th>Client</th><th>Département</th><th>Problème</th>
          <th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th>Actions</th>
        </tr></thead>
        <tbody id="rc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>
  </div>`;
}

export function bindRcListeFilters() {
  bindDateHierarchyFilter('rc');

  document.querySelectorAll('[data-rc-filter]').forEach((el) => {
    el.addEventListener('input', () => window.filterRC?.());
    el.addEventListener('change', () => window.filterRC?.());
  });

  bindOdooControlPanel('rc', {
    presets: RC_FILTER_PRESETS,
    groupByOptions: RC_GROUP_BY,
    searchId: 'rc-fq',
    onApply: () => window.filterRC?.(),
    onReset: () => {
      const fq = document.getElementById('rc-fq');
      if (fq) fq.value = '';
      window.rcDateFilter = getDefaultRcDateFilter();
      ['rc-fp', 'rc-fc', 'rc-fs', 'rc-fg'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = 'Tous';
      });
      const dv = document.getElementById('rc-date-value');
      if (dv) dv.value = 'Tous';
      window.filterRC?.();
    },
  });

  window.filterRC?.();
  window.xmUpdatePagination?.('rc');
}
