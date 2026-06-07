/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_checklist() {

  var Z=window.SS5_ZONES||[];
  var selId=window.ss5ClZone||(Z[0]?Z[0].id:null);
  var zObj=Z.find(function(z){return z.id===selId;})||Z[0]||{zone:'—',id:'Z-01'};
  var CL=window.SS5_CL_TEMPLATE||{};
  if(!window.SS5_CL_DATA) window.SS5_CL_DATA={};
  if(!window.SS5_CL_DATA[selId]) window.SS5_CL_DATA[selId]={};
  var D=window.SS5_CL_DATA[selId];
  var pillars=[{key:'S1',lb:'1S – Seiri',sub:'Trier',col:'#2563eb'},{key:'S2',lb:'2S – Seiton',sub:'Ranger',col:'#16a34a'},{key:'S3',lb:'3S – Seiso',sub:'Nettoyer',col:'#7c3aed'},{key:'S4',lb:'4S – Seiketsu',sub:'Standardiser',col:'#f59e0b'},{key:'S5',lb:'5S – Shitsuke',sub:'Maintenir',col:'#dc2626'}];
  function calcScore(pk){var items=D[pk]||{},t=0,ok=0;(CL[pk]&&CL[pk].items||[]).forEach(function(it){t++;if(items[it.n]==='oui')ok++;});return t?Math.round(ok/t*100):0;}
  var globalScore=Math.round(pillars.reduce(function(s,p){return s+calcScore(p.key);},0)/pillars.length);
  var pilBlocks=pillars.map(function(p){
    var pscore=calcScore(p.key);
    var items=(CL[p.key]&&CL[p.key].items)||[];
    var iRows=items.map(function(it){
      var rep=(D[p.key]||{})[it.n]||null;
      var isO=rep==='oui',isN=rep==='non',isA=rep==='na';
      var zk=JSON.stringify(selId),pk2=JSON.stringify(p.key),nk=JSON.stringify(it.n);
      var oui_style='width:26px;height:26px;border-radius:50%;border:2px solid '+(isO?'#16a34a':'#e2e8f0')+';background:'+(isO?'#16a34a':'#fff')+';color:'+(isO?'#fff':'#d1d5db')+';cursor:pointer;font-size:12px;font-weight:700';
      var non_style='width:26px;height:26px;border-radius:50%;border:2px solid '+(isN?'#dc2626':'#e2e8f0')+';background:'+(isN?'#dc2626':'#fff')+';color:'+(isN?'#fff':'#d1d5db')+';cursor:pointer;font-size:12px;font-weight:700';
      var na_style='width:26px;height:26px;border-radius:50%;border:2px solid '+(isA?'#94a3b8':'#e2e8f0')+';background:'+(isA?'#94a3b8':'#fff')+';color:'+(isA?'#fff':'#d1d5db')+';cursor:pointer;font-size:9px';
      return '<tr style="background:'+(isN?'#fff9f9':isO?'#f9fff9':'#fff')+'">'
        +'<td style="width:24px;font-family:monospace;font-size:10px;color:#94a3b8">'+String(it.n).padStart(2,'0')+'</td>'
        +'<td style="font-size:11px">'+(it.critical?'<span style="background:#fef2f2;color:#dc2626;font-size:8px;border-radius:3px;padding:1px 4px;margin-right:4px">!</span>':'')+it.label+'</td>'
        +'<td style="text-align:center;width:36px"><button onclick="ss5ClSet('+zk+','+pk2+','+nk+',\'oui\')" style="'+oui_style+'">✓</button></td>'
        +'<td style="text-align:center;width:36px"><button onclick="ss5ClSet('+zk+','+pk2+','+nk+',\'non\')" style="'+non_style+'">✗</button></td>'
        +'<td style="text-align:center;width:36px"><button onclick="ss5ClSet('+zk+','+pk2+','+nk+',\'na\')" style="'+na_style+'">N/A</button></td>'
      +'</tr>';
    }).join('');
    return '<div class="card" style="margin-bottom:10px">'
      +'<div style="display:flex;align-items:center;gap:9px;background:'+p.col+'10;border-radius:8px;padding:9px 11px;margin-bottom:9px">'
        +'<div style="width:34px;height:34px;background:'+p.col+';color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">'+p.key.replace('S','')+'S</div>'
        +'<div style="flex:1"><div style="font-size:12px;font-weight:700;color:'+p.col+'">'+p.lb+' — '+p.sub+'</div><div style="height:5px;background:#e5e7eb;border-radius:3px;margin-top:4px;width:140px"><div style="width:'+pscore+'%;height:100%;background:'+p.col+';border-radius:3px"></div></div></div>'
        +'<div style="font-size:22px;font-weight:800;color:'+p.col+'">'+pscore+'%</div>'
      +'</div>'
      +'<table class="tbl"><thead><tr><th>#</th><th>Critère</th><th style="text-align:center">OK</th><th style="text-align:center">NOK</th><th style="text-align:center">N/A</th></tr></thead>'
      +'<tbody>'+iRows+'</tbody></table>'
    +'</div>';
  }).join('');
  var zOpts=Z.map(function(z){return '<option value="'+z.id+'"'+(z.id===selId?' selected':'')+'>'+z.zone+'</option>';}).join('');
  return '<div class="content">'
    +'<div class="card" style="background:linear-gradient(135deg,#166534,#16a34a);color:#fff;margin-bottom:11px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:9px">'
        +'<div><div style="font-size:14px;font-weight:700">📋 Checklist 5S — Évaluation par zone</div><div style="font-size:10px;opacity:.7;margin-top:2px">Score automatique · Génération des écarts</div></div>'
        +'<div style="display:flex;gap:7px;align-items:center">'
          +'<select class="fi" style="width:200px;font-weight:600" onchange="window.ss5ClZone=this.value;reloadPage(\'5s-checklist\')">'+zOpts+'</select>'
          +'<div style="background:rgba(255,255,255,.2);border-radius:9px;padding:7px 14px;text-align:center"><div style="font-size:22px;font-weight:800">'+globalScore+'%</div><div style="font-size:9px;opacity:.8">Score global</div></div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;padding:9px 13px;margin-bottom:11px;display:flex;align-items:center;justify-content:space-between">'
      +'<div style="font-size:11px;color:#1e40af"><strong>! = Critère critique</strong> — Un NOK génère automatiquement un écart.</div>'
      +'<div style="display:flex;gap:7px">'
        +'<button class="btn bg2" onclick="ss5ClSave(window.ss5ClZone||\''+selId+'\')">💾 Sauvegarder</button>'
        +'<button class="btn btn-danger" onclick="ss5ClGenerateEcarts(window.ss5ClZone||\''+selId+'\')">⚠ Générer écarts</button>'
      +'</div>'
    +'</div>'
    +pilBlocks
  +'</div>';

}
