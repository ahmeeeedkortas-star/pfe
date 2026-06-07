/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_tb() {

  var Z=window.SS5_ZONES||[], AUD=window.SS5_AUDITS||[], ACT=window.SS5_ACTIONS||[], EC=window.SS5_ECARTS||[];
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  var avg=Z.length?+(Z.reduce(function(s,z){return s+z.score;},0)/Z.length).toFixed(1):0;
  var conf=Z.filter(function(z){return z.score>=80;}).length;
  var audPlan=AUD.filter(function(a){return a.statut==='Planifié';}).length;
  var audReal=AUD.filter(function(a){return a.statut==='Réalisé';}).length;
  var audRet=AUD.filter(function(a){return a.statut==='En retard';}).length;
  var actClo=ACT.filter(function(a){return a.statut==='Clôturée';}).length;
  var actRet=ACT.filter(function(a){return a.statut==='En retard';}).length;
  var actCours=ACT.filter(function(a){return a.statut==='En cours';}).length;
  var txClo=ACT.length?Math.round(actClo/ACT.length*100):0;

  // ─── Bar chart SVG ───
  var bW=Math.max(26,Math.min(40,Math.floor(610/(Z.length||1))-8));
  var maxH=115,yB=145,x0=50,gap=6;
  var bSvg='<svg width="100%" viewBox="0 0 670 165" style="display:block">';
  [0,20,40,60,80,100].forEach(function(v){
    var y=yB-Math.round(v/100*maxH);
    bSvg+='<line x1="'+x0+'" y1="'+y+'" x2="660" y2="'+y+'" stroke="#f1f5f9" stroke-width="0.8"/>';
    bSvg+='<text x="'+(x0-4)+'" y="'+(y+4)+'" text-anchor="end" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+v+'</text>';
  });
  var oY=yB-Math.round(80/100*maxH);
  bSvg+='<line x1="'+x0+'" y1="'+oY+'" x2="660" y2="'+oY+'" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="5,3"/>';
  bSvg+='<text x="664" y="'+(oY+4)+'" font-size="8" fill="#dc2626" font-family="Inter,sans-serif">80%</text>';
  Z.forEach(function(z,i){
    var x=x0+i*(bW+gap),bH=Math.max(4,Math.round(z.score/100*maxH)),y=yB-bH,c=sc(z.score);
    var lbl=z.zone.length>9?z.zone.substring(0,9):z.zone;
    bSvg+='<rect x="'+x+'" y="'+y+'" width="'+bW+'" height="'+bH+'" rx="3" fill="'+c+'" fill-opacity="0.85"/>';
    bSvg+='<text x="'+(x+bW/2)+'" y="'+(y-4)+'" text-anchor="middle" font-size="9" font-weight="700" fill="'+c+'" font-family="Inter,sans-serif">'+z.score+'%</text>';
    bSvg+='<text x="'+(x+bW/2)+'" y="160" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+lbl+'</text>';
  });
  bSvg+='</svg>';

  // ─── Donut SVG ───
  var r=48,circ=2*Math.PI*r,pct=Z.length?conf/Z.length:0;
  var dOff=Math.round(circ/4);
  var dA=Math.round(pct*circ)+' '+Math.round((1-pct)*circ);
  var dSvg='<svg width="130" height="130" viewBox="0 0 130 130">';
  dSvg+='<circle cx="65" cy="65" r="48" fill="none" stroke="#e5e7eb" stroke-width="17"/>';
  dSvg+='<circle cx="65" cy="65" r="48" fill="none" stroke="#16a34a" stroke-width="17" stroke-dasharray="'+dA+'" stroke-dashoffset="'+dOff+'" style="transition:.8s"/>';
  dSvg+='<text x="65" y="60" text-anchor="middle" font-size="20" font-weight="800" fill="#0f2044" font-family="Inter,sans-serif">'+Z.length+'</text>';
  dSvg+='<text x="65" y="77" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="Inter,sans-serif">Zones</text>';
  dSvg+='</svg>';

  // ─── History line SVG ───
  var H=window.SS5_KPI_HIST||[];
  var hSvg='';
  if(H.length>=2){
    var px=46,py=12,pW=560,pH=90;
    hSvg='<svg width="100%" viewBox="0 0 620 118" style="display:block">';
    [60,70,80,90].forEach(function(v){var y=py+pH-Math.round((v-55)/50*pH);hSvg+='<line x1="'+px+'" y1="'+y+'" x2="'+(px+pW)+'" y2="'+y+'" stroke="#f1f5f9" stroke-width="1"/><text x="'+(px-4)+'" y="'+(y+4)+'" text-anchor="end" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+v+'</text>';});
    var oY2=py+pH-Math.round((80-55)/50*pH);
    hSvg+='<line x1="'+px+'" y1="'+oY2+'" x2="'+(px+pW)+'" y2="'+oY2+'" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,3"/>';
    var pts=H.map(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);return x+','+y;}).join(' ');
    var aPts=H.map(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);return x+','+y;});
    aPts.push((px+pW)+','+(py+pH),px+','+(py+pH));
    hSvg+='<polygon points="'+aPts.join(' ')+'" fill="#2563eb" fill-opacity="0.07"/>';
    hSvg+='<polyline points="'+pts+'" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    H.forEach(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);hSvg+='<circle cx="'+x+'" cy="'+y+'" r="4" fill="#2563eb" stroke="#fff" stroke-width="2"/><text x="'+x+'" y="'+(y-7)+'" text-anchor="middle" font-size="9" fill="#2563eb" font-weight="700" font-family="Inter,sans-serif">'+h.val+'%</text><text x="'+x+'" y="'+(py+pH+14)+'" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+h.mois.split(' ')[0]+'</text>';});
    hSvg+='</svg>';
  }

  // ─── Build HTML ───
  var kpiData=[
    {ic:'📅',lb:'Audits planifiés',val:audPlan,sub:'Ce mois',col:'#2563eb',bg:'#eff6ff'},
    {ic:'✅',lb:'Audits réalisés',val:audReal,sub:'Ce mois',col:'#16a34a',bg:'#f0fdf4'},
    {ic:'⏰',lb:'Audits en retard',val:audRet,sub:'À réaliser',col:'#dc2626',bg:'#fef2f2'},
    {ic:'⭐',lb:'KPI moyen 5S',val:avg+'%',sub:'Ce mois',col:'#7c3aed',bg:'#f5f3ff'},
    {ic:'🎯',lb:'Objectif 5S',val:'≥ 80%',sub:'Seuil conformité',col:'#ea580c',bg:'#fff7ed'},
    {ic:'✓',lb:'Zones conformes',val:conf+'/'+Z.length,sub:'Ce mois',col:'#0891b2',bg:'#ecfeff'},
  ];
  var kpiHtml=kpiData.map(function(k){
    return '<div style="background:'+k.bg+';border:1px solid '+k.col+'22;border-radius:11px;padding:12px 11px">'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'
        +'<div style="width:32px;height:32px;background:'+k.col+'18;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:15px">'+k.ic+'</div>'
        +'<div style="font-size:10px;color:'+k.col+';font-weight:600;line-height:1.2">'+k.lb+'</div>'
      +'</div>'
      +'<div style="font-size:24px;font-weight:800;color:'+k.col+';line-height:1">'+k.val+'</div>'
      +'<div style="font-size:9px;color:#94a3b8;margin-top:2px">'+k.sub+'</div>'
    +'</div>';
  }).join('');

  var pillars=[['S','1S Seiri','Trier','#2563eb'],['T','2S Seiton','Ranger','#16a34a'],['N','3S Seiso','Nettoyer','#7c3aed'],['S4','4S Seiketsu','Standard.','#f59e0b'],['S5','5S Shitsuke','Maintenir','#dc2626']];
  var pilHtml=pillars.map(function(p){
    var v=Z.length?Math.round(Z.reduce(function(s,z){return s+(z[p[0]]||0);},0)/Z.length):0;
    return '<div style="background:'+p[3]+'12;border:1px solid '+p[3]+'28;border-radius:9px;padding:9px 7px;text-align:center">'
      +'<div style="font-size:9px;font-weight:700;color:'+p[3]+';margin-bottom:2px">'+p[1]+'</div>'
      +'<div style="font-size:8px;color:#94a3b8;margin-bottom:4px">'+p[2]+'</div>'
      +'<div style="font-size:20px;font-weight:800;color:'+p[3]+'">'+v+'%</div>'
      +'<div style="height:4px;background:#e5e7eb;border-radius:2px;margin-top:4px">'
        +'<div style="width:'+v+'%;height:100%;background:'+p[3]+';border-radius:2px"></div>'
      +'</div>'
    +'</div>';
  }).join('');

  var planRows=AUD.slice(0,7).map(function(a){
    var sty=a.statut==='Réalisé'?'background:#f0fdf4;color:#16a34a':a.statut==='En retard'?'background:#fef2f2;color:#dc2626':'background:#eff6ff;color:#2563eb';
    return '<tr>'
      +'<td style="font-size:10px;color:#94a3b8">'+a.date+'</td>'
      +'<td style="font-size:11px;font-weight:600">'+a.zone+'</td>'
      +'<td style="font-size:10.5px">'+a.auditeur+'</td>'
      +'<td style="font-size:10.5px">'+ss5ZoneResp(a.zone)+'</td>'
      +'<td><span style="'+sty+';font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">'+a.statut+'</span></td>'
    +'</tr>';
  }).join('');

  var top5=Z.slice().sort(function(a,b){return b.score-a.score;}).slice(0,5);
  var t5Html=top5.map(function(z,i){
    var tc=z.trend>0?'#16a34a':z.trend<0?'#dc2626':'#94a3b8';
    return '<div style="display:flex;align-items:center;gap:7px;padding:5px 0;border-bottom:1px solid #f1f5f9">'
      +'<div style="width:18px;height:18px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#64748b;flex-shrink:0">'+(i+1)+'</div>'
      +'<div style="flex:1;font-size:10.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+z.zone+'</div>'
      +'<div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;flex-shrink:0"><div style="width:'+z.score+'%;height:100%;background:'+sc(z.score)+';border-radius:3px"></div></div>'
      +'<div style="font-size:12px;font-weight:800;color:'+sc(z.score)+';width:30px;text-align:right;flex-shrink:0">'+z.score+'%</div>'
      +'<div style="font-size:9px;font-weight:700;color:'+tc+';flex-shrink:0;min-width:28px">'+(z.trend>0?'+':'')+z.trend+'%</div>'
    +'</div>';
  }).join('');

  var ecRows=(EC||[]).filter(function(e){return e.statut!=='Clôturé';}).slice(0,4).map(function(e){
    var gb=e.gravite==='Majeure'?'<span class="badge br">'+e.gravite+'</span>':e.gravite==='Moyenne'?'<span class="badge bo">'+e.gravite+'</span>':'<span class="badge bgr">'+e.gravite+'</span>';
    var sb=e.statut==='Ouvert'?'<span class="badge br">'+e.statut+'</span>':e.statut==='En cours'?'<span class="badge bb">'+e.statut+'</span>':'<span class="badge bg3">'+e.statut+'</span>';
    return '<tr><td style="font-size:10px;color:#94a3b8">'+e.date+'</td><td style="font-size:10.5px;font-weight:600">'+e.zone+'</td><td style="font-size:10.5px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+e.ecart+'</td><td>'+gb+'</td><td>'+sb+'</td></tr>';
  }).join('');

  var actRetRows=ACT.filter(function(a){return a.statut==='En retard';}).slice(0,4).map(function(a){
    return '<tr><td style="font-size:10.5px;font-weight:600">'+a.action+'</td><td style="font-size:10px;color:#94a3b8">'+a.zone+'</td><td style="font-size:10.5px">'+a.resp+'</td><td style="font-size:10.5px;color:#dc2626;font-weight:700">'+a.fin+'</td></tr>';
  }).join('');

  var actSumHtml=[['Actions ouvertes',ACT.length-actClo,'#2563eb'],['En cours',actCours,'#f59e0b'],['Terminées',actClo,'#16a34a'],['En retard',actRet,'#dc2626']].map(function(d){
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f1f5f9"><span style="font-size:10.5px">'+d[0]+'</span><strong style="color:'+d[2]+';font-size:14px">'+d[1]+'</strong></div>';
  }).join('');

  return '<div style="padding:13px 16px;overflow-y:auto;height:100%;background:var(--bg)">'
    +'<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 190px 205px;gap:11px;margin-bottom:11px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📊 KPI 5S PAR ZONE</span><button class="btn bsm" onclick="goPage(\'5s-kpi\')">Détail →</button></div>'+bSvg+'</div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch" style="margin-bottom:6px"><span class="ct" style="font-size:11px">Répartition zones</span></div>'
        +'<div style="display:flex;justify-content:center">'+dSvg+'</div>'
        +'<div style="font-size:9.5px;margin-top:4px">'
          +'<div style="display:flex;align-items:center;gap:5px;margin-bottom:4px"><div style="width:8px;height:8px;border-radius:2px;background:#16a34a"></div><span style="flex:1">Conformes (≥80%)</span><strong style="color:#16a34a">'+conf+' ('+Math.round(conf/Math.max(Z.length,1)*100)+'%)</strong></div>'
          +'<div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:2px;background:#dc2626"></div><span style="flex:1">Non conformes</span><strong style="color:#dc2626">'+(Z.length-conf)+' ('+Math.round((Z.length-conf)/Math.max(Z.length,1)*100)+'%)</strong></div>'
        +'</div>'
      +'</div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch" style="margin-bottom:6px"><span class="ct" style="font-size:11px">Résumé actions</span></div>'
        +actSumHtml
        +'<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:10.5px;margin-bottom:3px"><span>Taux clôture</span><strong style="color:#16a34a">'+txClo+'%</strong></div><div class="prog"><div class="pf" style="width:'+txClo+'%;background:#16a34a"></div></div></div>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1.5fr 1.1fr 0.85fr;gap:11px;margin-bottom:11px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📅 PLANNING AUDITS 5S</span><button class="btn bp bsm" onclick="ss5NewAudit()">+ Planifier</button></div><table class="tbl"><thead><tr><th>Date</th><th>Zone</th><th>Auditeur</th><th>Resp. zone</th><th>Statut</th></tr></thead><tbody>'+planRows+'</tbody></table><button onclick="goPage(\'5s-planning\')" class="btn bsm" style="width:100%;margin-top:7px;color:#2563eb;border-color:#bfdbfe">Voir tout le planning →</button></div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">✓ DERNIERS AUDITS</span><button class="btn bsm" onclick="goPage(\'5s-audit\')">Voir tous →</button></div><table class="tbl"><thead><tr><th>Date</th><th>Zone</th><th>Score</th><th>Auditeur</th><th></th></tr></thead><tbody>'
        +AUD.filter(function(a){return a.statut==='Réalisé';}).slice(0,4).map(function(a){return '<tr><td style="font-size:10px;color:#94a3b8">'+a.date+'</td><td style="font-size:11px;font-weight:600">'+a.zone+'</td><td style="font-size:14px;font-weight:800;color:'+sc(a.score||0)+'">'+a.score+'%</td><td style="font-size:10.5px">'+a.auditeur+'</td><td><span onclick="ss5ViewRapport(\''+a.id+'\')" style="cursor:pointer;font-size:14px">📄</span></td></tr>';}).join('')
      +'</tbody></table></div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch" style="margin-bottom:6px"><span class="ct">🏆 TOP 5 ZONES</span></div>'+t5Html+'<button onclick="goPage(\'5s-kpi\')" class="btn bsm" style="width:100%;margin-top:7px;color:#2563eb;border-color:#bfdbfe">Classement →</button></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:11px;margin-bottom:11px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📈 HISTORIQUE KPI (6 MOIS)</span></div>'+hSvg+'<div style="display:flex;gap:12px;margin-top:5px;font-size:9px;color:#94a3b8;justify-content:center"><div style="display:flex;align-items:center;gap:4px"><div style="width:12px;height:2px;background:#2563eb;border-radius:1px"></div>KPI moyen</div><div style="display:flex;align-items:center;gap:4px"><div style="width:12px;height:0;border-top:1.5px dashed #dc2626"></div>Objectif 80%</div></div></div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📋 CHECKLIST 5S STANDARD</span><button class="btn bp bsm" onclick="goPage(\'5s-checklist\')">Évaluer →</button></div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">'+pilHtml+'</div></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">⚠ ÉCARTS RÉCENTS</span><button class="btn bsm" onclick="goPage(\'5s-ecarts\')">Voir tous →</button></div><table class="tbl"><thead><tr><th>Date</th><th>Zone</th><th>Écart</th><th>Gravité</th><th>Statut</th></tr></thead><tbody>'+ecRows+'</tbody></table></div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">🔴 ACTIONS EN RETARD</span><button class="btn bsm" onclick="goPage(\'5s-actions\')">Voir toutes →</button></div><table class="tbl"><thead><tr><th>Action</th><th>Zone</th><th>Responsable</th><th>Échéance</th></tr></thead><tbody>'+actRetRows+'</tbody></table></div>'
    +'</div>'
  +'</div>';

}
