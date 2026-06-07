/**
 * Workflow documentaire ISO — validation et approbation.
 */
import { ISO_WORKFLOW_STEPS, getWorkflowDocs } from './doc-iso.js';
import { DOC_STATUS_COLORS } from './doc-store.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

export function renderDocWorkflowPage() {
  const wfDocs = getWorkflowDocs();
  const stepsHtml = ISO_WORKFLOW_STEPS.map((s, i) => {
    const color = ['#64748b', '#f59e0b', '#2563eb', '#16a34a', '#0891b2', '#7c3aed', '#94a3b8'][i];
    return `<div style="display:flex;align-items:center;flex:1;min-width:90px">
      <div style="flex:1;text-align:center;padding:8px 4px;background:${color}18;border-radius:8px;border:1px solid ${color}30">
        <div style="font-size:18px;margin-bottom:3px">${s.icon}</div>
        <div style="font-size:9px;font-weight:700;color:${color}">${esc(s.label)}</div>
      </div>
      ${i < ISO_WORKFLOW_STEPS.length - 1 ? '<div style="width:16px;height:2px;background:#e2e8f0;flex-shrink:0"></div>' : ''}
    </div>`;
  }).join('');

  const docsHtml =
    wfDocs.length === 0
      ? '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px">Aucun document en cours de validation</div>'
      : wfDocs
          .map((d) => {
            const sc = DOC_STATUS_COLORS[d.statut] || '#94a3b8';
            const pct = Math.round(((d.wfStep || 1) / 7) * 100);
            return `<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <div style="font-size:12px;font-weight:700;color:#0f172a">${esc(d.titre)}</div>
          <div style="font-size:10px;color:#94a3b8">${esc(d.code || d.id)} · ${esc(d.type)} · ${esc(d.version)}</div>
          <span style="font-size:9px;font-weight:700;background:${sc}18;color:${sc};padding:2px 8px;border-radius:12px;margin-top:4px;display:inline-block">${esc(d.statut)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="background:#e2e8f0;border-radius:20px;height:6px;width:100px;overflow:hidden">
            <div style="background:#0284c7;width:${pct}%;height:100%;border-radius:20px"></div>
          </div>
          <span style="font-size:9px;color:#64748b">Étape ${d.wfStep || 1}/7</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" onclick="docAdvanceWorkflow('${d.id}')" class="btn bsm" style="background:#eff6ff;color:#2563eb;border-color:#93c5fd">▶ Étape</button>
          <button type="button" onclick="docValidate('${d.id}')" class="btn bsm" style="background:#f0fdf4;color:#16a34a;border-color:#86efac">✅ Approuver</button>
          <button type="button" onclick="docReject('${d.id}')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Rejeter</button>
          <button type="button" onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁 Voir</button>
        </div>
      </div>`;
          })
          .join('');

  return `
  <div class="card" style="margin-bottom:12px">
    <div class="ch">
      <span class="ct">⇄ Workflow documentaire ISO</span>
      <span style="font-size:10px;color:#94a3b8">${wfDocs.length} document(s) en cours</span>
    </div>
    <p style="font-size:11px;color:#64748b;margin-bottom:14px;padding:0 2px">
      Création → Révision → Approbation → Publication → Distribution → Mise à jour → Archivage.
      Chaque action est tracée dans le journal du document.
    </p>
    <div style="display:flex;align-items:center;gap:0;margin-bottom:20px;overflow-x:auto;padding-bottom:4px">${stepsHtml}</div>
    <div style="display:flex;flex-direction:column;gap:8px">${docsHtml}</div>
  </div>`;
}
