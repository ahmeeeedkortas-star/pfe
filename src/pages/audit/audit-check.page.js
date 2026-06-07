/**
 * Checklist audit — 10 critères C / NC / NA, score live.
 */
import { seedAudits } from '../../data/audits.data.js';
import { esc, auditToast, getAudits, scoreColor, scoreLabel } from '../../components/audit/audit-utils.js';

const CRITERIA = [
  'Documentation du processus à jour',
  'Enregistrements disponibles et traçables',
  'Compétences et habilitations du personnel',
  'Maîtrise des équipements et étalonnage',
  'Contrôle des produits non conformes',
  'Actions correctives précédentes efficaces',
  'Indicateurs et objectifs qualité',
  'Communication et sensibilisation',
  'Exigences légales et réglementaires',
  'Satisfaction client et retours',
];

let bound = false;

function loadCheck(key) {
  if (!window.auditCheck) window.auditCheck = {};
  if (!window.auditCheck[key]) window.auditCheck[key] = {};
  return window.auditCheck[key];
}

function computeScore(check) {
  let c = 0;
  let nc = 0;
  let na = 0;
  CRITERIA.forEach((_, i) => {
    const v = check[String(i)];
    if (v === 'C') c++;
    else if (v === 'NC') nc++;
    else if (v === 'NA') na++;
  });
  const denom = CRITERIA.length - na;
  const pct = denom ? Math.round((c / denom) * 100) : 0;
  return { c, nc, na, pct, unanswered: CRITERIA.length - c - nc - na };
}

export function renderAuditCheck() {
  seedAudits();
  const D = getAudits();
  if (!window.auditSelected && D[0]) window.auditSelected = D[0].id;
  const selId = window.auditSelected;
  const key = String(selId);
  const check = loadCheck(key);
  const audit = D.find((a) => a.id === selId);
  const { c, nc, na, pct, unanswered } = computeScore(check);
  const col = scoreColor(pct);
  const sl = scoreLabel(pct);

  if (!bound) {
    bindAuditCheck();
    bound = true;
  }

  const rows = CRITERIA.map((label, i) => {
    const v = check[String(i)];
    const btn = (code, activeBg) =>
      `<button type="button" class="audit-check-btn${v === code ? ' audit-check-btn--on' : ''}" data-audit-check-val data-check-idx="${i}" data-check-code="${code}" style="${v === code ? `background:${activeBg};color:#fff;border-color:${activeBg}` : ''}">${code}</button>`;
    return `<tr>
      <td style="font-weight:600;font-size:var(--fs-sm);max-width:280px">${esc(label)}</td>
      <td style="text-align:center">${btn('C', '#16a34a')}</td>
      <td style="text-align:center">${btn('NC', '#dc2626')}</td>
      <td style="text-align:center">${btn('NA', '#94a3b8')}</td>
    </tr>`;
  }).join('');

  const options = D.map(
    (a) => `<option value="${esc(a.id)}"${a.id === selId ? ' selected' : ''}>${esc(a.ref)} — ${esc(a.type)} (${esc(a.dep)})</option>`
  ).join('');

  return `<div data-page="audit-check" class="xm-register xm-register--audit">
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <label class="fl" style="margin:0">Audit évalué</label>
        <select class="sel" data-audit-check-select style="min-width:280px;font-size:var(--fs-base)">${options}</select>
        <button type="button" class="btn bp bsm" data-audit-check-save>💾 Enregistrer le score</button>
        <button type="button" class="btn bsm" data-nav="audit-liste">← Audits & Planning</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 220px;gap:14px">
      <div class="card">
        <div class="ch"><span class="ct">Grille d'évaluation — ${CRITERIA.length} critères</span></div>
        <table class="tbl"><thead><tr><th>Critère</th><th style="text-align:center">C</th><th style="text-align:center">NC</th><th style="text-align:center">NA</th></tr></thead>
        <tbody>${rows}</tbody></table>
      </div>
      <div>
        <div class="card" style="text-align:center;padding:20px">
          <div style="font-size:42px;font-weight:800;color:${col};line-height:1">${pct}%</div>
          <div style="font-size:var(--fs-sm);color:var(--muted);margin-top:4px">${sl}</div>
          <div style="margin-top:16px;font-size:var(--fs-sm);text-align:left">
            <div class="drow"><span class="dk">Conformes</span><span style="color:#16a34a;font-weight:700">${c}</span></div>
            <div class="drow"><span class="dk">Non-conformes</span><span style="color:#dc2626;font-weight:700">${nc}</span></div>
            <div class="drow"><span class="dk">Non applicables</span><span>${na}</span></div>
            <div class="drow"><span class="dk">Non évalués</span><span>${unanswered}</span></div>
          </div>
          ${audit?.score != null ? `<p style="font-size:var(--fs-xs);color:var(--muted);margin-top:12px">Score enregistré : ${audit.score}%</p>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function bindAuditCheck() {
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="audit-check"]');
    if (!root) return;
    const btn = e.target.closest('[data-audit-check-val]');
    if (btn) {
      const idx = btn.dataset.checkIdx;
      const code = btn.dataset.checkCode;
      const key = String(window.auditSelected);
      const check = loadCheck(key);
      check[idx] = check[idx] === code ? null : code;
      window.reloadPage?.('audit-check') ?? window.goPage?.('audit-check');
      return;
    }
    if (e.target.closest('[data-audit-check-save]')) {
      const key = String(window.auditSelected);
      const { pct } = computeScore(loadCheck(key));
      const a = getAudits().find((x) => x.id === window.auditSelected);
      if (a) {
        a.score = pct;
        if (pct >= 75 && a.statut === 'Planifié') a.statut = 'En cours';
        if (pct >= 90) window.confettiBurst?.(window.innerWidth / 2, 200, 16);
        auditToast(`Score ${pct}% enregistré`, '#16a34a');
      }
      window.reloadPage?.('audit-check') ?? window.goPage?.('audit-check');
    }
  });
  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-audit-check-select]');
    if (!sel?.closest('[data-page="audit-check"]')) return;
    window.auditSelected = sel.value;
    window.reloadPage?.('audit-check') ?? window.goPage?.('audit-check');
  });
}
