/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_read() {

  var D=window.DOC_DATA||[];
  var d=D.find(function(x){return x.id===window.doc_sel;});
  if(!d) return '<div class="card"><div style="padding:40px;text-align:center">Document introuvable</div></div>';
  var SC={'Validé':'#16a34a',Actif:'#2563eb','En validation':'#f59e0b',Obsolète:'#dc2626',Archivé:'#64748b',Brouillon:'#94a3b8'};
  var TC={'Manuel Qualité':'#1e40af','Procédure':'#16a34a','Processus':'#7c3aed','Instruction':'#c2410c','Formulaire':'#0891b2','Enregistrement':'#b45309','Document technique':'#374151'};
  var col=TC[d.type]||'#2563eb';
  var sc=SC[d.statut]||'#94a3b8';
  return `
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button onclick="goPage('doc-biblio')" class="btn bsm">← Retour</button>
    <div style="flex:1"><div style="font-size:14px;font-weight:800;color:#0f172a">${d.titre}</div><div style="font-size:10px;color:#94a3b8">${d.id} · ${d.type} · ${d.version}</div></div>
    <button onclick="window.doc_sel='${d.id}';goPage('doc-edit')" class="btn bp bsm">✏ Modifier</button>
    <button onclick="docDownload('${d.id}')" class="btn bsm">⬇ Télécharger</button>
    <button onclick="docArchive('${d.id}')" class="btn bsm" style="background:#fffbeb;color:#92400e;border-color:#fde68a">🗄 Archiver</button>
    <button onclick="docDelete('${d.id}')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">🗑 Supprimer</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 260px;gap:14px">
    <!-- Document content -->
    <div>
      <div class="card" style="margin-bottom:12px">
        <div style="background:${col};border-radius:8px;padding:12px 16px;margin:-15px -15px 14px;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,.7)">${d.type} · ${d.processus}</div>
            <div style="font-size:15px;font-weight:800;color:#fff">${d.titre}</div>
          </div>
          <div style="text-align:right">
            <span style="background:rgba(255,255,255,.2);color:#fff;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">${d.version}</span>
            <div style="font-size:9px;color:rgba(255,255,255,.6);margin-top:4px">📅 ${d.dateMaj}</div>
          </div>
        </div>
        ${d.importedFile?`
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">${d.importedType==='pdf'?'📕':d.importedType==='word'?'📘':'📗'}</span>
          <div style="flex:1">
            <div style="font-size:11px;font-weight:700;color:#0f172a">${d.importedFile}</div>
            <div style="font-size:9.5px;color:#16a34a">Document importé · ${d.importedType?.toUpperCase()}</div>
          </div>
          <button onclick="docDownload('${d.id}')" class="btn bp bsm">⬇ Télécharger</button>
        </div>`:''}
        <div style="font-size:12px;line-height:1.9;color:#374151;padding:4px" id="doc-content-${d.id}">
          ${d.content||'<p style="color:#94a3b8;font-style:italic">Aucun contenu rédigé</p>'}
        </div>
      </div>
      <!-- Historique -->
      <div class="card">
        <div class="ch"><span class="ct">🕐 Historique des versions</span></div>
        <table class="tbl"><thead><tr><th>Version</th><th>Date</th><th>Auteur</th><th>Motif de révision</th></tr></thead>
        <tbody>${(d.history||[]).map(h=>`<tr>
          <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${h.v}</span></td>
          <td style="font-size:10.5px;color:#64748b">${h.date}</td>
          <td style="font-size:10.5px">${h.auteur}</td>
          <td style="font-size:10.5px">${h.motif}</td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <!-- Sidebar meta -->
    <div>
      <div class="card" style="margin-bottom:12px">
        <div class="ct" style="margin-bottom:10px">ℹ Informations</div>
        ${[['ID',d.id],['Type',d.type],['Processus',d.processus],['Zone',d.zone],['Version',d.version],['Statut',d.statut],['Responsable',d.resp],['Auteur',d.auteur],['Créé le',d.dateCreation||'—'],['Mis à jour',d.dateMaj],['Archivé le',d.dateArchivage||'—'],['Validé par',d.validatedBy||'—']].map(([l,v])=>`
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:10.5px">
          <span style="color:#94a3b8">${l}</span>
          <span style="font-weight:600;color:#0f172a;text-align:right;max-width:140px">${v}</span>
        </div>`).join('')}
      </div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">⚡ Actions rapides</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <button onclick="window.doc_sel='${d.id}';goPage('doc-edit')" class="btn bp bsm" style="justify-content:flex-start;gap:8px">✏ Modifier le document</button>
          <button onclick="docDownload('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px">⬇ Télécharger</button>
          <button onclick="docValidate('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px;background:#f0fdf4;color:#16a34a;border-color:#86efac">✅ Valider</button>
          <button onclick="docArchive('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px;background:#fffbeb;color:#92400e;border-color:#fde68a">🗄 Archiver</button>
          <button onclick="docDelete('${d.id}')" class="btn bsm" style="justify-content:flex-start;gap:8px;background:#fef2f2;color:#dc2626;border-color:#fca5a5">🗑 Supprimer</button>
        </div>
      </div>
    </div>
  </div>`;

}
