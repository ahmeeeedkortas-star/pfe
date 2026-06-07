/** @legacy — core extrait de qhse.html */
/* ════════════════════════════════════
   STATE
═══════════════════════════════════ */
let STATE = window.STATE = {
  module: 'accueil',
  page: 'accueil',
  d8Step: 4,
  qrqcStep: 2,
  auditStep: 2,
  rcTab: 'info',
  ncTab: 'info',
  ficheTab: 'info',
};

/* ════════════════════════════════════
   DONNÉES GLOBALES QUALITÉ
═══════════════════════════════════ */
const RC_DATA = [
  {n:'RC-001',d:'02/05/2026',p:'M077',cl:'Client A',dep:'BE Mécanique',g:'Critique',s:'En traitement',r:'KORTAS.A',dl:'5j',obj:'Erreur dimension pièce usinée'},
  {n:'RC-002',d:'05/05/2026',p:'M078',cl:'Client B',dep:'Automatisme',g:'Majeure',s:'En analyse',r:'M. Karim',dl:'7j',obj:'Câblage non conforme au plan'},
  {n:'RC-003',d:'08/05/2026',p:'M077',cl:'Client C',dep:'Assemblage',g:'Mineure',s:'Ouvert',r:'Y. Reda',dl:'2j',obj:'Finition surface insuffisante'},
  {n:'RC-004',d:'10/05/2026',p:'M076',cl:'Client A',dep:'Usinage',g:'Majeure',s:'En traitement',r:'KORTAS.A',dl:'6j',obj:'Tolérance hors spécification'},
  {n:'RC-005',d:'12/05/2026',p:'M079',cl:'Client D',dep:'BE Mécanique',g:'Mineure',s:'Clôturée',r:'M. Karim',dl:'—',obj:'Documentation incomplète'},
  {n:'RC-006',d:'14/05/2026',p:'M077',cl:'Client B',dep:'Usinage',g:'Critique',s:'En analyse',r:'A. Ali',dl:'4j',obj:'Défaut matière première lot 42'},
  {n:'RC-007',d:'15/05/2026',p:'M078',cl:'Client A',dep:'Assemblage',g:'Majeure',s:'Ouvert',r:'Y. Reda',dl:'1j',obj:'Jeu excessif à l\'assemblage'},
  {n:'RC-008',d:'17/05/2026',p:'M080',cl:'Client C',dep:'BE Mécanique',g:'Mineure',s:'Clôturée',r:'KORTAS.A',dl:'—',obj:'Erreur de cotation sur plan'},
  {n:'RC-009',d:'18/05/2026',p:'M077',cl:'Client D',dep:'Usinage',g:'Critique',s:'En traitement',r:'M. Karim',dl:'3j',obj:'Rugosité hors tolérance Ra'},
];

const NC_DATA = [
  {n:'NC-001',d:'02/05/2026',p:'M077',dep:'Usinage',poste:'Machine CN01',g:'Critique',s:'En cours',r:'A. Ali',dl:'1j',desc:'Cote hors tolérance ±0,05 mm'},
  {n:'NC-002',d:'03/05/2026',p:'M078',dep:'Assemblage',poste:'Poste AS3',g:'Majeure',s:'Ouvert',r:'M. Karim',dl:'2j',desc:'Couple de serrage non conforme'},
  {n:'NC-003',d:'04/05/2026',p:'M077',dep:'BE',poste:'Bureau tech',g:'Mineure',s:'Clôturé',r:'S. Yassine',dl:'—',desc:'Référence plan obsolète utilisée'},
  {n:'NC-004',d:'05/05/2026',p:'M079',dep:'Usinage',poste:'Machine CN02',g:'Majeure',s:'En cours',r:'A. Ali',dl:'3j',desc:'Usure outil — rugosité non conforme'},
  {n:'NC-005',d:'06/05/2026',p:'M077',dep:'Assemblage',poste:'Poste AS1',g:'Mineure',s:'Ouvert',r:'M. Karim',dl:'1j',desc:'Marquage identification absent'},
  {n:'NC-006',d:'08/05/2026',p:'M078',dep:'Usinage',poste:'Machine CN03',g:'Critique',s:'En cours',r:'KORTAS.A',dl:'2j',desc:'Matière non conforme au cahier des charges'},
  {n:'NC-007',d:'10/05/2026',p:'M080',dep:'Assemblage',poste:'Poste AS2',g:'Majeure',s:'Clôturé',r:'Y. Reda',dl:'—',desc:'Erreur de montage — ordre opérations'},
  {n:'NC-008',d:'12/05/2026',p:'M077',dep:'BE',poste:'Bureau tech',g:'Mineure',s:'Ouvert',r:'S. Yassine',dl:'1j',desc:'Indice de révision non mis à jour'},
];

/* ════ DONNÉES ACTIONS ════ */
window.RC_ACTIONS = [
  {id:1,action:'Blocage pièces non conformes',type:'Immédiate',ref:'RC-001',resp:'Y. Reda',debut:'02/05',fin:'02/05',statut:'Clôturée',prio:'Haute',prog:100,desc:'Mise en quarantaine lot 42 — attente analyse'},
  {id:2,action:'Modifier nomenclature pièce P007',type:'Corrective',ref:'RC-001',resp:'M. Karim',debut:'04/05',fin:'07/05',statut:'En cours',prio:'Haute',prog:70,desc:'Mettre à jour nomenclature dans ERP'},
  {id:3,action:'MAJ procédure contrôle réception',type:'Préventive',ref:'RC-001',resp:'Y. Reda',debut:'10/05',fin:'20/05',statut:'À faire',prio:'Normale',prog:0,desc:'Réviser le mode opératoire MO-CTR-004'},
  {id:4,action:'Étalonnage capteurs CN01',type:'Corrective',ref:'RC-002',resp:'KORTAS.A',debut:'05/05',fin:'08/05',statut:'En cours',prio:'Critique',prog:40,desc:'Calibration capteurs pression et température'},
  {id:5,action:'Formation contrôleurs qualité',type:'Préventive',ref:'RC-003',resp:'M. Karim',debut:'15/05',fin:'30/05',statut:'À faire',prio:'Normale',prog:0,desc:'Formation sur les points critiques récurrents'},
  {id:6,action:'Audit fournisseur matière F-042',type:'Préventive',ref:'RC-006',resp:'KORTAS.A',debut:'20/05',fin:'10/06',statut:'À faire',prio:'Haute',prog:0,desc:'Audit qualité du fournisseur lot 42'},
];

