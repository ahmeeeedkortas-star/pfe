/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_planning() {

  var P=window.AUDIT_PLANS||[];
  var fType=window.auditPlanFType||'Tous',fProc=window.auditPlanFProc||'Tous';
  var types=[...new Set(P.map(function(a){return a.type;}))].sort();
  var procs=[...new Set(P.map(function(a){return a.processus;}))].sort();
  var filtered=P.filter(function(a){return(fType==='Tous'||a.type===fType)&&(fProc==='Tous'||a.processus===fProc);});
  function sb(s){var m={'Planifié':'background:#eff6ff;color:#2563eb','En cours':'background:#fffbeb;color:#92400e','Terminé':'background:#f0fdf4;color:#166534','En retard':'background:#fef2f2;color:#dc2626'};return '<span style="'+(m[s]||'background:#f1f5f9;color:#64748b')+';font-size:9px;font-weight:700;padding:2px 9px;border-radius:10px">'+s+'</span>';}
  function typeBadge(t){var m={'ISO 9001':'#1e40af','ISO 14001':'#166534','ISO 45001':'#9a3412','Interne':'#5b21b6'};return '<span style="background:'+(m[t]||'#64748b')+'22;color:'+(m[t]||'#64748b')+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">'+t+'</span>';}
  var kpis=[['Total',P.length,'#0284c7','#eff6ff'],['Planifiés',P.filter(function(a){return a.statut==='Planifié';}).length,'#2563eb','#eff6ff'],['En cours',P.filter(function(a){return a.statut==='En cours';}).length,'#f59e0b','#fffbeb'],['Terminés',P.filter(function(a){return a.statut==='Terminé';}).length,'#16a34a','#f0fdf4'],['En retard',P.filter(function(a){return a.statut==='En retard';}).length,'#dc2626','#fef2f2']];
  var kpiHtml=kpis.map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:11px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('');
  var wfSteps=['Planification','Préparation','Réalisation','Rapport','Clôture'];
  var tOpts=types.map(function(t){return '<option'+(t===fType?' selected':'')+' value="'+t+'">'+t+'</option>';}).join('');
  var pOpts=procs.map(function(p){return '<option'+(p===fProc?' selected':'')+' value="'+p+'">'+p+'</option>';}).join('');
  var hasF=fType!=='Tous'||fProc!=='Tous';
  var rows=filtered.map(function(a){
    var aid=JSON.stringify(a.id);
    var wp=Math.round(((a.wfStep-1)/4)*100);
    return '<tr>'
      +'<td style="font-family:monospace;font-size:10px;color:#0284c7;font-weight:700">'+a.ref+'</td>'
      +'<td style="font-size:11px;font-weight:600;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.titre+'</td>'
      +'<td>'+typeBadge(a.type)+'</td>'
      +'<td style="font-size:10.5px;color:#64748b">'+a.processus+'</td>'
      +'<td style="font-size:10.5px">'+a.auditeur+'</td>'
      +'<td style="font-size:10px;color:#94a3b8">'+a.dateDebut+'</td>'
      +'<td>'+sb(a.statut)+'</td>'
      +'<td><div style="min-width:100px">'
        +'<div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;margin-bottom:2px"><span>'+wfSteps[a.wfStep-1]+'</span><span>'+wp+'%</span></div>'
        +'<div style="height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+wp+'%;height:100%;background:#0284c7;border-radius:3px"></div></div>'
      +'</div></td>'
      +'<td><div style="display:flex;gap:3px">'
        +'<button onclick="auditEdit('+aid+')" class="btn bsm">✏</button>'
        +'<button onclick="window.auditSelAudit='+aid+';goPage(\'audit-checklist\')" class="btn bsm bp" style="font-size:9px">✓</button>'
        +'<button onclick="auditDelete('+aid+')" class="btn bsm" style="color:#dc2626;border-color:#fecaca">✕</button>'
      +'</div></td>'
    +'</tr>';
  }).join('');
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div class="filter-bar"><div class="filter-bar-body">'
      +'<select class="filter-sel'+(fType!=='Tous'?' active':'')+'" onchange="window.auditPlanFType=this.value;reloadPage(\'audit-planning\')">'+'<option value="Tous">Toutes normes</option>'+tOpts+'</select>'
      +'<select class="filter-sel'+(fProc!=='Tous'?' active':'')+'" onchange="window.auditPlanFProc=this.value;reloadPage(\'audit-planning\')">'+'<option value="Tous">Tous processus</option>'+pOpts+'</select>'
      +(hasF?'<button class="filter-reset" onclick="window.auditPlanFType=\'Tous\';window.auditPlanFProc=\'Tous\';reloadPage(\'audit-planning\')">✕ Reset</button>':'')
      +'<span class="filter-count'+(filtered.length<P.length?' has-results':'')+'">'+filtered.length+' audit'+(filtered.length>1?'s':'')+'</span>'
      +'<button onclick="auditExport(\'audits\')" class="btn bsm" style="margin-left:auto;background:#f0fdf4;color:#16a34a;border-color:#86efac">📊 Excel</button>'
      +'<button onclick="auditExport(\'pdf\')" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">📄 PDF</button>'
    +'</div></div>'
    +'<div class="card"><div class="ch"><span class="ct">📅 Programme des audits — Planning annuel</span><button class="btn bp" onclick="auditNew()">+ Planifier un audit</button></div>'
      +'<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Référence</th><th>Titre</th><th>Norme</th><th>Processus</th><th>Auditeur</th><th>Date</th><th>Statut</th><th>Workflow</th><th>Actions</th></tr></thead>'
      +'<tbody>'+rows+'</tbody></table></div>'
    +'</div>'
  +'</div>';

}
