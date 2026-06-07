/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_5s_zones() {

  var Z=window.SS5_ZONES||[];
  function sc(v){return v>=80?'#16a34a':v>=60?'#f59e0b':'#dc2626';}
  function scBg(v){return v>=80?'#f0fdf4':v>=60?'#fffbeb':'#fef2f2';}
  var rows=Z.map(function(z){var zid=JSON.stringify(z.id);return '<tr><td style="font-size:11.5px;font-weight:700">'+z.zone+'</td><td style="font-size:10.5px;color:#64748b">'+z.dep+'</td><td style="font-size:10.5px">'+z.resp+'</td><td style="font-size:10px;color:#94a3b8">'+z.lastAudit+'</td><td style="font-size:10px;color:#94a3b8">'+z.nextAudit+'</td><td style="font-size:14px;font-weight:800;color:'+sc(z.score)+'">'+z.score+'%</td><td><div style="width:75px;height:5px;background:#e5e7eb;border-radius:3px"><div style="width:'+z.score+'%;height:100%;background:'+sc(z.score)+';border-radius:3px"></div></div></td><td><span style="background:'+scBg(z.score)+';color:'+sc(z.score)+';font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px">'+z.statut+'</span></td><td><div style="display:flex;gap:3px"><button onclick="ss5EditZone('+zid+')" class="btn bsm">✏</button><button onclick="goPage(\'5s-checklist\')" class="btn bsm bp" style="font-size:9px">📋</button></div></td></tr>';}).join('');
  return '<div class="content"><div class="card"><div class="ch"><span class="ct">🏭 Gestion des zones 5S</span><button class="btn bp" onclick="ss5NewZone()">+ Nouvelle zone</button></div><table class="tbl"><thead><tr><th>Zone</th><th>Dépt</th><th>Responsable</th><th>Dernier audit</th><th>Prochain audit</th><th>Score</th><th>Barre</th><th>Statut</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';

}
