/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_tb() {

  var P=window.AUDIT_PLANS||[], C=window.AUDIT_CONSTATS||[], A=window.AUDIT_ACTIONS||[];
  var H=window.AUDIT_KPI_HIST||[];
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  var plan=P.filter(function(a){return a.statut==='Planifié';}).length;
  var enCours=P.filter(function(a){return a.statut==='En cours';}).length;
  var termine=P.filter(function(a){return a.statut==='Terminé';}).length;
  var retard=P.filter(function(a){return a.statut==='En retard';}).length;
  var ncOuv=C.filter(function(c){return c.type==='NC'&&c.statut!=='Clôturé';}).length;
  var actOuv=A.filter(function(a){return a.statut!=='Terminée';}).length;
  var scored=P.filter(function(a){return a.score!==null;});
  var kpiConf=scored.length?Math.round(scored.reduce(function(s,a){return s+a.score;},0)/scored.length):0;

  // ── KPI Cards ──
  var kpiData=[
    {ic:'📅',lb:'Audits planifiés',val:plan,sub:'Ce mois',col:'#2563eb',bg:'#eff6ff'},
    {ic:'✅',lb:'Audits réalisés',val:termine,sub:'Ce mois',col:'#16a34a',bg:'#f0fdf4'},
    {ic:'⏳',lb:'Audits en cours',val:enCours,sub:'Actuellement',col:'#f59e0b',bg:'#fffbeb'},
    {ic:'🚨',lb:'Audits en retard',val:retard,sub:'À traiter',col:'#dc2626',bg:'#fef2f2'},
    {ic:'⚠',lb:'Non-conformités',val:ncOuv,sub:'Ouvertes',col:'#7c3aed',bg:'#f5f3ff'},
    {ic:'⚡',lb:'Actions correctives',val:actOuv,sub:'Ouvertes',col:'#ea580c',bg:'#fff7ed'},
    {ic:'📊',lb:'KPI Conformité',val:kpiConf+'%',sub:'Objectif ≥ 80%',col:sc(kpiConf),bg:'#f0fdf4'},
  ];
  var kpiHtml=kpiData.map(function(k){
    return '<div style="background:'+k.bg+';border:1px solid '+k.col+'22;border-radius:11px;padding:12px">'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'
        +'<div style="width:32px;height:32px;background:'+k.col+'18;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:15px">'+k.ic+'</div>'
        +'<div style="font-size:10px;color:'+k.col+';font-weight:600;line-height:1.2">'+k.lb+'</div>'
      +'</div>'
      +'<div style="font-size:26px;font-weight:800;color:'+k.col+';line-height:1">'+k.val+'</div>'
      +'<div style="font-size:9px;color:#94a3b8;margin-top:2px">'+k.sub+'</div>'
    +'</div>';
  }).join('');

  // ── Donut SVG ──
  var total=P.length||1;
  var segs=[{v:plan,c:'#2563eb'},{v:enCours,c:'#f59e0b'},{v:termine,c:'#16a34a'},{v:retard,c:'#dc2626'}];
  var r=55,cx=70,cy=70,circ=2*Math.PI*r,offset=Math.round(circ/4);
  var dSvg='<svg width="140" height="140" viewBox="0 0 140 140">';
  dSvg+='<circle cx="70" cy="70" r="55" fill="none" stroke="#f1f5f9" stroke-width="18"/>';
  var runOff=offset;
  segs.forEach(function(s){
    if(!s.v) return;
    var pct=s.v/total, dash=Math.round(pct*circ);
    dSvg+='<circle cx="70" cy="70" r="55" fill="none" stroke="'+s.c+'" stroke-width="18" stroke-dasharray="'+dash+' '+(circ-dash)+'" stroke-dashoffset="'+runOff+'"/>';
    runOff-=dash;
  });
  dSvg+='<text x="70" y="65" text-anchor="middle" font-size="22" font-weight="800" fill="#0f2044" font-family="Inter,sans-serif">'+P.length+'</text>';
  dSvg+='<text x="70" y="82" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="Inter,sans-serif">Audits</text>';
  dSvg+='</svg>';
  var legendItems=[['Planifiés',plan,'#2563eb'],['En cours',enCours,'#f59e0b'],['Terminés',termine,'#16a34a'],['En retard',retard,'#dc2626']];
  var legendHtml=legendItems.map(function(l){return '<div style="display:flex;align-items:center;gap:5px;font-size:9.5px;margin-bottom:4px"><div style="width:8px;height:8px;border-radius:2px;background:'+l[2]+'"></div><span style="flex:1">'+l[0]+'</span><strong style="color:'+l[2]+'">'+l[1]+' ('+Math.round(l[1]/Math.max(P.length,1)*100)+'%)</strong></div>';}).join('');

  // ── Bar chart par processus ──
  var procMap={};
  P.forEach(function(a){procMap[a.processus]=(procMap[a.processus]||0)+1;});
  var procArr=Object.keys(procMap).sort(function(a,b){return procMap[b]-procMap[a];}).slice(0,8);
  var maxV=procArr.length?procMap[procArr[0]]:1;
  var barHtml=procArr.map(function(p){var v=procMap[p];var w=Math.round(v/maxV*100);return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><div style="width:120px;font-size:10.5px;font-weight:500;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+p+'</div><div style="flex:1;height:11px;background:#f1f5f9;border-radius:5px"><div style="width:'+w+'%;height:100%;background:#0284c7;border-radius:5px"></div></div><div style="font-size:11px;font-weight:700;color:#0284c7;min-width:20px">'+v+'</div></div>';}).join('');

  // ── KPI line ──
  var hSvg='';
  if(H.length>=2){
    var px=44,py=10,pW=460,pH=80;
    hSvg='<svg width="100%" viewBox="0 0 540 108" style="display:block">';
    [60,70,80,90,100].forEach(function(v){var y=py+pH-Math.round((v-55)/50*pH);hSvg+='<line x1="'+px+'" y1="'+y+'" x2="'+(px+pW)+'" y2="'+y+'" stroke="#f1f5f9" stroke-width="1"/><text x="'+(px-4)+'" y="'+(y+4)+'" text-anchor="end" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+v+'</text>';});
    var oY=py+pH-Math.round((80-55)/50*pH);
    hSvg+='<line x1="'+px+'" y1="'+oY+'" x2="'+(px+pW)+'" y2="'+oY+'" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,3"/>';
    var pts=H.map(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);return x+','+y;}).join(' ');
    var aPts=H.map(function(h,i){return (px+Math.round(i/(H.length-1)*pW))+','+(py+pH-Math.round((h.val-55)/50*pH));});
    aPts.push((px+pW)+','+(py+pH),px+','+(py+pH));
    hSvg+='<polygon points="'+aPts.join(' ')+'" fill="#0284c7" fill-opacity="0.07"/>';
    hSvg+='<polyline points="'+pts+'" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    H.forEach(function(h,i){var x=px+Math.round(i/(H.length-1)*pW),y=py+pH-Math.round((h.val-55)/50*pH);hSvg+='<circle cx="'+x+'" cy="'+y+'" r="4" fill="#0284c7" stroke="#fff" stroke-width="2"/><text x="'+x+'" y="'+(y-8)+'" text-anchor="middle" font-size="9" font-weight="700" fill="#0284c7" font-family="Inter,sans-serif">'+h.val+'%</text><text x="'+x+'" y="'+(py+pH+14)+'" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="Inter,sans-serif">'+h.mois.split(' ')[0]+'</text>';});
    hSvg+='</svg>';
  }

  // ── Prochains audits ──
  var nextAudits=P.filter(function(a){return a.statut==='Planifié';}).slice(0,5);
  var nextHtml=nextAudits.map(function(a){
    var sty='background:#eff6ff;color:#2563eb';
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9">'
      +'<div><div style="font-size:10.5px;font-weight:600">'+a.dateDebut+'</div><div style="font-size:10px;color:#94a3b8">'+a.auditeur+'</div></div>'
      +'<div style="flex:1;margin:0 10px"><div style="font-size:10.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.titre.substring(0,35)+'</div></div>'
      +'<span style="'+sty+';font-size:9px;font-weight:700;padding:2px 8px;border-radius:8px">'+a.statut+'</span>'
    +'</div>';
  }).join('');

  // ── NC table ──
  var ncRows=C.filter(function(c){return c.type==='NC'&&c.statut==='Ouvert';}).slice(0,5).map(function(c){
    var gb=c.gravite==='Majeure'?'<span class="badge br">Majeure</span>':'<span class="badge bgr">Mineure</span>';
    return '<tr><td style="font-family:monospace;font-size:10px;color:#0284c7">'+c.id+'</td><td style="font-size:10.5px;font-weight:500">'+c.desc.substring(0,40)+'...</td><td style="font-size:10px">'+c.processus+'</td><td>'+gb+'</td><td><span class="badge br">Ouvert</span></td></tr>';
  }).join('');

  // ── Action rapides ──
  var quickActions=[
    {ic:'📅',lb:'Planifier un audit',fn:'auditNew()'},
    {ic:'✓',lb:'Créer un audit',fn:"goPage('audit-liste')"},
    {ic:'⚠',lb:'Créer une NC',fn:'auditNewConstat()'},
    {ic:'✅',lb:'Créer une action',fn:'auditNewAction()'},
    {ic:'📄',lb:'Ajouter un document',fn:'auditAddDoc()'},
    {ic:'📊',lb:'Générer un rapport',fn:"auditExport('pdf')"},
  ];
  var qaHtml=quickActions.map(function(q){
    return '<div onclick="'+q.fn+'" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:.15s" onmouseover="this.style.background=\'#eff6ff\';this.style.borderColor=\'#bfdbfe\'" onmouseout="this.style.background=\'#f8fafc\';this.style.borderColor=\'#e2e8f0\'">'
      +'<div style="font-size:24px;margin-bottom:5px">'+q.ic+'</div>'
      +'<div style="font-size:10px;font-weight:600;color:#0f172a">'+q.lb+'</div>'
    +'</div>';
  }).join('');

  return '<div style="padding:13px 16px;overflow-y:auto;height:100%;background:var(--bg)">'
    // KPI Strip
    +'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:9px;margin-bottom:12px">'+kpiHtml+'</div>'
    // Row 1: donut + bar + KPI line
    +'<div style="display:grid;grid-template-columns:270px 1fr 1fr;gap:11px;margin-bottom:11px">'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch" style="margin-bottom:8px"><span class="ct">Répartition par statut</span></div>'
        +'<div style="display:flex;align-items:center;gap:12px">'
          +'<div style="flex-shrink:0">'+dSvg+'</div>'
          +'<div style="flex:1">'+legendHtml+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch" style="margin-bottom:8px"><span class="ct">Audits par processus</span></div>'
        +barHtml
      +'</div>'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch" style="margin-bottom:6px"><span class="ct">Tendance KPI (6 mois)</span></div>'
        +hSvg
        +'<div style="display:flex;gap:12px;margin-top:4px;font-size:9px;color:#94a3b8;justify-content:center">'
          +'<div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:2px;background:#0284c7"></div>KPI Conformité</div>'
          +'<div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:0;border-top:1.5px dashed #dc2626"></div>Objectif 80%</div>'
        +'</div>'
      +'</div>'
    +'</div>'
    // Row 2: NC table + prochains + actions rapides
    +'<div style="display:grid;grid-template-columns:1fr 280px 260px;gap:11px">'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch"><span class="ct">⚠ Dernières NC ouvertes</span><button class="btn bsm" onclick="goPage(\'audit-constats\')">Voir toutes →</button></div>'
        +'<table class="tbl"><thead><tr><th>N° NC</th><th>Description</th><th>Processus</th><th>Gravité</th><th>Statut</th></tr></thead><tbody>'+ncRows+'</tbody></table>'
      +'</div>'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch" style="margin-bottom:6px"><span class="ct">Prochains audits</span><button class="btn bsm" onclick="goPage(\'audit-planning\')">Voir tout →</button></div>'
        +nextHtml
      +'</div>'
      +'<div class="card" style="margin-bottom:0">'
        +'<div class="ch" style="margin-bottom:8px"><span class="ct">Actions rapides</span></div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px">'+qaHtml+'</div>'
      +'</div>'
    +'</div>'
  +'</div>';

}
