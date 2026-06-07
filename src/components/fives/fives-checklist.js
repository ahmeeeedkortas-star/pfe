/**
 * Rendu checklist 5S — Conforme / Non-conforme, édition type Excel (modèle).
 */
import { FIVES_PILLARS } from '../../data/fives-checklist-template.data.js';
import { calcZoneKpi, FIVES_KPI_GOAL } from '../../data/fives-store.js';
import { esc } from './fives-utils.js';

function pillarMeta(pillarId) {
  return FIVES_PILLARS.find((p) => p.id === pillarId) || { label: pillarId, color: '#64748b' };
}

export function renderFivesChecklistRows(template, responses, opts = {}) {
  const { editable = false, editLabels = false, zoneKey = '' } = opts;
  const respMap = Object.fromEntries((responses || []).map((r) => [r.itemId, r]));

  let html = '';
  let lastPillar = '';

  for (const it of template) {
    if (it.pillar !== lastPillar) {
      lastPillar = it.pillar;
      const pm = pillarMeta(it.pillar);
      html += `
      <tr class="fives-pillar-row">
        <td colspan="${editable ? 6 : 5}" style="background:${pm.color}12;border-left:4px solid ${pm.color};padding:8px 12px;font-size:11px;font-weight:700;color:${pm.color}">
          ${esc(pm.label)} — <span style="font-weight:500;opacity:.85">${esc(pm.subtitle || '')}</span>
        </td>
      </tr>`;
    }
    const r = respMap[it.id] || { rep: null, obs: '' };
    const rep = r.rep;
    const rowBg = rep === 'c' ? '#f0fdf4' : rep === 'nc' ? '#fef2f2' : '';

    html += `
    <tr data-fives-item="${esc(it.id)}" style="background:${rowBg}">
      <td style="text-align:center;font-weight:700;font-size:10px;color:#94a3b8;width:36px">${it.n}</td>
      <td>
        ${
          editLabels
            ? `<input class="fi fives-cl-label" data-fives-label="${esc(it.id)}" value="${esc(it.label)}" style="width:100%;font-size:11px">`
            : `<span style="font-size:11px;line-height:1.4">${esc(it.label)}</span>`
        }
      </td>
      <td style="text-align:center;width:72px">
        <button type="button" class="fives-rep-btn${rep === 'c' ? ' active c' : ''}" data-fives-rep="c" data-fives-item="${esc(it.id)}" data-fives-zone="${esc(zoneKey)}" title="Conforme">✓</button>
      </td>
      <td style="text-align:center;width:72px">
        <button type="button" class="fives-rep-btn${rep === 'nc' ? ' active nc' : ''}" data-fives-rep="nc" data-fives-item="${esc(it.id)}" data-fives-zone="${esc(zoneKey)}" title="Non-conforme">✕</button>
      </td>
      <td>
        <input class="fi fives-cl-obs" data-fives-obs="${esc(it.id)}" data-fives-zone="${esc(zoneKey)}" value="${esc(r.obs || '')}" placeholder="Observation…" style="width:100%;font-size:10px">
      </td>
      ${
        editable
          ? `<td style="text-align:center;width:40px"><button type="button" class="btn bsm" data-fives-del-row="${esc(it.id)}" title="Supprimer">✕</button></td>`
          : ''
      }
    </tr>`;
  }
  return html;
}

export function renderFivesKpiBar(responses, opts = {}) {
  const stats = calcZoneKpi(responses);
  const color = stats.kpi >= FIVES_KPI_GOAL ? '#16a34a' : stats.kpi >= 60 ? '#f59e0b' : '#dc2626';
  return `
  <div class="fives-kpi-bar" style="margin-bottom:12px;padding:12px 14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
      <div>
        <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase">KPI zone 5S</div>
        <div style="font-size:28px;font-weight:800;color:${color};line-height:1.1">${stats.kpi}%</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <span class="badge bg3">${stats.conformes} Conforme</span>
        <span class="badge br">${stats.nonConformes} Non-conforme</span>
        <span class="badge bgr">${stats.scored}/${stats.total} notés</span>
        <span class="badge ${stats.atteint ? 'bg3' : 'by'}">${stats.atteint ? '✓ Objectif ≥80%' : `⚠ Objectif ${FIVES_KPI_GOAL}%`}</span>
      </div>
    </div>
    <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden">
      <div style="height:100%;width:${stats.kpi}%;background:${color};border-radius:4px;transition:width .2s"></div>
    </div>
    ${opts.showGoal !== false ? `<div style="font-size:9px;color:#94a3b8;margin-top:4px">Objectif : ≥ ${FIVES_KPI_GOAL}% de conformité</div>` : ''}
  </div>`;
}

export function readResponsesFromDom(zoneKey, template) {
  return template.map((it) => {
    const btnC = document.querySelector(`[data-fives-rep="c"][data-fives-item="${it.id}"][data-fives-zone="${zoneKey}"].active`);
    const btnNc = document.querySelector(`[data-fives-rep="nc"][data-fives-item="${it.id}"][data-fives-zone="${zoneKey}"].active`);
    let rep = null;
    if (btnC) rep = 'c';
    else if (btnNc) rep = 'nc';
    const obs = document.querySelector(`[data-fives-obs="${it.id}"][data-fives-zone="${zoneKey}"]`)?.value || '';
    return { itemId: it.id, rep, obs };
  });
}
