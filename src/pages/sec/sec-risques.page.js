/**
 * Registre des risques SST — matrice GFDC, fiche workflow 5 étapes (UI moderne).
 */
import { seedSstRisks } from '../../data/sst-risks.data.js';
import { renderIcon } from '../../components/icons/icon-render.js';
import {
  esc,
  getCrit,
  getNiv,
  getNivC,
  getStatBadgeClass,
  nivEmoji,
  refreshSstRisques,
  sstToast,
  ZONES,
  RESP_LIST,
  SST_STEPS,
} from '../../components/sst/risk-utils.js';

function riskIconType(r) {
  const d = `${r.danger} ${r.risque} ${r.zone}`.toLowerCase();
  if (/chim|prod|tox|vapeur/.test(d)) return 'flask';
  if (/feu|therm|brûl|brul/.test(d)) return 'flame';
  if (/élect|elec|câbl|cabl/.test(d)) return 'zap';
  if (/chut|hauteur|échaf|echaf|toit/.test(d)) return 'hardhat';
  if (/machine|coup|press|outil/.test(d)) return 'settings';
  if (/bruit|auditif/.test(d)) return 'chart';
  return 'alert';
}

function buildRiskKpis() {
  const stats = { Critique: 0, Élevé: 0, Moyen: 0, Faible: 0 };
  window.sst_risks.forEach((r) => stats[getNiv(getCrit(r))]++);
  const colors = {
    Critique: { bg: '#fef2f2', tc: '#dc2626' },
    Élevé: { bg: '#fff7ed', tc: '#ea580c' },
    Moyen: { bg: '#fffbeb', tc: '#d97706' },
    Faible: { bg: '#f0fdf4', tc: '#16a34a' },
  };
  return Object.entries(stats)
    .map(
      ([n, v]) =>
        `<div class="sst-kpi-pill" style="background:${colors[n].bg};color:${colors[n].tc}">
          <div class="sst-kpi-pill-val">${v}</div>
          <div class="sst-kpi-pill-lbl">${n}</div>
        </div>`
    )
    .join('');
}

