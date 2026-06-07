/** @legacy — rc.pages.js (lazy) */
export default {
/* ══════════════════════════════════════
   RC PAGES
══════════════════════════════════════ */
'rc-liste': () => {
  const total=RC_DATA.length, ouv=RC_DATA.filter(r=>r.s!=='Clôturée').length, crit=RC_DATA.filter(r=>r.g==='Critique').length, clo=RC_DATA.filter(r=>r.s==='Clôturée').length;
  const projs=[...new Set(RC_DATA.map(r=>r.p))].sort();
  const clients=[...new Set(RC_DATA.map(r=>r.cl))].sort();
  const rows=RC_DATA.map(r=>`<tr>
    <td><span class="link" onclick="goPage('rc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td><span style="background:#eff6ff;color:#1e40af;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600">${r.p}</span></td><td><strong>${r.cl}</strong></td><td>${r.dep}</td>
    <td style="max-width:180px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.obj}">${r.obj}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('rc-fiche')">Voir</button></td>
  </tr>`).join('');
  return `
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total RC',total,'var(--blue)','📋'],['Ouvertes',ouv,'var(--orange)','🔓'],['Critiques',crit,'var(--red)','🚨'],['Clôturées',clo,'var(--green)','✅'],['Délai moyen','8,6 j','var(--navy)','⏱']].map(([l,v,c,ic])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">${ic}</span>
      <div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Filtres dynamiques -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:180px">
        <span style="color:var(--muted)">🔍</span>
        <input id="rc-fq" placeholder="Rechercher N°, client, problème…" style="border:none;background:transparent;font-size:11px;color:var(--text);outline:none;width:100%;font-family:'Inter',sans-serif" oninput="filterRC()">
      </div>
      <select id="rc-fp" class="sel" onchange="filterRC()"><option value="Tous">Projet : Tous</option>${projs.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
      <select id="rc-fc" class="sel" onchange="filterRC()"><option value="Tous">Client : Tous</option>${clients.map(c=>`<option value="${c}">${c}</option>`).join('')}</select>
      <select id="rc-fs" class="sel" onchange="filterRC()"><option value="Tous">Statut : Tous</option><option>En traitement</option><option>En analyse</option><option>Ouvert</option><option>Clôturée</option></select>
      <select id="rc-fg" class="sel" onchange="filterRC()"><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
      <button class="btn bsm" onclick="document.getElementById('rc-fq').value='';['rc-fp','rc-fc','rc-fs','rc-fg'].forEach(id=>document.getElementById(id).value='Tous');filterRC()">✕ Réinitialiser</button>
      <span id="rc-cnt" style="font-size:10px;color:var(--muted);margin-left:4px">${total} résultats</span>
    </div>
  </div>

  <!-- Table dynamique -->
  <div class="card" style="padding:0;overflow:hidden">
    <div style="overflow-x:auto">
      <table class="tbl" style="min-width:900px">
        <thead><tr>
          <th>N° RC</th><th>Date</th><th>Projet</th><th>Client</th><th>Département</th><th>Problème</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th></th>
        </tr></thead>
        <tbody id="rc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>`;
},

'rc-new': () => {
  return `
  <div class="card" style="max-width:760px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);border-radius:9px 9px 0 0;padding:16px 20px;margin:-15px -15px 18px">
      <div style="font-size:14px;font-weight:700;color:#fff">✉ Nouvelle Réclamation Client</div>
      <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">Formulaire de déclaration · Numérotation automatique</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px">
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Projet *</label><select id="rcn-proj" class="fi" style="width:100%"><option>M077</option><option>M081</option><option>M085</option><option>M090</option><option>P002</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Client *</label><select id="rcn-cl" class="fi" style="width:100%"><option>Client A</option><option>Client B</option><option>Client C</option><option>Airbus</option><option>Safran</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Département</label><select id="rcn-dep" class="fi" style="width:100%"><option>BE Mécanique</option><option>Usinage</option><option>Assemblage</option><option>Qualité</option><option>Logistique</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Responsable</label><input id="rcn-resp" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Gravité *</label><select id="rcn-grav" class="fi" style="width:100%"><option>Critique</option><option>Majeure</option><option>Mineure</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Délai de traitement</label><select id="rcn-dl" class="fi" style="width:100%"><option>5 jours</option><option>10 jours</option><option>15 jours</option><option>30 jours</option></select></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Titre de la réclamation *</label><input id="rcn-titre" class="fi" placeholder="Description courte du problème signalé…" style="width:100%"></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Description détaillée</label><textarea id="rcn-desc" class="fi" placeholder="Décrire précisément le problème : symptômes, impact, contexte…" style="width:100%;min-height:80px;resize:vertical"></textarea></div>
    </div>
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button class="btn" onclick="goPage('rc-liste')">← Annuler</button>
      <button class="btn bp" onclick="(()=>{const t=document.getElementById('rcn-titre').value.trim();if(!t){document.getElementById('rcn-titre').style.borderColor='#dc2626';return;}const n='RC-'+(RC_DATA.length+1).toString().padStart(3,'0');const now=new Date();const d=now.getDate().toString().padStart(2,'0')+'/'+(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getFullYear();RC_DATA.push({n,d,p:document.getElementById('rcn-proj').value,cl:document.getElementById('rcn-cl').value,dep:document.getElementById('rcn-dep').value,r:document.getElementById('rcn-resp').value||'Non assigné',g:document.getElementById('rcn-grav').value,s:'Ouvert',dl:document.getElementById('rcn-dl').value,obj:t,prog:0});alert('Réclamation '+n+' créée !');goPage('rc-liste');})()">✓ Créer la réclamation</button>
    </div>
  </div>`;
},

'rc-fiche': () => `
  <div class="g23">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Réclamation N° 001</span>
        <div style="display:flex;gap:5px;align-items:center"><span class="status-pill">EN TRAITEMENT</span><button class="btn bsm">✏</button><button class="btn bsm">⋮</button></div>
      </div>
      <div class="tabs">
        <div class="tab${STATE.ficheTab==='info'?' active':''}" onclick="STATE.ficheTab='info';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Informations</div>
        <div class="tab${STATE.ficheTab==='d8'?' active':''}" onclick="STATE.ficheTab='d8';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Traitement 8D</div>
        <div class="tab${STATE.ficheTab==='actions'?' active':''}" onclick="STATE.ficheTab='actions';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Actions</div>
        <div class="tab${STATE.ficheTab==='histo'?' active':''}" onclick="STATE.ficheTab='histo';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Historique</div>
      </div>
      ${STATE.ficheTab==='info'?`
        <div class="g2" style="gap:12px">
          <div>${[['Projet','M077'],['Client','Client A'],['Date','02/05/2024'],['Département','BE Mécanique'],['Responsable','KORTAS.A']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}<div class="drow"><span class="dk">Gravité</span><span class="badge br">Critique</span></div></div>
          <div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">TITRE</div><div style="font-size:13px;font-weight:600;margin-bottom:9px">Erreur de dimension sur pièce usinée</div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">DESCRIPTION</div><div style="font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:9px">La pièce livrée présente un diamètre inférieur à la spécification du plan.</div><span style="color:var(--blue);font-size:11px;cursor:pointer">📎 photo_piece.jpg</span></div>
        </div>`:
      STATE.ficheTab==='d8'?`
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Progression traitement 8D</div>
        ${timelineHTML(['Équipe','Desc.','Actions','Cause','Corr.','Valid.','Prév.','Clôture'],3)}
        <div style="text-align:center;margin-top:11px"><button class="btn bp bsm" onclick="goPage('rc-8d')">Continuer le traitement 8D →</button></div>`:
      STATE.ficheTab==='actions'?actionsTableRC():
      `<div style="padding:20px 0;text-align:center;color:var(--muted)">3 modifications enregistrées</div>`}
    </div>
    ${kpiSideRC()}
  </div>`,

'rc-8d': () => {
  const data = RC_DATA || [];
  if (!STATE.d8Step || STATE.d8Step < 1 || STATE.d8Step > 8) STATE.d8Step = 1;

  let rc =
    typeof window.findRcRecord === 'function'
      ? window.findRcRecord(STATE.currentRC || data[0]?.n)
      : data.find((r) => r.n === STATE.currentRC) || data[0];

  if (!rc) {
    return `<div class="card">
      <div class="ch"><span class="ct">Traitement 8D</span></div>
      <div style="padding:32px 20px;text-align:center;color:var(--muted)">
        <div style="font-size:32px;margin-bottom:10px">📋</div>
        <p style="font-size:13px;font-weight:600;color:var(--text);margin:0 0 6px">Aucune réclamation disponible</p>
        <p style="font-size:11px;margin:0 0 16px">Créez une réclamation client pour démarrer le processus 8D (D1 à D8).</p>
        <button type="button" class="btn bp" onclick="goPage('rc-new')">+ Nouvelle réclamation</button>
        <button type="button" class="btn" onclick="goPage('rc-liste')" style="margin-left:8px">Voir la liste</button>
      </div>
    </div>`;
  }

  const rcRef = rc.n;
  if (!STATE.currentRC) STATE.currentRC = rcRef;
  if (typeof window.ensureRc8dFields === 'function') rc = window.ensureRc8dFields(rc);
  const q = (s) => String(s||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');
  const goStep = (n) => `STATE.d8Step=${n};reloadPage('rc-8d')`;
  const broadcast5 = typeof window.renderRcBroadcastFooter === 'function' ? window.renderRcBroadcastFooter(rc, 5) : '';
  const broadcast7 = typeof window.renderRcBroadcastFooter === 'function' ? window.renderRcBroadcastFooter(rc, 7) : '';
  const names=['Équipe','Description','Actions immédiates','Cause racine','Actions correctives','Validation','Actions préventives','Clôture'];
  const forms={
    1:`<div class="fgrid"><div class="fg"><label class="fl">Responsable qualité <span>*</span></label><select class="fi"><option>${q(rc.r)}</option></select></div><div class="fg"><label class="fl">Département <span>*</span></label><select class="fi"><option>${q(rc.dep)}</option></select></div><div class="fg"><label class="fl">Client</label><input class="fi" value="${q(rc.cl)}" readonly></div><div class="fg"><label class="fl">Référence RC</label><input class="fi" value="${q(rc.n)}" readonly></div><div class="fg full"><label class="fl">Email client (diffusion rapport 8D) <span>*</span></label><input type="email" class="fi" value="${q(rc.emailClient)}" placeholder="client@exemple.com" onchange="rcSave8dField('${q(rcRef)}','emailClient',this.value)"></div><div class="fg full"><label class="fl">Membres équipe</label><input class="fi" value="M. Karim, H. Saldi"></div></div>`,
    2:`<div class="fgrid"><div class="fg"><label class="fl">Quoi ? <span>*</span></label><input class="fi" value="${q(rc.d2What||rc.obj)}" onchange="rcSave8dField('${q(rcRef)}','d2What',this.value)"></div><div class="fg"><label class="fl">Où ? <span>*</span></label><input class="fi" value="${q(rc.d2Where)}" onchange="rcSave8dField('${q(rcRef)}','d2Where',this.value)"></div><div class="fg"><label class="fl">Quand ?</label><input class="fi" value="${q(rc.d2When||rc.d)}" onchange="rcSave8dField('${q(rcRef)}','d2When',this.value)"></div><div class="fg"><label class="fl">Qui ?</label><input class="fi" value="${q(rc.d2Who)}" onchange="rcSave8dField('${q(rcRef)}','d2Who',this.value)"></div><div class="fg"><label class="fl">Quantité impactée</label><input class="fi" type="number" value="${q(rc.d2Qty)}" onchange="rcSave8dField('${q(rcRef)}','d2Qty',this.value)"></div><div class="fg full"><label class="fl">Description détaillée</label><textarea class="fi" onchange="rcSave8dField('${q(rcRef)}','d2What',this.value)">${q(rc.d2What||rc.obj)}</textarea></div></div>`,
    3:`${typeof renderActionsEditor==='function'?renderActionsEditor('rc_d3','rc-8d',{title:'Actions immédiates (D3)',typeSet:'qrqc',allowedTypes:['Immédiate'],defaultType:'Immédiate',optionalNote:true,syncTarget:'RC_ACTIONS',syncRef:rcRef}):'<p class="wf-actions-note">Actions immédiates facultatives.</p>'}`,
    4:`${typeof renderCauseSelector==='function'?renderCauseSelector('rc_d4_method','rc_d4','rc-8d'):''}<div class="fgrid" style="margin-top:10px"><div class="fg full"><label class="fl">Cause principale</label><input class="fi" value="${q(rc.d4CauseMain)}" onchange="rcSave8dField('${q(rcRef)}','d4CauseMain',this.value)"></div></div>`,
    5:`${typeof renderActionsEditor==='function'?renderActionsEditor('rc_d5','rc-8d',{title:'Actions correctives (D5)',typeSet:'qrqc',allowedTypes:['Corrective','Préventive'],defaultType:'Corrective',optionalNote:true,syncTarget:'RC_ACTIONS',syncRef:rcRef}):''}${broadcast5}`,
    6:`<div class="fgrid"><div class="fg"><label class="fl">Test réalisé ? <span>*</span></label><div class="radio-row"><label><input type="radio" checked> Oui</label><label><input type="radio"> Non</label></div></div><div class="fg"><label class="fl">Résultat test <span>*</span></label><select class="fi"><option>OK</option><option>NOK</option></select></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>${q(rc.r)}</option></select></div><div class="fg"><label class="fl">Date validation</label><input type="date" class="fi"></div><div class="fg full"><label class="fl">Commentaire</label><textarea class="fi">Dimension conforme après mise à jour du plan.</textarea></div></div>`,
    7:`${typeof renderActionsEditor==='function'?renderActionsEditor('rc_d7','rc-8d',{title:'Actions préventives (D7)',typeSet:'qrqc',allowedTypes:['Préventive'],defaultType:'Préventive',optionalNote:true,syncTarget:'RC_ACTIONS',syncRef:rcRef}):''}<div class="fgrid" style="margin-top:10px"><div class="fg"><label class="fl">Mise à jour documentée</label><select class="fi"><option>Procédure</option><option>AMDEC</option><option>Instruction</option></select></div><div class="fg"><label class="fl">Formation nécessaire ?</label><div class="radio-row"><label><input type="radio" name="rc_d7_form"> Oui</label><label><input type="radio" name="rc_d7_form" checked> Non</label></div></div></div>${broadcast7}`,
    8:`<div class="fgrid"><div class="fg full"><label class="fl">Résumé final <span>*</span></label><textarea class="fi">Action corrective et préventive réalisées. Problème résolu.</textarea></div><div class="fg"><label class="fl">Efficacité confirmée ?</label><div class="radio-row"><label><input type="radio" checked> Oui</label><label><input type="radio"> Non</label></div></div><div class="fg"><label class="fl">Date clôture</label><input type="date" class="fi"></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>${q(rc.r)}</option></select></div></div>`,
  };
  return `<div class="card">
    <div class="ch"><span class="ct">Traitement 8D — ${q(rc.n)} · ${q(rc.cl)}</span></div>
    <div class="d8-bar">
      ${names.map((n,i)=>`<div class="d8s${i+1<STATE.d8Step?' done':i+1===STATE.d8Step?' active':''}" onclick="${goStep(i + 1)}">
        <div class="d8s-dot">${i+1<STATE.d8Step?'✓':'D'+(i+1)}</div>
        <div class="d8s-id">D${i+1}</div><div class="d8s-name">${n}</div>
      </div>`).join('')}
    </div>
    <div style="background:var(--bg);border-radius:7px;padding:8px 12px;margin-bottom:11px;font-size:12px;font-weight:500">D${STATE.d8Step} — ${names[STATE.d8Step-1]} · RC liée : <strong>${q(rcRef)}</strong></div>
    ${forms[STATE.d8Step]||''}
    <div style="display:flex;justify-content:space-between;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button type="button" class="btn" onclick="if(STATE.d8Step>1){STATE.d8Step--;reloadPage('rc-8d')}" ${STATE.d8Step===1?'disabled':''}>← Précédent</button>
      ${STATE.d8Step<8?`<button type="button" class="btn bp" onclick="STATE.d8Step++;reloadPage('rc-8d')">Suivant →</button>`:`<button type="button" class="btn bg2" onclick="window.rcKpiTab='synthese';goPage('rc-kpi')">📊 KPI →</button>`}
    </div>
  </div>`;
},

'rc-actions': () => {
  if(!window.rcActView) window.rcActView='kanban';
  const view = window.rcActView;
  const fResp = window.rcActFResp||'Tous';
  const fType = window.rcActFType||'Tous';
  const fPrio = window.rcActFPrio||'Tous';
  const fRef  = window.rcActFRef||'Tous';
  const fQ    = window.rcActFQ||'';

  // FIX: isOverdue — date fin format DD/MM or DD/MM/YY
  const isOverdue = (fin, statut) => {
    if(statut==='Clôturée') return false;
    if(!fin||fin==='—') return false;
    const p = fin.split('/');
    if(p.length < 2) return false;
    const y = p[2] ? (p[2].length===2?'20'+p[2]:p[2]) : '2026';
    return new Date(y+'-'+p[1]+'-'+p[0]) < new Date('2026-05-17');
  };

  // FIX: filter on a copy of the array
  const all = window.RC_ACTIONS;
  const data = all.filter(a => {
    if(fResp!=='Tous' && a.resp!==fResp) return false;
    if(fType!=='Tous' && a.type!==fType) return false;
    if(fPrio!=='Tous' && a.prio!==fPrio) return false;
    if(fRef!=='Tous'  && a.ref!==fRef)  return false;
    if(fQ && ![a.action,a.ref,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total   = all.length;
  const done    = all.filter(a=>a.statut==='Clôturée').length;
  const enCours = all.filter(a=>a.statut==='En cours').length;
  const retard  = all.filter(a=>a.statut==='En retard'||isOverdue(a.fin,a.statut)).length;
  const aFaire  = all.filter(a=>a.statut==='À faire').length;
  const avgProg = Math.round(all.reduce((s,a)=>s+a.prog,0)/Math.max(all.length,1));
  const pctDone = Math.round(done/Math.max(total,1)*100);

  const resps = [...new Set(all.map(a=>a.resp))];
  const types = [...new Set(all.map(a=>a.type))];
  const refs  = [...new Set(all.map(a=>a.ref))];

  // FIX: typePill — use array index not split(':') on hex colors
  const TYPE_COLORS = {
    Immédiate: ['#fee2e2','#dc2626'],
    Corrective: ['#ffedd5','#c2410c'],
    Préventive: ['#dcfce7','#166534'],
    Contention: ['#fee2e2','#dc2626'],
    Correction: ['#ffedd5','#c2410c'],
    Prévention: ['#dcfce7','#166534'],
  };
  const typePill = t => {
    const [bg,c] = TYPE_COLORS[t]||['#f1f5f9','#64748b'];
    return `<span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${bg};color:${c}">${t}</span>`;
  };

  const prioBadge = p => `<span class="badge ${ACT_PRIOS[p]||'bgr'}" style="font-size:8px">${p}</span>`;

  // FIX: progBar — always use numeric id, no string prefix
  const progBar = (prog, numId) => `
    <div style="margin:7px 0">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:4px">
        <span style="font-weight:600">Progression</span>
        <span id="pv-${numId}" style="font-weight:800;color:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#94a3b8'}">${prog}%</span>
      </div>
      <div style="height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${prog}%;background:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#3b82f6'};border-radius:10px;transition:.4s"></div>
      </div>
      <input type="range" min="0" max="100" value="${prog}"
        oninput="updateProg('RC_ACTIONS',${numId},this.value,'rc-actions')"
        onchange="document.getElementById('content').innerHTML=PAGES['rc-actions']()"
        style="width:100%;margin-top:4px;accent-color:#2563eb;height:3px;cursor:pointer;opacity:.6">
    </div>`;

  // FIX: statBtn — clean template, no line breaks inside attribute strings
  const statBtn = (a, s) => {
    const active = a.statut===s;
    const bc = ACT_COL_COLOR[s];
    return `<button onclick="changeStatut('RC_ACTIONS',${a.id},'${s}','rc-actions')" style="font-size:8px;padding:2px 8px;border:1px solid ${active?bc:'#e2e8f0'};border-radius:20px;background:${active?bc:'#fff'};color:${active?'#fff':'#94a3b8'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${active?700:400};transition:.15s;white-space:nowrap">${s==='À faire'?'⏳':s==='En cours'?'⚡':s==='En retard'?'🚨':'✅'} ${s}</button>`;
  };

  // ── KANBAN CARD ──────────────────────────────────────────────────────────
  const card = a => {
    const over = isOverdue(a.fin, a.statut);
    // FIX: use RC_DATA (const) not window.RC_DATA
    const refData = RC_DATA.find(r=>r.n===a.ref);
    return `<div style="background:#fff;border:1.5px solid ${over?'#fca5a5':'#e2e8f0'};border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#f59e0b':'#94a3b8'};border-radius:10px;padding:12px;margin-bottom:9px;box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .18s;position:relative"
      onmouseover="this.style.boxShadow='0 5px 18px rgba(0,0,0,.10)';this.style.transform='translateY(-1px)'"
      onmouseout="this.style.boxShadow='0 1px 4px rgba(0,0,0,.05)';this.style.transform='none'">
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
        <div style="flex:1">
          <div style="font-size:11.5px;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:3px">${a.action}</div>
          <div style="font-size:9.5px;color:#94a3b8;line-height:1.4">${a.desc}</div>
        </div>
        <div style="display:flex;gap:3px;flex-shrink:0">
          <button onclick="openEditAction(${a.id})" title="Modifier" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#64748b">✏</button>
          <button onclick="deleteAction('RC_ACTIONS',${a.id},'rc-actions')" title="Supprimer" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#94a3b8">✕</button>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
        ${typePill(a.type)}
        ${prioBadge(a.prio)}
        <span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:#eff6ff;color:#1e40af">${a.ref}</span>
        ${refData?`<span style="padding:2px 7px;border-radius:20px;font-size:8px;background:#f1f5f9;color:#64748b">${refData.cl}</span>`:''}
      </div>
      ${progBar(a.prog, a.id)}
      <div style="display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8;margin-top:4px;margin-bottom:8px">
        <span style="display:flex;align-items:center;gap:4px">
          <div style="width:16px;height:16px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#1e40af">${a.resp.charAt(0)}</div>
          ${a.resp}
        </span>
        <span style="color:${over?'#dc2626':'#94a3b8'};font-weight:${over?700:400}">${over?'🚨':'⏰'} ${a.fin}${over?' Retard':''}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
    </div>`;
  };

  // ── TABLE ROW ────────────────────────────────────────────────────────────
  const tableRow = a => {
    const over = isOverdue(a.fin, a.statut);
    return `<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
      <td>
        <div style="font-weight:700;font-size:11px;color:#0f172a;margin-bottom:2px">${a.action}</div>
        <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
      </td>
      <td>${typePill(a.type)}</td>
      <td><span style="font-weight:700;color:var(--blue);font-size:10px;background:#eff6ff;padding:2px 7px;border-radius:5px">${a.ref}</span></td>
      <td style="font-size:10.5px">${a.resp}</td>
      <td style="font-size:10px;color:#94a3b8">${a.debut||'—'}</td>
      <td style="font-size:10px;font-weight:${over?700:400};color:${over?'#dc2626':'#94a3b8'}">${a.fin}${over?' 🚨':''}</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div style="flex:1;height:5px;background:#f1f5f9;border-radius:5px;min-width:55px;overflow:hidden">
            <div style="height:100%;width:${a.prog}%;background:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};border-radius:5px;transition:.3s"></div>
          </div>
          <span style="font-size:10px;font-weight:700;color:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};min-width:28px">${a.prog}%</span>
        </div>
      </td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':(a.statut==='En retard'||over)?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td>
        <div style="display:flex;gap:3px">
          <button onclick="openEditAction(${a.id})" class="btn bsm">✏</button>
          <select onchange="changeStatut('RC_ACTIONS',${a.id},this.value,'rc-actions')" class="sel" style="font-size:10px;padding:3px 5px;max-width:105px">
            ${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}
          </select>
        </div>
      </td>
    </tr>`;
  };

  // ── TIMELINE ITEM ────────────────────────────────────────────────────────
  const timelineItem = a => {
    const over = isOverdue(a.fin, a.statut);
    const dot = a.statut==='Clôturée'?'#16a34a':a.statut==='En cours'?'#2563eb':over?'#dc2626':'#94a3b8';
    return `<div style="display:flex;gap:14px;position:relative">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:14px">
        <div style="width:14px;height:14px;border-radius:50%;background:${dot};border:2px solid #fff;box-shadow:0 0 0 2px ${dot}40;flex-shrink:0;margin-top:4px;z-index:1"></div>
        <div style="width:2px;background:#e2e8f0;flex:1;min-height:16px;margin:4px 0"></div>
      </div>
      <div style="flex:1;background:#fff;border:1px solid ${over?'#fca5a5':'#e2e8f0'};border-radius:9px;padding:11px 13px;margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:6px">
          <div style="flex:1">
            <div style="font-size:11.5px;font-weight:700;color:#0f172a;margin-bottom:2px">${a.action}</div>
            <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0">${typePill(a.type)} ${prioBadge(a.prio)}</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;font-size:9.5px;color:#94a3b8;margin-bottom:8px">
          <span>🔗 <strong>${a.ref}</strong></span>
          <span>👤 ${a.resp}</span>
          <span style="color:${over?'#dc2626':'inherit'};font-weight:${over?700:400}">${over?'🚨':'⏰'} ${a.fin}</span>
          <span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':over?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span>
        </div>
        ${progBar(a.prog, a.id)}
      </div>
    </div>`;
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return `<div class="xm-actions-page">
  <!-- KPI STRIP -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr) 1.3fr;gap:10px;margin-bottom:13px">
    ${[
      ['📋','Total',total,'#1e40af','#eff6ff'],
      ['⏳','À faire',aFaire,'#64748b','#f8fafc'],
      ['⚡','En cours',enCours,'#c2410c','#fff7ed'],
      ['🚨','En retard',retard,'#dc2626','#fef2f2'],
      ['✅','Clôturées',done,'#16a34a','#f0fdf4'],
    ].map(([ic,l,v,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:9.5px;color:${c};opacity:.7;margin-top:1px">${l}</div></div>
    </div>`).join('')}
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:12px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="${pctDone>=80?'#16a34a':pctDone>=50?'#f59e0b':'#3b82f6'}" stroke-width="8"
          stroke-dasharray="${2*Math.PI*20*pctDone/100} ${2*Math.PI*20}"
          stroke-dashoffset="${2*Math.PI*20*0.25}" stroke-linecap="round"/>
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctDone}%</text>
      </svg>
      <div>
        <div style="font-size:12px;font-weight:700;color:#0f172a">Taux clôture</div>
        <div style="font-size:10px;color:#94a3b8;margin-top:2px">${done}/${total} actions</div>
        <div style="font-size:10px;color:#94a3b8">Moy. progression : ${avgProg}%</div>
      </div>
    </div>
  </div>

  <!-- TOOLBAR -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#2563eb':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:180px;transition:.15s">
        <span style="color:#94a3b8;font-size:13px">🔍</span>
        <input placeholder="Rechercher action, RC, client, responsable…" value="${fQ}"
          oninput="window.rcActFQ=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.rcActFQ='';document.getElementById('content').innerHTML=PAGES['rc-actions']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0;line-height:1">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.rcActFRef=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">🔗 RC : Toutes</option>${refs.map(r=>`<option${r===fRef?' selected':''}>${r}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFResp=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">👤 Responsable</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFType=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">🏷 Type</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">⚡ Priorité</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}
      </select>
      ${(fQ||fResp!=='Tous'||fType!=='Tous'||fPrio!=='Tous'||fRef!=='Tous')?
        `<button onclick="window.rcActFResp='Tous';window.rcActFType='Tous';window.rcActFPrio='Tous';window.rcActFRef='Tous';window.rcActFQ='';document.getElementById('content').innerHTML=PAGES['rc-actions']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8;white-space:nowrap">${data.length}/${total} action${total>1?'s':''}</span>
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-left:auto">
        ${[['kanban','⬛ Kanban'],['liste','≡ Liste'],['timeline','📅 Timeline']].map(([v,lb])=>`
        <button onclick="window.rcActView='${v}';document.getElementById('content').innerHTML=PAGES['rc-actions']()"
          style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view===v?'#1e40af':'transparent'};color:${view===v?'#fff':'#94a3b8'};transition:.15s">${lb}</button>`).join('')}
      </div>
      <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
        style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(37,99,235,.3);white-space:nowrap">
        + Ajouter action
      </button>
    </div>
  </div>

  ${data.length===0?`
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:48px;text-align:center">
      <div style="font-size:36px;margin-bottom:10px">🔍</div>
      <div style="font-size:14px;font-weight:600;color:#0f172a;margin-bottom:4px">Aucune action trouvée</div>
      <div style="font-size:11px;color:#94a3b8">Modifiez vos filtres ou <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')" style="background:none;border:none;color:#2563eb;cursor:pointer;font-size:11px;font-family:'Inter',sans-serif;font-weight:600">ajoutez une action</button></div>
    </div>`

  : view==='kanban'?`
  <!-- ══ KANBAN VIEW ══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
    ${ACT_STATUTS.map(statut=>{
      // FIX: simple, clean filter per column — no duplicate logic
      const col = data.filter(a => {
        if(statut==='En retard') return a.statut==='En retard' || (isOverdue(a.fin,a.statut) && a.statut!=='Clôturée');
        if(statut==='À faire')  return a.statut==='À faire' && !isOverdue(a.fin,a.statut);
        if(statut==='En cours') return a.statut==='En cours' && !isOverdue(a.fin,a.statut);
        return a.statut===statut;
      });
      return `<div style="background:${ACT_COL_BG[statut]};border-radius:12px;padding:11px;min-height:220px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:11px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:8px;height:8px;border-radius:50%;background:${ACT_COL_COLOR[statut]}"></div>
            <span style="font-size:11px;font-weight:700;color:#0f172a">${statut}</span>
          </div>
          <span style="background:#fff;border:1px solid ${ACT_COL_COLOR[statut]}50;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:800;color:${ACT_COL_COLOR[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
        <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
          style="width:100%;padding:7px;border:1.5px dashed #cbd5e1;border-radius:8px;background:transparent;color:#94a3b8;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif;margin-top:2px"
          onmouseover="this.style.borderColor='#2563eb';this.style.color='#2563eb'"
          onmouseout="this.style.borderColor='#cbd5e1';this.style.color='#94a3b8'">+ Ajouter</button>
      </div>`;
    }).join('')}
  </div>`

  : view==='liste'?`
  <!-- ══ TABLE VIEW ══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
        <thead>
          <tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['Action & Description','Type','Réf. RC','Responsable','Début','Échéance','Progression','Statut',''].map(h=>`
            <th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>${data.map(a=>tableRow(a)).join('')}</tbody>
      </table>
    </div>
  </div>`

  :`
  <!-- ══ TIMELINE VIEW ══ -->
  <div style="display:grid;grid-template-columns:1fr 300px;gap:14px">
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px">
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:14px">📅 Chronologie des actions — triées par échéance</div>
      <!-- FIX: sort on a copy [...data] to avoid mutating the filtered array -->
      ${[...data].sort((a,b)=>{
        const toDate = s => { const p=s.split('/'); const y=p[2]?('20'+p[2]):2026; return new Date(y+'-'+(p[1]||'01')+'-'+(p[0]||'01')); };
        return toDate(a.fin)-toDate(b.fin);
      }).map(a=>timelineItem(a)).join('')}
      <div style="display:flex;align-items:center;gap:10px;margin-top:4px;padding-left:2px">
        <div style="width:14px;height:14px;border-radius:50%;background:#e2e8f0;flex-shrink:0"></div>
        <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
          style="font-size:10px;color:#64748b;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:7px;padding:6px 14px;cursor:pointer;font-family:'Inter',sans-serif">
          + Ajouter une action
        </button>
      </div>
    </div>
    <!-- Statistiques -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">📊 Par type d'action</div>
        ${['Immédiate','Corrective','Préventive'].map(t=>{
          const c=all.filter(a=>a.type===t).length;
          const colors={Immédiate:'#dc2626',Corrective:'#f59e0b',Préventive:'#16a34a',Contention:'#dc2626',Correction:'#f59e0b',Prévention:'#16a34a'};
          return `<div style="margin-bottom:9px">
            <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
              <span style="font-weight:600;color:#0f172a">${t}</span>
              <span style="font-weight:700;color:${colors[t]}">${c}</span>
            </div>
            <div style="height:5px;background:#f1f5f9;border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${Math.round(c/Math.max(total,1)*100)}%;background:${colors[t]};border-radius:5px"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">👥 Charge par responsable</div>
        ${resps.map(r=>{
          const cnt=all.filter(a=>a.resp===r).length;
          const cntDone=all.filter(a=>a.resp===r&&a.statut==='Clôturée').length;
          return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
            <div style="width:24px;height:24px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:#1e40af;flex-shrink:0">${r.charAt(0)}</div>
            <div style="flex:1">
              <div style="font-size:10px;font-weight:600;color:#0f172a">${r}</div>
              <div style="font-size:9px;color:#94a3b8">${cnt} action${cnt>1?'s':''} · ${cntDone} clôturée${cntDone>1?'s':''}</div>
            </div>
            <span style="font-size:10px;font-weight:700;color:#1e40af">${Math.round(cntDone/Math.max(cnt,1)*100)}%</span>
          </div>`;
        }).join('')}
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">🔗 Par réclamation RC</div>
        ${refs.map(r=>{
          const cnt=all.filter(a=>a.ref===r).length;
          const cDone=all.filter(a=>a.ref===r&&a.statut==='Clôturée').length;
          const refData=RC_DATA.find(d=>d.n===r);
          return `<div style="padding:8px 10px;background:#f8fafc;border-radius:8px;margin-bottom:6px;border-left:3px solid #3b82f6">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px">
              <span style="font-size:10.5px;font-weight:700;color:#1e40af">${r}</span>
              <span style="font-size:9.5px;color:#94a3b8">${cDone}/${cnt}</span>
            </div>
            ${refData?`<div style="font-size:9px;color:#64748b;margin-bottom:4px">${refData.cl} · ${refData.g}</div>`:''}
            <div style="height:4px;background:#e2e8f0;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${Math.round(cDone/Math.max(cnt,1)*100)}%;background:#3b82f6;border-radius:3px"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`}</div>`;
},
'rc-kpi': () => {
  // Period selector state
  if(!window.rcKpiPer) window.rcKpiPer = 'trimestre';
  const per = window.rcKpiPer;
  const months = [['Jan',2],['Fév',3],['Mar',1],['Avr',4],['Mai',7],['Jun',0]];
  const maxVal = 10;
  const data8D = [['D1 Équipe','100%','bg3'],['D2 Problème','100%','bg3'],['D3 Confinement','100%','bg3'],['D4 Causes','85%','by'],['D5 Actions','60%','by'],['D6 Vérification','20%','br'],['D7 Préventif','0%','br'],['D8 Félicitations','0%','br']];
  const defauts = [['Erreur dimensionnelle',8,'#dc2626',80],['Défaut assemblage',5,'#ea580c',50],['Retard livraison',4,'#f59e0b',40],['Documentation NC',3,'#6366f1',30],['Mauvaise finition',2,'#06b6d4',20]];
  return `
  <!-- ═══════ HEADER DASHBOARD ═══════ -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:var(--navy)">📊 Tableau de bord KPI — Réclamations Clients</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">ISO 9001 · Section 9.1.3 · Dernière mise à jour : 17/05/2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden">
        ${['mensuel','trimestre','annuel'].map(p=>`<button onclick="window.rcKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['rc-kpi']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${p}'===per?'var(--blue)':'transparent'};color:${'${p}'===per?'#fff':'var(--muted)'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm" onclick="">📥 Exporter PDF</button>
    </div>
  </div>

  <!-- ═══════ ALERTE ═══════ -->
  <div id="rc-alert" style="display:flex;align-items:center;gap:10px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:9px;padding:10px 14px;margin-bottom:13px">
    <span style="font-size:20px">🚨</span>
    <div style="flex:1">
      <span style="font-size:11px;font-weight:700;color:#991b1b">OBJECTIF DÉPASSÉ — T2 2026 · </span>
      <span style="font-size:11px;color:#b91c1c">9 RC enregistrées au total · Objectif ≤ 2 RC/semestre · Dépassement : <strong>+7</strong></span>
    </div>
    <button onclick="document.getElementById('rc-alert').style.display='none'" style="background:none;border:none;color:#dc2626;cursor:pointer;font-size:15px;line-height:1">✕</button>
  </div>

  <!-- ═══════ KPI CARDS ROW ═══════ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[
      ['Total RC','9','var(--blue)','📋','vs 5 (T1 2025)','↑'],
      ['Ouvertes','6','var(--orange)','🔓','En attente action','⚠'],
      ['Critiques','3','var(--red)','🚨','Traitement urgent','!'],
      ['Clôturées','3','var(--green)','✅','Taux : 33%','→'],
      ['Délai moyen','8,6 j','var(--navy)','⏱','Objectif ≤ 5j','↑'],
      ['Taux clôture','33%','#b91c1c','📊','Objectif ≥ 80%','↓'],
      ['RC répétitives','39%','#c2410c','🔁','Objectif ≤ 15%','↑'],
      ['Satisfaction','87%','var(--green)','⭐','Objectif ≥ 90%','→'],
    ].map(([l,v,c,ic,sub,arrow])=>`
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

  <!-- ═══════ ROW 2 : CHARTS PRINCIPAUX ═══════ -->
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">

    <!-- Évolution mensuelle bar chart -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des RC — 2026</span>
        <span style="font-size:9px;color:var(--muted)">Objectif ≤ 1 RC/mois · Ligne bleue</span>
      </div>
      <div style="position:relative;padding:6px 0 22px">
        <!-- Grid lines -->
        <div style="position:absolute;left:0;right:0;top:6px;bottom:22px">
          ${[0,25,50,75].map(pct=>`<div style="position:absolute;left:0;right:0;bottom:${pct}%;border-top:1px dashed #e5e7eb"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${1/10*100}%;border-top:2px dashed #2563eb;opacity:.7"></div>
          <div style="position:absolute;right:4px;bottom:calc(${1/10*100}% + 3px);font-size:8px;color:#2563eb;font-weight:700">Obj. 1</div>
        </div>
        <!-- Bars -->
        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 4px;position:relative;z-index:1">
          ${months.map(([m,v])=>{
            const h=v>0?(v/maxVal*88):2; const c=v>1?'#dc2626':v>0?'#16a34a':'#e5e7eb';
            const cLight=v>1?'#fef2f2':v>0?'#f0fdf4':'#f9fafb';
            return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
              <div style="font-size:10px;font-weight:700;color:${c}">${v||'—'}</div>
              <div style="width:100%;height:${h}px;background:${c};border-radius:4px 4px 0 0;position:relative;min-height:2px;background:linear-gradient(180deg,${c}dd,${c});box-shadow:0 2px 4px ${c}33"></div>
              <div style="font-size:9px;color:var(--muted);font-weight:500">${m}</div>
            </div>`;
          }).join('')}
          <!-- Jun forecast -->
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="font-size:9px;color:var(--muted)">?</div>
            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px 4px 0 0;border:1.5px dashed #9ca3af;box-sizing:border-box"></div>
            <div style="font-size:9px;color:var(--muted);font-weight:500">Jun</div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:4px;font-size:9.5px">
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#16a34a;border-radius:2px"></div>Conforme ≤1</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#dc2626;border-radius:2px"></div>Dépassé &gt;1</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:18px;height:0;border-top:2px dashed #2563eb"></div>Objectif</div>
      </div>
    </div>

    <!-- Donuts breakdown -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">🥧 Répartition des RC</div>
      <div style="display:flex;gap:12px;justify-content:center;align-items:center">
        <!-- Donut Statut -->
        <div style="text-align:center">
          <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;margin:0 auto">
            <circle cx="44" cy="44" r="32" fill="none" stroke="#e5e7eb" stroke-width="11"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#ea580c" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*0.25}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#f59e0b" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.34} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.08}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#16a34a" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.42}" stroke-linecap="butt"/>
            <text x="44" y="40" text-anchor="middle" font-size="10" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Statut</text>
            <text x="44" y="53" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Inter,sans-serif">9 RC</text>
          </svg>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;text-align:left">
            ${[['Ouvertes','33%','#ea580c'],['En cours','34%','#f59e0b'],['Clôturées','33%','#16a34a']].map(([l,v,c])=>`
            <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:9px;color:var(--muted)">${l}</span><span style="font-size:9px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
        <div style="width:1px;height:90px;background:var(--border)"></div>
        <!-- Donut Gravité -->
        <div style="text-align:center">
          <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;margin:0 auto">
            <circle cx="44" cy="44" r="32" fill="none" stroke="#e5e7eb" stroke-width="11"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#dc2626" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*0.25}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#f97316" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.34} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.08}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#22c55e" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.42}" stroke-linecap="butt"/>
            <text x="44" y="40" text-anchor="middle" font-size="10" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Gravité</text>
            <text x="44" y="53" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Inter,sans-serif">9 RC</text>
          </svg>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;text-align:left">
            ${[['Critique','33%','#dc2626'],['Majeure','34%','#f97316'],['Mineure','33%','#22c55e']].map(([l,v,c])=>`
            <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:9px;color:var(--muted)">${l}</span><span style="font-size:9px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════ ROW 3 : OBJECTIFS TRIMESTRIELS + TOP DÉFAUTS ═══════ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:13px">

    <!-- Objectifs trimestriels -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">🎯 Objectifs trimestriels 2026</span>
        <span style="font-size:9px;color:var(--muted)">ISO 9001 · Seuil ≤ 1 RC/trimestre</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[['T1 2026','Jan–Mar','2','#ea580c','Dépassé','bo',40],['T2 2026','Avr–Jun','7','#dc2626','Dépassé','br',100],['T3 2026','Jul–Sep','—','#9ca3af','À venir','bgr',0],['T4 2026','Oct–Déc','—','#9ca3af','À venir','bgr',0]].map(([trim,period,val,c,statut,sc,pct])=>`
        <div style="border:1px solid var(--border);border-radius:9px;padding:11px;border-top:3px solid ${c}">
          <div style="font-size:10px;font-weight:700;color:var(--navy)">${trim}</div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:8px">${period}</div>
          <div style="font-size:24px;font-weight:700;color:${c};font-family:monospace;line-height:1;margin-bottom:4px">${val}</div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:6px">RC enregistrées</div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-bottom:5px;position:relative">
            <div style="height:100%;width:${Math.min(pct,100)}%;background:${c};border-radius:3px"></div>
            <div style="position:absolute;left:${1/7*100}%;top:0;bottom:0;width:1.5px;background:#1e40af"></div>
          </div>
          <span class="badge ${sc}" style="font-size:8.5px">${statut}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Top défauts Pareto -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">📉 Analyse Pareto — Top défauts</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${defauts.map(([type,occ,c,pct])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <div style="font-size:10.5px;color:var(--navy);flex:1;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${type}</div>
          <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;width:140px">
            <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:${c};border-radius:3px"></div>
            </div>
            <span style="font-size:10px;font-weight:700;color:${c};font-family:monospace;width:14px;text-align:right">${occ}</span>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:9.5px;color:var(--muted)">Pareto 80/20 : Top 2 défauts = <strong>59%</strong> des cas</span>
        <button class="btn bsm" onclick="goPage('rc-actions')">Actions →</button>
      </div>
    </div>
  </div>

  <!-- ═══════ ROW 4 : AVANCEMENT 8D + CLIENTS ═══════ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">

    <!-- 8D Completion radar -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">⚙ Avancement processus 8D — RC-001</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${data8D.map(([step,pct,sc])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:10px;color:var(--navy);font-weight:500;width:100px;flex-shrink:0">${step}</span>
          <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${pct};background:${sc==='bg3'?'#16a34a':sc==='by'?'#f59e0b':'#e5e7eb'};border-radius:4px;transition:.3s"></div>
          </div>
          <span style="font-size:10px;font-family:monospace;font-weight:600;width:32px;text-align:right;color:${sc==='bg3'?'var(--green)':sc==='by'?'var(--orange)':'var(--muted)'}">${pct}</span>
        </div>`).join('')}
      </div>
      <div style="margin-top:10px;padding:8px;background:#f0fdf4;border-radius:7px;border:1px solid #bbf7d0;font-size:10px;color:var(--green);font-weight:600;text-align:center">
        🟢 D1–D3 complétés · D4–D5 en cours · D6–D8 à planifier
      </div>
    </div>

    <!-- Top clients -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">👥 RC par client — Classement</div>
      <table class="tbl">
        <thead><tr><th>Client</th><th style="text-align:center">RC</th><th style="text-align:center">Critique</th><th>Délai moy.</th><th>Statut</th></tr></thead>
        <tbody>
          ${[['Client A',4,2,'7,2 j','br','Critique'],['Client B',3,1,'9,4 j','bo','Élevé'],['Client C',1,0,'3,1 j','bg3','OK'],['Client D',1,0,'5,8 j','by','Moyen']].map(([cl,rc,crit,delai,sc,statut])=>`
          <tr>
            <td style="font-weight:600">${cl}</td>
            <td style="text-align:center">
              <div style="display:flex;align-items:center;justify-content:center;gap:4px">
                <div style="width:${rc/4*36}px;height:5px;background:${sc==='br'?'#dc2626':sc==='bo'?'#ea580c':'#16a34a'};border-radius:2px"></div>
                <span style="font-weight:700;font-size:11px">${rc}</span>
              </div>
            </td>
            <td style="text-align:center;font-weight:700;color:${crit>0?'var(--red)':'var(--green)'}">${crit}</td>
            <td style="font-family:monospace;font-size:10.5px">${delai}</td>
            <td><span class="badge ${sc}" style="font-size:9px">${statut}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <button class="btn" style="width:100%;margin-top:10px;font-size:11px" onclick="goPage('rc-liste')">📋 Voir toutes les RC →</button>
    </div>
  </div>`;
},

'rc-cloture': () => { goPage('rc-kpi'); return ''; },
};
