/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_docs() {

  var D=window.AUDIT_DOCS_LIST||[];
  function sb(s){return s==='Validé'?'<span class="badge bg3">Validé</span>':s==='En cours'?'<span class="badge bb">En cours</span>':'<span class="badge bgr">'+s+'</span>';}
  function typeBadge(t){var c=t==='Rapport'?'#0284c7':t==='Checklist'?'#7c3aed':t==='Programme'?'#166534':'#64748b';return '<span style="background:'+c+'18;color:'+c+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">'+t+'</span>';}
  var rows=D.map(function(doc){var did=JSON.stringify(doc.id);return '<tr><td style="font-family:monospace;font-size:10px;color:#0284c7">'+doc.id+'</td><td style="font-size:11px;font-weight:600">'+doc.nom+'</td><td>'+typeBadge(doc.type)+'</td><td style="font-size:10.5px;color:#94a3b8">'+doc.date+'</td><td style="font-size:10.5px">'+doc.auteur+'</td><td style="font-size:10px;color:#94a3b8">'+(doc.auditId||'—')+'</td><td>'+sb(doc.statut)+'</td><td><div style="display:flex;gap:3px"><button class="btn bsm" style="font-size:9px">👁</button><button class="btn bsm" style="font-size:9px">📥</button></div></td></tr>';}).join('');
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'
      +[['Total',D.length,'#0284c7','#eff6ff'],['Rapports',D.filter(function(d){return d.type==='Rapport';}).length,'#16a34a','#f0fdf4'],['Validés',D.filter(function(d){return d.statut==='Validé';}).length,'#166534','#f0fdf4'],['En cours',D.filter(function(d){return d.statut==='En cours';}).length,'#f59e0b','#fffbeb']]
        .map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[0]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[1]+'</div></div>';}).join('')
    +'</div>'
    +'<div class="card"><div class="ch"><span class="ct">📄 Documents & Preuves d\'audit</span><button class="btn bp" onclick="auditAddDoc()">+ Ajouter</button></div>'
      +'<table class="tbl"><thead><tr><th>ID</th><th>Nom du document</th><th>Type</th><th>Date</th><th>Auteur</th><th>Audit lié</th><th>Statut</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>'
  +'</div>';

}
