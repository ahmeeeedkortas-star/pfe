/**
 * sec-checklists — grille dynamique depuis CL_DATA.
 */
import { SEC_CHECKLIST_CONFIGS } from '../../data/sec-checklist-configs.js';
import { ensureSecData, getSecKpiMetrics } from '../../data/sec-metrics.js';
import { clScore } from '../../components/qhse/dynamic-checklist.js';
import { renderChecklistHeaderIcon } from '../../components/icons/checklist-icons.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function statutStyle(statut, pct, non) {
  if (statut === 'Validé' || statut === 'validé') {
    return { bg: '#f0fdf4', bc: '#bbf7d0', c: 'var(--green)', label: 'Validé' };
  }
  if (non > 0 || statut === 'NC') {
    return { bg: '#fff7ed', bc: '#fed7aa', c: 'var(--orange)', label: 'NC détectées' };
  }
  if (pct >= 70) {
    return { bg: '#eff6ff', bc: '#bfdbfe', c: 'var(--blue)', label: 'En cours' };
  }
  return { bg: '#f9fafb', bc: '#e5e7eb', c: 'var(--muted)', label: 'À faire' };
}

function clCard({ key, cfg, score, page, statut, isCustom, isHub }) {
  const st = statutStyle(statut, score.pct, score.non);
  const freq = cfg.subtitle?.match(/·\s*([^·]+)\s*·/)?.[1]?.trim() || '—';
  const btnLabel = isHub ? 'Gérer les équipements' : score.pct > 0 && score.pct < 100 ? 'Continuer' : 'Démarrer';
  const delBtn = isCustom
    ? `<button type="button" class="btn bsm" style="font-size:9px;color:var(--red)" onclick="deleteCL('${key}')">Suppr.</button>`
    : '';
  const templateKey = page?.replace(/^sec-cl-/, '') || '';
  const equipPage = templateKey ? `sec-cl-${templateKey}-equip` : page;
  const openOnclick = isHub
    ? `goPage('${equipPage}')`
    : isCustom
      ? `window.currentCustomCL='${key}';goPage('sec-cl-custom')`
      : `goPage('${page}')`;

  return `<div class="card" style="padding:0;overflow:hidden" onmouseover="this.style.boxShadow='0 5px 18px rgba(0,0,0,.09)'" onmouseout="this.style.boxShadow=''">
    <div style="height:4px;background:${cfg.gradient || 'var(--blue)'}"></div>
    <div style="padding:12px;background:${cfg.gradient || 'var(--navy)'};color:#fff;display:flex;align-items:center;gap:10px">
      ${renderChecklistHeaderIcon(key, 24)}
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:12px">${esc(cfg.title)}</div>
        <div style="font-size:9px;opacity:.85">${esc(cfg.code)}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:18px;font-weight:800">${score.pct}%</div>
        <div style="font-size:8px;opacity:.8">score</div>
      </div>
    </div>
    <div style="padding:10px 12px">
      <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">
        <span style="background:${st.bg};color:${st.c};border:1px solid ${st.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${isHub ? esc(statut) : st.label}</span>
        <span style="font-size:9px;color:var(--muted)">${freq}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:8px;font-size:9px;text-align:center">
        <div><b style="color:var(--green)">${score.oui}</b><div style="color:var(--muted)">OK</div></div>
        <div><b style="color:var(--red)">${score.non}</b><div style="color:var(--muted)">NC</div></div>
        <div><b>${score.total}</b><div style="color:var(--muted)">Points</div></div>
      </div>
      <div style="height:5px;background:#e5e7eb;border-radius:3px;margin-bottom:10px;overflow:hidden">
        <div style="width:${score.pct}%;height:100%;background:${st.c};border-radius:3px"></div>
      </div>
      <div style="display:flex;gap:6px">
        <button type="button" class="btn bp bsm" style="flex:1" onclick="event.stopPropagation();${openOnclick}">${btnLabel}</button>
        ${delBtn}
      </div>
    </div>
  </div>`;
}

export function renderSecChecklistsList() {
  ensureSecData();
  const m = getSecKpiMetrics();
  let ncTotal = 0;
  m.clCards.forEach((c) => {
    ncTotal += c.score.non || 0;
  });

  const cards = m.clCards.map((c) =>
    clCard({
      key: c.key,
      cfg: c.cfg,
      score: c.score,
      page: c.page,
      statut: c.statut,
      isCustom: String(c.key).startsWith('custom_'),
      isHub: !!c.isHub,
    })
  );

  const addCard = `<div class="card" style="padding:0;overflow:hidden;border:2px dashed var(--border);display:flex;align-items:center;justify-content:center;min-height:200px;cursor:pointer" onclick="openNewCLModal()">
    <div style="text-align:center;color:var(--muted)">
      <div style="font-size:32px;margin-bottom:6px">+</div>
      <div style="font-weight:600;font-size:12px">Nouvelle checklist</div>
    </div>
  </div>`;

  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[
      ['Total', m.clTotal, 'var(--navy)'],
      ['Validées', m.clValidated, 'var(--green)'],
      ['En cours', Math.max(0, m.clTotal - m.clValidated), 'var(--orange)'],
      ['NC détectées', ncTotal, 'var(--red)'],
    ]
      .map(
        ([l, v, c]) =>
          `<div class="card" style="padding:12px;text-align:center"><div style="font-size:20px;font-weight:800;color:${c}">${v}</div><div style="font-size:10px;color:var(--muted)">${l}</div></div>`
      )
      .join('')}
  </div>

  <div class="card" style="padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
    <div class="ct" style="margin:0;flex:1">✓ Checklists Sécurité</div>
    <button type="button" class="btn" data-nav="sec-cl-registre">📋 Registre des enregistrements</button>
    <button type="button" class="btn bp" onclick="openNewCLModal()">+ Nouvelle checklist</button>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:11px">
    ${cards.join('')}
    ${addCard}
  </div>`;
}
