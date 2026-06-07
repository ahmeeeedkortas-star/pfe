/** filterNC — liste NC + domaines Odoo, regroupement, pagination. */
import { clearTableRowMotion } from '../core/page-refresh.js';
import {
  getOdooState,
  groupRows,
  NC_FILTER_PRESETS,
  NC_GROUP_BY,
  ncPresetDomain,
  renderGroupedTbody,
} from '../core/odoo-list-engine.js';
import { refreshOdooChips } from '../components/shared/odoo-control-panel.js';
import { ensureNcDateFilter, matchNcDateFilter } from '../data/nc-date.utils.js';
import { listNc, initNcRepository } from '../data/nc-repository.js';

function ncListState() {
  if (!window.ncListState) window.ncListState = { archived: false, page: 1, pageSize: 15, dateFrom: '', dateTo: '' };
  return window.ncListState;
}

function rowHtml(r, archived) {
  const archBtns = archived
    ? `<button type="button" class="btn bsm" data-xm-restore-item data-xm-archive-prefix="nc" data-xm-archive-id="${r.n}">↩</button>
       <button type="button" class="btn bsm" data-xm-hard-delete-item data-xm-archive-prefix="nc" data-xm-archive-id="${r.n}" style="color:#dc2626">🗑</button>`
    : `<button type="button" class="btn bsm" data-xm-archive-item data-xm-archive-prefix="nc" data-xm-archive-id="${r.n}">📦</button>`;
  return `<tr>
    <td><span class="link" data-nav="nc-fiche">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td>${r.p}</td><td>${r.dep}</td>
    <td style="max-width:200px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.desc}">${r.desc}</td>
    <td><span class="badge ${window.badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${window.badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td style="white-space:nowrap">
      <button type="button" class="btn bsm" data-nav="nc-fiche">Voir</button>
      ${archBtns}
    </td>
  </tr>`;
}

export function patchFilterNC() {
  window.filterNC = function filterNC() {
    initNcRepository();
    const dateF = ensureNcDateFilter();
    const fProj = document.getElementById('nc-fp')?.value || 'Tous';
    const fDep = document.getElementById('nc-fd')?.value || 'Tous';
    const fStat = document.getElementById('nc-fs')?.value || 'Tous';
    const fGrav = document.getElementById('nc-fg')?.value || 'Tous';
    const fQ = (document.getElementById('nc-fq')?.value || '').toLowerCase();
    const fDateVal = document.getElementById('nc-date-value')?.value ?? dateF.value;
    dateF.value = fDateVal;

    const odoo = getOdooState('nc');
    const st = ncListState();
    const groupField = NC_GROUP_BY.find((g) => g.id === odoo.groupBy)?.field;

    window.__ncCustomFilter = (r) => {
      if (!matchNcDateFilter(r, dateF.level, fDateVal)) return false;
      if (fProj !== 'Tous' && r.p !== fProj) return false;
      if (fDep !== 'Tous' && r.dep !== fDep) return false;
      if (!ncPresetDomain(odoo.preset, r)) return false;
      return true;
    };

    const useGroup = Boolean(groupField);
    const { items, total } = listNc({
      includeArchived: st.archived,
      filters: {
        q: fQ,
        status: fStat,
        priority: fGrav,
        custom: window.__ncCustomFilter,
      },
      page: useGroup ? 1 : st.page,
      pageSize: useGroup ? 500 : st.pageSize,
    });

    const tbody = document.getElementById('nc-tbody');
    if (tbody) {
      const groups = groupRows(items, groupField || '');
      tbody.innerHTML = renderGroupedTbody(groups, (r) => rowHtml(r, st.archived), 10);
      clearTableRowMotion(tbody);
    }

    const cnt = document.getElementById('nc-cnt');
    if (cnt) cnt.textContent = `${items.length} / ${total}`;

    const chipFields = [];
    if (fProj !== 'Tous') chipFields.push(`Projet: ${fProj}`);
    if (fDep !== 'Tous') chipFields.push(`Département: ${fDep}`);
    if (fStat !== 'Tous') chipFields.push(`Statut: ${fStat}`);
    if (fGrav !== 'Tous') chipFields.push(`Gravité: ${fGrav}`);

    refreshOdooChips('nc', {
      searchId: 'nc-fq',
      total,
      presetLabel: NC_FILTER_PRESETS.find((p) => p.id === odoo.preset)?.label,
      groupLabel: NC_GROUP_BY.find((g) => g.id === odoo.groupBy)?.label,
      fields: chipFields,
    });

    window.xmUpdatePagination?.('nc');
  };
}
