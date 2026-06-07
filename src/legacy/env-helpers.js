/** @legacy — environnement */
/* ── ENV HELPERS ── */
function envModal(title, body, saveFn, deleteFn) {
  const o=document.createElement('div');
  o.id='env-modal';
  o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;backdrop-filter:blur(2px)';
  o.innerHTML=`<div style="background:#fff;border-radius:14px;width:520px;max-width:96vw;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden">
    <div style="background:linear-gradient(135deg,#064e3b,#16a34a);padding:14px 18px;display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:13px;font-weight:700;color:#fff">${title}</div>
      <button onclick="document.getElementById('env-modal').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;font-size:16px;border-radius:6px;padding:3px 8px">✕</button>
    </div>
    <div style="padding:18px;max-height:65vh;overflow-y:auto">${body}</div>
    <div style="padding:12px 18px;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;gap:8px">
      ${deleteFn?`<button onclick="${deleteFn}" style="font-size:10.5px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 12px;cursor:pointer;font-family:'Inter',sans-serif;margin-right:auto">🗑 Supprimer</button>`:''}
      <button onclick="document.getElementById('env-modal').remove()" class="btn">Annuler</button>
      <button onclick="${saveFn}" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">✓ Enregistrer</button>
    </div>
  </div>`;
  document.body.appendChild(o);
  o.addEventListener('click',e=>{if(e.target===o)o.remove();});
}
function envLbl(l,inp){return`<div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">${l}</label>${inp}</div>`;}
function envSel(id,opts,cur){return`<select id="${id}" class="fi">${opts.map(o=>`<option${o===cur?' selected':''}>${o}</option>`).join('')}</select>`;}
function envInp(id,val,type){return`<input id="${id}" class="fi" value="${val||''}" type="${type||'text'}">`;}
function envTa(id,val){return`<textarea id="${id}" class="fi" style="min-height:60px">${val||''}</textarea>`;}
function envG2(items){return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${items.map(([l,inp,full])=>`<div${full?' style="grid-column:1/-1"':''}>${envLbl(l,inp)}</div>`).join('')}</div>`;}
function envDelItem(store,id,page){const a=window[store];if(!a)return;const i=a.findIndex(x=>x.id===id);if(i>=0)a.splice(i,1);document.getElementById('env-modal')?.remove();if(typeof window.reloadPage==='function')window.reloadPage(page);else if(typeof window.PAGES?.[page]==='function')document.getElementById('content').innerHTML=PAGES[page]();}

function envActEdit(id) {
  const a=(window.ENV_ACTIONS||[]).find(x=>x.id===id);
  if(!a) return;
  const types=['Technique','Optimisation','Opérationnel','Formation','Audit','Documentation','Administratif','Inspection'];
  const resps=['HSE','Maintenance','Logistique','RH','KORTAS.A'];
  const prios=['Critique','Haute','Normale'];
  const statuts=['À faire','En cours','En retard','Clôturée'];
  envModal('✏ Modifier action — #'+id,
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="grid-column:1/-1">${envLbl('Action *',envInp('ea2-action',a.action))}</div>
      ${envLbl('Type',envSel('ea2-type',types,a.type))}
      ${envLbl('Priorité',envSel('ea2-prio',prios,a.prio))}
      ${envLbl('Responsable',envSel('ea2-resp',resps,a.resp))}
      ${envLbl('Statut',envSel('ea2-statut',statuts,a.statut))}
      ${envLbl('Échéance (JJ/MM/AA)',envInp('ea2-fin',a.fin))}
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Progression</label>
        <div style="display:flex;align-items:center;gap:8px"><input id="ea2-prog" type="range" min="0" max="100" value="${a.prog}" style="flex:1;accent-color:#16a34a" oninput="document.getElementById('ea2-pv').textContent=this.value+'%'"><span id="ea2-pv" style="font-size:11px;font-weight:700;color:#16a34a;min-width:32px">${a.prog}%</span></div>
      </div>
      <div style="grid-column:1/-1">${envLbl('Origine / Source',envInp('ea2-orig',a.origine))}</div>
      <div style="grid-column:1/-1">${envLbl('Description',envTa('ea2-desc',a.desc))}</div>
    </div>`,
    `(()=>{const a2=window.ENV_ACTIONS.find(x=>x.id===${id});if(!a2)return;a2.action=document.getElementById('ea2-action').value;a2.type=document.getElementById('ea2-type').value;a2.prio=document.getElementById('ea2-prio').value;a2.resp=document.getElementById('ea2-resp').value;a2.statut=document.getElementById('ea2-statut').value;a2.fin=document.getElementById('ea2-fin').value;a2.prog=parseInt(document.getElementById('ea2-prog').value)||0;a2.origine=document.getElementById('ea2-orig').value;a2.desc=document.getElementById('ea2-desc').value;if(a2.statut==='Clôturée')a2.prog=100;document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-actions']();})()`,
    `envDelItem('ENV_ACTIONS',${id},'env-actions');document.getElementById('env-modal').remove()`
  );
}

