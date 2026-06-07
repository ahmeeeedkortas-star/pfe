/** Auto-generated from qhse_v11.html — Audit CRUD + modals */
export function installAuditV11CrudFromV11() {
function auditView(id) {
  window.auditSelected = id;
  reloadPage("audit-liste");
}

function auditModal(title, body, saveFn, deleteFn) {
  var old = document.getElementById('audit-modal');
  if(old) old.remove();
  var ov = document.createElement('div');
  ov.id = 'audit-modal';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px';
  ov.innerHTML = '<div style="background:#fff;border-radius:14px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.25)">'
    + '<div style="background:linear-gradient(135deg,#0c4a6e,#0284c7);padding:16px 20px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between">'
    + '<div style="font-size:14px;font-weight:700;color:#fff">' + title + '</div>'
    + '<button onclick="document.getElementById(\'audit-modal\').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;border-radius:6px;padding:4px 10px;font-size:12px">✕</button>'
    + '</div>'
    + '<div style="padding:20px">' + body
    + '<div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9">'
    + (deleteFn ? '<button class="btn btn-danger" onclick="' + deleteFn + '">🗑 Supprimer</button>' : '<div></div>')
    + '<div style="display:flex;gap:8px"><button class="btn" onclick="document.getElementById(\'audit-modal\').remove()">Annuler</button><button class="btn bp" onclick="' + saveFn + '">💾 Enregistrer</button></div>'
    + '</div></div></div>';
  document.body.appendChild(ov);
}
window.auditModal = auditModal;

function auditNew() {
  var types = ['ISO 9001','ISO 14001','ISO 45001','Interne'];
  var procs = ['Production','Qualité','Achats','Maintenance','Sécurité','Environnement','Ressources Humaines','Direction'];
  var auds  = (window.AUDIT_AUDITEURS||[]).map(function(a){return a.nom;});
  var today = new Date().toISOString().slice(0,10);
  auditModal('+ Nouvel audit ISO',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Titre de l\'audit *</label><input id="an-titre" class="fi" placeholder="Ex: Audit ISO 9001 — Production" style="width:100%"></div>'
    +'<div><label class="fl">Type / Norme</label><select id="an-type" class="fi">'
      +types.map(function(t){return '<option>'+t+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Processus</label><select id="an-proc" class="fi">'
      +procs.map(function(p){return '<option>'+p+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Zone / Service</label><input id="an-zone" class="fi" placeholder="Ex: Atelier CNC" style="width:100%"></div>'
    +'<div><label class="fl">Auditeur</label><select id="an-aud" class="fi">'
      +auds.map(function(a){return '<option>'+a+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Date prévue *</label><input id="an-date" type="date" class="fi" value="'+today+'"></div>'
    +'<div><label class="fl">Responsable zone</label><input id="an-resp" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>'
    +'</div>',
    '(function(){'
      +'var t=document.getElementById("an-titre").value.trim();'
      +'if(!t){alert("Titre obligatoire");return;}'
      +'var d=document.getElementById("an-date").value;'
      +'var n="AUD-2026-"+String((window.AUDIT_PLANS.length+1)).padStart(3,"0");'
      +'var ref=document.getElementById("an-type").value.replace("ISO ","ISO").replace("Interne","INT")+"-"+new Date().getFullYear()+"-"+String(window.AUDIT_PLANS.length+1).padStart(3,"0");'
      +'window.AUDIT_PLANS.unshift({id:n,ref:ref,titre:t,type:document.getElementById("an-type").value,'
        +'processus:document.getElementById("an-proc").value,zone:document.getElementById("an-zone").value||"—",'
        +'statut:"Planifié",dateDebut:d?d.split("-").reverse().join("/"):"-",dateFin:d?d.split("-").reverse().join("/"):"-",'
        +'auditeur:document.getElementById("an-aud").value,resp:document.getElementById("an-resp").value||"—",'
        +'score:null,prog:0,wfStep:1,notes:""});'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-liste");'
      +'xmToast("Audit planifié",t.substring(0,35),"📅","#0284c7");'
    +'})()');
}
window.auditNew = auditNew;

function auditEdit(id) {
  var a = (window.AUDIT_PLANS||[]).find(function(x){return x.id===id;});
  if(!a) return;
  var statuts = ['Planifié','En cours','Terminé','En retard'];
  auditModal('✏ Modifier l\'audit — '+a.ref,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Titre</label><input id="ae-t" class="fi" value="'+a.titre+'" style="width:100%"></div>'
    +'<div><label class="fl">Statut</label><select id="ae-s" class="fi">'
      +statuts.map(function(s){return '<option'+(s===a.statut?' selected':'')+'>'+s+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Score conformité (%)</label><input id="ae-sc" type="number" min="0" max="100" class="fi" value="'+(a.score||'')+'" placeholder="—"></div>'
    +'<div><label class="fl">Progression (%)</label><input id="ae-p" type="number" min="0" max="100" class="fi" value="'+a.prog+'"></div>'
    +'<div><label class="fl">Auditeur</label><input id="ae-a" class="fi" value="'+a.auditeur+'" style="width:100%"></div>'
    +'<div style="grid-column:1/-1"><label class="fl">Notes</label><textarea id="ae-n" class="fi" rows="2" style="width:100%">'+a.notes+'</textarea></div>'
    +'</div>',
    '(function(){'
      +'var x=window.AUDIT_PLANS.find(function(a){return a.id==="'+id+'"});if(!x)return;'
      +'x.titre=document.getElementById("ae-t").value;'
      +'x.statut=document.getElementById("ae-s").value;'
      +'var sc=parseInt(document.getElementById("ae-sc").value);x.score=sc||null;'
      +'x.prog=parseInt(document.getElementById("ae-p").value)||0;'
      +'if(x.prog===100&&x.statut!=="Terminé")x.statut="Terminé";'
      +'x.auditeur=document.getElementById("ae-a").value;'
      +'x.notes=document.getElementById("ae-n").value;'
      +'if(x.statut==="Terminé")x.wfStep=5;'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-liste");'
      +'xmToast("Audit mis à jour","'+id+'","✓","#16a34a");'
    +'})()');
}
window.auditEdit = auditEdit;

function auditDelete(id) {
  if(!confirm("Supprimer cet audit ?")) return;
  window.AUDIT_PLANS = (window.AUDIT_PLANS||[]).filter(function(a){return a.id!==id;});
  reloadPage("audit-liste");
  xmToast('Audit supprimé', id, '🗑', '#dc2626');
}
window.auditDelete = auditDelete;

function auditNewConstat() {
  var types = ['NC','OBS','BP'];
  var procs = ['Production','Qualité','Achats','Maintenance','Sécurité','Environnement','RH','Direction'];
  var audits = (window.AUDIT_PLANS||[]).map(function(a){return a.id+' — '+a.titre.substring(0,35);});
  var today = new Date().toISOString().slice(0,10);
  auditModal('+ Nouveau constat d\'audit',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div><label class="fl">Type</label><select id="ac-ty" class="fi">'
      +types.map(function(t){return '<option>'+t+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Audit lié</label><select id="ac-aud" class="fi">'
      +'<option value="">— Aucun —</option>'
      +(window.AUDIT_PLANS||[]).map(function(a){var aid=a.id;return '<option value="'+aid+'">'+a.ref+'</option>';}).join('')
    +'</select></div>'
    +'<div style="grid-column:1/-1"><label class="fl">Description *</label><textarea id="ac-d" class="fi" rows="2" placeholder="Description du constat…" style="width:100%"></textarea></div>'
    +'<div><label class="fl">Processus</label><select id="ac-p" class="fi">'
      +procs.map(function(p){return '<option>'+p+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Gravité</label><select id="ac-g" class="fi"><option>Majeure</option><option>Mineure</option><option>NA</option></select></div>'
    +'<div><label class="fl">Responsable</label><input id="ac-r" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>'
    +'<div><label class="fl">Référence ISO</label><input id="ac-ref" class="fi" placeholder="Ex: ISO 9001 §8.4" style="width:100%"></div>'
    +'</div>',
    '(function(){'
      +'var d=document.getElementById("ac-d").value.trim();'
      +'if(!d){alert("Description obligatoire");return;}'
      +'var ty=document.getElementById("ac-ty").value;'
      +'var prefix=ty==="NC"?"NC":ty==="OBS"?"OBS":"BP";'
      +'var n=prefix+"-2026-"+String((window.AUDIT_CONSTATS.filter(function(c){return c.type===ty;}).length+16)).padStart(3,"0");'
      +'window.AUDIT_CONSTATS.unshift({'
        +'id:n,auditId:document.getElementById("ac-aud").value||null,'
        +'type:ty,processus:document.getElementById("ac-p").value,'
        +'desc:d,gravite:document.getElementById("ac-g").value,'
        +'statut:"Ouvert",dateDetect:new Date().toLocaleDateString("fr-FR"),'
        +'resp:document.getElementById("ac-r").value||"—",'
        +'ref:document.getElementById("ac-ref").value||""'
      +'});'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-constats");'
      +'xmToast("Constat enregistré",d.substring(0,40),"⚠","#dc2626");'
    +'})()');
}
window.auditNewConstat = auditNewConstat;

function auditCloseConstat(id) {
  var c = (window.AUDIT_CONSTATS||[]).find(function(x){return x.id===id;});
  if(c) c.statut='Clôturé';
  reloadPage("audit-constats");
  xmToast('Constat clôturé', id, '✓', '#16a34a');
}
window.auditCloseConstat = auditCloseConstat;

function auditNewAction() {
  var constats = (window.AUDIT_CONSTATS||[]).filter(function(c){return c.statut!=='Clôturé';});
  var auds = (window.AUDIT_AUDITEURS||[]).map(function(a){return a.nom;});
  var today = new Date().toISOString().slice(0,10);
  auditModal('+ Nouvelle action corrective',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Action à réaliser *</label><input id="aa-a" class="fi" placeholder="Description de l\'action…" style="width:100%"></div>'
    +'<div><label class="fl">Constat lié</label><select id="aa-c" class="fi">'
      +'<option value="">— Aucun —</option>'
      +constats.map(function(c){var cid=c.id;return '<option value="'+cid+'">'+c.id+' — '+c.desc.substring(0,30)+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Responsable</label><select id="aa-r" class="fi">'
      +auds.map(function(a){return '<option>'+a+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Échéance</label><input id="aa-e" type="date" class="fi" value="'+today+'"></div>'
    +'<div><label class="fl">Priorité</label><select id="aa-p" class="fi"><option>Haute</option><option>Normale</option><option>Urgente</option></select></div>'
    +'</div>',
    '(function(){'
      +'var a=document.getElementById("aa-a").value.trim();'
      +'if(!a){alert("Action obligatoire");return;}'
      +'var e=document.getElementById("aa-e").value;'
      +'var cid=document.getElementById("aa-c").value;'
      +'var n="ACT-AUD-"+String((window.AUDIT_ACTIONS.length+1)).padStart(3,"0");'
      +'window.AUDIT_ACTIONS.unshift({'
        +'id:n,constatId:cid||null,'
        +'auditId:cid?(window.AUDIT_CONSTATS.find(function(c){return c.id===cid;})||{}).auditId:null,'
        +'action:a,resp:document.getElementById("aa-r").value,'
        +'echeance:e?e.split("-").reverse().join("/"):"-",'
        +'prog:0,statut:"À faire"'
      +'});'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-actions");'
      +'xmToast("Action créée",a.substring(0,35),"⚡","#0284c7");'
    +'})()');
}
window.auditNewAction = auditNewAction;

function auditEditAction(id) {
  var a = (window.AUDIT_ACTIONS||[]).find(function(x){return x.id===id;});
  if(!a) return;
  auditModal('✏ Modifier l\'action — '+id,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Action</label><input id="aea-a" class="fi" value="'+a.action+'" style="width:100%"></div>'
    +'<div><label class="fl">Responsable</label><input id="aea-r" class="fi" value="'+a.resp+'"></div>'
    +'<div><label class="fl">Statut</label><select id="aea-s" class="fi">'
      +['À faire','En cours','Terminée','Annulée'].map(function(s){return '<option'+(s===a.statut?' selected':'')+'>'+s+'</option>';}).join('')
    +'</select></div>'
    +'<div><label class="fl">Progression (%)</label><input id="aea-p" type="number" min="0" max="100" class="fi" value="'+a.prog+'"></div>'
    +'</div>',
    '(function(){'
      +'var x=window.AUDIT_ACTIONS.find(function(a){return a.id==="'+id+'"});if(!x)return;'
      +'x.action=document.getElementById("aea-a").value;'
      +'x.resp=document.getElementById("aea-r").value;'
      +'x.statut=document.getElementById("aea-s").value;'
      +'x.prog=parseInt(document.getElementById("aea-p").value)||0;'
      +'if(x.prog===100)x.statut="Terminée";'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-actions");'
      +'xmToast("Action mise à jour","'+id+'","✓","#16a34a");'
    +'})()');
}
window.auditEditAction = auditEditAction;

function auditNewChecklist() {
  auditModal('+ Nouvelle checklist',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Titre *</label><input id="acl-t" class="fi" placeholder="Ex: Checklist ISO 9001 — Production" style="width:100%"></div>'
    +'<div><label class="fl">Norme</label><select id="acl-n" class="fi"><option>ISO 9001</option><option>ISO 14001</option><option>ISO 45001</option><option>Interne</option></select></div>'
    +'<div><label class="fl">Version</label><input id="acl-v" class="fi" value="2026-01"></div>'
    +'</div>',
    '(function(){'
      +'var t=document.getElementById("acl-t").value.trim();if(!t){alert("Titre obligatoire");return;}'
      +'var n="CL-"+String((window.AUDIT_CHECKLISTS.length+1)).padStart(3,"0");'
      +'window.AUDIT_CHECKLISTS.push({id:n,titre:t,norme:document.getElementById("acl-n").value,version:document.getElementById("acl-v").value,items:[]});'
      +'document.getElementById("audit-modal").remove();'
      +'window.auditSelCL=n;'
      +'reloadPage("audit-checklist");'
      +'xmToast("Checklist créée",t,"📋","#7c3aed");'
    +'})()');
}
window.auditNewChecklist = auditNewChecklist;

function auditClSet(clId, itemN, val) {
  if(!window.AUDIT_CL_DATA[clId]) window.AUDIT_CL_DATA[clId]={};
  var current = window.AUDIT_CL_DATA[clId][itemN];
  window.AUDIT_CL_DATA[clId][itemN] = current===val ? null : val;
  reloadPage("audit-checklist");
}
window.auditClSet = auditClSet;

function auditAddDoc() {
  auditModal('+ Ajouter un document',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Nom du document *</label><input id="adoc-n" class="fi" placeholder="Ex: Rapport audit Production" style="width:100%"></div>'
    +'<div><label class="fl">Type</label><select id="adoc-t" class="fi"><option>Rapport</option><option>Checklist</option><option>Preuve</option><option>Programme</option><option>Autre</option></select></div>'
    +'<div><label class="fl">Audit associé</label><select id="adoc-a" class="fi">'
      +'<option value="">— Aucun —</option>'
      +(window.AUDIT_PLANS||[]).map(function(a){var aid=a.id;return '<option value="'+aid+'">'+a.ref+'</option>';}).join('')
    +'</select></div>'
    +'</div>',
    '(function(){'
      +'var n=document.getElementById("adoc-n").value.trim();if(!n){alert("Nom obligatoire");return;}'
      +'var id="DOC-AUD-"+String((window.AUDIT_DOCS_LIST.length+1)).padStart(3,"0");'
      +'window.AUDIT_DOCS_LIST.unshift({id:id,auditId:document.getElementById("adoc-a").value||null,nom:n,type:document.getElementById("adoc-t").value,date:new Date().toLocaleDateString("fr-FR"),auteur:"HSE Manager",statut:"En cours"});'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-docs");'
      +'xmToast("Document ajouté",n,"📄","#0284c7");'
    +'})()');
}
window.auditAddDoc = auditAddDoc;

function auditNewAuditeur() {
  var qualifs = ['ISO 9001','ISO 14001','ISO 45001'];
  var colors = ['#2563eb','#16a34a','#7c3aed','#dc2626','#f59e0b','#0891b2'];
  auditModal('+ Ajouter un auditeur',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div><label class="fl">Nom *</label><input id="aau-n" class="fi" placeholder="Prénom NOM" style="width:100%"></div>'
    +'<div><label class="fl">Poste</label><input id="aau-p" class="fi" placeholder="Ex: Auditeur interne" style="width:100%"></div>'
    +'<div><label class="fl">Département</label><input id="aau-d" class="fi" placeholder="Ex: Qualité" style="width:100%"></div>'
    +'<div><label class="fl">Email</label><input id="aau-e" type="email" class="fi" placeholder="email@..." style="width:100%"></div>'
    +'<div style="grid-column:1/-1"><label class="fl">Qualifications</label>'
      +'<div style="display:flex;gap:8px;margin-top:4px">'+qualifs.map(function(q){return '<label style="display:flex;align-items:center;gap:4px;font-size:11px"><input type="checkbox" value="'+q+'" class="aau-q"> '+q+'</label>';}).join('')+'</div>'
    +'</div>'
    +'</div>',
    '(function(){'
      +'var n=document.getElementById("aau-n").value.trim();if(!n){alert("Nom obligatoire");return;}'
      +'var qs=[...document.querySelectorAll(".aau-q:checked")].map(function(cb){return cb.value;});'
      +'var id="AUDR-"+String((window.AUDIT_AUDITEURS.length+1)).padStart(3,"0");'
      +'var cols=["#2563eb","#16a34a","#7c3aed","#dc2626","#f59e0b","#0891b2"];'
      +'window.AUDIT_AUDITEURS.push({id:id,nom:n,poste:document.getElementById("aau-p").value||"Auditeur",dep:document.getElementById("aau-d").value||"—",qualif:qs,audits:0,tauxConf:0,col:cols[window.AUDIT_AUDITEURS.length%cols.length]});'
      +'document.getElementById("audit-modal").remove();'
      +'reloadPage("audit-auditeurs");'
      +'xmToast("Auditeur ajouté",n,"👥","#7c3aed");'
    +'})()');
}
window.auditNewAuditeur = auditNewAuditeur;

function auditExport(type) {
  var data = window.AUDIT_PLANS||[], fn, header, csv='';
  if(type==='audits') { fn='audits.csv'; header='ID,Référence,Titre,Type,Processus,Statut,Date,Auditeur,Score'; csv=header+'\n'+data.map(function(a){return a.id+','+a.ref+','+a.titre+','+a.type+','+a.processus+','+a.statut+','+a.dateDebut+','+a.auditeur+','+(a.score||'-');}).join('\n'); }
  else if(type==='constats') { fn='constats.csv'; var D2=window.AUDIT_CONSTATS||[]; header='ID,Type,Audit,Processus,Description,Gravité,Statut'; csv=header+'\n'+D2.map(function(c){return c.id+','+c.type+','+(c.auditId||'-')+','+c.processus+','+c.desc.replace(/,/g,' ')+','+c.gravite+','+c.statut;}).join('\n'); }
  else if(type==='actions') { fn='actions.csv'; var D3=window.AUDIT_ACTIONS||[]; header='ID,Action,Responsable,Echéance,Progression,Statut'; csv=header+'\n'+D3.map(function(a){return a.id+','+a.action.replace(/,/g,' ')+','+a.resp+','+a.echeance+','+a.prog+'%,'+a.statut;}).join('\n'); }
  else { xmToast('Export PDF','Génération...','📄','#0284c7'); setTimeout(function(){window.print();},200); return; }
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  var url=URL.createObjectURL(blob);
  var el=document.createElement('a');el.href=url;el.download=fn;el.click();
  xmToast('Export CSV',''+fn,'📊','#16a34a');
}
window.auditExport = auditExport;
}
