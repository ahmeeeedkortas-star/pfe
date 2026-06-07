/**
 * Actions NC — registre moderne (kanban / liste / chronologie) + filtre période.
 */
import { getNcData } from '../../data/nc.data.js';
import {
  ACTION_TYPE_COLORS,
  normalizeActionType,
} from '../../components/qhse/action-types.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import {
  bindPeriodDatePicker,
  ensureActionPeriodFilter,
  matchActionPeriodFilter,
  renderPeriodDatePicker,
  resetActionPeriodFilter,
} from '../../components/filters/period-date-picker.js';

const STATUTS = ['À faire', 'En cours', 'En retard', 'Clôturée'];
const STATUT_COLORS = { 'À faire': '#64748b', 'En cours': '#2563eb', 'En retard': '#dc2626', Clôturée: '#16a34a' };
const STATUT_BG = { 'À faire': '#f1f5f9', 'En cours': '#eff6ff', 'En retard': '#fef2f2', Clôturée: '#f0fdf4' };
const PRIO_BADGE = { Critique: 'br', Haute: 'bo', Normale: 'bgr' };

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function migrateNcActionTypes() {
  (window.NC_ACTIONS || []).forEach((a) => {
    a.type = normalizeActionType(a.type);
  });
}

function isOverdue(fin, statut) {
  if (statut === 'Clôturée' || !fin || fin === '—') return false;
  const p = fin.split('/');
  if (p.length < 2) return false;
  const y = p[2] ? (p[2].length === 2 ? `20${p[2]}` : p[2]) : String(new Date().getFullYear());
  const d = new Date(`${y}-${p[1]}-${p[0]}`);
  return d < new Date();
}

function typePill(type) {
  const t = normalizeActionType(type);
  const [bg, c] = ACTION_TYPE_COLORS[t] || ['#f1f5f9', '#64748b'];
  return `<span class="rc-act-type" style="background:${bg};color:${c}">${esc(t)}</span>`;
}

function filterActions(all) {
  const fResp = window.ncActFResp || 'Tous';
  const fType = window.ncActFType || 'Tous';
  const fPrio = window.ncActFPrio || 'Tous';
  const fRef = window.ncActFRef || 'Tous';
  const fQ = (window.ncActFQ || '').toLowerCase();
  const period = ensureActionPeriodFilter('nc');
  return all.filter((a) => {
    const type = normalizeActionType(a.type);
    if (fResp !== 'Tous' && a.resp !== fResp) return false;
    if (fType !== 'Tous' && type !== normalizeActionType(fType)) return false;
    if (fPrio !== 'Tous' && a.prio !== fPrio) return false;
    if (fRef !== 'Tous' && a.ref !== fRef) return false;
    if (fQ && ![a.action, a.ref, a.resp, a.desc].join(' ').toLowerCase().includes(fQ)) return false;
    if (!matchActionPeriodFilter(a, period)) return false;
    return true;
  });
}

function progBar(prog, id) {
  const col = prog === 100 ? '#16a34a' : prog >= 60 ? '#f59e0b' : '#3b82f6';
  return `<div class="rc-act-prog">
    <div class="rc-act-prog-head"><span>Progression</span><span style="color:${col}">${prog}%</span></div>
    <div class="rc-act-prog-track"><div class="rc-act-prog-fill" style="width:${prog}%;background:${col}"></div></div>
    <input type="range" min="0" max="100" value="${prog}" class="rc-act-range"
      data-nc-act-prog="${id}" aria-label="Progression">
  </div>`;
}

function statButtons(a) {
  return STATUTS.map((s) => {
    const active = a.statut === s;
    const bc = STATUT_COLORS[s];
    return `<button type="button" class="rc-act-stat-btn${active ? ' active' : ''}" style="--st:${bc}"
      data-nc-act-status="${a.id}" data-nc-act-stat="${esc(s)}">${esc(s)}</button>`;
  }).join('');
}

