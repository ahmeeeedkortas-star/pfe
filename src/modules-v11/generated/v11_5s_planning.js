/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_planning() {

  var AUD=window.SS5_AUDITS||[];
  var fZ=window.ss5PlanFZ||'Tous', fS=window.ss5PlanFS||'Tous';
  var zones=[...new Set(AUD.map(function(a){return a.zone;}))].sort();
  var filtered=AUD.filter(function(a){return(fZ==='Tous'||a.zone===fZ)&&(fS==='Tous'||a.statut===fS);});
  var kpis=[AUD.length,AUD.filter(function(a){return a.statut==='Planifié';}).length,AUD.filter(function(a){return a.statut==='En retard';}).length,AUD.filter(function(a){return a.statut==='Réalisé';}).length];
  function sbl(s){var m={Réalisé:'background:#f0fdf4;color:#16a34a','En retard':'background:#fef2f2;color:#dc2626',Planifié:'background:#eff6ff;color:#2563eb'};return '<span style="'+(m[s]||'background:#f1f5f9;color:#64748b')+';font-size:9px;font-weight:700;padding:2px 9px;border-radius:10px">'+s+'</span>';}
  var rows=filtered.map(function(a){
    var aid=JSON.stringify(a.id);
    var btns='';
    if(a.statut==='Planifié') btns+='<button onclick="ss5StartAudit('+aid+')" class="btn bsm bp" style="font-size:9px">▶ Démarrer</button>';
    if(a.statut==='Réalisé') btns+='<button onclick="ss5ViewRapport('+aid+')" class="btn bsm" style="font-size:9px">📄</button>';
    btns+='<button onclick="ss5EditAudit('+aid+')" class="btn bsm" style="font-size:9px">✏</button>';
    btns+='<button onclick="ss5DeleteAudit('+aid+')" class="btn bsm" style="font-size:9px;color:#dc2626;border-color:#fecaca">✕</button>';
    return '<tr><td style="font-size:10px;color:#94a3b8">'+a.date+'</td><td style="font-size:11px;font-weight:600">'+a.zone+'</td><td style="font-size:10.5px">'+a.auditeur+'</td><td style="font-size:10.5px">'+ss5ZoneResp(a.zone)+'</td><td>'+sbl(a.statut)+'</td><td><div style="display:flex;gap:4px">'+btns+'</div></td></tr>';
  }).join('');
  var kpiColors=[['#2563eb','#eff6ff'],['#7c3aed','#f5f3ff'],['#dc2626','#fef2f2'],['#16a34a','#f0fdf4']];
  var kpiLbls=['Total','Planifiés','En retard','Réalisés'];
  var kpiHtml=kpis.map(function(v,i){return '<div style="background:'+kpiColors[i][1]+';border:1px solid '+kpiColors[i][0]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+kpiColors[i][0]+';font-weight:600;margin-bottom:4px">'+kpiLbls[i]+'</div><div style="font-size:24px;font-weight:800;color:'+kpiColors[i][0]+'">'+v+'</div></div>';}).join('');
  var zOpts=zones.map(function(z){return '<option'+(z===fZ?' selected':'')+' value="'+z+'">'+z+'</option>';}).join('');
  var sOpts=['Planifié','Réalisé','En retard'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('');
  var hasFilter=fZ!=='Tous'||fS!=='Tous';
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<select class="filter-sel'+(fZ!=='Tous'?' active':'')+'" onchange="window.ss5PlanFZ=this.value;reloadPage(\'5s-planning\')">'
        +'<option value="Tous">🏭 Toutes zones</option>'+zOpts
      +'</select>'
      +'<select class="filter-sel'+(fS!=='Tous'?' active':'')+'" onchange="window.ss5PlanFS=this.value;reloadPage(\'5s-planning\')">'
        +'<option value="Tous">📌 Tous statuts</option>'+sOpts
      +'</select>'
      +(hasFilter?'<button class="filter-reset" onclick="window.ss5PlanFZ=\'Tous\';window.ss5PlanFS=\'Tous\';reloadPage(\'5s-planning\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<AUD.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">📅 Planning des audits 5S</span><button class="btn bp" onclick="ss5NewAudit()">+ Planifier un audit</button></div>'
      +'<table class="tbl"><thead><tr><th>Date</th><th>Zone</th><th>Auditeur</th><th>Resp. zone</th><th>Statut</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>'
  +'</div>';

}