function envAddAspect(){
  envModal('+ Nouvel aspect environnemental',
    envG2([['Activité',envInp('ea-act','Usinage'),false],['Aspect env.',envInp('ea-asp','Huile usagée'),true],['Impact potentiel',envInp('ea-imp','Pollution des sols'),true],['Gravité',envSel('ea-g',['Élevé','Moyen','Faible'],'Moyen'),false],['Fréquence (1-5)',envInp('ea-freq','3','number'),false],['Niveau',envSel('ea-niv',['Élevé','Moyen','Faible'],'Moyen'),false],['Action associée',envInp('ea-action',''),true]]),
    `(()=>{const g=document.getElementById('ea-g').value,f=parseInt(document.getElementById('ea-freq').value)||3;window.ENV_ASPECTS_DATA.push({id:'ASP-'+(window.ENV_ASPECTS_DATA.length+1).toString().padStart(3,'0'),activite:document.getElementById('ea-act').value,aspect:document.getElementById('ea-asp').value,impact:document.getElementById('ea-imp').value,g,freq:f,crit:f*(g==='Élevé'?3:g==='Moyen'?2:1),niv:document.getElementById('ea-niv').value,action:document.getElementById('ea-action').value,s:'Actif'});document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-aspects']();})()`
  );
}
function envEditAspect(id){
  const a=(window.ENV_ASPECTS_DATA||[]).find(x=>x.id===id);if(!a)return;
  envModal('✏ Modifier aspect — '+id,
    envG2([['Activité',envInp('ea-act',a.activite),false],['Aspect env.',envInp('ea-asp',a.aspect),true],['Impact potentiel',envInp('ea-imp',a.impact),true],['Gravité',envSel('ea-g',['Élevé','Moyen','Faible'],a.g),false],['Fréquence (1-5)',envInp('ea-freq',a.freq,'number'),false],['Niveau',envSel('ea-niv',['Élevé','Moyen','Faible'],a.niv),false],['Statut',envSel('ea-s',['Actif','Inactif'],a.s),false],['Action associée',envInp('ea-action',a.action),true]]),
    `(()=>{const g=document.getElementById('ea-g').value,f=parseInt(document.getElementById('ea-freq').value)||${a.freq};const a2=window.ENV_ASPECTS_DATA.find(x=>x.id==='${id}');if(!a2)return;a2.activite=document.getElementById('ea-act').value;a2.aspect=document.getElementById('ea-asp').value;a2.impact=document.getElementById('ea-imp').value;a2.g=g;a2.freq=f;a2.crit=f*(g==='Élevé'?3:g==='Moyen'?2:1);a2.niv=document.getElementById('ea-niv').value;a2.s=document.getElementById('ea-s').value;a2.action=document.getElementById('ea-action').value;document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-aspects']();})()`,
    `envDelItem('ENV_ASPECTS_DATA','${id}','env-aspects');document.getElementById('env-modal').remove()`
  );
}
function envAddDechet(){
  envModal('+ Nouveau déchet',
    envG2([['Type',envSel('dd-type',['Métalliques','Huiles usagées','Cartons','Plastiques','Dangereux'],'Métalliques'),false],['Description',envInp('dd-desc',''),false],['Quantité',envInp('dd-qte','0','number'),false],['Unité',envSel('dd-unite',['kg','L'],'kg'),false],['Zone',envInp('dd-zone',''),false],['Prestataire',envInp('dd-presta',''),false]]),
    `(()=>{const d=new Date();const dt=d.getDate().toString().padStart(2,'0')+'/'+(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getFullYear();const id='DEC-'+(window.ENV_DECHETS_DATA.length+1).toString().padStart(3,'0');window.ENV_DECHETS_DATA.push({id,d:dt,type:document.getElementById('dd-type').value,desc:document.getElementById('dd-desc').value,qte:parseFloat(document.getElementById('dd-qte').value)||0,unite:document.getElementById('dd-unite').value,zone:document.getElementById('dd-zone').value,stockOk:true,enlev:'---',presta:document.getElementById('dd-presta').value,s:'En attente'});document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-dechets']();})()`
  );
}
function envEditDechet(id){
  const a=(window.ENV_DECHETS_DATA||[]).find(x=>x.id===id);if(!a)return;
  envModal('✏ Modifier déchet — '+id,
    envG2([['Type',envSel('dd-type',['Métalliques','Huiles usagées','Cartons','Plastiques','Dangereux'],a.type),false],['Description',envInp('dd-desc',a.desc),false],['Quantité',envInp('dd-qte',a.qte,'number'),false],['Unité',envSel('dd-unite',['kg','L'],a.unite),false],['Zone',envInp('dd-zone',a.zone),false],['Prestataire',envInp('dd-presta',a.presta),false],['Statut',envSel('dd-stat',['Enlevé','En attente','Non conforme'],a.s),false],['Stockage conforme',envSel('dd-stock',['Oui','Non'],a.stockOk?'Oui':'Non'),false]]),
    `(()=>{const a2=window.ENV_DECHETS_DATA.find(x=>x.id==='${id}');if(!a2)return;a2.type=document.getElementById('dd-type').value;a2.desc=document.getElementById('dd-desc').value;a2.qte=parseFloat(document.getElementById('dd-qte').value)||a2.qte;a2.unite=document.getElementById('dd-unite').value;a2.zone=document.getElementById('dd-zone').value;a2.presta=document.getElementById('dd-presta').value;a2.s=document.getElementById('dd-stat').value;a2.stockOk=document.getElementById('dd-stock').value==='Oui';document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-dechets']();})()`,
    `envDelItem('ENV_DECHETS_DATA','${id}','env-dechets');document.getElementById('env-modal').remove()`
  );
}
function envAddChimique(){
  envModal('+ Nouveau produit chimique',
    envG2([['Produit',envInp('ch-prod',''),true],['Famille',envSel('ch-fam',['Solvant','Lubrifiant','Nettoyant','Peinture'],'Solvant'),false],['Quantité',envInp('ch-qte','0','number'),false],['Unité',envSel('ch-unite',['L','kg'],'L'),false],['Emplacement',envInp('ch-empl',''),false],['Expiration',envInp('ch-exp','JJ/MM/AAAA'),false],['Danger',envInp('ch-danger',''),true]]),
    `(()=>{const id='PC-'+(window.ENV_CHIMIQUES_DATA.length+1).toString().padStart(3,'0');window.ENV_CHIMIQUES_DATA.push({id,prod:document.getElementById('ch-prod').value,fam:document.getElementById('ch-fam').value,qte:parseFloat(document.getElementById('ch-qte').value)||0,unite:document.getElementById('ch-unite').value,empl:document.getElementById('ch-empl').value,fds:false,exp:document.getElementById('ch-exp').value,etat:'OK',danger:document.getElementById('ch-danger').value});document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-chimiques']();})()`
  );
}
function envEditChimique(id){
  const a=(window.ENV_CHIMIQUES_DATA||[]).find(x=>x.id===id);if(!a)return;
  envModal('✏ Modifier produit — '+id,
    envG2([['Produit',envInp('ch-prod',a.prod),true],['Famille',envSel('ch-fam',['Solvant','Lubrifiant','Nettoyant','Peinture'],a.fam),false],['Quantité',envInp('ch-qte',a.qte,'number'),false],['Unité',envSel('ch-unite',['L','kg'],a.unite),false],['Emplacement',envInp('ch-empl',a.empl),false],['Expiration',envInp('ch-exp',a.exp),false],['FDS',envSel('ch-fds',['Disponible','Manquante'],a.fds?'Disponible':'Manquante'),false],['État',envSel('ch-etat',['OK','Périmé','Stock bas'],a.etat),false],['Danger',envInp('ch-danger',a.danger||''),true]]),
    `(()=>{const a2=window.ENV_CHIMIQUES_DATA.find(x=>x.id==='${id}');if(!a2)return;a2.prod=document.getElementById('ch-prod').value;a2.fam=document.getElementById('ch-fam').value;a2.qte=parseFloat(document.getElementById('ch-qte').value)||a2.qte;a2.unite=document.getElementById('ch-unite').value;a2.empl=document.getElementById('ch-empl').value;a2.exp=document.getElementById('ch-exp').value;a2.fds=document.getElementById('ch-fds').value==='Disponible';a2.etat=document.getElementById('ch-etat').value;a2.danger=document.getElementById('ch-danger').value;document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-chimiques']();})()`,
    `envDelItem('ENV_CHIMIQUES_DATA','${id}','env-chimiques');document.getElementById('env-modal').remove()`
  );
}
function envAdd5S(){
  envModal('+ Nouvel audit 5S',
    envG2([['Zone / Atelier',envInp('s5-zone',''),true],['Auditeur',envInp('s5-aud',''),false],['Date (JJ/MM/AAAA)',envInp('s5-d',''),false],['Trier — S1 (1-5)',envInp('s5-t','3','number'),false],['Ranger — S2 (1-5)',envInp('s5-r','3','number'),false],['Nettoyer — S3 (1-5)',envInp('s5-n','3','number'),false],['Standardiser — S4 (1-5)',envInp('s5-s','3','number'),false],['Maintenir — S5 (1-5)',envInp('s5-m','3','number'),false],['Observations',envTa('s5-obs',''),true]]),
    `(()=>{const t=parseInt(document.getElementById('s5-t').value)||3,r=parseInt(document.getElementById('s5-r').value)||3,n=parseInt(document.getElementById('s5-n').value)||3,s=parseInt(document.getElementById('s5-s').value)||3,m=parseInt(document.getElementById('s5-m').value)||3,score=t+r+n+s+m;window.ENV_5S_DATA.push({id:'AUD5S-'+(window.ENV_5S_DATA.length+1).toString().padStart(3,'0'),zone:document.getElementById('s5-zone').value,d:document.getElementById('s5-d').value,aud:document.getElementById('s5-aud').value,t,r,n,s,m,score,niv:score>=18?'Bon':score>=12?'Moyen':'Faible',obs:document.getElementById('s5-obs').value});document.getElementById('env-modal').remove();if(typeof window.reloadPage==='function')window.reloadPage('fives-liste');else document.getElementById('content').innerHTML=PAGES['env-5s']();})()`
  );
}
function envEdit5S(id){
  const a=(window.ENV_5S_DATA||[]).find(x=>x.id===id);if(!a)return;
  envModal('✏ Modifier audit — '+id,
    envG2([['Zone / Atelier',envInp('s5-zone',a.zone),true],['Auditeur',envInp('s5-aud',a.aud),false],['Date',envInp('s5-d',a.d),false],['Trier S1',envInp('s5-t',a.t,'number'),false],['Ranger S2',envInp('s5-r',a.r,'number'),false],['Nettoyer S3',envInp('s5-n',a.n,'number'),false],['Standardiser S4',envInp('s5-s',a.s,'number'),false],['Maintenir S5',envInp('s5-m',a.m,'number'),false],['Observations',envTa('s5-obs',a.obs),true]]),
    `(()=>{const a2=window.ENV_5S_DATA.find(x=>x.id==='${id}');if(!a2)return;a2.zone=document.getElementById('s5-zone').value;a2.aud=document.getElementById('s5-aud').value;a2.d=document.getElementById('s5-d').value;a2.t=parseInt(document.getElementById('s5-t').value)||a2.t;a2.r=parseInt(document.getElementById('s5-r').value)||a2.r;a2.n=parseInt(document.getElementById('s5-n').value)||a2.n;a2.s=parseInt(document.getElementById('s5-s').value)||a2.s;a2.m=parseInt(document.getElementById('s5-m').value)||a2.m;a2.score=a2.t+a2.r+a2.n+a2.s+a2.m;a2.niv=a2.score>=18?'Bon':a2.score>=12?'Moyen':'Faible';a2.obs=document.getElementById('s5-obs').value;document.getElementById('env-modal').remove();const p=window.STATE?.page||'fives-liste';if(typeof window.reloadPage==='function')window.reloadPage(p==='fives-fiche'?'fives-fiche':'fives-liste');else document.getElementById('content').innerHTML=PAGES['env-5s']();})()`,
    `envDelItem('ENV_5S_DATA','${id}','fives-liste')`
  );
}
function envAddUrgence(){
  envModal('+ Nouvelle situation d\'urgence',
    envG2([['Type urgence',envInp('ur-type',''),false],['Zone',envInp('ur-zone',''),false],['Situation décrite',envInp('ur-sit',''),true],['Niveau risque',envSel('ur-niv',['Très élevé','Élevé','Moyen','Faible'],'Élevé'),false],['Responsable',envInp('ur-resp',''),false],['Action immédiate',envTa('ur-action',''),true],['Équipements requis',envInp('ur-equip',''),true]]),
    `(()=>{const id='URG-'+(window.ENV_URGENCES_DATA.length+1).toString().padStart(3,'0');window.ENV_URGENCES_DATA.push({id,type:document.getElementById('ur-type').value,zone:document.getElementById('ur-zone').value,sit:document.getElementById('ur-sit').value,niv:document.getElementById('ur-niv').value,action:document.getElementById('ur-action').value,resp:document.getElementById('ur-resp').value,equip:document.getElementById('ur-equip').value,s:'Actif'});document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-urgences']();})()`
  );
}
function envEditUrgence(id){
  const a=(window.ENV_URGENCES_DATA||[]).find(x=>x.id===id);if(!a)return;
  envModal('✏ Modifier urgence — '+id,
    envG2([['Type',envInp('ur-type',a.type),false],['Zone',envInp('ur-zone',a.zone),false],['Situation',envInp('ur-sit',a.sit),true],['Niveau risque',envSel('ur-niv',['Très élevé','Élevé','Moyen','Faible'],a.niv),false],['Responsable',envInp('ur-resp',a.resp),false],['Action immédiate',envTa('ur-action',a.action),true],['Équipements',envInp('ur-equip',a.equip),true]]),
    `(()=>{const a2=window.ENV_URGENCES_DATA.find(x=>x.id==='${id}');if(!a2)return;a2.type=document.getElementById('ur-type').value;a2.zone=document.getElementById('ur-zone').value;a2.sit=document.getElementById('ur-sit').value;a2.niv=document.getElementById('ur-niv').value;a2.resp=document.getElementById('ur-resp').value;a2.action=document.getElementById('ur-action').value;a2.equip=document.getElementById('ur-equip').value;document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-urgences']();})()`,
    `envDelItem('ENV_URGENCES_DATA','${id}','env-urgences');document.getElementById('env-modal').remove()`
  );
}

