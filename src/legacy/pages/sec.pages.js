/** @legacy — sec.pages.js (lazy) */
export default {
/* ══════════════════════════════════════
   🛡 MODULE SÉCURITÉ SST
══════════════════════════════════════ */
'sec-tb': () => `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['🚨','3','Accidents de travail','#fef2f2','var(--red)'],['⚠','7','Incidents / Presque-acc.','#fff7ed','var(--orange)'],['🟢','12','Jours sans accident','#f0fdf4','var(--green)'],['📋','18/26','Checklists réalisées','#eff6ff','var(--blue)'],['🔴','2','Risques critiques','#fef2f2','var(--red)'],['⏰','4','Actions en retard','#fff7ed','var(--orange)'],['🎯','87%','Taux conformité SST','#f5f3ff','#7c3aed'],['🚒','3/5',"Exercices d'urgence",'#f0fdf4','var(--green)']].map(([ic,v,l,bg,c])=>`
  <div style="background:${bg};border:1px solid ${c.includes('red')?'#fecaca':c.includes('orange')?'#fed7aa':c.includes('green')?'#bbf7d0':c.includes('blue')?'#bfdbfe':c.includes('7c3')?'#ddd6fe':'#bfdbfe'};border-radius:10px;padding:12px;position:relative;overflow:hidden">
    <div style="font-size:15px;margin-bottom:5px">${ic}</div>
    <div style="font-size:20px;font-weight:700;color:${c};margin-bottom:2px">${v}</div>
    <div style="font-size:9.5px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📈 Évolution des accidents — Jan à Mai 2026</span></div>
      <svg width="100%" height="100" viewBox="0 0 500 100">
        <defs><linearGradient id="gac" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb" stop-opacity=".15"/><stop offset="100%" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>
        ${[0,25,50,75].map(y=>`<line x1="40" y1="${8+y*.85}" x2="490" y2="${8+y*.85}" stroke="#dde4ef" stroke-width="1"/>`).join('')}
        ${[4,3,2,1,0].map((v,i)=>`<text x="35" y="${11+i*21}" text-anchor="end" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${v}</text>`).join('')}
        ${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map((m,i)=>`<text x="${48+i*38}" y="97" text-anchor="middle" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${m}</text>`).join('')}
        <path d="M48,75 L86,63 L124,41 L162,58 L200,50 L238,80 L276,70 L314,50 L352,60 L390,65 L428,57 L466,50 L466,92 L48,92Z" fill="url(#gac)"/>
        <polyline points="48,75 86,63 124,41 162,58 200,50 238,80 276,70 314,50 352,60 390,65 428,57 466,50" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
        ${[[48,75],[86,63],[124,41],[162,58],[200,50],[238,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#2563eb" stroke="white" stroke-width="1.5"/>`).join('')}
        <polyline points="48,83 86,75 124,67 162,75 200,67 238,92" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,2"/>
      </svg>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:6px">
        <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#2563eb"></div>Accidents totaux</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#dc2626;border-top:2px dashed #dc2626"></div>Avec arrêt</div>
      </div>
    </div>
    <div class="g2">
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:9px">📋 Checklists du mois</div>
        ${[['🔥','Extincteurs','Conforme','var(--green)'],['🏥','Pharmacie','Observation','var(--orange)'],['🚗','Véhicule','En révision','var(--yellow)'],['🦺','EPI','Conforme','var(--green)'],['🚨','Évacuation','Conforme','var(--green)'],['⚙','Machine CN','Conforme','var(--green)']].map(([ic,n,s,c])=>`
        <div class="drow" onclick="goPage('sec-checklists')" style="cursor:pointer">
          <div style="display:flex;align-items:center;gap:6px"><span>${ic}</span><span style="font-weight:500;font-size:11px">${n}</span></div>
          <span style="font-size:9px;font-weight:700;color:${c};background:${c.includes('green')?'#f0fdf4':c.includes('orange')?'#fff7ed':'#fffbeb'};border-radius:4px;padding:2px 7px">${s}</span>
        </div>`).join('')}
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:9px">⚠️ Risques à traiter</div>
        ${[['R-001','Pièce tournante','Atelier usinage','Critique','#fef2f2','var(--red)'],['R-003','Chute matériel','Magasin','Élevé','#fff7ed','var(--orange)'],['R-004','Électrocution','Maintenance','Élevé','#fff7ed','var(--orange)'],['R-007','Produits chimiques','Lab.','Moyen','#fffbeb','var(--yellow)']].map(([ref,r,z,niv,bg,c])=>`
        <div class="drow" onclick="goPage('sec-risques')" style="cursor:pointer">
          <div><div style="font-size:9.5px;font-weight:700;color:var(--blue);font-family:monospace">${ref}</div><div style="font-size:11px;font-weight:500">${r}</div><div style="font-size:9px;color:var(--muted)">${z}</div></div>
          <span style="font-size:9px;font-weight:700;color:${c};background:${bg};border-radius:4px;padding:2px 7px">${niv}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:10px">📊 Répartition accidents par type</div>
      <div style="display:flex;justify-content:center;margin-bottom:10px">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="44" fill="none" stroke="#dc2626" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.40} ${2*Math.PI*44}" stroke-dashoffset="0"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#ea580c" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.25} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.40}"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#2563eb" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.20} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.65}"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#16a34a" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.15} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.85}"/>
          <text x="60" y="57" text-anchor="middle" font-size="10" font-weight="700" fill="#0f2044" font-family="Inter,sans-serif">TF</text>
          <text x="60" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2044" font-family="monospace">2.45</text>
        </svg>
      </div>
      ${[['Coupure','40%','#dc2626'],['Chute','25%','#ea580c'],['Brûlure','20%','#2563eb'],['Autres','15%','#16a34a']].map(([l,v,c])=>`
      <div style="display:flex;align-items:center;gap:7px;padding:3px 0;font-size:10.5px">
        <div style="width:9px;height:9px;border-radius:50%;background:${c};flex-shrink:0"></div>
        <span style="flex:1">${l}</span><span style="font-weight:700;font-family:monospace">${v}</span>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📊 Statut des actions sécurité</div>
      ${[['À faire','5','#6b7a99','20'],['En cours','8','#2563eb','32'],['En retard','4','#dc2626','16'],['Clôturées','8','#16a34a','32']].map(([l,v,c,p])=>`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
        <span style="font-size:10px;width:58px;flex-shrink:0;color:var(--muted)">${l}</span>
        <div style="flex:1;height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${p}%;background:${c};border-radius:3px"></div></div>
        <span style="font-size:10px;font-weight:700;color:${c};width:14px;text-align:right;font-family:monospace">${v}</span>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">⚡ Actions urgentes</div>
      ${[["Installer protection machine CN",'Ali M.','20/05','var(--red)'],["Formation SST opérateurs",'RH','25/05','var(--orange)'],["Remplacement EPI usagés (gants)",'HSE','18/05','var(--red)'],["Exercice évacuation Bât. B",'HSE','30/05','var(--blue)']].map(([a,r,d,c])=>`
      <div style="padding:6px 0;border-bottom:1px solid var(--border)">
        <div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div>
        <div style="display:flex;justify-content:space-between"><span style="font-size:10px;color:var(--muted)">👤 ${r}</span><span style="font-size:10px;font-weight:600;color:${c}">⏰ ${d}</span></div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

'sec-risques': () => {
  // Init data on first load
  if(!window.sst_risks){
    window.sst_risks=[
      {id:'R-001',zone:'Atelier usinage',unite:'Machine CN',processus:'Utilisation machine CN',danger:'Pièce tournante',risque:'Coupure',dommage:'Blessure grave — amputation',personnes:'Opérateurs CN (Atelier)',situation:'Normal',g:4,f:3,d:2,action:'Installer protection supplémentaire sur la machine (écran de protection renforcé)',respAction:'Ali M.',delai:'2025-06-15',resp:'Ali M.',statut:'Traitement',rr_g:3,rr_f:2,rr_d:2},
      {id:'R-002',zone:'Assemblage',unite:'Poste manu.',processus:'Assemblage manuel',danger:'Outils coupants',risque:'Blessure main',dommage:'Coupure superficielle',personnes:'Opérateurs assemblage',situation:'Normal',g:3,f:2,d:2,action:'Formation gestes et postures + gants anti-coupure',respAction:'Karim S.',delai:'2025-05-20',resp:'Karim S.',statut:'Clôturé',rr_g:1,rr_f:1,rr_d:1},
      {id:'R-003',zone:'Magasin',unite:'Rayonnage',processus:'Stockage et manutention',danger:'Chute matériel',risque:'Contusion',dommage:'Blessure tête / membre',personnes:'Magasiniers',situation:'Normal',g:3,f:3,d:3,action:'Sécuriser les rayonnages et limiter la hauteur de stockage',respAction:'Youssef A.',delai:'2025-06-01',resp:'Youssef A.',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2},
      {id:'R-004',zone:'Maintenance',unite:'Électricité',processus:'Intervention HT',danger:'Intervention HT',risque:'Électrocution',dommage:'Électrisation / Décès',personnes:'Techniciens maintenance',situation:'Anormal',g:5,f:2,d:2,action:'Procédure consignation / déconsignation obligatoire + habilitation',respAction:'HSE',delai:'2025-06-15',resp:'HSE',statut:'Traitement',rr_g:3,rr_f:1,rr_d:2},
      {id:'R-005',zone:'Bureau',unite:'Bureau',processus:'Travail écran',danger:'Travail assis',risque:'TMS / Fatigue',dommage:'Douleurs musculo-squelettiques',personnes:'Personnel bureau',situation:'Normal',g:2,f:4,d:2,action:'Ergonomie poste de travail + pauses régulières',respAction:'RH',delai:'2025-07-01',resp:'RH',statut:'Ouvert',rr_g:1,rr_f:2,rr_d:1},
      {id:'R-006',zone:'Atelier usinage',unite:'Produits',processus:'Utilisation solvants',danger:'Solvants chimiques',risque:'Intoxication',dommage:'Atteinte voies respiratoires',personnes:'Opérateurs CN (Atelier)',situation:'Normal',g:4,f:2,d:3,action:'EPI respiratoire obligatoire + ventilation renforcée',respAction:'HSE',delai:'2025-06-01',resp:'HSE',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2},
      {id:'R-007',zone:'Bâtiment B',unite:'Toiture',processus:'Travaux en hauteur',danger:'Travail en hauteur',risque:'Chute de hauteur',dommage:'Fracture grave / Décès',personnes:'Techniciens maintenance',situation:'Anormal',g:5,f:3,d:2,action:'EPC obligatoire (garde-corps) + formation travail en hauteur',respAction:'Mehdi R.',delai:'2025-06-30',resp:'Mehdi R.',statut:'Ouvert',rr_g:3,rr_f:2,rr_d:2},
    ];
    window.sst_selectedId=null;
    window.sst_step=1;
  }

  // Helper functions
  const getCrit=r=>r.g*r.f*r.d;
  const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
  const getNivC=niv=>{
    if(niv==='Critique') return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};
    if(niv==='Élevé')    return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};
    if(niv==='Moyen')    return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};
    return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};
  };
  const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';

  // Build rows
  const buildRows=()=>window.sst_risks.map(r=>{
    const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut);
    const sel=r.id===window.sst_selectedId;
    return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')">
      <td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td>
      <td style="font-size:10px">${r.zone}</td>
      <td style="font-size:10px;color:var(--muted)">${r.unite}</td>
      <td style="font-weight:600">${r.danger}</td>
      <td style="color:var(--muted)">${r.risque}</td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td>
      <td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td>
      <td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td>
      <td style="font-size:10px">${r.resp}</td>
      <td><span class="badge ${sc}">${r.statut}</span></td>
      <td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td>
    </tr>`;
  }).join('');

  // Build heatmap
  const cellCounts={};
  window.sst_risks.forEach(r=>{const k=r.g+'-'+r.f;cellCounts[k]=(cellCounts[k]||0)+1;});
  const heatmap=[5,4,3,2,1].flatMap(f=>[1,2,3,4,5].map(g=>{
    const c=g*f;
    const bg=c>60?'#dc2626':c>30?'#f97316':c>10?'#f59e0b':'#10b981';
    const op=c>60?1:c>30?.8:c>10?.55:.4;
    const cnt=cellCounts[g+'-'+f]||0;
    const sel=window.sst_selectedId&&window.sst_risks.find(r=>r.id===window.sst_selectedId)?.g===g&&window.sst_risks.find(r=>r.id===window.sst_selectedId)?.f===f;
    return`<div onclick="sstFilterCell(${g},${f})" style="background:${bg};opacity:${op};border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700;font-family:monospace;cursor:pointer;position:relative;transition:all .15s;${sel?'outline:2.5px solid var(--navy);opacity:1;':''}${cnt?'box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.5)':''}" title="G=${g}×F=${f}=${c}${cnt?' — '+cnt+' risque(s)':''}">
      ${cnt?`<div style="position:absolute;top:-4px;right:-4px;background:#0f2044;color:#fff;border-radius:50%;width:14px;height:14px;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff">${cnt}</div>`:''}
      ${c}
    </div>`;
  })).join('');

  // Stats
  const stats={Critique:0,Élevé:0,Moyen:0,Faible:0};
  window.sst_risks.forEach(r=>stats[getNiv(getCrit(r))]++);
  const scColors={Critique:'#dc2626',Élevé:'#f97316',Moyen:'#f59e0b',Faible:'#10b981'};
  const statsHtml=Object.entries(stats).map(([n,v])=>`<div style="background:${scColors[n]}15;border:1px solid ${scColors[n]}30;border-radius:6px;padding:5px 7px;text-align:center"><div style="font-size:16px;font-weight:800;color:${scColors[n]};font-family:monospace">${v}</div><div style="font-size:8.5px;color:${scColors[n]};font-weight:600">${n}</div></div>`).join('');

  // Right panel content
  const buildRightPanel=()=>{
    if(!window.sst_selectedId) return`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px"><div style="font-size:38px;margin-bottom:8px">📋</div><div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Sélectionner un risque</div><div style="font-size:11px">Cliquez sur une ligne du tableau<br>pour voir et modifier la fiche</div></div>`;
    const r=window.sst_risks.find(x=>x.id===window.sst_selectedId);
    if(!r) return '';
    const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv);
    const rc=r.rr_g*r.rr_f*r.rr_d,rniv=getNiv(rc),rnc=getNivC(rniv);
    const step=window.sst_step;
    const STEPS=['Identification','Évaluation','Actions','Validation','Clôture'];
    const stepsHtml=STEPS.map((lbl,i)=>{
      const n=i+1,done=n<step,active=n===step;
      return(i>0?`<div style="flex:1;height:2px;background:${done?'var(--green)':'#e5e7eb'};margin-top:12px;transition:background .3s"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div onclick="sstGoStep(${n})" style="width:24px;height:24px;border-radius:50%;background:${done?'var(--green)':active?'var(--blue)':'var(--white)'};border:2px solid ${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};color:${done||active?'#fff':'var(--muted)'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;transition:all .3s;${active?'box-shadow:0 0 0 4px rgba(37,99,235,.15)':''}">${done?'✓':n}</div>
          <div style="font-size:8px;color:${active?'var(--blue)':done?'var(--green)':'var(--muted)'};margin-top:3px;white-space:nowrap;font-weight:${active||done?'700':'400'}">${lbl}</div>
        </div>`;
    }).join('');

    // STEP content
    let stepBody='';
    const secTitle=(t)=>`<div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;padding-bottom:5px;border-bottom:1px solid var(--border);margin:13px 0 9px">${t}</div>`;
    const navBtns=`<div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border);margin-top:6px">
      ${step>1?`<button class="btn bsm" onclick="sstGoStep(${step-1})">← Précédent</button>`:'<span></span>'}
      <div style="flex:1"></div>
      ${step<5?`<button class="btn bsm bp" onclick="sstGoStep(${step+1})">${step===4?'✓ Valider la fiche →':step===3?'→ Validation':step===2?'→ Actions correctives':'→ Évaluation initiale'}</button>`:''}
    </div>`;

    if(step===1){
      stepBody=`
        ${secTitle('Identification')}
        ${[['Zone',r.zone],['Unité',r.unite],['Processus',r.processus],['Danger',r.danger],['Risque',r.risque],['Dommage',r.dommage||'—'],['Personnes exposées',r.personnes||'—'],['Situation',r.situation]].map(([k,v])=>`<div class="drow" style="padding:4px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:11px;max-width:58%;text-align:right">${v}</span></div>`).join('')}
        ${secTitle('Modifier')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Zone</label>
            <select class="fi" onchange="sstUpdate('${r.id}','zone',this.value)">${['Atelier usinage','Assemblage','Maintenance','Bureau','Magasin','Bâtiment B'].map(z=>`<option${z===r.zone?' selected':''}>${z}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Statut</label>
            <select class="fi" onchange="sstUpdate('${r.id}','statut',this.value)">${['Ouvert','Traitement','Clôturé'].map(s=>`<option${s===r.statut?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Danger</label><input class="fi" value="${r.danger}" onchange="sstUpdate('${r.id}','danger',this.value)"></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Risque</label><input class="fi" value="${r.risque}" onchange="sstUpdate('${r.id}','risque',this.value)"></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Responsable</label>
            <select class="fi" onchange="sstUpdate('${r.id}','resp',this.value)">${['Ali M.','Karim S.','HSE','Youssef A.','RH','Mehdi R.'].map(s=>`<option${s===r.resp?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Situation</label>
            <select class="fi" onchange="sstUpdate('${r.id}','situation',this.value)">${['Normal','Anormal','Urgence'].map(s=>`<option${s===r.situation?' selected':''}>${s}</option>`).join('')}</select></div>
        </div>
        ${navBtns}`;
    }
    else if(step===2){
      stepBody=`
        ${secTitle('Scores actuels')}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
          ${[['G',r.g,'Gravité','#dc2626','#fef2f2'],['F',r.f,'Fréquence','#ea580c','#fff7ed'],['D',r.d,'Détection','#2563eb','#eff6ff'],['C',c,'Criticité',nc.tc,nc.bg]].map(([l,v,ll,cl,bg])=>`<div style="background:${bg};border-radius:8px;padding:10px;text-align:center"><div style="font-size:22px;font-weight:800;color:${cl};font-family:monospace;line-height:1">${v}</div><div style="font-size:8.5px;color:var(--muted);margin-top:3px">${ll}</div></div>`).join('')}
        </div>
        <div style="background:${nc.bg};border:1px solid ${nc.bc};border-radius:8px;padding:9px;text-align:center;margin-bottom:14px"><span style="font-size:11px;font-weight:700;color:${nc.tc}">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv.toUpperCase()} — ${c>60?'Action immédiate':c>30?'Action nécessaire':'Surveiller'}</span></div>
        ${secTitle('Ajuster les valeurs GFDC')}
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:14px">
          ${[['g','Gravité (G)','#dc2626',r.g],['f','Fréquence (F)','#ea580c',r.f],['d','Détection (D)','#2563eb',r.d]].map(([field,lbl,col,val])=>`
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:10.5px;font-weight:600;color:${col}">${lbl}</span><span id="live_${field}_${r.id}" style="font-family:monospace;font-weight:800;font-size:16px;color:${col}">${val}</span></div>
            <input type="range" min="1" max="5" value="${val}" style="-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%;background:linear-gradient(to right,${col} 0%,${col} ${(val-1)/4*100}%,#e5e7eb ${(val-1)/4*100}%)"
              oninput="sstLive('${r.id}','${field}',+this.value,this,'${col}','live_${field}_${r.id}')">
            <div style="display:flex;justify-content:space-between;font-size:8px;color:var(--muted);margin-top:3px"><span>1 — Min</span><span>3</span><span>5 — Max</span></div>
          </div>`).join('')}
        </div>
        <div id="sst_crit_preview_${r.id}"></div>
        ${navBtns}`;
    }
    else if(step===3){
      stepBody=`
        ${secTitle('Action corrective')}
        <label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:5px">Action à mettre en œuvre <span style="color:var(--red)">*</span></label>
        <textarea class="fi" rows="3" style="margin-bottom:10px" onchange="sstUpdate('${r.id}','action',this.value)">${r.action||''}</textarea>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Responsable action</label>
            <select class="fi" onchange="sstUpdate('${r.id}','respAction',this.value)">${['Ali M.','Karim S.','HSE','Youssef A.','RH','Mehdi R.'].map(s=>`<option${s===r.respAction?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Délai</label><input class="fi" type="date" value="${r.delai||''}" onchange="sstUpdate('${r.id}','delai',this.value)"></div>
        </div>
        ${secTitle('Risque résiduel estimé (après action)')}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:12px">
          ${[['G',r.rr_g,'Grav. rés.','#ea580c','#fff7ed'],['F',r.rr_f,'Fréq. rés.','#d97706','#fffbeb'],['D',r.rr_d,'Dét. rés.','#2563eb','#eff6ff'],['C',rc,'Crit. rés.',rnc.tc,rnc.bg]].map(([l,v,ll,cl,bg])=>`<div style="background:${bg};border-radius:7px;padding:8px;text-align:center"><div style="font-size:18px;font-weight:800;color:${cl};font-family:monospace;line-height:1">${v}</div><div style="font-size:8px;color:var(--muted);margin-top:2px">${ll}</div></div>`).join('')}
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:12px">
          ${[['rr_g','Gravité résiduelle','#ea580c',r.rr_g],['rr_f','Fréquence résiduelle','#d97706',r.rr_f],['rr_d','Détection résiduelle','#2563eb',r.rr_d]].map(([field,lbl,col,val])=>`
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;font-weight:600;color:${col}">${lbl}</span><span id="live_${field}_${r.id}" style="font-family:monospace;font-weight:800;font-size:15px;color:${col}">${val}</span></div>
            <input type="range" min="1" max="5" value="${val}" style="-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%;background:linear-gradient(to right,${col} 0%,${col} ${(val-1)/4*100}%,#e5e7eb ${(val-1)/4*100}%)"
              oninput="sstLive('${r.id}','${field}',+this.value,this,'${col}','live_${field}_${r.id}')">
          </div>`).join('')}
        </div>
        <div id="sst_rr_preview_${r.id}"></div>
        ${navBtns}`;
    }
    else if(step===4){
      stepBody=`
        ${secTitle('Récapitulatif avant validation')}
        <div style="background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:12px;margin-bottom:12px">
          ${[['Risque',r.danger+' — '+r.risque],['Zone',r.zone],['Niveau initial',niv+' ('+c+')'],['Niveau résiduel',rniv+' ('+rc+')'],['Action corrective',r.action||'—'],['Responsable',r.respAction||'—'],['Délai',r.delai||'—']].map(([k,v])=>`<div class="drow" style="padding:4px 0"><span class="dk">${k}</span><span style="font-size:11px;font-weight:600;max-width:60%;text-align:right">${v}</span></div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;margin-bottom:12px">
          <span style="font-size:22px">✅</span>
          <div><div style="font-size:11px;font-weight:700;color:#065f46">Réduction du risque confirmée</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">Score initial : <strong style="color:var(--orange)">${c}</strong> → Score résiduel : <strong style="color:var(--green)">${rc}</strong> — Réduction de <strong style="color:var(--green)">${Math.round((1-rc/c)*100)}%</strong></div></div>
        </div>
        ${secTitle('Validation')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Validé par</label>
            <select class="fi"><option>KORTAS.A — Resp. QHSE</option><option>Direction</option><option>HSE</option></select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Date validation</label>
            <input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Commentaire</label>
            <textarea class="fi" rows="2" placeholder="Observations éventuelles..."></textarea></div>
        </div>
        ${navBtns}`;
    }
    else{
      stepBody=`
        <div style="text-align:center;padding:22px 14px">
          <div style="width:56px;height:56px;border-radius:50%;background:#f0fdf4;border:3px solid var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px">✅</div>
          <div style="font-size:14px;font-weight:800;color:var(--navy);margin-bottom:4px">Fiche validée et clôturée</div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:16px">${r.id} — ${r.danger}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;text-align:left;margin-bottom:14px">
            ${[['Zone',r.zone],['Danger',r.danger],['Risque initial',niv+' ('+c+')'],['Risque résiduel',rniv+' ('+rc+')'],['Action',r.action||'—'],['Responsable',r.respAction||'—']].map(([k,v])=>`<div style="background:#f8fafc;border:1px solid var(--border);border-radius:6px;padding:7px"><div style="font-size:8.5px;font-weight:700;color:var(--muted);margin-bottom:2px;text-transform:uppercase">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
          </div>
          <div style="display:flex;gap:7px;justify-content:center">
            <button class="btn bsm" onclick="sstUpdate('${r.id}','statut','Traitement');window.sst_step=3;sstRefresh()">← Rouvrir</button>
            <button class="btn bsm bp" onclick="sstToast('📄 Rapport PDF généré','#16a34a')">📄 PDF</button>
            <button class="btn bsm bg2" onclick="sstToast('📧 Fiche envoyée','#16a34a')">📧 Email</button>
          </div>
        </div>`;
    }

    return`
      <!-- FICHE HEADER -->
      <div style="padding:12px 15px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">${r.id} — ${r.danger}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">${r.zone} · ${r.unite}</div>
        </div>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv.toUpperCase()}</span>
          <button class="btn bsm" onclick="sstDelete('${r.id}')" style="color:var(--red);border-color:#fecaca">🗑</button>
        </div>
      </div>
      <!-- STEP BAR -->
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border)">${stepsHtml}</div>
      <!-- BODY -->
      <div style="padding:14px 15px">${stepBody}</div>`;
  };

  setTimeout(()=>{
    // Inject rows
    const tb=document.getElementById('sst_tbody');
    if(tb) tb.innerHTML=buildRows();
    // Inject right panel
    const rp=document.getElementById('sst_right');
    if(rp) rp.innerHTML=buildRightPanel();
  },0);

  // Expose global functions
  window.sstSelect=(id)=>{
    window.sst_selectedId=id;
    window.sst_step=1;
    const r=window.sst_risks.find(x=>x.id===id);
    if(r?.statut==='Clôturé') window.sst_step=5;
    else if(r?.statut==='Traitement') window.sst_step=3;
    sstRefresh();
  };
  window.sstGoStep=(step)=>{
    const r=window.sst_risks.find(x=>x.id===window.sst_selectedId);
    if(!r) return;
    if(step===3&&r.statut==='Ouvert') sstUpdate(r.id,'statut','Traitement');
    if(step===5){ sstUpdate(r.id,'statut','Clôturé'); sstToast('🎉 Fiche clôturée avec succès !','#16a34a'); }
    window.sst_step=step;
    sstRefresh();
  };
  window.sstUpdate=(id,field,val)=>{
    const r=window.sst_risks.find(x=>x.id===id);
    if(!r) return;
    r[field]=(['g','f','d','rr_g','rr_f','rr_d'].includes(field))?+val:val;
    sstRefresh();
  };
  window.sstLive=(id,field,val,slider,col,lblId)=>{
    window.sstUpdate(id,field,val);
    const lbl=document.getElementById(lblId);
    if(lbl) lbl.textContent=val;
    const pct=(val-1)/4*100;
    slider.style.background=`linear-gradient(to right,${col} 0%,${col} ${pct}%,#e5e7eb ${pct}%)`;
    const r=window.sst_risks.find(x=>x.id===id);
    if(!r) return;
    const c=r.g*r.f*r.d, niv=getNiv(c), nc=getNivC(niv);
    const rc=r.rr_g*r.rr_f*r.rr_d, rniv=getNiv(rc), rnc=getNivC(rniv);
    const prev=document.getElementById(['rr_g','rr_f','rr_d'].includes(field)?`sst_rr_preview_${id}`:`sst_crit_preview_${id}`);
    if(prev){
      if(['rr_g','rr_f','rr_d'].includes(field)){
        prev.innerHTML=`<div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:7px;padding:7px;text-align:center;margin-bottom:13px"><span style="font-size:11px;font-weight:700;color:${rnc.tc}">${rniv==='Critique'?'🔴':rniv==='Élevé'?'🟠':rniv==='Moyen'?'🟡':'🟢'} ${rniv.toUpperCase()} — Risque résiduel = ${rc}</span></div>`;
        // Update the 4 score boxes
        const boxes=document.querySelectorAll('#sst_right [data-rr]');
      } else {
        prev.innerHTML=`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:13px;padding:9px;background:${nc.bg};border:1px solid ${nc.bc};border-radius:8px">
          ${[['G',r.g,'#dc2626'],['F',r.f,'#ea580c'],['D',r.d,'#2563eb'],['C',c,nc.tc]].map(([l,v,cl])=>`<div style="text-align:center"><div style="font-size:18px;font-weight:800;color:${cl};font-family:monospace">${v}</div><div style="font-size:8px;color:var(--muted)">${l}</div></div>`).join('')}
          <div style="grid-column:1/-1;text-align:center;font-weight:700;color:${nc.tc};font-size:11px;padding-top:5px;border-top:1px solid ${nc.bc}">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv} — Criticité = ${c}</div>
        </div>`;
      }
    }
  };
  window.sstDelete=(id)=>{
    if(!confirm('Supprimer le risque '+id+' ?')) return;
    window.sst_risks=window.sst_risks.filter(r=>r.id!==id);
    window.sst_selectedId=null;
    sstToast('🗑 Risque '+id+' supprimé','#dc2626');
    sstRefresh();
  };
  window.sstFilterCell=(g,f)=>{
    const tb=document.getElementById('sst_tbody');
    if(!tb) return;
    const filtered=window.sst_risks.filter(r=>r.g===g&&r.f===f);
    sstToast('🗺 Filtre G='+g+' × F='+f+' — '+filtered.length+' risque(s)','#2563eb');
    const getCrit=r=>r.g*r.f*r.d;const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
    const getNivC=niv=>{if(niv==='Critique')return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};if(niv==='Élevé')return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};if(niv==='Moyen')return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};};
    const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';
    tb.innerHTML=filtered.map(r=>{const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut),sel=r.id===window.sst_selectedId;return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')"><td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td><td style="font-size:10px">${r.zone}</td><td style="font-size:10px;color:var(--muted)">${r.unite}</td><td style="font-weight:600">${r.danger}</td><td style="color:var(--muted)">${r.risque}</td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td><td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td><td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td><td style="font-size:10px">${r.resp}</td><td><span class="badge ${sc}">${r.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td></tr>`;}).join('');
    document.getElementById('sst_count').textContent=filtered.length+' risque(s) filtrés';
  };
  window.sstRefresh=()=>{ goPage('sec-risques'); };
  window.sstNewRisk=()=>{
    const id='R-'+(String(window.sst_risks.length+1).padStart(3,'0'));
    window.sst_risks.push({id,zone:'Atelier usinage',unite:'—',processus:'—',danger:'Nouveau danger',risque:'Nouveau risque',dommage:'—',personnes:'—',situation:'Normal',g:3,f:3,d:3,action:'',respAction:'HSE',delai:'',resp:'HSE',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2});
    window.sst_selectedId=id;
    window.sst_step=1;
    sstToast('✅ Risque '+id+' créé — Complétez la fiche','#16a34a');
    sstRefresh();
  };
  window.sstToast=(msg,color='#0f2044')=>{
    const d=document.createElement('div');
    d.style.cssText='position:fixed;bottom:22px;right:22px;background:'+color+';color:#fff;padding:11px 16px;border-radius:9px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:8px;font-family:Inter,sans-serif';
    d.innerHTML=msg;
    document.body.appendChild(d);
    setTimeout(()=>{d.style.transition='opacity .4s';d.style.opacity='0';setTimeout(()=>d.remove(),400);},2800);
  };
  window.sstApplyFilter=()=>{
    const z=document.getElementById('sst_fZone')?.value||'';
    const n=document.getElementById('sst_fNiv')?.value||'';
    const s=document.getElementById('sst_fStat')?.value||'';
    const q=(document.getElementById('sst_fSearch')?.value||'').toLowerCase();
    const getCrit=r=>r.g*r.f*r.d;const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
    const getNivC=niv=>{if(niv==='Critique')return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};if(niv==='Élevé')return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};if(niv==='Moyen')return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};};
    const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';
    const filtered=window.sst_risks.filter(r=>{const c=getCrit(r),niv=getNiv(c);return(!z||r.zone===z)&&(!n||niv===n)&&(!s||r.statut===s)&&(!q||r.danger.toLowerCase().includes(q)||r.risque.toLowerCase().includes(q)||r.id.toLowerCase().includes(q));});
    const tb=document.getElementById('sst_tbody');
    if(tb) tb.innerHTML=filtered.map(r=>{const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut),sel=r.id===window.sst_selectedId;return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')"><td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td><td style="font-size:10px">${r.zone}</td><td style="font-size:10px;color:var(--muted)">${r.unite}</td><td style="font-weight:600">${r.danger}</td><td style="color:var(--muted)">${r.risque}</td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td><td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td><td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td><td style="font-size:10px">${r.resp}</td><td><span class="badge ${sc}">${r.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td></tr>`;}).join('');
    document.getElementById('sst_count').textContent=filtered.length<window.sst_risks.length?filtered.length+'/'+window.sst_risks.length+' risques':'';
  };

  return `
<style>
.sst-layout{display:flex;height:calc(100vh - 170px);overflow:hidden;margin:-16px -18px}
.sst-left{width:55%;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid var(--border)}
.sst-right{width:45%;overflow-y:auto;background:var(--white)}
.sst-filter-bar{background:var(--white);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;gap:7px;align-items:center;flex-shrink:0;flex-wrap:wrap}
.sst-table-area{flex:1;overflow-y:auto;padding:11px 14px}
.tbl tr.sst-sel td{background:#eff6ff}
.sst-hc{border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700;font-family:monospace;cursor:pointer;position:relative;transition:all .15s}
.sst-hc:hover{transform:scale(1.12);z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.25)}
input[type=range].sst-slider{-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%}
input[type=range].sst-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2)}
</style>
<div class="sst-layout">
  <!-- LEFT -->
  <div class="sst-left">
    <div class="sst-filter-bar">
      <select class="sel" id="sst_fZone" onchange="sstApplyFilter()">
        <option value="">Zone: Toutes</option>
        ${['Atelier usinage','Assemblage','Maintenance','Bureau','Magasin','Bâtiment B'].map(z=>`<option>${z}</option>`).join('')}
      </select>
      <select class="sel" id="sst_fNiv" onchange="sstApplyFilter()">
        <option value="">Niveau: Tous</option><option>Critique</option><option>Élevé</option><option>Moyen</option><option>Faible</option>
      </select>
      <select class="sel" id="sst_fStat" onchange="sstApplyFilter()">
        <option value="">Statut: Tous</option><option>Ouvert</option><option>Traitement</option><option>Clôturé</option>
      </select>
      <input class="sel" id="sst_fSearch" placeholder="🔍 Rechercher..." style="width:130px" oninput="sstApplyFilter()">
      <button class="btn bsm" onclick="document.getElementById('sst_fZone').value='';document.getElementById('sst_fNiv').value='';document.getElementById('sst_fStat').value='';document.getElementById('sst_fSearch').value='';sstApplyFilter()">✕</button>
      <span id="sst_count" style="font-size:10px;color:var(--muted)"></span>
      <div style="margin-left:auto;display:flex;gap:5px;font-size:9.5px">
        ${[['#fef2f2','#fecaca','#991b1b','Critique (>60)'],['#fff7ed','#fed7aa','#9a3412','Élevé (31–60)'],['#fffbeb','#fde68a','#92400e','Moyen (11–30)'],['#f0fdf4','#bbf7d0','#065f46','Faible (1–10)']].map(([bg,bc,c,l])=>`<span style="background:${bg};color:${c};border:1px solid ${bc};padding:2px 7px;border-radius:4px;font-weight:700">${l}</span>`).join('')}
      </div>
    </div>
    <div class="sst-table-area">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
        <div style="font-size:12px;font-weight:700;color:var(--navy)">📋 Registre des risques SST — <span id="sst_total">${window.sst_risks?window.sst_risks.length:7} risques identifiés</span></div>
        <div style="display:flex;gap:6px">
          <button class="btn bsm bp" onclick="sstNewRisk()">+ Nouveau risque</button>
          <button class="btn bsm" onclick="sstToast('📥 Export Excel en cours...','#16a34a')">📥 Export</button>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>ID</th><th>Zone</th><th>Unité</th><th>Danger</th><th>Risque</th>
          <th style="text-align:center">G</th><th style="text-align:center">F</th><th style="text-align:center">D</th>
          <th>Criticité</th><th>Niveau</th><th>Resp.</th><th>Statut</th><th></th>
        </tr></thead>
        <tbody id="sst_tbody"></tbody>
      </table>

      <!-- HEATMAP -->
      <div class="card" style="margin-top:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
          <span class="ct">🗺 Matrice de criticité — Heatmap G × F</span>
          <span style="font-size:9px;color:var(--muted)">Cliquer pour filtrer</span>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div>
            <div style="display:flex;align-items:flex-end;gap:5px">
              <div style="display:flex;flex-direction:column;justify-content:space-between;height:142px;padding:2px 0;margin-right:2px">
                ${[5,4,3,2,1].map(v=>`<div style="font-size:8.5px;color:var(--muted)">F=${v}</div>`).join('')}
              </div>
              <div>
                <div style="display:grid;grid-template-columns:repeat(5,28px);grid-template-rows:repeat(5,28px);gap:2px">${heatmap}</div>
                <div style="display:flex;justify-content:space-between;padding:3px 0 0;width:144px">
                  ${[1,2,3,4,5].map(v=>`<div style="font-size:8.5px;color:var(--muted);width:28px;text-align:center">G=${v}</div>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:9px">${statsHtml}</div>
            <div style="display:flex;flex-direction:column;gap:4px">
              ${[['#dc2626','Critique (>60)'],['#f97316','Élevé (31–60)'],['#f59e0b','Moyen (11–30)'],['#10b981','Faible (1–10)']].map(([c,l])=>`<div style="display:flex;align-items:center;gap:6px;font-size:9.5px"><div style="width:11px;height:11px;border-radius:3px;background:${c}"></div>${l}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="sst-right" id="sst_right">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:38px;margin-bottom:8px">📋</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Sélectionner un risque</div>
      <div style="font-size:11px">Cliquez sur une ligne du tableau<br>pour voir et modifier la fiche</div>
    </div>
  </div>
</div>`;
},

'sec-checklists': () => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-bottom:13px">
  ${[['🔥','Extincteurs','CH-EXT-001','Sécurité incendie','Mensuelle','V2','Validé','#f0fdf4','#bbf7d0','var(--green)','15/05/2025','15/06/2025',100,'sec-cl-ext'],
     ['🏥','Pharmacie','CH-PHAR-001','Premiers secours','Mensuelle','V1','Observation','#fff7ed','#fed7aa','var(--orange)','15/05/2025','15/06/2025',78,'sec-cl-phar'],
     ['🚗','Véhicule','CH-VEH-001','Transport','Hebdomadaire','V3','En révision','#fffbeb','#fde68a','var(--yellow)','10/05/2025','17/05/2025',65,'sec-cl-veh'],
     ['🦺','EPI','CH-EPI-001','Équipements','Mensuelle','V2','Observation','#fff7ed','#fed7aa','var(--orange)','08/05/2025','08/06/2025',82,'sec-cl-epi'],
     ['🚨','Évacuation','CH-EVAQ-001','Sécurité incendie','Trimestrielle','V1','Validé','#f0fdf4','#bbf7d0','var(--green)','05/05/2025','05/08/2025',100,'sec-cl-evaq'],
     ['⚙','Machines / SST','CH-MACH-001','Équipements','Mensuelle','V1','Validé','#f0fdf4','#bbf7d0','var(--green)','01/05/2025','01/06/2025',92,'sec-cl-sst'],
  ].map(([ic,nom,code,cat,freq,ver,statut,bg,bc,c,dern,proch,pct,pid])=>`
  <div style="background:var(--white);border:1px solid var(--border);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)" onmouseover="this.style.boxShadow='0 5px 18px rgba(0,0,0,.09)';this.style.transform='translateY(-2px)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)';this.style.transform='none'">
    <div style="height:3px;background:${c}"></div>
    <div style="padding:11px 12px;display:flex;align-items:flex-start;gap:9px;border-bottom:1px solid var(--border)">
      <div style="width:34px;height:34px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${ic}</div>
      <div style="flex:1"><div style="font-weight:700;font-size:11.5px;color:var(--navy)">${nom}</div><div style="font-size:9px;color:var(--muted)">${code} · ${cat}</div></div>
      <span style="background:${bg};color:${c};border:1px solid ${bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${statut}</span>
    </div>
    <div style="padding:10px 12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:9px">
        ${[['Fréquence',freq],['Version',ver],['Dernière',dern],['Prochaine',proch]].map(([k,v])=>`<div style="background:var(--bg);border-radius:5px;padding:5px 7px"><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div><div style="font-size:8.5px;color:var(--muted)">${k}</div></div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">
        <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${c};border-radius:3px"></div></div>
        <span style="font-size:10px;font-weight:700;color:${c}">Conformité ${pct}%</span>
      </div>
      <div style="display:flex;gap:6px"><button class="btn" style="flex:1;font-size:10px" onclick="goPage('${pid}')">👁 Voir</button><button class="btn bp" style="flex:1;font-size:10px" onclick="goPage('${pid}')">✏ Remplir</button></div>
    </div>
  </div>`).join('')}
</div>
<div class="g23">
  <div class="card">
    <div class="ch"><span class="ct">🔥 Détail — Checklist Extincteurs (CH-EXT-001)</span><div style="display:flex;gap:6px;align-items:center"><span class="badge bg3">Validé — V2</span><button class="btn bsm bp" onclick="goPage('sec-cl-ext')">✏ Remplir</button></div></div>
    <div class="fgrid" style="grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
      ${[['Site','XPERT-MECA'],['ID Checklist','CH-EXT-001'],['Extincteur N°','EXT-05'],['Type','Poudre ABC'],['Emplacement','Atelier Usinage — Zone 1'],['Date inspection','15/05/2025'],['Inspecteur','Ali Mohamed'],['Prochaine inspection','15/06/2025']].map(([k,v])=>`<div><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:3px">${k}</div><div style="background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:5px 7px;font-size:11px;font-weight:500">${v}</div></div>`).join('')}
    </div>
    <table class="tbl">
      <thead><tr><th>N°</th><th>Élément à vérifier</th><th>Oui</th><th>Non</th><th>Observation</th><th>État</th></tr></thead>
      <tbody>
        ${[['1','Extincteur approprié au bon endroit','✓','','OK'],['2','Accessibilité et visibilité correctes','✓','','OK'],['3',"Instructions d'utilisation lisibles",'✓','','Légèrement usées'],['4','Goupille bien en place','✓','','OK'],['5','Pression indicateur correcte (zone verte)','✓','','Pression correcte'],['6','Absence de dommage ou corrosion','','✗','À vérifier — traces suspectes'],['7',"Aucune obstruction du tuyau d'évacuation",'✓','','OK'],['8',"Carte d'inspection en place et à jour",'✓','','Valide jusqu\'au 06/2025'],['9','Fiche signalétique disponible','✓','','Disponible']].map(([n,e,ou,non,obs])=>`<tr>
          <td style="font-family:monospace;color:var(--muted)">${n}</td>
          <td style="font-weight:500">${e}</td>
          <td style="text-align:center;color:var(--green);font-weight:700;font-size:13px">${ou}</td>
          <td style="text-align:center;color:var(--red);font-weight:700;font-size:13px">${non}</td>
          <td style="color:var(--muted);font-size:10px">${obs}</td>
          <td style="text-align:center">${ou?'<span style="color:var(--green)">✓</span>':'<span style="color:var(--red)">✗</span>'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
      <div><div style="font-size:9px;font-weight:600;color:var(--muted);margin-bottom:4px">OBSERVATION GÉNÉRALE</div><textarea class="fi" rows="2">RAS — Extincteur en bon état général. Point 6 à surveiller.</textarea></div>
      <div class="upload-box"><div style="font-size:20px;margin-bottom:5px">📷</div><div style="font-weight:600;margin-bottom:2px">Ajouter des photos</div><div style="font-size:10px">JPG, PNG — max 5Mo</div><div style="margin-top:5px;font-size:10px;color:var(--blue)">3 photo(s) jointe(s)</div></div>
    </div>
    <div style="display:flex;gap:7px;margin-top:10px">
      <button class="btn" style="flex:1">💾 Sauvegarder</button>
      <button class="btn bp" style="flex:1">📄 Exporter PDF</button>
      <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button>
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🦺 Checklist EPI — CH-EPI-001</div>
      ${[['Département','Atelier Usinage'],['Poste','Opérateur CN'],['Responsable','Ali Mohamed'],['Date','15/05/2025']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}
      <table class="tbl" style="margin-top:8px">
        <thead><tr><th>EPI</th><th>Oblig.</th><th>Dispo.</th><th>Conforme</th><th>Bon état</th><th>État</th></tr></thead>
        <tbody>${[['Casque de sécurité','Oui','Oui','Oui','Oui','OK'],['Lunettes de protection','Oui','Oui','Oui','Oui','OK'],['Gants de protection','Oui','Oui','Non','Oui','Alerte'],['Chaussures de sécurité','Oui','Oui','Oui','Oui','OK'],['Protection auditive','Non','Non','—','—','OK'],['Gilet haute visibilité','Oui','Oui','Oui','Oui','OK']].map(([epi,ob,di,co,be,e])=>`<tr>
          <td style="font-weight:500">${epi}</td>
          ${[ob,di,co,be].map(v=>`<td><span class="badge ${v==='Oui'?'bg3':v==='Non'?'br':'bgr'}">${v}</span></td>`).join('')}
          <td><span class="badge ${e==='OK'?'bg3':'br'}">${e}</span></td>
        </tr>`).join('')}</tbody>
      </table>
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">💾 Enregistrer</button><button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">Résultats globaux — Inspection</div>
      ${[['Résultat global','Conforme','bg3'],['Criticité','Normale','bgr'],['Signature inspecteur','Ali Mohamed — ✓','bb'],['Signature HSE','A. Hadj-Ali — ✓','bb'],['Prochaine inspection','15/06/2025','bo']].map(([k,v,c])=>`<div class="drow"><span class="dk">${k}</span><span class="badge ${c}">${v}</span></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-accidents': () => {
  /* ══ DATA ══ */
  if(!window.acc_data){
    window.acc_data = [
      {id:'A-2025-003',type:'Accident',date:'2025-05-20',heure:'10:30',employe:'Ali Mohammed',matricule:'OP-CN-2209',fonction:'Opérateur CN',anciennete:'3 ans',dept:'Usinage',lieu:'Atelier Usinage, Machine CN 05',blessure:'Coupure main gauche',gravite:'Grave',arret:'Oui',jours:7,temoins:'Ahmed Samir',soins:'Oui — sur site',desc:"Lors du changement de pièce sur la machine CN 05, l'opérateur a été blessé à la main gauche par la pièce en cours d'usinage.",pourquoi:["La main de l'opérateur a touché la pièce en rotation","Il n'y avait pas de protège-main en place","La protection a été retirée pour faciliter le changement","Absence de procédure de verrouillage (consignation)"],causeRacine:'Formation insuffisante et procédure consignation manquante',actions:[{titre:'Installer protection machine CN',resp:'HSE',delai:'2025-05-31',statut:'En cours'},{titre:'Former opérateurs à la consignation',resp:'RH + HSE',delai:'2025-06-15',statut:'Planifié'},{titre:'Créer procédure de consignation',resp:'HSE',delai:'2025-06-20',statut:'Planifié'}],statut:'En cours',step:3},
      {id:'A-2025-002',type:'Accident',date:'2025-05-05',heure:'14:15',employe:'Karim Saïd',matricule:'MT-AS-1104',fonction:'Monteur',anciennete:'5 ans',dept:'Assemblage',lieu:'Poste AS3',blessure:'Chute plein pied',gravite:'Légère',arret:'Non',jours:0,temoins:'Youssef A.',soins:'Oui — sur site',desc:'L\'opérateur a glissé sur le sol mouillé suite à une fuite non signalée.',pourquoi:['L\'opérateur a glissé sur le sol','Le sol était mouillé suite à une fuite','Absence de signalisation sol glissant'],causeRacine:'Absence de procédure de nettoyage et signalisation inadéquate',actions:[{titre:'Nettoyer et sécher le sol',resp:'Maintenance',delai:'2025-05-05',statut:'Clôturé'},{titre:'Installer panneaux sol glissant',resp:'HSE',delai:'2025-05-10',statut:'Clôturé'}],statut:'Clôturé',step:5},
      {id:'A-2025-001',type:'Accident',date:'2025-04-12',heure:'09:20',employe:'Youssef Ahmed',matricule:'EL-MT-0892',fonction:'Électricien',anciennete:'7 ans',dept:'Maintenance',lieu:'Local technique B',blessure:'Brûlure avant-bras',gravite:'Moyenne',arret:'Non',jours:0,temoins:'—',soins:'Oui — sur site',desc:'Contact accidentel avec surface chaude lors d\'une intervention sur équipement en température.',pourquoi:['Contact accidentel avec surface chaude','Absence de gant haute température','Procédure non respectée'],causeRacine:'Non-respect des EPI lors d\'intervention sur équipement en température',actions:[{titre:'Former aux EPI haute température',resp:'HSE',delai:'2025-04-30',statut:'Clôturé'}],statut:'Clôturé',step:5},
      {id:'I-2025-007',type:'Incident',date:'2025-05-18',heure:'08:45',employe:'Mehdi Rais',matricule:'LOG-MG-2210',fonction:'Magasinier',anciennete:'2 ans',dept:'Magasin',lieu:'Allée stockage B',blessure:'Presque-accident',gravite:'—',arret:'—',jours:0,temoins:'Ali M.',soins:'Non',desc:'Une charge a failli tomber du rayonnage lors d\'un déplacement de palette.',pourquoi:['Une charge a failli tomber du rayonnage','Le rayonnage était surchargé','Absence de contrôle des charges maximales'],causeRacine:'Absence de contrôle régulier du chargement des rayonnages',actions:[{titre:'Audit complet des rayonnages',resp:'HSE',delai:'2025-05-25',statut:'Planifié'},{titre:'Apposer étiquettes charge max.',resp:'Logistique',delai:'2025-05-30',statut:'Planifié'}],statut:'Ouvert',step:1},
    ];
    window.acc_sel = null;
    window.acc_view = 'list'; // 'list' | 'new'
    window.acc_newStep = 1;
    window.acc_detailTab = 'info'; // 'info'|'causes'|'actions'|'files'
  }

  const STEPS = ['Déclaré','Analyse','Actions','Validation','Clôture'];
  const gColor = g => g==='Grave'?{bg:'#fef2f2',tc:'#991b1b',bc:'#fecaca'}:g==='Moyenne'?{bg:'#fff7ed',tc:'#9a3412',bc:'#fed7aa'}:g==='Légère'?{bg:'#f0fdf4',tc:'#065f46',bc:'#bbf7d0'}:{bg:'#f9fafb',tc:'#6b7a99',bc:'#e5e7eb'};
  const sColor = s => s==='Clôturé'?'bg3':s==='En cours'?'by':s==='Ouvert'?'bb':'bgr';
  const fmtDate = d => { if(!d) return '—'; const p=d.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; };

  /* ══ BUILD TABLE ROWS ══ */
  const buildRows = () => window.acc_data.map(a => {
    const gc=gColor(a.gravite), sc=sColor(a.statut), isSel=a.id===window.acc_sel;
    return `<tr onclick="accSelect('${a.id}')" style="cursor:pointer;${isSel?'background:#eff6ff;':''}" onmouseover="if('${a.id}'!=='${window.acc_sel||''}')this.style.background='#f8fafc'" onmouseout="if('${a.id}'!=='${window.acc_sel||''}')this.style.background=''">
      <td style="border-left:${isSel?'3px solid var(--blue)':'3px solid transparent'};font-family:monospace;font-weight:700;color:var(--blue);font-size:10.5px">${a.id}</td>
      <td><span class="badge ${a.type==='Accident'?'br':'bb'}" style="font-size:9px">${a.type}</span></td>
      <td style="font-size:10px">${fmtDate(a.date)}</td>
      <td style="font-family:monospace;font-size:10px">${a.heure}</td>
      <td style="font-weight:600">${a.employe}</td>
      <td style="font-size:10px;color:var(--muted)">${a.dept}</td>
      <td style="font-size:11px">${a.blessure}</td>
      <td><span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:5px;padding:2px 7px;font-size:9px;font-weight:700">${a.gravite}</span></td>
      <td><span class="badge ${a.arret==='Oui'?'br':a.arret==='Non'?'bg3':'bgr'}" style="font-size:9px">${a.arret==='Oui'?'Oui — '+a.jours+'j':a.arret}</span></td>
      <td><span class="badge ${sc}">${a.statut}</span></td>
      <td><button class="btn bsm" onclick="event.stopPropagation();accSelect('${a.id}')">Voir →</button></td>
    </tr>`;
  }).join('');

  /* ══ BUILD RIGHT PANEL ══ */
  const buildRight = () => {
    if(window.acc_view==='new') return buildNewForm();
    if(!window.acc_sel) return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:40px">🚑</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:5px">Sélectionner un dossier</div>
      <div style="font-size:11px">Cliquez sur une ligne pour voir<br>la fiche et le workflow</div>
      <button class="btn bp bsm" style="margin-top:10px" onclick="accNewView()">+ Déclarer un accident</button>
    </div>`;
    const a = window.acc_data.find(x=>x.id===window.acc_sel);
    if(!a) return '';
    const gc=gColor(a.gravite);
    const step=a.step||1;
    // Step indicator
    const stepBar = STEPS.map((l,i)=>{
      const n=i+1, done=n<step, active=n===step;
      return (i>0?`<div style="flex:1;height:2px;background:${done?'var(--green)':'#e5e7eb'};margin-top:12px;transition:background .3s"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div onclick="accGoStep('${a.id}',${n})" title="${l}" style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;transition:all .3s;
            background:${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};
            color:${done||active?'#fff':'var(--muted)'};
            border:2px solid ${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};
            box-shadow:${active?'0 0 0 4px rgba(37,99,235,.15)':'none'}">${done?'✓':n}</div>
          <div style="font-size:8px;margin-top:3px;white-space:nowrap;color:${active?'var(--blue)':done?'var(--green)':'var(--muted)'};font-weight:${active||done?'700':'400'}">${l}</div>
        </div>`;
    }).join('');

    // Detail tabs
    const tabs = ['info','causes','actions','files'];
    const tabLabels = ['Informations','Analyse 5P','Actions','Fichiers'];
    const tabBar = tabs.map((t,i)=>`<div onclick="accSetTab('${t}')" style="padding:6px 11px;font-size:11px;cursor:pointer;color:${window.acc_detailTab===t?'var(--blue)':'var(--muted)'};border-bottom:2px solid ${window.acc_detailTab===t?'var(--blue)':'transparent'};margin-bottom:-1px;font-weight:${window.acc_detailTab===t?'600':'400'};transition:all .12s">${tabLabels[i]}</div>`).join('');

    // Tab content
    let tabContent='';
    if(window.acc_detailTab==='info'){
      tabContent=`
        <div style="display:flex;flex-direction:column;gap:0">
          ${[['Employé',a.employe],['Matricule',a.matricule],['Fonction',a.fonction],['Ancienneté',a.anciennete],['Département',a.dept],['Date & Heure',fmtDate(a.date)+' — '+a.heure],['Lieu',a.lieu],['Type blessure',a.blessure],['Gravité',a.gravite],['Avec arrêt',a.arret==='Oui'?'Oui — '+a.jours+' jour(s)':a.arret],['Témoins',a.temoins],['Premiers soins',a.soins]].map(([k,v])=>`
          <div class="drow" style="padding:4px 0">
            <span class="dk">${k}</span>
            <span style="font-weight:600;font-size:11px;max-width:60%;text-align:right">${v}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:9px;padding:9px;background:#f8fafc;border:1px solid var(--border);border-radius:7px">
          <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Description</div>
          <div style="font-size:11px;line-height:1.5;color:var(--text)">${a.desc}</div>
        </div>`;
    } else if(window.acc_detailTab==='causes'){
      tabContent=`
        <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:9px">Méthode des 5 Pourquoi</div>
        ${a.pourquoi.map((p,i)=>`
        <div style="padding:7px 10px 7px 12px;border-left:3px solid ${i<a.pourquoi.length-1?'#bfdbfe':'#fecaca'};background:${i<a.pourquoi.length-1?'#f8fafc':'#fef9f9'};border-radius:0 7px 7px 0;margin-bottom:6px">
          <div style="font-size:9px;font-weight:700;color:${i<a.pourquoi.length-1?'var(--blue)':'var(--red)'};text-transform:uppercase;margin-bottom:2px">Pourquoi ${i+1}</div>
          <div style="font-size:11px;font-weight:500">${p}</div>
        </div>`).join('')}
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px;margin-top:5px">
          <div style="font-size:9px;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px">🎯 Cause racine identifiée</div>
          <div style="font-size:11.5px;font-weight:600;color:#991b1b">${a.causeRacine}</div>
        </div>`;
    } else if(window.acc_detailTab==='actions'){
      tabContent=`
        ${a.actions.map((act,i)=>`
        <div style="background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
            <span style="font-size:11px;font-weight:600;flex:1">${act.titre}</span>
            <span class="badge ${act.statut==='Clôturé'?'bg3':act.statut==='En cours'?'bb':'bgr'}" style="font-size:9px;margin-left:6px">${act.statut}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:9.5px;color:var(--muted);margin-bottom:7px">
            <span>👤 ${act.resp}</span><span>⏰ ${fmtDate(act.delai)}</span>
          </div>
          ${act.statut!=='Clôturé'?`<button onclick="accCloseAction('${a.id}',${i})" style="width:100%;padding:5px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:5px;color:var(--green);font-size:10px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif">✓ Marquer comme clôturé</button>`:'<div style="text-align:center;font-size:10px;color:var(--green);font-weight:600">✅ Action clôturée</div>'}
        </div>`).join('')}
        <button onclick="accAddAction('${a.id}')" class="btn" style="width:100%;font-size:11px;margin-top:4px">+ Ajouter une action</button>`;
    } else {
      tabContent=`
        <div style="border:1.5px dashed var(--border);border-radius:8px;padding:18px;text-align:center;background:#fafbfc;margin-bottom:10px;cursor:pointer">
          <div style="font-size:22px;margin-bottom:6px">📎</div>
          <div style="font-weight:600;margin-bottom:3px;font-size:12px">Déposer vos fichiers</div>
          <div style="font-size:10px;color:var(--muted)">Photos, rapports, témoignages — JPG, PDF</div>
          <button class="btn bsm" style="margin-top:8px">Parcourir</button>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px">2 fichier(s) joint(s)</div>
        ${[['photo_accident.jpg','Photo','120 Ko'],['rapport_medical.pdf','Rapport','240 Ko']].map(([n,t,s])=>`
        <div style="display:flex;align-items:center;gap:8px;padding:7px 9px;background:#f8fafc;border:1px solid var(--border);border-radius:6px;margin-bottom:6px">
          <span style="font-size:18px">${t==='Photo'?'🖼':'📄'}</span>
          <div style="flex:1"><div style="font-size:11px;font-weight:500">${n}</div><div style="font-size:9.5px;color:var(--muted)">${t} · ${s}</div></div>
          <button class="btn bsm">👁</button>
        </div>`).join('')}`;
    }

    const isClosed = a.statut==='Clôturé';
    return `
      <!-- FICHE HEADER -->
      <div style="padding:12px 15px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">${a.id} — ${a.employe}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">${a.dept} · ${fmtDate(a.date)} · ${a.heure}</div>
        </div>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700">${a.gravite}</span>
          <span class="badge ${sColor(a.statut)}">${a.statut}</span>
          <button onclick="accDelete('${a.id}')" class="btn bsm" style="color:var(--red);border-color:#fecaca">🗑</button>
        </div>
      </div>
      <!-- WORKFLOW -->
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border);flex-shrink:0">${stepBar}</div>
      ${!isClosed?`<div style="padding:8px 15px;background:var(--white);border-bottom:1px solid var(--border);display:flex;gap:6px">
        <button onclick="accGoStep('${a.id}',${Math.max(1,step-1)})" class="btn bsm" ${step<=1?'disabled style="opacity:.4"':''}>← Précédent</button>
        <div style="flex:1"></div>
        ${step<5?`<button onclick="accGoStep('${a.id}',${step+1})" class="btn bsm bp">${step===4?'✓ Valider & Clôturer →':'Étape suivante : '+STEPS[step]+' →'}</button>`:''}
      </div>`:`<div style="padding:8px 15px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;text-align:center;font-size:10px;font-weight:700;color:var(--green)">✅ Dossier clôturé — <span onclick="accGoStep('${a.id}',3)" style="cursor:pointer;text-decoration:underline;color:var(--blue)">Rouvrir</span></div>`}
      <!-- DETAIL TABS -->
      <div style="display:flex;border-bottom:1px solid var(--border);padding:0 15px;background:var(--white)">${tabBar}</div>
      <!-- TAB CONTENT -->
      <div style="padding:13px 15px">${tabContent}</div>
      <!-- FOOTER ACTIONS -->
      <div style="padding:10px 15px;border-top:1px solid var(--border);display:flex;gap:7px;position:sticky;bottom:0;background:var(--white)">
        <button class="btn bsm" style="flex:1" onclick="accToast('💾 Brouillon sauvegardé','#6b7a99')">💾 Brouillon</button>
        <button class="btn bsm bp" style="flex:1" onclick="accToast('✅ Dossier enregistré','#16a34a')">✓ Enregistrer</button>
        <button class="btn bsm" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca" onclick="accToast('📄 Rapport PDF généré','#16a34a')">📄 PDF</button>
      </div>`;
  };

  /* ══ NEW FORM ══ */
  const buildNewForm = () => {
    const ns = window.acc_newStep||1;
    const stepLabels=['Informations','Analyse des causes','Actions correctives','Pièces jointes'];
    const stepBar = stepLabels.map((l,i)=>{
      const n=i+1,done=n<ns,active=n===ns;
      return (i>0?`<div style="flex:1;height:2px;background:${done?'var(--blue)':'#e5e7eb'};margin-top:10px"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;
            background:${done?'var(--blue)':active?'var(--blue)':'#e5e7eb'};
            color:${done||active?'#fff':'var(--muted)'};border:2px solid ${done?'var(--blue)':active?'var(--blue)':'#e5e7eb'};
            ${active?'box-shadow:0 0 0 3px rgba(37,99,235,.15)':''}">${done?'✓':n}</div>
          <div style="font-size:8px;margin-top:3px;white-space:nowrap;color:${active?'var(--blue)':done?'var(--muted)':'var(--muted)'};font-weight:${active?'700':'400'}">${l}</div>
        </div>`;
    }).join('');

    let body='';
    if(ns===1){
      body=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px">
        <div class="fg"><label class="fl">Employé <span>*</span></label><input class="fi" id="na_emp" placeholder="Nom complet"></div>
        <div class="fg"><label class="fl">Matricule</label><input class="fi" id="na_mat" placeholder="Ex: OP-CN-2209"></div>
        <div class="fg"><label class="fl">Département <span>*</span></label><select class="fi" id="na_dept"><option>Usinage</option><option>Assemblage</option><option>Maintenance</option><option>Magasin</option><option>Bureau</option></select></div>
        <div class="fg"><label class="fl">Fonction</label><input class="fi" id="na_fonc" placeholder="Ex: Opérateur CN"></div>
        <div class="fg"><label class="fl">Type d'événement <span>*</span></label><select class="fi" id="na_type"><option>Accident de travail</option><option>Incident</option><option>Presque-accident</option></select></div>
        <div class="fg"><label class="fl">Gravité <span>*</span></label><select class="fi" id="na_grav"><option>Légère</option><option>Moyenne</option><option>Grave</option><option>Mortelle</option></select></div>
        <div class="fg"><label class="fl">Date <span>*</span></label><input class="fi" type="date" id="na_date" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="fg"><label class="fl">Heure</label><input class="fi" type="time" id="na_heure" value="08:00"></div>
        <div class="fg"><label class="fl">Avec arrêt?</label><select class="fi" id="na_arret"><option value="Non">Non</option><option value="Oui">Oui</option></select></div>
        <div class="fg"><label class="fl">Jours perdus</label><input class="fi" type="number" id="na_jours" value="0" min="0"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Lieu <span>*</span></label><input class="fi" id="na_lieu" placeholder="Ex: Atelier Usinage, Poste CN05"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Type de blessure <span>*</span></label><input class="fi" id="na_blessure" placeholder="Ex: Coupure main gauche"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Description détaillée <span>*</span></label><textarea class="fi" rows="3" id="na_desc" placeholder="Décrire le déroulement de l'accident..."></textarea></div>
        <div class="fg"><label class="fl">Témoins</label><input class="fi" id="na_temoins" placeholder="Noms des témoins"></div>
        <div class="fg"><label class="fl">Premiers soins?</label><select class="fi" id="na_soins"><option>Non</option><option>Oui — sur site</option><option>Hospitalisation</option></select></div>
      </div>`;
    } else if(ns===2){
      body=`<div style="font-size:10px;color:var(--muted);margin-bottom:10px">Identifier les causes profondes par la méthode des 5 Pourquoi</div>
      ${[1,2,3,4].map(i=>`<div class="fg" style="margin-bottom:9px"><label class="fl">Pourquoi ${i} ${i===1?'<span style="color:var(--red)">*</span>':''}</label><input class="fi" id="na_p${i}" placeholder="Pourquoi ${i}..."></div>`).join('')}
      <div class="fg" style="margin-bottom:9px"><label class="fl" style="color:var(--red)">Cause racine identifiée <span>*</span></label><textarea class="fi" rows="2" id="na_cr" placeholder="Cause profonde identifiée après analyse..."></textarea></div>`;
    } else if(ns===3){
      body=`<div style="font-size:10px;color:var(--muted);margin-bottom:10px">Définir au moins une action corrective</div>
      <div id="na_actions_list">
        ${[['Installer protection machine CN','HSE','2025-05-31'],['Former opérateurs à la consignation','RH + HSE','2025-06-15']].map((act,i)=>`
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:7px;margin-bottom:7px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:9px">
          <input class="fi" value="${act[0]}" placeholder="Action corrective...">
          <input class="fi" value="${act[1]}" placeholder="Responsable">
          <input class="fi" type="date" value="${act[2]}">
        </div>`).join('')}
      </div>
      <button onclick="accAddNewAction()" class="btn" style="width:100%;font-size:10px;margin-top:4px">+ Ajouter une action</button>`;
    } else {
      body=`<div style="border:1.5px dashed var(--border);border-radius:8px;padding:20px;text-align:center;background:#fafbfc;margin-bottom:10px;cursor:pointer">
        <div style="font-size:28px;margin-bottom:8px">📎</div>
        <div style="font-weight:600;margin-bottom:3px">Ajouter des pièces jointes</div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px">Photos du lieu, rapport médical, témoignages...</div>
        <button class="btn bsm" style="margin-top:9px">Parcourir</button>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;text-align:center;font-size:11px;color:#065f46;font-weight:600">
        ✅ Dossier prêt à être enregistré
      </div>`;
    }

    return `
      <div style="padding:13px 15px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">📋 Déclarer un accident / incident</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">Étape ${ns}/${stepLabels.length} — ${stepLabels[ns-1]}</div>
        </div>
        <button onclick="window.acc_view='list';window.acc_newStep=1;accRefresh()" class="btn bsm" style="font-size:14px;padding:2px 8px">✕</button>
      </div>
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border)">${stepBar}</div>
      <div style="padding:14px 15px">${body}</div>
      <div style="padding:10px 15px;border-top:1px solid var(--border);display:flex;gap:7px;position:sticky;bottom:0;background:var(--white)">
        ${ns>1?`<button onclick="window.acc_newStep=${ns-1};accRefresh()" class="btn bsm">← Précédent</button>`:'<span></span>'}
        <div style="flex:1"></div>
        ${ns<4?`<button onclick="window.acc_newStep=${ns+1};accRefresh()" class="btn bsm bp">Suivant : ${stepLabels[ns]} →</button>`:`<button onclick="accSaveNew()" class="btn bsm bg2">✅ Enregistrer la déclaration</button>`}
      </div>`;
  };

  /* ══ KPI CARDS ══ */
  const totalAcc = window.acc_data.filter(a=>a.type==='Accident').length;
  const avecArret = window.acc_data.filter(a=>a.arret==='Oui').length;
  const joursTotal = window.acc_data.reduce((s,a)=>s+(+a.jours||0),0);
  const incidents = window.acc_data.filter(a=>a.type==='Incident').length;

  /* ══ EXPOSE GLOBALS ══ */
  setTimeout(()=>{
    const tb=document.getElementById('acc_tbody');
    if(tb) tb.innerHTML=buildRows();
    const rp=document.getElementById('acc_right');
    if(rp) rp.innerHTML=buildRight();
    // Counts
    const cnt=document.getElementById('acc_cnt');
    if(cnt) cnt.textContent=window.acc_data.length+' dossier(s)';
  },0);

  window.accSelect=(id)=>{
    window.acc_sel=id;
    window.acc_view='list';
    window.acc_detailTab='info';
    accRefresh();
  };
  window.accGoStep=(id,step)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(!a) return;
    a.step=step;
    if(step===5){ a.statut='Clôturé'; accToast('🎉 Dossier '+id+' clôturé !','#16a34a'); }
    else if(step>=3 && a.statut==='Ouvert') a.statut='En cours';
    accRefresh();
  };
  window.accSetTab=(tab)=>{ window.acc_detailTab=tab; accRefresh(); };
  window.accCloseAction=(id,idx)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(a&&a.actions[idx]) a.actions[idx].statut='Clôturé';
    accToast('✅ Action clôturée','#16a34a');
    accRefresh();
  };
  window.accAddAction=(id)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(a){ a.actions.push({titre:'Nouvelle action',resp:'HSE',delai:new Date().toISOString().split('T')[0],statut:'Planifié'}); }
    window.acc_detailTab='actions';
    accToast('➕ Action ajoutée','#2563eb');
    accRefresh();
  };
  window.accDelete=(id)=>{
    if(!confirm('Supprimer le dossier '+id+' ?')) return;
    window.acc_data=window.acc_data.filter(x=>x.id!==id);
    window.acc_sel=null;
    accToast('🗑 Dossier '+id+' supprimé','#dc2626');
    accRefresh();
  };
  window.accNewView=()=>{ window.acc_view='new'; window.acc_newStep=1; accRefresh(); };
  window.accAddNewAction=()=>{
    const list=document.getElementById('na_actions_list');
    if(!list) return;
    const div=document.createElement('div');
    div.style='display:grid;grid-template-columns:2fr 1fr 1fr;gap:7px;margin-bottom:7px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:9px';
    div.innerHTML=`<input class="fi" placeholder="Action corrective..."><input class="fi" placeholder="Responsable"><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}">`;
    list.appendChild(div);
  };
  window.accSaveNew=()=>{
    const emp=(document.getElementById('na_emp')?.value||'').trim()||'Employé';
    const dept=document.getElementById('na_dept')?.value||'Usinage';
    const type=document.getElementById('na_type')?.value||'Accident de travail';
    const grav=document.getElementById('na_grav')?.value||'Légère';
    const date=document.getElementById('na_date')?.value||new Date().toISOString().split('T')[0];
    const heure=document.getElementById('na_heure')?.value||'08:00';
    const arret=document.getElementById('na_arret')?.value||'Non';
    const jours=+(document.getElementById('na_jours')?.value||0);
    const lieu=document.getElementById('na_lieu')?.value||'—';
    const blessure=document.getElementById('na_blessure')?.value||'—';
    const desc=document.getElementById('na_desc')?.value||'—';
    const temoins=document.getElementById('na_temoins')?.value||'—';
    const soins=document.getElementById('na_soins')?.value||'Non';
    const p1=document.getElementById('na_p1')?.value||'';
    const p2=document.getElementById('na_p2')?.value||'';
    const p3=document.getElementById('na_p3')?.value||'';
    const p4=document.getElementById('na_p4')?.value||'';
    const cr=document.getElementById('na_cr')?.value||'—';
    const year=new Date().getFullYear();
    const nb=String(window.acc_data.filter(a=>a.id.startsWith('A-'+year)||a.id.startsWith('I-'+year)).length+1).padStart(3,'0');
    const prefix=type==='Accident de travail'?'A':'I';
    const newId=`${prefix}-${year}-${nb}`;
    window.acc_data.unshift({
      id:newId,type:type==='Accident de travail'?'Accident':'Incident',
      date,heure,employe:emp,matricule:document.getElementById('na_mat')?.value||'—',
      fonction:document.getElementById('na_fonc')?.value||'—',anciennete:'—',
      dept,lieu,blessure,gravite:grav,arret,jours,temoins,soins,desc,
      pourquoi:[p1,p2,p3,p4].filter(Boolean),causeRacine:cr,
      actions:[{titre:'Action à définir',resp:'HSE',delai:new Date().toISOString().split('T')[0],statut:'Planifié'}],
      statut:'Ouvert',step:1
    });
    window.acc_view='list';
    window.acc_sel=newId;
    window.acc_newStep=1;
    window.acc_detailTab='info';
    accToast('✅ Dossier '+newId+' créé','#16a34a');
    accRefresh();
  };
  window.accFilter=()=>{
    const q=(document.getElementById('acc_search')?.value||'').toLowerCase();
    const st=document.getElementById('acc_fstat')?.value||'';
    const gr=document.getElementById('acc_fgrav')?.value||'';
    const dt=document.getElementById('acc_fdept')?.value||'';
    const filtered=window.acc_data.filter(a=>
      (!q||a.employe.toLowerCase().includes(q)||a.id.toLowerCase().includes(q)||a.blessure.toLowerCase().includes(q)||a.dept.toLowerCase().includes(q))
      &&(!st||a.statut===st)&&(!gr||a.gravite===gr)&&(!dt||a.dept===dt)
    );
    const tb=document.getElementById('acc_tbody');
    if(tb){
      const fmtDate=d=>{if(!d)return'—';const p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0];};
      const gColor=g=>g==='Grave'?{bg:'#fef2f2',tc:'#991b1b',bc:'#fecaca'}:g==='Moyenne'?{bg:'#fff7ed',tc:'#9a3412',bc:'#fed7aa'}:g==='Légère'?{bg:'#f0fdf4',tc:'#065f46',bc:'#bbf7d0'}:{bg:'#f9fafb',tc:'#6b7a99',bc:'#e5e7eb'};
      const sColor=s=>s==='Clôturé'?'bg3':s==='En cours'?'by':s==='Ouvert'?'bb':'bgr';
      tb.innerHTML=filtered.map(a=>{const gc=gColor(a.gravite),sc=sColor(a.statut),isSel=a.id===window.acc_sel;return`<tr onclick="accSelect('${a.id}')" style="cursor:pointer;${isSel?'background:#eff6ff;':''}" onmouseover="if('${a.id}'!=='${window.acc_sel||''}')this.style.background='#f8fafc'" onmouseout="if('${a.id}'!=='${window.acc_sel||''}')this.style.background=''"><td style="border-left:${isSel?'3px solid var(--blue)':'3px solid transparent'};font-family:monospace;font-weight:700;color:var(--blue);font-size:10.5px">${a.id}</td><td><span class="badge ${a.type==='Accident'?'br':'bb'}" style="font-size:9px">${a.type}</span></td><td style="font-size:10px">${fmtDate(a.date)}</td><td style="font-family:monospace;font-size:10px">${a.heure}</td><td style="font-weight:600">${a.employe}</td><td style="font-size:10px;color:var(--muted)">${a.dept}</td><td style="font-size:11px">${a.blessure}</td><td><span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:5px;padding:2px 7px;font-size:9px;font-weight:700">${a.gravite}</span></td><td><span class="badge ${a.arret==='Oui'?'br':a.arret==='Non'?'bg3':'bgr'}" style="font-size:9px">${a.arret==='Oui'?'Oui — '+a.jours+'j':a.arret}</span></td><td><span class="badge ${sc}">${a.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();accSelect('${a.id}')">Voir →</button></td></tr>`;}).join('');
      const cnt=document.getElementById('acc_cnt');
      if(cnt) cnt.textContent=filtered.length<window.acc_data.length?filtered.length+'/'+window.acc_data.length+' dossier(s)':window.acc_data.length+' dossier(s)';
    }
  };
  window.accRefresh=()=>{ goPage('sec-accidents'); };
  window.accToast=(msg,color='#0f2044')=>{
    const d=document.createElement('div');
    d.style=`position:fixed;bottom:22px;right:22px;background:${color};color:#fff;padding:11px 16px;border-radius:9px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);font-family:Inter,sans-serif`;
    d.textContent=msg;
    document.body.appendChild(d);
    setTimeout(()=>{d.style.transition='opacity .4s';d.style.opacity='0';setTimeout(()=>d.remove(),400);},2800);
  };

  return `
<style>
.acc-layout{display:flex;height:calc(100vh - 170px);overflow:hidden;margin:-16px -18px}
.acc-left{width:58%;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid var(--border)}
.acc-right{width:42%;overflow-y:auto;background:var(--white)}
.acc-filter{background:var(--white);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;gap:7px;flex-wrap:wrap;align-items:center;flex-shrink:0}
.acc-table-area{flex:1;overflow-y:auto;padding:11px 14px}
</style>

<!-- KPI ROW -->
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:13px">
  ${[['🚨',totalAcc,'Accidents','#fef2f2','var(--red)'],['⚠',incidents,'Incidents','#fff7ed','var(--orange)'],['📅',avecArret,'Avec arrêt','#fef2f2','var(--red)'],['🗓',joursTotal,'Jours perdus','#fff7ed','var(--orange)'],['📊','2.45','Taux fréquence (TF)','#eff6ff','var(--blue)'],['🟢','12','Jours sans accident','#f0fdf4','var(--green)']].map(([ic,v,l,bg,c])=>`
  <div style="background:${bg};border-radius:9px;padding:11px;text-align:center;cursor:pointer">
    <div style="font-size:15px;margin-bottom:4px">${ic}</div>
    <div style="font-size:18px;font-weight:800;color:${c};font-family:monospace;margin-bottom:2px">${v}</div>
    <div style="font-size:9px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>

<div class="acc-layout">
  <!-- LEFT -->
  <div class="acc-left">
    <div class="acc-filter">
      <input class="sel" id="acc_search" placeholder="🔍 Employé, N° dossier..." style="width:150px" oninput="accFilter()">
      <select class="sel" id="acc_fstat" onchange="accFilter()">
        <option value="">Statut: Tous</option><option>Ouvert</option><option>En cours</option><option>Clôturé</option>
      </select>
      <select class="sel" id="acc_fgrav" onchange="accFilter()">
        <option value="">Gravité: Tous</option><option>Légère</option><option>Moyenne</option><option>Grave</option><option>Mortelle</option>
      </select>
      <select class="sel" id="acc_fdept" onchange="accFilter()">
        <option value="">Département: Tous</option>
        ${['Usinage','Assemblage','Maintenance','Magasin','Bureau'].map(d=>`<option>${d}</option>`).join('')}
      </select>
      <button class="btn bsm" onclick="document.getElementById('acc_search').value='';document.getElementById('acc_fstat').value='';document.getElementById('acc_fgrav').value='';document.getElementById('acc_fdept').value='';accFilter()">✕</button>
      <span id="acc_cnt" style="font-size:10px;color:var(--muted)"></span>
    </div>
    <div class="acc-table-area">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
        <span style="font-size:12px;font-weight:700;color:var(--navy)">📋 Registre des accidents & incidents</span>
        <div style="display:flex;gap:6px">
          <button class="btn bsm bp" onclick="accNewView()">+ Déclarer un accident</button>
          <button class="btn bsm" onclick="accToast('📥 Export Excel','#16a34a')">📥 Export</button>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>N° Dossier</th><th>Type</th><th>Date</th><th>Heure</th>
          <th>Employé</th><th>Département</th><th>Blessure</th>
          <th>Gravité</th><th>Arrêt</th><th>Statut</th><th></th>
        </tr></thead>
        <tbody id="acc_tbody"></tbody>
      </table>

      <!-- MINI STATS -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:13px">
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Accidents par département</div>
          ${['Usinage','Assemblage','Maintenance','Magasin'].map(d=>{
            const cnt=window.acc_data.filter(a=>a.dept===d).length;
            const pct=Math.round(cnt/Math.max(window.acc_data.length,1)*100);
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${d}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--red);border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:var(--red);width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Par gravité</div>
          ${[['Grave','var(--red)'],['Moyenne','var(--orange)'],['Légère','var(--green)'],['—','var(--muted)']].map(([g,c])=>{
            const cnt=window.acc_data.filter(a=>a.gravite===g).length;
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${g}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(cnt/Math.max(window.acc_data.length,1)*100)}%;background:${c};border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:${c};width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Par statut</div>
          ${[['Ouvert','var(--blue)'],['En cours','var(--orange)'],['Clôturé','var(--green)']].map(([s,c])=>{
            const cnt=window.acc_data.filter(a=>a.statut===s).length;
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${s}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(cnt/Math.max(window.acc_data.length,1)*100)}%;background:${c};border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:${c};width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="acc-right" id="acc_right">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:40px">🚑</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:5px">Sélectionner un dossier</div>
      <div style="font-size:11px">Cliquez sur une ligne pour voir<br>la fiche et le workflow</div>
      <button onclick="accNewView()" class="btn bp bsm" style="margin-top:10px">+ Déclarer un accident</button>
    </div>
  </div>
</div>`;
},

'sec-urgence': () => `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['🔥','4',"Plans d'urgence actifs",'#fef2f2','var(--red)'],['🚒','3/5','Exercices réalisés 2025','#f0fdf4','var(--green)'],['📞','6',"Contacts d'urgence",'#eff6ff','var(--blue)'],['📅','2','Exercices planifiés','#fff7ed','var(--orange)']].map(([ic,v,l,bg,c])=>`<div style="background:${bg};border-radius:9px;padding:12px;text-align:center"><div style="font-size:20px;margin-bottom:5px">${ic}</div><div style="font-size:20px;font-weight:700;color:${c};margin-bottom:2px">${v}</div><div style="font-size:9.5px;color:var(--muted)">${l}</div></div>`).join('')}
</div>
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📋 Registre des plans d'urgence</span><button class="btn bp bsm">+ Nouveau plan</button></div>
      <table class="tbl">
        <thead><tr><th>Code</th><th>Titre du plan</th><th>Type</th><th>Création</th><th>Version</th><th>Validé par</th><th>Statut</th><th></th></tr></thead>
        <tbody>${[["PU-INC-01","Plan d'incendie",'Incendie','01/01/2025','V2','Dir. HSE','Validé'],["PU-EVA-01","Plan d'évacuation",'Évacuation','01/01/2025','V1','Dir. HSE','Validé'],['PU-ACC-01','Plan accident chimique','Chimique','15/02/2025','V1','HSE','En révision'],['PU-SIS-01','Plan de séisme','Séisme','10/05/2025','V1','Dir.','Validé'],['PU-ELE-01','Risque électrique','Électrique','20/03/2025','V2','HSE + Maint.','Validé']].map(([c,n,t,d,v,resp,s])=>`<tr>
          <td style="color:var(--blue);font-weight:700;font-family:monospace;font-size:10px">${c}</td><td style="font-weight:500">${n}</td>
          <td><span class="badge ${t==='Incendie'?'br':t==='Évacuation'?'bo':t==='Chimique'?'by':t==='Électrique'?'by':'bb'}">${t}</span></td>
          <td style="font-size:10px;color:var(--muted)">${d}</td><td style="font-family:monospace">${v}</td><td style="font-size:10px">${resp}</td>
          <td><span class="badge ${s==='Validé'?'bg3':'by'}">${s}</span></td>
          <td><button class="btn bsm">Voir</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:11px">📅 Calendrier exercices d'urgence — 2025</div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:11px">
        ${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map((m,i)=>{
          const ex={0:'Incendie',2:'Évacuation',5:'SST',8:'Incendie',11:'Simulation'}[i];
          const done=[0,2].includes(i), planned=[5,8,11].includes(i);
          return`<div style="background:${ex?done?'#f0fdf4':planned?'#eff6ff':'var(--bg)':'var(--bg)'};border:1px solid ${ex?done?'#86efac':planned?'#93c5fd':'var(--border)':'var(--border)'};border-radius:7px;padding:7px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:${ex?done?'var(--green)':planned?'var(--blue)':'var(--muted)':'var(--muted)'}">${m}</div>
            ${ex?`<div style="font-size:8px;color:${done?'var(--green)':planned?'var(--blue)':'var(--muted)'};margin-top:2px;line-height:1.2">${ex}</div><div style="font-size:10px;margin-top:2px">${done?'✅':'📅'}</div>`:`<div style="font-size:9px;color:var(--muted);margin-top:3px">—</div>`}
          </div>`;
        }).join('')}
      </div>
      <table class="tbl">
        <thead><tr><th>Exercice</th><th>Type</th><th>Date prévue</th><th>Responsable</th><th>Participants</th><th>Statut</th><th>Résultat</th></tr></thead>
        <tbody>${[["Exercice incendie Bât. A",'Incendie','15/01/2025','HSE','45','Réalisé','Conforme'],["Exercice évacuation générale",'Évacuation','20/03/2025','HSE','120','Réalisé','Observation'],["Formation 1ers secours",'SST / PRAP','10/06/2025','Infirmière','12','Planifié','—'],["Exercice incendie Bât. B",'Incendie','15/09/2025','HSE','60','Planifié','—'],["Simulation urgence annuelle",'Multi-risques','10/12/2025','Dir. + HSE','150','Planifié','—']].map(([n,t,d,r,p,s,res])=>`<tr>
          <td style="font-weight:500">${n}</td>
          <td><span class="badge ${t.includes('Incendie')?'br':t.includes('Évacuation')?'bo':t.includes('SST')?'bb':'by'}">${t}</span></td>
          <td style="font-size:10px">${d}</td><td style="font-size:10px">${r}</td><td style="font-family:monospace;text-align:center">${p}</td>
          <td><span class="badge ${s==='Réalisé'?'bg3':s==='Planifié'?'bb':'bo'}">${s}</span></td>
          <td>${res==='—'?`<span style="color:var(--muted)">—</span>`:`<span class="badge ${res==='Conforme'?'bg3':'bo'}">${res}</span>`}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>
  <div>
    <div class="card" style="border-left:3px solid var(--red)">
      <div class="ch"><span class="ct">🔥 PU-INC-01 — Plan d'incendie</span><span class="badge bg3">Validé — V2</span></div>
      ${[["Objectif","Définir procédures en cas d'incendie et protection des biens"],["Champ application","Tous les ateliers et bureaux XPERT-MECA"],['Responsable plan','A. Hadj-Ali — Responsable HSE'],['Approbateur','Directeur Général'],['Date mise à jour','01/01/2025'],['Version','V2'],['Prochaine révision','01/01/2026']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
      <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin:9px 0 6px">Procédures clés</div>
      ${["1. Déclencher l'alarme incendie immédiatement","2. Appeler le 18 (Pompiers) et le 15 (SAMU)","3. Guider l'évacuation vers les sorties de secours","4. Rejoindre le point de rassemblement (Parking A)","5. Ne jamais utiliser les ascenseurs","6. Prévenir le Responsable HSE et Directeur"].map(p=>`<div style="font-size:10.5px;padding:4px 0;border-bottom:1px solid var(--border);display:flex;gap:5px"><span style="color:var(--blue);font-weight:700;flex-shrink:0">›</span>${p}</div>`).join('')}
      <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin:9px 0 6px">Équipements d'urgence</div>
      ${[["Extincteurs","28 unités — vérifiés 15/05"],["RIA","6 unités — conformes"],["Détecteurs de fumée","42 unités — testés"],["Issues de secours","12 sorties balisées"],["Point rassemblement","Parking A — balisé"]].map(([k,v])=>`<div class="drow"><span style="font-weight:500">${k}</span><span style="font-size:10px;color:var(--green)">✓ ${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">✏ Modifier</button><button class="btn bp" style="flex:1">📄 PDF</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📞 Contacts d'urgence</div>
      ${[["🚒 Pompiers",'18','Urgence'],["🚑 SAMU",'15','Urgence'],["👮 Police",'17','Urgence'],["🛡 HSE — A. Hadj-Ali",'06 12 34 56 78','Interne'],["👤 Directeur Général",'06 98 76 54 32','Interne'],["🏥 Infirmière de site",'Poste 102','Interne'],["⚡ Maintenance",'Poste 210','Interne']].map(([n,t,c])=>`<div class="drow"><div><div style="font-weight:500;font-size:11px">${n}</div><div style="font-size:9.5px;color:var(--muted)">${c}</div></div><span style="font-weight:700;color:var(--blue);font-family:monospace;font-size:12px">${t}</span></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-actions': () => {
  if(!window.secActView) window.secActView='kanban';
  const view = window.secActView;
  const fResp = window.secActFResp||'Tous';
  const fType = window.secActFType||'Tous';
  const fPrio = window.secActFPrio||'Tous';
  const fQ = window.secActFQ||'';

  let data = window.SEC_ACTIONS.filter(a=>{
    if(fResp!=='Tous'&&a.resp!==fResp) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fQ&&![a.action,a.source,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=window.SEC_ACTIONS.length, done=window.SEC_ACTIONS.filter(a=>a.statut==='Clôturée').length,
    enCours=window.SEC_ACTIONS.filter(a=>a.statut==='En cours').length,
    retard=window.SEC_ACTIONS.filter(a=>a.statut==='En retard').length,
    avgProg=Math.round(window.SEC_ACTIONS.reduce((s,a)=>s+a.prog,0)/Math.max(window.SEC_ACTIONS.length,1));

  const resps=[...new Set(window.SEC_ACTIONS.map(a=>a.resp))];
  const types=[...new Set(window.SEC_ACTIONS.map(a=>a.type))];

  const typeColor = {Technique:'#eff6ff',Formation:'#f5f3ff',Documentation:'#fff7ed',Inspection:'#f0fdf4',Équipement:'#fef3c7',Exercice:'#fef2f2',Administratif:'#f1f5f9'};
  const typeText = {Technique:'#1e40af',Formation:'#7c3aed',Documentation:'#c2410c',Inspection:'#15803d',Équipement:'#92400e',Exercice:'#991b1b',Administratif:'#475569'};

  const statBtn = (a,s) => `<button onclick="changeStatut('SEC_ACTIONS',${a.id},'${s}','sec-actions')" style="font-size:8.5px;padding:2px 7px;border:1px solid ${a.statut===s?ACT_COL_COLOR[s]:'var(--border)'};border-radius:4px;background:${a.statut===s?ACT_COL_COLOR[s]+'18':'#fff'};color:${a.statut===s?ACT_COL_COLOR[s]:'var(--muted)'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${a.statut===s?'700':'400'};transition:.12s">${s}</button>`;

  const card = (a) => `
  <div style="background:#fff;border:1px solid var(--border);border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#ea580c':'#94a3b8'};border-radius:9px;padding:11px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:.15s" onmouseover="this.style.boxShadow='0 4px 14px rgba(0,0,0,.09)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)'">
    <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
      <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:var(--navy);line-height:1.35;margin-bottom:3px">${a.action}</div><div style="font-size:9.5px;color:var(--muted);line-height:1.4">${a.desc}</div></div>
      <button onclick="deleteAction('SEC_ACTIONS',${a.id},'sec-actions')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:14px;line-height:1;flex-shrink:0;padding:0" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='#d1d5db'">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      <span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span>
      <span style="padding:2px 7px;border-radius:5px;font-size:8.5px;font-weight:600;background:${typeColor[a.type]||'#f1f5f9'};color:${typeText[a.type]||'#64748b'};border:1px solid ${typeColor[a.type]||'#f1f5f9'}">${a.type}</span>
      <span class="badge bgr" style="font-size:8.5px">${a.source}</span>
    </div>
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:3px"><span>Progression</span><span id="prog-val-${a.id}" style="font-weight:700;color:${a.prog===100?'var(--green)':a.prog>0?'var(--orange)':'var(--muted)'}">${a.prog}%</span></div>
      <input type="range" min="0" max="100" value="${a.prog}" oninput="updateProg('SEC_ACTIONS',${a.id},this.value,'sec-actions')" onchange="document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="width:100%;accent-color:${a.prog===100?'#16a34a':'#ea580c'};height:4px;cursor:pointer">
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:9.5px;color:var(--muted)"><span>👤 ${a.resp}</span><span style="color:${a.statut==='En retard'?'var(--red)':'var(--muted)'}">⏰ ${a.fin}${a.statut==='En retard'?' 🚨':''}</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
  </div>`;

  return `
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:12px">
    ${[['Total',total,'var(--blue)','🎯'],['En cours',enCours,'var(--orange)','⚡'],['En retard',retard,'var(--red)','⏰'],['Clôturées',done,'var(--green)','✅'],['À faire',window.SEC_ACTIONS.filter(a=>a.statut==='À faire').length,'var(--muted)','📋'],['Avancement',avgProg+'%','#7c3aed','📊']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:10px 11px;display:flex;align-items:center;gap:8px">
      <span style="font-size:16px">${ic}</span><div><div style="font-size:18px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:9px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Toolbar -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:160px">
        <span style="color:var(--muted)">🔍</span>
        <input placeholder="Rechercher action, source, responsable…" value="${fQ}" oninput="window.secActFQ=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="border:none;background:transparent;font-size:11px;outline:none;width:100%;font-family:'Inter',sans-serif">
      </div>
      <select class="sel" onchange="window.secActFResp=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Resp. : Tous</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}</select>
      <select class="sel" onchange="window.secActFType=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}</select>
      <select class="sel" onchange="window.secActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Priorité : Toutes</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}</select>
      <button class="btn bsm" onclick="window.secActFResp='Tous';window.secActFType='Tous';window.secActFPrio='Tous';window.secActFQ='';document.getElementById('content').innerHTML=PAGES['sec-actions']()">✕ Reset</button>
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden;margin-left:auto">
        <button onclick="window.secActView='kanban';document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='kanban'?'var(--blue)':'transparent'};color:${view==='kanban'?'#fff':'var(--muted)'};transition:.15s">⬛ Kanban</button>
        <button onclick="window.secActView='liste';document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='liste'?'var(--blue)':'transparent'};color:${view==='liste'?'#fff':'var(--muted)'};transition:.15s">≡ Liste</button>
      </div>
      <button class="btn bp bsm" onclick="showAddActionModal('SEC_ACTIONS','sec-actions')">+ Nouvelle action</button>
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
    <table class="tbl" style="min-width:850px"><thead><tr><th>Action SST</th><th>Type</th><th>Source</th><th>Responsable</th><th>Priorité</th><th>Fin prévue</th><th>Statut</th><th>Progression</th><th>Changer statut</th></tr></thead>
    <tbody>${data.map(a=>`<tr>
      <td style="font-weight:600;font-size:11px">${a.action}</td>
      <td><span style="padding:2px 7px;border-radius:5px;font-size:8.5px;font-weight:600;background:${typeColor[a.type]||'#f1f5f9'};color:${typeText[a.type]||'#64748b'}">${a.type}</span></td>
      <td style="font-size:10px;color:var(--muted)">${a.source}</td>
      <td style="font-size:10.5px">${a.resp}</td>
      <td><span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span></td>
      <td style="font-size:10px" class="${a.statut==='En retard'?'td-red':''}">${a.fin}${a.statut==='En retard'?' 🚨':''}</td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td><div style="display:flex;align-items:center;gap:5px"><div class="prog"><div class="pf" style="width:${a.prog}%;background:${a.prog===100?'var(--green)':a.prog>0?'var(--yellow)':'#888'}"></div></div><span style="font-size:10px;font-weight:600">${a.prog}%</span></div></td>
      <td><select onchange="changeStatut('SEC_ACTIONS',${a.id},this.value,'sec-actions')" class="sel" style="font-size:10px;padding:3px 6px">${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}</select></td>
    </tr>`).join('')}</tbody></table>
  </div></div>`}`;
},

'sec-docs': () => `
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📄 Registre documentaire SST</span><button class="btn bp bsm">+ Nouveau document</button></div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
        <select class="sel"><option>Catégorie: Toutes</option><option>Sécurité</option><option>Procédure</option><option>Plan urgence</option></select>
        <select class="sel"><option>Statut: Tous</option><option>Validé</option><option>En révision</option><option>Archivé</option></select>
        <input class="sel" placeholder="🔍 Rechercher..." style="width:140px">
      </div>
      <table class="tbl">
        <thead><tr><th>Code</th><th>Nom du document</th><th>Catégorie</th><th>Type</th><th>Version</th><th>Auteur</th><th>Date MAJ</th><th>Statut</th><th>Validation</th><th></th></tr></thead>
        <tbody>${[['SST-PR-001','Procédure travail en hauteur','Sécurité','Procédure','V2','A. Hadj-Ali','10/05/2025','Validé','Dir. Qualité'],['SST-IN-002','Consignes machine CN','Sécurité','Instruction','V1','Ali M.','05/05/2025','Validé','HSE'],['SST-FP-003','Fiche poste opérateur','RH / SST','Fiche','V1','RH','01/05/2025','Validé','HSE + RH'],['SST-PU-001','Plan prévention incendie','Plan urgence','Plan','V2','HSE','01/01/2025','Validé','Dir. Général'],['SST-PR-005','Procédure urgence chimique','Sécurité','Procédure','V1','HSE','15/02/2025','En révision','En attente'],['SST-IN-006','Guide utilisation EPI','Équipements','Instruction','V2','HSE','20/04/2025','Validé','HSE'],['SST-CL-007','Checklist extincteurs v1','Sécurité incendie','Checklist','V1','HSE','01/01/2025','Archivé','—'],['SST-CL-008','Checklist extincteurs v2','Sécurité incendie','Checklist','V2','HSE','01/03/2025','Validé','HSE']].map(([code,n,cat,t,v,a,d,s,val])=>`<tr>
          <td style="color:var(--blue);font-weight:700;font-family:monospace;font-size:10px">${code}</td>
          <td style="font-weight:500">${n}</td><td style="font-size:10px;color:var(--muted)">${cat}</td><td style="font-size:10px">${t}</td>
          <td style="font-family:monospace">${v}</td><td style="font-size:10px">${a}</td><td style="font-size:10px">${d}</td>
          <td><span class="badge ${s==='Validé'?'bg3':s==='En révision'?'by':s==='Archivé'?'bgr':'bb'}">${s}</span></td>
          <td style="font-size:10px">${val}</td>
          <td style="display:flex;gap:3px"><button class="btn bsm">👁</button><button class="btn bsm">📥</button><button class="btn bsm">✏</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🕑 Historique de révisions — SST-CL-008 / Checklist Extincteurs</div>
      ${[['V2 (Actuelle)','02/03/2025','A. Hadj-Ali','Ajout point N°9 — Fiche signalétique · Mise à jour fréquence à mensuelle','Validé'],['V1','01/01/2025','A. Hadj-Ali','Version initiale — 8 points de contrôle','Archivé']].map(([v,d,a,m,s])=>`<div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--border)"><div style="flex-shrink:0"><div style="font-family:monospace;font-size:11px;font-weight:700;color:var(--blue)">${v}</div><div style="font-size:9px;color:var(--muted)">${d}</div></div><div style="flex:1"><div style="font-size:10.5px;font-weight:600;margin-bottom:3px">👤 ${a}</div><div style="font-size:10px;color:var(--muted)">${m}</div></div><div><span class="badge ${s==='Validé'?'bg3':'bgr'}">${s}</span></div></div>`).join('')}
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">👁 Aperçu — SST-PR-001</div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:20px;text-align:center;height:180px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:7px">
        <div style="font-size:36px">📄</div>
        <div style="font-weight:600;color:var(--navy)">Procédure travail en hauteur</div>
        <div style="font-size:10px">SST-PR-001 — V2 — 10/05/2025</div>
        <div style="font-size:10px;color:var(--muted)">PDF · 2,4 Mo · 12 pages</div>
        <div style="display:flex;gap:8px;margin-top:4px"><button class="btn bsm bp">📥 Télécharger</button><button class="btn bsm">👁 Prévisualiser</button></div>
      </div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🔄 Workflow de validation</div>
      <div style="display:flex;align-items:center;margin-bottom:10px">
        ${['Rédaction','Révision','Approbation','Publication'].map((l,i)=>`
        ${i>0?`<div style="flex:1;height:2px;background:${i<3?'var(--green)':'#e5e7eb'}"></div>`:''}
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:26px;height:26px;border-radius:50%;background:${i<3?'var(--green)':i===3?'var(--blue)':'#e5e7eb'};color:${i<=3?'#fff':'var(--muted)'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${i<3?'✓':i+1}</div>
          <div style="font-size:8px;color:var(--muted);margin-top:2px;white-space:nowrap">${l}</div>
        </div>`).join('')}
      </div>
      ${[['Rédigé par','A. Hadj-Ali — HSE'],['Révisé par','Karim Saïd — Qualité'],['Approuvé par','Dir. Qualité — ✓'],['Statut actuel','Validé et publié']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">✏ Réviser</button><button class="btn bg2" style="flex:1">✓ Valider</button><button class="btn" style="flex:1">📁 Archiver</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📊 Statistiques documentaires</div>
      ${[['Validés','18','var(--green)'],['En révision','3','var(--orange)'],['Brouillons','2','var(--muted)'],['Archivés','7','#94a3b8'],['Total','30','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><div style="display:flex;align-items:center;gap:7px"><div style="width:70px;height:5px;background:#e5e7eb;border-radius:2px;overflow:hidden"><div style="height:100%;width:${parseInt(v)/30*100}%;background:${c};border-radius:2px"></div></div><span style="font-weight:700;color:${c};font-family:monospace;font-size:11px">${v}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-kpi': () => `
<div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;flex-wrap:wrap">
  <select class="sel"><option>Période: Ce mois (Mai 2026)</option><option>Mois précédent</option><option>Trimestre</option><option>Année</option></select>
  <select class="sel"><option>Comparer à: Mois précédent</option><option>Même mois N-1</option></select>
  <button class="btn bp bsm">Actualiser</button>
  <button class="btn bsm" style="margin-left:auto">📥 Exporter Excel</button>
  <button class="btn bp bsm">📄 Rapport PDF</button>
</div>

<!-- ════ BLOC OBJECTIFS SST ════ -->
<div class="card" style="margin-bottom:13px;border-top:3px solid #dc2626">
  <div class="ch">
    <div>
      <span class="ct">🎯 Objectifs Sécurité SST — Suivi mensuel</span>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Fréquence de suivi : <strong>Mensuelle</strong> · Période : Mai 2026 · Référentiel : ISO 45001</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <span style="background:#f0fdf4;color:#065f46;border:1px solid #bbf7d0;border-radius:5px;padding:3px 9px;font-size:10px;font-weight:700">4/5 Objectifs atteints ✓</span>
      <button class="btn bsm">📥 Exporter</button>
    </div>
  </div>

  <!-- Tableau des objectifs -->
  <table class="tbl" style="margin-bottom:14px">
    <thead>
      <tr>
        <th style="width:32px">N°</th>
        <th>Indicateur de sécurité</th>
        <th style="text-align:center;width:80px">Objectif</th>
        <th style="text-align:center;width:80px">Réalisé</th>
        <th style="text-align:center;width:90px">Fréquence</th>
        <th style="width:110px">Progression</th>
        <th style="text-align:center;width:80px">Statut</th>
        <th style="width:120px">Tendance / Action</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fffbeb">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">01</td>
        <td>
          <div style="font-weight:600;font-size:11px">🟡 Accidents de travail de faible gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures légères — Soins sans arrêt de travail</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#92400e">2</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#d97706">2</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden;position:relative">
              <div style="height:100%;width:100%;background:#d97706;border-radius:4px"></div>
              <div style="position:absolute;top:0;bottom:0;left:100%;width:2px;background:var(--navy);z-index:2"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:#d97706;white-space:nowrap">2 / Obj 2</span>
          </div>
        </td>
        <td style="text-align:center"><span style="background:#fffbeb;color:#92400e;border:1px solid #fde68a;border-radius:5px;padding:2px 8px;font-size:9px;font-weight:700">⚠ Limite atteinte</span></td>
        <td><span style="font-size:9.5px;color:#92400e;font-weight:500">→ Surveillance renforcée</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">02</td>
        <td>
          <div style="font-weight:600;font-size:11px">🟠 Accidents de travail de moyenne gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures avec arrêt de travail court (&lt; 30 jours)</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">03</td>
        <td>
          <div style="font-weight:600;font-size:11px">🔴 Accidents de travail de forte gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures graves — Arrêt long / Invalidité / Décès</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">04</td>
        <td>
          <div style="font-weight:600;font-size:11px">🔥 Accidents d'incendie</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Tout départ de feu ou sinistre incendie sur site</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">05</td>
        <td>
          <div style="font-weight:600;font-size:11px">☣ Accidents de déversement de produits dangereux</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Tout déversement accidentel de produit chimique / dangereux</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
    </tbody>
  </table>

  <!-- Légende + synthèse visuelle -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
    <!-- Scorecard global -->
    <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #86efac;border-radius:9px;padding:12px;text-align:center">
      <div style="font-size:10px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Score global objectifs</div>
      <div style="font-size:30px;font-weight:700;color:#16a34a;font-family:monospace;line-height:1">4/5</div>
      <div style="font-size:9px;color:#065f46;margin-top:2px;margin-bottom:8px">Objectifs atteints ce mois</div>
      <div style="height:7px;background:rgba(255,255,255,.6);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:80%;background:#16a34a;border-radius:4px"></div>
      </div>
      <div style="font-size:9px;color:#065f46;margin-top:3px;font-weight:700">80% de conformité</div>
    </div>
    <!-- Synthèse par catégorie -->
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:12px">
      <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Synthèse par niveau de gravité</div>
      ${[['🟡 Faible gravité','2 / Obj 2','Limite atteinte','#d97706','#fffbeb'],['🟠 Moyenne gravité','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['🔴 Forte gravité','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['🔥 Incendie','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['☣ Déversement','0 / Obj 0','Conforme','#16a34a','#f0fdf4']].map(([l,v,s,c,bg])=>`
      <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:10px;flex:1">${l}</span>
        <span style="font-family:monospace;font-size:10px;font-weight:700;color:${c}">${v}</span>
        <span style="background:${bg};color:${c};border-radius:4px;padding:1px 6px;font-size:8.5px;font-weight:700">${s}</span>
      </div>`).join('')}
    </div>
    <!-- Alertes & actions -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:9px;padding:12px">
      <div style="font-size:10px;font-weight:700;color:#92400e;margin-bottom:8px">⚠ Points de vigilance</div>
      <div style="padding:7px;background:#fff;border-radius:6px;border-left:3px solid #d97706;margin-bottom:7px">
        <div style="font-size:10px;font-weight:700;color:#92400e">Accidents faible gravité à la limite</div>
        <div style="font-size:9.5px;color:var(--muted);margin-top:2px">2 accidents enregistrés = objectif max.<br>Tout nouvel accident dépasserait l'objectif.</div>
      </div>
      <div style="font-size:9.5px;color:#065f46;font-weight:600;margin-bottom:4px">✅ Points positifs :</div>
      <div style="font-size:9.5px;color:var(--muted)">• 0 accident grave / mortel<br>• 0 incendie sur site<br>• 0 déversement dangereux<br>• 4 objectifs sur 5 atteints</div>
    </div>
  </div>
</div>

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['#eff6ff','#bfdbfe','#1e40af','📐','2.45','Taux de fréquence (TF)','+12% vs N-1'],['#f5f3ff','#ddd6fe','#5b21b6','📏','0.78','Taux de gravité (TG)','-3% vs N-1'],['#fef2f2','#fecaca','#991b1b','🚨','3','Accidents avec arrêt','-33% vs N-1'],['#fff7ed','#fed7aa','#9a3412','⚠','7',"Incidents & presque-acc.",'+17% vs N-1'],['#f0fdf4','#bbf7d0','#065f46','📅','12','Jours sans accident','+9% vs N-1'],['#eff6ff','#bfdbfe','#1e40af','✅','18/26','Checklists réalisées','Taux 69%'],['#f0fdf4','#bbf7d0','#065f46','🎯','87%','Conformité sécurité','+3% vs N-1'],['#fff7ed','#fed7aa','#9a3412','🚒','3/5',"Exercices d'urgence",'60% réalisés']].map(([bg,bc,tc,ic,v,l,t])=>`
  <div style="background:${bg};border:1px solid ${bc};border-radius:9px;padding:12px;position:relative;overflow:hidden">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px">
      <div style="font-size:14px">${ic}</div>
      <div style="font-size:9px;font-weight:600;color:${tc}">${t}</div>
    </div>
    <div style="font-size:20px;font-weight:700;color:${tc};font-family:monospace;margin-bottom:2px">${v}</div>
    <div style="font-size:9.5px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>
<div class="g2" style="margin-bottom:12px">
  <div class="card">
    <div class="ch"><span class="ct">📈 Évolution TF & TG — 12 mois glissants</span></div>
    <svg width="100%" height="110" viewBox="0 0 500 110">
      <defs><linearGradient id="gtf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb" stop-opacity=".15"/><stop offset="100%" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>
      ${[0,30,60,90].map(y=>`<line x1="35" y1="${10+y}" x2="490" y2="${10+y}" stroke="#dde4ef" stroke-width="1"/>`).join('')}
      ${[3,2,1,0].map((v,i)=>`<text x="30" y="${14+i*30}" text-anchor="end" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${v}</text>`).join('')}
      ${['J','F','M','A','M','J','J','A','S','O','N','D'].map((m,i)=>`<text x="${48+i*38}" y="107" text-anchor="middle" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${m}</text>`).join('')}
      <path d="M48,70 L86,75 L124,50 L162,65 L200,55 L238,80 L276,70 L314,55 L352,65 L390,70 L428,60 L466,55 L466,100 L48,100Z" fill="url(#gtf2)"/>
      <polyline points="48,70 86,75 124,50 162,65 200,55 238,80 276,70 314,55 352,65 390,70 428,60 466,55" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
      <polyline points="48,85 86,90 124,80 162,88 200,78 238,92 276,85 314,78 352,85 390,90 428,82 466,78" fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,2"/>
      ${[[48,70],[86,75],[124,50],[162,65],[200,55],[238,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#2563eb" stroke="white" stroke-width="1.5"/>`).join('')}
    </svg>
    <div style="display:flex;gap:14px;justify-content:center;margin-top:5px">
      <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#2563eb"></div>TF (Taux fréquence)</div>
      <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#7c3aed;border-top:2px dashed #7c3aed"></div>TG (Taux gravité)</div>
    </div>
  </div>
  <div class="card">
    <div class="ch"><span class="ct">🎯 Taux de réalisation des checklists</span></div>
    <div style="display:flex;justify-content:center;align-items:center;gap:20px;padding:10px 0">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="46" fill="none" stroke="#e5e7eb" stroke-width="15"/>
        <circle cx="60" cy="60" r="46" fill="none" stroke="#16a34a" stroke-width="15" stroke-dasharray="${2*Math.PI*46*.69} ${2*Math.PI*46}" stroke-dashoffset="${2*Math.PI*46*.25}" stroke-linecap="round"/>
        <circle cx="60" cy="60" r="46" fill="none" stroke="#dc2626" stroke-width="15" stroke-dasharray="${2*Math.PI*46*.31} ${2*Math.PI*46}" stroke-dashoffset="${-2*Math.PI*46*.44}" stroke-linecap="round"/>
        <text x="60" y="56" text-anchor="middle" font-size="11" fill="#6b7a99" font-family="Inter,sans-serif">Réalisées</text>
        <text x="60" y="72" text-anchor="middle" font-size="20" font-weight="700" fill="#0f2044" font-family="monospace">69%</text>
      </svg>
      <div>
        ${[['Réalisées','18','#16a34a'],['Non réalisées','8','#dc2626'],['En cours','0','#6b7a99']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px"><div style="width:9px;height:9px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:10.5px;flex:1">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
        <div style="font-size:10px;color:var(--muted);margin-top:5px">Objectif: 26 checklists / mois</div>
        <div style="margin-top:5px;height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:69%;background:var(--green);border-radius:3px"></div></div>
      </div>
    </div>
  </div>
</div>
<div class="g2">
  <div class="card">
    <div class="ct" style="margin-bottom:9px">📊 Top 5 non-conformités par checklist</div>
    ${[['Checklist Extincteurs',2,'var(--red)','35%'],['Checklist EPI',2,'var(--orange)','35%'],['Checklist Pharmacie',1,'var(--orange)','18%'],['Checklist Véhicule',1,'var(--yellow)','18%'],['Checklist SST',0,'var(--green)','0%']].map(([n,v,c,p],i)=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><span style="font-size:10px;color:var(--muted);width:14px;font-weight:700">${i+1}</span><span style="flex:1;font-weight:500;font-size:11px">${n}</span><div style="width:80px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${p};background:${c};border-radius:3px"></div></div><span style="font-weight:700;color:${c};font-size:11px;font-family:monospace;width:16px;text-align:right">${v}</span></div>`).join('')}
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">🎯 Indicateurs clés vs objectifs</div>
    <table class="tbl">
      <thead><tr><th>Indicateur</th><th>Réalisé</th><th>Objectif</th><th>Écart</th><th>Tendance</th></tr></thead>
      <tbody>${[['TF (Taux fréquence)','2.45','&lt; 2.0','+0.45','↑ Dégradé'],['TG (Taux gravité)','0.78','&lt; 1.0','-0.22','↓ Bon'],['Jours sans accident','12','&gt; 30','-18','→ À améliorer'],['Conformité SST','87%','&gt; 90%','-3%','↑ Progression'],['Exercices urgence','60%','100%','-40%','→ En cours'],['Checklists réalisées','69%','95%','-26%','↑ Progression']].map(([ind,r,obj,ec,t])=>`<tr>
        <td style="font-weight:500">${ind}</td>
        <td style="font-family:monospace;font-weight:700">${r}</td>
        <td style="color:var(--muted)">${obj}</td>
        <td style="font-weight:600;color:${ec.startsWith('+')?'var(--orange)':'var(--green)'}">${ec}</td>
        <td style="font-weight:600;color:${t.includes('Dégradé')?'var(--red)':t.includes('Bon')?'var(--green)':'var(--orange)'}">${t}</td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">🔔 Alertes prioritaires</div>
    ${[['br','🔴','Risque R-001 non traité — Criticité 24 — Atelier usinage'],['br','🔴',"Exercice évacuation Bât. B en retard — Prévu 15/04"],['bo','🟠','TF supérieur à objectif mensuel — Action corrective requise'],['bo','🟠','Checklist EPI non conforme — Gants à remplacer'],['by','🟡','Formation SST opérateurs planifiée — 25/05/2025'],['bb','🔵',"3 exercices d'urgence réalisés sur 5 prévus en 2025"]].map(([cls,ic,msg])=>`<div class="drow" style="padding:5px 0"><div style="display:flex;align-items:flex-start;gap:6px;font-size:10.5px"><span>${ic}</span><span>${msg}</span></div></div>`).join('')}
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">📊 Répartition accidents par département</div>
    <svg width="100%" height="90" viewBox="0 0 380 90">
      ${[['Usinage',3,35,'#dc2626'],['Maintenance',2,24,'#ea580c'],['Assemblage',1,12,'#2563eb'],['Logistique',1,12,'#7c3aed'],['Bureau',0,0,'#94a3b8']].map(([dep,v,pct,c],i)=>`<g transform="translate(0,${i*17})"><text x="0" y="12" font-size="10" fill="#6b7a99" font-family="Inter,sans-serif">${dep}</text><rect x="72" y="3" width="${pct*2.3}" height="9" rx="3" fill="${c}" opacity=".8"/><text x="${72+pct*2.3+5}" y="12" font-size="10" font-weight="700" fill="${c}" font-family="monospace">${v}</text></g>`).join('')}
    </svg>
  </div>
</div>`,

/* ══════════════════════════════════════
   🔥 CHECKLIST EXTINCTEURS — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-ext': () => `
${renderChecklistNav('sec-cl-ext')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#7c2d12,#c2410c);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🔥</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Extincteurs — CH-EXT-001</div><div style="font-size:10px;opacity:.75">Sécurité incendie · Mensuelle · Version V2 · Inspecteur : Ali Mohamed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">92%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">9/9</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EXT-001'],['Type extincteur','Poudre ABC'],['N° extincteur','EXT-05'],['Emplacement','Atelier Usinage — Zone 1'],['Date inspection','15/05/2025'],['Inspecteur','Ali Mohamed'],['Dernière inspection','15/04/2025'],['Prochaine inspection','15/06/2025'],['Site','XPERT-MECA']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle</span><div style="display:flex;align-items:center;gap:6px"><span class="badge bg3">8 Oui</span><span class="badge br">1 Non</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Extincteur approprié au bon endroit et bien signalisé",true,false,"Emplacement conforme au plan de sécurité",'ok'],
            [2,"Extincteur accessible — allée dégagée, hauteur correcte",true,false,"Accessible en moins de 30 secondes",'ok'],
            [3,"Instructions d'utilisation lisibles et en bon état",true,false,"Légèrement usées — à remplacer lors du prochain contrôle",'obs'],
            [4,"Goupille de sécurité bien en place et non déclenchée",true,false,"RAS",'ok'],
            [5,"Pression indicateur dans la zone verte (entre 12 et 16 bar)",true,false,"Pression correcte : 14 bar",'ok'],
            [6,"Absence de dommage visible, corrosion ou déformation",false,true,"Traces suspectes sur la base — à vérifier lors du prochain entretien",'ko'],
            [7,"Aucune obstruction du tuyau d'évacuation ou de la tête",true,false,"RAS",'ok'],
            [8,"Carte d'inspection présente et dernière visite < 12 mois",true,false,"Valide jusqu'au 06/2025",'ok'],
            [9,"Fiche signalétique disponible à proximité",true,false,"Disponible et lisible",'ok'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="q${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="q${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">${st==='ok'?'✅':st==='ko'?'🔴':'🟡'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="res" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Extincteur en bon état général. Point 6 (corrosion base) à surveiller au prochain contrôle.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo de l'extincteur</div>
      <div style="background:linear-gradient(135deg,#fff7ed,#fef2f2);border:2px dashed #fed7aa;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🧯</div>
        <div style="font-weight:600;color:#9a3412;margin-bottom:4px">EXT-05 — Poudre ABC</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Atelier Usinage — Zone 1</div>
        <button class="btn bsm">📷 Ajouter photo</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--red);margin-bottom:2px">⚠ Point 6 — Corrosion détectée</div>
        <div style="font-size:10px;color:#991b1b">Traces suspectes sur la base de l'extincteur. Surveillance requise.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé de l'inspection</div>
      ${[['Points vérifiés','9','var(--navy)'],['Conformes','8','var(--green)'],['Non-conformes','1','var(--red)'],['Observations','1','var(--orange)'],['Conformité','89%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:89%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Prochaines actions</div>
      ${[["Surveiller corrosion base",'HSE','15/06/2025','bo'],["Remplacer instructions usées",'Ali M.','15/06/2025','by'],["Prochain contrôle annuel",'HSE','15/11/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🏥 CHECKLIST PHARMACIE — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-phar': () => `
${renderChecklistNav('sec-cl-phar')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#065f46,#059669);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🏥</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Boîte de Pharmacie — CH-PHAR-001</div><div style="font-size:10px;opacity:.75">Premiers secours · Mensuelle · Version V1 · Responsable : Ahmed Samir</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">78%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">10/10</div><div style="font-size:8px;opacity:.7">Produits</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-PHAR-001'],['Emplacement','Atelier Usinage'],['Responsable','Ahmed Samir'],['Date inspection','10/04/2025'],['Dernière inspection','10/03/2025'],['Prochaine inspection','10/05/2025'],['N° pharmacie','PH-001'],['Site','XPERT-MECA'],['Statut','⚠ Observation']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">💊 Contenu de la boîte de pharmacie</span><div style="display:flex;gap:6px"><span class="badge bg3">8 OK</span><span class="badge bo">2 Alerte</span></div></div>
      <table class="tbl">
        <thead><tr><th>N°</th><th>Désignation</th><th>Catégorie</th><th style="text-align:center">Qté</th><th style="text-align:center">Qté min.</th><th>Date expiration</th><th>État</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            [1,'Compresses stériles','Pansement',10,5,'03/2027','ok','—'],
            [2,'Bandes','Pansement',4,3,'04/2027','ok','—'],
            [3,'Sparadrap','Pansement',2,1,'05/2026','ok','—'],
            [4,'Bétadine','Désinfectant',1,1,'09/2026','ok','—'],
            [5,'Alcool 70°','Désinfectant',2,1,'10/2026','ok','—'],
            [6,'Gants jetables','Protection',20,10,'—','ok','—'],
            [7,'Masques chirurgicaux','Protection',15,10,'01/2026','ok','—'],
            [8,'Pansements adhésifs','Pansement',15,10,'01/2026','alerte','🔴 Remplacer'],
            [9,'Sérum physiologique','Désinfectant',2,1,'11/2025','alerte','🔴 Remplacer'],
            [10,'Ciseaux','Matériel',1,1,'—','ok','—'],
          ].map(([n,nom,cat,qty,qmin,exp,st,action])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${nom}</td>
            <td style="font-size:10px;color:var(--muted)">${cat}</td>
            <td style="text-align:center;font-family:monospace;font-weight:700;color:${qty<qmin?'var(--red)':'var(--navy)'}">${qty}</td>
            <td style="text-align:center;font-family:monospace;color:var(--muted)">${qmin}</td>
            <td style="font-size:10px;color:${exp.includes('2025')?'var(--red)':exp==='—'?'var(--muted)':'var(--muted)'}">${exp}</td>
            <td><span class="badge ${st==='ok'?'bg3':'br'}" style="font-size:9px">${st==='ok'?'✅ OK':'⚠ Alerte'}</span></td>
            <td style="font-size:10px;color:${action.includes('Remplacer')?'var(--red)':'var(--muted)'}">
              ${action.includes('Remplacer')?`<button class="btn bsm" style="background:#fef2f2;color:var(--red);border-color:#fecaca;font-size:9px">${action}</button>`:action}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="res2" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Remplacement des éléments en alerte — pansements adhésifs et sérum physiologique périmés.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer commande</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo de la pharmacie</div>
      <div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px dashed #6ee7b7;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🏥</div>
        <div style="font-weight:600;color:#065f46;margin-bottom:4px">PH-001 — Atelier Usinage</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Dernière photo : 10/04/2025</div>
        <button class="btn bsm">📷 Mettre à jour</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Produits vérifiés','10','var(--navy)'],['Conformes','8','var(--green)'],['En alerte','2','var(--red)'],['Périmés','1','var(--red)'],['Conformité','80%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:80%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🛒 Actions de réapprovisionnement</div>
      ${[["Pansements adhésifs × 20",'HSE / Achats','15/04/2025','br'],["Sérum physiologique × 2",'HSE / Achats','15/04/2025','br'],["Vérification stock gants",'Ahmed Samir','10/05/2025','by']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   ⚙ CHECKLIST SST / MACHINES — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-sst': () => `
${renderChecklistNav('sec-cl-sst')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#1e3a8a,#1d4ed8);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">⚙</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist SST — CH-MACH-001</div><div style="font-size:10px;opacity:.75">Sécurité au travail · Mensuelle · Version V1 · Responsable : Youssef Ahmed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">92%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">8/8</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-MACH-001'],['Emplacement','Atelier Assemblage'],['Responsable','Youssef Ahmed'],['Date inspection','15/05/2025'],['Dernière inspection','15/04/2025'],['Prochaine inspection','15/06/2025'],['Zone','Zone B — Assemblage'],['Département','Production'],['Statut','✅ Validé']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle SST</span><div style="display:flex;gap:6px"><span class="badge bg3">7 Oui</span><span class="badge bo">1 RAS</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Présence d'un secouriste formé dans l'équipe",true,false,"2 secouristes formés — Ali & Karim",'ok'],
            [2,"Trousse de secours complète et accessible",true,false,"Conforme — vérifiée 15/04",'ok'],
            [3,"Affichage des consignes de premiers secours",true,false,"Affiché sur le poste B-03",'ok'],
            [4,"Numéros d'urgence affichés (15, 17, 18, N° site)",true,false,"Affichés à l'entrée et au poste",'ok'],
            [5,"Brancard disponible et en bon état",true,false,"Brancard disponible — salle de repos",'ok'],
            [6,"Zone premiers secours propre et dégagée",true,false,"RAS",'ok'],
            [7,"Registre des interventions à jour",true,false,"Dernière MAJ 13/05",'ok'],
            [8,"Exercices de premiers secours réalisés",true,false,"Exercice le 01/05/2025",'obs'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="qs${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="qs${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">${st==='ok'?'✅':st==='ko'?'🔴':'🟡'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===0?'#f0fdf4':'var(--bg)'};border:1px solid ${i===0?'#bbf7d0':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="ressst" ${i===0?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Zone SST conforme. Exercice premiers secours réalisé le 01/05.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo du poste SST</div>
      <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px dashed #93c5fd;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🛡️</div>
        <div style="font-weight:600;color:#1e40af;margin-bottom:4px">Zone SST — Bâtiment B</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Inspection : 15/05/2025</div>
        <button class="btn bsm">📷 Ajouter photo</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','8','var(--navy)'],['Conformes','7','var(--green)'],['Observations','1','var(--orange)'],['Non-conformes','0','var(--muted)'],['Conformité','92%','var(--green)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:92%;background:var(--green);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Prochaines actions</div>
      ${[["Planifier prochain exercice secours",'HSE','01/06/2025','bb'],["Vérification annuelle brancard",'Infirmière','01/07/2025','by']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🚗 CHECKLIST VÉHICULE — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-veh': () => `
${renderChecklistNav('sec-cl-veh')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#374151,#1f2937);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🚗</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Véhicule — CH-VEH-001</div><div style="font-size:10px;opacity:.75">Transport · Hebdomadaire · Version V3 · Conducteur : Karim Saïd</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">65%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700;color:#fbbf24">⚠</div><div style="font-size:8px;opacity:.7">En révision</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-VEH-001'],['Véhicule','123 uuu 4667'],['Conducteur','Karim Saïd'],['Département','Logistique'],['Kilométrage','58 450 km'],['Date inspection','15/05/2025'],['Dernière inspection','10/04/2025'],['Prochaine inspection','15/05/2025'],['Statut','⚠ En révision']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">🔧 Contrôles techniques</span><div style="display:flex;gap:6px"><span class="badge bg3">12 OK</span><span class="badge br">1 À vérifier</span></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--border);border-radius:8px;overflow:hidden">
        ${[
          ['Pneus (état et pression)',true,false,'ok'],['Freins',true,false,'ok'],
          ['Éclairage (phares, feux stop, clignotants)',true,false,'ok'],['Klaxon',true,false,'ok'],
          ['Niveau huile moteur',true,false,'ok'],['Niveau liquide refroidissement',true,false,'ok'],
          ['Essuie-glaces',true,false,'ok'],['Ceintures de sécurité',true,false,'ok'],
          ['Rétroviseurs',true,false,'ok'],['Trousse de secours',true,false,'ok'],
          ['Extincteur',true,false,'ok'],['Batterie',false,true,'ko'],
          ['Clignotants',true,false,'ok'],
        ].map(([e,ou,non,st],i)=>`<div style="padding:7px 10px;border-right:${i%2===0?'1px solid var(--border)':'none'};border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:${st==='ko'?'#fef2f2':''}">
          <span style="font-size:10.5px;font-weight:${st==='ko'?'700':''};color:${st==='ko'?'var(--red)':'var(--navy)'}">${e}</span>
          <div style="display:flex;gap:4px;align-items:center">
            ${ou?`<span style="background:#dcfce7;border-radius:4px;padding:2px 7px;font-size:9px;color:var(--green);font-weight:700">✓ Oui</span>`:
              `<span style="background:#fee2e2;border-radius:4px;padding:2px 7px;font-size:9px;color:var(--red);font-weight:700;display:flex;align-items:center;gap:3px">✗ Non <span style="font-size:8px">⚠ À vérifier</span></span>`}
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">📄 Documents administratifs</span></div>
      ${[['Assurance valide','Oui','Échéance 12/12/2025','bg3'],['Visite technique valide','Oui','Échéance 20/09/2025','bg3'],['Carte grise disponible','Oui','OK','bg3'],['Permis conducteur valide','Oui','Validité 2028','bg3']].map(([doc,v,detail,sc])=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)"><span style="font-weight:500;font-size:11px">${doc}</span><div style="display:flex;align-items:center;gap:6px"><span class="badge ${sc}">${v}</span><span style="font-size:10px;color:var(--muted)">${detail}</span></div></div>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:11px;padding-top:11px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resveh" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Batterie à vérifier. Contrôle préventif recommandé avant prochain départ.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Bloquer véhicule</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo du véhicule</div>
      <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border:2px dashed #cbd5e1;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🚐</div>
        <div style="font-weight:600;color:#374151;margin-bottom:4px">123 uuu 4667</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Logistique · 58 450 km</div>
        <button class="btn bsm">📷 Voir les 4 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--yellow);margin-bottom:2px">⚠ Batterie — À vérifier</div>
        <div style="font-size:10px;color:#92400e">Vérifier et remplacer si nécessaire avant le prochain trajet.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','13','var(--navy)'],['Conformes','12','var(--green)'],['À vérifier','1','var(--orange)'],['Non-conformes','0','var(--muted)'],['Conformité','92%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:92%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🔧 Actions maintenance</div>
      ${[["Vérification batterie",'Maintenance','20/05/2025','br'],["Prochain entretien kilométrique",'Maintenance','60000 km','by'],["Contrôle technique",'Logistique','20/09/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🦺 CHECKLIST EPI — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-epi': () => `
${renderChecklistNav('sec-cl-epi')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#d97706,#b45309);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🦺</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist EPI — CH-EPI-001</div><div style="font-size:10px;opacity:.75">Équipements de protection individuelle · Mensuelle · Version V2 · Responsable : Ali Mohamed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">82%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">7/7</div><div style="font-size:8px;opacity:.7">EPI</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EPI-001'],['Département','Atelier Usinage'],['Poste','Opérateur CN'],['Responsable','Ali Mohamed'],['Date inspection','15/05/2025'],['Dernière inspection','08/04/2025'],['Prochaine inspection','08/06/2025'],['Risques couverts','Coupure, Bruit, Projection'],['Statut','⚠ Observation']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">🦺 Équipements de protection individuelle</span><div style="display:flex;gap:6px"><span class="badge bg3">6 OK</span><span class="badge br">1 Alerte</span></div></div>
      <table class="tbl">
        <thead>
          <tr><th>N°</th><th>EPI</th><th style="text-align:center">Obligatoire</th><th style="text-align:center">Disponible</th><th style="text-align:center">Bon état</th><th style="text-align:center">Conforme</th><th>Date validité</th><th>État</th><th>Action</th></tr>
        </thead>
        <tbody>
          ${[
            [1,'🪖 Casque de sécurité','Oui','Oui','Oui','Oui','06/2026','ok','—'],
            [2,'🥽 Lunettes de protection','Oui','Oui','Oui','Oui','09/2025','ok','—'],
            [3,'🧤 Gants de protection','Oui','Oui','Non','Oui','—','alerte','🔴 Remplacer'],
            [4,'👟 Chaussures de sécurité','Oui','Oui','Oui','Oui','12/2025','ok','—'],
            [5,'🎧 Protection auditive','Non','Non','—','—','—','ok','—'],
            [6,'😷 Masque anti-poussière','Non','Oui','Oui','Oui','03/2026','ok','—'],
            [7,'🦺 Gilet haute visibilité','Oui','Oui','Oui','Oui','—','ok','—'],
          ].map(([n,epi,ob,di,be,co,exp,st,action])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${epi}</td>
            <td style="text-align:center"><span class="badge ${ob==='Oui'?'bg3':'bgr'}" style="font-size:9px">${ob}</span></td>
            <td style="text-align:center"><span class="badge ${di==='Oui'?'bg3':'bgr'}" style="font-size:9px">${di}</span></td>
            <td style="text-align:center"><span class="badge ${be==='Oui'?'bg3':be==='Non'?'br':'bgr'}" style="font-size:9px">${be}</span></td>
            <td style="text-align:center"><span class="badge ${co==='Oui'?'bg3':co==='—'?'bgr':'br'}" style="font-size:9px">${co}</span></td>
            <td style="font-size:10px;color:${exp.includes('2025')?'var(--orange)':exp==='—'?'var(--muted)':'var(--muted)'}">${exp}</td>
            <td><span style="font-size:14px">${st==='ok'?'✅':'🔴'}</span></td>
            <td style="font-size:10px">
              ${action.includes('Remplacer')?`<button class="btn bsm" style="background:#fef2f2;color:var(--red);border-color:#fecaca;font-size:9px">${action}</button>`:action}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resepi" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Gants de protection usés — Remplacer immédiatement avant prochain poste.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer commande EPI</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photos des EPI</div>
      <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border:2px dashed #fbbf24;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:54px;margin-bottom:8px">🦺🥽🧤</div>
        <div style="font-weight:600;color:#92400e;margin-bottom:4px">Équipements Opérateur CN</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Atelier Usinage · 15/05/2025</div>
        <button class="btn bsm">📷 Voir les 2 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--red);margin-bottom:2px">🔴 Gants de protection — État NON conforme</div>
        <div style="font-size:10px;color:#991b1b">Gants de protection usés — Remplacement immédiat requis.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé EPI</div>
      ${[['EPI vérifiés','7','var(--navy)'],['Conformes','6','var(--green)'],['Non conformes','1','var(--red)'],['Obligatoires manquants','0','var(--muted)'],['Conformité','86%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:86%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🛒 Commande EPI</div>
      ${[["Gants anti-coupures × 10 paires",'HSE / Achats','18/05/2025','br'],["Renouvellement lunettes × 3",'HSE','30/05/2025','by'],["Audit annuel EPI",'HSE','01/07/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🚨 CHECKLIST ÉVACUATION — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-evaq': () => `
${renderChecklistNav('sec-cl-evaq')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#991b1b,#dc2626);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🚨</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Évacuation Incendie — CH-EVAQ-001</div><div style="font-size:10px;opacity:.75">Sécurité incendie · Trimestrielle · Version V1 · Responsable : HSE</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">100%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">10/10</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EVAQ-001'],['Emplacement','Bâtiment Principal'],['Responsable','A. Hadj-Ali — HSE'],['Date inspection','05/05/2025'],['Dernière inspection','08/04/2025'],['Prochaine inspection','05/08/2025'],['Fréquence','Trimestrielle'],['Version','V1'],['Statut','✅ Validé']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle — Évacuation incendie</span><div style="display:flex;gap:6px"><span class="badge bg3">10 Conformes</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Issues de secours dégagées et accessibles (largeur ≥ 90 cm)",true,false,"Dégagées — 3 issues vérifiées",'ok'],
            [2,"Signalisation des sorties visible et en bon état",true,false,"OK",'ok'],
            [3,"Éclairage de secours fonctionnel (test autonomie > 1h)",true,false,"Testé — autonomie 1h20",'ok'],
            [4,"Plan d'évacuation affiché à chaque niveau et visible",true,false,"5 plans affichés",'ok'],
            [5,"Extincteurs accessibles à proximité des issues",true,false,"Conformes — vérifiés 15/05",'ok'],
            [6,"Alarme incendie fonctionnelle (test déclenchement)",true,false,"Parking principal — balisé",'ok'],
            [7,"Point de rassemblement identifié et balisé",true,false,"Parking principal — balisé",'ok'],
            [8,"Exercices d'évacuation réalisés (≥ 2 / an)",true,false,"Dernier le 20/04/2025",'ok'],
            [9,"Responsables d'évacuation identifiés et formés",true,false,"Équipe formée — 6 personnes",'ok'],
            [10,"Portes coupe-feu fonctionnelles et non bloquées",true,false,"RAS",'ok'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="qev${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="qev${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">✅</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===0?'#f0fdf4':'var(--bg)'};border:1px solid ${i===0?'#bbf7d0':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resevaq" ${i===0?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Système d'évacuation pleinement conforme ISO 45001. Exercice réalisé le 20/04/2025.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo — Issues de secours</div>
      <div style="background:linear-gradient(135deg,#fef2f2,#ffe4e6);border:2px dashed #fca5a5;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🚪</div>
        <div style="font-weight:600;color:#991b1b;margin-bottom:4px">Bâtiment Principal</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">3 issues vérifiées le 05/05/2025</div>
        <button class="btn bsm">📷 Voir les 3 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--green);margin-bottom:2px">✅ Système d'évacuation conforme</div>
        <div style="font-size:10px;color:#065f46">Toutes les issues et signalisations conformes à la réglementation.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','10','var(--navy)'],['Conformes','10','var(--green)'],['Observations','0','var(--muted)'],['Non-conformes','0','var(--muted)'],['Conformité','100%','var(--green)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:100%;background:var(--green);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Programme évacuation 2025</div>
      ${[["Exercice évacuation Bât. B",'HSE','15/06/2025','bb'],["Exercice général annuel",'Dir. + HSE','10/10/2025','bb'],["Prochaine inspection",'HSE','05/08/2025','bg3']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,
'ind': () => pgSoon('ind')
};
