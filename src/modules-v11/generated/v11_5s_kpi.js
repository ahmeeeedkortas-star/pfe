/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_kpi() {

  var Z=window.SS5_ZONES||[];
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  function scBg(v){return v>=80?'#f0fdf4':v>=60?'#fffbeb':'#fef2f2';}
  var avg=Z.length?+(Z.reduce(function(s,z){return s+z.score;},0)/Z.length).toFixed(1):0;
  var conf=Z.filter(function(z){return z.score>=80;}).length;
  var sorted=Z.slice().sort(function(a,b){return b.score-a.score;});
  var pks=[['S','1S'],['T','2S'],['N','3S'],['S4','4S'],['S5','5S']];
  var avgP={};pks.forEach(function(k){avgP[k[0]]=Z.length?Math.round(Z.reduce(function(s,z){return s+(z[k[0]]||0);},0)/Z.length):0;});
  // Radar SVG
  var cx=115,cy=115,rMax=85,nAx=5;
  function aXY(i,r){var a=i*2*Math.PI/nAx-Math.PI/2;return {x:Math.round((cx+r*Math.cos(a))*100)/100,y:Math.round((cy+r*Math.sin(a))*100)/100};}
  var rSvg='<svg width="230" height="230" viewBox="0 0 230 230">';
  [20,40,60,80,100].forEach(function(v){var pts=pks.map(function(_,i){var p=aXY(i,rMax*v/100);return p.x+','+p.y;}).join(' ');rSvg+='<polygon points="'+pts+'" fill="none" stroke="#f1f5f9" stroke-width="1"/>';});
  pks.forEach(function(_,i){var p=aXY(i,rMax);rSvg+='<line x1="'+cx+'" y1="'+cy+'" x2="'+p.x+'" y2="'+p.y+'" stroke="#e5e7eb" stroke-width="1"/>';});
  var dPts=pks.map(function(k,i){var v=avgP[k[0]]/100;var p=aXY(i,rMax*v);return p.x+','+p.y;}).join(' ');
  rSvg+='<polygon points="'+dPts+'" fill="#2563eb" fill-opacity="0.15" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>';
  pks.forEach(function(k,i){var v=avgP[k[0]]/100;var p=aXY(i,rMax*v);rSvg+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="#2563eb" stroke="#fff" stroke-width="2"/>';var lp=aXY(i,rMax+20);rSvg+='<text x="'+lp.x+'" y="'+lp.y+'" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="700" fill="#374151" font-family="Inter,sans-serif">'+k[1]+' '+avgP[k[0]]+'%</text>';});
  rSvg+='</svg>';
  var rows=sorted.map(function(z,i){
    var tc=z.trend>0?'#16a34a':z.trend<0?'#dc2626':'#94a3b8';
    return '<tr><td style="font-weight:700;color:#94a3b8">'+(i+1)+'</td><td style="font-size:11px;font-weight:600">'+z.zone+'</td><td style="font-size:10px;color:#64748b">'+z.dep+'</td>'
      +pks.map(function(k){return '<td style="text-align:center;font-size:11px;font-weight:700;color:'+sc(z[k[0]]||0)+'">'+z[k[0]]+'%</td>';}).join('')
      +'<td style="font-size:14px;font-weight:800;color:'+sc(z.score)+'">'+z.score+'%</td>'
      +'<td><div style="width:70px;height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+z.score+'%;height:100%;background:'+sc(z.score)+';border-radius:3px"></div></div></td>'
      +'<td style="font-size:10px;font-weight:700;color:'+tc+'">'+(z.trend>0?'+':'')+z.trend+'%</td>'
      +'<td><span style="background:'+scBg(z.score)+';color:'+sc(z.score)+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">'+z.statut+'</span></td>'
    +'</tr>';
  }).join('');
  var kpiHtml=[[avg+'%','KPI Global','#7c3aed','#f5f3ff'],[conf+'/'+Z.length,'Zones conformes','#16a34a','#f0fdf4'],[sorted[0]?sorted[0].score+'%':'—','Meilleur score','#2563eb','#eff6ff'],['80%','Objectif fixé','#ea580c','#fff7ed']].map(function(k){return '<div style="background:'+k[3]+';border:1px solid '+k[2]+'22;border-radius:10px;padding:12px"><div style="font-size:10px;color:'+k[2]+';font-weight:600;margin-bottom:4px">'+k[1]+'</div><div style="font-size:24px;font-weight:800;color:'+k[2]+'">'+k[0]+'</div></div>';}).join('');
  return '<div class="content">'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">'+kpiHtml+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 240px;gap:11px">'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">📊 Résultats détaillés par zone</span></div><div style="overflow-x:auto"><table class="tbl"><thead><tr><th>#</th><th>Zone</th><th>Dépt</th><th>1S</th><th>2S</th><th>3S</th><th>4S</th><th>5S</th><th>Score</th><th>Barre</th><th>Évol.</th><th>Statut</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>'
      +'<div class="card" style="margin-bottom:0"><div class="ch"><span class="ct">🕸 Radar 5S moyen</span></div><div style="display:flex;justify-content:center">'+rSvg+'</div></div>'
    +'</div>'
  +'</div>';

}
