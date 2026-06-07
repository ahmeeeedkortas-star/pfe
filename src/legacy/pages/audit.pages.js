/** @legacy — audit.pages.js (lazy) */
export default {
'audit-tb': () => {
  if(!window.AUDITS_DATA) PAGES['audit-liste']();
  const D=window.AUDITS_DATA||[];
  const clos=D.filter(a=>a.statut==='Clôturé');
  const avgScore=clos.length?Math.round(clos.reduce((s,a)=>s+a.score,0)/clos.length):0;
  const plan=D.filter(a=>a.statut==='Planifié').length;
  const inC=D.filter(a=>a.statut==='En cours').length;
  const totalEcarts=D.reduce((s,a)=>s+a.ecarts,0);
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['📋',D.length,'Total audits 2026','#2563eb','#eff6ff'],['✅',clos.length,'Clôturés','#16a34a','#f0fdf4'],['📊',avgScore+'%','Score moyen','#7c3aed','#f5f3ff'],['⚠',totalEcarts,'Écarts détectés','#dc2626','#fef2f2']].map(([ic,v,l,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:${c};opacity:.75;margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">📊 Scores par département</span><button class="btn bsm" onclick="goPage('audit-liste')">Liste →</button></div>
      ${D.filter(a=>a.score!==null).map(a=>`
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="font-weight:600;color:#0f172a">${a.dep}</span>
          <div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px;color:#94a3b8">${a.type}</span><span style="font-weight:800;color:${a.score>=90?'#16a34a':a.score>=70?'#f59e0b':'#dc2626'}">${a.score}%</span></div>
        </div>
        <div style="height:7px;background:#f1f5f9;border-radius:5px;overflow:hidden"><div style="height:100%;width:${a.score}%;background:${a.score>=90?'#16a34a':a.score>=70?'#f59e0b':'#dc2626'};border-radius:5px"></div></div>
      </div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="card" style="margin-bottom:0">
        <div class="ch"><span class="ct">📅 Prochains audits planifiés</span><button class="btn bsm" onclick="goPage('audit-plan')">+ Planifier</button></div>
        ${D.filter(a=>a.statut==='Planifié').slice(0,3).map(a=>`
        <div style="padding:10px;background:#f8fafc;border-radius:9px;border:1px solid #f1f5f9;margin-bottom:7px;display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:9px;background:#eff6ff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📅</div>
          <div style="flex:1"><div style="font-size:11px;font-weight:600;color:#0f172a">${a.type} — ${a.dep}</div><div style="font-size:9.5px;color:#94a3b8">${a.aud} · ${a.date}</div></div>
          <button class="btn bsm" onclick="goPage('audit-check')">→</button>
        </div>`).join('')||'<div style="text-align:center;padding:14px;color:#94a3b8;font-size:11px">Aucun audit planifié</div>'}
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:10px">🎯 Accès rapide</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[['📋','Liste audits','audit-liste'],['📅','Planifier','audit-plan'],['✓','Checklist','audit-check'],['📄','Rapport','audit-rapport']].map(([ic,lb,pg])=>`
          <button onclick="goPage('${pg}')" style="display:flex;align-items:center;gap:8px;padding:10px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:9px;cursor:pointer;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:#374151;transition:.15s" onmouseover="this.style.borderColor='#2563eb';this.style.background='#eff6ff'" onmouseout="this.style.borderColor='#e2e8f0';this.style.background='#f8fafc'"><span style="font-size:18px">${ic}</span>${lb}</button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
},

'audit-liste': () => `
  <div class="card" style="padding:11px 14px;margin-bottom:12px">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">
      <select class="sel"><option>Type: Tous</option><option>Interne</option><option>ISO 9001</option><option>Sécurité</option><option>Environnement</option></select>
      <select class="sel"><option>Département: Tous</option><option>Usinage</option><option>Bureau d'études</option><option>Assemblage</option></select>
      <select class="sel"><option>Statut: Tous</option><option>Planifié</option><option>En cours</option><option>Clôturé</option></select>
      <input type="text" class="sel" placeholder="01/01/2024 – 31/12/2024" style="width:160px">
      <button class="btn bp bsm">Rechercher</button>
    </div>
    <table class="tbl"><thead><tr><th>N° Audit</th><th>Type</th><th>Département</th><th>Auditeur</th><th>Date prévue</th><th>Statut</th><th>NC</th><th></th></tr></thead>
    <tbody>
      ${[['A01','Interne','Usinage','KORTAS.A','05/05/2024','Planifié','—'],
         ['A02','ISO 9001','Bureau d\'études','Y. Reda','08/05/2024','En cours','2'],
         ['A03','Sécurité','Atelier','M. Karim','15/05/2024','Clôturé','4'],
         ['A04','Interne','Assemblage','S. Yassine','18/05/2024','Planifié','—'],
         ['A05','Environnement','Maintenance','H. Saidi','22/05/2024','En cours','1'],
      ].map(([n,t,dep,aud,date,s,nc])=>`<tr><td><span class="link" onclick="goPage('audit-check')">${n}</span></td><td>${t}</td><td>${dep}</td><td>${aud}</td><td>${date}</td><td><span class="badge ${s==='Clôturé'?'bg3':s==='Planifié'?'bb':'by'}">${s}</span></td><td style="font-weight:600;color:${nc!=='—'?'var(--red)':'var(--muted)'}">${nc}</td><td><button class="btn bsm" onclick="goPage('audit-check')">Voir</button></td></tr>`).join('')}
    </tbody></table>
    <div style="text-align:right;margin-top:10px;font-size:11px;color:var(--blue);cursor:pointer" onclick="goPage('audit-liste')">Voir tous les audits →</div>
  </div>`,

'audit-plan': () => `
  <div class="card" style="max-width:680px;margin:0 auto">
    <div class="ch"><span class="ct">Planification d\'un audit</span></div>
    <div class="fgrid">
      <div class="fg"><label class="fl">Type d'audit <span>*</span></label><select class="fi"><option>Interne</option><option>ISO 9001</option><option>Sécurité</option><option>Environnement</option></select></div>
      <div class="fg"><label class="fl">Département <span>*</span></label><select class="fi"><option>Usinage</option><option>Bureau d'études</option><option>Assemblage</option></select></div>
      <div class="fg"><label class="fl">Auditeur <span>*</span></label><select class="fi"><option>KORTAS.A</option><option>Y. Reda</option><option>M. Karim</option></select></div>
      <div class="fg"><label class="fl">Date prévue <span>*</span></label><input type="date" class="fi" value="2024-05-05"></div>
      <div class="fg full"><label class="fl">Objectif de l'audit</label><textarea class="fi">Vérifier la conformité des processus de production</textarea></div>
      <div class="fg full"><label class="fl">Checklist associée <span>*</span></label><select class="fi"><option>Checklist audit interne ISO 9001</option><option>Checklist sécurité SST</option><option>Checklist environnement</option></select></div>
      <div class="fg"><label class="fl">Participants</label><input class="fi" value="M. Karim, Y. Reda"></div>
      <div class="fg"><label class="fl">Durée prévue</label><select class="fi"><option>1 journée</option><option>Demi-journée</option><option>2 jours</option></select></div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button class="btn" onclick="goPage('audit-liste')">Annuler</button>
      <button class="btn bp" onclick="goPage('audit-check')">Enregistrer →</button>
    </div>
  </div>`,

'audit-check': () => `
  <div class="g2">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Audit A02 — ISO 9001</span>
        <div style="display:flex;align-items:center;gap:7px">
          <div style="background:#E6F1FB;border-radius:6px;padding:4px 10px;font-size:11px">
            <span style="color:var(--muted)">Progression</span>
            <span style="margin-left:6px;font-weight:600;color:var(--blue)">60%</span>
            <div style="height:4px;background:#e5e7eb;border-radius:2px;margin-top:3px;width:80px;overflow:hidden"><div style="height:100%;width:60%;background:var(--blue);border-radius:2px"></div></div>
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:10px">Audit: A02 — ISO 9001 | Auditeur: Y. Reda | Département: Bureau d'études</div>
      <table class="tbl">
        <thead><tr><th style="width:30px">N°</th><th>Question</th><th style="width:140px">Réponse</th><th>Commentaire</th><th style="width:50px">Preuve</th><th style="width:30px"></th></tr></thead>
        <tbody>
          ${[['Les procédures sont-elles disponibles ?','Conforme','Procédures disponibles et à jour'],
             ['Les enregistrements sont-ils maîtrisés ?','NC','Manque un enregistrement'],
             ['Les équipements sont-ils étalonnés ?','Conforme','Étalonnage à jour'],
             ['Les compétences du personnel sont-elles validées ?','NC','2 opérateurs sans formation'],
          ].map(([q,r,comm],i)=>`<tr>
            <td>${i+1}</td><td>${q}</td>
            <td><div style="display:flex;gap:4px">
              <span class="badge ${r==='Conforme'?'bg3':'br'}">${r}</span>
              <span class="badge bb" style="cursor:pointer;font-size:9px">NC</span>
              <span class="badge bgr" style="cursor:pointer;font-size:9px">Obs.</span>
            </div></td>
            <td style="color:var(--muted);font-size:11px">${comm}</td>
            <td><button class="btn bsm">📎</button></td>
            <td><span style="color:var(--muted);cursor:pointer">⋮</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn" onclick="goPage('audit-plan')">← Précédent</button>
        <button class="btn bp" onclick="goPage('audit-rapport')">Suivant →</button>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Résumé audit</div>
        ${[['Points conformes','18','var(--green)'],['Non-conformités','3','var(--red)'],['Observations','2','var(--orange)'],['Points vérifiés','23','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;font-size:13px;color:${c}">${v}</span></div>`).join('')}
      </div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Non-conformités détectées</div>
        ${[['NC01','Procédure non respectée','Critique'],['NC02','Enregistrement manquant','Majeure'],['NC03','Formation non à jour','Mineure']].map(([n,d,g])=>`<div style="padding:7px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:600;color:var(--blue)">${n}</span><span class="badge ${g==='Critique'?'br':g==='Majeure'?'bo':'bg3'}" style="font-size:9px">${g}</span></div><div style="font-size:10px;color:var(--muted)">${d}</div></div>`).join('')}
      </div>
    </div>
  </div>`,

'audit-rapport': () => `
  <div class="g2">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">Rapport d'Audit A02 — ISO 9001</span></div>
      <div class="g2" style="margin-bottom:12px">
        <div>
          <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:7px">RÉSUMÉ</div>
          ${[['Points conformes','18','var(--green)'],['Non-conformités','3','var(--red)'],['Observations','2','var(--orange)'],['Points vérifiés','23','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c}">${v}</span></div>`).join('')}
        </div>
        <div>
          <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:7px">NON-CONFORMITÉS</div>
          ${[['NC01','Procédure non respectée','Critique'],['NC02','Enregistrement manquant','Majeure'],['NC03','Formation non à jour','Mineure']].map(([n,d,g])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600;color:var(--blue)">${n}</span><span class="badge ${g==='Critique'?'br':g==='Majeure'?'bo':'bg3'}" style="font-size:9px">${g}</span></div><div style="font-size:10px;color:var(--muted)">${d}</div></div>`).join('')}
        </div>
      </div>
      <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:8px">PLAN D'ACTIONS</div>
      <table class="tbl"><thead><tr><th>Action</th><th>Responsable</th><th>Échéance</th><th>Statut</th></tr></thead>
      <tbody>
        <tr><td>Mettre à jour la procédure</td><td>M. Karim</td><td>20/05/2024</td><td><span class="badge by">En cours</span></td></tr>
        <tr><td>Compléter les enregistrements</td><td>Y. Reda</td><td>18/05/2024</td><td><span class="badge bb">Ouverte</span></td></tr>
        <tr><td>Planifier formation opérateurs</td><td>S. Yassine</td><td>25/05/2024</td><td><span class="badge bb">Ouverte</span></td></tr>
      </tbody></table>
      <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn" onclick="goPage('audit-check')">Retour checklist</button>
        <button class="btn bg2" onclick="goPage('audit-cloture')">Valider le rapport ✓</button>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Auditeur & Validation</div>
        ${[['Auditeur','Y. Reda'],['Date audit','08/05/2024'],['Département','Bureau d\'études'],['Type','ISO 9001'],['Durée','1 journée']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}
      </div>
    </div>
  </div>`,

'audit-docs': () => `
  <div class="card">
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
      <select class="sel"><option>Type: Tous</option><option>Procédure</option><option>Instruction</option><option>Enregistrement</option></select>
      <select class="sel"><option>Statut: Tous</option><option>Validé</option><option>En révision</option><option>Brouillon</option></select>
      <select class="sel"><option>Département: Tous</option><option>Qualité</option><option>Production</option></select>
      <input class="sel" placeholder="Rechercher..." style="width:150px">
      <button class="btn bp bsm">Rechercher</button>
    </div>
    <table class="tbl"><thead><tr><th>Code</th><th>Nom du document</th><th>Type</th><th>Version</th><th>Statut</th><th>Date maj.</th><th></th></tr></thead>
    <tbody>
      ${[['PR01','Procédure Qualité','Procédure','V2','Validé','02/05/2024'],
         ['IN05','Instruction Montage','Instruction','V1','En révision','30/04/2024'],
         ['ENR04','Rapport Inspection','Enregistrement','V1','Validé','28/04/2024'],
         ['PR11','Gestion des NC','Procédure','V2','Validé','25/04/2024'],
         ['IN09','Instruction Contrôle','Instruction','V1','Brouillon','20/04/2024'],
      ].map(([c,n,t,v,s,d])=>`<tr><td style="color:var(--blue);font-weight:600">${c}</td><td>${n}</td><td>${t}</td><td>${v}</td><td><span class="badge ${s==='Validé'?'bg3':s==='En révision'?'by':'bgr'}">${s}</span></td><td>${d}</td><td><button class="btn bsm">Voir</button></td></tr>`).join('')}
    </tbody></table>
    <div style="text-align:center;margin-top:10px;font-size:11px;color:var(--blue);cursor:pointer">Voir tous les documents →</div>
  </div>`,

'audit-cloture': () => `
  <div class="card" style="max-width:450px;margin:0 auto;text-align:center;padding:28px">
    <div style="width:48px;height:48px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:20px;color:var(--green)">✓</div>
    <div style="font-size:15px;font-weight:700;margin-bottom:6px">Audit A02 clôturé avec succès</div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:18px">Audit ISO 9001 — Bureau d'études — 08/05/2024</div>
    ${[['Type','ISO 9001'],['Département','Bureau d\'études'],['Auditeur','Y. Reda'],['NC détectées','3'],['Points conformes','18'],['Date clôture','08/05/2024'],['Validé par','KORTAS.A']].map(([k,v])=>`<div class="drow" style="text-align:left"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
    <div style="display:flex;gap:8px;justify-content:center;margin-top:18px">
      <button class="btn" onclick="goPage('audit-liste')">← Retour à la liste</button>
      <button class="btn bp">Exporter PDF</button>
    </div>
  </div>`
};