function actionCard(a, ncMap) {
  const over = isOverdue(a.fin, a.statut);
  const ref = ncMap.get(a.ref);
  return `<article class="rc-act-card${over ? ' rc-act-card--late' : ''}" data-prio="${esc(a.prio)}">
    <header class="rc-act-card-head">
      <div>
        <h3 class="rc-act-card-title">${esc(a.action)}</h3>
        ${a.desc ? `<p class="rc-act-card-desc">${esc(a.desc)}</p>` : ''}
      </div>
      <div class="rc-act-card-tools">
        <button type="button" class="btn bsm" data-nc-act-edit="${a.id}" title="Modifier">✏</button>
        <button type="button" class="btn bsm" data-nc-act-del="${a.id}" title="Supprimer">✕</button>
      </div>
    </header>
    <div class="rc-act-card-tags">
      ${typePill(a.type)}
      <span class="badge ${PRIO_BADGE[a.prio] || 'bgr'}">${esc(a.prio)}</span>
      <span class="rc-act-ref">${esc(a.ref)}</span>
      ${ref ? `<span class="rc-act-client" title="${esc(ref.desc)}">${esc(ref.desc?.slice(0, 40) || '')}${(ref.desc?.length || 0) > 40 ? '…' : ''}</span>` : ''}
    </div>
    ${progBar(a.prog, a.id)}
    <footer class="rc-act-card-foot">
      <span class="rc-act-resp">${esc(a.resp)}</span>
      <span class="rc-act-due${over ? ' rc-act-due--late' : ''}">${esc(a.fin)}${over ? ' · Retard' : ''}</span>
    </footer>
    <div class="rc-act-stat-row">${statButtons(a)}</div>
  </article>`;
}

