/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_valid() {

  var D=window.DOC_DATA||[];
  var toVal=D.filter(function(d){return d.statut==='En validation';});
  return `
  <div class="card">
    <div class="ch"><span class="ct">✔ Documents à valider</span><span style="background:#fef2f2;color:#dc2626;padding:2px 9px;border-radius:5px;font-size:10px;font-weight:700">${toVal.length} en attente</span></div>
    ${toVal.length===0?'<div style="padding:20px;text-align:center;color:#94a3b8;font-size:11px">Aucun document en attente de validation</div>':
    `<div style="display:flex;flex-direction:column;gap:8px">${toVal.map(d=>`
    <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
      <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:#0f172a">${d.titre}</div>
      <div style="font-size:9.5px;color:#92400e">${d.id} · ${d.type} · Responsable : ${d.resp}</div></div>
      <button onclick="docValidate('${d.id}')" class="btn bsm" style="background:#f0fdf4;color:#16a34a;border-color:#86efac">✅ Valider</button>
      <button onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁 Voir</button>
    </div>`).join('')}</div>`}
  </div>`;

}
