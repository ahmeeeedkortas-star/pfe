/**
 * Risques & opportunités SMI.
 */
import { seedCst, getCstRisques } from '../../data/cst.data.js';
import { esc, riskLevelBadge, cstStatutBadge, scoreColor, cstNewBadge } from '../../components/cst/cst-utils.js';
import { downloadCstCsv } from '../../components/cst/cst-export.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

function filterRisques(list) {
  const q = (window.cst_risquesQ || '').toLowerCase();
  let items = list;
  if (q) {
    items = items.filter((r) =>
      [r.id, r.enjeux, r.cat, r.cause, r.consequence, r.responsable, r.action]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  return applyTraceFilters(items, getTraceFilter('cst-risques'), { respField: 'responsable' });
}

export function renderCstRisques() {
  seedCst();
  const tab = window.cst_riskTab ?? 0;
  const all = getCstRisques();
  const base = tab === 1 ? all.filter((r) => r.cat === 'Opportunité') : all.filter((r) => r.cat !== 'Opportunité');
  const filtered = filterRisques(base);
  const nRisks = all.filter((r) => r.cat !== 'Opportunité').length;
  const nOpps = all.filter((r) => r.cat === 'Opportunité').length;
  const gravLabel = tab === 1 ? 'Opportunité (1-5)' : 'Gravité (1-5)';

  const tabs = [
    [0, `⚠ Risques (${nRisks})`],
    [1, `🚀 Opportunités (${nOpps})`],
  ]
    .map(
      ([i, lb]) =>
        `<button type="button" class="cst-tab-btn${tab === i ? ' is-active' : ''}" data-cst-risk-tab="${i}">${lb}</button>`
    )
    .join('');

  const rows = filtered
    .map((r) => {
      const gc = scoreColor(r.gravite);
      const oc = scoreColor(r.occurrence);
      const cc = scoreColor(Math.min(5, Math.ceil(r.criticite / 5)));
      return `<tr>
      <td class="reg-id">${cstNewBadge(r)}${esc(r.id)}</td>
      <td style="font-weight:600;min-width:160px">${esc(r.enjeux)}</td>
      <td>${esc(r.cat)}</td>
      <td style="font-weight:800;color:${gc}">${r.gravite}</td>
      <td style="font-weight:800;color:${oc}">${r.occurrence}</td>
      <td style="font-weight:800;color:${cc}">${r.criticite}</td>
      <td>${riskLevelBadge(r.niv)}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.cause || '—')}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.consequence || '—')}</td>
      <td>${esc(r.responsable || '—')}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.datePrevue || '—')}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.dateRealisation || '—')}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.evalEfficacite || '—')}</td>
      <td style="font-size:var(--fs-xs)">${esc(r.validationEfficacite || '—')}</td>
      <td>${cstStatutBadge(r.statut)}</td>
      <td style="font-size:var(--fs-xs);min-width:120px">${esc(r.action)}</td>
      <td style="font-size:var(--fs-xs)">${renderItemTraceMeta(r)}</td>
      <td style="white-space:nowrap">${renderTraceHistoryBtn('risque', r.id)}<button type="button" class="btn bsm" data-cst-risque-edit="${esc(r.id)}">✏</button></td>
    </tr>`;
    })
    .join('');

  return `<div data-page="cst-risques" class="xm-register xm-register--cst">
    <div class="card">
      <div class="ch">
        <span class="ct">Risques & opportunités</span>
        <div class="cst-toolbar-actions">
          <input type="search" class="fi cst-search-input" placeholder="Rechercher…" data-cst-search="risques" value="${esc(window.cst_risquesQ || '')}">
          <button type="button" class="btn bsm bp" data-cst-risque-add>+ Ajouter</button>
          <button type="button" class="btn bsm" data-cst-export-csv="risques">Excel</button>
          <button type="button" class="btn bsm" data-cst-export-pdf="risques">PDF</button>
        </div>
      </div>
      <p class="cst-page-lead">Traçabilité des évaluations, révisions des niveaux et actions — ISO 9001 §6.1</p>
      ${renderTraceToolbar('cst-risques', { responsableLabel: 'Responsable', statuts: ['Ouvert', 'En cours', 'Maîtrisé', 'Clos', 'Suivi'] })}
      <div class="cst-tab-bar">${tabs}</div>
      <div class="cst-table-scroll">
        <table class="tbl cst-export-table cst-risques-table"><thead><tr>
          <th>ID</th><th>Enjeux</th><th>Cat.</th><th>${esc(gravLabel)}</th><th>Occurrence</th><th>Criticité</th><th>Niveau</th>
          <th>Cause</th><th>Conséquence</th><th>Responsable</th><th>Date prévue</th><th>Date réal.</th>
          <th>Éval. efficacité</th><th>Valid. efficacité</th><th>Statut</th><th>Action</th><th>Traçabilité</th><th></th>
        </tr></thead>
        <tbody>${rows || '<tr><td colspan="18" style="text-align:center;color:var(--muted)">Aucun élément</td></tr>'}</tbody></table>
      </div>
      <p class="cst-table-foot">${filtered.length} élément(s) affiché(s)</p>
    </div>
    ${renderModuleHistoryPanel('cst-risques')}
  </div>`;
}

export function exportCstRisquesCsv() {
  const rows = getCstRisques().map((r) => [
    r.id,
    r.enjeux,
    r.cat,
    r.gravite,
    r.occurrence,
    r.criticite,
    r.niv,
    r.cause,
    r.consequence,
    r.responsable,
    r.datePrevue,
    r.dateRealisation,
    r.evalEfficacite,
    r.validationEfficacite,
    r.statut,
    r.action,
  ]);
  downloadCstCsv(
    'risques-opportunites',
    [
      'ID',
      'Enjeux',
      'Catégorie',
      'Gravité/Opp.',
      'Occurrence',
      'Criticité',
      'Niveau',
      'Cause',
      'Conséquence',
      'Responsable',
      'Date prévue',
      'Date réalisation',
      'Éval. efficacité',
      'Valid. efficacité',
      'Statut',
      'Action',
    ],
    rows
  );
}
