/** @legacy — nc.pages.js (lazy) */
export default {
'nc-liste': () => {
  const total=NC_DATA.length, ouv=NC_DATA.filter(r=>r.s!=='Clôturé').length, crit=NC_DATA.filter(r=>r.g==='Critique').length, clo=NC_DATA.filter(r=>r.s==='Clôturé').length;
  const projs=[...new Set(NC_DATA.map(r=>r.p))].sort();
  const deps=[...new Set(NC_DATA.map(r=>r.dep))].sort();
  const rows=NC_DATA.map(r=>`<tr>
    <td><span class="link" onclick="goPage('nc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td>
    <td><span style="background:#eff6ff;color:#1e40af;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600">${r.p}</span></td>
    <td><strong>${r.dep}</strong></td><td style="color:var(--muted);font-size:10.5px">${r.poste}</td>
    <td style="max-width:160px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.desc}">${r.desc}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('nc-fiche')">Voir</button></td>
  </tr>`).join('');
  return `
  <!-- KPI strip NC -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total NC',total,'var(--blue)','⚠'],['En cours',ouv,'var(--orange)','⏳'],['Critiques',crit,'var(--red)','🚨'],['Clôturées',clo,'var(--green)','✅'],['Délai moyen','2,8 j','var(--navy)','⏱']].map(([l,v,c,ic])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">${ic}</span>
      <div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Filtres dynamiques NC -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:180px">
        <span style="color:var(--muted)">🔍</span>
        <input id="nc-fq" placeholder="Rechercher N°, description, poste…" style="border:none;background:transparent;font-size:11px;color:var(--text);outline:none;width:100%;font-family:'Inter',sans-serif" oninput="filterNC()">
      </div>
      <select id="nc-fp" class="sel" onchange="filterNC()"><option value="Tous">Projet : Tous</option>${projs.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
      <select id="nc-fd" class="sel" onchange="filterNC()"><option value="Tous">Département : Tous</option>${deps.map(d=>`<option value="${d}">${d}</option>`).join('')}</select>
      <select id="nc-fs" class="sel" onchange="filterNC()"><option value="Tous">Statut : Tous</option><option>En cours</option><option>Ouvert</option><option>Clôturé</option></select>
      <select id="nc-fg" class="sel" onchange="filterNC()"><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
      <button class="btn bsm" onclick="document.getElementById('nc-fq').value='';['nc-fp','nc-fd','nc-fs','nc-fg'].forEach(id=>document.getElementById(id).value='Tous');filterNC()">✕ Réinitialiser</button>
      <span id="nc-cnt" style="font-size:10px;color:var(--muted);margin-left:4px">${total} résultats</span>
    </div>
  </div>

  <!-- Table NC dynamique -->
  <div class="card" style="padding:0;overflow:hidden">
    <div style="overflow-x:auto">
      <table class="tbl" style="min-width:920px">
        <thead><tr>
          <th>N° NC</th><th>Date</th><th>Projet</th><th>Département</th><th>Poste</th><th>Description</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th></th>
        </tr></thead>
        <tbody id="nc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>`;
},

'nc-new': () => {
  return `
  <div class="card" style="max-width:760px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626);border-radius:9px 9px 0 0;padding:16px 20px;margin:-15px -15px 18px">
      <div style="font-size:14px;font-weight:700;color:#fff">⚠ Nouvelle Non-Conformité</div>
      <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">Formulaire QRQC rapide · Numérotation automatique</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px">
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Projet *</label><select id="ncn-proj" class="fi" style="width:100%"><option>M077</option><option>M081</option><option>M085</option><option>M090</option><option>P002</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Département *</label><select id="ncn-dep" class="fi" style="width:100%"><option>Usinage</option><option>Assemblage</option><option>BE Mécanique</option><option>Peinture</option><option>Magasin</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Poste / Machine</label><select id="ncn-poste" class="fi" style="width:100%"><option>Machine CN01</option><option>Machine CN02</option><option>Poste assemblage A1</option><option>Contrôle entrée</option><option>Contrôle final</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Gravité *</label><select id="ncn-grav" class="fi" style="width:100%"><option>Critique</option><option>Majeure</option><option>Mineure</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Responsable</label><input id="ncn-resp" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Délai de traitement</label><select id="ncn-dl" class="fi" style="width:100%"><option>3 jours</option><option>5 jours</option><option>10 jours</option><option>15 jours</option></select></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Description de la NC *</label><input id="ncn-desc" class="fi" placeholder="Ex: Cote Ø35h7 hors tolérance" style="width:100%"></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Action immédiate</label><input id="ncn-action" class="fi" placeholder="Ex: Mise en écart, arrêt machine" style="width:100%"></div>
    </div>
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button class="btn" onclick="goPage('nc-liste')">← Annuler</button>
      <button class="btn btn-danger" onclick="(()=>{const d2=document.getElementById('ncn-desc').value.trim();if(!d2){document.getElementById('ncn-desc').style.borderColor='#dc2626';return;}const n='NC-'+(NC_DATA.length+1).toString().padStart(3,'0');const now=new Date();const d=now.getDate().toString().padStart(2,'0')+'/'+(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getFullYear();NC_DATA.push({n,d,p:document.getElementById('ncn-proj').value,dep:document.getElementById('ncn-dep').value,poste:document.getElementById('ncn-poste').value,r:document.getElementById('ncn-resp').value||'Non assigné',g:document.getElementById('ncn-grav').value,s:'Ouvert',dl:document.getElementById('ncn-dl').value,desc:d2,prog:0});alert('NC '+n+' déclarée !');goPage('nc-liste');})()">✓ Déclarer la NC</button>
    </div>
  </div>`;
},

'nc-fiche': () => `
  <div class="g23">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Non-Conformité N° 001</span>
        <div style="display:flex;gap:5px;align-items:center"><span style="background:#FCEBEB;color:var(--red);padding:3px 9px;border-radius:10px;font-size:10px;font-weight:700">EN COURS 🔴</span><button class="btn bsm">✏</button><button class="btn bsm">⋮</button></div>
      </div>
      <div class="tabs">
        <div class="tab${STATE.ficheTab==='info'?' active':''}" onclick="STATE.ficheTab='info';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Informations</div>
        <div class="tab${STATE.ficheTab==='qrqc'?' active':''}" onclick="STATE.ficheTab='qrqc';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">QRQC</div>
        <div class="tab${STATE.ficheTab==='actions'?' active':''}" onclick="STATE.ficheTab='actions';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Actions</div>
        <div class="tab${STATE.ficheTab==='histo'?' active':''}" onclick="STATE.ficheTab='histo';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Historique</div>
      </div>
      ${STATE.ficheTab==='info'?`<div class="g2" style="gap:11px">
        <div>${[['Projet','M077'],['Département','Usinage'],['Poste','Machine CN01'],['Responsable','A. Ali'],['Date','02/05/2026'],['Qté','10 pièces']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}<div class="drow"><span class="dk">Gravité</span><span class="badge br">🔴 Critique</span></div><div class="drow"><span class="dk">Norme</span><span class="badge bb">ISO 9001</span></div></div>
        <div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">TITRE</div><div style="font-size:13px;font-weight:600;margin-bottom:9px">Défaut dimension pièce</div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">DESCRIPTION</div><div style="font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:9px">Diamètre inférieur à la spécification du plan — 24,8 mm mesuré pour 25 mm requis.</div><span style="color:var(--blue);font-size:11px;cursor:pointer">📎 photo_piece.jpg</span></div>
      </div>`:
      STATE.ficheTab==='qrqc'?`
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Progression traitement QRQC</div>
        ${timelineHTML(['Détection','Analyse','Action imm.','Clôture'],1)}
        <div style="text-align:center;margin-top:11px"><button class="btn bp bsm" onclick="goPage('nc-qrqc')">Continuer le traitement QRQC →</button></div>`:
      STATE.ficheTab==='actions'?`<table class="tbl"><thead><tr><th>Action</th><th>Type</th><th>Resp.</th><th>Statut</th><th>Progression</th></tr></thead><tbody>
        <tr><td>Arrêt machine CN01</td><td><span class="badge br">Immédiate</span></td><td>A. Ali</td><td><span class="badge bg3">✔ Terminé</span></td><td><div class="prog"><div class="pf" style="width:100%;background:var(--green)"></div></div></td></tr>
        <tr><td>Remplacement outil</td><td><span class="badge bo">Corrective</span></td><td>M. Karim</td><td><span class="badge by">⏳ En cours</span></td><td><div class="prog"><div class="pf" style="width:60%;background:var(--yellow)"></div></div></td></tr>
        <tr><td>MAJ procédure contrôle</td><td><span class="badge bgr">Préventive</span></td><td>S. Yassine</td><td><span class="badge bgr">⛔ À faire</span></td><td><div class="prog"><div class="pf" style="width:0;background:#888"></div></div></td></tr>
      </tbody></table>`:
      `<div style="padding:18px 0;text-align:center;color:var(--muted)">2 modifications enregistrées</div>`}
    </div>
    ${kpiSideNC()}
  </div>`,

'nc-qrqc': () => {
  const snames=['Détection','Analyse rapide','Action immédiate','Clôture'];
  const qforms={
    1:`<div class="fgrid"><div class="fg full"><div style="background:#FCEBEB;border:1px solid #F7C1C1;border-radius:7px;padding:10px;display:flex;align-items:center;gap:9px;margin-bottom:4px"><div style="font-size:20px">🔴</div><div><div style="font-size:11px;font-weight:600;color:var(--red)">Problème détecté</div><div style="font-size:11px;font-weight:500;color:#501313">Pièce non conforme — Diamètre hors tolérances</div></div></div></div><div class="fg"><label class="fl">Détecté par</label><select class="fi"><option>A. Ali</option><option>O. Hamid</option></select></div><div class="fg"><label class="fl">Date détection</label><input type="date" class="fi" value="2026-05-02"></div><div class="fg"><label class="fl">Poste / Machine</label><input class="fi" value="Machine CN01" readonly style="background:var(--bg)"></div><div class="fg"><label class="fl">Quantité non conforme</label><input class="fi" type="number" value="10"></div><div class="fg full"><label class="fl">Description</label><textarea class="fi">Diamètre mesuré = 24,8 mm — Requis : 25 mm selon plan P-077-C</textarea></div></div>`,
    2:`${typeof renderCauseSelector==='function'?renderCauseSelector('nc_qrqc_method','nc_qrqc','nc-qrqc'):''}`,
    3:`${typeof renderActionsEditor==='function'?renderActionsEditor('nc_qrqc','nc-qrqc',{title:'Plan d\'actions QRQC',typeSet:'qrqc',optionalNote:true,syncTarget:'NC_ACTIONS',syncRef:'NC-001'}):''}`,
    4:`<div class="fgrid"><div class="fg full"><label class="fl">Résumé du traitement</label><textarea class="fi">Problème corrigé après remplacement de l'outil CN01. Contrôle dimensionnel conforme.</textarea></div><div class="fg"><label class="fl">Efficacité confirmée ?</label><div class="radio-row"><label><input type="radio" checked> ✔ Oui</label><label><input type="radio"> ✘ Non</label></div></div><div class="fg"><label class="fl">Date clôture</label><input type="date" class="fi" value="2026-05-05"></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>Responsable qualité</option></select></div></div>`,
  };
  return `<div class="card">
    <div class="ch"><span class="ct">⚡ Traitement QRQC — NC N° 001</span></div>
    <div style="display:flex;align-items:center;gap:0;margin-bottom:13px">
      ${snames.map((n,i)=>`
        <div style="display:flex;flex-direction:column;align-items:center;flex:${i===0||i===snames.length-1?'none':'1'}">
          <div style="display:flex;align-items:center;width:100%">
            ${i>0?`<div style="flex:1;height:2px;background:${i<STATE.qrqcStep?'var(--blue)':'#e5e7eb'}"></div>`:''}
            <div style="width:28px;height:28px;border-radius:50%;background:${i+1<STATE.qrqcStep?'var(--green)':i+1===STATE.qrqcStep?'var(--blue)':'#e5e7eb'};color:${i+1<=STATE.qrqcStep?'#fff':'var(--muted)'};border:1.5px solid ${i+1<STATE.qrqcStep?'var(--green)':i+1===STATE.qrqcStep?'var(--blue)':'#d1d5db'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;cursor:pointer;flex-shrink:0" onclick="STATE.qrqcStep=${i+1};document.getElementById('content').innerHTML=PAGES['nc-qrqc']()">${i+1<STATE.qrqcStep?'✓':i+1}</div>
            ${i<snames.length-1?`<div style="flex:1;height:2px;background:${i+1<STATE.qrqcStep?'var(--blue)':'#e5e7eb'}"></div>`:''}
          </div>
          <div style="font-size:9px;color:${i+1===STATE.qrqcStep?'var(--blue)':i+1<STATE.qrqcStep?'var(--green)':'var(--muted)'};margin-top:4px;text-align:center;white-space:nowrap">${n}</div>
        </div>`).join('')}
    </div>
    <div style="background:var(--bg);border-radius:7px;padding:8px 12px;margin-bottom:11px;font-size:11px;font-weight:500">Étape ${STATE.qrqcStep}/4 — ${snames[STATE.qrqcStep-1]}</div>
    ${qforms[STATE.qrqcStep]||''}
    <div style="display:flex;justify-content:space-between;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button class="btn" onclick="if(STATE.qrqcStep>1){STATE.qrqcStep--;document.getElementById('content').innerHTML=PAGES['nc-qrqc']()}" ${STATE.qrqcStep===1?'disabled':''}>← Précédent</button>
      ${STATE.qrqcStep<4?`<button class="btn bp" onclick="STATE.qrqcStep++;document.getElementById('content').innerHTML=PAGES['nc-qrqc']()">Suivant →</button>`:`<button class="btn bg2" onclick="goPage('nc-kpi')">📊 KPI →</button>`}
    </div>
  </div>`;
},

'nc-actions': () => {
  if(!window.ncActView) window.ncActView='kanban';
  const view = window.ncActView;
  const fResp = window.ncActFResp||'Tous';
  const fType = window.ncActFType||'Tous';
  const fPrio = window.ncActFPrio||'Tous';
  const fQ = window.ncActFQ||'';

  let data = window.NC_ACTIONS.filter(a=>{
    if(fResp!=='Tous'&&a.resp!==fResp) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fQ&&![a.action,a.ref,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=window.NC_ACTIONS.length, done=window.NC_ACTIONS.filter(a=>a.statut==='Clôturée').length,
    enCours=window.NC_ACTIONS.filter(a=>a.statut==='En cours').length,
    retard=window.NC_ACTIONS.filter(a=>a.statut==='En retard').length,
    avgProg=Math.round(window.NC_ACTIONS.reduce((s,a)=>s+a.prog,0)/Math.max(window.NC_ACTIONS.length,1));

  const resps=[...new Set(window.NC_ACTIONS.map(a=>a.resp))];
  const types=[...new Set(window.NC_ACTIONS.map(a=>a.type))];

  const statBtn = (a,s) => `<button onclick="changeStatut('NC_ACTIONS',${a.id},'${s}','nc-actions')" style="font-size:8.5px;padding:2px 7px;border:1px solid ${a.statut===s?ACT_COL_COLOR[s]:'var(--border)'};border-radius:4px;background:${a.statut===s?ACT_COL_COLOR[s]+'18':'#fff'};color:${a.statut===s?ACT_COL_COLOR[s]:'var(--muted)'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${a.statut===s?'700':'400'};transition:.12s">${s}</button>`;

  const card = (a) => `
  <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:.15s" onmouseover="this.style.boxShadow='0 4px 14px rgba(0,0,0,.09)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)'">
    <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
      <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:var(--navy);line-height:1.35;margin-bottom:3px">${a.action}</div><div style="font-size:9.5px;color:var(--muted);line-height:1.4">${a.desc}</div></div>
      <button onclick="deleteAction('NC_ACTIONS',${a.id},'nc-actions')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:14px;line-height:1;flex-shrink:0;padding:0" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='#d1d5db'">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      <span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span>
      <span class="badge ${ACT_TYPES_NC[a.type]||'bgr'}" style="font-size:8.5px">${a.type}</span>
      <span class="badge br" style="font-size:8.5px">${a.ref}</span>
    </div>
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:3px"><span>Progression</span><span id="prog-val-${a.id}" style="font-weight:700;color:${a.prog===100?'var(--green)':a.prog>0?'var(--orange)':'var(--muted)'}">${a.prog}%</span></div>
      <input type="range" min="0" max="100" value="${a.prog}" oninput="updateProg('NC_ACTIONS',${a.id},this.value,'nc-actions')" onchange="document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="width:100%;accent-color:${a.prog===100?'#16a34a':'#dc2626'};height:4px;cursor:pointer">
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:9.5px;color:var(--muted)"><span>👤 ${a.resp}</span><span>⏰ ${a.fin}</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
  </div>`;

  return `<div class="xm-actions-page">
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total',total,'var(--blue)','📋'],['En cours',enCours,'var(--orange)','⚡'],['En retard',retard,'var(--red)','⏰'],['Clôturées',done,'var(--green)','✅'],['Avancement',avgProg+'%','#dc2626','📊']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:9px">
      <span style="font-size:18px">${ic}</span><div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Toolbar -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:160px">
        <span style="color:var(--muted)">🔍</span>
        <input placeholder="Rechercher action, NC, responsable…" value="${fQ}" oninput="window.ncActFQ=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="border:none;background:transparent;font-size:11px;outline:none;width:100%;font-family:'Inter',sans-serif">
      </div>
      <select class="sel" onchange="window.ncActFResp=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Resp. : Tous</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}</select>
      <select class="sel" onchange="window.ncActFType=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}</select>
      <select class="sel" onchange="window.ncActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Priorité : Toutes</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}</select>
      <button class="btn bsm" onclick="window.ncActFResp='Tous';window.ncActFType='Tous';window.ncActFPrio='Tous';window.ncActFQ='';document.getElementById('content').innerHTML=PAGES['nc-actions']()">✕ Reset</button>
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden;margin-left:auto">
        <button onclick="window.ncActView='kanban';document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='kanban'?'var(--blue)':'transparent'};color:${view==='kanban'?'#fff':'var(--muted)'};transition:.15s">⬛ Kanban</button>
        <button onclick="window.ncActView='liste';document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='liste'?'var(--blue)':'transparent'};color:${view==='liste'?'#fff':'var(--muted)'};transition:.15s">≡ Liste</button>
      </div>
      <button class="btn bp bsm" onclick="showAddActionModal('NC_ACTIONS','nc-actions')">+ Ajouter action</button>
    </div>
  </div>

  ${view==='kanban'?`
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:11px">
    ${ACT_STATUTS.map(statut=>{
      const col=data.filter(a=>a.statut===statut);
      return `<div style="background:${ACT_COL_BG[statut]};border-radius:11px;padding:10px;min-height:180px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:var(--navy)">${statut==='À faire'?'⏳':statut==='En cours'?'⚡':statut==='En retard'?'🚨':'✅'} ${statut}</div>
          <span style="background:#fff;border:1px solid ${ACT_COL_COLOR[statut]}40;border-radius:10px;padding:1px 8px;font-size:10px;font-weight:700;color:${ACT_COL_COLOR[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
      </div>`;
    }).join('')}
  </div>`:`
  <div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto">
    <table class="tbl" style="min-width:800px"><thead><tr><th>Action</th><th>Type</th><th>Réf. NC</th><th>Responsable</th><th>Début</th><th>Fin prévue</th><th>Statut</th><th>Progression</th><th>Changer statut</th></tr></thead>
    <tbody>${data.map(a=>`<tr>
      <td style="font-weight:600;font-size:11px">${a.action}</td>
      <td><span class="badge ${ACT_TYPES_NC[a.type]||'bgr'}" style="font-size:8.5px">${a.type}</span></td>
      <td style="color:var(--red);font-weight:600;font-size:10px">${a.ref}</td>
      <td style="font-size:10.5px">${a.resp}</td><td style="font-size:10px;color:var(--muted)">${a.debut}</td><td style="font-size:10px;color:var(--muted)">${a.fin}</td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td><div style="display:flex;align-items:center;gap:5px"><div class="prog"><div class="pf" style="width:${a.prog}%;background:${a.prog===100?'var(--green)':a.prog>0?'var(--yellow)':'#888'}"></div></div><span style="font-size:10px;font-weight:600">${a.prog}%</span></div></td>
      <td><select onchange="changeStatut('NC_ACTIONS',${a.id},this.value,'nc-actions')" class="sel" style="font-size:10px;padding:3px 6px">${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}</select></td>
    </tr>`).join('')}</tbody></table>
  </div></div>`}</div>`;
},

'nc-kpi': () => {
  if(!window.ncKpiPer) window.ncKpiPer = 'trimestre';
  const per = window.ncKpiPer;
  const monthsNC = [['Jan',3],['Fév',4],['Mar',2],['Avr',5],['Mai',8],['Jun',0]];
  const maxNC = 12;
  const stages = [['Réception','35%','#dc2626',35],['Fabrication','42%','#ea580c',42],['Assemblage','15%','#f59e0b',15],['Livraison','8%','#16a34a',8]];
  const causesRC = [['Erreur opérateur','38%','#dc2626'],['Défaut matière','24%','#ea580c'],['Outillage','18%','#f59e0b'],['Procédure NC','12%','#6366f1'],['Autre','8%','#9ca3af']];
  return `
  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:var(--navy)">📊 Tableau de bord KPI — Non-Conformités</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">ISO 9001 · Suivi QRQC · Mise à jour : 17/05/2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden">
        ${['mensuel','trimestre','annuel'].map(p=>`<button onclick="window.ncKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['nc-kpi']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${p}'===per?'var(--blue)':'transparent'};color:${'${p}'===per?'#fff':'var(--muted)'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm">📥 Export</button>
    </div>
  </div>

  <!-- KPI Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Total NC','8','var(--blue)','⚠','Cumul 2026',''],['Critiques','3','var(--red)','🚨','Traitement urgent','↑'],['Clôturées','2','var(--green)','✅','Taux : 25%','↓'],['En cours','6','var(--orange)','⏳','Suivi actif','→'],['Délai résol.','2,8 j','var(--navy)','⏱','Objectif ≤ 2j','↑'],['Taux détection','78%','#2563eb','🔍','En fabrication','→'],['NC répétitives','25%','#c2410c','🔁','Objectif ≤ 10%','↑'],['Efficacité QRQC','62%','var(--green)','🎯','Actions menées','→']].map(([l,v,c,ic,sub,arrow])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:10px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c};opacity:.7"></div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:10px;font-weight:700;color:${arrow==='↑'?'var(--red)':arrow==='↓'?'var(--green)':'var(--muted)'}">${arrow}</span>
      </div>
      <div style="font-size:22px;font-weight:700;color:${c};line-height:1;margin-bottom:3px;font-family:monospace">${v}</div>
      <div style="font-size:10px;font-weight:600;color:var(--navy);margin-bottom:2px">${l}</div>
      <div style="font-size:9px;color:var(--muted)">${sub}</div>
    </div>`).join('')}
  </div>

  <!-- Row 2 : Bar chart + Répartition -->
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">
    <!-- Bar chart NC mensuel -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des NC — 2026</span>
        <span style="font-size:9px;color:var(--muted)">Obj. ≤ 2 NC/mois · Ligne bleue</span>
      </div>
      <div style="position:relative;padding:6px 0 22px">
        <div style="position:absolute;left:0;right:0;top:6px;bottom:22px">
          ${[0,25,50,75].map(pct=>`<div style="position:absolute;left:0;right:0;bottom:${pct}%;border-top:1px dashed #e5e7eb"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${2/maxNC*100}%;border-top:2px dashed #2563eb;opacity:.7"></div>
          <div style="position:absolute;right:4px;bottom:calc(${2/maxNC*100}% + 3px);font-size:8px;color:#2563eb;font-weight:700">Obj. 2</div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 4px;position:relative;z-index:1">
          ${monthsNC.map(([m,v])=>{
            const h=v>0?(v/maxNC*88):2; const c=v>2?'#dc2626':v>0?'#16a34a':'#e5e7eb';
            return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
              <div style="font-size:10px;font-weight:700;color:${c}">${v||'—'}</div>
              <div style="width:100%;height:${h}px;background:linear-gradient(180deg,${c}dd,${c});border-radius:4px 4px 0 0;min-height:2px;box-shadow:0 2px 4px ${c}33"></div>
              <div style="font-size:9px;color:var(--muted);font-weight:500">${m}</div>
            </div>`;
          }).join('')}
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="font-size:9px;color:var(--muted)">?</div>
            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px 4px 0 0;border:1.5px dashed #9ca3af;box-sizing:border-box"></div>
            <div style="font-size:9px;color:var(--muted)">Jun</div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:4px;font-size:9.5px">
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#16a34a;border-radius:2px"></div>≤ 2</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#dc2626;border-radius:2px"></div>&gt; 2</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:18px;height:0;border-top:2px dashed #2563eb"></div>Objectif</div>
      </div>
    </div>

    <!-- Répartition donuts -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Répartition NC</div>
      <div style="display:flex;gap:10px;justify-content:center;align-items:center">
        <div style="text-align:center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#e5e7eb" stroke-width="10"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.37} ${2*Math.PI*28}" stroke-dashoffset="${2*Math.PI*28*0.25}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#ea580c" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.38} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.12}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#16a34a" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.25} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.5}" stroke-linecap="butt"/>
            <text x="40" y="37" text-anchor="middle" font-size="9" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Statut</text>
            <text x="40" y="47" text-anchor="middle" font-size="7" fill="var(--muted)" font-family="Inter,sans-serif">8 NC</text>
          </svg>
          <div style="display:flex;flex-direction:column;gap:3px;text-align:left;margin-top:4px">
            ${[['En cours','37%','#dc2626'],['Ouvert','38%','#ea580c'],['Clôturé','25%','#16a34a']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:8.5px;color:var(--muted)">${l}</span><span style="font-size:8.5px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
        <div style="width:1px;height:90px;background:var(--border)"></div>
        <div style="text-align:center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#e5e7eb" stroke-width="10"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.37} ${2*Math.PI*28}" stroke-dashoffset="${2*Math.PI*28*0.25}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.38} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.12}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#22c55e" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.25} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.5}" stroke-linecap="butt"/>
            <text x="40" y="37" text-anchor="middle" font-size="9" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Gravité</text>
            <text x="40" y="47" text-anchor="middle" font-size="7" fill="var(--muted)" font-family="Inter,sans-serif">8 NC</text>
          </svg>
          <div style="display:flex;flex-direction:column;gap:3px;text-align:left;margin-top:4px">
            ${[['Critique','37%','#dc2626'],['Majeure','38%','#f59e0b'],['Mineure','25%','#22c55e']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:8.5px;color:var(--muted)">${l}</span><span style="font-size:8.5px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Row 3 : Détection + Causes -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <!-- Stade de détection -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🔍 Stade de détection des NC</div>
      <div style="display:flex;flex-direction:column;gap:7px">
        ${stages.map(([stage,pct,c,val])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:10px;color:var(--navy);font-weight:600;width:90px;flex-shrink:0">${stage}</span>
          <div style="flex:1;height:18px;background:#f1f5f9;border-radius:5px;overflow:hidden;position:relative">
            <div style="position:absolute;left:0;top:0;bottom:0;width:${val}%;background:${c};border-radius:5px;display:flex;align-items:center;padding:0 6px;transition:.4s">
              <span style="font-size:9px;font-weight:700;color:#fff;white-space:nowrap">${pct}</span>
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding:8px;background:#fef2f2;border-radius:7px;border:1px solid #fecaca;font-size:10px;color:#991b1b">
        ⚠ <strong>77% des NC</strong> détectées en interne — 8% seulement à la livraison ✅
      </div>
    </div>

    <!-- Causes racines -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🧩 Causes racines — Répartition</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${causesRC.map(([cause,pct,c])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
          <span style="font-size:10px;color:var(--navy);flex:1;font-weight:500">${cause}</span>
          <div style="width:90px;display:flex;align-items:center;gap:4px">
            <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct};background:${c};border-radius:3px"></div>
            </div>
            <span style="font-size:10px;font-weight:700;color:${c};font-family:monospace;width:28px;text-align:right">${pct}</span>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding:8px;background:#eff6ff;border-radius:7px;border:1px solid #bfdbfe;font-size:10px;color:#1e40af">
        📌 <strong>Action prioritaire :</strong> Formation opérateurs + revue AMDEC process
      </div>
    </div>
  </div>`;
},

'nc-cloture': () => { goPage('nc-kpi'); return ''; },
};
