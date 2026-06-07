/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_checklist() {

  var CL=window.AUDIT_CHECKLISTS||[];
  var selId=window.auditSelCL||(CL[0]?CL[0].id:null);
  var cl=CL.find(function(c){return c.id===selId;})||CL[0];
  if(!window.AUDIT_CL_DATA) window.AUDIT_CL_DATA={};
  if(cl&&!window.AUDIT_CL_DATA[cl.id]) window.AUDIT_CL_DATA[cl.id]={};
  var D=cl?window.AUDIT_CL_DATA[cl.id]:{};
  var items=cl?cl.items:[];
  var conforme=items.filter(function(it){return D[it.n]==='C';}).length;
  var ncItems=items.filter(function(it){return D[it.n]==='NC';}).length;
  var obs=items.filter(function(it){return D[it.n]==='OBS';}).length;
  var total=items.length||1;
  var score=Math.round(conforme/total*100);
  var normeColors={'ISO 9001':'#1e40af','ISO 14001':'#166534','ISO 45001':'#9a3412','Interne':'#5b21b6'};
  var nc=cl?normeColors[cl.norme]||'#5b21b6':'#5b21b6';
  var sections=[...new Set(items.map(function(it){return it.section;}))];
  var cOpts=CL.map(function(c){return '<option value="'+c.id+'"'+(c.id===selId?' selected':'')+'>'+c.titre.substring(0,45)+'</option>';}).join('');
  var rows=items.map(function(it){
    var rep=D[it.n]||null;
    var cid=JSON.stringify(cl?cl.id:''), nk=JSON.stringify(it.n);
    var isC=rep==='C',isNC=rep==='NC',isObs=rep==='OBS',isNA=rep==='NA';
    var trBg=isNC?'#fef2f2':isC?'#f0fdf4':'#fff';
    return '<tr style="background:'+trBg+'">'
      +'<td style="font-size:10px;color:#94a3b8;width:40px">'+it.exig+'</td>'
      +'<td style="font-size:10px;color:#64748b;width:120px">'+it.section+'</td>'
      +'<td style="font-size:11px;line-height:1.4">'+it.desc+'</td>'
      +'<td style="text-align:center;width:38px"><button onclick="auditClSet('+cid+','+nk+',\'C\')" style="width:28px;height:28px;border-radius:50%;border:2px solid '+(isC?'#16a34a':'#e2e8f0')+';background:'+(isC?'#16a34a':'#fff')+';color:'+(isC?'#fff':'#d1d5db')+';cursor:pointer;font-size:11px;font-weight:700">C</button></td>'
      +'<td style="text-align:center;width:38px"><button onclick="auditClSet('+cid+','+nk+',\'NC\')" style="width:28px;height:28px;border-radius:50%;border:2px solid '+(isNC?'#dc2626':'#e2e8f0')+';background:'+(isNC?'#dc2626':'#fff')+';color:'+(isNC?'#fff':'#d1d5db')+';cursor:pointer;font-size:9px;font-weight:700">NC</button></td>'
      +'<td style="text-align:center;width:38px"><button onclick="auditClSet('+cid+','+nk+',\'OBS\')" style="width:28px;height:28px;border-radius:50%;border:2px solid '+(isObs?'#f59e0b':'#e2e8f0')+';background:'+(isObs?'#f59e0b':'#fff')+';color:'+(isObs?'#fff':'#d1d5db')+';cursor:pointer;font-size:9px;font-weight:700">OBS</button></td>'
      +'<td style="text-align:center;width:38px"><button onclick="auditClSet('+cid+','+nk+',\'NA\')" style="width:28px;height:28px;border-radius:50%;border:2px solid '+(isNA?'#94a3b8':'#e2e8f0')+';background:'+(isNA?'#94a3b8':'#fff')+';color:'+(isNA?'#fff':'#d1d5db')+';cursor:pointer;font-size:9px">N/A</button></td>'
    +'</tr>';
  }).join('');
  return '<div class="content">'
    +'<div class="card" style="background:linear-gradient(135deg,#0c4a6e,#0284c7);color:#fff;margin-bottom:11px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">'
        +'<div>'
          +'<div style="font-size:14px;font-weight:700">✓ Checklist Audit — Évaluation de conformité</div>'
          +'<div style="font-size:10px;opacity:.7;margin-top:2px">Conforme (C) · Non conforme (NC) · Observation (OBS) · Non applicable (N/A)</div>'
        +'</div>'
        +'<div style="display:flex;gap:8px;align-items:center">'
          +'<select class="fi" style="width:260px;font-weight:600" onchange="window.auditSelCL=this.value;reloadPage(\'audit-checklist\')">'+cOpts+'</select>'
          +'<div style="background:rgba(255,255,255,.2);border-radius:9px;padding:8px 14px;text-align:center"><div style="font-size:22px;font-weight:800">'+score+'%</div><div style="font-size:9px;opacity:.8">Conformité</div></div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'
      +[['✅','Conformes',conforme,'#16a34a','#f0fdf4'],['❌','Non conformes',ncItems,'#dc2626','#fef2f2'],['👁','Observations',obs,'#f59e0b','#fffbeb'],['📊','Score global',score+'%',score>=80?'#16a34a':'#dc2626','#f8fafc']]
        .map(function(k){return '<div style="background:'+k[4]+';border:1px solid '+k[3]+'22;border-radius:10px;padding:11px;display:flex;align-items:center;gap:8px"><span style="font-size:20px">'+k[0]+'</span><div><div style="font-size:22px;font-weight:800;color:'+k[3]+';line-height:1">'+k[2]+'</div><div style="font-size:9px;color:'+k[3]+';opacity:.7">'+k[1]+'</div></div></div>';}).join('')
    +'</div>'
    +'<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;padding:9px 13px;margin-bottom:11px;display:flex;align-items:center;justify-content:space-between">'
      +'<div style="font-size:11px;color:#1e40af">Évaluez chaque exigence : <strong>C = Conforme</strong> · <strong>NC = Non conforme</strong> (génère un constat) · <strong>OBS = Observation</strong></div>'
      +'<div style="display:flex;gap:7px">'
        +'<button class="btn bg2" onclick="(function(){var nc=0;var cl=window.AUDIT_CHECKLISTS.find(function(c){return c.id===window.auditSelCL;});var D=window.AUDIT_CL_DATA[window.auditSelCL]||{};(cl?cl.items:[]).forEach(function(it){if(D[it.n]===\'NC\'){var n=\'NC-AUD-\'+String(Date.now()).slice(-4);window.AUDIT_CONSTATS.unshift({id:n,auditId:window.auditSelAudit||null,type:\'NC\',processus:cl.norme,desc:it.desc,gravite:\'Mineure\',statut:\'Ouvert\',dateDetect:new Date().toLocaleDateString(\'fr-FR\'),resp:\'—\',ref:it.exig});nc++;}});xmToast(nc+\' constat(s) créé(s)\',\'Depuis la checklist\',\'⚠\',\'#dc2626\');reloadPage(\'audit-constats\');})()">⚠ Générer constats</button>'
      +'</div>'
    +'</div>'
    +'<div class="card">'
      +'<div class="ch"><span class="ct">Exigences '+(cl?cl.norme+' — '+cl.version:'')+'</span><span style="font-size:10px;color:#94a3b8">'+items.filter(function(it){return D[it.n];}).length+' / '+items.length+' évaluées</span></div>'
      +'<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Référence</th><th>Section</th><th>Exigence</th><th style="text-align:center">C</th><th style="text-align:center">NC</th><th style="text-align:center">OBS</th><th style="text-align:center">N/A</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
    +'</div>'
  +'</div>';

}
