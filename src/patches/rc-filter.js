/**
 * filterRC — liste réclamations + domaines Odoo, regroupement, pagination.
 */
import { clearTableRowMotion } from '../core/page-refresh.js';
import {
  getOdooState,
  groupRows,
  RC_FILTER_PRESETS,
  RC_GROUP_BY,
  rcPresetDomain,
  renderGroupedTbody,
} from '../core/odoo-list-engine.js';
import { refreshOdooChips } from '../components/shared/odoo-control-panel.js';
import { ensureRcDateFilter, matchRcDateFilter } from '../data/rc-date.utils.js';
import { listRc, initRcRepository } from '../data/rc-repository.js';

function rcListState() {
  if (!window.rcListState) window.rcListState = { archived: false, page: 1, pageSize: 15, dateFrom: '', dateTo: '' };
  return window.rcListState;
}

function rowHtml(r, archived) {
  const archBtns = archived
    ? `<button type="button" class="btn bsm" data-xm-restore-item data-xm-archive-prefix="rc" data-xm-archive-id="${r.n}">↩</button>
       <button type="button" class="btn bsm" data-xm-hard-delete-item data-xm-archive-prefix="rc" data-xm-archive-id="${r.n}" style="color:#dc2626">🗑</button>`
    : `<button type="button" class="btn bsm" data-xm-archive-item data-xm-archive-prefix="rc" data-xm-archive-id="${r.n}">📦</button>`;
  return `<tr>
    <td><span class="link" data-nav="rc-fiche">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td>${r.p}</td><td>${r.cl}</td><td>${r.dep}</td>
    <td style="max-width:160px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.obj}">${r.obj}</td>
    <td><span class="badge ${window.badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${window.badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td style="white-space:nowrap">
      <button type="button" class="btn bsm" data-nav="rc-fiche">Voir</button>
      ${archBtns}
    </td>
  </tr>`;
}

export function patchFilterRC() {
  window.filterRC = function filterRC() {
    initRcRepository();
    const dateF = ensureRcDateFilter();
    const fProj = document.getElementById('rc-fp')?.value || 'Tous';
    const fClient = document.getElementById('rc-fc')?.value || 'Tous';
    const fStat = document.getElementById('rc-fs')?.value || 'Tous';
    const fGrav = document.getElementById('rc-fg')?.value || 'Tous';
    const fQ = (document.getElementById('rc-fq')?.value || '').toLowerCase();
    const fDateVal = document.getElementById('rc-date-value')?.value ?? dateF.value;
    dateF.value = fDateVal;

    const odoo = getOdooState('rc');
    const st = rcListState();
    const groupField = RC_GROUP_BY.find((g) => g.id === odoo.groupBy)?.field;

    window.__rcCustomFilter = (r) => {
      if (!matchRcDateFilter(r, dateF.level, fDateVal)) return false;
      if (fProj !== 'Tous' && r.p !== fProj) return false;
      if (fClient !== 'Tous' && r.cl !== fClient) return false;
      if (!rcPresetDomain(odoo.preset, r)) return false;
      return true;
    };

    const useGroup = Boolean(groupField);
    const { items, total } = listRc({
      includeArchived: st.archived,
      filters: {
        q: fQ,
        status: fStat,
        priority: fGrav,
        custom: window.__rcCustomFilter,
      },
      page: useGroup ? 1 : st.page,
      pageSize: useGroup ? 500 : st.pageSize,
    });

    const tbody = document.getElementById('rc-tbody');
    if (tbody) {
      const groups = groupRows(items, groupField || '');
      tbody.innerHTML = renderGroupedTbody(groups, (r) => rowHtml(r, st.archived), 11);
      clearTableRowMotion(tbody);
    }

    const cnt = document.getElementById('rc-cnt');
    if (cnt) cnt.textContent = `${items.length} / ${total}`;

    const chipFields = [];
    if (fProj !== 'Tous') chipFields.push(`Projet: ${fProj}`);
    if (fClient !== 'Tous') chipFields.push(`Client: ${fClient}`);
    if (fStat !== 'Tous') chipFields.push(`Statut: ${fStat}`);
    if (fGrav !== 'Tous') chipFields.push(`Gravité: ${fGrav}`);

    refreshOdooChips('rc', {
      searchId: 'rc-fq',
      total,
      presetLabel: RC_FILTER_PRESETS.find((p) => p.id === odoo.preset)?.label,
      groupLabel: RC_GROUP_BY.find((g) => g.id === odoo.groupBy)?.label,
      fields: chipFields,
    });

    window.xmUpdatePagination?.('rc');
  };
}
