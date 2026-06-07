/**
 * Composants KPI — présentation claire (objectifs + indicateurs).
 */

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

/**
 * @param {{ id?: string, label: string, objectif: string, valeur: string, ok: boolean, hint?: string }[]} rows
 */
export function renderObjectifsPanel(rows, title = 'Objectifs qualité') {
  const body = rows
    .map(
      (r) => `<tr class="kpi-obj-row${r.ok ? ' kpi-obj-row--ok' : ' kpi-obj-row--ko'}">
      <td class="kpi-obj-label">${esc(r.label)}</td>
      <td class="kpi-obj-target">${esc(r.objectif)}</td>
      <td class="kpi-obj-value">${esc(r.valeur)}</td>
      <td class="kpi-obj-status"><span class="kpi-obj-badge ${r.ok ? 'ok' : 'ko'}">${r.ok ? 'OK' : 'Écart'}</span></td>
    </tr>${r.hint ? `<tr class="kpi-obj-hint-row"><td colspan="4">${esc(r.hint)}</td></tr>` : ''}`
    )
    .join('');

  return `<div class="card kpi-objectifs-card">
    <div class="ch"><span class="ct">${esc(title)}</span></div>
    <table class="tbl kpi-objectifs-tbl">
      <thead>
        <tr>
          <th>Indicateur</th>
          <th>Objectif</th>
          <th>Réalisé</th>
          <th style="width:72px;text-align:center">Statut</th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  </div>`;
}

/**
 * @param {{ label: string, value: string, sub?: string, color?: string, ok?: boolean }[]} items
 */
export function renderKpiStrip(items) {
  return `<div class="kpi-strip">
    ${items
      .map(
        (k) => `<div class="kpi-strip-item" style="--kpi-color:${k.color || 'var(--blue)'}">
        <div class="kpi-strip-value">${esc(k.value)}</div>
        <div class="kpi-strip-label">${esc(k.label)}</div>
        ${k.sub ? `<div class="kpi-strip-sub">${esc(k.sub)}</div>` : ''}
      </div>`
      )
      .join('')}
  </div>`;
}

export function renderKpiTabs(tabs, activeId, dataAttr = 'data-kpi-tab') {
  return `<nav class="kpi-tabs" role="tablist">
    ${tabs
      .map(
        ([id, label]) =>
          `<button type="button" class="kpi-tab${activeId === id ? ' active' : ''}" ${dataAttr}="${esc(id)}">${esc(label)}</button>`
      )
      .join('')}
  </nav>`;
}

export function renderKpiPageHead(title, subtitle, actionsHtml = '') {
  return `<div class="kpi-page-head">
    <div>
      <h1 class="kpi-page-title">${esc(title)}</h1>
      <p class="kpi-page-sub">${esc(subtitle)}</p>
    </div>
    ${actionsHtml ? `<div class="kpi-page-actions">${actionsHtml}</div>` : ''}
  </div>`;
}
