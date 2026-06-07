/**
 * env-aspects — Registre aspects environnementaux (G×F×C), fiche 5 étapes.
 */
import { seedEnvAspects } from '../../data/env-aspects.data.js';
import {
  esc,
  getScore,
  getNiv,
  getNivC,
  getMaitriseBadgeClass,
  nivEmoji,
  graviteLabel,
  syncAspectNiv,
  refreshEnvAspects,
  aspToast,
  ASP_STEPS,
  ACTIVITES,
  RESP_LIST,
  ENV_ACCENT,
} from '../../components/env/aspect-utils.js';
import { confettiBurst } from '../../app/xm-motion.js';

let bound = false;

function getData() {
  return window.ENV_ASPECTS_DATA || [];
}

function filteredAspects() {
  const f = window._aspFilter || {};
  const q = (f.q || '').toLowerCase();
  return getData().filter((a) => {
    const score = getScore(a);
    const niv = getNiv(score);
    if (f.niv && niv !== f.niv) return false;
    if (f.act && a.activite !== f.act) return false;
    if (f.stat && a.s !== f.stat) return false;
    if (
      q &&
      !a.aspect.toLowerCase().includes(q) &&
      !a.activite.toLowerCase().includes(q) &&
      !a.impact.toLowerCase().includes(q) &&
      !a.id.toLowerCase().includes(q)
    )
      return false;
    return true;
  });
}

function buildKpiStrip() {
  const D = getData();
  const stats = { Critique: 0, Significatif: 0, Modéré: 0, Faible: 0 };
  D.forEach((a) => stats[getNiv(getScore(a))]++);
  const maitrises = D.filter((a) => a.s === 'Maîtrisé').length;
  const eff =
    D.length > 0 ? Math.round(D.reduce((s, a) => s + (+a.actionProg || 0), 0) / D.length) : 0;

  const kpis = [
    ['🔴', stats.Critique, 'Critiques', '#fef2f2', '#991b1b'],
    ['🟠', stats.Significatif, 'Significatifs', '#fff7ed', '#9a3412'],
    ['🟡', stats.Modéré, 'Modérés', '#fffbeb', '#92400e'],
    ['🟢', stats.Faible, 'Faibles', '#f0fdf4', '#065f46'],
    ['✅', `${maitrises}/${D.length}`, 'Maîtrisés', '#f0fdf4', ENV_ACCENT],
    ['📊', `${eff}%`, 'Efficacité PA', '#eff6ff', '#2563eb'],
  ];

  return `<div class="reg-kpi-row env-kpi-row">
    ${kpis
      .map(
        ([ic, v, l, bg, c]) =>
          `<div class="reg-kpi" style="background:${bg}">
            <div style="font-size:16px">${ic}</div>
            <div class="reg-kpi-val" style="color:${c}">${v}</div>
            <div class="reg-kpi-lbl">${l}</div>
          </div>`
      )
      .join('')}
  </div>`;
}

function buildAspectRows(rows) {
  const sel = window.asp_selectedId;
  return rows
    .map((a) => {
      const score = getScore(a);
      const niv = getNiv(score);
      const nc = getNivC(niv);
      const isSel = a.id === sel;
      return `<tr data-asp-select="${esc(a.id)}" class="${isSel ? 'reg-row-sel asp-sel' : ''}" style="cursor:pointer">
        <td class="reg-id env-reg-id" style="border-left:3px solid ${isSel ? ENV_ACCENT : 'transparent'}">${esc(a.id)}</td>
        <td>${esc(a.activite)}</td>
        <td style="font-weight:600">${esc(a.aspect)}</td>
        <td style="color:var(--muted)">${esc(a.impact)}</td>
        <td style="text-align:center"><span class="gfdc-badge gfdc-g">${a.g}</span></td>
        <td style="text-align:center"><span class="gfdc-badge gfdc-f">${a.freq}</span></td>
        <td style="text-align:center"><span class="gfdc-badge gfdc-d">${a.crit}</span></td>
        <td><span style="font-family:monospace;font-weight:800;font-size:var(--reg-fs-sm);color:${nc.tc}">${score}</span></td>
        <td><span class="niv-pill" style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc}">${esc(niv)}</span></td>
        <td>${esc(a.resp)}</td>
        <td><span class="badge ${getMaitriseBadgeClass(a.s)}">${esc(a.s)}</span></td>
        <td><button type="button" class="btn bsm" data-asp-select="${esc(a.id)}">Voir</button></td>
      </tr>`;
    })
    .join('');
}

