/**
 * Graphiques KPI NC — tableaux de bord (SVG / barres CSS).
 */

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

/** @param {Record<string, number>} counts */
export function renderDonutChart(title, counts, colors, unit = 'NC') {
  const entries = Object.entries(counts).filter(([, v]) => v > 0);
  const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
  const r = 28;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const segments = entries
    .map(([label, val], i) => {
      const pct = val / total;
      const dash = pct * c;
      const seg = `<circle cx="40" cy="40" r="${r}" fill="none" stroke="${colors[label] || colors._default || '#94a3b8'}" stroke-width="10" stroke-dasharray="${dash} ${c}" stroke-dashoffset="${-offset + c * 0.25}" stroke-linecap="butt"/>`;
      offset += dash;
      return { label, val, pct, color: colors[label] || colors._default, seg, i };
    })
    .map((x) => x.seg)
    .join('');

  const legend = entries
    .map(([label, val]) => {
      const pct = Math.round((val / total) * 100);
      const col = colors[label] || '#94a3b8';
      return `<div class="nc-kpi-legend-row">
        <span class="nc-kpi-legend-dot" style="background:${col}"></span>
        <span class="nc-kpi-legend-lbl">${esc(label)}</span>
        <span class="nc-kpi-legend-val" style="color:${col}">${pct}% (${val})</span>
      </div>`;
    })
    .join('');

  return `<div class="nc-kpi-donut-wrap">
    <svg width="88" height="88" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="10"/>
      ${segments}
      <text x="40" y="36" text-anchor="middle" font-size="8" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">${esc(title)}</text>
      <text x="40" y="48" text-anchor="middle" font-size="7" fill="var(--muted)" font-family="Inter,sans-serif">${total} ${esc(unit)}</text>
    </svg>
    <div class="nc-kpi-legend">${legend}</div>
  </div>`;
}

/**
 * @param {{ label: string, value: number, color?: string, suffix?: string }[]} items
 * @param {{ max?: number, height?: number, title?: string, unit?: string }} [opts]
 */
export function renderBarChart(items, opts = {}) {
  const max = opts.max ?? Math.max(...items.map((i) => i.value), 1);
  const h = opts.height ?? 100;
  const title = opts.title || '';
  const unit = opts.unit || '';

  const bars = items
    .map((item) => {
      const v = item.value;
      const barH = v > 0 ? Math.max(4, (v / max) * (h - 24)) : 2;
      const col = item.color || (v > (opts.alertAbove ?? Infinity) ? '#dc2626' : '#2563eb');
      return `<div class="nc-kpi-bar-col">
        <div class="nc-kpi-bar-val" style="color:${col}">${esc(String(item.display ?? v))}${unit}</div>
        <div class="nc-kpi-bar" style="height:${barH}px;background:linear-gradient(180deg,${col}dd,${col})" title="${esc(item.label)}: ${v}"></div>
        <div class="nc-kpi-bar-lbl">${esc(item.label)}</div>
      </div>`;
    })
    .join('');

  return `<div class="nc-kpi-bar-chart">
    ${title ? `<div class="nc-kpi-bar-title">${esc(title)}</div>` : ''}
    <div class="nc-kpi-bar-row" style="height:${h}px">${bars}</div>
  </div>`;
}

/** Barres horizontales % */
export function renderHBarList(items, title) {
  const rows = items
    .map(
      ([label, pct, color, raw]) => `
    <div class="nc-kpi-hbar">
      <span class="nc-kpi-hbar-lbl">${esc(label)}</span>
      <div class="nc-kpi-hbar-track">
        <div class="nc-kpi-hbar-fill" style="width:${raw ?? parseInt(pct, 10)}%;background:${color}">${esc(pct)}</div>
      </div>
    </div>`
    )
    .join('');
  return `<div class="card" style="padding:14px"><div class="ct" style="margin-bottom:10px">${esc(title)}</div>${rows}</div>`;
}

export function parseNcMonth(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('/');
  if (parts.length < 2) return null;
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const mi = parseInt(parts[1], 10) - 1;
  return months[mi] || null;
}

export function aggregateNcFromData(data) {
  const byStatus = {};
  const byGrav = {};
  const byDep = {};
  const byMonth = {};
  data.forEach((nc) => {
    byStatus[nc.s] = (byStatus[nc.s] || 0) + 1;
    byGrav[nc.g] = (byGrav[nc.g] || 0) + 1;
    byDep[nc.dep] = (byDep[nc.dep] || 0) + 1;
    const m = parseNcMonth(nc.d);
    if (m) byMonth[m] = (byMonth[m] || 0) + 1;
  });
  return { byStatus, byGrav, byDep, byMonth, total: data.length };
}

const MONTH_ORDER = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export function renderMonthlyRcChart(byMonth, months, objectif = 1) {
  const items = months.map((m) => ({
    label: m,
    value: byMonth[m] || 0,
    display: byMonth[m] ?? '—',
    color: (byMonth[m] || 0) > objectif ? '#dc2626' : (byMonth[m] || 0) > 0 ? '#16a34a' : '#e5e7eb',
  }));
  return renderBarChart(items, {
    max: Math.max(10, ...items.map((i) => i.value), objectif + 2),
    height: 110,
    alertAbove: objectif,
  });
}

export function renderMonthlyNcChart(byMonth, objectif = 20) {
  const items = MONTH_ORDER.map((m) => ({
    label: m,
    value: byMonth[m] || 0,
    display: byMonth[m] ?? '—',
    color: (byMonth[m] || 0) > objectif ? '#dc2626' : (byMonth[m] || 0) > 0 ? '#16a34a' : '#e5e7eb',
  }));
  return renderBarChart(items, {
    max: Math.max(objectif + 5, ...items.map((i) => i.value), 8),
    height: 110,
    title: `Évolution mensuelle (seuil mineures : ${objectif})`,
    alertAbove: objectif,
  });
}
