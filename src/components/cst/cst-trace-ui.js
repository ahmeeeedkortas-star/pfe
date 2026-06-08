/**
 * UI traçabilité — filtres, métadonnées et historique (module CST).
 */
import { esc } from './cst-utils.js';
import { matchesPeriod } from './cst-entity-revisions.js';

const MODULE_LABELS = {
  'cst-swot': 'Contexte & SWOT',
  'cst-pestel': 'PESTEL',
  'cst-parties': 'Parties intéressées',
  'cst-risques': 'Risques & opportunités',
  'cst-objectifs': 'Objectifs',
  'cst-revue': 'Revue de direction',
  'cst-politique': 'Politique QHSE',
};

export function getTraceFilter(pageId) {
  window.cst_trace_filter = window.cst_trace_filter || {};
  if (!window.cst_trace_filter[pageId]) {
    window.cst_trace_filter[pageId] = { period: 'all', responsable: '', statut: '', showHistory: false };
  }
  return window.cst_trace_filter[pageId];
}

export function renderTraceToolbar(pageId, opts = {}) {
  const f = getTraceFilter(pageId);
  const statuts = opts.statuts || [];
  const responsableLabel = opts.responsableLabel || 'Responsable';
  const statOpts = statuts
    .map((s) => `<option value="${esc(s)}"${f.statut === s ? ' selected' : ''}>${esc(s)}</option>`)
    .join('');
  const year = new Date().getFullYear();

  return `<div class="cst-trace-toolbar">
    <select class="fi cst-trace-sel" data-cst-trace-filter="${pageId}" data-cst-trace-key="period">
      <option value="all"${f.period === 'all' ? ' selected' : ''}>Toutes périodes</option>
      <option value="month"${f.period === 'month' ? ' selected' : ''}>Ce mois</option>
      <option value="quarter"${f.period === 'quarter' ? ' selected' : ''}>Ce trimestre</option>
      <option value="year"${f.period === 'year' ? ' selected' : ''}>Cette année (${year})</option>
      <option value="${year - 1}"${f.period === String(year - 1) ? ' selected' : ''}>Année ${year - 1}</option>
    </select>
    <input type="search" class="fi cst-trace-inp" placeholder="${esc(responsableLabel)}…" value="${esc(f.responsable)}" data-cst-trace-filter="${pageId}" data-cst-trace-key="responsable">
    ${statuts.length ? `<select class="fi cst-trace-sel" data-cst-trace-filter="${pageId}" data-cst-trace-key="statut">
      <option value="">Tous statuts</option>${statOpts}
    </select>` : ''}
    <button type="button" class="btn bsm${f.showHistory ? ' bp' : ''}" data-cst-trace-toggle="${pageId}">🕐 Historique${f.showHistory ? ' ▾' : ''}</button>
  </div>`;
}

export function renderItemTraceMeta(item, compact = true) {
  if (!item) return '';
  const created = item.createdAt || '—';
  const maj = item.dateMaj || created;
  const user = item.updatedBy || item.createdBy || '—';
  const ver = item.version || 'V1';
  if (compact) {
    return `<span class="cst-trace-meta" title="Créé ${created} · MAJ ${maj} · ${user}">${esc(maj)} · 👤 ${esc(user)} · ${esc(ver)}</span>`;
  }
  return `<div class="cst-trace-meta-block">
    <span>Créé : <strong>${esc(created)}</strong></span>
    <span>MAJ : <strong>${esc(maj)}</strong></span>
    <span>Par : <strong>${esc(user)}</strong></span>
    <span>Version : <strong>${esc(ver)}</strong></span>
  </div>`;
}

export function renderTraceHistoryBtn(entityType, id, title = 'Historique') {
  return `<button type="button" class="btn bsm cst-trace-hist-btn" title="${esc(title)}" data-cst-trace-history="${esc(entityType)}" data-cst-trace-id="${esc(id)}">🕐</button>`;
}

export function renderModuleHistoryPanel(module, opts = {}) {
  const f = getTraceFilter(module);
  if (!f.showHistory) return '';
  const limit = opts.limit || 40;
  let rows = (window.CST_AUDIT_TRAIL || []).filter((e) => e.module === module);
  if (f.period && f.period !== 'all') {
    rows = rows.filter((e) => matchesPeriod(e.date, f.period));
  }
  if (f.responsable) {
    const r = f.responsable.toLowerCase();
    rows = rows.filter((e) => (e.user || '').toLowerCase().includes(r));
  }
  rows = rows.slice(0, limit);

  const tr = rows
    .map(
      (e) => `<tr>
      <td style="font-size:10px;white-space:nowrap">${esc(e.date)} ${esc(e.time || '')}</td>
      <td style="font-size:10px">${esc(e.action)}</td>
      <td style="font-size:10px;font-weight:600">${esc(e.user)}</td>
      <td style="font-size:10px;color:#64748b">${esc(e.entityId)}</td>
      <td style="font-size:10px;color:#475569">${esc(e.details || '—')}</td>
    </tr>`
    )
    .join('');

  return `<div class="card cst-trace-history-panel">
    <div class="ch"><span class="ct">Historique des modifications — ${esc(MODULE_LABELS[module] || module)}</span></div>
    <table class="tbl"><thead><tr><th>Date</th><th>Action</th><th>Utilisateur</th><th>Réf.</th><th>Détails</th></tr></thead>
    <tbody>${tr || '<tr><td colspan="5" style="text-align:center;color:var(--muted)">Aucune modification enregistrée</td></tr>'}</tbody></table>
  </div>`;
}

