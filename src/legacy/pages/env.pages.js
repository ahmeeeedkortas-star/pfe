/** @legacy — env.pages.js (lazy) */
export default {
/* ── BIENTÔT ── */
'reunion': () => pgSoon('reunion'),
'env': () => { document.getElementById('content').innerHTML=PAGES['env-dash'](); return ''; },

/* ════ DONNÉES GLOBALES ENV ════ */
'_envInit': (() => {
  if(!window.ENV_ASPECTS_DATA) window.ENV_ASPECTS_DATA=[
    {id:'ASP-001',activite:'Usinage',aspect:'Huile usag\u00e9e',impact:'Pollution des sols',g:'\u00c9lev\u00e9',freq:4,crit:12,niv:'\u00c9lev\u00e9',s:'Actif',action:'Installer bac r\u00e9tention'},
    {id:'ASP-002',activite:'Peinture',aspect:'\u00c9missions COV',impact:'Pollution de l\u2019air',g:'Moyen',freq:3,crit:9,niv:'Moyen',s:'Actif',action:'Ventilation renforc\u00e9e'},
    {id:'ASP-003',activite:'Assemblage',aspect:'D\u00e9chets m\u00e9talliques',impact:'Ressources',g:'\u00c9lev\u00e9',freq:3,crit:9,niv:'\u00c9lev\u00e9',s:'Actif',action:'Tri et recyclage'},
    {id:'ASP-004',activite:'Maintenance',aspect:'Produits chimiques',impact:'Pollution sol\/eau',g:'\u00c9lev\u00e9',freq:2,crit:10,niv:'\u00c9lev\u00e9',s:'Actif',action:'Armoire s\u00e9curis\u00e9e'},
    {id:'ASP-005',activite:'Bureau',aspect:'Conso. papier',impact:'D\u00e9forestation',g:'Faible',freq:5,crit:5,niv:'Faible',s:'Actif',action:'D\u00e9mat\u00e9rialisation'},
    {id:'ASP-006',activite:'\u00c9nergie',aspect:'Conso. \u00e9lectricit\u00e9',impact:'\u00c9missions CO2',g:'Moyen',freq:4,crit:12,niv:'\u00c9lev\u00e9',s:'Actif',action:'LED + capteurs'},
  ];
  if(!window.ENV_DECHETS_DATA) window.ENV_DECHETS_DATA=[
    {id:'DEC-001',d:'15/05/2026',type:'M\u00e9talliques',desc:'Copeaux usinage',qte:120,unite:'kg',zone:'Usinage',stockOk:true,enlev:'15/05/2026',presta:'Eco Recycling',s:'Enlev\u00e9'},
    {id:'DEC-002',d:'12/05/2026',type:'Huiles usag\u00e9es',desc:'Huile de coupe',qte:85,unite:'L',zone:'Usinage',stockOk:true,enlev:'18/05/2026',presta:'Metal Green',s:'En attente'},
    {id:'DEC-003',d:'13/05/2026',type:'Cartons',desc:'Emballages',qte:200,unite:'kg',zone:'Magasin',stockOk:true,enlev:'15/05/2026',presta:'Veero Carton',s:'Enlev\u00e9'},
    {id:'DEC-004',d:'14/05/2026',type:'Plastiques',desc:'Films plastiques',qte:80,unite:'kg',zone:'Assemblage',stockOk:true,enlev:'20/05/2026',presta:'Plast Recycle',s:'En attente'},
    {id:'DEC-005',d:'16/05/2026',type:'Dangereux',desc:'Chiffons souill\u00e9s',qte:25,unite:'kg',zone:'Maintenance',stockOk:false,enlev:'---',presta:'Hazard Clean',s:'Non conforme'},
    {id:'DEC-006',d:'17/05/2026',type:'Dangereux',desc:'Solvants us\u00e9s',qte:40,unite:'L',zone:'Peinture',stockOk:false,enlev:'---',presta:'Hazard Clean',s:'Non conforme'},
  ];
  if(!window.ENV_CHIMIQUES_DATA) window.ENV_CHIMIQUES_DATA=[
    {id:'PC-001',prod:'Ac\u00e9tone',fam:'Solvant',qte:5,unite:'L',empl:'Magasin chimique',fds:true,exp:'10/06/2026',etat:'OK',danger:'Inflammable / Irritant'},
    {id:'PC-002',prod:'Huile soluble',fam:'Lubrifiant',qte:20,unite:'L',empl:'Usinage',fds:true,exp:'25/01/2026',etat:'P\u00e9rim\u00e9',danger:'Nocif pour l\u2019environnement'},
    {id:'PC-003',prod:'D\u00e9graissant',fam:'Nettoyant',qte:3,unite:'L',empl:'Maintenance',fds:true,exp:'25/07/2026',etat:'Stock bas',danger:'Irritant'},
    {id:'PC-004',prod:'Peinture industrielle',fam:'Peinture',qte:14,unite:'L',empl:'Atelier peinture',fds:false,exp:'30/05/2026',etat:'OK',danger:'Toxique / Inflammable'},
    {id:'PC-005',prod:'White spirit',fam:'Solvant',qte:7,unite:'L',empl:'Magasin chimique',fds:true,exp:'05/07/2026',etat:'OK',danger:'Inflammable'},
  ];
  if(!window.ENV_5S_DATA) window.ENV_5S_DATA=[
    {id:'AUD5S-001',zone:'Atelier Usinage',d:'16/05/2026',aud:'Ali Mohamed',t:4,r:3,n:4,s:2,m:3,score:16,niv:'Moyen',obs:'Zone de tri \u00e0 am\u00e9liorer'},
    {id:'AUD5S-002',zone:'Atelier Assemblage',d:'14/05/2026',aud:'Karim Sa\u00efd',t:5,r:4,n:4,s:4,m:4,score:21,niv:'Bon',obs:'Bonne organisation'},
    {id:'AUD5S-003',zone:'Magasin mati\u00e8res',d:'10/05/2026',aud:'Youssef Ahmed',t:3,r:2,n:2,s:3,m:2,score:12,niv:'Faible',obs:'Nettoyage insuffisant'},
    {id:'AUD5S-004',zone:'Zone Peinture',d:'10/05/2026',aud:'Ahmed Samir',t:3,r:3,n:4,s:4,m:3,score:17,niv:'Moyen',obs:'Standardisation en cours'},
  ];
  if(!window.ENV_URGENCES_DATA) window.ENV_URGENCES_DATA=[
    {id:'URG-001',type:'Fuite huile',zone:'Atelier usinage',sit:'D\u00e9versement huile machine',niv:'\u00c9lev\u00e9',action:'D\u00e9ployer absorbants, neutraliser',resp:'Ali Mohamed',equip:'Kit absorbants',s:'Actif'},
    {id:'URG-002',type:'Incendie chimique',zone:'Magasin chimique',sit:'Incendie solvants',niv:'Tr\u00e8s \u00e9lev\u00e9',action:'Extincteur CO2, \u00e9vacuation',resp:'HSE',equip:'Extincteur CO2',s:'Actif'},
    {id:'URG-003',type:'Pollution eau',zone:'Zone peinture',sit:'Ruissellement peinture',niv:'\u00c9lev\u00e9',action:'Barrage anti-pollution',resp:'KORTAS.A',equip:'Barrage + kit neutralisation',s:'Actif'},
    {id:'URG-004',type:'Fuite produit chimique',zone:'Maintenance',sit:'Fuite acide dilu\u00e9',niv:'Moyen',action:'EPI complet, kit absorption',resp:'KORTAS.A',equip:'Kit neutralisation acide',s:'Actif'},
  ];
  return null;
})(),

'env-dash': () => {
  if(!window.ENV_ASPECTS_DATA) PAGES['_envInit'];
  const nc5s = window.ENV_5S_DATA||[];
  const avg5s = nc5s.length ? Math.round(nc5s.reduce((s,a)=>s+a.score,0)/nc5s.length) : 0;
  const mois=[['Jan',280,145,380],['F\u00e9v',295,152,392],['Mar',270,138,368],['Avr',310,160,415],['Mai',298,152,405]];
  const maxEl=320, maxEau=175, maxAir=430;
  const decPts=[['M\u00e9talliques',45,'#64748b'],['Huiles usag\u00e9es',15,'#0284c7'],['Cartons',15,'#f59e0b'],['Plastiques',10,'#06b6d4'],['Dangereux',15,'#dc2626']];
  return `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px">
    ${[['♻','Déchets valorisés','12,45 t','↑ 8%','#16a34a','#f0fdf4'],['💧','Eau','152 m³','↓ 6%','#0284c7','#eff6ff'],['⚡','Électricité','25 430 kWh','↓ 3%','#7c3aed','#f5f3ff'],['🌿','Conformité','92%','≥ 90%','#16a34a','#f0fdf4'],['⭐','Score 5S',avg5s+'/25','Obj. 20/25','#f59e0b','#fffbeb']].map(([ic,l,v,sub,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div>
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px"><span style="font-size:16px">${ic}</span><span style="font-size:9.5px;color:${c};font-weight:700;text-transform:uppercase">${l}</span></div>
      <div style="font-size:23px;font-weight:800;color:${c};line-height:1">${v}</div>
      <div style="font-size:9.5px;color:${c};opacity:.7;margin-top:3px">${sub}</div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">📈 Évolution des consommations — 2026</span><button onclick="goPage('env-conso')" class="btn bsm">Détail →</button></div>
      <div style="position:relative;height:110px;padding:4px 4px 20px">
        <div style="position:absolute;inset:4px 4px 20px">
          ${[0,25,50,75,100].map(p=>`<div style="position:absolute;left:0;right:0;bottom:${p}%;border-top:1px dashed #f1f5f9"></div>`).join('')}
        </div>
        <div style="display:flex;align-items:flex-end;gap:5px;height:100%;position:relative;z-index:1">
          ${mois.map(([m,el,eau,air])=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:90px">
              <div style="width:9px;height:${el/maxEl*84}px;background:#7c3aed;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:9px;height:${eau/maxEau*60}px;background:#0284c7;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:9px;height:${air/maxAir*84}px;background:#16a34a;border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8px;color:#94a3b8">${m}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;font-size:9px">
        ${[['Élec','#7c3aed'],['Eau','#0284c7'],['Air','#16a34a']].map(([l,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${c};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Répartition des déchets — 12,45 t</div>
      <div style="display:flex;align-items:center;gap:12px;justify-content:center">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="31" fill="none" stroke="#f1f5f9" stroke-width="12"/>
          ${(()=>{let o=0.25;return decPts.map(([l,p,c])=>{const f=p/100,a=`<circle cx="44" cy="44" r="31" fill="none" stroke="${c}" stroke-width="12" stroke-dasharray="${2*Math.PI*31*f} ${2*Math.PI*31}" stroke-dashoffset="${-2*Math.PI*31*(o-0.25)}"/>`;o+=f;return a;}).join('');})()}
          <text x="44" y="41" text-anchor="middle" font-size="9" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">78%</text>
          <text x="44" y="51" text-anchor="middle" font-size="7" fill="#94a3b8" font-family="Inter,sans-serif">valorisé</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
          ${decPts.map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:5px"><div style="width:7px;height:7px;border-radius:50%;background:${c}"></div><span style="font-size:9.5px;flex:1;color:#64748b">${l}</span><span style="font-size:9.5px;font-weight:700;color:${c}">${v}%</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">⭐ Audits 5S récents</span><button onclick="goPage('fives-liste')" class="btn bsm">Voir tous →</button></div>
      <table class="tbl"><thead><tr><th>Zone</th><th>Date</th><th>Score</th><th>Niveau</th><th>Auditeur</th></tr></thead><tbody>
        ${nc5s.map(a=>`<tr>
          <td style="font-weight:600;font-size:11px">${a.zone}</td>
          <td style="font-size:10px;color:#94a3b8">${a.d}</td>
          <td><span style="font-weight:800;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}/25</span></td>
          <td><span class="badge ${a.score>=18?'bg3':a.score>=12?'by':'br'}" style="font-size:8.5px">${a.score>=18?'🟢 Bon':a.score>=12?'🟡 Moyen':'🔴 Faible'}</span></td>
          <td style="font-size:10px">${a.aud}</td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">🎯 Actions environnementales</span><button onclick="goPage('env-actions')" class="btn bsm">Voir toutes →</button></div>
      <table class="tbl"><thead><tr><th>Action</th><th>Resp.</th><th>Statut</th></tr></thead><tbody>
        ${(window.ENV_ACTIONS||[]).slice(0,5).map(a=>`<tr>
          <td style="font-size:10.5px;font-weight:500;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</td>
          <td style="font-size:10px">${a.resp}</td>
          <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>`;
},

'env-aspects': () => {
  const D = window.ENV_ASPECTS_DATA||[];
  const fNiv=window.aspFNiv||'Tous', fAct=window.aspFAct||'Tous', fQ=window.aspFQ||'';
  const acts=[...new Set(D.map(a=>a.activite))];
  const F=D.filter(a=>{
    if(fNiv!=='Tous'&&a.niv!==fNiv) return false;
    if(fAct!=='Tous'&&a.activite!==fAct) return false;
    if(fQ&&![a.aspect,a.activite,a.impact,a.id].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const elv=D.filter(a=>a.niv==='Élevé').length, moy=D.filter(a=>a.niv==='Moyen').length, fai=D.filter(a=>a.niv==='Faible').length;
  const nivBadge=n=>`<span class="badge ${n==='Élevé'?'br':n==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${n}</span>`;
  return `
  <div style="display:grid;grid-template-columns:repeat(3,1fr) 2fr;gap:10px;margin-bottom:13px">
    ${[['🔴 Élevé',elv,'#dc2626','#fef2f2'],['🟡 Moyen',moy,'#f59e0b','#fffbeb'],['🟢 Faible',fai,'#16a34a','#f0fdf4']].map(([l,v,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;text-align:center">
      <div style="font-size:26px;font-weight:800;color:${c};line-height:1;margin-bottom:3px">${v}</div>
      <div style="font-size:10px;font-weight:700;color:${c}">${l}</div>
    </div>`).join('')}
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:12px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#dc2626" stroke-width="8" stroke-dasharray="${2*Math.PI*20*elv/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${2*Math.PI*20*0.25}" stroke-linecap="round"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f59e0b" stroke-width="8" stroke-dasharray="${2*Math.PI*20*moy/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*(elv/Math.max(D.length,1)-0.25)}" stroke-linecap="round"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#16a34a" stroke-width="8" stroke-dasharray="${2*Math.PI*20*fai/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*((elv+moy)/Math.max(D.length,1)-0.25)}" stroke-linecap="round"/>
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${D.length}</text>
      </svg>
      <div style="flex:1">
        ${[['Élevé',elv,'#dc2626'],['Moyen',moy,'#f59e0b'],['Faible',fai,'#16a34a']].map(([l,v,c])=>`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
          <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
          <span style="font-size:10px;color:#64748b;flex:1">${l}</span>
          <div style="width:70px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${D.length?Math.round(v/D.length*100):0}%;background:${c};border-radius:3px"></div></div>
          <span style="font-size:10px;font-weight:700;color:${c};min-width:14px">${v}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#16a34a':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:200px">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher aspect, activité, impact…" value="${fQ}"
          oninput="window.aspFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.aspFQ='';document.getElementById('content').innerHTML=PAGES['env-aspects']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.aspFAct=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()">
        <option value="Tous">🏭 Activité : Toutes</option>${acts.map(a=>`<option${a===fAct?' selected':''}>${a}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.aspFNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()">
        <option value="Tous">⚠ Niveau : Tous</option>${['Élevé','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
      </select>
      ${(fQ||fNiv!=='Tous'||fAct!=='Tous')?`<button onclick="window.aspFQ='';window.aspFNiv='Tous';window.aspFAct='Tous';document.getElementById('content').innerHTML=PAGES['env-aspects']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAddAspect()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto;box-shadow:0 2px 8px rgba(22,163,74,.3)">+ Nouvel aspect</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Activité','Aspect env.','Impact potentiel','Gravité','Fréq.','Criticité','Niveau','Statut','Action',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#16a34a;font-family:monospace">${a.id}</td>
        <td style="font-weight:600;font-size:11px">${a.activite}</td>
        <td style="font-size:11px">${a.aspect}</td>
        <td style="font-size:10.5px;color:#64748b;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.impact}</td>
        <td>${nivBadge(a.g)}</td>
        <td style="text-align:center;font-weight:700;font-size:13px">${a.freq}</td>
        <td style="text-align:center"><span style="font-size:14px;font-weight:800;color:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'}">${a.crit}</span></td>
        <td>${nivBadge(a.niv)}</td>
        <td><span class="badge bg3" style="font-size:8.5px">${a.s}</span></td>
        <td style="font-size:10px;color:#64748b;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</td>
        <td><button onclick="envEditAspect('${a.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-dechets': () => {
  const D = window.ENV_DECHETS_DATA||[];
  const fType=window.decFType||'Tous', fStat=window.decFStat||'Tous', fQ=window.decFQ||'';
  const types=[...new Set(D.map(d=>d.type))];
  const F=D.filter(d=>{
    if(fType!=='Tous'&&d.type!==fType) return false;
    if(fStat!=='Tous'&&d.s!==fStat) return false;
    if(fQ&&![d.id,d.type,d.desc,d.zone,d.presta].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const totalKg=D.reduce((s,d)=>s+(d.unite==='kg'?d.qte:d.qte*0.85),0);
  const valorKg=D.filter(d=>d.s==='Enlevé').reduce((s,d)=>s+(d.unite==='kg'?d.qte:d.qte*0.85),0);
  const tc={'Métalliques':'#64748b','Huiles usagées':'#0284c7','Cartons':'#f59e0b','Plastiques':'#06b6d4','Dangereux':'#dc2626'};
  const nonConf=D.filter(d=>d.s==='Non conforme').length;
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['♻','Total déchets',totalKg.toFixed(0)+' kg','#64748b','#f8fafc','Cumul ce mois'],['✅','Valorisés',valorKg.toFixed(0)+' kg','#16a34a','#f0fdf4','Recyclés / enlevés'],['📊','Taux recyclage',Math.round(valorKg/Math.max(totalKg,1)*100)+'%','#0284c7','#eff6ff','Objectif ≥ 80%'],['⚠','Non conformes',nonConf,'#dc2626','#fef2f2','Action requise']].map(([ic,l,v,c,bg,sub])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;font-weight:600;color:${c};opacity:.8;margin-top:1px">${l}</div><div style="font-size:9px;color:#94a3b8">${sub}</div></div>
    </div>`).join('')}
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#f59e0b':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher type, zone, prestataire…" value="${fQ}"
          oninput="window.decFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.decFQ='';document.getElementById('content').innerHTML=PAGES['env-dechets']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.decFType=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()">
        <option value="Tous">♻ Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.decFStat=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()">
        <option value="Tous">📋 Statut : Tous</option>${['Enlevé','En attente','Non conforme'].map(s=>`<option${s===fStat?' selected':''}>${s}</option>`).join('')}
      </select>
      ${(fQ||fType!=='Tous'||fStat!=='Tous')?`<button onclick="window.decFQ='';window.decFType='Tous';window.decFStat='Tous';document.getElementById('content').innerHTML=PAGES['env-dechets']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAddDechet()" style="background:linear-gradient(135deg,#92400e,#f59e0b);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouveau déchet</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Date','Type','Description','Quantité','Zone','Stockage','Enlèvement','Prestataire','Statut',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(d=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#f59e0b;font-family:monospace">${d.id}</td>
        <td style="font-size:10px;color:#94a3b8">${d.d}</td>
        <td><span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${(tc[d.type]||'#94a3b8')+'22'};color:${tc[d.type]||'#94a3b8'};border:1px solid ${(tc[d.type]||'#94a3b8')+'44'}">${d.type}</span></td>
        <td style="font-size:10.5px">${d.desc}</td>
        <td style="font-weight:700;font-family:monospace;font-size:11px">${d.qte} ${d.unite}</td>
        <td style="font-size:10px">${d.zone}</td>
        <td style="text-align:center;font-size:15px">${d.stockOk?'<span style="color:#16a34a">✓</span>':'<span style="color:#dc2626">✗</span>'}</td>
        <td style="font-size:10px;color:#94a3b8">${d.enlev}</td>
        <td style="font-size:10px">${d.presta}</td>
        <td><span class="badge ${d.s==='Enlevé'?'bg3':d.s==='En attente'?'by':'br'}" style="font-size:8.5px">${d.s}</span></td>
        <td><button onclick="envEditDechet('${d.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-conso': () => {
  if(!window.consoPer) window.consoPer='mensuel';
  const per=window.consoPer;
  const mD=[{m:'Mai 2026',el:25430,eau:152,air:4200,carb:400},{m:'Avr 2026',el:26100,eau:160,air:4350,carb:412},{m:'Mar 2026',el:24800,eau:148,air:4100,carb:395},{m:'Fév 2026',el:27000,eau:162,air:4400,carb:425},{m:'Jan 2026',el:25900,eau:155,air:4250,carb:408}];
  const c=mD[0], p=mD[1];
  const ev=(cv,pv)=>{const e=((cv-pv)/pv*100).toFixed(1);return{e,up:parseFloat(e)>0};};
  const eEl=ev(c.el,p.el), eEau=ev(c.eau,p.eau), eAir=ev(c.air,p.air), eCarb=ev(c.carb,p.carb);
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;flex-wrap:wrap;gap:8px">
    <div><div style="font-size:14px;font-weight:700;color:#0f172a">⚡ Suivi des consommations</div><div style="font-size:10px;color:#94a3b8;margin-top:2px">Électricité · Eau · Air comprimé · Carburant — ISO 14001</div></div>
    <div style="display:flex;gap:6px">
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        ${['mensuel','trimestriel','annuel'].map(pp=>`<button onclick="window.consoPer='${pp}';document.getElementById('content').innerHTML=PAGES['env-conso']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${pp}'===per?'#16a34a':'transparent'};color:${'${pp}'===per?'#fff':'#94a3b8'};transition:.15s">${pp.charAt(0).toUpperCase()+pp.slice(1)}</button>`).join('')}
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[[c.el,'kWh','Électricité','#7c3aed','#f5f3ff','⚡',eEl,24000,'kWh'],[c.eau,'m³','Eau','#0284c7','#eff6ff','💧',eEau,140,'m³'],[c.air,'m³','Air comprimé','#16a34a','#f0fdf4','💨',eAir,4000,'m³'],[c.carb,'L','Carburant','#f59e0b','#fffbeb','⛽',eCarb,380,'L']].map(([v,u,l,col,bg,ic,e,obj,ou])=>`
    <div style="background:${bg};border:1px solid ${col}33;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${col}"></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="font-size:18px">${ic}</span><span style="font-size:9.5px;font-weight:700;color:${e.up?'#dc2626':'#16a34a'}">${e.up?'↑':'↓'} ${Math.abs(e.e)}%</span></div>
      <div style="font-size:22px;font-weight:800;color:${col};line-height:1">${v.toLocaleString('fr')}</div>
      <div style="font-size:10px;color:${col};opacity:.7;margin:2px 0 6px">${u} · ${l}</div>
      <div style="font-size:9px;color:#94a3b8">Obj : ${obj.toLocaleString('fr')} ${ou}</div>
      <div style="height:4px;background:${col}22;border-radius:3px;overflow:hidden;margin-top:6px"><div style="height:100%;width:${Math.min(v/obj*100,100)}%;background:${v<=obj?col:'#dc2626'};border-radius:3px"></div></div>
      <div style="font-size:9px;font-weight:600;color:${v<=obj?col:'#dc2626'};margin-top:4px">${v<=obj?'✓ Objectif atteint':'✗ +'+(v-obj).toLocaleString('fr')+' '+ou+' dépassement'}</div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:14px">📈 Évolution — 5 derniers mois</div>
      <div style="position:relative;height:120px;padding:0 4px 20px">
        <div style="position:absolute;inset:0 4px 20px 0">${[0,25,50,75,100].map(pp=>`<div style="position:absolute;left:0;right:0;bottom:${pp}%;border-top:1px dashed #f1f5f9"></div>`).join('')}</div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100%;position:relative;z-index:1">
          ${[...mD].reverse().map(d=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:100px">
              <div style="width:10px;height:${d.el/27000*90}px;background:#7c3aed;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.eau/175*60}px;background:#0284c7;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.air/4500*90}px;background:#16a34a;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.carb/430*80}px;background:#f59e0b;border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8px;color:#94a3b8">${d.m.slice(0,3)}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;font-size:9px;margin-top:4px">
        ${[['Élec','#7c3aed'],['Eau','#0284c7'],['Air','#16a34a'],['Carburant','#f59e0b']].map(([l,col])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${col};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">📊 Comparaison mois/mois</div>
      <table class="tbl"><thead><tr><th>Type</th><th>Ce mois</th><th>Préc.</th><th>Évol.</th></tr></thead><tbody>
        ${[[c.el,p.el,'Élec. (kWh)','#7c3aed'],[c.eau,p.eau,'Eau (m³)','#0284c7'],[c.air,p.air,'Air (m³)','#16a34a'],[c.carb,p.carb,'Carb. (L)','#f59e0b']].map(([cv,pv,l,col])=>{
          const e=((cv-pv)/pv*100).toFixed(1);
          return `<tr><td style="font-size:10.5px;font-weight:600">${l}</td>
            <td style="font-weight:700;color:${col};font-family:monospace">${cv.toLocaleString('fr')}</td>
            <td style="color:#94a3b8;font-size:10px;font-family:monospace">${pv.toLocaleString('fr')}</td>
            <td><span style="font-size:10px;font-weight:700;color:${parseFloat(e)<0?'#16a34a':'#dc2626'}">${parseFloat(e)<0?'↓':'↑'} ${Math.abs(e)}%</span></td>
          </tr>`;
        }).join('')}
      </tbody></table>
      <div style="margin-top:10px;padding:9px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:10px;color:#166534;font-weight:600">
        🎯 ${[[c.el,24000],[c.eau,140],[c.air,4000],[c.carb,380]].filter(([v,o])=>v<=o).length}/4 objectifs atteints ce mois
      </div>
    </div>
  </div>`;
},

'env-chimiques': () => {
  const D = window.ENV_CHIMIQUES_DATA||[];
  const fEtat=window.chimFEtat||'Tous', fFam=window.chimFFam||'Tous', fQ=window.chimFQ||'';
  const fams=[...new Set(D.map(d=>d.fam))];
  const selId=window.chimSelId||(D[0]&&D[0].id)||'';
  const F=D.filter(p=>{
    if(fEtat!=='Tous'&&p.etat!==fEtat) return false;
    if(fFam!=='Tous'&&p.fam!==fFam) return false;
    if(fQ&&![p.id,p.prod,p.fam,p.empl].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const sel=D.find(d=>d.id===selId)||D[0];
  const etats={OK:'bg3',Périmé:'br','Stock bas':'by'};
  const pictos={Solvant:'🧪',Lubrifiant:'🛢',Nettoyant:'🧴',Peinture:'🎨'};
  return `
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#dc2626':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
            <span style="color:#94a3b8">🔍</span>
            <input placeholder="Rechercher produit, famille…" value="${fQ}"
              oninput="window.chimFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()"
              style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
            ${fQ?`<button onclick="window.chimFQ='';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
          </div>
          <select class="sel" onchange="window.chimFFam=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()">
            <option value="Tous">🏷 Famille</option>${fams.map(f=>`<option${f===fFam?' selected':''}>${f}</option>`).join('')}
          </select>
          <select class="sel" onchange="window.chimFEtat=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()">
            <option value="Tous">📋 État</option>${['OK','Périmé','Stock bas'].map(e=>`<option${e===fEtat?' selected':''}>${e}</option>`).join('')}
          </select>
          ${(fQ||fFam!=='Tous'||fEtat!=='Tous')?`<button onclick="window.chimFQ='';window.chimFFam='Tous';window.chimFEtat='Tous';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
          <button onclick="envAddChimique()" style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouveau produit</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
          <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['ID','Produit','Famille','Qté','Emplacement','FDS','Expir.','État',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr></thead>
          <tbody>${F.map(p=>`<tr onclick="window.chimSelId='${p.id}';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" style="cursor:pointer;background:${p.id===selId?'#f0fdf4':''}" onmouseover="if('${p.id}'!==window.chimSelId)this.style.background='#f8fafc'" onmouseout="if('${p.id}'!==window.chimSelId)this.style.background=''">
            <td style="font-weight:700;font-size:10px;color:#dc2626;font-family:monospace">${p.id}</td>
            <td><div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px">${pictos[p.fam]||'⚗'}</span><span style="font-weight:600;font-size:11px">${p.prod}</span></div></td>
            <td style="font-size:10px;color:#64748b">${p.fam}</td>
            <td style="font-weight:700;font-family:monospace">${p.qte} ${p.unite}</td>
            <td style="font-size:10px">${p.empl}</td>
            <td style="text-align:center;font-size:14px">${p.fds?'<span style="color:#16a34a">✓</span>':'<span style="color:#dc2626">✗</span>'}</td>
            <td style="font-size:10px;color:${p.etat==='Périmé'?'#dc2626':'#94a3b8'};font-weight:${p.etat==='Périmé'?700:400}">${p.exp}</td>
            <td><span class="badge ${etats[p.etat]||'bgr'}" style="font-size:8.5px">${p.etat}</span></td>
            <td><button onclick="event.stopPropagation();envEditChimique('${p.id}')" class="btn bsm">✏</button></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
    ${sel?`<div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
      <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:12px">🔬 Fiche produit — ${sel.prod}</div>
      <div style="background:linear-gradient(135deg,#fef2f2,#fff7ed);border:1px solid #fecaca;border-radius:10px;padding:16px;text-align:center;margin-bottom:12px">
        <div style="font-size:32px;margin-bottom:8px">${pictos[sel.fam]||'⚗'}</div>
        <div style="font-size:14px;font-weight:700;color:#0f172a">${sel.prod}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${sel.fam} · ${sel.id}</div>
        <div style="display:flex;justify-content:center;gap:8px;margin-top:10px;font-size:22px">🔥⚠💀</div>
        <div style="font-size:9px;color:#94a3b8;margin-top:4px">${sel.danger||'Voir FDS'}</div>
      </div>
      ${[['Famille',sel.fam],['Stock actuel',sel.qte+' '+sel.unite],['Zone stockage',sel.empl],['FDS',sel.fds?'✓ Disponible':'✗ Manquante'],['Expiration',sel.exp],['État',sel.etat]].map(([k,v])=>`
      <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f1f5f9">
        <span style="font-size:10px;color:#64748b;font-weight:600">${k}</span>
        <span style="font-size:11px;font-weight:700;color:${v.includes('✗')?'#dc2626':v.includes('✓')?'#16a34a':'#0f172a'}">${v}</span>
      </div>`).join('')}
      <div style="display:flex;gap:6px;margin-top:12px">
        <button class="btn" style="flex:1;font-size:10px">📄 Voir FDS</button>
        <button onclick="envEditChimique('${sel.id}')" class="btn bp" style="flex:1;font-size:10px">✏ Modifier</button>
      </div>
    </div>`:'<div class="card">Sélectionnez un produit</div>'}
  </div>`;
},

'env-5s': () => {
  const D = window.ENV_5S_DATA||[];
  const fQ=window.s5FQ||'', fNiv=window.s5FNiv||'Tous';
  const F=D.filter(a=>{
    if(fNiv!=='Tous'&&a.niv!==fNiv) return false;
    if(fQ&&![a.zone,a.aud,a.id].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const avg=D.length?Math.round(D.reduce((s,a)=>s+a.score,0)/D.length):0;
  const bon=D.filter(a=>a.niv==='Bon').length, moy=D.filter(a=>a.niv==='Moyen').length, fai=D.filter(a=>a.niv==='Faible').length;
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['Score moyen',avg+'/25','#f59e0b','#fffbeb','⭐'],['Bon ≥18',bon,'#16a34a','#f0fdf4','🟢'],['Moyen 12-17',moy,'#f59e0b','#fffbeb','🟡'],['Faible <12',fai,'#dc2626','#fef2f2','🔴']].map(([l,v,c,bg,ic])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;font-weight:600;color:${c};opacity:.8;margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#f59e0b':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher zone, auditeur…" value="${fQ}"
          oninput="window.s5FQ=this.value;document.getElementById('content').innerHTML=PAGES['env-5s']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.s5FQ='';document.getElementById('content').innerHTML=PAGES['env-5s']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.s5FNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-5s']()">
        <option value="Tous">⭐ Niveau</option>${['Bon','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
      </select>
      ${(fQ||fNiv!=='Tous')?`<button onclick="window.s5FQ='';window.s5FNiv='Tous';document.getElementById('content').innerHTML=PAGES['env-5s']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAdd5S()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouvel audit</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Zone / Atelier','Date','Auditeur','🗑 S1','📦 S2','🧹 S3','📋 S4','🔄 S5','Score /25','Niveau','Obs.',''].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:center;white-space:nowrap;text-transform:uppercase;letter-spacing:.03em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#f59e0b;font-family:monospace;text-align:center">${a.id}</td>
        <td style="font-weight:600;font-size:11px;text-align:left">${a.zone}</td>
        <td style="font-size:10px;color:#94a3b8;text-align:center">${a.d}</td>
        <td style="font-size:10px;text-align:center">${a.aud}</td>
        ${[a.t,a.r,a.n,a.s,a.m].map(v=>`<td style="text-align:center"><span style="font-weight:700;font-size:12px;color:${v>=4?'#16a34a':v>=3?'#f59e0b':'#dc2626'}">${v}/5</span></td>`).join('')}
        <td style="text-align:center">
          <div style="display:inline-flex;align-items:center;gap:6px">
            <div style="width:38px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${a.score/25*100}%;background:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'};border-radius:3px"></div></div>
            <span style="font-weight:800;font-size:13px;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge ${a.niv==='Bon'?'bg3':a.niv==='Moyen'?'by':'br'}" style="font-size:8.5px">${a.niv==='Bon'?'🟢':a.niv==='Moyen'?'🟡':'🔴'} ${a.niv}</span></td>
        <td style="font-size:10px;color:#94a3b8;max-width:110px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left" title="${a.obs||''}">${a.obs||'—'}</td>
        <td style="text-align:center"><button onclick="envEdit5S('${a.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-urgences': () => {
  const D = window.ENV_URGENCES_DATA||[];
  const fQ=window.urgFQ||'', fNiv=window.urgFNiv||'Tous';
  const F=D.filter(u=>{
    if(fNiv!=='Tous'&&u.niv!==fNiv) return false;
    if(fQ&&![u.type,u.zone,u.sit,u.resp].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const eq=[{nom:'Kit absorbants',qte:8,loc:'Atelier usinage',dispo:true},{nom:'Extincteur CO2',qte:12,loc:'Magasin chimique',dispo:true},{nom:'Barrage anti-pollution',qte:3,loc:'Zone peinture',dispo:true},{nom:'Douche de sécurité',qte:2,loc:'Maintenance',dispo:true}];
  const ct=[{nom:'Ali Mohamed',role:'Responsable HSE',tel:'06 12 34 56 78',c:'#dc2626'},{nom:'Chef maintenance',role:'Maintenance',tel:'06 98 76 54 32',c:'#ea580c'},{nom:'Dr. Nadia',role:'Médecin du travail',tel:'06 55 23 11 22',c:'#16a34a'},{nom:'Youssef Ahmed',role:'Responsable sécurité',tel:'06 32 21 11 00',c:'#0284c7'}];
  const nivBadge=n=>`<span class="badge ${n==='Très élevé'||n==='Élevé'?'br':n==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${n}</span>`;
  return `
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:12px">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#dc2626':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
            <span style="color:#94a3b8">🔍</span>
            <input placeholder="Rechercher type, zone…" value="${fQ}"
              oninput="window.urgFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-urgences']()"
              style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
            ${fQ?`<button onclick="window.urgFQ='';document.getElementById('content').innerHTML=PAGES['env-urgences']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
          </div>
          <select class="sel" onchange="window.urgFNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-urgences']()">
            <option value="Tous">⚠ Niveau</option>${['Très élevé','Élevé','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
          </select>
          <button onclick="envAddUrgence()" style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">+ Nouvelle situation</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#0f172a">🚨 Situations d'urgence recensées</div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
          <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['ID','Type','Zone','Situation','Niveau','Action immédiate','Responsable',''].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr></thead>
          <tbody>${F.map(u=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
            <td style="font-weight:700;font-size:10px;color:#dc2626;font-family:monospace">${u.id}</td>
            <td style="font-weight:600;font-size:11px">${u.type}</td>
            <td style="font-size:10px;color:#64748b">${u.zone}</td>
            <td style="font-size:10.5px;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${u.sit}">${u.sit}</td>
            <td>${nivBadge(u.niv)}</td>
            <td style="font-size:10px;color:#64748b;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${u.action}">${u.action}</td>
            <td style="font-size:10px">${u.resp}</td>
            <td><button onclick="envEditUrgence('${u.id}')" class="btn bsm">✏</button></td>
          </tr>`).join('')}</tbody>
        </table></div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#0f172a">🧰 Équipements d'urgence</div>
        <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif"><thead><tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0">
          ${['Équipement','Qté','Localisation','Disponibilité'].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
        </tr></thead><tbody>${eq.map(e=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
          <td style="font-weight:600;font-size:11px">${e.nom}</td>
          <td style="font-weight:700;font-size:13px;text-align:center">${e.qte}</td>
          <td style="font-size:10px;color:#64748b">${e.loc}</td>
          <td><span class="badge bg3" style="font-size:8.5px">✓ Disponible</span></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:12px">📞 Contacts d'urgence</div>
        ${ct.map(c=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9">
          <div style="width:36px;height:36px;border-radius:50%;background:${c.c}22;border:2px solid ${c.c}44;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${c.c};flex-shrink:0">${c.nom.charAt(0)}</div>
          <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:#0f172a">${c.nom}</div><div style="font-size:9.5px;color:#94a3b8">${c.role}</div></div>
          <a href="tel:${c.tel}" style="font-size:10px;font-weight:700;color:${c.c};text-decoration:none;background:${c.c}11;padding:5px 10px;border-radius:6px;border:1px solid ${c.c}33">${c.tel}</a>
        </div>`).join('')}
      </div>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#991b1b;margin-bottom:10px">🚨 Numéros nationaux d'urgence</div>
        ${[['SAMU','15','#dc2626'],['Pompiers','18','#ea580c'],['Police','17','#1e40af'],['DREAL','0800 711 411','#16a34a']].map(([l,n,c])=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #fecaca40">
          <span style="font-size:10px;color:#64748b;font-weight:600">${l}</span>
          <span style="font-size:13px;font-weight:800;color:${c};font-family:monospace">${n}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
},

'env-actions': () => {
  if(!window.envActView) window.envActView='kanban';
  const view = window.envActView;
  const fPrio = window.envActFPrio||'Tous';
  const fType = window.envActFType||'Tous';
  const fStat = window.envActFStat||'Tous';
  const fQ    = window.envActFQ||'';

  if(!window.ENV_ACTIONS) window.ENV_ACTIONS=[
    {id:1,action:'Installer bac rétention huile',origine:'Aspect ASP-001',resp:'HSE',fin:'20/05/26',statut:'En cours',prio:'Critique',prog:45,type:'Technique',desc:'Bac 200L zone usinage CN01-CN03'},
    {id:2,action:'Réduire consommation eau -10%',origine:'Consommations',resp:'Maintenance',fin:'25/05/26',statut:'En cours',prio:'Haute',prog:30,type:'Optimisation',desc:'Détection fuites + régulateurs pression'},
    {id:3,action:'Trier déchets dangereux',origine:'Déchet DEC-005',resp:'Logistique',fin:'25/05/26',statut:'À faire',prio:'Critique',prog:0,type:'Opérationnel',desc:'Mise en conformité stockage DIS 2025-003'},
    {id:4,action:'Optimiser tri déchets métalliques',origine:'Déchet DEC-001',resp:'Logistique',fin:'30/05/26',statut:'En cours',prio:'Normale',prog:60,type:'Opérationnel',desc:'Nouveau container trié par alliage'},
    {id:5,action:'Sensibilisation environnement',origine:'Plan ISO 14001',resp:'RH',fin:'30/05/26',statut:'À faire',prio:'Normale',prog:0,type:'Formation',desc:'Session 2h tous opérateurs juin 2026'},
    {id:6,action:'Audit fournisseur chimiques',origine:'Produit PC-002',resp:'KORTAS.A',fin:'15/04/26',statut:'En retard',prio:'Haute',prog:20,type:'Audit',desc:'Audit conformité fournisseur acétone'},
    {id:7,action:'MAJ plan urgence env.',origine:'Urgence URG-003',resp:'HSE',fin:'10/04/26',statut:'En retard',prio:'Haute',prog:15,type:'Documentation',desc:'Révision procédure fuite peinture'},
    {id:8,action:'Renouvellement FDS produits',origine:'Produit PC-004',resp:'KORTAS.A',fin:'28/02/26',statut:'Clôturée',prio:'Haute',prog:100,type:'Administratif',desc:'18 FDS mises à jour — SDS Manager'},
    {id:9,action:'Installer LED atelier usinage',origine:'Consommations',resp:'Maintenance',fin:'30/06/26',statut:'À faire',prio:'Normale',prog:0,type:'Technique',desc:'Remplacement éclairage 120 points lumineux'},
    {id:10,action:'Formation tri sélectif',origine:'Plan ISO 14001',resp:'RH',fin:'15/06/26',statut:'Clôturée',prio:'Normale',prog:100,type:'Formation',desc:'Formation tri + affichage zones'},
  ];

  const all = window.ENV_ACTIONS;
  const data = all.filter(a=>{
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fStat!=='Tous'&&a.statut!==fStat) return false;
    if(fQ&&![a.action,a.origine,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=all.length, done=all.filter(a=>a.statut==='Clôturée').length,
    enC=all.filter(a=>a.statut==='En cours').length,
    ret=all.filter(a=>a.statut==='En retard').length,
    af=all.filter(a=>a.statut==='À faire').length;
  const avgP=Math.round(all.reduce((s,a)=>s+a.prog,0)/Math.max(total,1));
  const pctD=Math.round(done/Math.max(total,1)*100);

  const types=[...new Set(all.map(a=>a.type))].sort();
  const TC={Technique:'#1e40af',Optimisation:'#7c3aed',Opérationnel:'#065f46',Formation:'#92400e',Audit:'#c2410c',Documentation:'#991b1b',Administratif:'#475569'};
  const TB={Technique:'#dbeafe',Optimisation:'#f5f3ff',Opérationnel:'#d1fae5',Formation:'#fef3c7',Audit:'#ffedd5',Documentation:'#fce7f3',Administratif:'#f1f5f9'};
  const typePill=t=>`<span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${TB[t]||'#f1f5f9'};color:${TC[t]||'#475569'}">${t}</span>`;
  const prioBadge=p=>`<span class="badge ${p==='Critique'?'br':p==='Haute'?'bo':'bgr'}" style="font-size:8px">${p}</span>`;
  const statCols={'Clôturée':'#16a34a','En cours':'#2563eb','En retard':'#dc2626','À faire':'#64748b'};
  const statBGs={'Clôturée':'#f0fdf4','En cours':'#eff6ff','En retard':'#fef2f2','À faire':'#f8fafc'};

  const progBar=(prog,id)=>`
    <div style="margin:7px 0">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;margin-bottom:3px">
        <span style="font-weight:600">Progression</span>
        <span style="font-weight:800;color:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#94a3b8'}">${prog}%</span>
      </div>
      <div style="height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${prog}%;background:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#3b82f6'};border-radius:10px;transition:.4s"></div>
      </div>
      <input type="range" min="0" max="100" value="${prog}"
        oninput="(()=>{const a=window.ENV_ACTIONS.find(x=>x.id===${id});if(a){a.prog=parseInt(this.value);if(parseInt(this.value)===100)a.statut='Clôturée';}document.getElementById('pv${id}').textContent=this.value+'%';const b=this.parentNode.querySelector('div+div div');if(b)b.style.width=this.value+'%';})()"
        onchange="document.getElementById('content').innerHTML=PAGES['env-actions']()"
        style="width:100%;margin-top:3px;accent-color:#16a34a;height:3px;cursor:pointer;opacity:.6">
    </div>`;

  const statBtn=(a,s)=>{
  const active=a.statut===s;
  const bc=statCols[s]||'#64748b';
  return `<button onclick="(()=>{const x=window.ENV_ACTIONS.find(z=>z.id===${a.id});if(x){x.statut='${s}';if('${s}'==='Clôturée')x.prog=100;}document.getElementById('content').innerHTML=PAGES['env-actions']();})()"
    style="font-size:8px;padding:2px 8px;border:1px solid ${active?bc:'#e2e8f0'};border-radius:20px;background:${active?bc:'#fff'};color:${active?'#fff':'#94a3b8'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${active?700:400};transition:.15s">${s==='À faire'?'⏳':s==='En cours'?'⚡':s==='En retard'?'🚨':'✅'} ${s}</button>`;
};

  const card=a=>`
  <div style="background:#fff;border:1.5px solid ${a.statut==='En retard'?'#fca5a5':'#e2e8f0'};border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#f59e0b':'#94a3b8'};border-radius:10px;padding:12px;margin-bottom:9px;box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .18s"
    onmouseover="this.style.boxShadow='0 6px 20px rgba(0,0,0,.10)';this.style.transform='translateY(-1px)'"
    onmouseout="this.style.boxShadow='0 1px 4px rgba(0,0,0,.05)';this.style.transform='none'">
    <div style="display:flex;gap:6px;margin-bottom:7px">
      <div style="flex:1">
        <div style="font-size:11.5px;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:2px">${a.action}</div>
        <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
      </div>
      <div style="display:flex;gap:3px;flex-shrink:0">
        <button onclick="envEditEnvAction(${a.id})" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#64748b" title="Modifier">✏</button>
        <button onclick="(()=>{if(!confirm('Supprimer cette action ?'))return;const i=window.ENV_ACTIONS.findIndex(x=>x.id===${a.id});if(i>=0)window.ENV_ACTIONS.splice(i,1);document.getElementById('content').innerHTML=PAGES['env-actions']();})()" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#94a3b8" title="Supprimer">✕</button>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      ${typePill(a.type)} ${prioBadge(a.prio)}
      <span style="padding:2px 8px;border-radius:20px;font-size:8px;background:#f1f5f9;color:#64748b">📋 ${a.origine}</span>
    </div>
    ${progBar(a.prog,a.id)}
    <div style="display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8;margin:4px 0 8px">
      <div style="display:flex;align-items:center;gap:4px">
        <div style="width:18px;height:18px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1e40af">${a.resp.charAt(0)}</div>
        ${a.resp}
      </div>
      <span style="color:${a.statut==='En retard'?'#dc2626':'#94a3b8'};font-weight:${a.statut==='En retard'?700:400}">⏰ ${a.fin}${a.statut==='En retard'?' 🚨':''}</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">
      ${['À faire','En cours','En retard','Clôturée'].map(s=>statBtn(a,s)).join('')}
    </div>
  </div>`;

  const row=a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
    <td><div style="font-weight:700;font-size:11px;color:#0f172a;margin-bottom:2px">${a.action}</div><div style="font-size:9.5px;color:#94a3b8">${a.desc}</div></td>
    <td>${typePill(a.type)}</td>
    <td style="font-size:10px;color:#64748b">${a.origine}</td>
    <td style="font-size:10.5px">${a.resp}</td>
    <td style="font-size:10px;color:${a.statut==='En retard'?'#dc2626':'#94a3b8'};font-weight:${a.statut==='En retard'?700:400}">${a.fin}${a.statut==='En retard'?' 🚨':''}</td>
    <td><div style="display:flex;align-items:center;gap:6px">
      <div style="flex:1;height:5px;background:#f1f5f9;border-radius:5px;min-width:55px;overflow:hidden"><div style="height:100%;width:${a.prog}%;background:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};border-radius:5px"></div></div>
      <span style="font-size:10px;font-weight:700;color:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'}">${a.prog}%</span>
    </div></td>
    <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
    <td>${prioBadge(a.prio)}</td>
    <td><div style="display:flex;gap:3px">
      <button onclick="envEditEnvAction(${a.id})" class="btn bsm">✏</button>
      <select onchange="(()=>{const x=window.ENV_ACTIONS.find(z=>z.id===${a.id});if(x){x.statut=this.value;if(this.value==='Clôturée')x.prog=100;}document.getElementById('content').innerHTML=PAGES['env-actions']();})()" class="sel" style="font-size:10px;padding:3px 5px;max-width:100px">
        ${['À faire','En cours','En retard','Clôturée'].map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}
      </select>
    </div></td>
  </tr>`;

  const aFaire2=data.filter(a=>a.statut==='À faire').length;
  const enC2=data.filter(a=>a.statut==='En cours').length;
  const ret2=data.filter(a=>a.statut==='En retard').length;
  const done2=data.filter(a=>a.statut==='Clôturée').length;

  return `
  <!-- ═══ KPI STRIP ═══ -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr) 1.3fr;gap:10px;margin-bottom:13px">
    ${[['📋',total,'Total','#1e40af','#eff6ff'],['⏳',af,'À faire','#64748b','#f8fafc'],['⚡',enC,'En cours','#c2410c','#fff7ed'],['🚨',ret,'En retard','#dc2626','#fef2f2'],['✅',done,'Clôturées','#16a34a','#f0fdf4']].map(([ic,v,l,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:9.5px;color:${c};opacity:.75;margin-top:1px">${l}</div></div>
    </div>`).join('')}
    <!-- Donut global -->
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:11px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        ${(()=>{const d=[af,enC,ret,done];const cs=['#64748b','#2563eb','#dc2626','#16a34a'];let o=0.25;return d.map((v,i)=>{const f=v/Math.max(total,1);const a=`<circle cx="26" cy="26" r="20" fill="none" stroke="${cs[i]}" stroke-width="8" stroke-dasharray="${2*Math.PI*20*f} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*(o-0.25)}" stroke-linecap="butt"/>`;o+=f;return a;}).join('');})()}
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctD}%</text>
      </svg>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:#0f172a">Taux clôture</div>
        <div style="font-size:10px;color:#94a3b8">${done}/${total} · Moy. ${avgP}%</div>
      </div>
    </div>
  </div>

  <!-- ═══ TOOLBAR ═══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#16a34a':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:200px">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher action, origine, responsable…" value="${fQ}"
          oninput="window.envActFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.envActFQ='';document.getElementById('content').innerHTML=PAGES['env-actions']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.envActFType=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">🏷 Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.envActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">⚡ Priorité</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.envActFStat=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">📋 Statut</option>${['À faire','En cours','En retard','Clôturée'].map(s=>`<option${s===fStat?' selected':''}>${s}</option>`).join('')}
      </select>
      ${(fQ||fPrio!=='Tous'||fType!=='Tous'||fStat!=='Tous')?`<button onclick="window.envActFQ='';window.envActFPrio='Tous';window.envActFType='Tous';window.envActFStat='Tous';document.getElementById('content').innerHTML=PAGES['env-actions']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${data.length}/${total}</span>
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-left:auto">
        ${[['kanban','⬛ Kanban'],['liste','≡ Liste']].map(([v,lb])=>`<button onclick="window.envActView='${v}';document.getElementById('content').innerHTML=PAGES['env-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view===v?'#16a34a':'transparent'};color:${view===v?'#fff':'#94a3b8'};transition:.15s">${lb}</button>`).join('')}
      </div>
      <button onclick="envAddEnvAction()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(22,163,74,.3);white-space:nowrap">+ Nouvelle action</button>
    </div>
  </div>

  ${data.length===0?`
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:48px;text-align:center">
    <div style="font-size:36px;margin-bottom:10px">🌿</div>
    <div style="font-size:14px;font-weight:600;color:#0f172a;margin-bottom:4px">Aucune action trouvée</div>
    <div style="font-size:11px;color:#94a3b8">Modifiez les filtres ou ajoutez une nouvelle action</div>
  </div>`

  :view==='kanban'?`
  <!-- ═══ KANBAN ═══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
    ${['À faire','En cours','En retard','Clôturée'].map(statut=>{
      const col=data.filter(a=>a.statut===statut);
      return `<div style="background:${statBGs[statut]};border-radius:12px;padding:11px;min-height:200px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:11px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:8px;height:8px;border-radius:50%;background:${statCols[statut]}"></div>
            <span style="font-size:11px;font-weight:700;color:#0f172a">${statut}</span>
          </div>
          <span style="background:#fff;border:1px solid ${statCols[statut]}50;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:800;color:${statCols[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
        <button onclick="envAddEnvAction()" style="width:100%;padding:7px;border:1.5px dashed #cbd5e1;border-radius:8px;background:transparent;color:#94a3b8;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif;margin-top:2px" onmouseover="this.style.borderColor='#16a34a';this.style.color='#16a34a'" onmouseout="this.style.borderColor='#cbd5e1';this.style.color='#94a3b8'">+ Ajouter</button>
      </div>`;
    }).join('')}
  </div>`

  :`
  <!-- ═══ TABLE ═══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['Action','Type','Origine','Responsable','Échéance','Progression','Statut','Priorité',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${data.map(a=>row(a)).join('')}</tbody>
    </table>
  </div></div>`}`;
},

'env-kpi': () => {
  if(!window.envKpiPer) window.envKpiPer='mensuel';
  const per=window.envKpiPer;
  if(!window.ENV_ACTIONS||!window.ENV_ACTIONS.length) PAGES['env-actions']();

  const acts=window.ENV_ACTIONS||[];
  const total=acts.length, done=acts.filter(a=>a.statut==='Clôturée').length,
    enC=acts.filter(a=>a.statut==='En cours').length,
    ret=acts.filter(a=>a.statut==='En retard').length,
    af=acts.filter(a=>a.statut==='À faire').length;
  const avgP=Math.round(acts.reduce((s,a)=>s+a.prog,0)/Math.max(total,1));
  const pctD=Math.round(done/Math.max(total,1)*100);

  const moisEl=[280,295,270,310,298]; const moisEau=[142,152,138,162,152]; const moisAir=[4100,4350,3980,4400,4200];
  const moisLbls=['Jan','Fév','Mar','Avr','Mai'];
  const objEl=24000, objEau=140, objAir=4000, objCarb=380;
  const nc5s=window.ENV_5S_DATA||[];
  const avg5s=nc5s.length?Math.round(nc5s.reduce((s,a)=>s+a.score,0)/nc5s.length):0;
  const decPts=[['Métalliques',45,'#64748b'],['Huiles usagées',15,'#0284c7'],['Cartons',15,'#f59e0b'],['Plastiques',10,'#06b6d4'],['Dangereux',15,'#dc2626']];

  return `
  <!-- ═══ HEADER ═══ -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:#0f172a">📊 Tableau de bord KPI — Environnement ISO 14001</div>
      <div style="font-size:10px;color:#94a3b8;margin-top:2px">Indicateurs de performance · XPERT-MECA · Mai 2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        ${['mensuel','trimestriel','annuel'].map(p=>`<button onclick="window.envKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['env-kpi']()"
          style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${p===per?'#16a34a':'transparent'};color:${p===per?'#fff':'#94a3b8'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm" onclick="">📥 Export PDF</button>
    </div>
  </div>

  <!-- ═══ ROW 1: 8 KPI CARDS ═══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[
      ['♻','Déchets valorisés','12,45 t','↑ 8% vs préc.','#16a34a','#f0fdf4','Taux valorisation : 78%','↓'],
      ['💧','Consommation eau','152 m³','↑ 8% vs objectif','#dc2626','#fef2f2','Obj. 140 m³ — dépassé','↑'],
      ['⚡','Électricité','25 430 kWh','↑ 6% vs objectif','#dc2626','#fef2f2','Obj. 24 000 kWh — dépassé','↑'],
      ['🌿','Conformité env.','92%','+ 2% vs objectif','#16a34a','#f0fdf4','Obj. ≥ 90% — atteint','↓'],
      ['⭐','Score 5S moyen',avg5s+'/25','Obj. 20/25','#f59e0b','#fffbeb',avg5s>=20?'✓ Objectif atteint':'Écart : '+(20-avg5s)+' pts','→'],
      ['♻','Taux recyclage déchets','78%','Obj. ≥ 80%','#f59e0b','#fffbeb','Proche objectif','→'],
      ['🎯','Actions clôturées',pctD+'%',done+'/'+total+' actions','#16a34a','#f0fdf4','Progression moy. : '+avgP+'%','↓'],
      ['🚨','Urgences env. actives','4','Plans à jour · Équip. OK','#ea580c','#fff7ed','Aucun incident ce mois','→'],
    ].map(([ic,l,v,sub,c,bg,hint,arr])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:10px;font-weight:700;color:${arr==='↑'?'#dc2626':arr==='↓'?'#16a34a':'#94a3b8'}">${arr}</span>
      </div>
      <div style="font-size:22px;font-weight:800;color:${c};line-height:1;margin-bottom:3px">${v}</div>
      <div style="font-size:10px;font-weight:600;color:#0f172a;margin-bottom:2px">${l}</div>
      <div style="font-size:9px;color:${sub.includes('dépassé')?'#dc2626':sub.includes('atteint')?'#16a34a':'#94a3b8'}">${sub}</div>
      <div style="font-size:9px;color:#94a3b8;margin-top:2px;font-style:italic">${hint}</div>
    </div>`).join('')}
  </div>

  <!-- ═══ ROW 2: Bar chart consommations + Donut déchets ═══ -->
  <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:12px;margin-bottom:13px">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution consommations — Jan–Mai 2026</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:9px;color:#94a3b8">Rouge = dépassement objectif</span>
          <button onclick="goPage('env-conso')" class="btn bsm">Détail →</button>
        </div>
      </div>
      <div style="position:relative;height:130px;padding:4px 4px 22px">
        <div style="position:absolute;inset:4px 4px 22px 0">
          ${[0,25,50,75,100].map(p=>`<div style="position:absolute;left:0;right:0;bottom:${p}%;border-top:1px dashed #f1f5f9"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${objEl/27000*100}%;border-top:1.5px dashed #7c3aed55;"><span style="position:absolute;right:2px;top:-9px;font-size:7.5px;color:#7c3aed;font-weight:600">Obj. élec</span></div>
          <div style="position:absolute;left:0;right:0;bottom:${objEau/175*70}%;border-top:1.5px dashed #0284c755;"><span style="position:absolute;left:2px;top:-9px;font-size:7.5px;color:#0284c7;font-weight:600">Obj. eau</span></div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:10px;height:100%;position:relative;z-index:1">
          ${moisLbls.map((_,i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:108px">
              <div title="Élec: ${moisEl[i]}kWh" style="width:12px;height:${moisEl[i]/27000*100}px;background:${moisEl[i]>objEl?'#dc2626':'#7c3aed'};border-radius:3px 3px 0 0;opacity:.85"></div>
              <div title="Eau: ${moisEau[i]}m³" style="width:12px;height:${moisEau[i]/175*70}px;background:${moisEau[i]>objEau?'#dc2626':'#0284c7'};border-radius:3px 3px 0 0;opacity:.85"></div>
              <div title="Air: ${moisAir[i]}m³" style="width:12px;height:${moisAir[i]/4500*95}px;background:${moisAir[i]>objAir?'#f59e0b':'#16a34a'};border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8.5px;color:#94a3b8;font-weight:500">${moisLbls[i]}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;font-size:9px;margin-top:4px;flex-wrap:wrap">
        ${[['Électricité','#7c3aed'],['Eau','#0284c7'],['Air comprimé','#16a34a'],['Dépassement','#dc2626']].map(([l,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${c};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Déchets — 12,45 t ce mois</div>
      <div style="display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:12px">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="31" fill="none" stroke="#f1f5f9" stroke-width="12"/>
          ${(()=>{let o=0.25;return decPts.map(([l,p,c])=>{const f=p/100,a=`<circle cx="44" cy="44" r="31" fill="none" stroke="${c}" stroke-width="12" stroke-dasharray="${2*Math.PI*31*f} ${2*Math.PI*31}" stroke-dashoffset="${-2*Math.PI*31*(o-0.25)}"/>`;o+=f;return a;}).join('');})()}
          <text x="44" y="41" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">78%</text>
          <text x="44" y="52" text-anchor="middle" font-size="7.5" fill="#94a3b8" font-family="Inter,sans-serif">valorisé</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:5px">
          ${decPts.map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:5px">
            <div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div>
            <span style="font-size:9.5px;flex:1;color:#64748b">${l}</span>
            <div style="width:45px;height:4px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${v}%;background:${c};border-radius:3px"></div></div>
            <span style="font-size:9.5px;font-weight:700;color:${c};min-width:24px;text-align:right">${v}%</span>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
        <span style="font-size:10px;color:#166534;font-weight:600">9,8 t valorisées ✓</span>
        <span style="font-size:10px;color:#dc2626;font-weight:700">0,25 t dangereux</span>
      </div>
    </div>
  </div>

  <!-- ═══ ROW 3: Objectifs + Actions + 5S ═══ -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:13px">
    <!-- Objectifs ISO 14001 -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">🎯 Objectifs ISO 14001 — ${per.charAt(0).toUpperCase()+per.slice(1)}</div>
      ${[['Élec. (kWh)',25430,24000,false,'#7c3aed'],['Eau (m³)',152,140,false,'#0284c7'],['Air comprimé (m³)',4200,4000,false,'#16a34a'],['Carburant (L)',400,380,false,'#f59e0b'],['Taux recyclage (%)',78,80,true,'#16a34a'],['Conformité env. (%)',92,90,true,'#16a34a'],['Score 5S (/25)',avg5s,20,true,'#f59e0b']].map(([l,v,o,higher,c])=>{
        const ok=higher?v>=o:v<=o;
        const pct=Math.min(v/o*100,110);
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
            <span style="font-weight:600;color:#0f172a">${l}</span>
            <span style="font-weight:700;color:${ok?'#16a34a':'#dc2626'}">${v.toLocaleString('fr')} / ${o.toLocaleString('fr')}</span>
          </div>
          <div style="height:7px;background:#f1f5f9;border-radius:5px;overflow:hidden">
            <div style="height:100%;width:${Math.min(pct,100)}%;background:${ok?c:'#dc2626'};border-radius:5px;transition:.3s"></div>
          </div>
          <div style="font-size:9px;font-weight:600;color:${ok?'#16a34a':'#dc2626'};margin-top:2px">${ok?'✓ Atteint':'✗ Écart : '+Math.abs(v-o).toLocaleString('fr')}</div>
        </div>`;
      }).join('')}
    </div>

    <!-- Actions plan -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">↺ Plan d'actions ISO 14001</div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="26" fill="none" stroke="#f1f5f9" stroke-width="10"/>
          ${(()=>{const ds=[af,enC,ret,done];const cs=['#64748b','#2563eb','#dc2626','#16a34a'];let o=0.25;return ds.map((v,i)=>{const f=v/Math.max(total,1);const a=`<circle cx="36" cy="36" r="26" fill="none" stroke="${cs[i]}" stroke-width="10" stroke-dasharray="${2*Math.PI*26*f} ${2*Math.PI*26}" stroke-dashoffset="${-2*Math.PI*26*(o-0.25)}" stroke-linecap="butt"/>`;o+=f;return a;}).join('');})()}
          <text x="36" y="33" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctD}%</text>
          <text x="36" y="44" text-anchor="middle" font-size="7" fill="#94a3b8" font-family="Inter,sans-serif">clôturées</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:5px">
          ${[['À faire',af,'#64748b'],['En cours',enC,'#2563eb'],['En retard',ret,'#dc2626'],['Clôturées',done,'#16a34a']].map(([l,v,c])=>`
          <div style="display:flex;align-items:center;gap:5px">
            <div style="width:8px;height:8px;border-radius:50%;background:${c}"></div>
            <span style="font-size:9.5px;flex:1;color:#64748b">${l}</span>
            <div style="width:45px;height:4px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(v/Math.max(total,1)*100)}%;background:${c};border-radius:3px"></div></div>
            <span style="font-size:10px;font-weight:700;color:${c};min-width:14px">${v}</span>
          </div>`).join('')}
        </div>
      </div>
      <div style="font-size:10px;font-weight:700;color:#0f172a;margin-bottom:8px">⚡ Actions critiques en attente</div>
      ${acts.filter(a=>a.prio==='Critique'&&a.statut!=='Clôturée').slice(0,3).map(a=>`
      <div style="padding:8px 10px;background:#fef2f2;border-radius:8px;margin-bottom:6px;border-left:3px solid #dc2626;cursor:pointer" onclick="goPage('env-actions')">
        <div style="font-size:10.5px;font-weight:700;color:#0f172a;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px">
          <span style="color:#94a3b8">${a.resp}</span>
          <span style="color:#dc2626;font-weight:600">⏰ ${a.fin}</span>
        </div>
        <div style="height:4px;background:#fee2e2;border-radius:3px;overflow:hidden;margin-top:5px"><div style="height:100%;width:${a.prog}%;background:#dc2626;border-radius:3px"></div></div>
      </div>`).join('')}
      <button onclick="goPage('env-actions')" class="btn" style="width:100%;margin-top:4px;font-size:10.5px">Voir toutes les actions →</button>
    </div>

    <!-- 5S KPI -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">⭐ Scores 5S par zone</div>
      ${nc5s.map(a=>`
      <div style="margin-bottom:11px;cursor:pointer" onclick="goPage('fives-liste')">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px">${a.zone}</span>
          <div style="display:flex;align-items:center;gap:5px;flex-shrink:0">
            <span class="badge ${a.niv==='Bon'?'bg3':a.niv==='Moyen'?'by':'br'}" style="font-size:8px">${a.niv}</span>
            <span style="font-weight:800;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}/25</span>
          </div>
        </div>
        <div style="height:8px;background:#f1f5f9;border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${a.score/25*100}%;background:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'};border-radius:5px;transition:.4s"></div>
        </div>
        <div style="font-size:9px;color:#94a3b8;margin-top:2px">${a.aud} · ${a.d}</div>
      </div>`).join('')}
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:${avg5s>=20?'#f0fdf4':'#fffbeb'};border-radius:8px;border:1px solid ${avg5s>=20?'#bbf7d0':'#fde68a'};margin-top:2px">
        <span style="font-size:11px;font-weight:700;color:${avg5s>=20?'#166534':'#92400e'}">Score moyen : ${avg5s}/25</span>
        <span style="font-size:11px;font-weight:700;color:${avg5s>=20?'#16a34a':'#f59e0b'}">${avg5s>=20?'✓ Objectif':'⚠ Obj. : 20'}</span>
      </div>
    </div>
  </div>

  <!-- ═══ ROW 4: Aspects + Conformité ═══ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">🌿 Aspects env. — Top criticité</span><button onclick="goPage('env-aspects')" class="btn bsm">Détail →</button></div>
      <table class="tbl"><thead><tr><th>Aspect</th><th>Activité</th><th>Criticité</th><th>Niveau</th></tr></thead><tbody>
        ${(window.ENV_ASPECTS_DATA||[]).sort((a,b)=>b.crit-a.crit).slice(0,6).map(a=>`<tr>
          <td style="font-size:10.5px;font-weight:600;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.aspect}</td>
          <td style="font-size:10px;color:#64748b">${a.activite}</td>
          <td>
            <div style="display:flex;align-items:center;gap:5px">
              <div style="width:30px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${a.crit/12*100}%;background:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'};border-radius:3px"></div></div>
              <span style="font-weight:800;font-size:12px;color:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'}">${a.crit}</span>
            </div>
          </td>
          <td><span class="badge ${a.niv==='Élevé'?'br':a.niv==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${a.niv}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>

    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">📋 Tableau de conformité réglementaire</div>
      ${[['ISO 14001:2015','Système de management env.','Conforme','bg3','#16a34a','92%'],['Arrêté préfectoral','Rejets atmosphériques','Conforme','bg3','#16a34a','100%'],['Directive déchets','Gestion déchets dangereux','Non conforme','br','#dc2626','65%'],['ICPE','Inspection des installations','En cours','by','#f59e0b','78%'],['Plan eau local','Gestion ressources eau','En cours','by','#f59e0b','74%'],['Bilan carbone','Émissions GES scope 1+2','Conforme','bg3','#16a34a','88%']].map(([ref,desc,statut,sc,c,prog])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9">
        <div style="flex:1;min-width:0">
          <div style="font-size:10.5px;font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ref}</div>
          <div style="font-size:9px;color:#94a3b8">${desc}</div>
        </div>
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
          <div style="width:50px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${prog};background:${c};border-radius:3px"></div></div>
          <span class="badge ${sc}" style="font-size:8.5px;white-space:nowrap">${statut}</span>
        </div>
      </div>`).join('')}
      <button onclick="goPage('env-urgences')" class="btn" style="width:100%;margin-top:10px;font-size:10.5px">🚨 Voir urgences env. →</button>
    </div>
  </div>`;
},

'smi':     () => pgSoon('smi'),
'ind':     () => pgSoon('ind')
};
