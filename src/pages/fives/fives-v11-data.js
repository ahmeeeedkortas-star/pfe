/** Auto-generated from qhse_v11.html — 5S seed data */
export function ensureFivesV11SeedData() {
// ── Données Zones
if(!window.SS5_ZONES) window.SS5_ZONES = [
  {id:'Z-01',zone:'Usinage CNC',dep:'Usinage',resp:'KORTAS.A',lastAudit:'07/05/2026',nextAudit:'21/05/2026',score:92,S:94,T:90,N:92,S4:93,S5:91,statut:'Conforme',trend:+2},
  {id:'Z-02',zone:'Atelier Assemblage',dep:'Assemblage',resp:'A. Hadj-Ali',lastAudit:'05/05/2026',nextAudit:'19/05/2026',score:85,S:87,T:84,N:85,S4:84,S5:85,statut:'Conforme',trend:+3},
  {id:'Z-03',zone:'Zone Peinture',dep:'Peinture',resp:'HSE Officer',lastAudit:'03/05/2026',nextAudit:'17/05/2026',score:78,S:80,T:76,N:79,S4:77,S5:78,statut:'Non conforme',trend:-1},
  {id:'Z-04',zone:'Maintenance',dep:'Maintenance',resp:'M. Karim',lastAudit:'01/05/2026',nextAudit:'15/05/2026',score:65,S:68,T:63,N:67,S4:64,S5:63,statut:'Non conforme',trend:-2},
  {id:'Z-05',zone:'Magasin',dep:'Logistique',resp:'S. Yassine',lastAudit:'29/04/2026',nextAudit:'13/05/2026',score:88,S:90,T:87,N:89,S4:88,S5:86,statut:'Conforme',trend:+1},
  {id:'Z-06',zone:'Contrôle qualité',dep:'Qualité',resp:'KORTAS.A',lastAudit:'28/04/2026',nextAudit:'12/05/2026',score:72,S:74,T:70,N:73,S4:72,S5:71,statut:'Non conforme',trend:+4},
  {id:'Z-07',zone:'Logistique',dep:'Logistique',resp:'A. Ali',lastAudit:'27/04/2026',nextAudit:'11/05/2026',score:91,S:93,T:90,N:92,S4:91,S5:89,statut:'Conforme',trend:+2},
  {id:'Z-08',zone:'Bureau technique',dep:'BE Mécanique',resp:'Y. Reda',lastAudit:'25/04/2026',nextAudit:'09/05/2026',score:58,S:60,T:57,N:59,S4:57,S5:57,statut:'Non conforme',trend:-3},
  {id:'Z-09',zone:'Expédition',dep:'Logistique',resp:'A. Trabelsi',lastAudit:'24/04/2026',nextAudit:'08/05/2026',score:83,S:85,T:82,N:84,S4:83,S5:81,statut:'Conforme',trend:+1},
  {id:'Z-10',zone:'Services généraux',dep:'Admin',resp:'HSE Manager',lastAudit:'22/04/2026',nextAudit:'06/05/2026',score:68,S:70,T:67,N:69,S4:67,S5:67,statut:'Non conforme',trend:0},
];

// ── Données Audits
if(!window.SS5_AUDITS) window.SS5_AUDITS = [
  {id:'AUD5S-001',date:'02/05/2026',zone:'Usinage CNC',auditeur:'HSE Manager',score:92,statut:'Réalisé'},
  {id:'AUD5S-002',date:'05/05/2026',zone:'Atelier Assemblage',auditeur:'HSE Officer',score:85,statut:'Réalisé'},
  {id:'AUD5S-003',date:'07/05/2026',zone:'Zone Peinture',auditeur:'HSE Manager',score:78,statut:'Réalisé'},
  {id:'AUD5S-004',date:'12/05/2026',zone:'Maintenance',auditeur:'HSE Officer',score:null,statut:'En retard'},
  {id:'AUD5S-005',date:'15/05/2026',zone:'Magasin',auditeur:'Sami Gharbi',score:null,statut:'Planifié'},
  {id:'AUD5S-006',date:'18/05/2026',zone:'Contrôle qualité',auditeur:'HSE Officer',score:null,statut:'Planifié'},
  {id:'AUD5S-007',date:'20/05/2026',zone:'Logistique',auditeur:'Karim Ben Salah',score:null,statut:'Planifié'},
  {id:'AUD5S-008',date:'22/05/2026',zone:'Bureau technique',auditeur:'HSE Officer',score:null,statut:'En retard'},
  {id:'AUD5S-009',date:'25/05/2026',zone:'Expédition',auditeur:'HSE Manager',score:null,statut:'Planifié'},
  {id:'AUD5S-010',date:'28/05/2026',zone:'Services généraux',auditeur:'HSE Officer',score:null,statut:'Planifié'},
];

// ── Données Écarts
if(!window.SS5_ECARTS) window.SS5_ECARTS = [
  {id:'EC5S-001',date:'12/05/2026',zone:'Maintenance',ecart:'Outils non rangés — zone désorganisée',gravite:'Moyenne',statut:'Ouvert',resp:'M. Karim',dl:'10/05/2026'},
  {id:'EC5S-002',date:'07/05/2026',zone:'Zone Peinture',ecart:'Sol sale — présence de débris de production',gravite:'Moyenne',statut:'En cours',resp:'HSE Officer',dl:'11/05/2026'},
  {id:'EC5S-003',date:'05/05/2026',zone:'Atelier Assemblage',ecart:"Manque d'étiquetage des zones de stockage",gravite:'Mineure',statut:'En cours',resp:'A. Hadj-Ali',dl:'12/05/2026'},
  {id:'EC5S-004',date:'02/05/2026',zone:'Usinage CNC',ecart:'Stock au sol non conforme — hors zone',gravite:'Majeure',statut:'Ouvert',resp:'KORTAS.A',dl:'08/05/2026'},
  {id:'EC5S-005',date:'01/05/2026',zone:'Bureau technique',ecart:'Documents obsolètes non retirés du poste',gravite:'Mineure',statut:'En cours',resp:'Y. Reda',dl:'15/05/2026'},
  {id:'EC5S-006',date:'28/04/2026',zone:'Contrôle qualité',ecart:'Instruments de mesure non rangés après utilisation',gravite:'Moyenne',statut:'Clôturé',resp:'KORTAS.A',dl:'05/05/2026'},
];

// ── Données Actions
if(!window.SS5_ACTIONS) window.SS5_ACTIONS = [
  {id:'ACT5S-001',action:'Ranger les outils — mise en place rack mural',zone:'Maintenance',prio:'Haute',type:'Corrective',resp:'M. Karim',fin:'10/05/2026',statut:'En retard',prog:35},
  {id:'ACT5S-002',action:'Nettoyer zone peinture et éliminer débris',zone:'Zone Peinture',prio:'Haute',type:'Corrective',resp:'Yassine Milka',fin:'11/05/2026',statut:'En cours',prog:60},
  {id:'ACT5S-003',action:'Étiquetage de toutes les zones de stockage',zone:'Atelier Assemblage',prio:'Normale',type:'Préventive',resp:'Mohamed Ali',fin:'12/05/2026',statut:'En cours',prog:45},
  {id:'ACT5S-004',action:'Éliminer stock au sol — mise sur palettes',zone:'Usinage CNC',prio:'Critique',type:'Corrective',resp:'Ahmed Trabelsi',fin:'08/05/2026',statut:'En retard',prog:20},
  {id:'ACT5S-005',action:'Archiver et retirer documents obsolètes',zone:'Bureau technique',prio:'Normale',type:'Préventive',resp:'Y. Reda',fin:'15/05/2026',statut:'En cours',prog:70},
  {id:'ACT5S-006',action:'Standardiser rangement instruments mesure',zone:'Contrôle qualité',prio:'Haute',type:'Préventive',resp:'KORTAS.A',fin:'20/05/2026',statut:'À faire',prog:0},
  {id:'ACT5S-007',action:'Former équipes aux standards 5S visuels',zone:'Logistique',prio:'Normale',type:'Préventive',resp:'A. Ali',fin:'25/05/2026',statut:'À faire',prog:0},
  {id:'ACT5S-008',action:'Installation balisage et marquage au sol',zone:'Usinage CNC',prio:'Haute',type:'Corrective',resp:'KORTAS.A',fin:'18/05/2026',statut:'Clôturée',prog:100},
];

// ── Historique KPI
if(!window.SS5_KPI_HIST) window.SS5_KPI_HIST = [
  {mois:'Déc 2025',val:65},{mois:'Jan 2026',val:68},{mois:'Fév 2026',val:72},
  {mois:'Mar 2026',val:76},{mois:'Avr 2026',val:75},{mois:'Mai 2026',val:78.6},
];

// ── Responsables
if(!window.SS5_RESPS) window.SS5_RESPS = [
  {id:'R1',nom:'KORTAS.A',poste:'Responsable Qualité',dep:'Qualité',email:'kortas.a@xpertmeca.com',col:'#2563eb'},
  {id:'R2',nom:'HSE Manager',poste:'Responsable HSE',dep:'Sécurité',email:'hse.manager@xpertmeca.com',col:'#16a34a'},
  {id:'R3',nom:'HSE Officer',poste:'Agent HSE',dep:'Sécurité',email:'hse.officer@xpertmeca.com',col:'#7c3aed'},
  {id:'R4',nom:'M. Karim',poste:'Chef Maintenance',dep:'Maintenance',email:'m.karim@xpertmeca.com',col:'#dc2626'},
  {id:'R5',nom:'A. Hadj-Ali',poste:'Chef Assemblage',dep:'Assemblage',email:'a.hadjali@xpertmeca.com',col:'#f59e0b'},
  {id:'R6',nom:'S. Yassine',poste:'Magasinier chef',dep:'Logistique',email:'s.yassine@xpertmeca.com',col:'#0891b2'},
];

// ── Checklist template
if(!window.SS5_CL_TEMPLATE) window.SS5_CL_TEMPLATE = {
  S1:{items:[{n:1,label:"Élimination des objets inutiles sur le poste",critical:true},{n:2,label:"Séparation des objets utiles / inutiles",critical:false},{n:3,label:"Espace dégagé et accessible",critical:false},{n:4,label:"Déchets identifiés et évacués",critical:true},{n:5,label:"Matériaux hors zone éliminés",critical:false}]},
  S2:{items:[{n:1,label:"Organisation des postes de travail",critical:false},{n:2,label:"Matérialisation des zones (balisage, couleur)",critical:true},{n:3,label:"Accessibilité immédiate des outils",critical:false},{n:4,label:"Étiquetage et identification des emplacements",critical:true},{n:5,label:"Rangement après utilisation respecté",critical:false}]},
  S3:{items:[{n:1,label:"Propreté générale de la zone",critical:true},{n:2,label:"Nettoyage des machines et équipements",critical:false},{n:3,label:"Élimination des sources de saleté",critical:true},{n:4,label:"Matériels de nettoyage disponibles",critical:false},{n:5,label:"Sol propre et sans déchets",critical:true}]},
  S4:{items:[{n:1,label:"Standards visuels affichés et respectés",critical:false},{n:2,label:"Règles et procédures à jour",critical:true},{n:3,label:"Constance des pratiques 5S",critical:false},{n:4,label:"Indicateurs de performance affichés",critical:false},{n:5,label:"Anomalies signalées et traitées",critical:true}]},
  S5:{items:[{n:1,label:"Respect des règles établies",critical:true},{n:2,label:"Autodiscipline et auto-évaluation",critical:false},{n:3,label:"Amélioration continue appliquée",critical:false},{n:4,label:"Formation 5S réalisée",critical:true},{n:5,label:"Engagement de toute l’équipe visible",critical:false}]},
};

if(!window.SS5_CL_DATA)

if(!window.SS5_CL_DATA) window.SS5_CL_DATA = {};
}
