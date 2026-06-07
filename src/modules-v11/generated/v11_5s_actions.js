/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_actions() {

  var ACT=window.SS5_ACTIONS||[];
  var view=window.ss5ActView||'kanban';
  var fZ=window.ss5ActFZ||'Tous',fS=window.ss5ActFS||'Tous',fP=window.ss5ActFP||'Tous';
  var zones=[...new Set(ACT.map(function(a){return a.zone;}))].sort();
  var filtered=ACT.filter(function(a){return(fZ==='Tous'||a.zone===fZ)&&(fS==='Tous'||a.statut===fS)&&(fP==='Tous'||a.prio===fP);});
  function prioBadge(p){return p==='Critique'?'<span class="badge br" style="font-size:8px">'+p+'</span>':p==='Haute'?'<span class="badge bo" style="font-size:8px">'+p+'</span>':'<span class="badge bgr" style="font-size:8px">'+p+'</span>';}
  function stBadge(s){var c=s==='Clôturée'?'bg3':s==='En cours'?'bb':s==='En retard'?'br':'bgr';return '<span class="badge '+c+'">'+s+'</span>';}
  var colCfg=[{s:'À faire',col:'#64748b',bg:'#f8fafc'},{s:'En cours',col:'#2563eb',bg:'#eff6ff'},{s:'En retard',col:'#dc2626',bg:'#fef2f2'},{s:'Clôturée',col:'#16a34a',bg:'#f0fdf4'}];
  var kanban=colCfg.map(function(col){
    var items=filtered.filter(function(a){return a.statut===col.s;});
    var cards=items.map(function(a){
      var aid=JSON.stringify(a.id);
      return '<div style="background:#fff;border:1px solid var(--border);border-left:3px solid '+col.col+';border-radius:8px;padding:10px;margin-bottom:6px;cursor:pointer" onclick="ss5EditAction('+aid+')">'
        +'<div style="display:flex;align-items:flex-start;gap:5px;margin-bottom:5px">'
          +'<div style="flex:1"><div style="font-size:11px;font-weight:700;color:#0f2044;line-height:1.3">'+a.action+'</div><div style="font-size:9.5px;color:#94a3b8">'+a.zone+'</div></div>'
          +'<button onclick="event.stopPropagation();ss5DeleteAction('+aid+')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:12px;padding:0">✕</button>'
        +'</div>'
        +'<div style="display:flex;gap:3px;margin-bottom:6px">'+prioBadge(a.prio)+'<span class="badge bgr" style="font-size:8px">'+a.type+'</span></div>'
        +'<div style="height:4px;background:#e5e7eb;border-radius:2px;margin-bottom:5px"><div style="width:'+a.prog+'%;height:100%;background:'+col.col+';border-radius:2px"></div></div>'
        +'<div style="display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8"><span>'+a.resp+'</span><span>'+a.fin+'</span><span>'+a.prog+'%</span></div>'
      +'</div>';
    }).join('');
    return '<div style="flex:1;min-width:0">'
      +'<div style="background:'+col.bg+';border:1px solid '+col.col+'25;border-radius:8px;padding:8px 10px;margin-bottom:7px;display:flex;align-items:center;justify-content:space-between">'
        +'<span style="font-size:11px;font-weight:700;color:'+col.col+'">'+col.s+'</span>'
        +'<span style="background:'+col.col+';color:#fff;font-size:10px;font-weight:700;border-radius:10px;padding:1px 7px">'+items.length+'</span>'
      +'</div>'
      +cards
      +'<button onclick="window.ss5ActPresetStatus=\''+col.s+'\';ss5NewAction()" style="width:100%;padding:7px;background:transparent;border:1.5px dashed #e2e8f0;border-radius:7px;cursor:pointer;font-size:10.5px;color:#94a3b8">+ Ajouter</button>'
    +'</div>';
  }).join('');
  var listRows=filtered.map(function(a){var aid=JSON.stringify(a.id);return '<tr><td style="font-size:11px;font-weight:600">'+a.action+'</td><td style="font-size:10.5px;color:#64748b">'+a.zone+'</td><td>'+prioBadge(a.prio)+'</td><td style="font-size:10.5px">'+a.resp+'</td><td style="font-size:10.5px">'+a.fin+'</td><td>'+stBadge(a.statut)+'</td><td><div style="display:flex;align-items:center;gap:5px"><div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+a.prog+'%;height:100%;background:'+(a.prog===100?'#16a34a':'#2563eb')+';border-radius:3px"></div></div><span style="font-size:10px;color:#94a3b8">'+a.prog+'%</span></div></td><td><button onclick="ss5EditAction('+aid+')" class="btn bsm">✏</button></td></tr>';}).join('');
  var kpiHtml=[['Total',ACT.length,'#2563eb','#eff6ff'],['Clôturées',ACT.filter(function(a){return a.statut==='Clôturée';}).length,'#16a34a','#f0fdf4'],['En cours',ACT.filter(function(a){return a.statut==='En cours';}).length,'#f59e0b','#fffbeb'],['En retard',ACT.filter(function(a){return a.statut==='En retard';}).length,'#dc2626','#fef2f2']].map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:11px 13px;display:flex;align-items:center;gap:8px"><div><div style="font-size:22px;font-weight:800;color:'+k[2]+';line-height:1">'+k[1]+'</div><div style="font-size:9px;color:'+k[2]+';opacity:.7">'+k[0]+'</div></div></div>';}).join('');
  var zOpts=zones.map(function(z){return '<option'+(z===fZ?' selected':'')+' value="'+z+'">'+z+'</option>';}).join('');
  var hasF=fZ!=='Tous'||fS!=='Tous'||fP!=='Tous';
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<select class="filter-sel'+(fZ!=='Tous'?' active':'')+'" onchange="window.ss5ActFZ=this.value;reloadPage(\'5s-actions\')">'+'<option value="Tous">Toutes zones</option>'+zOpts+'</select>'
      +'<select class="filter-sel'+(fS!=='Tous'?' active':'')+'" onchange="window.ss5ActFS=this.value;reloadPage(\'5s-actions\')">'+'<option value="Tous">Tous statuts</option>'+['À faire','En cours','En retard','Clôturée'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('')+'</select>'
      +'<select class="filter-sel'+(fP!=='Tous'?' active':'')+'" onchange="window.ss5ActFP=this.value;reloadPage(\'5s-actions\')">'+'<option value="Tous">Toutes priorités</option>'+['Critique','Haute','Normale'].map(function(p){return '<option'+(p===fP?' selected':'')+' value="'+p+'">'+p+'</option>';}).join('')+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.ss5ActFZ=\'Tous\';window.ss5ActFS=\'Tous\';window.ss5ActFP=\'Tous\';reloadPage(\'5s-actions\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<ACT.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
      +'<div style="margin-left:auto;display:flex;gap:3px">'
        +'<button onclick="window.ss5ActView=\'kanban\';reloadPage(\'5s-actions\')" style="padding:5px 10px;font-size:10px;font-weight:600;border:none;cursor:pointer;border-radius:5px;background:'+(view==='kanban'?'var(--blue)':'transparent')+';color:'+(view==='kanban'?'#fff':'var(--muted)')+'">Kanban</button>'
        +'<button onclick="window.ss5ActView=\'liste\';reloadPage(\'5s-actions\')" style="padding:5px 10px;font-size:10px;font-weight:600;border:none;cursor:pointer;border-radius:5px;background:'+(view==='liste'?'var(--blue)':'transparent')+';color:'+(view==='liste'?'#fff':'var(--muted)')+'">Liste</button>'
      +'</div>'
    +'</div></div>'
    +(view==='kanban'?'<div style="display:flex;gap:10px;align-items:flex-start;overflow-x:auto">'+kanban+'</div>':'<div class="card"><div class="ch"><span class="ct">Liste des actions</span><button class="btn bp" onclick="ss5NewAction()">+ Nouvelle action</button></div><table class="tbl"><thead><tr><th>Action</th><th>Zone</th><th>Prio.</th><th>Responsable</th><th>Échéance</th><th>Statut</th><th>Prog.</th><th></th></tr></thead><tbody>'+listRows+'</tbody></table></div>')
  +'</div>';

}