function envAddEnvAction(){
  const types=['Technique','Optimisation','Opérationnel','Formation','Audit','Documentation','Administratif'];
  const resps=['KORTAS.A','HSE','Maintenance','Logistique','RH','M. Karim','Y. Reda','A. Ali'];
  envModal('+ Nouvelle action environnementale',
    envG2([
      ['Action *',envInp('ea2-action',''),true],
      ['Type',envSel('ea2-type',types,'Technique'),false],
      ['Priorité',envSel('ea2-prio',['Critique','Haute','Normale'],'Haute'),false],
      ['Responsable',envSel('ea2-resp',resps,'HSE'),false],
      ['Origine / Référence',envInp('ea2-orig',''),false],
      ['Date fin prévue',envInp('ea2-fin','JJ/MM/AA'),false],
      ['Description',envTa('ea2-desc',''),true],
    ]),
    `(()=>{const act=document.getElementById('ea2-action').value.trim();if(!act){document.getElementById('ea2-action').style.borderColor='#dc2626';return;}if(!window.ENV_ACTIONS)window.ENV_ACTIONS=[];const id=Math.max(...window.ENV_ACTIONS.map(a=>a.id),0)+1;window.ENV_ACTIONS.unshift({id,action:act,type:document.getElementById('ea2-type').value,prio:document.getElementById('ea2-prio').value,resp:document.getElementById('ea2-resp').value,origine:document.getElementById('ea2-orig').value||'Plan ISO 14001',fin:document.getElementById('ea2-fin').value,statut:'À faire',prog:0,desc:document.getElementById('ea2-desc').value});document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-actions']();})()`
  );
}
function envEditEnvAction(id){
  const a=(window.ENV_ACTIONS||[]).find(x=>x.id===id);if(!a)return;
  const types=['Technique','Optimisation','Opérationnel','Formation','Audit','Documentation','Administratif'];
  const resps=['KORTAS.A','HSE','Maintenance','Logistique','RH','M. Karim','Y. Reda','A. Ali'];
  envModal('✏ Modifier action — #'+id,
    envG2([
      ['Action',envInp('ea2-action',a.action),true],
      ['Type',envSel('ea2-type',types,a.type),false],
      ['Priorité',envSel('ea2-prio',['Critique','Haute','Normale'],a.prio),false],
      ['Responsable',envSel('ea2-resp',resps,a.resp),false],
      ['Origine',envInp('ea2-orig',a.origine||''),false],
      ['Date fin prévue',envInp('ea2-fin',a.fin||''),false],
      ['Statut',envSel('ea2-stat',['À faire','En cours','En retard','Clôturée'],a.statut),false],
      ['Progression (0-100)',envInp('ea2-prog',a.prog,'number'),false],
      ['Description',envTa('ea2-desc',a.desc||''),true],
    ]),
    `(()=>{const a2=window.ENV_ACTIONS.find(x=>x.id===${id});if(!a2)return;a2.action=document.getElementById('ea2-action').value;a2.type=document.getElementById('ea2-type').value;a2.prio=document.getElementById('ea2-prio').value;a2.resp=document.getElementById('ea2-resp').value;a2.origine=document.getElementById('ea2-orig').value;a2.fin=document.getElementById('ea2-fin').value;a2.statut=document.getElementById('ea2-stat').value;a2.prog=parseInt(document.getElementById('ea2-prog').value)||a2.prog;a2.desc=document.getElementById('ea2-desc').value;if(a2.statut==='Clôturée')a2.prog=100;document.getElementById('env-modal').remove();document.getElementById('content').innerHTML=PAGES['env-actions']();})()`,
    `envDelItem('ENV_ACTIONS',${id},'env-actions');document.getElementById('env-modal').remove()`
  );
}
/* ════════════════════════════════════
   NOTIFICATIONS SYSTEM
═══════════════════════════════════ */

Object.assign(window, {
  envModal, envLbl, envSel, envInp, envTa, envG2, envDelItem,
  envActEdit, envAddAspect, envEditAspect, envAddDechet, envEditDechet,
  envAddChimique, envEditChimique, envAdd5S, envEdit5S,
  envAddUrgence, envEditUrgence, envAddEnvAction, envEditEnvAction,
});