function stepDots(step, accent) {
  return ASP_STEPS.map((lbl, i) => {
    const n = i + 1;
    const done = n < step;
    const active = n === step;
    const line =
      i > 0
        ? `<div style="flex:1;height:3px;background:${done ? accent : '#e5e7eb'};margin-top:14px"></div>`
        : '';
    return (
      line +
      `<div style="display:flex;flex-direction:column;align-items:center">
        <div class="reg-step-dot" data-asp-step="${n}" style="background:${done ? accent : active ? accent : 'var(--white)'};
          border:2px solid ${done ? accent : active ? accent : '#e5e7eb'};
          color:${done || active ? '#fff' : 'var(--muted)'};
          ${active ? `box-shadow:0 0 0 4px color-mix(in srgb, ${accent} 25%, transparent)` : ''}">${done ? '✓' : n}</div>
        <div class="reg-step-lbl" style="color:${active ? accent : done ? accent : 'var(--muted)'};font-weight:${active || done ? '700' : '400'}">${lbl}</div>
      </div>`
    );
  }).join('');
}

function buildRightPanel() {
  if (!window.asp_selectedId) {
    return `<div class="reg-empty">
      <div class="reg-empty-icon">🌿</div>
      <div class="reg-panel-title">Sélectionner un aspect</div>
      <div class="reg-meta">Cliquez sur une ligne du tableau pour consulter la fiche (évaluation G×F×C, actions, validation).</div>
      <button type="button" class="btn bp env-btn-primary" data-asp-new>+ Nouvel aspect</button>
    </div>`;
  }

  const a = getData().find((x) => x.id === window.asp_selectedId);
  if (!a) return '';
  const score = getScore(a);
  const niv = getNiv(score);
  const nc = getNivC(niv);
  const rScore = (+a.rr_g || 1) * (+a.rr_freq || 1) * (+a.rr_crit || 1);
  const rniv = getNiv(rScore);
  const rnc = getNivC(rniv);
  const step = window.asp_step || 1;
  const accent = ENV_ACCENT;

  const secTitle = (t) => `<div class="reg-sec-title">${t}</div>`;
  const navBtns = (extra) => `<div style="display:flex;gap:10px;padding-top:14px;border-top:1px solid var(--border);margin-top:8px">
    ${step > 1 ? `<button type="button" class="btn bsm" data-asp-step="${step - 1}">← Précédent</button>` : '<span></span>'}
    <div style="flex:1"></div>
    ${extra ||
      (step < 5
        ? `<button type="button" class="btn bsm bp env-btn-primary" data-asp-step="${step + 1}">${
            step === 1 ? '→ Évaluation initiale' : step === 4 ? '✓ Valider la fiche →' : 'Étape suivante →'
          }</button>`
        : '')}
  </div>`;

  let stepBody = '';

  if (step === 1) {
    stepBody = `
      ${secTitle('Identification de l\'aspect')}
      ${[
        ['Activité', a.activite],
        ['Aspect', a.aspect],
        ['Impact', a.impact],
        ['Responsable', a.resp],
        ['Délai', a.delai || '—'],
        ['Maîtrise', a.s],
      ]
        .map(
          ([k, v]) =>
            `<div class="drow" style="padding:6px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:var(--reg-fs-sm);max-width:58%;text-align:right">${esc(v)}</span></div>`
        )
        .join('')}
      ${secTitle('Modifier')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="fl">Activité</label><select class="fi" data-asp-field="activite" data-asp-id="${esc(a.id)}">${ACTIVITES.map((z) => `<option${z === a.activite ? ' selected' : ''}>${esc(z)}</option>`).join('')}</select></div>
        <div><label class="fl">Maîtrise</label><select class="fi" data-asp-field="s" data-asp-id="${esc(a.id)}">${['Maîtrisé', 'En cours', 'À traiter'].map((s) => `<option${s === a.s ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div style="grid-column:1/-1"><label class="fl">Aspect</label><input class="fi" value="${esc(a.aspect)}" data-asp-field="aspect" data-asp-id="${esc(a.id)}"></div>
        <div style="grid-column:1/-1"><label class="fl">Impact</label><input class="fi" value="${esc(a.impact)}" data-asp-field="impact" data-asp-id="${esc(a.id)}"></div>
        <div><label class="fl">Responsable</label><select class="fi" data-asp-field="resp" data-asp-id="${esc(a.id)}">${RESP_LIST.map((s) => `<option${s === a.resp ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div><label class="fl">Délai</label><input class="fi" type="date" value="${esc(a.delai || '')}" data-asp-field="delai" data-asp-id="${esc(a.id)}"></div>
      </div>
      ${navBtns()}`;
  } else if (step === 2) {
    const slider = (field, lbl, col, val, min, max) => `
      <div style="margin-bottom:16px" data-asp-slider-wrap="${field}">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-weight:600;color:${col}">${lbl}</span><span id="asp_live_${field}_${a.id}" style="font-family:monospace;font-weight:800;font-size:18px;color:${col}">${val}</span></div>
        <input type="range" class="sst-slider" min="${min}" max="${max}" value="${val}" data-asp-range="${field}" data-asp-id="${esc(a.id)}" data-asp-col="${col}">
        <div style="display:flex;justify-content:space-between;font-size:var(--reg-fs-xs);color:var(--muted);margin-top:4px"><span>${min}</span><span>${max}</span></div>
      </div>`;
    stepBody = `
      ${secTitle('Scores actuels')}
      <div class="reg-score-grid">
        ${[
          ['G', a.g, 'Gravité', '#dc2626', '#fef2f2'],
          ['F', a.freq, 'Fréquence', '#ea580c', '#fff7ed'],
          ['C', a.crit, 'Critère rév.', '#2563eb', '#eff6ff'],
          ['Score', score, 'Impact', nc.tc, nc.bg],
        ]
          .map(
            ([, v, ll, cl, bg]) =>
              `<div class="reg-score-box" style="background:${bg}"><div class="reg-score-val" style="color:${cl}">${v}</div><div class="reg-meta">${ll}</div></div>`
          )
          .join('')}
      </div>
      <div style="background:${nc.bg};border:1px solid ${nc.bc};border-radius:9px;padding:12px;text-align:center;margin-bottom:16px">
        <span style="font-weight:700;color:${nc.tc}">${nivEmoji(niv)} ${niv.toUpperCase()} — Score ${score} (${graviteLabel(a.g)})</span>
      </div>
      ${secTitle('Ajuster G × F × C')}
      ${slider('g', 'Gravité (G) — 1 Faible · 3 Élevé', '#dc2626', a.g, 1, 3)}
      ${slider('freq', 'Fréquence (F)', '#ea580c', a.freq, 1, 5)}
      ${slider('crit', 'Critère réversibilité (C)', '#2563eb', a.crit, 1, 3)}
      <div id="asp_score_preview_${esc(a.id)}">${scorePreviewHtml(a)}</div>
      ${navBtns()}`;
  } else if (step === 3) {
    const rslider = (field, lbl, col, val, min, max) => `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:600;color:${col}">${lbl}</span><span id="asp_live_${field}_${a.id}" style="font-family:monospace;font-weight:800;font-size:17px;color:${col}">${val}</span></div>
        <input type="range" class="sst-slider" min="${min}" max="${max}" value="${val}" data-asp-range-rr="${field}" data-asp-id="${esc(a.id)}" data-asp-col="${col}">
      </div>`;
    stepBody = `
      ${secTitle('Action de maîtrise')}
      <textarea class="fi" rows="4" data-asp-field="action" data-asp-id="${esc(a.id)}" style="margin-bottom:12px">${esc(a.action || '')}</textarea>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div><label class="fl">Responsable</label><select class="fi" data-asp-field="resp" data-asp-id="${esc(a.id)}">${RESP_LIST.map((s) => `<option${s === a.resp ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div><label class="fl">Délai</label><input class="fi" type="date" value="${esc(a.delai || '')}" data-asp-field="delai" data-asp-id="${esc(a.id)}"></div>
        <div><label class="fl">Avancement %</label><input class="fi" type="number" min="0" max="100" value="${a.actionProg ?? 0}" data-asp-field="actionProg" data-asp-id="${esc(a.id)}"></div>
        <div><label class="fl">Statut action</label><select class="fi" data-asp-field="actionStatut" data-asp-id="${esc(a.id)}">${['À faire', 'En cours', 'Clôturée'].map((s) => `<option${s === a.actionStatut ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
      </div>
      ${secTitle('Impact résiduel estimé')}
      <div class="reg-score-grid" style="margin-bottom:12px">
        ${[
          ['G', a.rr_g, '#ea580c', '#fff7ed'],
          ['F', a.rr_freq, '#d97706', '#fffbeb'],
          ['C', a.rr_crit, '#2563eb', '#eff6ff'],
          ['Score', rScore, rnc.tc, rnc.bg],
        ]
          .map(
            ([l, v, cl, bg]) =>
              `<div class="reg-score-box" style="background:${bg}"><div class="reg-score-val" style="color:${cl}">${v}</div><div class="reg-meta">${l} rés.</div></div>`
          )
          .join('')}
      </div>
      ${rslider('rr_g', 'Gravité résiduelle', '#ea580c', a.rr_g, 1, 3)}
      ${rslider('rr_freq', 'Fréquence résiduelle', '#d97706', a.rr_freq, 1, 5)}
      ${rslider('rr_crit', 'Critère résiduel', '#2563eb', a.rr_crit, 1, 3)}
      <div id="asp_rr_preview_${esc(a.id)}">
        <div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:8px;padding:10px;text-align:center">
          <span style="font-weight:700;color:${rnc.tc}">${nivEmoji(rniv)} ${rniv} — Impact résiduel ${rScore}</span>
        </div>
      </div>
      ${navBtns()}`;
  } else if (step === 4) {
    const pct = score ? Math.round((1 - rScore / score) * 100) : 0;
    stepBody = `
      ${secTitle('Validation')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
        <div style="background:${nc.bg};border:1px solid ${nc.bc};border-radius:10px;padding:14px;text-align:center">
          <div class="fl" style="margin-bottom:6px">Impact initial</div>
          <div class="reg-score-val" style="color:${nc.tc}">${score}</div>
          <div style="font-weight:700;color:${nc.tc};margin-top:6px">${esc(niv)}</div>
        </div>
        <div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:10px;padding:14px;text-align:center">
          <div class="fl" style="margin-bottom:6px">Impact résiduel</div>
          <div class="reg-score-val" style="color:${rnc.tc}">${rScore}</div>
          <div style="font-weight:700;color:${rnc.tc};margin-top:6px">${esc(rniv)}</div>
        </div>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:12px;margin-bottom:14px">
        <div style="font-weight:700;color:#065f46;margin-bottom:8px">Action validée</div>
        ${[
          ['Action', a.action || '—'],
          ['Responsable', a.resp],
          ['Délai', a.delai || '—'],
          ['Avancement', `${a.actionProg ?? 0}% — ${a.actionStatut || '—'}`],
        ]
          .map(
            ([k, v]) =>
              `<div class="drow" style="padding:4px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:var(--reg-fs-sm)">${esc(v)}</span></div>`
          )
          .join('')}
      </div>
      <p class="reg-meta" style="text-align:center;margin-bottom:12px">Réduction estimée : <b style="color:${ENV_ACCENT}">${pct}%</b> — Cliquez sur Valider pour clôturer la fiche.</p>
      ${navBtns(`<button type="button" class="btn bsm bp env-btn-primary" data-asp-step="5">✓ Valider et clôturer →</button>`)}`;
  } else {
    stepBody = `
      <div style="text-align:center;padding:24px 16px">
        <div style="width:64px;height:64px;border-radius:50%;background:#f0fdf4;border:3px solid ${ENV_ACCENT};display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:28px">🌿</div>
        <div class="reg-panel-title" style="margin-bottom:6px">Aspect maîtrisé !</div>
        <div class="reg-meta" style="margin-bottom:18px">Fiche ${esc(a.id)} validée et clôturée</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left;margin-bottom:16px">
          ${[
            ['Aspect', a.aspect],
            ['Impact', a.impact],
            ['Score initial', `${niv} (${score})`],
            ['Score résiduel', `${rniv} (${rScore})`],
            ['Action', a.action || '—'],
            ['Responsable', a.resp],
          ]
            .map(
              ([k, v]) =>
                `<div style="background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px"><div class="fl">${k}</div><div style="font-weight:600;color:var(--navy)">${esc(v)}</div></div>`
            )
            .join('')}
        </div>
        <button type="button" class="btn bsm env-btn-primary" data-asp-step="1">← Rouvrir la fiche</button>
      </div>`;
  }

  return `
    <div class="reg-panel-head">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <span style="width:10px;height:10px;border-radius:50%;background:${ENV_ACCENT};margin-top:6px;flex-shrink:0"></span>
        <div>
          <div class="reg-panel-title">${esc(a.aspect)}</div>
          <div class="reg-meta">${esc(a.id)} · ${esc(a.activite)} · ${esc(niv)}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="niv-pill" style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc}">${nivEmoji(niv)} ${niv}</span>
        <button type="button" class="btn bsm" style="color:var(--red);border-color:#fecaca" data-asp-delete="${esc(a.id)}">Supprimer</button>
      </div>
    </div>
    <div class="reg-step-bar">${stepDots(step, accent)}</div>
    <div class="reg-panel-body">${stepBody}</div>`;
}

export function renderEnvAspects() {
  seedEnvAspects();
  const f = window._aspFilter || {};
  const rows = filteredAspects();
  const D = getData();
  const countLabel =
    rows.length < D.length ? `${rows.length}/${D.length} aspects` : `${D.length} aspects`;

  if (!bound) {
    bindEnvAspects();
    bound = true;
  }

  window.aspRefresh = refreshEnvAspects;
  window.aspFilter = () => refreshEnvAspects();

  window.aspSelect = (id) => {
    window.asp_selectedId = id;
    window.asp_step = 1;
    const a = getData().find((x) => x.id === id);
    if (a?.s === 'Maîtrisé' && a.actionStatut === 'Clôturée') window.asp_step = 5;
    else if (a?.s === 'En cours') window.asp_step = 3;
    refreshEnvAspects();
  };

  window.aspGoStep = (step) => {
    const a = getData().find((x) => x.id === window.asp_selectedId);
    if (!a) return;
    if (step === 5) {
      a.s = 'Maîtrisé';
      a.actionStatut = 'Clôturée';
      a.actionProg = 100;
      syncAspectNiv(a);
      aspToast('Aspect maîtrisé !', ENV_ACCENT);
      const rp = document.getElementById('asp_right');
      if (rp) confettiBurst(rp.getBoundingClientRect().left + 80, rp.getBoundingClientRect().top + 40, 24);
    }
    window.asp_step = step;
    refreshEnvAspects();
  };

  window.aspUpdate = aspUpdate;
  window.aspDelete = (id) => {
    if (!confirm("Supprimer l'aspect " + id + ' ?')) return;
    window.ENV_ASPECTS_DATA = getData().filter((r) => r.id !== id);
    window.asp_selectedId = null;
    aspToast('Aspect supprimé', '#dc2626');
    refreshEnvAspects();
  };

  window.aspNewAspect = () => {
    const n = D.length + 1;
    const id = `ASP-${String(n).padStart(3, '0')}`;
    const item = syncAspectNiv({
      id,
      activite: 'Usinage CN',
      aspect: 'Nouvel aspect',
      impact: '—',
      g: 2,
      freq: 3,
      crit: 2,
      s: 'À traiter',
      action: '',
      resp: 'HSE',
      delai: '',
      actionProg: 0,
      actionStatut: 'À faire',
      rr_g: 1,
      rr_freq: 2,
      rr_crit: 1,
    });
    window.ENV_ASPECTS_DATA.push(item);
    window.asp_selectedId = id;
    window.asp_step = 1;
    aspToast(`Aspect ${id} créé`, ENV_ACCENT);
    refreshEnvAspects();
  };

  window.aspLive = (id, field, val) => {
    aspUpdate(id, field, val);
  };

  window.aspLiveRR = (id, field, val) => {
    aspUpdate(id, field, val);
  };

  const acts = [...new Set(D.map((a) => a.activite))];

  setTimeout(() => {
    const rp = document.getElementById('asp_right');
    if (rp) rp.innerHTML = buildRightPanel();
  }, 0);

  return `
  <div class="xm-register xm-register--env" data-page="env-aspects">
    ${buildKpiStrip()}
    <div class="asp-layout sst-layout">
      <div class="asp-left sst-left">
        <div class="asp-filter-bar sst-filter-bar">
          <select class="sel" data-asp-filter="niv">
            <option value="">Criticité : Toutes</option>
            ${['Critique', 'Significatif', 'Modéré', 'Faible'].map((n) => `<option value="${n}"${f.niv === n ? ' selected' : ''}>${n}</option>`).join('')}
          </select>
          <select class="sel" data-asp-filter="act">
            <option value="">Activité : Toutes</option>
            ${acts.map((z) => `<option value="${esc(z)}"${f.act === z ? ' selected' : ''}>${esc(z)}</option>`).join('')}
          </select>
          <select class="sel" data-asp-filter="stat">
            <option value="">Maîtrise : Toutes</option>
            ${['Maîtrisé', 'En cours', 'À traiter'].map((s) => `<option value="${s}"${f.stat === s ? ' selected' : ''}>${s}</option>`).join('')}
          </select>
          <input class="sel" data-asp-filter="q" placeholder="Rechercher aspect, activité…" value="${esc(f.q)}" style="min-width:200px">
          <button type="button" class="btn bsm" data-asp-clear-filter>Effacer</button>
          <span class="reg-meta" id="asp_count">${esc(countLabel)}</span>
          <div style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap">
            ${[
              ['Critique (≥24)', '#fef2f2', '#991b1b'],
              ['Significatif (12–23)', '#fff7ed', '#9a3412'],
              ['Modéré (6–11)', '#fffbeb', '#92400e'],
              ['Faible (<6)', '#f0fdf4', '#065f46'],
            ]
              .map(
                ([l, bg, c]) =>
                  `<span style="background:${bg};color:${c};padding:4px 10px;border-radius:5px;font-size:var(--reg-fs-xs);font-weight:700">${l}</span>`
              )
              .join('')}
          </div>
        </div>
        <div class="asp-table-area sst-table-area">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <span class="reg-title">🌿 Registre des aspects environnementaux — ISO 14001</span>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn bsm bp env-btn-primary" data-asp-new>+ Nouvel aspect</button>
              <button type="button" class="btn bsm" data-asp-toast="export">Export</button>
            </div>
          </div>
          <table class="tbl">
            <thead><tr>
              <th>ID</th><th>Activité</th><th>Aspect</th><th>Impact</th>
              <th style="text-align:center">G</th><th style="text-align:center">F</th><th style="text-align:center">C</th>
              <th>Score</th><th>Criticité</th><th>Resp.</th><th>Maîtrise</th><th></th>
            </tr></thead>
            <tbody>${buildAspectRows(rows)}</tbody>
          </table>
        </div>
      </div>
      <div class="asp-right sst-right" id="asp_right"></div>
    </div>
  </div>`;
}

function aspUpdate(id, field, val) {
  const a = getData().find((x) => x.id === id);
  if (!a) return;
  const numFields = ['g', 'freq', 'crit', 'rr_g', 'rr_freq', 'rr_crit', 'actionProg'];
  a[field] = numFields.includes(field) ? +val : val;
  syncAspectNiv(a);
  refreshEnvAspects();
}

function scorePreviewHtml(a) {
  const score = getScore(a);
  const niv = getNiv(score);
  const nc = getNivC(niv);
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px;padding:12px;background:${nc.bg};border:1px solid ${nc.bc};border-radius:9px">
    ${[
      ['G', a.g, '#dc2626'],
      ['F', a.freq, '#ea580c'],
      ['C', a.crit, '#2563eb'],
      ['Score', score, nc.tc],
    ]
      .map(
        ([l, v, cl]) =>
          `<div style="text-align:center"><div style="font-size:20px;font-weight:800;color:${cl};font-family:monospace">${v}</div><div class="reg-meta">${l}</div></div>`
      )
      .join('')}
    <div style="grid-column:1/-1;text-align:center;font-weight:700;color:${nc.tc};padding-top:8px;border-top:1px solid ${nc.bc}">${nivEmoji(niv)} ${niv} — Score ${score}</div>
  </div>`;
}

function bindEnvAspects() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="env-aspects"]');
    if (!root) return;

    const sel = e.target.closest('[data-asp-select]');
    if (sel) {
      const id = sel.dataset.aspSelect;
      window.asp_selectedId = id;
      window.asp_step = 1;
      const a = getData().find((x) => x.id === id);
      if (a?.s === 'Maîtrisé' && a.actionStatut === 'Clôturée') window.asp_step = 5;
      else if (a?.s === 'En cours') window.asp_step = 3;
      refreshEnvAspects();
      return;
    }

    const stepBtn = e.target.closest('[data-asp-step]');
    if (stepBtn) {
      const step = +stepBtn.dataset.aspStep;
      const a = getData().find((x) => x.id === window.asp_selectedId);
      if (!a) return;
      if (step === 5) {
        a.s = 'Maîtrisé';
        a.actionStatut = 'Clôturée';
        a.actionProg = 100;
        syncAspectNiv(a);
        aspToast('Aspect maîtrisé !', ENV_ACCENT);
      }
      window.asp_step = step;
      refreshEnvAspects();
      return;
    }

    if (e.target.closest('[data-asp-new]')) {
      window.aspNewAspect?.();
      return;
    }

    const del = e.target.closest('[data-asp-delete]');
    if (del && confirm(`Supprimer l'aspect ${del.dataset.aspDelete} ?`)) {
      window.ENV_ASPECTS_DATA = getData().filter((r) => r.id !== del.dataset.aspDelete);
      window.asp_selectedId = null;
      aspToast('Aspect supprimé', '#dc2626');
      refreshEnvAspects();
      return;
    }

    const toast = e.target.closest('[data-asp-toast]');
    if (toast) {
      aspToast(toast.dataset.aspToast === 'export' ? 'Export Excel en cours…' : 'OK', ENV_ACCENT);
      return;
    }

    if (e.target.closest('[data-asp-clear-filter]')) {
      window._aspFilter = { niv: '', act: '', stat: '', q: '' };
      refreshEnvAspects();
    }
  });

  document.addEventListener('change', (e) => {
    if (!e.target.closest('[data-page="env-aspects"]')) return;
    const fl = e.target.closest('[data-asp-filter]');
    if (fl) {
      window._aspFilter = window._aspFilter || {};
      window._aspFilter[fl.dataset.aspFilter] = fl.value;
      refreshEnvAspects();
      return;
    }
    const field = e.target.closest('[data-asp-field]');
    if (field) {
      aspUpdate(field.dataset.aspId, field.dataset.aspField, field.value);
    }
  });

  document.addEventListener('input', (e) => {
    const range = e.target.closest('[data-asp-range], [data-asp-range-rr]');
    if (!range || !range.closest('[data-page="env-aspects"]')) return;
    const id = range.dataset.aspId;
    const col = range.dataset.aspCol;
    const min = +range.min || 1;
    const max = +range.max || 1;
    const pct = max > min ? ((+range.value - min) / (max - min)) * 100 : 0;
    range.style.background = `linear-gradient(to right,${col} 0%,${col} ${pct}%,#e5e7eb ${pct}%)`;

    const field = range.dataset.aspRange || range.dataset.aspRangeRr;
    const a = getData().find((x) => x.id === id);
    if (!a) return;
    a[field] = +range.value;
    syncAspectNiv(a);

    const lbl = document.getElementById(`asp_live_${field}_${id}`);
    if (lbl) lbl.textContent = range.value;

    if (range.dataset.aspRange) {
      const prev = document.getElementById(`asp_score_preview_${id}`);
      if (prev) prev.innerHTML = scorePreviewHtml(a);
    } else {
      const rScore = (+a.rr_g || 1) * (+a.rr_freq || 1) * (+a.rr_crit || 1);
      const rniv = getNiv(rScore);
      const rnc = getNivC(rniv);
      const prev = document.getElementById(`asp_rr_preview_${id}`);
      if (prev) {
        prev.innerHTML = `<div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:8px;padding:10px;text-align:center;margin-top:12px">
          <span style="font-weight:700;color:${rnc.tc}">${nivEmoji(rniv)} ${rniv} — Impact résiduel ${rScore}</span>
        </div>`;
      }
    }
  });
}