function tableRow(a) {
  const over = isOverdue(a.fin, a.statut);
  return `<tr>
    <td><strong class="rc-act-row-title">${esc(a.action)}</strong>${a.desc ? `<div class="rc-act-row-desc">${esc(a.desc)}</div>` : ''}</td>
    <td>${typePill(a.type)}</td>
    <td><span class="rc-act-ref">${esc(a.ref)}</span></td>
    <td>${esc(a.resp)}</td>
    <td>${esc(a.debut || '—')}</td>
    <td class="${over ? 'rc-act-due--late' : ''}">${esc(a.fin)}</td>
    <td>${a.prog}%</td>
    <td><span class="badge ${a.statut === 'Clôturée' ? 'bg3' : over ? 'br' : 'by'}">${esc(a.statut)}</span></td>
    <td>
      <button type="button" class="btn bsm" data-nc-act-edit="${a.id}">✏</button>
      <select class="sel rc-act-sel-stat" data-nc-act-status-sel="${a.id}">
        ${STATUTS.map((s) => `<option${a.statut === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
    </td>
  </tr>`;
}

export function renderNcActions() {
  migrateNcActionTypes();
  if (!window.ncActView) window.ncActView = 'kanban';
  const view = window.ncActView;
  const all = window.NC_ACTIONS || [];
  const data = filterActions(all);
  const ncMap = new Map(getNcData().map((r) => [r.n, r]));

  const done = all.filter((a) => a.statut === 'Clôturée').length;
  const enCours = all.filter((a) => a.statut === 'En cours').length;
  const retard = all.filter((a) => a.statut === 'En retard' || isOverdue(a.fin, a.statut)).length;
  const aFaire = all.filter((a) => a.statut === 'À faire').length;
  const pctDone = Math.round((done / Math.max(all.length, 1)) * 100);

  const resps = [...new Set(all.map((a) => a.resp))].sort();
  const types = [...new Set(all.map((a) => normalizeActionType(a.type)))].sort();
  const refs = [...new Set(all.map((a) => a.ref))].sort();

  const period = ensureActionPeriodFilter('nc');
  const hasFilters =
    window.ncActFQ ||
    window.ncActFResp !== 'Tous' ||
    window.ncActFType !== 'Tous' ||
    window.ncActFPrio !== 'Tous' ||
    window.ncActFRef !== 'Tous' ||
    period.enabled;

  const kpi = [
    ['Total', all.length, '#1e40af', '#eff6ff'],
    ['À faire', aFaire, '#64748b', '#f8fafc'],
    ['En cours', enCours, '#c2410c', '#fff7ed'],
    ['En retard', retard, '#dc2626', '#fef2f2'],
    ['Clôturées', done, '#16a34a', '#f0fdf4'],
  ];

  let body = '';
  if (data.length === 0) {
    body = `<div class="rc-act-empty card">
      <p>Aucune action trouvée.</p>
      <button type="button" class="btn bp" data-nc-act-add>+ Ajouter une action</button>
    </div>`;
  } else if (view === 'kanban') {
    body = `<div class="rc-act-kanban">${STATUTS.map((statut) => {
      const col = data.filter((a) => {
        if (statut === 'En retard') return a.statut === 'En retard' || (isOverdue(a.fin, a.statut) && a.statut !== 'Clôturée');
        if (statut === 'À faire') return a.statut === 'À faire' && !isOverdue(a.fin, a.statut);
        if (statut === 'En cours') return a.statut === 'En cours' && !isOverdue(a.fin, a.statut);
        return a.statut === statut;
      });
      return `<div class="rc-act-col" style="--col:${STATUT_COLORS[statut]};--col-bg:${STATUT_BG[statut]}">
        <div class="rc-act-col-head"><span>${esc(statut)}</span><span class="rc-act-col-n">${col.length}</span></div>
        ${col.map((a) => actionCard(a, ncMap)).join('')}
        <button type="button" class="rc-act-col-add" data-nc-act-add>+ Ajouter</button>
      </div>`;
    }).join('')}</div>`;
  } else if (view === 'liste') {
    body = `<div class="card rc-act-table-wrap"><table class="tbl rc-act-table">
      <thead><tr><th>Action</th><th>Type</th><th>NC</th><th>Responsable</th><th>Début</th><th>Échéance</th><th>Prog.</th><th>Statut</th><th></th></tr></thead>
      <tbody>${data.map(tableRow).join('')}</tbody></table></div>`;
  } else {
    const sorted = [...data].sort((a, b) => {
      const toDate = (s) => {
        const p = (s || '').split('/');
        const y = p[2] ? (p[2].length === 2 ? `20${p[2]}` : p[2]) : '2026';
        return new Date(`${y}-${p[1] || '01'}-${p[0] || '01'}`);
      };
      return toDate(a.fin) - toDate(b.fin);
    });
    body = `<div class="rc-act-timeline card">${sorted.map((a) => `<div class="rc-act-tl-item">${actionCard(a, ncMap)}</div>`).join('')}</div>`;
  }

  return `<div data-page="nc-actions" class="rc-actions-page nc-actions-page">
    <div class="rc-act-hero nc-act-hero">
      <div>
        <h1 class="rc-act-hero-title">Actions — Non-conformités</h1>
        <p class="rc-act-hero-sub">Immédiate · Corrective · Préventive · Plan QRQC</p>
      </div>
      <button type="button" class="btn bp" data-nc-act-add>+ Nouvelle action</button>
    </div>
    <div class="rc-act-kpis">${kpi
      .map(
        ([l, v, c, bg]) =>
          `<div class="rc-act-kpi" style="background:${bg};color:${c}"><span class="rc-act-kpi-v">${v}</span><span class="rc-act-kpi-l">${l}</span></div>`
      )
      .join('')}
      <div class="rc-act-kpi rc-act-kpi--ring"><span class="rc-act-kpi-v">${pctDone}%</span><span class="rc-act-kpi-l">Taux clôture</span></div>
    </div>
    <div class="card rc-act-toolbar nc-act-toolbar">
      ${renderPeriodDatePicker('nc', { actions: all })}
      <div class="rc-act-search">
        ${renderIcon('search', { size: 14 })}
        <input type="search" placeholder="Rechercher action, NC, responsable…" value="${esc(window.ncActFQ || '')}" data-nc-act-q>
      </div>
      <select class="sel" data-nc-act-f="ref"><option value="Tous">NC : Toutes</option>${refs.map((r) => `<option value="${esc(r)}"${window.ncActFRef === r ? ' selected' : ''}>${esc(r)}</option>`).join('')}</select>
      <select class="sel" data-nc-act-f="resp"><option value="Tous">Responsable</option>${resps.map((r) => `<option value="${esc(r)}"${window.ncActFResp === r ? ' selected' : ''}>${esc(r)}</option>`).join('')}</select>
      <select class="sel" data-nc-act-f="type"><option value="Tous">Type</option>${types.map((t) => `<option value="${esc(t)}"${window.ncActFType === t ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select>
      <select class="sel" data-nc-act-f="prio"><option value="Tous">Priorité</option>${['Critique', 'Haute', 'Normale'].map((p) => `<option value="${esc(p)}"${window.ncActFPrio === p ? ' selected' : ''}>${esc(p)}</option>`).join('')}</select>
      ${hasFilters ? '<button type="button" class="btn bsm" data-nc-act-reset>Effacer filtres</button>' : ''}
      <button type="button" class="btn bsm" data-xm-export-csv="nc-actions">Excel</button>
      <button type="button" class="btn bsm" data-xm-export-pdf="nc-actions">PDF</button>
      <span class="rc-act-count">${data.length}/${all.length}</span>
      <div class="rc-act-view-toggle">${[
        ['kanban', 'Kanban'],
        ['liste', 'Liste'],
        ['timeline', 'Chronologie'],
      ]
        .map(
          ([id, lb]) =>
            `<button type="button" class="rc-act-view-btn${view === id ? ' active' : ''}" data-nc-act-view="${id}">${lb}</button>`
        )
        .join('')}</div>
    </div>
    ${body}
  </div>`;
}

let bound = false;

export function bindNcActions() {
  if (bound) return;
  bound = true;
  migrateNcActionTypes();

  const reload = () => window.reloadPage?.('nc-actions');
  bindPeriodDatePicker('nc', reload);

  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-nc-act-view]');
    if (viewBtn) {
      window.ncActView = viewBtn.dataset.ncActView;
      reload();
      return;
    }
    if (e.target.closest('[data-nc-act-add]')) {
      window.showAddActionModal?.('NC_ACTIONS', 'nc-actions');
      return;
    }
    if (e.target.closest('[data-nc-act-reset]')) {
      window.ncActFResp = 'Tous';
      window.ncActFType = 'Tous';
      window.ncActFPrio = 'Tous';
      window.ncActFRef = 'Tous';
      window.ncActFQ = '';
      resetActionPeriodFilter('nc');
      reload();
      return;
    }
    const edit = e.target.closest('[data-nc-act-edit]');
    if (edit) {
      window.openEditAction?.(Number(edit.dataset.ncActEdit));
      return;
    }
    const del = e.target.closest('[data-nc-act-del]');
    if (del) {
      window.deleteAction?.('NC_ACTIONS', Number(del.dataset.ncActDel), 'nc-actions');
      return;
    }
    const st = e.target.closest('[data-nc-act-status]');
    if (st) {
      window.changeStatut?.('NC_ACTIONS', Number(st.dataset.ncActStatus), st.dataset.ncActStat, 'nc-actions');
    }
  });

  document.addEventListener('change', (e) => {
    const f = e.target.closest('[data-nc-act-f]');
    if (f) {
      const key = f.dataset.ncActF;
      const val = f.value;
      if (key === 'ref') window.ncActFRef = val;
      if (key === 'resp') window.ncActFResp = val;
      if (key === 'type') window.ncActFType = val;
      if (key === 'prio') window.ncActFPrio = val;
      reload();
      return;
    }
    const sel = e.target.closest('[data-nc-act-status-sel]');
    if (sel) {
      window.changeStatut?.('NC_ACTIONS', Number(sel.dataset.ncActStatusSel), sel.value, 'nc-actions');
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('[data-nc-act-q]')) {
      window.ncActFQ = e.target.value;
      reload();
      return;
    }
    const range = e.target.closest('[data-nc-act-prog]');
    if (range) {
      window.updateProg?.('NC_ACTIONS', Number(range.dataset.ncActProg), range.value, 'nc-actions');
    }
  });
}