function exportRisksCsv() {
  const header = 'ID;Zone;Unité;Danger;Risque;G;F;D;Criticité;Niveau;Statut;Responsable';
  const lines = window.sst_risks.map((r) => {
    const c = getCrit(r);
    const niv = getNiv(c);
    return [r.id, r.zone, r.unite, r.danger, r.risque, r.g, r.f, r.d, c, niv, r.statut, r.resp]
      .map((x) => `"${String(x).replace(/"/g, '""')}"`)
      .join(';');
  });
  const blob = new Blob(['\ufeff' + [header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `risques-sst-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

let bound = false;

function filteredRisks() {
  const f = window._sstFilter || {};
  return window.sst_risks.filter((r) => {
    const c = getCrit(r);
    const niv = getNiv(c);
    const q = (f.q || '').toLowerCase();
    if (f.zone && r.zone !== f.zone) return false;
    if (f.niv && niv !== f.niv) return false;
    if (f.stat && r.statut !== f.stat) return false;
    if (f.gf && (r.g !== f.gf.g || r.f !== f.gf.f)) return false;
    if (q && !r.danger.toLowerCase().includes(q) && !r.risque.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q))
      return false;
    return true;
  });
}

function buildRiskCards(rows) {
  const sel = window.sst_selectedId;
  if (!rows.length) {
    return `<div class="sst-empty-state">${renderIcon('alert', { size: 40 })}<p>Aucun risque ne correspond aux filtres.</p></div>`;
  }
  return `<div class="sst-risk-cards">${rows
    .map((r, i) => {
      const c = getCrit(r);
      const niv = getNiv(c);
      const nc = getNivC(niv);
      const isSel = r.id === sel;
      const icon = riskIconType(r);
      return `<article class="sst-risk-card${isSel ? ' is-selected' : ''}" data-sst-select="${esc(r.id)}" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
        <div class="sst-risk-card-stripe" style="background:${nc.tc}"></div>
        <div class="sst-risk-card-body">
          <div class="sst-risk-card-top">
            <span class="sst-risk-id">${esc(r.id)}</span>
            <span class="sst-risk-niv" style="background:${nc.bg};color:${nc.tc};border-color:${nc.bc}">${esc(niv)}</span>
          </div>
          <div class="sst-risk-title-row">
            <div class="sst-risk-icon-wrap">${renderIcon(icon, { size: 18 })}</div>
            <div>
              <h3 class="sst-risk-title">${esc(r.danger)}</h3>
              <p class="sst-risk-sub">${esc(r.risque)}</p>
            </div>
          </div>
          <div class="sst-risk-footer">
            <span>${esc(r.zone)}</span>
            <span class="sst-gfdc"><span>G${r.g}</span><span>F${r.f}</span><span>D${r.d}</span></span>
            <span class="sst-crit-badge" style="color:${nc.tc}">C=${c}</span>
            <span class="badge ${getStatBadgeClass(r.statut)}">${esc(r.statut)}</span>
          </div>
        </div>
      </article>`;
    })
    .join('')}</div>`;
}

function buildHeatmap() {
  const cellCounts = {};
  window.sst_risks.forEach((r) => {
    const k = `${r.g}-${r.f}`;
    cellCounts[k] = (cellCounts[k] || 0) + 1;
  });
  const selR = window.sst_risks.find((x) => x.id === window.sst_selectedId);
  const cells = [];
  for (let f = 5; f >= 1; f--) {
    for (let g = 1; g <= 5; g++) {
      const c = g * f;
      const bg = c > 60 ? '#dc2626' : c > 30 ? '#f97316' : c > 10 ? '#f59e0b' : '#10b981';
      const op = c > 60 ? 1 : c > 30 ? 0.85 : c > 10 ? 0.6 : 0.45;
      const cnt = cellCounts[`${g}-${f}`] || 0;
      const sel = selR && selR.g === g && selR.f === f;
      cells.push(
        `<div class="heatmap-cell" data-sst-heatmap="${g},${f}" style="background:${bg};opacity:${sel ? 1 : op};${sel ? 'outline:2.5px solid var(--navy)' : ''}" title="G=${g} × F=${f} = ${c}${cnt ? ` — ${cnt} risque(s)` : ''}">
          ${cnt ? `<span style="position:absolute;top:-5px;right:-5px;background:#0f2044;color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff">${cnt}</span>` : ''}
          ${c}
        </div>`
      );
    }
  }
  const stats = { Critique: 0, Élevé: 0, Moyen: 0, Faible: 0 };
  window.sst_risks.forEach((r) => stats[getNiv(getCrit(r))]++);
  const scColors = { Critique: '#dc2626', Élevé: '#f97316', Moyen: '#f59e0b', Faible: '#10b981' };
  const statsHtml = Object.entries(stats)
    .map(
      ([n, v]) =>
        `<div style="background:${scColors[n]}15;border:1px solid ${scColors[n]}30;border-radius:8px;padding:8px 10px;text-align:center">
          <div style="font-size:20px;font-weight:800;color:${scColors[n]};font-family:monospace">${v}</div>
          <div style="font-size:var(--reg-fs-xs);color:${scColors[n]};font-weight:600">${n}</div>
        </div>`
    )
    .join('');

  return { cells: cells.join(''), statsHtml };
}

function buildRightPanel() {
  if (!window.sst_selectedId) {
    return `<div class="sst-empty-state" style="padding:64px 24px">
      ${renderIcon('clipboard', { size: 48 })}
      <div class="reg-panel-title" style="margin-top:12px">Sélectionner un risque</div>
      <div class="reg-meta" style="max-width:320px;margin:8px auto 20px">Cliquez sur une carte pour ouvrir la fiche d'évaluation GFDC, les actions et la validation.</div>
      <button type="button" class="btn bp" data-sst-new>+ Nouveau risque</button>
    </div>`;
  }
  const r = window.sst_risks.find((x) => x.id === window.sst_selectedId);
  if (!r) return '';
  const c = getCrit(r);
  const niv = getNiv(c);
  const nc = getNivC(niv);
  const rc = r.rr_g * r.rr_f * r.rr_d;
  const rniv = getNiv(rc);
  const rnc = getNivC(rniv);
  const step = window.sst_step || 1;

  const stepsHtml = SST_STEPS.map((lbl, i) => {
    const n = i + 1;
    const done = n < step;
    const active = n === step;
    const line =
      i > 0
        ? `<div style="flex:1;height:3px;background:${done ? 'var(--green)' : '#e5e7eb'};margin-top:14px"></div>`
        : '';
    return (
      line +
      `<div style="display:flex;flex-direction:column;align-items:center">
        <div class="reg-step-dot" data-sst-step="${n}" style="background:${done ? 'var(--green)' : active ? 'var(--blue)' : 'var(--white)'};
          border:2px solid ${done ? 'var(--green)' : active ? 'var(--blue)' : '#e5e7eb'};
          color:${done || active ? '#fff' : 'var(--muted)'};
          ${active ? 'box-shadow:0 0 0 4px rgba(37,99,235,.15)' : ''}">${done ? '✓' : n}</div>
        <div class="reg-step-lbl" style="color:${active ? 'var(--blue)' : done ? 'var(--green)' : 'var(--muted)'};font-weight:${active || done ? '700' : '400'}">${lbl}</div>
      </div>`
    );
  }).join('');

  const secTitle = (t) => `<div class="reg-sec-title">${t}</div>`;
  const navBtns = (extra) => `<div style="display:flex;gap:10px;padding-top:14px;border-top:1px solid var(--border);margin-top:8px">
    ${step > 1 ? `<button type="button" class="btn bsm" data-sst-step="${step - 1}">← Précédent</button>` : '<span></span>'}
    <div style="flex:1"></div>
    ${extra || (step < 5 ? `<button type="button" class="btn bsm bp" data-sst-step="${step + 1}">${step === 4 ? '✓ Valider la fiche →' : 'Étape suivante →'}</button>` : '')}
  </div>`;

  let stepBody = '';
  if (step === 1) {
    stepBody = `
      ${secTitle('Identification')}
      ${[
        ['Zone', r.zone],
        ['Unité', r.unite],
        ['Processus', r.processus],
        ['Danger', r.danger],
        ['Risque', r.risque],
        ['Dommage', r.dommage || '—'],
        ['Personnes exposées', r.personnes || '—'],
        ['Situation', r.situation],
      ]
        .map(
          ([k, v]) =>
            `<div class="drow" style="padding:6px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:var(--reg-fs-sm);max-width:58%;text-align:right">${esc(v)}</span></div>`
        )
        .join('')}
      ${secTitle('Modifier')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="fl">Zone</label><select class="fi" data-sst-field="zone" data-sst-id="${esc(r.id)}">${ZONES.map((z) => `<option${z === r.zone ? ' selected' : ''}>${esc(z)}</option>`).join('')}</select></div>
        <div><label class="fl">Statut</label><select class="fi" data-sst-field="statut" data-sst-id="${esc(r.id)}">${['Ouvert', 'Traitement', 'Clôturé'].map((s) => `<option${s === r.statut ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div style="grid-column:1/-1"><label class="fl">Danger</label><input class="fi" value="${esc(r.danger)}" data-sst-field="danger" data-sst-id="${esc(r.id)}"></div>
        <div style="grid-column:1/-1"><label class="fl">Risque</label><input class="fi" value="${esc(r.risque)}" data-sst-field="risque" data-sst-id="${esc(r.id)}"></div>
        <div><label class="fl">Responsable</label><select class="fi" data-sst-field="resp" data-sst-id="${esc(r.id)}">${RESP_LIST.map((s) => `<option${s === r.resp ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div><label class="fl">Situation</label><select class="fi" data-sst-field="situation" data-sst-id="${esc(r.id)}">${['Normal', 'Anormal', 'Urgence'].map((s) => `<option${s === r.situation ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
      </div>
      ${navBtns()}`;
  } else if (step === 2) {
    const slider = (field, lbl, col, val) => `
      <div style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-weight:600;color:${col}">${lbl}</span><span style="font-family:monospace;font-weight:800;font-size:18px;color:${col}">${val}</span></div>
        <input type="range" class="sst-slider" min="1" max="5" value="${val}" data-sst-range="${field}" data-sst-id="${esc(r.id)}" data-sst-col="${col}">
        <div style="display:flex;justify-content:space-between;font-size:var(--reg-fs-xs);color:var(--muted);margin-top:4px"><span>1 — Min</span><span>5 — Max</span></div>
      </div>`;
    stepBody = `
      ${secTitle('Scores actuels')}
      <div class="reg-score-grid">
        ${[
          ['G', r.g, 'Gravité', '#dc2626', '#fef2f2'],
          ['F', r.f, 'Fréquence', '#ea580c', '#fff7ed'],
          ['D', r.d, 'Détection', '#2563eb', '#eff6ff'],
          ['C', c, 'Criticité', nc.tc, nc.bg],
        ]
          .map(
            ([, v, ll, cl, bg]) =>
              `<div class="reg-score-box" style="background:${bg}"><div class="reg-score-val" style="color:${cl}">${v}</div><div class="reg-meta">${ll}</div></div>`
          )
          .join('')}
      </div>
      <div style="background:${nc.bg};border:1px solid ${nc.bc};border-radius:9px;padding:12px;text-align:center;margin-bottom:16px">
        <span style="font-weight:700;color:${nc.tc}">${nivEmoji(niv)} ${niv.toUpperCase()} — Criticité ${c}</span>
      </div>
      ${secTitle('Ajuster GFDC')}
      ${slider('g', 'Gravité (G)', '#dc2626', r.g)}
      ${slider('f', 'Fréquence (F)', '#ea580c', r.f)}
      ${slider('d', 'Détection (D)', '#2563eb', r.d)}
      ${navBtns()}`;
  } else if (step === 3) {
    const rslider = (field, lbl, col, val) => `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:600;color:${col}">${lbl}</span><span style="font-family:monospace;font-weight:800;font-size:17px;color:${col}">${val}</span></div>
        <input type="range" class="sst-slider" min="1" max="5" value="${val}" data-sst-range="${field}" data-sst-id="${esc(r.id)}" data-sst-col="${col}">
      </div>`;
    stepBody = `
      ${secTitle('Action corrective')}
      <textarea class="fi" rows="4" data-sst-field="action" data-sst-id="${esc(r.id)}" style="margin-bottom:12px">${esc(r.action || '')}</textarea>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div><label class="fl">Responsable action</label><select class="fi" data-sst-field="respAction" data-sst-id="${esc(r.id)}">${RESP_LIST.map((s) => `<option${s === r.respAction ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div><label class="fl">Délai</label><input class="fi" type="date" value="${esc(r.delai || '')}" data-sst-field="delai" data-sst-id="${esc(r.id)}"></div>
      </div>
      ${secTitle('Risque résiduel')}
      <div class="reg-score-grid" style="margin-bottom:12px">
        ${[
          ['G', r.rr_g, '#ea580c', '#fff7ed'],
          ['F', r.rr_f, '#d97706', '#fffbeb'],
          ['D', r.rr_d, '#2563eb', '#eff6ff'],
          ['C', rc, rnc.tc, rnc.bg],
        ]
          .map(
            ([l, v, cl, bg]) =>
              `<div class="reg-score-box" style="background:${bg}"><div class="reg-score-val" style="color:${cl}">${v}</div><div class="reg-meta">${l} rés.</div></div>`
          )
          .join('')}
      </div>
      ${rslider('rr_g', 'Gravité résiduelle', '#ea580c', r.rr_g)}
      ${rslider('rr_f', 'Fréquence résiduelle', '#d97706', r.rr_f)}
      ${rslider('rr_d', 'Détection résiduelle', '#2563eb', r.rr_d)}
      <div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:8px;padding:10px;text-align:center;margin-bottom:12px">
        <span style="font-weight:700;color:${rnc.tc}">${nivEmoji(rniv)} ${rniv} — Risque résiduel ${rc}</span>
      </div>
      ${navBtns()}`;
  } else if (step === 4) {
    const pct = c ? Math.round((1 - rc / c) * 100) : 0;
    stepBody = `
      ${secTitle('Récapitulatif')}
      <div style="background:#f8fafc;border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px">
        ${[
          ['Risque', `${r.danger} — ${r.risque}`],
          ['Zone', r.zone],
          ['Niveau initial', `${niv} (${c})`],
          ['Niveau résiduel', `${rniv} (${rc})`],
          ['Action', r.action || '—'],
          ['Responsable', r.respAction || '—'],
          ['Délai', r.delai || '—'],
        ]
          .map(
            ([k, v]) =>
              `<div class="drow" style="padding:5px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:var(--reg-fs-sm);max-width:62%;text-align:right">${esc(v)}</span></div>`
          )
          .join('')}
      </div>
      <div style="display:flex;align-items:center;gap:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:12px;margin-bottom:14px">
        <span style="font-size:26px">✅</span>
        <div><div style="font-weight:700;color:#065f46">Réduction confirmée</div>
        <div class="reg-meta">Initial <b>${c}</b> → Résiduel <b style="color:var(--green)">${rc}</b> (${pct}%)</div></div>
      </div>
      ${navBtns(`<button type="button" class="btn bsm bp" data-sst-step="5">✓ Valider et clôturer →</button>`)}`;
  } else {
    stepBody = `
      <div style="text-align:center;padding:24px 16px">
        <div style="width:64px;height:64px;border-radius:50%;background:#f0fdf4;border:3px solid var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:28px">✅</div>
        <div class="reg-panel-title" style="margin-bottom:6px">Fiche validée et clôturée</div>
        <div class="reg-meta" style="margin-bottom:18px">${esc(r.id)} — ${esc(r.danger)}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left;margin-bottom:16px">
          ${[
            ['Zone', r.zone],
            ['Danger', r.danger],
            ['Risque initial', `${niv} (${c})`],
            ['Risque résiduel', `${rniv} (${rc})`],
            ['Action', r.action || '—'],
            ['Responsable', r.respAction || '—'],
          ]
            .map(
              ([k, v]) =>
                `<div style="background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px"><div class="fl">${k}</div><div style="font-weight:600;color:var(--navy)">${esc(v)}</div></div>`
            )
            .join('')}
        </div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          <button type="button" class="btn bsm" data-sst-reopen="${esc(r.id)}">← Rouvrir</button>
          <button type="button" class="btn bsm" data-sst-toast="pdf">📄 PDF</button>
          <button type="button" class="btn bsm bp" data-sst-toast="email">📧 Email</button>
        </div>
      </div>`;
  }

  return `
    <div class="reg-panel-head">
      <div>
        <div class="reg-panel-title">${esc(r.id)} — ${esc(r.danger)}</div>
        <div class="reg-meta">${esc(r.zone)} · ${esc(r.unite)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="niv-pill" style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc}">${nivEmoji(niv)} ${niv.toUpperCase()}</span>
        <button type="button" class="btn bsm" style="color:var(--red);border-color:#fecaca" data-sst-delete="${esc(r.id)}">Supprimer</button>
      </div>
    </div>
    <div class="reg-step-bar">${stepsHtml}</div>
    <div class="reg-panel-body">${stepBody}</div>`;
}

export function renderSecRisques() {
  seedSstRisks();
  const f = window._sstFilter || {};
  const rows = filteredRisks();
  const { cells, statsHtml } = buildHeatmap();
  const countLabel =
    rows.length < window.sst_risks.length ? `${rows.length}/${window.sst_risks.length} risques` : `${window.sst_risks.length} risques`;

  if (!bound) {
    bindSecRisques();
    bound = true;
  }

  window.sstRefresh = refreshSstRisques;
  window.sstNewRisk = () => {
    const id = `R-${String(window.sst_risks.length + 1).padStart(3, '0')}`;
    window.sst_risks.push({
      id,
      zone: 'Atelier usinage',
      unite: '—',
      processus: '—',
      danger: 'Nouveau danger',
      risque: 'Nouveau risque',
      dommage: '—',
      personnes: '—',
      situation: 'Normal',
      g: 3,
      f: 3,
      d: 3,
      action: '',
      respAction: 'HSE',
      delai: '',
      resp: 'HSE',
      statut: 'Ouvert',
      rr_g: 2,
      rr_f: 2,
      rr_d: 2,
    });
    window.sst_selectedId = id;
    window.sst_step = 1;
    sstToast(`Risque ${id} créé — Complétez la fiche`, '#16a34a');
    refreshSstRisques();
  };

  const gfFilter = f.gf ? `<span class="sst-filter-chip" style="background:#eff6ff;color:#1d4ed8">G${f.gf.g}×F${f.gf.f}</span>` : '';

  return `
  <div class="xm-register sec-sst-modern" data-page="sec-risques">
    <div class="sst-layout">
      <div class="sst-left">
        <header class="sst-hero">
          <div class="sst-hero-inner">
            <div>
              <h2>${renderIcon('hardhat', { size: 20 })} Risques SST</h2>
              <p>Évaluation GFDC · ISO 45001 · Registre des dangers</p>
            </div>
            <div class="sst-hero-actions">
              <button type="button" class="btn bsm bp" data-sst-new>+ Nouveau risque</button>
              <button type="button" class="btn bsm" data-sst-export>Export CSV</button>
            </div>
          </div>
        </header>
        <div class="sst-kpi-strip">${buildRiskKpis()}</div>
        <div class="sst-filters-modern">
          ${renderIcon('search', { size: 16 })}
          <input class="fi" data-sst-filter="q" placeholder="Rechercher danger, risque, ID…" value="${esc(f.q || '')}" style="flex:1;min-width:140px">
          <select class="sel" data-sst-filter="zone">
            <option value="">Toutes zones</option>
            ${ZONES.map((z) => `<option value="${esc(z)}"${f.zone === z ? ' selected' : ''}>${esc(z)}</option>`).join('')}
          </select>
          <select class="sel" data-sst-filter="niv">
            <option value="">Tous niveaux</option>
            ${['Critique', 'Élevé', 'Moyen', 'Faible'].map((n) => `<option value="${n}"${f.niv === n ? ' selected' : ''}>${n}</option>`).join('')}
          </select>
          <select class="sel" data-sst-filter="stat">
            <option value="">Tous statuts</option>
            ${['Ouvert', 'Traitement', 'Clôturé'].map((s) => `<option value="${s}"${f.stat === s ? ' selected' : ''}>${s}</option>`).join('')}
          </select>
          <button type="button" class="btn bsm" data-sst-clear-filter>Effacer</button>
          ${gfFilter}
          <span class="reg-meta" id="sst_count" style="margin-left:auto">${esc(countLabel)}</span>
        </div>
        <div class="sst-list-scroll">
          ${buildRiskCards(rows)}
          <details class="sst-heatmap-panel" style="margin-top:14px">
            <summary class="sst-heatmap-toggle">
              <span>${renderIcon('chart', { size: 16 })} Matrice de criticité G × F</span>
              <span class="reg-meta">Cliquer une cellule pour filtrer</span>
            </summary>
            <div class="sst-heatmap-body">
              <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
                <div style="display:flex;align-items:flex-end;gap:6px">
                  <div style="display:flex;flex-direction:column;justify-content:space-between;height:178px;margin-right:4px">
                    ${[5, 4, 3, 2, 1].map((v) => `<div class="reg-meta">F=${v}</div>`).join('')}
                  </div>
                  <div>
                    <div style="display:grid;grid-template-columns:repeat(5,34px);grid-template-rows:repeat(5,34px);gap:3px">${cells}</div>
                    <div style="display:flex;justify-content:space-between;width:178px;margin-top:4px">
                      ${[1, 2, 3, 4, 5].map((v) => `<div class="reg-meta" style="width:34px;text-align:center">G=${v}</div>`).join('')}
                    </div>
                  </div>
                </div>
                <div style="flex:1;min-width:180px">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${statsHtml}</div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
      <div class="sst-right" id="sst_right">${buildRightPanel()}</div>
    </div>
  </div>`;
}

function sstUpdate(id, field, val) {
  const r = window.sst_risks.find((x) => x.id === id);
  if (!r) return;
  const numFields = ['g', 'f', 'd', 'rr_g', 'rr_f', 'rr_d'];
  r[field] = numFields.includes(field) ? +val : val;
  refreshSstRisques();
}

function bindSecRisques() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="sec-risques"]');
    if (!root) return;

    const sel = e.target.closest('[data-sst-select]');
    if (sel) {
      const id = sel.dataset.sstSelect;
      window.sst_selectedId = id;
      window.sst_step = 1;
      const r = window.sst_risks.find((x) => x.id === id);
      if (r?.statut === 'Clôturé') window.sst_step = 5;
      else if (r?.statut === 'Traitement') window.sst_step = 3;
      refreshSstRisques();
      return;
    }

    const stepBtn = e.target.closest('[data-sst-step]');
    if (stepBtn) {
      const step = +stepBtn.dataset.sstStep;
      const r = window.sst_risks.find((x) => x.id === window.sst_selectedId);
      if (!r) return;
      if (step === 3 && r.statut === 'Ouvert') sstUpdate(r.id, 'statut', 'Traitement');
      if (step === 5) {
        sstUpdate(r.id, 'statut', 'Clôturé');
        sstToast('Fiche clôturée avec succès', '#16a34a');
      }
      window.sst_step = step;
      refreshSstRisques();
      return;
    }

    if (e.target.closest('[data-sst-new]')) {
      window.sstNewRisk?.();
      return;
    }

    const hm = e.target.closest('[data-sst-heatmap]');
    if (hm) {
      const [g, f] = hm.dataset.sstHeatmap.split(',').map(Number);
      window._sstFilter = { ...(window._sstFilter || {}), gf: { g, f } };
      const n = window.sst_risks.filter((r) => r.g === g && r.f === f).length;
      sstToast(`Filtre G=${g} × F=${f} — ${n} risque(s)`, '#2563eb');
      refreshSstRisques();
      return;
    }

    const del = e.target.closest('[data-sst-delete]');
    if (del && confirm(`Supprimer le risque ${del.dataset.sstDelete} ?`)) {
      window.sst_risks = window.sst_risks.filter((r) => r.id !== del.dataset.sstDelete);
      window.sst_selectedId = null;
      sstToast('Risque supprimé', '#dc2626');
      refreshSstRisques();
      return;
    }

    const reopen = e.target.closest('[data-sst-reopen]');
    if (reopen) {
      sstUpdate(reopen.dataset.sstReopen, 'statut', 'Traitement');
      window.sst_step = 3;
      refreshSstRisques();
      return;
    }

    if (e.target.closest('[data-sst-export]')) {
      exportRisksCsv();
      sstToast('Export CSV téléchargé', '#16a34a');
      return;
    }

    const toast = e.target.closest('[data-sst-toast]');
    if (toast) {
      const m = { pdf: ['Rapport PDF généré', '#16a34a'], email: ['Fiche envoyée', '#16a34a'] };
      const [msg, c] = m[toast.dataset.sstToast] || ['OK', '#2563eb'];
      sstToast(msg, c);
      return;
    }

    if (e.target.closest('[data-sst-clear-filter]')) {
      window._sstFilter = { zone: '', niv: '', stat: '', q: '', gf: null };
      refreshSstRisques();
    }
  });

  document.addEventListener('change', (e) => {
    if (!e.target.closest('[data-page="sec-risques"]')) return;
    const fl = e.target.closest('[data-sst-filter]');
    if (fl) {
      const key = fl.dataset.sstFilter;
      window._sstFilter = window._sstFilter || {};
      window._sstFilter[key] = fl.value;
      if (key !== 'q') window._sstFilter.gf = null;
      refreshSstRisques();
      return;
    }
    const field = e.target.closest('[data-sst-field]');
    if (field) {
      sstUpdate(field.dataset.sstId, field.dataset.sstField, field.value);
    }
  });

  document.addEventListener('input', (e) => {
    const range = e.target.closest('[data-sst-range]');
    if (!range || !range.closest('[data-page="sec-risques"]')) return;
    const col = range.dataset.sstCol;
    const pct = ((+range.value - 1) / 4) * 100;
    range.style.background = `linear-gradient(to right,${col} 0%,${col} ${pct}%,#e5e7eb ${pct}%)`;
    sstUpdate(range.dataset.sstId, range.dataset.sstRange, range.value);
  });
}
