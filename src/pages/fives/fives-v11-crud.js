/** Auto-generated from qhse_v11.html — 5S CRUD + modals */
export function installFivesV11CrudFromV11() {


function ss5ZoneResp(zoneName) {
  var Z = window.SS5_ZONES || [];
  var z = Z.find(function(z) { return z.zone === zoneName; });
  return z ? z.resp : '—';
}
window.ss5ZoneResp = ss5ZoneResp;

function ss5Modal(title, body, saveFn, deleteFn) {
  var old = document.getElementById('ss5-modal');
  if (old) old.remove();
  var ov = document.createElement('div');
  ov.id = 'ss5-modal';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px';
  ov.innerHTML = '<div style="background:#fff;border-radius:14px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.25)">'
    + '<div style="background:linear-gradient(135deg,#0f2044,#1a3a6b);padding:16px 20px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between">'
    + '<div style="font-size:14px;font-weight:700;color:#fff">' + title + '</div>'
    + '<button onclick="document.getElementById(\'ss5-modal\').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;border-radius:6px;padding:4px 10px;font-size:12px">✕ Fermer</button>'
    + '</div>'
    + '<div style="padding:20px">' + body
    + '<div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9">'
    + (deleteFn ? '<button class="btn btn-danger" onclick="' + deleteFn + '">🗑 Supprimer</button>' : '<div></div>')
    + '<div style="display:flex;gap:8px"><button class="btn" onclick="document.getElementById(\'ss5-modal\').remove()">Annuler</button><button class="btn bp" onclick="' + saveFn + '">💾 Enregistrer</button></div>'
    + '</div></div></div>';
  document.body.appendChild(ov);
}
window.ss5Modal = ss5Modal;

function ss5NewAudit() {
  ss5Modal('📅 Planifier un audit 5S',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div><label class="fl">Zone *</label><select id="s5a-z" class="fi"><option value="">— Sélectionner —</option>'+(window.SS5_ZONES||[]).map(function(z){return '<option>'+z.zone+'</option>';}).join('')+'</select></div>'
    + '<div><label class="fl">Date prévue *</label><input id="s5a-d" type="date" class="fi"></div>'
    + '<div><label class="fl">Auditeur *</label><select id="s5a-a" class="fi"><option>HSE Manager</option><option>HSE Officer</option><option>KORTAS.A</option><option>Sami Gharbi</option><option>Karim Ben Salah</option></select></div>'
    + '<div><label class="fl">Statut</label><select id="s5a-s" class="fi"><option>Planifié</option><option>Réalisé</option><option>En retard</option></select></div>'
    + '</div>',
    '(function(){var z=document.getElementById("s5a-z").value,d=document.getElementById("s5a-d").value,a=document.getElementById("s5a-a").value,s=document.getElementById("s5a-s").value;if(!z||!d){alert("Zone et date obligatoires");return;}var n="AUD5S-"+(String(Date.now()).slice(-4));window.SS5_AUDITS.unshift({id:n,date:d.split("-").reverse().join("/"),zone:z,auditeur:a,score:null,statut:s});document.getElementById("ss5-modal").remove();reloadPage("5s-planning");xmToast("Audit planifié",""+z+" — "+a,"📅","#2563eb");})()'
  );
}
window.ss5NewAudit = ss5NewAudit;

function ss5EditAudit(id) {
  var AUD = window.SS5_AUDITS || [];
  var a = AUD.find(function(a){return a.id===id;});
  if (!a) return;
  ss5Modal('✏ Modifier l\'audit — ' + a.id,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div><label class="fl">Zone</label><input id="s5ae-z" class="fi" value="'+a.zone+'"></div>'
    + '<div><label class="fl">Date</label><input id="s5ae-d" type="text" class="fi" value="'+a.date+'"></div>'
    + '<div><label class="fl">Auditeur</label><input id="s5ae-a" class="fi" value="'+a.auditeur+'"></div>'
    + '<div><label class="fl">Score (%)</label><input id="s5ae-sc" type="number" min="0" max="100" class="fi" value="'+(a.score||'')+'"></div>'
    + '<div style="grid-column:1/-1"><label class="fl">Statut</label><select id="s5ae-s" class="fi"><option'+(a.statut==='Planifié'?' selected':'')+'>Planifié</option><option'+(a.statut==='Réalisé'?' selected':'')+'>Réalisé</option><option'+(a.statut==='En retard'?' selected':'')+'>En retard</option></select></div>'
    + '</div>',
    '(function(){var a=window.SS5_AUDITS.find(function(x){return x.id==="'+id+'"});if(!a)return;a.zone=document.getElementById("s5ae-z").value;a.date=document.getElementById("s5ae-d").value;var sc=parseInt(document.getElementById("s5ae-sc").value);a.score=sc||null;a.statut=document.getElementById("s5ae-s").value;a.auditeur=document.getElementById("s5ae-a").value;document.getElementById("ss5-modal").remove();reloadPage("5s-audit");xmToast("Audit modifié","'+id+'","✓","#16a34a");})()',
    '(function(){window.SS5_AUDITS=window.SS5_AUDITS.filter(function(x){return x.id!=="'+id+'"});document.getElementById("ss5-modal").remove();reloadPage("5s-audit");xmToast("Audit supprimé","'+id+'","🗑","#dc2626");})()'
  );
}
window.ss5EditAudit = ss5EditAudit;

function ss5DeleteAudit(id) {
  if(!confirm("Supprimer cet audit ?")) return;
  window.SS5_AUDITS = (window.SS5_AUDITS||[]).filter(function(a){return a.id!==id;});
  reloadPage("5s-planning");
  xmToast('Audit supprimé', id, '🗑', '#dc2626');
}
window.ss5DeleteAudit = ss5DeleteAudit;

function ss5StartAudit(id) {
  var a = (window.SS5_AUDITS||[]).find(function(a){return a.id===id;});
  if(a) { window.ss5ClZone = (window.SS5_ZONES||[]).find(function(z){return z.zone===a.zone;})?.id || null; }
  goPage('5s-checklist');
  xmToast('Audit démarré', a?a.zone:'Zone', '📋', '#2563eb');
}
window.ss5StartAudit = ss5StartAudit;

function ss5ViewRapport(id) {
  var a = (window.SS5_AUDITS||[]).find(function(a){return a.id===id;});
  if(!a) return;
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  var pks=[['S','1S Seiri'],['T','2S Seiton'],['N','3S Seiso'],['S4','4S Seiketsu'],['S5','5S Shitsuke']];
  var Z = (window.SS5_ZONES||[]).find(function(z){return z.zone===a.zone;}) || {};
  var pillHTML = pks.map(function(k){var v=Z[k[0]]||0;return '<div style="text-align:center;padding:8px"><div style="font-size:10px;color:#94a3b8;margin-bottom:3px">'+k[1]+'</div><div style="font-size:18px;font-weight:800;color:'+sc(v)+'">'+v+'%</div></div>';}).join('');
  ss5Modal('📄 Rapport d\'audit 5S — ' + a.id,
    '<div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:9px;padding:12px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">'
    +'<div><div style="font-size:12px;font-weight:700;color:#166534">Zone : '+a.zone+'</div><div style="font-size:10px;color:#15803d;margin-top:2px">Date : '+a.date+' · Auditeur : '+a.auditeur+'</div></div>'
    +'<div style="font-size:28px;font-weight:800;color:'+sc(a.score||0)+'">'+(a.score||'—')+(a.score?'%':'')+'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:12px;background:#f8fafc;border-radius:8px;padding:8px">'+pillHTML+'</div>'
    +'<div style="font-size:11px;color:#64748b;background:#f8fafc;border-radius:8px;padding:10px">Rapport généré le '+a.date+' — XPERT-MECA QHSE Platform</div>',
    'document.getElementById("ss5-modal").remove()'
  );
}
window.ss5ViewRapport = ss5ViewRapport;

function ss5NewEcart() {
  ss5Modal('⚠ Nouvel écart 5S',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    + '<div><label class="fl">Zone *</label><select id="s5e-z" class="fi"><option value="">— Sélectionner —</option>'+(window.SS5_ZONES||[]).map(function(z){return '<option>'+z.zone+'</option>';}).join('')+'</select></div>'
    + '<div><label class="fl">Date</label><input id="s5e-d" type="date" class="fi" value="'+new Date().toISOString().slice(0,10)+'"></div>'
    + '<div style="grid-column:1/-1"><label class="fl">Écart identifié *</label><input id="s5e-ec" class="fi" placeholder="Description de l\'écart observé"></div>'
    + '<div><label class="fl">Gravité</label><select id="s5e-g" class="fi"><option>Moyenne</option><option>Majeure</option><option>Mineure</option></select></div>'
    + '<div><label class="fl">Responsable</label><select id="s5e-r" class="fi">'+(window.SS5_RESPS||[]).map(function(r){return '<option>'+r.nom+'</option>';}).join('')+'</select></div>'
    + '<div><label class="fl">Délai</label><input id="s5e-dl" type="date" class="fi"></div>'
    + '</div>',
    '(function(){var z=document.getElementById("s5e-z").value,ec=document.getElementById("s5e-ec").value,d=document.getElementById("s5e-d").value;if(!z||!ec){alert("Zone et écart obligatoires");return;}var n="EC5S-"+(String(Date.now()).slice(-4));var dl=document.getElementById("s5e-dl").value;window.SS5_ECARTS.unshift({id:n,date:d.split("-").reverse().join("/"),zone:z,ecart:ec,gravite:document.getElementById("s5e-g").value,statut:"Ouvert",resp:document.getElementById("s5e-r").value,dl:dl?dl.split("-").reverse().join("/"):"—"});document.getElementById("ss5-modal").remove();reloadPage("5s-ecarts");xmToast("Écart enregistré",ec.substring(0,40),"⚠","#dc2626");})()'
  );
}
window.ss5NewEcart = ss5NewEcart;

function ss5EditEcart(id) {
  var e = (window.SS5_ECARTS||[]).find(function(x){return x.id===id;});
  if(!e) return;
  ss5Modal('✏ Modifier l\'écart — ' + id,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div><label class="fl">Zone</label><input id="s5ee-z" class="fi" value="'+e.zone+'"></div>'
    +'<div><label class="fl">Responsable</label><input id="s5ee-r" class="fi" value="'+e.resp+'"></div>'
    +'<div style="grid-column:1/-1"><label class="fl">Écart</label><input id="s5ee-ec" class="fi" value="'+e.ecart+'"></div>'
    +'<div><label class="fl">Gravité</label><select id="s5ee-g" class="fi"><option'+(e.gravite==='Majeure'?' selected':'')+'>Majeure</option><option'+(e.gravite==='Moyenne'?' selected':'')+'>Moyenne</option><option'+(e.gravite==='Mineure'?' selected':'')+'>Mineure</option></select></div>'
    +'<div><label class="fl">Statut</label><select id="s5ee-s" class="fi"><option'+(e.statut==='Ouvert'?' selected':'')+'>Ouvert</option><option'+(e.statut==='En cours'?' selected':'')+'>En cours</option><option'+(e.statut==='Clôturé'?' selected':'')+'>Clôturé</option></select></div>'
    +'</div>',
    '(function(){var x=window.SS5_ECARTS.find(function(e){return e.id==="'+id+'"});if(!x)return;x.zone=document.getElementById("s5ee-z").value;x.ecart=document.getElementById("s5ee-ec").value;x.gravite=document.getElementById("s5ee-g").value;x.statut=document.getElementById("s5ee-s").value;x.resp=document.getElementById("s5ee-r").value;document.getElementById("ss5-modal").remove();reloadPage("5s-ecarts");xmToast("Écart modifié","'+id+'","✓","#16a34a");})()',
    '(function(){window.SS5_ECARTS=window.SS5_ECARTS.filter(function(e){return e.id!=="'+id+'"});document.getElementById("ss5-modal").remove();reloadPage("5s-ecarts");xmToast("Écart supprimé","'+id+'","🗑","#dc2626");})()'
  );
}
window.ss5EditEcart = ss5EditEcart;

function ss5CloseEcart(id) {
  var e = (window.SS5_ECARTS||[]).find(function(x){return x.id===id;});
  if(e) { e.statut='Clôturé'; }
  reloadPage("5s-ecarts");
  xmToast('Écart clôturé', id, '✓', '#16a34a');
}
window.ss5CloseEcart = ss5CloseEcart;

function ss5NewAction() {
  var preS = window.ss5ActPresetStatus||'À faire';
  ss5Modal('⚡ Nouvelle action 5S',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Action *</label><input id="s5ac-a" class="fi" placeholder="Description de l\'action"></div>'
    +'<div><label class="fl">Zone</label><select id="s5ac-z" class="fi"><option value="">— Sélectionner —</option>'+(window.SS5_ZONES||[]).map(function(z){return '<option>'+z.zone+'</option>';}).join('')+'</select></div>'
    +'<div><label class="fl">Priorité</label><select id="s5ac-p" class="fi"><option>Normale</option><option>Haute</option><option>Critique</option></select></div>'
    +'<div><label class="fl">Type</label><select id="s5ac-t" class="fi"><option>Corrective</option><option>Préventive</option><option>Amélioration</option></select></div>'
    +'<div><label class="fl">Responsable</label><select id="s5ac-r" class="fi">'+(window.SS5_RESPS||[]).map(function(r){return '<option>'+r.nom+'</option>';}).join('')+'</select></div>'
    +'<div><label class="fl">Échéance</label><input id="s5ac-f" type="date" class="fi"></div>'
    +'<div style="grid-column:1/-1"><label class="fl">Statut</label><select id="s5ac-s" class="fi"><option'+(preS==="À faire"?' selected':'')+'>À faire</option><option'+(preS==='En cours'?' selected':'')+'>En cours</option><option'+(preS==='En retard'?' selected':'')+'>En retard</option><option'+(preS==='Clôturée'?' selected':'')+'>Clôturée</option></select></div>'
    +'</div>',
    '(function(){var a=document.getElementById("s5ac-a").value;if(!a){alert("Action obligatoire");return;}var f=document.getElementById("s5ac-f").value;var n="ACT5S-"+(String(Date.now()).slice(-4));window.SS5_ACTIONS.unshift({id:n,action:a,zone:document.getElementById("s5ac-z").value||"—",prio:document.getElementById("s5ac-p").value,type:document.getElementById("s5ac-t").value,resp:document.getElementById("s5ac-r").value,fin:f?f.split("-").reverse().join("/"):"—",statut:document.getElementById("s5ac-s").value,prog:0});document.getElementById("ss5-modal").remove();reloadPage("5s-actions");xmToast("Action créée",a.substring(0,35),"⚡","#7c3aed");})()'
  );
}
window.ss5NewAction = ss5NewAction;

function ss5EditAction(id) {
  var a = (window.SS5_ACTIONS||[]).find(function(x){return x.id===id;});
  if(!a) return;
  ss5Modal('✏ Modifier l\'action — ' + id,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Action</label><input id="s5ae-ac" class="fi" value="'+a.action+'"></div>'
    +'<div><label class="fl">Zone</label><input id="s5ae-z" class="fi" value="'+a.zone+'"></div>'
    +'<div><label class="fl">Responsable</label><input id="s5ae-r" class="fi" value="'+a.resp+'"></div>'
    +'<div><label class="fl">Priorité</label><select id="s5ae-p" class="fi"><option'+(a.prio==='Normale'?' selected':'')+'>Normale</option><option'+(a.prio==='Haute'?' selected':'')+'>Haute</option><option'+(a.prio==='Critique'?' selected':'')+'>Critique</option></select></div>'
    +'<div><label class="fl">Statut</label><select id="s5ae-s" class="fi"><option'+(a.statut==='À faire'?' selected':'')+'>À faire</option><option'+(a.statut==='En cours'?' selected':'')+'>En cours</option><option'+(a.statut==='En retard'?' selected':'')+'>En retard</option><option'+(a.statut==='Clôturée'?' selected':'')+'>Clôturée</option></select></div>'
    +'<div><label class="fl">Progression (%)</label><input id="s5ae-pg" type="number" min="0" max="100" class="fi" value="'+a.prog+'"></div>'
    +'</div>',
    '(function(){var x=window.SS5_ACTIONS.find(function(a){return a.id==="'+id+'"});if(!x)return;x.action=document.getElementById("s5ae-ac").value;x.zone=document.getElementById("s5ae-z").value;x.resp=document.getElementById("s5ae-r").value;x.prio=document.getElementById("s5ae-p").value;x.statut=document.getElementById("s5ae-s").value;x.prog=parseInt(document.getElementById("s5ae-pg").value)||0;if(x.prog===100)x.statut="Clôturée";document.getElementById("ss5-modal").remove();reloadPage("5s-actions");xmToast("Action modifiée","'+id+'","✓","#16a34a");})()',
    '(function(){window.SS5_ACTIONS=window.SS5_ACTIONS.filter(function(a){return a.id!=="'+id+'"});document.getElementById("ss5-modal").remove();reloadPage("5s-actions");xmToast("Action supprimée","'+id+'","🗑","#dc2626");})()'
  );
}
window.ss5EditAction = ss5EditAction;

function ss5DeleteAction(id) {
  window.SS5_ACTIONS = (window.SS5_ACTIONS||[]).filter(function(a){return a.id!==id;});
  reloadPage("5s-actions");
  xmToast('Action supprimée', id, '🗑', '#dc2626');
}
window.ss5DeleteAction = ss5DeleteAction;

function ss5UpdateProg(id, val) {
  var a = (window.SS5_ACTIONS||[]).find(function(a){return a.id===id;});
  if(a) { a.prog = parseInt(val)||0; if(a.prog===100) a.statut='Clôturée'; }
}
window.ss5UpdateProg = ss5UpdateProg;

function ss5ClSet(zoneId, pillarKey, itemNum, val) {
  if(!window.SS5_CL_DATA) window.SS5_CL_DATA = {};
  if(!window.SS5_CL_DATA[zoneId]) window.SS5_CL_DATA[zoneId] = {};
  if(!window.SS5_CL_DATA[zoneId][pillarKey]) window.SS5_CL_DATA[zoneId][pillarKey] = {};
  var curr = window.SS5_CL_DATA[zoneId][pillarKey][itemNum];
  window.SS5_CL_DATA[zoneId][pillarKey][itemNum] = curr===val ? null : val;
  reloadPage("5s-checklist");
}
window.ss5ClSet = ss5ClSet;

function ss5ClSave(zoneId) {
  var Z = (window.SS5_ZONES||[]).find(function(z){return z.id===zoneId;});
  var CL = window.SS5_CL_TEMPLATE||{};
  var D = (window.SS5_CL_DATA||{})[zoneId]||{};
  var pkeys = ['S1','S2','S3','S4','S5'];
  var zkeys = ['S','T','N','S4','S5'];
  var scores = pkeys.map(function(pk,i){
    var items = (CL[pk]&&CL[pk].items)||[];
    var t=0,ok=0;
    items.forEach(function(it){t++;if((D[pk]||{})[it.n]==='oui')ok++;});
    return t?Math.round(ok/t*100):0;
  });
  var global = Math.round(scores.reduce(function(s,v){return s+v;},0)/scores.length);
  if(Z){ Z.score=global; Z.S=scores[0]; Z.T=scores[1]; Z.N=scores[2]; Z.S4=scores[3]; Z.S5=scores[4]; Z.statut=global>=80?'Conforme':'Non conforme'; Z.lastAudit=new Date().toLocaleDateString('fr-FR'); }
  xmToast('Checklist sauvegardée','Score : '+global+'%','💾','#16a34a');
  reloadPage("5s-checklist");
}
window.ss5ClSave = ss5ClSave;

function ss5ClGenerateEcarts(zoneId) {
  var CL = window.SS5_CL_TEMPLATE||{};
  var D = (window.SS5_CL_DATA||{})[zoneId]||{};
  var Z = (window.SS5_ZONES||[]).find(function(z){return z.id===zoneId;});
  var zoneName = Z?Z.zone:zoneId;
  var pkeys=['S1','S2','S3','S4','S5'];
  var generated=0;
  pkeys.forEach(function(pk){
    var items=(CL[pk]&&CL[pk].items)||[];
    items.forEach(function(it){
      if((D[pk]||{})[it.n]==='non'&&it.critical){
        var n='EC5S-'+(String(Date.now()+(generated*100)).slice(-4));
        window.SS5_ECARTS.unshift({id:n,date:new Date().toLocaleDateString('fr-FR'),zone:zoneName,ecart:it.label,gravite:'Majeure',statut:'Ouvert',resp:Z?Z.resp:'—',dl:'—'});
        generated++;
      }
    });
  });
  xmToast(generated+' écart'+(generated>1?'s':'')+' générés','Critères critiques NOK → '+zoneName,'⚠',generated?'#dc2626':'#16a34a');
  reloadPage("5s-ecarts");
}
window.ss5ClGenerateEcarts = ss5ClGenerateEcarts;

function ss5NewZone() {
  ss5Modal('🏭 Nouvelle zone 5S',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Nom de la zone *</label><input id="s5z-n" class="fi" placeholder="Ex: Atelier Soudure"></div>'
    +'<div><label class="fl">Département</label><input id="s5z-d" class="fi" placeholder="Ex: Production"></div>'
    +'<div><label class="fl">Responsable</label><select id="s5z-r" class="fi">'+(window.SS5_RESPS||[]).map(function(r){return '<option>'+r.nom+'</option>';}).join('')+'</select></div>'
    +'</div>',
    '(function(){var n=document.getElementById("s5z-n").value;if(!n){alert("Nom obligatoire");return;}var id="Z-"+(String(window.SS5_ZONES.length+1).padStart(2,"0"));window.SS5_ZONES.push({id:id,zone:n,dep:document.getElementById("s5z-d").value||"—",resp:document.getElementById("s5z-r").value,lastAudit:"—",nextAudit:"—",score:0,S:0,T:0,N:0,S4:0,S5:0,statut:"Non conforme",trend:0});document.getElementById("ss5-modal").remove();reloadPage("5s-zones");xmToast("Zone créée",n,"🏭","#16a34a");})()'
  );
}
window.ss5NewZone = ss5NewZone;

function ss5EditZone(id) {
  var z = (window.SS5_ZONES||[]).find(function(x){return x.id===id;});
  if(!z) return;
  ss5Modal('✏ Modifier la zone — '+z.zone,
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div style="grid-column:1/-1"><label class="fl">Nom</label><input id="s5ze-n" class="fi" value="'+z.zone+'"></div>'
    +'<div><label class="fl">Département</label><input id="s5ze-d" class="fi" value="'+z.dep+'"></div>'
    +'<div><label class="fl">Responsable</label><input id="s5ze-r" class="fi" value="'+z.resp+'"></div>'
    +'<div><label class="fl">Prochain audit</label><input id="s5ze-na" class="fi" value="'+z.nextAudit+'"></div>'
    +'</div>',
    '(function(){var x=window.SS5_ZONES.find(function(z){return z.id==="'+id+'"});if(!x)return;x.zone=document.getElementById("s5ze-n").value;x.dep=document.getElementById("s5ze-d").value;x.resp=document.getElementById("s5ze-r").value;x.nextAudit=document.getElementById("s5ze-na").value;document.getElementById("ss5-modal").remove();reloadPage("5s-zones");xmToast("Zone modifiée","'+z.zone+'","✓","#16a34a");})()'
  );
}
window.ss5EditZone = ss5EditZone;

function ss5NewResp() {
  ss5Modal('👥 Ajouter un responsable 5S',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div><label class="fl">Nom *</label><input id="s5r-n" class="fi" placeholder="Prénom NOM"></div>'
    +'<div><label class="fl">Poste</label><input id="s5r-p" class="fi" placeholder="Ex: Chef d\'équipe"></div>'
    +'<div><label class="fl">Département</label><input id="s5r-d" class="fi" placeholder="Ex: Production"></div>'
    +'<div><label class="fl">Email</label><input id="s5r-e" type="email" class="fi" placeholder="email@xpertmeca.com"></div>'
    +'</div>',
    '(function(){var n=document.getElementById("s5r-n").value;if(!n){alert("Nom obligatoire");return;}var colors=["#2563eb","#16a34a","#7c3aed","#dc2626","#f59e0b","#0891b2"];var id="R"+(window.SS5_RESPS.length+1);window.SS5_RESPS.push({id:id,nom:n,poste:document.getElementById("s5r-p").value||"—",dep:document.getElementById("s5r-d").value||"—",email:document.getElementById("s5r-e").value||"",col:colors[window.SS5_RESPS.length%colors.length]});document.getElementById("ss5-modal").remove();reloadPage("5s-responsables");xmToast("Responsable ajouté",n,"👥","#7c3aed");})()'
  );
}
window.ss5NewResp = ss5NewResp;

function ss5EditResp(id) {
  var r = (window.SS5_RESPS||[]).find(function(x){return x.id===id;});
  if(!r) return;
  ss5Modal('✏ Modifier le responsable',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
    +'<div><label class="fl">Nom</label><input id="s5re-n" class="fi" value="'+r.nom+'"></div>'
    +'<div><label class="fl">Poste</label><input id="s5re-p" class="fi" value="'+r.poste+'"></div>'
    +'<div><label class="fl">Département</label><input id="s5re-d" class="fi" value="'+r.dep+'"></div>'
    +'<div><label class="fl">Email</label><input id="s5re-e" class="fi" value="'+r.email+'"></div>'
    +'</div>',
    '(function(){var x=window.SS5_RESPS.find(function(r){return r.id==="'+id+'"});if(!x)return;x.nom=document.getElementById("s5re-n").value;x.poste=document.getElementById("s5re-p").value;x.dep=document.getElementById("s5re-d").value;x.email=document.getElementById("s5re-e").value;document.getElementById("ss5-modal").remove();reloadPage("5s-responsables");xmToast("Responsable modifié","'+r.nom+'","✓","#16a34a");})()'
  );
}
window.ss5EditResp = ss5EditResp;

function ss5DeleteResp(id) {
  if(!confirm("Supprimer ce responsable ?")) return;
  window.SS5_RESPS = (window.SS5_RESPS||[]).filter(function(r){return r.id!==id;});
  reloadPage("5s-responsables");
  xmToast('Responsable supprimé', id, '🗑', '#dc2626');
}
window.ss5DeleteResp = ss5DeleteResp;

function ss5Export(type) {
  if(type==='csv'||type==='ecarts'||type==='actions'||type==='planning'||type==='checklist') {
    var data, filename, header;
    if(type==='csv'||type==='ecarts'||type==='checklist') { data=window.SS5_ZONES||[]; filename='zones_5s.csv'; header='Zone,Département,Score,1S,2S,3S,4S,5S,Statut'; }
    else if(type==='ecarts') { data=window.SS5_ECARTS||[]; filename='ecarts_5s.csv'; header='ID,Date,Zone,Écart,Gravité,Statut,Responsable'; }
    else if(type==='actions') { data=window.SS5_ACTIONS||[]; filename='actions_5s.csv'; header='ID,Action,Zone,Priorité,Responsable,Échéance,Statut,Progression'; }
    else if(type==='planning') { data=window.SS5_AUDITS||[]; filename='planning_5s.csv'; header='ID,Date,Zone,Auditeur,Score,Statut'; }
    var csv=header+'\n';
    if(type==='csv'||type==='checklist') csv+=data.map(function(z){return z.zone+','+z.dep+','+z.score+'%,'+z.S+'%,'+z.T+'%,'+z.N+'%,'+z.S4+'%,'+z.S5+'%,'+z.statut;}).join('\n');
    else if(type==='ecarts') csv+=(window.SS5_ECARTS||[]).map(function(e){return e.id+','+e.date+','+e.zone+','+e.ecart+','+e.gravite+','+e.statut+','+e.resp;}).join('\n');
    else if(type==='actions') csv+=(window.SS5_ACTIONS||[]).map(function(a){return a.id+','+a.action+','+a.zone+','+a.prio+','+a.resp+','+a.fin+','+a.statut+','+a.prog+'%';}).join('\n');
    else if(type==='planning') csv+=(window.SS5_AUDITS||[]).map(function(a){return a.id+','+a.date+','+a.zone+','+a.auditeur+','+(a.score||'—')+','+a.statut;}).join('\n');
    var blob=new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');a.href=url;a.download=filename;a.click();
    xmToast('Export CSV généré',filename,'📊','#16a34a');
  } else {
    xmToast('Export PDF','Génération en cours...','📄','#dc2626');
    setTimeout(function(){window.print();},200);
  }
}
window.ss5Export = ss5Export;


}
