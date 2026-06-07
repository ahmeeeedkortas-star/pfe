/**
 * Revue de direction — historique et traçabilité ISO.
 */
import { seedCst, getCstRevues } from '../../data/cst.data.js';
import { esc, cstStatutBadge } from '../../components/cst/cst-utils.js';
import { applyTraceFilters } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderItemTraceMeta,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

const REVUE_TABS = ['Entrées', 'Analyse', 'Discussions', 'Actions', 'Comptes rendus'];

export function renderCstRevue() {
  seedCst();
  const trace = getTraceFilter('cst-revue');
  let revues = getCstRevues();
  revues = applyTraceFilters(revues, trace, { dateField: 'date', respField: 'president', statutField: 'statut' });
  const selId = window.cst_selectedRev || revues[0]?.id;
  const rev = revues.find((r) => r.id === selId) || revues[0];

  const list = revues
    .map(
      (r) => `<div class="cst-revue-item${r.id === rev?.id ? ' is-active' : ''}" data-cst-revue-select="${esc(r.id)}" role="button" tabindex="0">
      <div class="cst-revue-item-id">${esc(r.id)}</div>
      <div class="cst-revue-item-date">${esc(r.date)}</div>
      <div class="cst-revue-item-meta">${esc(r.president)} · ${r.participants} participants</div>
      ${cstStatutBadge(r.statut)}
      <div style="font-size:9px;color:var(--muted);margin-top:4px">${renderItemTraceMeta(r)}</div>
    </div>`
    )
    .join('');

  const tab = window.cst_revueTab ?? 0;
  const tabs = REVUE_TABS.map(
    (lb, i) =>
      `<button type="button" class="cst-tab-btn${tab === i ? ' is-active' : ''}" data-cst-revue-tab="${i}">${lb}</button>`
  ).join('');

  let tabBody = '';
  if (!rev) {
    tabBody = '<p style="color:var(--muted)">Aucune revue enregistrée.</p>';
  } else if (tab === 0) {
    tabBody = `<div class="cst-revue-entrees">${rev.entrees
      .map((e) => `<div class="cst-revue-entry"><span>${esc(e)}</span></div>`)
      .join('')}</div>`;
  } else if (tab === 1) {
    tabBody =
      '<div class="cst-revue-placeholder"><p>Analyse des indicateurs, écarts et tendances — à compléter lors de la revue.</p></div>';
  } else if (tab === 2) {
    tabBody =
      '<div class="cst-revue-placeholder"><p>Synthèse des discussions et points soulevés par les participants.</p></div>';
  } else if (tab === 4) {
    const docs = rev.documents || rev.comptesRendus || [];
    const docRows = docs
      .map(
        (d) => `<tr>
        <td style="font-weight:600">${esc(d.nom || d.titre)}</td>
        <td style="font-size:var(--fs-xs)">${esc(d.type)}</td>
        <td>${esc(d.version || 'V1')}</td>
        <td style="font-size:var(--fs-xs)">${esc(d.dateMaj || d.date)}</td>
        <td style="font-size:var(--fs-xs)">${esc(d.auteur || d.updatedBy || '—')}</td>
        <td style="white-space:nowrap">
          ${d.importedContent ? `<button type="button" class="btn bsm" data-cst-revue-doc-dl="${esc(rev.id)}" data-cst-revue-doc-id="${d.id}">⬇</button>` : ''}
        </td>
      </tr>`
      )
      .join('');
    tabBody = `<div class="ch" style="margin-bottom:10px">
      <span class="ct">Comptes rendus & pièces jointes</span>
      <button type="button" class="btn bsm bp" data-cst-revue-doc-import="${esc(rev.id)}">📎 Joindre un fichier</button>
    </div>
    <p style="font-size:11px;color:var(--muted);margin:0 0 12px">CR, présentations, KPI, rapports d'audit — versions et traçabilité conservées dans la revue.</p>
    <table class="tbl"><thead><tr><th>Titre</th><th>Type</th><th>Version</th><th>Date</th><th>Auteur</th><th></th></tr></thead>
    <tbody>${docRows || '<tr><td colspan="6" style="text-align:center;color:var(--muted)">Aucune pièce jointe</td></tr>'}</tbody></table>`;
  } else {
    const decs = (rev.decisions || [])
      .map((d) => `<div class="cst-revue-dec">${esc(d)}</div>`)
      .join('');
    const acts = (rev.actions || [])
      .map(
        (a) => `<div class="cst-revue-act-row">
        <span style="font-weight:600;flex:1">${esc(a.action)}</span>
        <span style="font-size:var(--fs-xs)">${esc(a.resp)}</span>
        <span style="font-size:var(--fs-xs)">${esc(a.delai)}</span>
        ${cstStatutBadge(a.statut)}
      </div>`
      )
      .join('');
    tabBody = `<div class="cst-revue-decisions-wrap"><div class="ch"><span class="ct">Décisions</span></div>${decs || '<p style="color:var(--muted)">—</p>'}</div>
      <div class="cst-revue-actions-wrap" style="margin-top:14px"><div class="ch"><span class="ct">Actions décidées</span></div>${acts || '<p style="color:var(--muted)">—</p>'}</div>`;
  }

  const detail = rev
    ? `<div class="cst-revue-detail">
      <div class="cst-revue-header">
        <div class="cst-revue-header-title">${esc(rev.id)} — Revue de direction</div>
        <div class="cst-revue-header-sub">${esc(rev.statut)}</div>
      </div>
      <div class="cst-revue-meta-grid">
        <div><span class="dk">Date</span><strong>${esc(rev.date)}</strong></div>
        <div><span class="dk">Président</span><strong>${esc(rev.president)}</strong></div>
        <div><span class="dk">Participants</span><strong>${rev.participants}</strong></div>
        <div><span class="dk">Statut</span>${cstStatutBadge(rev.statut)}</div>
        <div><span class="dk">Dernière MAJ</span><strong>${esc(rev.dateMaj || rev.date)}</strong></div>
        <div><span class="dk">Modifié par</span><strong>${esc(rev.updatedBy || '—')}</strong></div>
      </div>
      <div style="margin-top:8px">${renderTraceHistoryBtn('revue', rev.id, 'Historique révisions')} <span style="font-size:11px;color:var(--muted)">Version ${esc(rev.version || 'V1')}</span></div>
      <div class="cst-tab-bar" style="margin-top:12px">${tabs}</div>
      <div class="cst-revue-tab-body">${tabBody}</div>
    </div>`
    : '<div class="card"><p style="color:var(--muted)">Sélectionnez ou créez une revue.</p></div>';

  return `<div data-page="cst-revue" class="xm-register xm-register--cst">
    <div class="g23">
      <div class="card">
        <div class="ch"><span class="ct">Revues de direction</span><button type="button" class="btn bsm bp" data-cst-revue-add>+ Nouvelle revue</button></div>
        ${renderTraceToolbar('cst-revue', { responsableLabel: 'Président', statuts: ['Planifiée', 'En cours', 'Terminée'] })}
        <div class="cst-revue-list">${list}</div>
      </div>
      ${detail}
    </div>
    ${renderModuleHistoryPanel('cst-revue')}
  </div>`;
}
