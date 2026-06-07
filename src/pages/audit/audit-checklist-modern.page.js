/**
 * Checklists audit — éditeur dynamique.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

export function renderAuditChecklistModern() {
  const CL = window.AUDIT_CHECKLISTS || [];
  const sel = window.auditSelCL || CL[0]?.id;
  const cl = CL.find((x) => x.id === sel) || CL[0];
  if (!cl) {
    return `<div class="content xm-v11-surface"><div class="card" style="padding:24px;text-align:center">
      <p>Aucune checklist. Créez-en une pour démarrer.</p>
      <button type="button" class="btn bp" onclick="auditNewChecklist()">+ Nouvelle checklist</button>
    </div></div>`;
  }
  window.auditSelCL = cl.id;
  const data = window.AUDIT_CL_DATA?.[cl.id] || {};
  const items = cl.items || [];

  const tplOpts = CL.map(
    (c) => `<option value="${esc(c.id)}"${c.id === cl.id ? ' selected' : ''}>${esc(c.titre)}</option>`
  ).join('');

  const rows = items
    .map((it) => {
      const v = data[it.n];
      const btns = ['C', 'NC', 'OBS', 'NA']
        .map((code) => {
          const active = v === code;
          const col = code === 'C' ? '#16a34a' : code === 'NC' ? '#dc2626' : code === 'OBS' ? '#f59e0b' : '#94a3b8';
          return `<button type="button" class="btn bsm" style="font-size:9px;${active ? `background:${col};color:#fff;border-color:${col}` : ''}" onclick="auditClSet('${cl.id}',${it.n},'${code}')">${code}</button>`;
        })
        .join('');
      return `<tr>
        <td>${it.n}</td>
        <td style="font-weight:600;color:var(--navy)">${esc(it.section)}</td>
        <td style="font-size:var(--fs-xs)">${esc(it.exig)}</td>
        <td style="font-size:var(--fs-sm)">${esc(it.desc)}</td>
        <td><div style="display:flex;gap:3px;flex-wrap:wrap">${btns}</div></td>
        <td><input class="fi" placeholder="Preuve / commentaire" style="font-size:10px;min-width:140px" value="${esc(it.preuve || '')}" onchange="auditClSetComment('${cl.id}',${it.n},this.value)"></td>
      </tr>`;
    })
    .join('');

  const scored = items.filter((it) => data[it.n] === 'C').length;
  const scorePct = items.length ? Math.round((scored / items.length) * 100) : 0;

  return `<div class="content xm-v11-surface" data-page="audit-checklist">
    <div class="filter-bar"><div class="filter-bar-body">
      <select class="filter-sel" onchange="window.auditSelCL=this.value;reloadPage('audit-checklist')">${tplOpts}</select>
      <button type="button" class="btn bsm bp" onclick="auditNewChecklist()">+ Nouvelle checklist</button>
      <button type="button" class="btn bsm" onclick="auditEditChecklist('${esc(cl.id)}')">✏ Modifier structure</button>
      <button type="button" class="btn bsm bg2" onclick="auditGenerateConstatsFromChecklist('${esc(cl.id)}')">Générer constats NC</button>
    </div></div>
    <p class="xm-page-lead" style="margin-bottom:12px">${esc(cl.norme)} · v${esc(cl.version)} · ${items.length} questions · score ${scorePct}%</p>
    <div class="card"><div class="ch"><span class="ct">${esc(cl.titre)}</span></div>
      <p style="font-size:var(--fs-xs);color:var(--muted);margin:0 0 10px">C = Conforme · NC = Non-conformité · OBS = Observation · NA = Non applicable — niveaux ISO</p>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>#</th><th>Section</th><th>Exig.</th><th>Critère / question</th><th>Conformité</th><th>Preuve & commentaire</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
  </div>`;
}
