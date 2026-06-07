/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_workflow() {

  var D=window.DOC_DATA||[];
  var wfDocs=D.filter(function(d){return d.statut==='En validation'||d.statut==='Brouillon';});
  var WF_STEPS=['Rédaction','Relecture','Révision','Approbation','Validation','Publication','Archivage'];
  var WF_COLORS=['#64748b','#f59e0b','#f59e0b','#2563eb','#16a34a','#0891b2','#94a3b8'];
  return `
  <div class="card" style="margin-bottom:12px">
    <div class="ch"><span class="ct">⇄ Workflow de validation</span><span style="font-size:10px;color:#94a3b8">${wfDocs.length} document(s) en cours</span></div>
    <div style="display:flex;align-items:center;gap:0;margin-bottom:16px;overflow-x:auto">
      ${WF_STEPS.map((s,i)=>`
      <div style="display:flex;align-items:center;flex:1;min-width:100px">
        <div style="flex:1;text-align:center;padding:8px 4px;background:${WF_COLORS[i]}18;border-radius:8px;border:1px solid ${WF_COLORS[i]}30">
          <div style="font-size:18px;margin-bottom:3px">${['📝','👁','🔄','✅','✔','📢','🗄'][i]}</div>
          <div style="font-size:9px;font-weight:700;color:${WF_COLORS[i]}">${s}</div>
        </div>
        ${i<WF_STEPS.length-1?`<div style="width:24px;height:2px;background:#e2e8f0;flex-shrink:0"></div>`:''}
      </div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${wfDocs.length===0?'<div style="padding:20px;text-align:center;color:#94a3b8;font-size:11px">Aucun document en cours de validation</div>':
      wfDocs.map(d=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
        <div style="flex:1">
          <div style="font-size:11px;font-weight:700;color:#0f172a">${d.titre}</div>
          <div style="font-size:9.5px;color:#94a3b8">${d.id} · ${d.type} · Étape ${d.wfStep||1}/${WF_STEPS.length}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="background:#e2e8f0;border-radius:20px;height:6px;width:100px;overflow:hidden">
            <div style="background:#2563eb;width:${Math.round(((d.wfStep||1)/WF_STEPS.length)*100)}%;height:100%;border-radius:20px"></div>
          </div>
          <button onclick="docValidate('${d.id}')" class="btn bsm" style="background:#f0fdf4;color:#16a34a;border-color:#86efac">✅ Valider</button>
          <button onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁 Voir</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;

}
