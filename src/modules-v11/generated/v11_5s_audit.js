/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_audit() {

  var AUD=window.SS5_AUDITS||[];
  var fZ=window.ss5AudFZ||'Tous', fS=window.ss5AudFS||'Tous', fQ=(window.ss5AudFQ||'').toLowerCase();
  var zones=[...new Set(AUD.map(function(a){return a.zone;}))].sort();
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  var filtered=AUD.filter(function(a){return(fZ==='Tous'||a.zone===fZ)&&(fS==='Tous'||a.statut===fS)&&(!fQ||[a.zone,a.auditeur,a.id].join(' ').toLowerCase().includes(fQ));});
  var avgS=Math.round((filtered.filter(function(a){return a.score;}).reduce(function(s,a){return s+a.score;},0)/Math.max(filtered.filter(function(a){return a.score;}).length,1))||0);
  var rows=filtered.map(function(a){
    var aid=JSON.stringify(a.id);
    var stB=a.statut==='Réalisé'?'<span class="badge bg3">Réalisé</span>':a.statut==='En retard'?'<span class="badge br">En retard</span>':'<span class="badge bb">Planifié</span>';
    var btns=a.statut==='Réalisé'?'<button onclick="ss5ViewRapport('+aid+')" class="btn bsm">📄 Rapport</button>':'<button onclick="goPage(\'5s-checklist\')" class="btn bsm bp" style="font-size:9px">📋 Évaluer</button>';
    btns+='<button onclick="ss5EditAudit('+aid+')" class="btn bsm">✏</button>';
    return '<tr><td style="font-family:monospace;font-size:10px;color:#2563eb;font-weight:700">'+a.id+'</td><td style="font-size:10px;color:#94a3b8">'+a.date+'</td><td style="font-size:11px;font-weight:600">'+a.zone+'</td><td style="font-size:10.5px">'+a.auditeur+'</td><td style="font-size:14px;font-weight:800;color:'+(a.score?sc(a.score):'#94a3b8')+'">'+(a.score?a.score+'%':'—')+'</td><td>'+stB+'</td><td><div style="display:flex;gap:4px">'+btns+'</div></td></tr>';
  }).join('');
  var kpis=[['Total',AUD.length,'#2563eb','#eff6ff'],['Réalisés',AUD.filter(function(a){return a.statut==='Réalisé';}).length,'#16a34a','#f0fdf4'],['En retard',AUD.filter(function(a){return a.statut==='En retard';}).length,'#dc2626','#fef2f2'],['Score moyen',avgS+'%','#7c3aed','#f5f3ff']];
  var kpiHtml=kpis.map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('');
  var zOpts=zones.map(function(z){return '<option'+(z===fZ?' selected':'')+' value="'+z+'">'+z+'</option>';}).join('');
  var sOpts=['Réalisé','Planifié','En retard'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('');
  var hasF=fZ!=='Tous'||fS!=='Tous'||!!fQ;
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<div class="filter-search"><span>🔍</span><input placeholder="Zone, auditeur, ID…" value="'+(window.ss5AudFQ||'')+'" oninput="window.ss5AudFQ=this.value;reloadPage(\'5s-audit\')" style="border:none;background:transparent;font-size:11px;outline:none;width:100%"></div>'
      +'<select class="filter-sel'+(fZ!=='Tous'?' active':'')+'" onchange="window.ss5AudFZ=this.value;reloadPage(\'5s-audit\')">'+'<option value="Tous">Toutes zones</option>'+zOpts+'</select>'
      +'<select class="filter-sel'+(fS!=='Tous'?' active':'')+'" onchange="window.ss5AudFS=this.value;reloadPage(\'5s-audit\')">'+'<option value="Tous">Tous statuts</option>'+sOpts+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.ss5AudFZ=\'Tous\';window.ss5AudFS=\'Tous\';window.ss5AudFQ=\'\';reloadPage(\'5s-audit\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<AUD.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
      +'<button onclick="ss5Export(\'csv\')" class="btn bsm" style="margin-left:auto;background:#f0fdf4;color:#16a34a;border-color:#86efac">📊 Excel</button>'
      +'<button onclick="ss5Export(\'pdf\')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">📄 PDF</button>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">✓ Liste des audits 5S</span><button class="btn bp" onclick="ss5NewAudit()">+ Nouvel audit</button></div>'
      +'<table class="tbl"><thead><tr><th>ID</th><th>Date</th><th>Zone</th><th>Auditeur</th><th>Score</th><th>Statut</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>'
  +'</div>';

}
