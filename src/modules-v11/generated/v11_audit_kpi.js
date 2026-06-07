/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_kpi() {

  var P=window.AUDIT_PLANS||[], C=window.AUDIT_CONSTATS||[], A=window.AUDIT_ACTIONS||[];
  var H=window.AUDIT_KPI_HIST||[];
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  var scored=P.filter(function(a){return a.score!==null;});
  var kpiConf=scored.length?Math.round(scored.reduce(function(s,a){return s+a.score;},0)/scored.length):0;
  var txClot=C.length?Math.round(C.filter(function(c){return c.statut==='Clôturé';}).length/C.length*100):0;
  var txActClo=A.length?Math.round(A.filter(function(a){return a.statut==='Terminée';}).length/A.length*100):0;
  var kpiCards=[
    {lb:'KPI Conformité global',val:kpiConf+'%',ic:'📊',col:sc(kpiConf),bg:'#f0fdf4',sub:'Objectif : ≥ 80%'},
    {lb:'Taux clôture NC',val:txClot+'%',ic:'✅',col:'#16a34a',bg:'#f0fdf4',sub:C.filter(function(c){return c.statut==='Clôturé';}).length+'/'+C.length+' NC clôturées'},
    {lb:'Taux clôture actions',val:txActClo+'%',ic:'⚡',col:'#0284c7',bg:'#eff6ff',sub:A.filter(function(a){return a.statut==='Terminée';}).length+'/'+A.length+' actions'},
    {lb:'Audits réalisés',val:P.filter(function(a){return a.statut==='Terminé';}).length+'/'+ P.length,ic:'✓',col:'#7c3aed',bg:'#f5f3ff',sub:'Programme annuel'},
  ];
  var kpiHtml=kpiCards.map(function(k){return '<div style="background:'+k.bg+';border:1px solid '+k.col+'22;border-radius:11px;padding:14px"><div style="font-size:26px;margin-bottom:7px">'+k.ic+'</div><div style="font-size:28px;font-weight:800;color:'+k.col+'">'+k.val+'</div><div style="font-size:10.5px;font-weight:600;color:'+k.col+';margin-top:3px">'+k.lb+'</div><div style="font-size:9px;color:#94a3b8;margin-top:3px">'+k.sub+'</div></div>';}).join('');
  var hSvg='';
  if(H.length>=2){
    var px=46,py=12,pW=500,pH=90;
    hSvg='<svg width="100%" viewBox="0 0 580 120" style="display:block">';
    [60,70,80,90,100].forEach(function(v){var y=py+pH-Math.round((v-55)/50*pH);hSvg+='<line x1="'+px+'" y1="'+y+'" x2="'+(px+pW)+'" y2="'+y+'" stroke="#f1f5f9" stroke-width="1"/><text x="'+(px-4)+'" y="'+(y+4)+'" text-anchor="end" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+v+'%</text>';});
    var oY=py+pH-Math.round((80-55)/50*pH);
    hSvg+='<line x1="'+px+'" y1="'+oY+'" x2="'+(px+pW)+'" y2="'+oY+'" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,3"/>';
    hSvg+='<text x="'+(px+pW+4)+'" y="'+(oY+4)+'" font-size="8" fill="#dc2626" font-family="Inter,sans-serif">Obj.80%</text>';
    var pts=H.map(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);return x+','+y;}).join(' ');
    var aPts=H.map(function(h,i){return (px+Math.round(i/(H.length-1)*pW))+','+(py+pH-Math.round((h.val-55)/50*pH));});
    aPts.push((px+pW)+','+(py+pH),px+','+(py+pH));
    hSvg+='<polygon points="'+aPts.join(' ')+'" fill="#0284c7" fill-opacity="0.08"/>';
    hSvg+='<polyline points="'+pts+'" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    H.forEach(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);hSvg+='<circle cx="'+x+'" cy="'+y+'" r="4" fill="#0284c7" stroke="#fff" stroke-width="2"/><text x="'+x+'" y="'+(y-8)+'" text-anchor="middle" font-size="9" font-weight="700" fill="#0284c7" font-family="Inter,sans-serif">'+h.val+'%</text><text x="'+x+'" y="'+(py+pH+14)+'" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+h.mois.split(' ')[0]+'</text>';});
    hSvg+='</svg>';
  }
  var scoresRows=scored.map(function(a){return '<tr><td style="font-family:monospace;font-size:10px;color:#0284c7">'+a.ref+'</td><td style="font-size:11px;font-weight:600">'+a.titre.substring(0,40)+'</td><td style="font-size:10.5px">'+a.processus+'</td><td style="font-size:10.5px">'+a.dateDebut+'</td><td style="font-size:14px;font-weight:800;color:'+sc(a.score)+'">'+a.score+'%</td><td><div style="width:80px;height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+a.score+'%;height:100%;background:'+sc(a.score)+';border-radius:3px"></div></div></td></tr>';}).join('');
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📈 Tendance KPI Conformité (6 mois)</span></div>'+hSvg+'</div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📊 Scores par audit réalisé</span></div><table class="tbl"><thead><tr><th>Réf.</th><th>Titre</th><th>Processus</th><th>Date</th><th>Score</th><th>Barre</th></tr></thead><tbody>'+scoresRows+'</tbody></table></div>'
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:center">'
      +'<button onclick="auditExport(\'audits\')" class="btn" style="color:#16a34a;border-color:#86efac">📊 Export Excel</button>'
      +'<button onclick="auditExport(\'pdf\')" class="btn" style="color:#dc2626;border-color:#fca5a5">📄 Export PDF</button>'
    +'</div>'
  +'</div>';

}