export function renderRevisionsModalHtml(entityLabel, revisions) {
  const rows = (revisions || [])
    .map(
      (r) => `<tr>
      <td><span class="badge" style="background:#eff6ff;color:#2563eb">${esc(r.version)}</span></td>
      <td style="font-size:10.5px">${esc(r.date)} ${esc(r.time || '')}</td>
      <td style="font-size:10.5px">${esc(r.user)}</td>
      <td style="font-size:10.5px">${esc(r.motif)}</td>
    </tr>`
    )
    .join('');
  return `<div class="cst-rev-modal-body">
    <p style="font-size:11px;color:var(--muted);margin:0 0 12px">Historique des révisions — ${esc(entityLabel)}</p>
    <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="4">Aucune révision</td></tr>'}</tbody></table>
  </div>`;
}

let traceBound = false;

export function bindCstTraceUi() {
  if (traceBound) return;
  traceBound = true;

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-cst-trace-filter]');
    if (!sel || sel.tagName !== 'SELECT') return;
    const pageId = sel.dataset.cstTraceFilter;
    const key = sel.dataset.cstTraceKey;
    getTraceFilter(pageId)[key] = sel.value;
    if (window.reloadPage) window.reloadPage(pageId);
  });

  document.addEventListener('input', (e) => {
    const inp = e.target.closest('[data-cst-trace-filter]');
    if (!inp || inp.tagName !== 'INPUT') return;
    const pageId = inp.dataset.cstTraceFilter;
    const key = inp.dataset.cstTraceKey;
    getTraceFilter(pageId)[key] = inp.value;
    clearTimeout(window.__cstTraceDebounce);
    window.__cstTraceDebounce = setTimeout(() => window.reloadPage?.(pageId), 280);
  });

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-cst-trace-toggle]');
    if (toggle) {
      const pageId = toggle.dataset.cstTraceToggle;
      const f = getTraceFilter(pageId);
      f.showHistory = !f.showHistory;
      window.reloadPage?.(pageId);
      return;
    }

    const hist = e.target.closest('[data-cst-trace-history]');
    if (!hist) return;
    const entityType = hist.dataset.cstTraceHistory;
    const id = hist.dataset.cstTraceId;
    showEntityRevisionsModal(entityType, id);
  });
}

function showEntityRevisionsModal(entityType, id) {
  const item = findEntityByType(entityType, id);
  if (!item) return;
  const label = item.nom || item.texte || item.facteur || item.enjeux || item.objectif || item.id || id;
  const { cstModal, closeCstModal } = window.__cstTraceModalHelpers || {};
  const body = renderRevisionsModalHtml(label, item.revisions);
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="cst_modal_overlay" class="xm-modal-overlay cst-modal-overlay" data-cst-modal>
      <div class="xm-modal-card cst-modal-card" style="max-width:560px">
        <div class="cst-modal-gradient">
          <div class="cst-modal-head">
            <div><div class="cst-modal-title">Révisions</div><div class="cst-modal-sub">${esc(label)}</div></div>
            <button type="button" class="btn bsm" data-cst-trace-modal-close>✕</button>
          </div>
        </div>
        <div class="cst-modal-body">${body}</div>
        <div class="cst-modal-foot"><span></span><button type="button" class="btn bsm bp" data-cst-trace-modal-close>Fermer</button></div>
      </div>
    </div>`
  );
}

function findEntityByType(type, id) {
  if (type === 'contexte') return window.CST_CONTEXTE;
  if (type === 'politique') return window.CST_POLITIQUE;
  if (type === 'swot') {
    for (const key of ['forces', 'faiblesses', 'opportunites', 'menaces']) {
      const it = (window.CST_SWOT?.[key] || []).find((x) => x.id === id);
      if (it) return it;
    }
  }
  const maps = {
    pestel: window.CST_PESTEL,
    partie: window.CST_PARTIES,
    risque: window.CST_RISQUES,
    objectif: window.CST_OBJECTIFS,
    revue: window.CST_REVUES,
  };
  const list = maps[type];
  if (!list) return null;
  return list.find((x) => String(x.id) === String(id));
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-cst-trace-modal-close]') || (e.target.id === 'cst_modal_overlay' && document.querySelector('[data-cst-trace-modal-close]'))) {
    document.getElementById('cst_modal_overlay')?.remove();
  }
});
