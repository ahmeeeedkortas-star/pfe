/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_constats() {

  var C=window.AUDIT_CONSTATS||[];
  var fT=window.auditConstatFilter&&window.auditConstatFilter.type||'';
  var fS=window.auditConstatFilter&&window.auditConstatFilter.statut||'';
  var fQ=(window.auditConstatFilter&&window.auditConstatFilter.q||'').toLowerCase();
  if(!window.auditConstatFilter) window.auditConstatFilter={type:'',statut:'',q:''};
  var filtered=C.filter(function(c){
    if(fT&&c.type!==fT)return false;
    if(fS&&c.statut!==fS)return false;
    if(fQ&&![c.id,c.desc,c.processus,c.resp].join(' ').toLowerCase().includes(fQ))return false;
    return true;
  });
  function gb(g){return g==='Majeure'?'<span class="badge br">Majeure</span>':g==='Mineure'?'<span class="badge bgr">Mineure</span>':'<span class="badge bb">—</span>';}
  function sb(s){return s==='Ouvert'?'<span class="badge br">Ouvert</span>':s==='En cours'?'<span class="badge bb">En cours</span>':s==='Clôturé'?'<span class="badge bg3">Clôturé</span>':'<span class="badge by">'+s+'</span>';}
  function typeBadge(t){return t==='NC'?'<span style="background:#fef2f2;color:#dc2626;font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">NC</span>':t==='OBS'?'<span style="background:#fffbeb;color:#92400e;font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">OBS</span>':'<span style="background:#f0fdf4;color:#166534;font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">BP</span>';}
  var rows=filtered.map(function(c){var cid=JSON.stringify(c.id);return '<tr><td style="font-family:monospace;font-size:10px;color:#dc2626">'+c.id+'</td><td>'+typeBadge(c.type)+'</td><td style="font-size:10.5px;color:#64748b">'+c.dateDetect+'</td><td style="font-size:10.5px;font-weight:600">'+c.processus+'</td><td style="font-size:10.5px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+c.desc+'</td><td>'+gb(c.gravite)+'</td><td>'+sb(c.statut)+'</td><td style="font-size:10.5px">'+c.resp+'</td><td style="font-size:9.5px;color:#94a3b8">'+c.ref+'</td><td><div style="display:flex;gap:3px">'+(c.statut!=='Clôturé'?'<button onclick="auditCloseConstat('+cid+')" class="btn bsm bg2" style="font-size:9px">✓</button>':'')+'<button onclick="auditNewAction()" class="btn bsm bp" style="font-size:9px">+A</button></div></td></tr>';}).join('');
  var kpis=[['Total',C.length,'#0284c7','#eff6ff'],['NC ouvertes',C.filter(function(c){return c.type==='NC'&&c.statut!=='Clôturé';}).length,'#dc2626','#fef2f2'],['Observations',C.filter(function(c){return c.type==='OBS';}).length,'#f59e0b','#fffbeb'],['Clôturées',C.filter(function(c){return c.statut==='Clôturé';}).length,'#16a34a','#f0fdf4']];
  var kpiHtml=kpis.map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('');
  var hasF=fT||fS||fQ;
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<div class="filter-search"><span>🔍</span><input placeholder="N°, description, responsable…" value="'+(window.auditConstatFilter&&window.auditConstatFilter.q||'')+'" oninput="if(!window.auditConstatFilter)window.auditConstatFilter={};window.auditConstatFilter.q=this.value;reloadPage(\'audit-constats\')" style="border:none;background:transparent;font-size:11px;outline:none;width:100%"></div>'
      +'<select class="filter-sel'+(fT?' active':'')+'" onchange="if(!window.auditConstatFilter)window.auditConstatFilter={};window.auditConstatFilter.type=this.value;reloadPage(\'audit-constats\')">'+'<option value="">Tous types</option>'+['NC','OBS','BP'].map(function(t){return '<option'+(t===fT?' selected':'')+' value="'+t+'">'+t+'</option>';}).join('')+'</select>'
      +'<select class="filter-sel'+(fS?' active':'')+'" onchange="if(!window.auditConstatFilter)window.auditConstatFilter={};window.auditConstatFilter.statut=this.value;reloadPage(\'audit-constats\')">'+'<option value="">Tous statuts</option>'+['Ouvert','En cours','Clôturé'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('')+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.auditConstatFilter={type:\'\',statut:\'\',q:\'\'};reloadPage(\'audit-constats\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<C.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
      +'<button onclick="auditExport(\'constats\')" class="btn bsm" style="margin-left:auto;background:#f0fdf4;color:#16a34a;border-color:#86efac">📊 Export</button>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">⚠ Constats d\'audit — NC · Observations · Bonnes pratiques</span><button class="btn bp" onclick="auditNewConstat()">+ Nouveau constat</button></div>'
      +'<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>N°</th><th>Type</th><th>Date</th><th>Processus</th><th>Description</th><th>Gravité</th><th>Statut</th><th>Resp.</th><th>Réf. ISO</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>'
    +'</div>'
  +'</div>';

}
