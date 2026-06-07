/** Auto-generated from qhse_v11.html — Audit seed data */
import { ensureAuditProcesses, AUDIT_DEFAULT_PROCESSES } from './audit-store.js';

export function ensureAuditV11SeedData() {
if(!window.AUDIT_PLANS) window.AUDIT_PLANS = [
  {id:'AUD-2026-001',ref:'PROD-2026-001',titre:'Audit ISO 9001 - Processus Production',type:'ISO 9001',processus:'Production',zone:'Atelier CNC',statut:'Planifié',dateDebut:'05/06/2026',dateFin:'05/06/2026',auditeur:'Ahmed Trabelsi',resp:'KORTAS.A',score:null,prog:0,wfStep:1,notes:''},
  {id:'AUD-2026-002',ref:'SEC-2026-003',titre:'Audit ISO 45001 - Sécurité Atelier',type:'ISO 45001',processus:'Sécurité',zone:'Atelier Usinage',statut:'En cours',dateDebut:'15/05/2026',dateFin:'15/05/2026',auditeur:'Yassine Milka',resp:'HSE Manager',score:null,prog:45,wfStep:3,notes:''},
  {id:'AUD-2026-003',ref:'ACH-2026-005',titre:'Audit ISO 9001 - Achats',type:'ISO 9001',processus:'Achat',zone:'Magasin',statut:'Terminé',dateDebut:'02/05/2026',dateFin:'02/05/2026',auditeur:'Karim Ben Salah',resp:'KORTAS.A',score:92,prog:100,wfStep:5,notes:''},
  {id:'AUD-2026-004',ref:'QUAL-2026-007',titre:'Audit ISO 9001 - Contrôle Qualité',type:'ISO 9001',processus:'Qualité',zone:'Contrôle Qualité',statut:'En retard',dateDebut:'20/04/2026',dateFin:'20/04/2026',auditeur:'Ahmed Trabelsi',resp:'KORTAS.A',score:null,prog:20,wfStep:2,notes:'5 jours de retard'},
  {id:'AUD-2026-005',ref:'MAINT-2026-004',titre:'Audit Interne - Maintenance',type:'Interne',processus:'Maintenance',zone:'Maintenance',statut:'En cours',dateDebut:'14/05/2026',dateFin:'14/05/2026',auditeur:'Mohamed Ali',resp:'M. Karim',score:null,prog:60,wfStep:3,notes:''},
  {id:'AUD-2026-006',ref:'RH-2026-006',titre:'Audit Interne - RH',type:'Interne',processus:'RH',zone:'Bureau RH',statut:'Terminé',dateDebut:'28/04/2026',dateFin:'28/04/2026',auditeur:'Hela Mansour',resp:'HSE Manager',score:85,prog:100,wfStep:5,notes:''},
  {id:'AUD-2026-007',ref:'ENV-2026-008',titre:'Audit ISO 14001 - Gestion Déchets',type:'ISO 14001',processus:'Environnement',zone:'Production',statut:'En retard',dateDebut:'25/04/2026',dateFin:'25/04/2026',auditeur:'Sami Gharbi',resp:'HSE Manager',score:null,prog:10,wfStep:2,notes:'3 jours de retard'},
  {id:'AUD-2026-008',ref:'ENV-2026-002',titre:'Audit ISO 14001 - Environnement',type:'ISO 14001',processus:'Environnement',zone:'Production',statut:'Planifié',dateDebut:'10/06/2026',dateFin:'10/06/2026',auditeur:'Sami Gharbi',resp:'HSE Manager',score:null,prog:0,wfStep:1,notes:''},
];

/* ── Données Constats ── */
if(!window.AUDIT_CONSTATS) window.AUDIT_CONSTATS = [
  {id:'NC-2026-015',auditId:'AUD-2026-002',type:'NC',processus:'Sécurité',desc:'Absence de procédure d\'évacuation affichée',gravite:'Majeure',statut:'Ouvert',dateDetect:'15/05/2026',resp:'Yassine Milka',ref:'ISO 45001 §8.2'},
  {id:'NC-2026-014',auditId:'AUD-2026-001',type:'NC',processus:'Qualité',desc:'Enregistrement incomplet des contrôles',gravite:'Mineure',statut:'Ouvert',dateDetect:'10/05/2026',resp:'Ahmed Trabelsi',ref:'ISO 9001 §9.1'},
  {id:'NC-2026-013',auditId:'AUD-2026-005',type:'NC',processus:'Maintenance',desc:'Lubrification préventive non réalisée',gravite:'Majeure',statut:'Ouvert',dateDetect:'14/05/2026',resp:'Mohamed Ali',ref:'ISO 9001 §7.1'},
  {id:'NC-2026-012',auditId:'AUD-2026-001',type:'NC',processus:'Achats',desc:'Évaluation fournisseurs non à jour',gravite:'Mineure',statut:'Ouvert',dateDetect:'05/05/2026',resp:'Karim Ben Salah',ref:'ISO 9001 §8.4'},
  {id:'NC-2026-011',auditId:'AUD-2026-007',type:'NC',processus:'Environnement',desc:'Tri des déchets non conforme',gravite:'Majeure',statut:'Ouvert',dateDetect:'10/05/2026',resp:'Sami Gharbi',ref:'ISO 14001 §8.1'},
  {id:'OBS-2026-003',auditId:'AUD-2026-003',type:'OBS',processus:'Achats',desc:'Délais fournisseurs à surveiller',gravite:'Mineure',statut:'En cours',dateDetect:'02/05/2026',resp:'Karim Ben Salah',ref:'ISO 9001 §8.4'},
  {id:'OBS-2026-002',auditId:'AUD-2026-006',type:'OBS',processus:'RH',desc:'Sensibilisation ISO à renforcer',gravite:'Mineure',statut:'Clôturé',dateDetect:'28/04/2026',resp:'Hela Mansour',ref:'ISO 9001 §7.3'},
  {id:'BP-2026-001',auditId:'AUD-2026-003',type:'BP',processus:'Achats',desc:'Excellent suivi des commandes — tableau de bord fournisseurs très complet',gravite:'NA',statut:'Noté',dateDetect:'02/05/2026',resp:'Karim Ben Salah',ref:''},
];

/* ── Données Actions ── */
if(!window.AUDIT_ACTIONS) window.AUDIT_ACTIONS = [
  {id:'ACT-AUD-001',constatId:'NC-2026-015',auditId:'AUD-2026-002',action:'Mettre à jour la procédure d\'évacuation',resp:'Yassine Milka',echeance:'25/05/2026',prog:60,statut:'En cours'},
  {id:'ACT-AUD-002',constatId:'NC-2026-014',auditId:'AUD-2026-001',action:'Compléter les enregistrements qualité',resp:'Ahmed Trabelsi',echeance:'20/05/2026',prog:40,statut:'En cours'},
  {id:'ACT-AUD-003',constatId:'NC-2026-013',auditId:'AUD-2026-005',action:'Planifier la lubrification préventive',resp:'Mohamed Ali',echeance:'22/05/2026',prog:80,statut:'En cours'},
  {id:'ACT-AUD-004',constatId:'NC-2026-012',auditId:'AUD-2026-001',action:'Réévaluer les fournisseurs critiques',resp:'Karim Ben Salah',echeance:'30/05/2026',prog:20,statut:'À faire'},
  {id:'ACT-AUD-005',constatId:'NC-2026-011',auditId:'AUD-2026-007',action:'Sensibiliser au tri des déchets',resp:'Sami Gharbi',echeance:'25/05/2026',prog:100,statut:'Terminée'},
];

/* ── Données Auditeurs ── */
if(!window.AUDIT_AUDITEURS) window.AUDIT_AUDITEURS = [
  {id:'AUDR-001',nom:'Ahmed Trabelsi',poste:'Auditeur principal',dep:'Qualité',qualif:['ISO 9001','ISO 14001'],audits:14,tauxConf:89,col:'#2563eb'},
  {id:'AUDR-002',nom:'Yassine Milka',poste:'Auditeur HSE',dep:'Sécurité',qualif:['ISO 45001','ISO 14001'],audits:9,tauxConf:91,col:'#16a34a'},
  {id:'AUDR-003',nom:'Karim Ben Salah',poste:'Auditeur qualité',dep:'Qualité',qualif:['ISO 9001'],audits:11,tauxConf:87,col:'#7c3aed'},
  {id:'AUDR-004',nom:'Sami Gharbi',poste:'Auditeur environnement',dep:'HSE',qualif:['ISO 14001','ISO 45001'],audits:7,tauxConf:85,col:'#0891b2'},
  {id:'AUDR-005',nom:'Mohamed Ali',poste:'Auditeur interne',dep:'Maintenance',qualif:['ISO 9001'],audits:6,tauxConf:83,col:'#dc2626'},
  {id:'AUDR-006',nom:'Hela Mansour',poste:'Auditeur RH',dep:'RH',qualif:['ISO 9001','ISO 45001'],audits:5,tauxConf:92,col:'#ea580c'},
];

/* ── Données Documents ── */
if(!window.AUDIT_DOCS_LIST) window.AUDIT_DOCS_LIST = [
  {id:'DOC-AUD-001',auditId:'AUD-2026-003',nom:'Rapport Audit Achats',type:'Rapport',date:'02/05/2026',auteur:'Karim Ben Salah',statut:'Validé'},
  {id:'DOC-AUD-002',auditId:'AUD-2026-006',nom:'Rapport Audit RH',type:'Rapport',date:'28/04/2026',auteur:'Hela Mansour',statut:'Validé'},
  {id:'DOC-AUD-003',auditId:'AUD-2026-002',nom:'Checklist ISO 45001 Atelier',type:'Checklist',date:'15/05/2026',auteur:'Yassine Milka',statut:'En cours'},
  {id:'DOC-AUD-004',auditId:'AUD-2026-001',nom:'Programme audit Production 2026',type:'Programme',date:'01/05/2026',auteur:'KORTAS.A',statut:'Validé'},
];

/* ── Historique KPI ── */
if(!window.AUDIT_KPI_HIST) window.AUDIT_KPI_HIST = [
  {mois:'Nov 2025',val:78},{mois:'Déc 2025',val:82},{mois:'Jan 2026',val:85},
  {mois:'Fév 2026',val:84},{mois:'Mar 2026',val:87},{mois:'Avr 2026',val:87},
];

/* ── Checklists ── */
if(!window.AUDIT_CHECKLISTS) window.AUDIT_CHECKLISTS = [
  {id:'CL-001',titre:'Checklist ISO 9001 — Management de la qualité',norme:'ISO 9001',version:'2025-01',items:[
    {n:1,section:'4. Contexte',exig:'4.1',desc:'L\'organisation a déterminé les enjeux internes et externes',statut:null},
    {n:2,section:'4. Contexte',exig:'4.2',desc:'Les parties intéressées et leurs besoins sont identifiés',statut:null},
    {n:3,section:'5. Leadership',exig:'5.1',desc:'La direction démontre son leadership et son engagement',statut:null},
    {n:4,section:'5. Leadership',exig:'5.2',desc:'Une politique qualité est établie, documentée et communiquée',statut:null},
    {n:5,section:'6. Planification',exig:'6.1',desc:'Les risques et opportunités sont déterminés',statut:null},
    {n:6,section:'7. Support',exig:'7.1',desc:'Les ressources nécessaires sont déterminées et fournies',statut:null},
    {n:7,section:'8. Réalisation',exig:'8.1',desc:'La planification opérationnelle est maîtrisée',statut:null},
    {n:8,section:'9. Évaluation',exig:'9.1',desc:'Les processus sont surveillés, mesurés et évalués',statut:null},
    {n:9,section:'9. Évaluation',exig:'9.2',desc:'Des audits internes sont planifiés et réalisés',statut:null},
    {n:10,section:'10. Amélioration',exig:'10.2',desc:'Les non-conformités sont corrigées et analysées',statut:null},
  ]},
  {id:'CL-002',titre:'Checklist ISO 45001 — Sécurité au travail',norme:'ISO 45001',version:'2025-01',items:[
    {n:1,section:'4. Contexte',exig:'4.1',desc:'Les enjeux du contexte sont déterminés',statut:null},
    {n:2,section:'5. Leadership',exig:'5.1',desc:'Engagement de la direction pour la SST',statut:null},
    {n:3,section:'6. Planification',exig:'6.1',desc:'Risques et opportunités pour la SST identifiés',statut:null},
    {n:4,section:'7. Support',exig:'7.2',desc:'Compétences des travailleurs évaluées',statut:null},
    {n:5,section:'8. Réalisation',exig:'8.1',desc:'Contrôles opérationnels en place',statut:null},
  ]},
  {id:'CL-003',titre:'Checklist ISO 14001 — Management environnemental',norme:'ISO 14001',version:'2025-01',items:[
    {n:1,section:'4. Contexte',exig:'4.1',desc:'Enjeux environnementaux déterminés',statut:null},
    {n:2,section:'6. Planification',exig:'6.1',desc:'Aspects environnementaux significatifs identifiés',statut:null},
    {n:3,section:'8. Réalisation',exig:'8.1',desc:'Maîtrise opérationnelle des aspects significatifs',statut:null},
    {n:4,section:'9. Évaluation',exig:'9.3',desc:'Revue de direction réalisée',statut:null},
  ]},
];

if(!window.AUDIT_CL_DATA) window.AUDIT_CL_DATA = {};
if(!window.auditSelPlan) window.auditSelPlan = null;
if(!window.auditFilter) window.auditFilter = {type:'',processus:'',statut:'',q:''};
if(!window.auditView) window.auditView = 'kanban';
if(!window.auditConstatFilter) window.auditConstatFilter = {type:'',statut:'',q:''};
if(!window.auditSelCL) window.auditSelCL = 'CL-001';
if(!window.auditSelAudit) window.auditSelAudit = null;

if (!window.AUDIT_PROCESSES?.length) {
  window.AUDIT_PROCESSES = [...AUDIT_DEFAULT_PROCESSES];
}
ensureAuditProcesses();
['Maintenance', 'Développement', 'Commercial'].forEach((p) => {
  if (!window.AUDIT_PROCESSES.includes(p)) window.AUDIT_PROCESSES.push(p);
});
window.AUDIT_PLANS = (window.AUDIT_PLANS || []).map((a) => {
  const map = { Achats: 'Achat', 'Ressources Humaines': 'RH' };
  return map[a.processus] ? { ...a, processus: map[a.processus] } : a;
});
window.AUDIT_CONSTATS = (window.AUDIT_CONSTATS || []).map((c) => {
  const procMap = { Achats: 'Achat', 'Ressources Humaines': 'RH' };
  let type = c.type;
  if (type === 'OBS' || type === 'BP') type = 'AC';
  const processus = procMap[c.processus] || c.processus;
  return { ...c, type, processus, delai: c.delai || c.echeance || '' };
});

/* ════ AUDIT CRUD FUNCTIONS ════ */
}
