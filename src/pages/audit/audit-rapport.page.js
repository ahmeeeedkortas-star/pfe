/**
 * Rapport d'audit — synthèse pour l'audit sélectionné.
 */
import { seedAudits } from '../../data/audits.data.js';
import { esc, getAudits, scoreColor, scoreLabel, typeColor } from '../../components/audit/audit-utils.js';

export function renderAuditRapport() {
  seedAudits();
  const D = getAudits();
  if (!window.auditSelected && D[0]) window.auditSelected = D[0].id;
  const a = D.find((x) => x.id === window.auditSelected) || D[0];
  if (!a) return '<div class="card"><p>Aucun audit.</p></div>';

  const tc = typeColor(a.type);
  const sc = scoreColor(a.score);
  const actions = (a.actions || [])
    .map(
      (act, i) =>
        `<div class="audit-action-item"><span class="audit-action-num">${i + 1}</span>${esc(act)}</div>`
    )
    .join('') || '<p style="color:var(--muted)">Aucune action corrective.</p>';

  const options = D.map(
    (x) => `<option value="${esc(x.id)}"${x.id === a.id ? ' selected' : ''}>${esc(x.ref)} — ${esc(x.type)}</option>`
  ).join('');

  return `<div data-page="audit-rapport" class="xm-register xm-register--audit">
    <div class="card" style="margin-bottom:12px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <label class="fl" style="margin:0">Audit</label>
      <select class="sel" data-audit-rapport-select style="min-width:260px">${options}</select>
      <button type="button" class="btn bsm" data-nav="audit-check">← Checklist</button>
      <button type="button" class="btn bsm bp" data-nav="audit-cloture">Valider le rapport →</button>
    </div>
    <div class="card audit-detail-panel" style="padding:0;overflow:hidden">
      <div class="audit-detail-head" style="background:linear-gradient(135deg,${tc},${tc}99)">
        <div>
          <div style="font-size:var(--fs-xl);font-weight:800">Rapport — ${esc(a.ref)}</div>
          <div style="opacity:.9;margin-top:4px">${esc(a.type)} · ${esc(a.dep)} · ${esc(a.aud)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:32px;font-weight:800">${a.score != null ? a.score + '%' : '—'}</div>
          <div style="font-size:var(--fs-sm)">${scoreLabel(a.score)}</div>
        </div>
      </div>
      <div style="padding:18px">
        <div class="audit-info-grid" style="margin-bottom:14px">${[
          ['Période', `${a.date || '—'} → ${a.dateFin || '—'}`],
          ['Périmètre', a.scope],
          ['Statut', a.statut],
          ['Écarts constatés', String(a.ecarts ?? 0)],
          ['Avancement', (a.prog ?? 0) + '%'],
          ['Priorité', a.priorite],
        ]
          .map(
            ([k, v]) =>
              `<div class="audit-info-cell"><div class="fl">${k}</div><div style="font-weight:600">${esc(v)}</div></div>`
          )
          .join('')}</div>
        <div class="audit-obs-box" style="margin-bottom:14px"><div class="fl" style="margin-bottom:6px">Constats / Observations</div>${esc(a.obs || 'RAS — aucune observation majeure.')}</div>
        <div class="audit-actions-box"><div class="fl" style="margin-bottom:8px">Plan d'actions correctives</div>${actions}</div>
        <p style="font-size:var(--fs-sm);color:var(--muted);margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
          Rapport généré pour XPERT MECA — SMQ ISO 9001. Validation finale via la page Clôture audit.
        </p>
      </div>
    </div>
  </div>`;
}

let bound = false;
export function bindAuditRapport() {
  if (bound) return;
  bound = true;
  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-audit-rapport-select]');
    if (!sel) return;
    window.auditSelected = sel.value;
    window.reloadPage?.('audit-rapport') ?? window.goPage?.('audit-rapport');
  });
}
