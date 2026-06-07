/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_ecarts() {

  var EC=window.SS5_ECARTS||[];
  var fZ=window.ss5EcFZ||'Tous',fG=window.ss5EcFG||'Tous',fS=window.ss5EcFS||'Tous',fQ=(window.ss5EcFQ||'').toLowerCase();
  var zones=[...new Set(EC.map(function(e){return e.zone;}))].sort();
  function gb(g){return g==='Majeure'?'<span class="badge br">'+g+'</span>':g==='Moyenne'?'<span class="badge bo">'+g+'</span>':'<span class="badge bgr">'+g+'</span>';}
  function sb(s){return s==='Ouvert'?'<span class="badge br">'+s+'</span>':s==='En cours'?'<span class="badge bb">'+s+'</span>':s==='Clôturé'?'<span class="badge bg3">'+s+'</span>':'<span class="badge by">'+s+'</span>';}
  var filtered=EC.filter(function(e){return(fZ==='Tous'||e.zone===fZ)&&(fG==='Tous'||e.gravite===fG)&&(fS==='Tous'||e.statut===fS)&&(!fQ||[e.zone,e.ecart,e.resp].join(' ').toLowerCase().includes(fQ));});
  var rows=filtered.map(function(e){
    var eid=JSON.stringify(e.id);
    return '<tr><td style="font-family:monospace;font-size:10px;color:#2563eb">'+e.id+'</td><td style="font-size:10px;color:#94a3b8">'+e.date+'</td><td style="font-size:11px;font-weight:600">'+e.zone+'</td><td style="font-size:10.5px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+e.ecart+'</td><td>'+gb(e.gravite)+'</td><td>'+sb(e.statut)+'</td><td style="font-size:10.5px">'+e.resp+'</td><td style="font-size:10.5px;'+(e.statut==='Ouvert'?'color:#dc2626;font-weight:700':'')+'">'+e.dl+'</td>'
      +'<td><div style="display:flex;gap:3px"><button onclick="ss5EditEcart('+eid+')" class="btn bsm">✏</button>'+(e.statut!=='Clôturé'?'<button onclick="ss5CloseEcart('+eid+')" class="btn bsm bg2" style="font-size:9px">✓</button>':'')+'</div></td>'
    +'</tr>';
  }).join('');
  var kpiHtml=[['Total',EC.length,'#2563eb','#eff6ff'],['Ouverts',EC.filter(function(e){return e.statut==='Ouvert';}).length,'#dc2626','#fef2f2'],['En cours',EC.filter(function(e){return e.statut==='En cours';}).length,'#f59e0b','#fffbeb'],['Clôturés',EC.filter(function(e){return e.statut==='Clôturé';}).length,'#16a34a','#f0fdf4']].map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('');
  var zOpts=zones.map(function(z){return '<option'+(z===fZ?' selected':'')+' value="'+z+'">'+z+'</option>';}).join('');
  var hasF=fZ!=='Tous'||fG!=='Tous'||fS!=='Tous'||!!fQ;
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<div class="filter-search"><span>🔍</span><input placeholder="Zone, écart, responsable…" value="'+(window.ss5EcFQ||'')+'" oninput="window.ss5EcFQ=this.value;reloadPage(\'5s-ecarts\')" style="border:none;background:transparent;font-size:11px;outline:none;width:100%"></div>'
      +'<select class="filter-sel'+(fZ!=='Tous'?' active':'')+'" onchange="window.ss5EcFZ=this.value;reloadPage(\'5s-ecarts\')">'+'<option value="Tous">Toutes zones</option>'+zOpts+'</select>'
      +'<select class="filter-sel'+(fG!=='Tous'?' active':'')+'" onchange="window.ss5EcFG=this.value;reloadPage(\'5s-ecarts\')">'+'<option value="Tous">Toutes gravités</option>'+['Majeure','Moyenne','Mineure'].map(function(g){return '<option'+(g===fG?' selected':'')+' value="'+g+'">'+g+'</option>';}).join('')+'</select>'
      +'<select class="filter-sel'+(fS!=='Tous'?' active':'')+'" onchange="window.ss5EcFS=this.value;reloadPage(\'5s-ecarts\')">'+'<option value="Tous">Tous statuts</option>'+['Ouvert','En cours','Clôturé'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('')+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.ss5EcFZ=\'Tous\';window.ss5EcFG=\'Tous\';window.ss5EcFS=\'Tous\';window.ss5EcFQ=\'\';reloadPage(\'5s-ecarts\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<EC.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">⚠ Écarts & non-conformités 5S</span><button class="btn bp" onclick="ss5NewEcart()">+ Nouvel écart</button></div>'
      +'<table class="tbl"><thead><tr><th>ID</th><th>Date</th><th>Zone</th><th>Écart identifié</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>'
  +'</div>';

}
