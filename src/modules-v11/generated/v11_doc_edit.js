import { v11_doc_create } from './v11_doc_create.js';
/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_edit() {

  var D=window.DOC_DATA||[];
  var d=D.find(function(x){return x.id===window.doc_sel;});
  if(!d) return v11_doc_create();
  var DOC_TYPES=['Manuel Qualité','Procédure','Processus','Instruction','Formulaire','Enregistrement','Document technique'];
  var procs=['Management','Qualité','Usinage','Assemblage','Maintenance','Achats','Sécurité','HSE','Production','Commercial'];
  var zones=['Direction','Qualité','Atelier CNC','Assemblage','Magasin','Maintenance','Finition','Bureau technique'];
  return `
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">← Annuler</button>
    <div style="flex:1"><div style="font-size:14px;font-weight:800;color:#0f172a">✏ Modifier — ${d.titre}</div></div>
    <button onclick="docSaveEdit('${d.id}')" class="btn bp bsm" style="background:linear-gradient(135deg,#15803d,#16a34a)">✓ Enregistrer</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 280px;gap:14px">
    <div>
      <!-- Toolbar éditeur -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px 9px 0 0;padding:8px 12px;display:flex;flex-wrap:wrap;gap:4px;align-items:center">
        ${['<b>G</b>','<i>I</i>','<u>U</u>','—','H1','H2','H3','—','• Liste','1. Num.','—','🔗','📷','📊 Tableau'].map(t=>t==='—'?'<div style="width:1px;background:#e2e8f0;margin:0 2px;height:22px"></div>':`<button onclick="docFormat('${t.replace(/[<>\/]/g,'').replace(/ /g,'_')}')" style="padding:4px 8px;background:#fff;border:1px solid #e2e8f0;border-radius:5px;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif">${t}</button>`).join('')}
        <div style="margin-left:auto;display:flex;gap:5px">
          <label style="font-size:10px;color:#64748b;display:flex;align-items:center;gap:4px;cursor:pointer">
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onchange="docImportFile(this,'${d.id}')" style="display:none"> 📎 Importer fichier
          </label>
        </div>
      </div>
      <!-- Zone éditable -->
      <div contenteditable="true" id="doc-editor-${d.id}"
        style="min-height:420px;padding:16px 20px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 9px 9px;font-size:13px;line-height:1.9;color:#374151;outline:none;background:#fff"
        onkeydown="event.stopPropagation()">${d.content||'<p>Commencez à rédiger votre document ici…</p>'}</div>
    </div>
    <!-- Meta sidebar -->
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">ℹ Propriétés</div>
        <div style="display:flex;flex-direction:column;gap:9px">
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Titre *</label>
            <input id="edit-titre-${d.id}" class="fi" value="${d.titre}" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Type de document</label>
            <select id="edit-type-${d.id}" class="fi" style="width:100%">${DOC_TYPES.map(t=>`<option${t===d.type?' selected':''}>${t}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Processus</label>
            <select id="edit-proc-${d.id}" class="fi" style="width:100%">${procs.map(p=>`<option${p===d.processus?' selected':''}>${p}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Zone</label>
            <select id="edit-zone-${d.id}" class="fi" style="width:100%">${zones.map(z=>`<option${z===d.zone?' selected':''}>${z}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Version</label>
            <input id="edit-version-${d.id}" class="fi" value="${d.version}" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Responsable</label>
            <input id="edit-resp-${d.id}" class="fi" value="${d.resp}" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Description</label>
            <textarea id="edit-desc-${d.id}" class="fi" style="width:100%;min-height:70px;resize:vertical">${d.desc}</textarea></div>
        </div>
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9">
          <button onclick="docSaveEdit('${d.id}')" class="btn bp bsm" style="width:100%;justify-content:center;background:linear-gradient(135deg,#15803d,#16a34a)">✓ Enregistrer les modifications</button>
        </div>
      </div>
    </div>
  </div>`;

}