window.NC_ACTIONS = [
  {id:1,action:'Arrêt machine CN01',type:'Immédiate',ref:'NC-001',resp:'A. Ali',debut:'02/05',fin:'02/05',statut:'Clôturée',prio:'Critique',prog:100,desc:'Immobilisation machine jusqu\'à diagnostic'},
  {id:2,action:'Remplacement outil usé T12',type:'Corrective',ref:'NC-001',resp:'M. Karim',debut:'02/05',fin:'03/05',statut:'En cours',prio:'Haute',prog:60,desc:'Changement outil de coupe fraisage'},
  {id:3,action:'MAJ procédure contrôle cotes',type:'Préventive',ref:'NC-001',resp:'S. Yassine',debut:'03/05',fin:'05/05',statut:'À faire',prio:'Normale',prog:0,desc:'Réviser fréquence auto-contrôle CN'},
  {id:4,action:'Étalonnage capteurs pression',type:'Correction',ref:'NC-002',resp:'A. Ali',debut:'03/05',fin:'05/05',statut:'En cours',prio:'Haute',prog:40,desc:'Recalibration capteurs poste AS3'},
  {id:5,action:'Formation opérateurs montage',type:'Prévention',ref:'NC-007',resp:'RH',debut:'10/05',fin:'25/05',statut:'À faire',prio:'Normale',prog:0,desc:'Formation ordre opérations assemblage'},
  {id:6,action:'Mise à jour liste documents actifs',type:'Correction',ref:'NC-008',resp:'S. Yassine',debut:'12/05',fin:'15/05',statut:'En cours',prio:'Haute',prog:20,desc:'Archiver indices obsolètes dans GED'},
];

window.SEC_ACTIONS = [
  {id:1,action:'Installer protection machine CN',resp:'Ali M.',source:'Risque R-001',prio:'Critique',fin:'20/05',statut:'En cours',prog:65,type:'Technique',desc:'Protecteur carter + barrage immatériel'},
  {id:2,action:'Formation SST opérateurs (8h)',resp:'RH + HSE',source:'Accident A-003',prio:'Haute',fin:'25/05',statut:'En cours',prog:50,type:'Formation',desc:'Formation PRAP + gestes et postures'},
  {id:3,action:'Exercice évacuation Bât. B',resp:'HSE',source:'Plan PU-EVA-01',prio:'Critique',fin:'15/04',statut:'En retard',prog:10,type:'Exercice',desc:'Simulation évacuation incendie — 200 personnes'},
  {id:4,action:'Rapport accident A-2025-001',resp:'HSE',source:'Accident A-001',prio:'Haute',fin:'01/05',statut:'En retard',prog:30,type:'Administratif',desc:'Rapport CERFA + analyse 5 Pourquoi'},
  {id:5,action:'MAJ procédure consignation',resp:'HSE',source:'Accident A-003',prio:'Haute',fin:'31/05',statut:'À faire',prog:0,type:'Documentation',desc:'Mise à jour PRS-CONS-001 v3'},
  {id:6,action:'Commander EPI (gants x50)',resp:'HSE',source:'Checklist EPI',prio:'Haute',fin:'28/05',statut:'À faire',prog:0,type:'Équipement',desc:'Gants anti-coupure niveau E NBN EN388'},
  {id:7,action:'Exercice incendie Bât. A',resp:'HSE',source:'Plan PU-INC-01',prio:'Critique',fin:'15/01',statut:'Clôturée',prog:100,type:'Exercice',desc:'Exercice réussi — 98% évacués en < 3 min'},
  {id:8,action:'Inspection extincteurs Bât. A',resp:'HSE',source:'Checklist EXT',prio:'Haute',fin:'15/05',statut:'Clôturée',prog:100,type:'Inspection',desc:'18 extincteurs vérifiés — 2 remplacés'},
  {id:9,action:'Vérification RIA — Bâtiment C',resp:'HSE',source:'Checklist RIA',prio:'Haute',fin:'10/05',statut:'En retard',prog:0,type:'Inspection',desc:'Robinets incendie armés — 8 points à contrôler'},
];

/* ════ HELPERS ACTIONS ════ */
const ACT_STATUTS = ['À faire','En cours','En retard','Clôturée'];
const ACT_PRIOS = {Critique:'br',Haute:'bo',Normale:'bgr'};
const ACT_TYPES_RC = {Immédiate:'br',Corrective:'bo',Préventive:'bgr',Contention:'br',Correction:'bo',Prévention:'bgr'};
const ACT_TYPES_NC = {
  Immédiate:'br', Corrective:'bo', Préventive:'bgr',
  Contention:'br', Correction:'bo', Prévention:'bgr',
};
const ACT_COL_COLOR = {'À faire':'#64748b','En cours':'#2563eb','En retard':'#dc2626','Clôturée':'#16a34a'};
const ACT_COL_BG = {'À faire':'#f1f5f9','En cours':'#eff6ff','En retard':'#fef2f2','Clôturée':'#f0fdf4'};

function changeStatut(store, id, newStatut, page) {
  const arr = window[store];
  const item = arr.find(a=>a.id===id);
  if(item){
    item.statut = newStatut;
    if(newStatut==='Clôturée') item.prog=100;
    if(newStatut==='À faire') item.prog=0;
  }
  document.getElementById('content').innerHTML=PAGES[page]();
}

function updateProg(store, id, val, page) {
  const arr = window[store];
  const item = arr.find(a=>a.id===id);
  if(item){
    item.prog = parseInt(val);
    if(parseInt(val)===100) item.statut='Clôturée';
    else if(parseInt(val)>0 && item.statut==='À faire') item.statut='En cours';
  }
  const el = document.getElementById('prog-val-'+id);
  if(el) el.textContent=val+'%';
}

