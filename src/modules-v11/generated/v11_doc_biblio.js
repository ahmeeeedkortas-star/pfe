/** Auto-generated from qhse_v11.html — patched: sections actifs / archives */
export function v11_doc_biblio() {

  var D=window.DOC_DATA||[];
  var f=window.doc_filter||{type:'',proc:'',zone:'',statut:'',q:''};
  var view=window.doc_view||'grid';
  var SC={Validé:'#16a34a',Actif:'#2563eb','En validation':'#f59e0b',Obsolète:'#dc2626',Archivé:'#64748b',Brouillon:'#94a3b8'};
  var TC={'Manuel Qualité':'#1e40af','Procédure':'#16a34a','Processus':'#7c3aed','Instruction':'#c2410c','Formulaire':'#0891b2','Enregistrement':'#b45309','Document technique':'#374151'};
  var DOC_TYPES=['Manuel Qualité','Procédure','Processus','Instruction','Formulaire','Enregistrement','Document technique'];
  var F=D.filter(function(d){
    if(f.type&&d.type!==f.type)return false;
    if(f.statut&&d.statut!==f.statut)return false;
    if(f.q){var q=f.q.toLowerCase();if(![d.id,d.titre,d.type,d.processus,d.zone,d.desc].join(' ').toLowerCase().includes(q))return false;}
    return true;
  });
  var F_active=F.filter(function(d){return d.statut!=='Archivé';});
  var F_archived=F.filter(function(d){return d.statut==='Archivé';});
  var docIcons={'Manuel Qualité':'📘','Procédure':'📋','Processus':'🔄','Instruction':'📝','Formulaire':'📊','Enregistrement':'🗂','Document technique':'⚙'};

  function importBadge(d){
    if(!d.importedFile)return '';
    var c=d.importedType==='excel'?'#16a34a':d.importedType==='word'?'#2563eb':d.importedType==='pdf'?'#dc2626':'#64748b';
    var lb=d.importedType==='excel'?'Excel':d.importedType==='word'?'Word':d.importedType==='pdf'?'PDF':'Import';
    var ic=d.importedType==='excel'?'📊':d.importedType==='word'?'📄':d.importedType==='pdf'?'📕':'📎';
    return '<span style="font-size:8px;font-weight:700;background:'+c+'18;color:'+c+';padding:2px 7px;border-radius:10px;margin-left:5px;vertical-align:middle;white-space:nowrap">'+ic+' '+lb+'</span>';
  }

  function gridCard(d,isArchive){
    var col=TC[d.type]||'#64748b';
    var sc=SC[d.statut]||'#94a3b8';
    var ic=docIcons[d.type]||'📄';
    var cardBg=isArchive?'#f1f5f9':'#fff';
    var cardOp=isArchive?'0.75':'1';
    return `<div style="background:${cardBg};border:1px solid #e2e8f0;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,.05);transition:.2s;cursor:pointer;opacity:${cardOp}" onclick="window.doc_sel='${d.id}';goPage('doc-read')" onmouseover="this.style.boxShadow='0 6px 20px rgba(0,0,0,.1)';this.style.transform='translateY(-1px)'" onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,.05)';this.style.transform='none'">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
        <div style="width:40px;height:40px;border-radius:10px;background:${col}18;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${ic}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px">${d.titre}${importBadge(d)}</div>
          <div style="font-size:9.5px;color:${col};font-weight:700">${d.type}</div>
        </div>
      </div>
      <div style="font-size:10px;color:#64748b;margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${d.desc||''}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:4px">
        <span style="font-size:9.5px;font-weight:700;background:${col}15;color:${col};padding:2px 8px;border-radius:20px">${d.version}</span>
        <span style="font-size:9.5px;font-weight:700;background:${sc}15;color:${sc};padding:2px 8px;border-radius:20px">${isArchive?'Archivé':d.statut}</span>
      </div>
      <div style="font-size:9px;color:#94a3b8;margin-bottom:10px">📅 ${isArchive?(d.dateArchivage||d.dateMaj):d.dateMaj} · 👤 ${d.resp}</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap" onclick="event.stopPropagation()">
        <button onclick="window.doc_sel='${d.id}';goPage('doc-read')" style="flex:1;background:#eff6ff;color:#2563eb;border:none;border-radius:6px;padding:5px 8px;font-size:9.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">👁 Voir</button>
        ${!isArchive?`<button onclick="window.doc_sel='${d.id}';goPage('doc-edit')" style="flex:1;background:#f0fdf4;color:#16a34a;border:none;border-radius:6px;padding:5px 8px;font-size:9.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">✏ Éditer</button>`:''}
        ${d.importedFile?`<button onclick="docDownload('${d.id}')" style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;border-radius:6px;padding:5px 8px;font-size:9.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">⬇ Télécharger</button>`:`<button onclick="docDownload('${d.id}')" style="background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px;font-size:9.5px;cursor:pointer;font-family:'Inter',sans-serif">⬇</button>`}
        ${!isArchive?`<button onclick="docArchive('${d.id}')" style="background:#fffbeb;color:#92400e;border:1px solid #fde68a;border-radius:6px;padding:5px 8px;font-size:9.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">📦 Archiver</button>`:''}
        ${!isArchive?`<button onclick="docDelete('${d.id}')" style="background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;border-radius:6px;padding:5px 8px;font-size:9.5px;cursor:pointer;font-family:'Inter',sans-serif">🗑</button>`:''}
      </div>
    </div>`;
  }

  function listRow(d,isArchive){
    var col=TC[d.type]||'#64748b';
    var sc=SC[d.statut]||'#94a3b8';
    var ic=docIcons[d.type]||'📄';
    var rowBg=isArchive?'#f8fafc':'transparent';
    var rowOp=isArchive?'0.75':'1';
    return `<tr style="cursor:pointer;background:${rowBg};opacity:${rowOp}" onclick="window.doc_sel='${d.id}';goPage('doc-read')">
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:16px">${ic}</span>
          <div>
            <div style="font-size:11px;font-weight:700;color:#0f172a">${d.titre}${importBadge(d)}</div>
            <div style="font-size:9.5px;color:#94a3b8">${d.id}</div>
          </div>
        </div>
      </td>
      <td><span style="background:${col}15;color:${col};padding:2px 8px;border-radius:20px;font-size:9.5px;font-weight:700">${d.type}</span></td>
      <td style="font-size:10.5px">${d.processus}</td>
      <td><span style="background:#f1f5f9;color:#374151;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${d.version}</span></td>
      <td><span style="background:${sc}15;color:${sc};padding:2px 8px;border-radius:20px;font-size:9.5px;font-weight:700">${isArchive?'Archivé':d.statut}</span></td>
      <td style="font-size:10.5px">${d.resp}</td>
      <td style="font-size:10px;color:#64748b">${isArchive?(d.dateArchivage||d.dateMaj):d.dateMaj}</td>
      <td onclick="event.stopPropagation()">
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          <button onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm" title="Voir">👁</button>
          ${!isArchive?`<button onclick="window.doc_sel='${d.id}';goPage('doc-edit')" class="btn bsm" title="Modifier">✏</button>`:''}
          ${d.importedFile?`<button onclick="docDownload('${d.id}')" class="btn bsm" style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe" title="Télécharger">⬇ Télécharger</button>`:`<button onclick="docDownload('${d.id}')" class="btn bsm" title="Télécharger">⬇</button>`}
          ${!isArchive?`<button onclick="docArchive('${d.id}')" class="btn bsm" style="background:#fffbeb;color:#92400e;border-color:#fde68a" title="Archiver">📦 Archiver</button>`:''}
          ${!isArchive?`<button onclick="docDelete('${d.id}')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5" title="Supprimer">🗑</button>`:''}
        </div>
      </td>
    </tr>`;
  }

  function renderDocList(items,isArchive){
    if(!items.length)return '';
    if(view==='grid'){
      return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${items.map(function(d){return gridCard(d,isArchive);}).join('')}</div>`;
    }
    return `<div class="card" style="padding:0;overflow:hidden;margin-bottom:12px;${isArchive?'background:#f8fafc;opacity:0.75':''}">
      <div style="overflow-x:auto">
        <table class="tbl" style="min-width:900px">
          <thead><tr><th>Document</th><th>Type</th><th>Processus</th><th>Version</th><th>Statut</th><th>Resp.</th><th>Mise à jour</th><th style="width:200px">Actions</th></tr></thead>
          <tbody>${items.map(function(d){return listRow(d,isArchive);}).join('')}</tbody>
        </table>
      </div>
    </div>`;
  }

  return `
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="font-size:11px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:6px">🔎 Bibliothèque documentaire <span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700;margin-left:4px">${F.length} / ${D.length}</span></div>
      <div style="display:flex;gap:6px;align-items:center">
        <button onclick="window.doc_view='grid';reloadPage('doc-biblio')" style="background:${view==='grid'?'#2563eb':'#f1f5f9'};color:${view==='grid'?'#fff':'#64748b'};border:none;border-radius:6px;padding:4px 9px;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif">⊞ Grille</button>
        <button onclick="window.doc_view='list';reloadPage('doc-biblio')" style="background:${view==='list'?'#2563eb':'#f1f5f9'};color:${view==='list'?'#fff':'#64748b'};border:none;border-radius:6px;padding:4px 9px;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif">≡ Liste</button>
        <button onclick="goPage('doc-create')" style="background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;border:none;border-radius:7px;padding:5px 13px;font-size:10.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">✚ Nouveau</button>
      </div>
    </div>
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;padding:5px 10px;flex:1;min-width:200px">
        <span style="color:#94a3b8;font-size:13px">🔍</span>
        <input value="${f.q||''}" placeholder="Titre, ID, type, processus, zone…" oninput="window.doc_filter.q=this.value;reloadPage('doc-biblio')" style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${f.q?`<button onclick="window.doc_filter.q='';reloadPage('doc-biblio')" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="filter-sel" onchange="window.doc_filter.type=this.value;reloadPage('doc-biblio')" style="${f.type?'border-color:#2563eb;background:#eff6ff;color:#2563eb':''}">
        <option value="">📂 Type : Tous</option>${DOC_TYPES.map(t=>`<option value="${t}"${f.type===t?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="filter-sel" onchange="window.doc_filter.statut=this.value;reloadPage('doc-biblio')" style="${f.statut?'border-color:#2563eb;background:#eff6ff;color:#2563eb':''}">
        <option value="">🔄 Statut : Tous</option>${['Validé','Actif','En validation','Brouillon','Obsolète','Archivé'].map(s=>`<option value="${s}"${f.statut===s?' selected':''}>${s}</option>`).join('')}
      </select>
      ${(f.type||f.statut||f.q)?`<button onclick="window.doc_filter={type:'',proc:'',zone:'',statut:'',q:''};reloadPage('doc-biblio')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Réinitialiser</button>`:''}
    </div>
  </div>

  ${F.length===0?`<div style="padding:48px;text-align:center;background:#fff;border-radius:11px;border:1px solid #e2e8f0"><div style="font-size:36px;margin-bottom:10px">📭</div><div style="font-size:14px;font-weight:700;color:#0f172a">Aucun document trouvé</div><div style="font-size:11px;color:#94a3b8;margin-top:4px">Modifiez vos filtres ou créez un nouveau document</div></div>`:`
  <div style="margin-bottom:16px">
    <div style="font-size:12px;font-weight:800;color:#0f172a;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      📂 Documents actifs <span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${F_active.length}</span>
    </div>
    ${F_active.length?renderDocList(F_active,false):`<div style="padding:20px;text-align:center;color:#94a3b8;font-size:11px;background:#fff;border:1px dashed #e2e8f0;border-radius:10px">Aucun document actif</div>`}
  </div>
  ${F_archived.length?`
  <div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:11px;padding:14px;margin-top:8px">
    <div style="font-size:12px;font-weight:800;color:#64748b;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      🗄 Archives — Versions obsolètes <span style="background:#e2e8f0;color:#64748b;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${F_archived.length}</span>
    </div>
    ${renderDocList(F_archived,true)}
  </div>`:''}
  `}`;

}
