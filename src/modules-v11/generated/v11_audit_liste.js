/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_liste() {

  var P=window.AUDIT_PLANS||[];
  var view=window.auditView||'kanban';
  var fT=window.auditFilter&&window.auditFilter.type||'';
  var fP=window.auditFilter&&window.auditFilter.processus||'';
  var fS=window.auditFilter&&window.auditFilter.statut||'';
  var fQ=(window.auditFilter&&window.auditFilter.q||'').toLowerCase();
  if(!window.auditFilter) window.auditFilter={type:'',processus:'',statut:'',q:''};
  var types=[...new Set(P.map(function(a){return a.type;}))].sort();
  var procs=[...new Set(P.map(function(a){return a.processus;}))].sort();
  var filtered=P.filter(function(a){
    if(fT&&a.type!==fT)return false;
    if(fP&&a.processus!==fP)return false;
    if(fS&&a.statut!==fS)return false;
    if(fQ&&![a.titre,a.ref,a.auditeur,a.processus,a.zone].join(' ').toLowerCase().includes(fQ))return false;
    return true;
  });
  function typeBadge(t){var m={'ISO 9001':'#1e40af','ISO 14001':'#166534','ISO 45001':'#9a3412','Interne':'#5b21b6'};return '<span style="background:'+(m[t]||'#64748b')+'22;color:'+(m[t]||'#64748b')+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">'+t+'</span>';}
  function sColor(s){return s==='Planifié'?'#2563eb':s==='En cours'?'#f59e0b':s==='Terminé'?'#16a34a':'#dc2626';}
  function sBg(s){return s==='Planifié'?'#eff6ff':s==='En cours'?'#fffbeb':s==='Terminé'?'#f0fdf4':'#fef2f2';}
  var colCfg=[{s:'Planifié',col:'#2563eb',bg:'#eff6ff'},{s:'En cours',col:'#f59e0b',bg:'#fffbeb'},{s:'Terminé',col:'#16a34a',bg:'#f0fdf4'},{s:'En retard',col:'#dc2626',bg:'#fef2f2'}];
  var kanban=colCfg.map(function(col){
    var items=filtered.filter(function(a){return a.statut===col.s;});
    var cards=items.map(function(a){
      var aid=JSON.stringify(a.id);
      var nc=(window.AUDIT_CONSTATS||[]).filter(function(c){return c.auditId===a.id&&c.type==='NC';}).length;
      return '<div style="background:#fff;border:1px solid var(--border);border-left:3px solid '+col.col+';border-radius:9px;padding:11px;margin-bottom:8px;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.04)" onclick="auditEdit('+aid+')">'
        +'<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:5px;margin-bottom:6px">'
          +'<div style="flex:1">'
            +'<div style="font-size:10px;font-family:monospace;color:'+col.col+';margin-bottom:2px">'+a.ref+'</div>'
            +'<div style="font-size:11px;font-weight:700;color:#0f172a;line-height:1.3">'+a.titre+'</div>'
          +'</div>'
          +'<button onclick="event.stopPropagation();auditDelete('+aid+')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:12px;padding:0;flex-shrink:0">✕</button>'
        +'</div>'
        +typeBadge(a.type)
        +'<div style="margin:7px 0;font-size:9.5px;color:#64748b;display:flex;flex-direction:column;gap:3px">'
          +'<div>📅 '+a.dateDebut+' · 👤 '+a.auditeur+'</div>'
          +'<div>📍 '+a.processus+' · '+a.zone+'</div>'
        +'</div>'
        +(nc>0?'<div style="margin-bottom:6px"><span style="background:#fef2f2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 8px;border-radius:8px">⚠ '+nc+' NC</span></div>':'')
        +(a.score?'<div style="margin-bottom:6px"><span style="background:#f0fdf4;color:#16a34a;font-size:9px;font-weight:700;padding:2px 8px;border-radius:8px">KPI '+a.score+'%</span></div>':'')
        +'<div style="height:4px;background:#e5e7eb;border-radius:2px"><div style="width:'+a.prog+'%;height:100%;background:'+col.col+';border-radius:2px"></div></div>'
      +'</div>';
    }).join('');
    return '<div style="flex:1;min-width:0">'
      +'<div style="background:'+col.bg+';border:1px solid '+col.col+'25;border-radius:9px;padding:8px 11px;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">'
        +'<span style="font-size:11px;font-weight:700;color:'+col.col+'">'+col.s+'</span>'
        +'<span style="background:'+col.col+';color:#fff;font-size:10px;font-weight:700;border-radius:10px;padding:1px 7px">'+items.length+'</span>'
      +'</div>'
      +cards
      +'<button onclick="window.auditFilter.statut=\''+col.s+'\';auditNew()" style="width:100%;padding:7px;background:transparent;border:1.5px dashed #e2e8f0;border-radius:7px;cursor:pointer;font-size:10.5px;color:#94a3b8">+ Ajouter</button>'
    +'</div>';
  }).join('');
  var listRows=filtered.map(function(a){
    var aid=JSON.stringify(a.id);
    var nc=(window.AUDIT_CONSTATS||[]).filter(function(c){return c.auditId===a.id&&c.type==='NC';}).length;
    return '<tr>'
      +'<td style="font-family:monospace;font-size:10px;color:#0284c7;font-weight:700">'+a.ref+'</td>'
      +'<td style="font-size:11px;font-weight:600;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.titre+'</td>'
      +'<td>'+typeBadge(a.type)+'</td>'
      +'<td style="font-size:10.5px;color:#64748b">'+a.processus+'</td>'
      +'<td style="font-size:10.5px">'+a.auditeur+'</td>'
      +'<td style="font-size:10px;color:#94a3b8">'+a.dateDebut+'</td>'
      +'<td><span style="background:'+sBg(a.statut)+';color:'+sColor(a.statut)+';font-size:9px;font-weight:700;padding:2px 9px;border-radius:10px">'+a.statut+'</span></td>'
      +'<td style="font-size:11px;font-weight:700;color:'+(a.score?'#16a34a':'#94a3b8')+'">'+(a.score?a.score+'%':'—')+'</td>'
      +'<td>'+(nc?'<span style="background:#fef2f2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 7px;border-radius:8px">'+nc+' NC</span>':'—')+'</td>'
      +'<td><div style="display:flex;gap:3px">'
        +'<button onclick="auditEdit('+aid+')" class="btn bsm">✏</button>'
        +'<button onclick="window.auditSelAudit='+aid+';goPage(\'audit-checklist\')" class="btn bsm bp" style="font-size:9px">✓</button>'
        +'<button onclick="auditDelete('+aid+')" class="btn bsm" style="color:#dc2626;border-color:#fecaca">✕</button>'
      +'</div></td>'
    +'</tr>';
  }).join('');
  var hasF=fT||fP||fS||fQ;
  return '<div class="content">'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<div class="filter-search"><span>🔍</span><input placeholder="Titre, référence, auditeur…" value="'+(window.auditFilter&&window.auditFilter.q||'')+'" oninput="if(!window.auditFilter)window.auditFilter={};window.auditFilter.q=this.value;reloadPage(\'audit-liste\')" style="border:none;background:transparent;font-size:11px;outline:none;width:100%"></div>'
      +'<select class="filter-sel'+(fT?' active':'')+'" onchange="if(!window.auditFilter)window.auditFilter={};window.auditFilter.type=this.value;reloadPage(\'audit-liste\')">'+'<option value="">Toutes normes</option>'+types.map(function(t){return '<option'+(t===fT?' selected':'')+' value="'+t+'">'+t+'</option>';}).join('')+'</select>'
      +'<select class="filter-sel'+(fP?' active':'')+'" onchange="if(!window.auditFilter)window.auditFilter={};window.auditFilter.processus=this.value;reloadPage(\'audit-liste\')">'+'<option value="">Tous processus</option>'+procs.map(function(p){return '<option'+(p===fP?' selected':'')+' value="'+p+'">'+p+'</option>';}).join('')+'</select>'
      +'<select class="filter-sel'+(fS?' active':'')+'" onchange="if(!window.auditFilter)window.auditFilter={};window.auditFilter.statut=this.value;reloadPage(\'audit-liste\')">'+'<option value="">Tous statuts</option>'+['Planifié','En cours','Terminé','En retard'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('')+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.auditFilter={type:\'\',processus:\'\',statut:\'\',q:\'\'};reloadPage(\'audit-liste\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<P.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
      +'<div style="margin-left:auto;display:flex;gap:3px">'
        +'<button onclick="window.auditView=\'kanban\';reloadPage(\'audit-liste\')" style="padding:5px 10px;font-size:10px;font-weight:600;border:none;cursor:pointer;border-radius:5px;background:'+(view==='kanban'?'var(--blue)':'transparent')+';color:'+(view==='kanban'?'#fff':'var(--muted)')+'">⬛ Kanban</button>'
        +'<button onclick="window.auditView=\'liste\';reloadPage(\'audit-liste\')" style="padding:5px 10px;font-size:10px;font-weight:600;border:none;cursor:pointer;border-radius:5px;background:'+(view==='liste'?'var(--blue)':'transparent')+';color:'+(view==='liste'?'#fff':'var(--muted)')+'">≡ Liste</button>'
      +'</div>'
    +'</div></div>'
    +(view==='kanban'
      ?'<div style="display:flex;gap:10px;align-items:flex-start;overflow-x:auto">'+kanban+'</div>'
      :'<div class="card"><div class="ch"><span class="ct">📋 Tous les audits</span><button class="btn bp" onclick="auditNew()">+ Nouvel audit</button></div><div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Réf.</th><th>Titre</th><th>Norme</th><th>Processus</th><th>Auditeur</th><th>Date</th><th>Statut</th><th>Score</th><th>NC</th><th>Actions</th></tr></thead><tbody>'+listRows+'</tbody></table></div></div>'
    )
  +'</div>';

}
