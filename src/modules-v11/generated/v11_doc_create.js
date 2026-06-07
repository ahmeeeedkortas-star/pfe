/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_create() {

  var nextId='DOC-0'+String((window.DOC_DATA||[]).length+1).padStart(2,'0');
  var DOC_TYPES=['Manuel Qualité','Procédure','Processus','Instruction','Formulaire','Enregistrement','Document technique'];
  var procs=['Management','Qualité','Usinage','Assemblage','Maintenance','Achats','Sécurité','HSE','Production','Commercial'];
  var zones=['Direction','Qualité','Atelier CNC','Assemblage','Magasin','Maintenance','Finition','Bureau technique'];
  return `
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button onclick="goPage('doc-biblio')" class="btn bsm">← Retour</button>
    <div style="flex:1"><div style="font-size:14px;font-weight:800;color:#0f172a">✚ Nouveau document — ${nextId}</div></div>
    <button onclick="docCreate()" class="btn bp bsm" style="background:linear-gradient(135deg,#1e3a8a,#2563eb)">✓ Créer le document</button>
  </div>
  <!-- Tabs: Rédiger / Importer -->
  <div style="display:flex;gap:4px;background:#f8fafc;border-radius:10px;padding:4px;margin-bottom:14px;border:1px solid #e2e8f0;width:fit-content">
    ${[['✚ Créer dans la plateforme','create'],['📂 Importer un fichier existant','import']].map(([lb,mode])=>`
    <button onclick="window.docCreateMode='${mode}';reloadPage('doc-create')" style="padding:7px 16px;border-radius:7px;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:11px;font-weight:${(window.docCreateMode||'create')===mode?700:500};color:${(window.docCreateMode||'create')===mode?'#2563eb':'#64748b'};background:${(window.docCreateMode||'create')===mode?'#fff':'transparent'};box-shadow:${(window.docCreateMode||'create')===mode?'0 1px 4px rgba(0,0,0,.08)':'none'}">${lb}</button>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1fr 280px;gap:14px">
    ${(window.docCreateMode||'create')==='create'?`
    <div>
      <!-- Rich text toolbar -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px 9px 0 0;padding:8px 12px;display:flex;flex-wrap:wrap;gap:4px;align-items:center">
        ${['<b>G</b>','<i>I</i>','<u>U</u>','—','H1','H2','H3','—','• Liste','1. Num.','—','📊 Tableau','📷 Image'].map(t=>t==='—'?'<div style="width:1px;background:#e2e8f0;margin:0 2px;height:22px"></div>':`<button onclick="docFormatNew('${t.replace(/[<>\/]/g,'').replace(/ /g,'_')}')" style="padding:4px 8px;background:#fff;border:1px solid #e2e8f0;border-radius:5px;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif">${t}</button>`).join('')}
      </div>
      <div contenteditable="true" id="new-doc-editor"
        style="min-height:450px;padding:16px 20px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 9px 9px;font-size:13px;line-height:1.9;color:#374151;outline:none;background:#fff"
        onkeydown="event.stopPropagation()">
        <h1>Titre du document</h1><p>Rédigez votre document ici. Utilisez la barre d'outils pour la mise en forme.</p>
      </div>
    </div>`:`
    <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:16px;border:2px dashed #93c5fd;background:#eff6ff">
      <div style="font-size:48px">📂</div>
      <div style="text-align:center">
        <div style="font-size:13px;font-weight:700;color:#1e40af">Importer un document existant</div>
        <div style="font-size:10.5px;color:#64748b;margin-top:4px">Formats acceptés : PDF, Word (.doc/.docx), Excel (.xls/.xlsx)</div>
      </div>
      <label style="cursor:pointer">
        <input type="file" id="import-file-new" accept=".pdf,.doc,.docx,.xls,.xlsx" onchange="docShowImport(this)" style="display:none">
        <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;border-radius:8px;padding:8px 20px;font-size:11px;font-weight:700">📎 Choisir un fichier</div>
      </label>
      <div id="import-preview" style="display:none;text-align:center">
        <div id="import-filename" style="font-size:11px;font-weight:700;color:#1e40af"></div>
        <div id="import-filetype" style="font-size:10px;color:#16a34a;margin-top:2px"></div>
      </div>
    </div>`}
    <!-- Meta -->
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">ℹ Propriétés du document</div>
        <div style="display:flex;flex-direction:column;gap:9px">
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">ID automatique</label>
            <input class="fi" value="${nextId}" disabled style="width:100%;background:#f8fafc;color:#64748b"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Titre *</label>
            <input id="new-titre" class="fi" placeholder="Titre du document" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Type de document *</label>
            <select id="new-type" class="fi" style="width:100%"><option value="">— Sélectionner —</option>${DOC_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Processus</label>
            <select id="new-proc" class="fi" style="width:100%">${procs.map(p=>`<option>${p}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Zone</label>
            <select id="new-zone" class="fi" style="width:100%">${zones.map(z=>`<option>${z}</option>`).join('')}</select></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Version initiale</label>
            <input id="new-version" class="fi" value="V1.0" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Responsable</label>
            <input id="new-resp" class="fi" value="KORTAS.A" style="width:100%"></div>
          <div><label style="font-size:10px;font-weight:700;color:#64748b;display:block;margin-bottom:3px">Description</label>
            <textarea id="new-desc" class="fi" placeholder="Description courte du document" style="width:100%;min-height:60px;resize:vertical"></textarea></div>
        </div>
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9">
          <button onclick="docCreate()" class="btn bp bsm" style="width:100%;justify-content:center;background:linear-gradient(135deg,#1e3a8a,#2563eb)">✚ Créer le document</button>
        </div>
      </div>
    </div>
  </div>`;

}
