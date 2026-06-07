/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_actions() {

  var A=window.AUDIT_ACTIONS||[];
  var fS=window.auditActFiltS||'';
  var hasF=!!fS;
  var filtered=A.filter(function(a){return !fS||a.statut===fS;});
  var totProg=A.length?Math.round(A.reduce(function(s,a){return s+a.prog;},0)/A.length):0;
  function stBadge(s){var c=s==='Terminée'?'bg3':s==='En cours'?'bb':s==='À faire'?'bgr':'br';return '<span class="badge '+c+'">'+s+'</span>';}
  var kpis=[['Total',A.length,'#0284c7','#eff6ff'],['À faire',A.filter(function(a){return a.statut==='À faire';}).length,'#64748b','#f8fafc'],['En cours',A.filter(function(a){return a.statut==='En cours';}).length,'#f59e0b','#fffbeb'],['Terminées',A.filter(function(a){return a.statut==='Terminée';}).length,'#16a34a','#f0fdf4']];
  var kpiHtml=kpis.map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('');
  var rows=filtered.map(function(a){
    var aid=JSON.stringify(a.id);
    var bc=a.prog===100?'#16a34a':a.statut==='À faire'?'#94a3b8':'#0284c7';
    var constat=(window.AUDIT_CONSTATS||[]).find(function(c){return c.id===a.constatId;});
    return '<tr>'
      +'<td style="font-family:monospace;font-size:10px;color:#0284c7">'+a.id+'</td>'
      +'<td style="font-size:11px;font-weight:600;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.action+'</td>'
      +'<td style="font-size:10px;color:#94a3b8">'+(a.constatId||'—')+'</td>'
      +'<td style="font-size:10.5px">'+a.resp+'</td>'
      +'<td style="font-size:10.5px;'+(a.statut==='À faire'?'color:#dc2626;font-weight:700':'')+'">'+a.echeance+'</td>'
      +'<td><div style="display:flex;align-items:center;gap:5px"><div style="width:70px;height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+a.prog+'%;height:100%;background:'+bc+';border-radius:3px"></div></div><span style="font-size:10px;color:#94a3b8">'+a.prog+'%</span></div></td>'
      +'<td>'+stBadge(a.statut)+'</td>'
      +'<td><button onclick="auditEditAction('+aid+')" class="btn bsm">✏</button></td>'
    +'</tr>';
  }).join('');
  return '<div class="content">'
    +'<div class="card" style="background:linear-gradient(135deg,#0c4a6e,#0284c7);color:#fff;margin-bottom:12px"><div style="display:flex;align-items:center;justify-content:space-between"><div><div style="font-size:13px;font-weight:700">⚡ Suivi des actions correctives</div><div style="font-size:10px;opacity:.7;margin-top:1px">'+A.length+' actions · '+A.filter(function(a){return a.statut==="Terminée";}).length+' terminées</div></div><div style="text-align:center"><div style="font-size:30px;font-weight:800">'+totProg+'%</div><div style="font-size:9px;opacity:.7">Progression</div></div></div><div style="height:5px;background:rgba(255,255,255,.2);border-radius:3px;margin-top:9px"><div style="width:'+totProg+'%;height:100%;background:#fff;border-radius:3px"></div></div></div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<select class="filter-sel'+(fS?' active':'')+'" onchange="window.auditActFiltS=this.value;reloadPage(\'audit-actions\')">'+'<option value="">Tous statuts</option>'+['À faire','En cours','Terminée'].map(function(s){return '<option'+(s===fS?' selected':'')+' value="'+s+'">'+s+'</option>';}).join('')+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.auditActFiltS=\'\';reloadPage(\'audit-actions\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<A.length?' has-results':'')+'">'+filtered.length+' résultat'+(filtered.length>1?'s':'')+'</span>'
      +'<button onclick="auditExport(\'actions\')" class="btn bsm" style="margin-left:auto;background:#f0fdf4;color:#16a34a;border-color:#86efac">📊 Export</button>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">⚡ Actions correctives</span><button class="btn bp" onclick="auditNewAction()">+ Nouvelle action</button></div>'
      +'<table class="tbl"><thead><tr><th>ID</th><th>Action</th><th>Constat lié</th><th>Responsable</th><th>Échéance</th><th>Progression</th><th>Statut</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>'
  +'</div>';

}