function deleteAction(store, id, page) {
  const arr = window[store];
  const idx = arr.findIndex(a=>a.id===id);
  if(idx>=0) arr.splice(idx,1);
  document.getElementById('content').innerHTML=PAGES[page]();
}

function showAddActionModal(store, page) {
  const overlay = document.createElement('div');
  overlay.id='act-modal';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif';
  const refs = store==='RC_ACTIONS'?RC_DATA.map(r=>r.n):store==='NC_ACTIONS'?NC_DATA.map(r=>r.n):['Risque','Accident','Checklist','Plan urgence'];
  const types = store==='SEC_ACTIONS'?['Technique','Formation','Documentation','Inspection','Équipement','Exercice','Administratif']:['Contention','Correction','Prévention'];
  const resps = ['KORTAS.A','M. Karim','Y. Reda','A. Ali','S. Yassine','HSE','RH'];
  overlay.innerHTML=`<div style="background:#fff;border-radius:14px;width:520px;max-width:96vw;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden">
    <div style="background:var(--navy);padding:16px 20px;display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:13px;font-weight:700;color:#fff">➕ Nouvelle action</div>
      <button onclick="document.getElementById('act-modal').remove()" style="background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:18px;line-height:1">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Action <span style="color:var(--red)">*</span></label><input id="na-action" class="fi" placeholder="Titre de l'action…"></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Type <span style="color:var(--red)">*</span></label><select id="na-type" class="fi">${types.map(t=>`<option>${t}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Référence</label><select id="na-ref" class="fi"><option value="">—</option>${refs.map(r=>`<option>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Responsable</label><select id="na-resp" class="fi">${resps.map(r=>`<option>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Priorité</label><select id="na-prio" class="fi"><option>Haute</option><option>Critique</option><option>Normale</option></select></div>
        <div><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Date fin prévue</label><input id="na-fin" class="fi" type="date" value="2026-05-31"></div>
        <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Description</label><textarea id="na-desc" class="fi" placeholder="Détails de l'action…" style="min-height:60px"></textarea></div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;padding-top:8px;border-top:1px solid var(--border)">
        <button onclick="document.getElementById('act-modal').remove()" class="btn">Annuler</button>
        <button class="btn bp" onclick="confirmAddAction('${store}','${page}')">✓ Ajouter l'action</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  document.getElementById('na-action').focus();
}

function confirmAddAction(store, page) {
  const action = document.getElementById('na-action').value.trim();
  if(!action){document.getElementById('na-action').style.borderColor='var(--red)';return;}
  const arr = window[store];
  const newId = Math.max(...arr.map(a=>a.id),0)+1;
  const finRaw = document.getElementById('na-fin').value;
  const finFmt = finRaw ? finRaw.slice(8)+'/'+finRaw.slice(5,7) : '—';
  arr.unshift({
    id:newId,
    action,
    type:document.getElementById('na-type').value,
    ref:document.getElementById('na-ref')?.value||'—',
    resp:document.getElementById('na-resp').value,
    prio:document.getElementById('na-prio').value,
    fin:finFmt,
    statut:'À faire',prog:0,
    source:document.getElementById('na-ref')?.value||'—',
    desc:document.getElementById('na-desc').value,
  });
  document.getElementById('act-modal').remove();
  document.getElementById('content').innerHTML=PAGES[page]();
}

function openEditAction(id) {
  const stores = ['RC_ACTIONS','NC_ACTIONS','SEC_ACTIONS','ENV_ACTIONS'];
  let item = null, store = null, page = null;
  const storePageMap = {RC_ACTIONS:'rc-actions',NC_ACTIONS:'nc-actions',SEC_ACTIONS:'sec-actions',ENV_ACTIONS:'env-actions'};
  for(const s of stores){
    const arr = window[s];
    if(arr){const found=arr.find(a=>a.id===id);if(found){item=found;store=s;page=storePageMap[s];break;}}
  }
  if(!item) return;
  const overlay = document.createElement('div');
  overlay.id='edit-modal';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;backdrop-filter:blur(2px)';
  const types = store==='SEC_ACTIONS'?['Technique','Formation','Documentation','Inspection','Équipement','Exercice','Administratif']:store==='ENV_ACTIONS'?['Technique','Optimisation','Opérationnel','Formation','Audit','Documentation','Administratif']:['Contention','Correction','Prévention'];
  const resps = ['KORTAS.A','M. Karim','Y. Reda','A. Ali','S. Yassine','HSE','RH','Maintenance','Logistique'];
  const prios = ['Critique','Haute','Normale'];
  const statuts = ['À faire','En cours','En retard','Clôturée'];
  overlay.innerHTML=`<div style="background:#fff;border-radius:14px;width:540px;max-width:96vw;box-shadow:0 24px 64px rgba(0,0,0,.22);overflow:hidden;animation:slideUp .2s ease">
    <div style="background:linear-gradient(135deg,#1e3a8a,#1e40af);padding:16px 20px;display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-size:13px;font-weight:700;color:#fff">✏ Modifier l'action</div>
        <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">ID #${item.id} · ${item.ref||'—'}</div>
      </div>
      <button onclick="document.getElementById('edit-modal').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;font-size:16px;line-height:1;border-radius:6px;padding:5px 8px">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:12px;max-height:75vh;overflow-y:auto">
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Action *</label>
        <input id="ea-action" class="fi" value="${item.action}">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Type</label>
          <select id="ea-type" class="fi">${types.map(t=>`<option${t===item.type?' selected':''}>${t}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Priorité</label>
          <select id="ea-prio" class="fi">${prios.map(p=>`<option${p===item.prio?' selected':''}>${p}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Responsable</label>
          <select id="ea-resp" class="fi">${resps.map(r=>`<option${r===item.resp?' selected':''}>${r}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Statut</label>
          <select id="ea-statut" class="fi">${statuts.map(s=>`<option${s===item.statut?' selected':''}>${s}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Date fin</label>
          <input id="ea-fin" class="fi" type="text" placeholder="JJ/MM/AA" value="${item.fin||''}">
        </div>
        <div>
          <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Progression</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ea-prog" type="range" min="0" max="100" value="${item.prog}" style="flex:1;accent-color:#2563eb" oninput="document.getElementById('ea-prog-val').textContent=this.value+'%'">
            <span id="ea-prog-val" style="font-size:11px;font-weight:700;color:#1e40af;min-width:32px">${item.prog}%</span>
          </div>
        </div>
      </div>
      <div>
        <label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:4px">Description</label>
        <textarea id="ea-desc" class="fi" style="min-height:70px">${item.desc||''}</textarea>
      </div>
    </div>
    <div style="padding:14px 20px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button onclick="deleteAction('${store}',${item.id},'${page}');document.getElementById('edit-modal').remove()"
        style="font-size:10.5px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 12px;cursor:pointer;font-family:'Inter',sans-serif">🗑 Supprimer</button>
      <div style="display:flex;gap:8px">
        <button onclick="document.getElementById('edit-modal').remove()" class="btn">Annuler</button>
        <button onclick="saveEditAction('${store}',${item.id},'${page}')"
          style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:8px;padding:7px 18px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(37,99,235,.35)">
          ✓ Enregistrer
        </button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{if(e.target===overlay)overlay.remove();});
  document.getElementById('ea-action').focus();
}

function saveEditAction(store, id, page) {
  const arr = window[store];
  const item = arr.find(a=>a.id===id);
  if(!item) return;
  const action = document.getElementById('ea-action').value.trim();
  if(!action){document.getElementById('ea-action').style.borderColor='var(--red)';return;}
  item.action  = action;
  item.type    = document.getElementById('ea-type').value;
  item.prio    = document.getElementById('ea-prio').value;
  item.resp    = document.getElementById('ea-resp').value;
  item.statut  = document.getElementById('ea-statut').value;
  item.fin     = document.getElementById('ea-fin').value;
  item.prog    = parseInt(document.getElementById('ea-prog').value);
  item.desc    = document.getElementById('ea-desc').value;
  if(item.statut==='Clôturée') item.prog=100;
  if(item.statut==='À faire' && item.prog===0) item.prog=0;
  document.getElementById('edit-modal').remove();
  document.getElementById('content').innerHTML=PAGES[page]();
}

/* ════ HELPERS QUALITÉ ════ */
function badgeG(g){return g==='Critique'?'br':g==='Majeure'?'bo':'bg3';}
function badgeS(s){
  if(s==='Clôturée'||s==='Clôturé')return 'bg3';
  if(s==='Ouvert')return 'bgr';
  return 'by';
}
function filterRC(){
  const fProj=document.getElementById('rc-fp')?.value||'Tous';
  const fClient=document.getElementById('rc-fc')?.value||'Tous';
  const fStat=document.getElementById('rc-fs')?.value||'Tous';
  const fGrav=document.getElementById('rc-fg')?.value||'Tous';
  const fQ=(document.getElementById('rc-fq')?.value||'').toLowerCase();
  const rows=RC_DATA.filter(r=>{
    if(fProj!=='Tous'&&r.p!==fProj)return false;
    if(fClient!=='Tous'&&r.cl!==fClient)return false;
    if(fStat!=='Tous'&&r.s!==fStat)return false;
    if(fGrav!=='Tous'&&r.g!==fGrav)return false;
    if(fQ&&![r.n,r.obj,r.cl,r.dep,r.r].join(' ').toLowerCase().includes(fQ))return false;
    return true;
  });
  const tbody=document.getElementById('rc-tbody');
  if(tbody)tbody.innerHTML=rows.map(r=>`<tr>
    <td><span class="link" onclick="goPage('rc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td>${r.p}</td><td>${r.cl}</td><td>${r.dep}</td>
    <td style="max-width:160px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.obj}">${r.obj}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('rc-fiche')">Voir</button></td>
  </tr>`).join('');
  const cnt=document.getElementById('rc-cnt');
  if(cnt)cnt.textContent=rows.length+' résultat'+(rows.length>1?'s':'');
}
function filterNC(){
  const fProj=document.getElementById('nc-fp')?.value||'Tous';
  const fDep=document.getElementById('nc-fd')?.value||'Tous';
  const fStat=document.getElementById('nc-fs')?.value||'Tous';
  const fGrav=document.getElementById('nc-fg')?.value||'Tous';
  const fQ=(document.getElementById('nc-fq')?.value||'').toLowerCase();
  const rows=NC_DATA.filter(r=>{
    if(fProj!=='Tous'&&r.p!==fProj)return false;
    if(fDep!=='Tous'&&r.dep!==fDep)return false;
    if(fStat!=='Tous'&&r.s!==fStat)return false;
    if(fGrav!=='Tous'&&r.g!==fGrav)return false;
    if(fQ&&![r.n,r.desc,r.dep,r.poste,r.r].join(' ').toLowerCase().includes(fQ))return false;
    return true;
  });
  const tbody=document.getElementById('nc-tbody');
  if(tbody)tbody.innerHTML=rows.map(r=>`<tr>
    <td><span class="link" onclick="goPage('nc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td>${r.p}</td><td>${r.dep}</td><td style="color:var(--muted);font-size:10.5px">${r.poste}</td>
    <td style="max-width:140px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.desc}">${r.desc}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('nc-fiche')">Voir</button></td>
  </tr>`).join('');
  const cnt=document.getElementById('nc-cnt');
  if(cnt)cnt.textContent=rows.length+' résultat'+(rows.length>1?'s':'');
}

/* ════════════════════════════════════
   ICON NAV DEFINITIONS
═══════════════════════════════════ */
const ICONS = {
  rc: [
    {id:'rc-liste',      ic:'≡', lb:'Liste',        bg:'#E6F1FB', c:'#185FA5'},
    {id:'rc-new',        ic:'+', lb:'Nouvelle',      bg:'#EAF3DE', c:'#3B6D11'},
    {id:'rc-fiche',      ic:'◻', lb:'Fiche',         bg:'#FAEEDA', c:'#854F0B'},
    {id:'rc-8d',         ic:'◈', lb:'Traitement 8D', bg:'#E6F1FB', c:'#185FA5'},
    {id:'rc-actions',    ic:'↺', lb:'Actions',       bg:'#EAF3DE', c:'#3B6D11'},
    {id:'rc-kpi',        ic:'◉', lb:'KPI',           bg:'#E6F1FB', c:'#185FA5'},
  ],
  nc: [
    {id:'nc-liste',      ic:'≡', lb:'Liste NC',     bg:'#E6F1FB', c:'#185FA5'},
    {id:'nc-new',        ic:'+', lb:'Nouvelle NC',  bg:'#EAF3DE', c:'#3B6D11'},
    {id:'nc-fiche',      ic:'◻', lb:'Fiche',        bg:'#FAEEDA', c:'#854F0B'},
    {id:'nc-qrqc',       ic:'⚡',lb:'QRQC',         bg:'#FCEBEB', c:'#A32D2D'},
    {id:'nc-actions',    ic:'↺', lb:'Actions',      bg:'#EAF3DE', c:'#3B6D11'},
    {id:'nc-kpi',        ic:'◉', lb:'KPI',          bg:'#E6F1FB', c:'#185FA5'},
  ],
  audit: [
    {id:'audit-tb',      ic:'⊞', lb:'Tableau de bord', bg:'#E6F1FB', c:'#185FA5'},
    {id:'audit-liste',   ic:'≡', lb:'Liste audits',    bg:'#EAF3DE', c:'#3B6D11'},
    {id:'audit-plan',    ic:'📅',lb:'Planification',   bg:'#FAEEDA', c:'#854F0B'},
    {id:'audit-check',   ic:'✓', lb:'Checklist',       bg:'#EAF3DE', c:'#3B6D11'},
    {id:'audit-rapport', ic:'◻', lb:'Rapport',         bg:'#E6F1FB', c:'#185FA5'},
    {id:'audit-cloture', ic:'🏁',lb:'Clôture',         bg:'#EAF3DE', c:'#3B6D11'},
  ],
  sec: [
    {id:'sec-tb',         ic:'⊞', lb:'Tableau bord',   bg:'#FCEBEB', c:'#A32D2D'},
    {id:'sec-risques',    ic:'⚠', lb:'Risques SST',    bg:'#FFF3E0', c:'#C2410C'},
    {id:'sec-checklists', ic:'✓', lb:'Checklists',     bg:'#EAF3DE', c:'#3B6D11'},
    {id:'sec-accidents',  ic:'🚨',lb:'Accidents',      bg:'#FCEBEB', c:'#A32D2D'},
    {id:'sec-urgence',    ic:'🔥',lb:'Plan urgence',   bg:'#FFF3E0', c:'#C2410C'},
    {id:'sec-actions',    ic:'↺', lb:'Actions',        bg:'#E6F1FB', c:'#185FA5'},
    {id:'sec-kpi',        ic:'◉', lb:'KPI Séc.',       bg:'#F5F3FF', c:'#5B21B6'},
  ],
  env: [
    {id:'env-dash',     ic:'⊞', lb:'Tableau de bord', bg:'#E6F1FB', c:'#185FA5'},
    {id:'env-aspects',  ic:'🌿', lb:'Aspects env.',     bg:'#E6F7EE', c:'#166534'},
    {id:'env-dechets',  ic:'♻', lb:'Déchets',          bg:'#FEF3C7', c:'#92400E'},
    {id:'env-conso',    ic:'⚡', lb:'Consommations',    bg:'#EDE9FE', c:'#6D28D9'},
    {id:'env-chimiques',ic:'⚗', lb:'Prod. chimiques',  bg:'#FEE2E2', c:'#991B1B'},
    {id:'env-urgences', ic:'🚨', lb:'Urgences',         bg:'#FEF2F2', c:'#991B1B'},
    {id:'env-actions',  ic:'↺', lb:'Actions',           bg:'#EAF3DE', c:'#3B6D11'},
    {id:'env-kpi',      ic:'◉', lb:'KPI',              bg:'#E6F1FB', c:'#185FA5'},
  ],
};

const TITLES = {
  accueil:      ['Tableau de bord global','Vue d\'ensemble — Mai 2026',''],
  settings:     ['Paramètres','Apparence et préférences plateforme',''],
  'rc-liste':   ['Réclamations Clients','Liste et suivi',`<button class="btn" onclick="goPage('rc-kpi')">📊 KPI & tableaux de bord</button><button class="btn bp" onclick="goPage('rc-new')">+ Nouvelle réclamation</button>`],
  'rc-new':     ['Nouvelle Réclamation','Formulaire de création',''],
  'rc-fiche':   ['Fiche Réclamation N°001','Détails et traitement',`<button class="btn" onclick="goPage('rc-liste')">← Retour</button><button class="btn bp" onclick="goPage('rc-8d')">Traitement 8D →</button>`],
  'rc-8d':      ['Traitement 8D','Réclamation N°001 — D1 à D8',`<button class="btn" onclick="goPage('rc-fiche')">← Retour</button>`],
  'rc-actions': ['Suivi des actions RC','Plan d\'action réclamations · Kanban interactif',''],
  'rc-kpi':     ['KPI Réclamations','Objectifs · Tableaux de bord',''],
  'rc-rapport': ['KPI RC','(redirigé — onglet Projets)',''],
  'rc-cloture': ['KPI RC','(redirigé)',''],
  'nc-liste':   ['Non-Conformités','Liste et suivi',`<button class="btn" onclick="goPage('nc-kpi')">📊 KPI</button><button class="btn bp" onclick="goPage('nc-new')">+ Nouvelle NC</button>`],
  'nc-new':     ['Nouvelle Non-Conformité','Formulaire QRQC rapide',''],
  'nc-fiche':   ['Fiche NC N°001','Détails et traitement',`<button class="btn" onclick="goPage('nc-liste')">← Retour</button><button class="btn bp" onclick="goPage('nc-qrqc')">Traitement QRQC →</button>`],
  'nc-qrqc':   ['Traitement QRQC','Analyse et actions immédiates',`<button class="btn" onclick="goPage('nc-fiche')">← Retour</button>`],
  'nc-actions': ['Suivi des actions NC','Plan d\'action non-conformités · Kanban interactif',''],
  'nc-kpi':     ['KPI Non-conformités','Objectifs · Tableaux de bord · Données',''],
  'nc-cloture': ['KPI Non-conformités','(redirigé)',''],
  'audit-tb':      ['Audits','Tableau de bord audits',''],
  'doc-liste':     ['Documentation QHSE','Registre documentaire central',''],
  'fives-kpi':     ['Audits 5S — Tableau de bord','Scores par zone · Objectif 20/25',''],
  'fives-liste':   ['Audits 5S','Évaluation et suivi des zones de travail',''],
  'fives-fiche':   ['Fiche audit 5S','Détail des critères S1 à S5',''],
  'env-5s':        ['Audits 5S','(redirigé vers module 5S)',''],
  'audit-liste':   ['Liste des Audits','Suivi du programme d\'audit',`<button class="btn bp" onclick="goPage('audit-plan')">+ Planifier un audit</button>`],
  'audit-plan':    ['Planification Audit','Création d\'un nouvel audit',`<button class="btn" onclick="goPage('audit-liste')">Annuler</button>`],
  'audit-check':   ['Checklist Audit','Réalisation de l\'audit',`<button class="btn" onclick="goPage('audit-liste')">← Retour</button>`],
  'audit-rapport': ['Rapport d\'Audit','Synthèse et non-conformités',`<button class="btn bp">Générer PDF</button>`],
  'audit-cloture': ['Clôture Audit','Récapitulatif et validation',''],
  'sec-tb':         ['🛡 Sécurité SST — Tableau de bord','Module ISO 45001 — XPERT-MECA · Mai 2026',`<div class="notif-chip" style="display:inline-flex;align-items:center;gap:5px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:4px 9px;font-size:10px;color:#991b1b;font-weight:500">⚠ 2 risques critiques</div><button class="btn" onclick="goPage('sec-risques')">📊 Risques</button><button class="btn bp" onclick="goPage('sec-accidents')">🚨 Déclarer accident</button>`],
  'sec-risques':    ['📊 Analyse des Risques SST','Matrice GFDC — Identification & évaluation',`<button class="btn" onclick="goPage('sec-tb')">← Retour</button><button class="btn bp" onclick="if(typeof sstNewRisk==='function')sstNewRisk();else goPage('sec-risques')">+ Nouveau risque</button>`],
  'sec-checklists': ['✅ Checklists Sécurité','Inspections et vérifications périodiques — ISO 45001',`<button class="btn">📥 Exporter</button><button class="btn bp">+ Nouvelle checklist</button>`],
  'sec-cl-epi':     ['🦺 Checklist EPI','Contrôle EPI — informations saisies à la main',''],
  'sec-accidents':  ['🚑 Accidents & Incidents','Déclaration, analyse et suivi — 5 Pourquoi',`<button class="btn" onclick="if(typeof accToast==='function')accToast('📊 Statistiques','#2563eb')">📊 Stats</button><button class="btn bp" onclick="if(typeof accNewView==='function')accNewView();else goPage('sec-accidents')">+ Déclarer un accident</button>`],
  'sec-urgence':    ["🚨 Plan d'Urgence",'Plans, exercices et contacts urgence',`<button class="btn">📅 Calendrier</button><button class="btn bp">+ Nouveau plan</button>`],
  'sec-actions':    ['🎯 Actions & Suivi','Plan d\'action sécurité — Kanban interactif',''],
  'sec-kpi':        ['📈 KPI Sécurité','Indicateurs de performance SST — ISO 45001',''],
  'sec-cl-ext':  ['🔥 Checklist Extincteurs — CH-EXT-001','Formulaire de remplissage · Inspection mensuelle',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'sec-cl-phar': ['🏥 Checklist Pharmacie — CH-PHAR-001','Formulaire de remplissage · Inspection mensuelle',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'sec-cl-sst':  ['⚙ Checklist SST — CH-MACH-001','Formulaire de remplissage · Inspection mensuelle',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'sec-cl-veh':  ['🚗 Checklist Véhicule — CH-VEH-001','Formulaire de remplissage · Inspection hebdomadaire',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'sec-cl-epi':  ['🦺 Checklist EPI — CH-EPI-001','Formulaire de remplissage · Inspection mensuelle',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'sec-cl-evaq': ['🚨 Checklist Évacuation Incendie — CH-EVAQ-001','Formulaire de remplissage · Inspection trimestrielle',`<button class="btn" onclick="goPage('sec-checklists')">← Retour</button><button class="btn" onclick="goPage('sec-checklists')">💾 Brouillon</button><button class="btn bp">✅ Valider</button><button class="btn">📄 PDF</button>`],
  'env':          ['🌿 Environnement','ISO 14001 · Tableau de bord environnemental — Mai 2026',''],
  'env-dash':     ['🌿 Tableau de bord Environnement','Vue d\'ensemble — Indicateurs clés ISO 14001',''],
  'env-aspects':  ['🌿 Aspects environnementaux','Identification et évaluation des impacts — ISO 14001',''],
  'env-dechets':  ['♻ Gestion des déchets','Suivi et traçabilité — Valorisation et élimination',''],
  'env-conso':    ['⚡ Suivi des consommations','Électricité · Eau · Air comprimé · Carburant',''],
  'env-chimiques':['⚗ Produits chimiques','Registre FDS · Gestion des risques chimiques',''],
  'env-5s':       ['✅ Audits 5S Environnement','Évaluation et suivi des zones — Score moyen : 16/25',''],
  'env-urgences': ['🚨 Urgences environnementales','Plans d\'intervention · Équipements · Contacts',''],
  'env-actions':  ['↺ Actions environnementales','Plan d\'action ISO 14001 · Suivi avancement',''],
  'env-kpi':      ['📊 KPI Environnement','Indicateurs de performance environnementale — 2026',''],
};

/* ════════════════════════════════════
   NAVIGATION
═══════════════════════════════════ */
function goHome() {
  STATE.module = 'accueil'; STATE.page = 'accueil';
  document.querySelectorAll('.s-item').forEach(e=>e.classList.remove('active'));
  document.getElementById('sb-accueil').classList.add('active');
  document.getElementById('icon-nav').style.display = 'none';
  setTopbar('accueil');
  const c = document.getElementById('content');
  c.classList.add('home-mode');
  c.classList.remove('sst-mode');
  // Reset view states
  if(window.acc_view) window.acc_view='list';
  if(window.sst_selectedId!==undefined) window.sst_selectedId=null;
  c.innerHTML = PAGES['accueil']();
}

function goModule(mod) {
  STATE.module = mod;
  document.querySelectorAll('.s-item').forEach(e=>e.classList.remove('active'));
  const el = document.getElementById('sb-'+mod);
  if(el) el.classList.add('active');
  document.getElementById('content').classList.remove('home-mode');
  const icons = ICONS[mod];
  if(icons) {
    buildIconNav(mod, icons[0].id);
    goPage(icons[0].id);
  } else {
    document.getElementById('icon-nav').style.display = 'none';
    setTopbar('accueil');
    document.getElementById('content').innerHTML = pgSoon(mod);
  }
}

function goPage(pageId) {
  STATE.page = pageId;
  const mod = pageId.startsWith('sec-cl-') ? 'sec' : pageId.startsWith('env-') ? 'env' : pageId.split('-')[0];
  if(ICONS[mod]) buildIconNav(mod, pageId.startsWith('sec-cl-') ? 'sec-checklists' : pageId);
  // Highlight sidebar for sec-cl-* pages
  if(pageId.startsWith('sec-cl-')) {
    document.querySelectorAll('.s-item').forEach(e=>e.classList.remove('active'));
    const el = document.getElementById('sb-sec');
    if(el) el.classList.add('active');
  }
  if(pageId.startsWith('env-')) {
    document.querySelectorAll('.s-item').forEach(e=>e.classList.remove('active'));
    const el = document.getElementById('sb-env');
    if(el) el.classList.add('active');
  }
  setTopbar(pageId);
  const c = document.getElementById('content');
  c.classList.remove('home-mode');
  c.classList.remove('sst-mode');
  if(pageId === 'sec-risques') c.classList.add('sst-mode');
  if(pageId === 'sec-accidents') c.classList.add('sst-mode');
  const fn = PAGES[pageId];
  c.innerHTML = fn ? fn() : pgSoon(pageId);
  // Reset tabs
  STATE.rcTab = 'info'; STATE.ncTab = 'info'; STATE.ficheTab = 'info';
}

function buildIconNav(mod, activeId) {
  const icons = ICONS[mod] || [];
  const nav = document.getElementById('icon-nav');
  nav.style.display = 'flex';
  let h = '';
  icons.forEach((it,i) => {
    const a = it.id === activeId;
    h += `<div class="ini${a?' active':''}" onclick="goPage('${it.id}')">
      <div class="ini-ic" style="background:${it.bg};color:${it.c}">${it.ic}</div>
      <div class="ini-lb">${it.lb}</div>
    </div>`;
    if(i < icons.length-1) h += `<div class="ini-sep"></div>`;
  });
  nav.innerHTML = h;
}

function setTopbar(pageId) {
  const t = TITLES[pageId] || ['Module','',''];
  document.getElementById('t-title').textContent = t[0];
  document.getElementById('mod-title').textContent = t[0];
  document.getElementById('mod-sub').textContent = t[1];
  document.getElementById('mod-actions').innerHTML = t[2];
}

function switchTab(tabId, groupId) {
  if(groupId === 'rc') STATE.rcTab = tabId;
  else if(groupId === 'nc') STATE.ncTab = tabId;
  else STATE.ficheTab = tabId;
  document.getElementById('content').innerHTML = PAGES[STATE.page]();
}

/* ════════════════════════════════════
   HELPER RENDERERS
═══════════════════════════════════ */
function timelineHTML(labels, done) {
  let h = '<div class="tl">';
  labels.forEach((l,i) => {
    const isDone = i<done, isAct = i===done;
    if(i>0) h += `<div class="tl-line${isDone?' done':''}"></div>`;
    h += `<div class="tl-step">
      <div class="tl-dot ${isDone?'td-done':isAct?'td-act':'td-todo'}">${isDone?'✓':i+1}</div>
      <div class="tl-lbl">${l}</div>
    </div>`;
  });
  return h + '</div>';
}

function actionsTableRC() {
  return `<table class="tbl"><thead><tr><th>Action</th><th>Type</th><th>Resp.</th><th>Statut</th><th>Progression</th></tr></thead><tbody>
    <tr><td>Blocage pièces</td><td><span class="badge bb">Contention</span></td><td>Y. Reda</td><td><span class="badge bg3">✔ Terminé</span></td><td><div class="prog"><div class="pf" style="width:100%;background:var(--green)"></div></div></td></tr>
    <tr><td>Modifier nomenclature</td><td><span class="badge bo">Correction</span></td><td>M. Karim</td><td><span class="badge by">⏳ En cours</span></td><td><div class="prog"><div class="pf" style="width:70%;background:var(--yellow)"></div></div></td></tr>
    <tr><td>MAJ procédure contrôle</td><td><span class="badge bgr">Prévention</span></td><td>Y. Reda</td><td><span class="badge bgr">⛔ À faire</span></td><td><div class="prog"><div class="pf" style="width:0;background:#888"></div></div></td></tr>
  </tbody></table>`;
}

function kpiSideRC() {
  return `<div class="card"><div class="ct" style="margin-bottom:10px">KPI Réclamations</div>
    ${[['Total','56',''],['Ouvertes','23','var(--orange)'],['En traitement','18','var(--blue)'],['Clôturées','26','var(--green)'],['Délai moyen','8,6 j',''],['Taux clôture','46%','var(--green)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:600${c?';color:'+c:''}">${v}</span></div>`).join('')}
    <div style="display:flex;justify-content:center;margin-top:12px"><svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="32" fill="none" stroke="#e5e7eb" stroke-width="12"/><circle cx="42" cy="42" r="32" fill="none" stroke="var(--green)" stroke-width="12" stroke-dasharray="${2*Math.PI*32*.46} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*.25}" stroke-linecap="round"/><text x="42" y="46" text-anchor="middle" font-size="12" font-weight="700" fill="var(--navy)">46%</text></svg></div>
  </div>`;
}

function kpiSideNC() {
  return `<div class="card"><div class="ct" style="margin-bottom:10px">KPI NC</div>
    ${[['Total','45',''],['Ouvertes','12','var(--orange)'],['En cours','8','var(--blue)'],['Clôturées','29','var(--green)'],['Délai moyen','3,2 j',''],['Taux clôture','64%','var(--green)'],['Critiques','4','var(--red)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:600${c?';color:'+c:''}">${v}</span></div>`).join('')}
    <div style="display:flex;justify-content:center;margin-top:12px"><svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="32" fill="none" stroke="#e5e7eb" stroke-width="12"/><circle cx="42" cy="42" r="32" fill="none" stroke="var(--green)" stroke-width="12" stroke-dasharray="${2*Math.PI*32*.64} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*.25}" stroke-linecap="round"/><text x="42" y="46" text-anchor="middle" font-size="12" font-weight="700" fill="var(--navy)">64%</text></svg></div>
  </div>`;
}

/* ════════════════════════════════════
   PAGES MAP
═══════════════════════════════════ */

function renderChecklistNav(activeId) {
  const checklists = [
    {id:'sec-cl-ext',  ic:'🔥', nom:'Extincteurs',   statut:'ok',  pct:89},
    {id:'sec-cl-phar', ic:'🏥', nom:'Pharmacie',      statut:'obs', pct:80},
    {id:'sec-cl-sst',  ic:'⚙',  nom:'SST',            statut:'ok',  pct:92},
    {id:'sec-cl-veh',  ic:'🚗', nom:'Véhicule',       statut:'obs', pct:65},
    {id:'sec-cl-epi',  ic:'🦺', nom:'EPI',            statut:'obs', pct:86},
    {id:'sec-cl-evaq', ic:'🚨', nom:'Évacuation',     statut:'ok',  pct:100},
  ];
  return `<div style="display:flex;gap:6px;overflow-x:auto;padding:3px 0;margin-bottom:12px">
    ${checklists.map(cl=>`<div onclick="goPage('${cl.id}')" style="flex-shrink:0;cursor:pointer;background:${cl.id===activeId?'var(--blue)':'var(--white)'};border:1.5px solid ${cl.id===activeId?'var(--blue)':'var(--border)'};border-radius:8px;padding:6px 11px;display:flex;align-items:center;gap:7px;transition:.12s" onmouseover="if('${cl.id}'!=='${activeId}')this.style.background='var(--bg)'" onmouseout="if('${cl.id}'!=='${activeId}')this.style.background='var(--white)'">
      <span style="font-size:14px">${cl.ic}</span>
      <div>
        <div style="font-size:10.5px;font-weight:700;color:${cl.id===activeId?'#fff':'var(--navy)'}">${cl.nom}</div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px">
          <div style="width:32px;height:3px;background:${cl.id===activeId?'rgba(255,255,255,.4)':'#e5e7eb'};border-radius:2px;overflow:hidden"><div style="height:100%;width:${cl.pct}%;background:${cl.id===activeId?'#fff':cl.statut==='ok'?'var(--green)':'var(--orange)'};border-radius:2px"></div></div>
          <span style="font-size:8.5px;color:${cl.id===activeId?'rgba(255,255,255,.8)':'var(--muted)'};">${cl.pct}%</span>
        </div>
      </div>
    </div>`).join('')}
  </div>`;
}

/* ── Exports globaux (compat templates onclick + chunks pages lazy) ── */
Object.assign(window, {
  STATE,
  RC_DATA,
  NC_DATA,
  ICONS,
  TITLES,
  ACT_STATUTS,
  ACT_PRIOS,
  ACT_COL_COLOR,
  ACT_COL_BG,
  ACT_TYPES_RC,
  ACT_TYPES_NC,
  changeStatut,
  updateProg,
  deleteAction,
  showAddActionModal,
  confirmAddAction,
  openEditAction,
  saveEditAction,
  badgeG,
  badgeS,
  filterRC,
  filterNC,
  goHome,
  goModule,
  goPage,
  buildIconNav,
  setTopbar,
  switchTab,
  timelineHTML,
  actionsTableRC,
  kpiSideRC,
  kpiSideNC,
  renderChecklistNav,
});

/* Chunks rc/nc/sec.pages.js référencent ces identifiants en global (hors module core). */
globalThis.ACT_STATUTS = ACT_STATUTS;
globalThis.ACT_PRIOS = ACT_PRIOS;
globalThis.ACT_COL_COLOR = ACT_COL_COLOR;
globalThis.ACT_COL_BG = ACT_COL_BG;
globalThis.ACT_TYPES_RC = ACT_TYPES_RC;
globalThis.ACT_TYPES_NC = ACT_TYPES_NC;
globalThis.RC_DATA = RC_DATA;
globalThis.NC_DATA = NC_DATA;
globalThis.STATE = STATE;
globalThis.badgeG = badgeG;
globalThis.badgeS = badgeS;
globalThis.timelineHTML = timelineHTML;
globalThis.actionsTableRC = actionsTableRC;
globalThis.kpiSideRC = kpiSideRC;
globalThis.kpiSideNC = kpiSideNC;
globalThis.filterRC = filterRC;
globalThis.filterNC = filterNC;

