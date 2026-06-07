/**
 * Documents & rapports d'audit.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

function statBadge(s) {
  const m = { Validé: 'bg3', 'En cours': 'bb', Brouillon: 'by' };
  return `<span class="badge ${m[s] || 'bb'}">${esc(s)}</span>`;
}

export function renderAuditDocsModern() {
  const docs = window.AUDIT_DOCS_LIST || [];
  const audits = window.AUDIT_PLANS || [];
  const selAudit = window.auditSelAudit || audits[0]?.id || '';

  const auditOpts = audits
    .map((a) => `<option value="${esc(a.id)}"${a.id === selAudit ? ' selected' : ''}>${esc(a.ref)} — ${esc(a.titre.slice(0, 40))}</option>`)
    .join('');

  const rows = docs
    .map((d) => {
      const did = JSON.stringify(d.id);
      return `<tr>
        <td style="font-family:monospace;font-size:10px">${esc(d.id)}</td>
        <td>${esc(d.nom)}</td>
        <td>${esc(d.type)}</td>
        <td>${esc(d.date)}</td>
        <td>${esc(d.auteur)}</td>
        <td>${statBadge(d.statut)}</td>
        <td><div style="display:flex;gap:4px;flex-wrap:wrap">
          <button type="button" class="btn bsm" onclick="auditOpenReportEditor(${did})">✏ Éditer</button>
          <button type="button" class="btn bsm" onclick="auditExportReportPdf('${esc(d.auditId || '')}')">PDF</button>
          <button type="button" class="btn bsm" onclick="auditExportReportWord('${esc(d.auditId || '')}')">Word</button>
        </div></td>
      </tr>`;
    })
    .join('');

  return `<div class="content xm-v11-surface" data-page="audit-docs">
    <div class="card" style="margin-bottom:12px;padding:14px;background:linear-gradient(135deg,#eff6ff,#f0fdf4)">
      <div class="ch"><span class="ct">Génération intelligente de rapport</span></div>
      <p style="font-size:var(--fs-sm);color:var(--muted);margin:0 0 10px">Rapport auto : checklists, constats NC/AC, actions, scores et signatures.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <select id="audit-doc-sel-audit" class="fi" style="min-width:260px" onchange="window.auditSelAudit=this.value">${auditOpts}</select>
        <button type="button" class="btn bsm bp" onclick="auditGenerateReport(document.getElementById('audit-doc-sel-audit').value)">⚡ Générer rapport</button>
        <button type="button" class="btn bsm" onclick="auditExportReportPdf(document.getElementById('audit-doc-sel-audit').value)">PDF</button>
        <button type="button" class="btn bsm" onclick="auditExportReportWord(document.getElementById('audit-doc-sel-audit').value)">Word</button>
        <button type="button" class="btn bsm" onclick="auditAddDoc()">+ Document manuel</button>
      </div>
    </div>
    <div class="card"><div class="ch"><span class="ct">Bibliothèque documentaire audit</span></div>
      <table class="tbl"><thead><tr><th>ID</th><th>Nom</th><th>Type</th><th>Date</th><th>Auteur</th><th>Statut</th><th>Actions</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="7" style="text-align:center;color:var(--muted)">Aucun document</td></tr>'}</tbody></table>
    </div>
  </div>`;
}
