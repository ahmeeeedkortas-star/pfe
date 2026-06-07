/**
 * Tableau de bord SMI — Contexte & Stratégie.
 */
import { seedCst, getCstObjectifs, getCstActions, getCstRisques, getCstChangements, getCstRevues } from '../../data/cst.data.js';
import { esc, progBar } from '../../components/cst/cst-utils.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';

export function renderCstTb() {
  seedCst();
  const objs = getCstObjectifs();
  const acts = getCstActions();
  const risks = getCstRisques().filter((r) => r.cat !== 'Opportunité');
  const opps = getCstRisques().filter((r) => r.cat === 'Opportunité');
  const chgs = getCstChangements();
  const revues = getCstRevues();

  const elev = risks.filter((r) => r.niv === 'Élevé').length;
  const chgAct = chgs.filter((c) => c.statut === 'En cours').length;
  const avgProg = objs.length ? Math.round(objs.reduce((s, o) => s + (o.prog || 0), 0) / objs.length) : 0;

  const actStats = {
    'En cours': acts.filter((a) => a.statut === 'En cours').length,
    'À faire': acts.filter((a) => a.statut === 'À faire').length,
    'En retard': acts.filter((a) => a.statut === 'En retard').length,
    Clôturées: acts.filter((a) => a.statut === 'Clôturée').length,
  };

  const perfBars = [
    ['Qualité', 78, '#2563eb'],
    ['Sécurité', 82, '#dc2626'],
    ['Environnement', 76, '#16a34a'],
    ['Global SMI', 79, '#7c3aed'],
  ]
    .map(
      ([l, v, c]) => `<div class="cst-perf-bar-row"><span class="cst-perf-bar-lbl">${l}</span><div class="cst-perf-bar-track"><div class="cst-perf-bar-fill" style="width:${v}%;background:${c}"></div></div><span class="cst-perf-bar-val">${v}%</span></div>`
    )
    .join('');

  const donutSegs = [
    { n: risks.filter((r) => r.niv === 'Élevé').length, c: '#dc2626', l: 'Élevé' },
    { n: risks.filter((r) => r.niv === 'Moyen').length, c: '#f59e0b', l: 'Moyen' },
    { n: risks.filter((r) => r.niv === 'Faible').length, c: '#16a34a', l: 'Faible' },
  ];
  const donutTotal = donutSegs.reduce((s, x) => s + x.n, 0) || 1;
  let acc = 0;
  const donutPaths = donutSegs
    .map((seg) => {
      const pct = seg.n / donutTotal;
      const start = acc;
      acc += pct;
      const a0 = start * 360 - 90;
      const a1 = acc * 360 - 90;
      const r = 40;
      const x0 = 50 + r * Math.cos((a0 * Math.PI) / 180);
      const y0 = 50 + r * Math.sin((a0 * Math.PI) / 180);
      const x1 = 50 + r * Math.cos((a1 * Math.PI) / 180);
      const y1 = 50 + r * Math.sin((a1 * Math.PI) / 180);
      const large = pct > 0.5 ? 1 : 0;
      return seg.n
        ? `<path d="M50 50 L${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1} Z" fill="${seg.c}"/>`
        : '';
    })
    .join('');

  const miniCards = Object.entries(actStats)
    .map(([k, v]) => {
      const colors = { 'En cours': '#2563eb', 'À faire': '#f59e0b', 'En retard': '#dc2626', Clôturées: '#16a34a' };
      const c = colors[k] || '#64748b';
      return `<div class="cst-mini-card" style="border-color:${c}35;background:${c}10"><div class="cst-mini-card-val" style="color:${c}">${v}</div><div class="cst-mini-card-lbl">${k}</div></div>`;
    })
    .join('');

  const deadlines = [
    ...chgs.map((c) => ({ label: c.changement, date: c.delai, type: 'Changement' })),
    ...acts.map((a) => ({ label: a.action, date: a.delai, type: 'Action' })),
  ]
    .slice(0, 5)
    .map(
      (d) => `<div class="cst-deadline-row"><span class="badge bb" style="font-size:9px">${esc(d.type)}</span><span style="flex:1;font-weight:600;font-size:var(--fs-sm)">${esc(d.label)}</span><span style="color:var(--muted);font-size:var(--fs-xs)">${esc(d.date)}</span></div>`
    )
    .join('');

  const recentActs = [...acts]
    .slice(0, 4)
    .map(
      (a) => `<div class="cst-recent-act"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-weight:700;font-size:var(--fs-sm)">${esc(a.id)}</span><span class="badge bb">${esc(a.statut)}</span></div><div style="font-size:var(--fs-xs);color:var(--muted);margin-bottom:6px">${esc(a.action)}</div>${progBar(a.prog, { enRetard: a.statut === 'En retard' })}</div>`
    )
    .join('');

  const sparkSvg = `<svg viewBox="0 0 200 50" class="cst-spark-mini" aria-hidden="true">
    <polyline points="0,40 25,35 50,38 75,30 100,28 125,25 150,22 175,20 200,18" fill="none" stroke="#2563eb" stroke-width="2"/>
    <polyline points="0,42 25,38 50,36 75,32 100,30 125,28 150,26 175,24 200,22" fill="none" stroke="#dc2626" stroke-width="1.5" opacity=".8"/>
    <polyline points="0,44 25,40 50,39 75,35 100,33 125,31 150,29 175,27 200,25" fill="none" stroke="#16a34a" stroke-width="1.5" opacity=".8"/>
  </svg>`;

  return `<div data-page="cst-tb" class="xm-register xm-register--cst">
    <div class="cst-kpi-row">
      ${renderKpiCardCenter('Objectifs strat.', objs.length, 'var(--blue)', 'target', 'cst-objectifs')}
      ${renderKpiCardCenter('Actions strat.', acts.length, 'var(--orange)', 'zap', 'cst-actions')}
      ${renderKpiCardCenter('Risques élevés', elev, 'var(--red)', 'alert', 'cst-risques')}
      ${renderKpiCardCenter('Changements actifs', chgAct, '#92400E', 'refresh', 'cst-changements')}
      ${renderKpiCardCenter('Avancement global', avgProg + '%', avgProg >= 50 ? 'var(--green)' : 'var(--orange)', 'chart-pie', 'cst-objectifs')}
      ${renderKpiCardCenter('Revues direction', revues.length, '#6D28D9', 'clipboard', 'cst-revue')}
    </div>
    <div class="cst-tb-row1">
      <div class="card">
        <div class="ch"><span class="ct">Performance globale SMI</span></div>
        ${perfBars}
        <div style="margin-top:10px">${sparkSvg}</div>
        <div style="font-size:9px;color:var(--muted);margin-top:4px">Jan → Déc · Qualité · Sécurité · Environnement</div>
      </div>
      <div class="card cst-donut-card">
        <div class="ch"><span class="ct">Répartition risques</span></div>
        <svg viewBox="0 0 100 100" width="120" height="120" style="display:block;margin:0 auto">${donutPaths}</svg>
        <div class="cst-donut-legend">${donutSegs.map((s) => `<div><span style="background:${s.c}"></span>${s.l} (${s.n})</div>`).join('')}</div>
        <div style="text-align:center;margin-top:8px;font-size:var(--fs-sm);color:var(--muted)">🚀 ${opps.length} opportunité(s)</div>
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Actions par statut</span><button type="button" class="btn bsm bp" data-nav="cst-actions">Voir tout →</button></div>
        <div class="cst-mini-grid">${miniCards}</div>
      </div>
    </div>
    <div class="g23" style="margin-top:12px">
      <div class="card">
        <div class="ch"><span class="ct">Prochaines échéances</span></div>
        ${deadlines || '<p style="color:var(--muted)">Aucune échéance</p>'}
      </div>
      <div class="card">
        <div class="ch"><span class="ct">Actions récentes</span><button type="button" class="btn bsm bp" data-nav="cst-actions">Plan d&apos;actions →</button></div>
        ${recentActs}
      </div>
    </div>
  </div>`;
}
