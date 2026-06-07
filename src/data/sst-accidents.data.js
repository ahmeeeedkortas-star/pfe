/** Données complètes — registre accidents & incidents. */
import { canAutoSeed } from '../core/empty-platform.js';

export const SST_ACCIDENTS_SEED = [
  {
    id: 'A-2025-003',
    type: 'Accident',
    date: '2025-05-20',
    heure: '10:30',
    employe: 'Ali Mohammed',
    matricule: 'OP-CN-2209',
    fonction: 'Opérateur CN',
    anciennete: '3 ans',
    dept: 'Usinage',
    lieu: 'Atelier Usinage, Machine CN 05',
    blessure: 'Coupure main gauche',
    gravite: 'Grave',
    arret: 'Oui',
    jours: 7,
    temoins: 'Ahmed Samir',
    soins: 'Oui — sur site',
    desc: "Lors du changement de pièce sur la machine CN 05, l'opérateur a été blessé à la main gauche par la pièce en cours d'usinage.",
    pourquoi: [
      "La main de l'opérateur a touché la pièce en rotation",
      "Il n'y avait pas de protège-main en place",
      'La protection a été retirée pour faciliter le changement',
      'Absence de procédure de verrouillage (consignation)',
    ],
    causeRacine: 'Formation insuffisante et procédure consignation manquante',
    actions: [
      { titre: 'Installer protection machine CN', resp: 'HSE', delai: '2025-05-31', statut: 'En cours' },
      { titre: 'Former opérateurs à la consignation', resp: 'RH + HSE', delai: '2025-06-15', statut: 'Planifié' },
      { titre: 'Créer procédure de consignation', resp: 'HSE', delai: '2025-06-20', statut: 'Planifié' },
    ],
    statut: 'En cours',
    step: 3,
  },
  {
    id: 'A-2025-002',
    type: 'Accident',
    date: '2025-05-05',
    heure: '14:15',
    employe: 'Karim Saïd',
    matricule: 'MT-AS-1104',
    fonction: 'Monteur',
    anciennete: '5 ans',
    dept: 'Assemblage',
    lieu: 'Poste AS3',
    blessure: 'Chute plein pied',
    gravite: 'Légère',
    arret: 'Non',
    jours: 0,
    temoins: 'Youssef A.',
    soins: 'Oui — sur site',
    desc: "L'opérateur a glissé sur le sol mouillé suite à une fuite non signalée.",
    pourquoi: [
      "L'opérateur a glissé sur le sol",
      'Le sol était mouillé suite à une fuite',
      'Absence de signalisation sol glissant',
    ],
    causeRacine: 'Absence de procédure de nettoyage et signalisation inadéquate',
    actions: [
      { titre: 'Nettoyer et sécher le sol', resp: 'Maintenance', delai: '2025-05-05', statut: 'Clôturé' },
      { titre: 'Installer panneaux sol glissant', resp: 'HSE', delai: '2025-05-10', statut: 'Clôturé' },
    ],
    statut: 'Clôturé',
    step: 5,
  },
  {
    id: 'A-2025-001',
    type: 'Accident',
    date: '2025-04-12',
    heure: '09:20',
    employe: 'Youssef Ahmed',
    matricule: 'EL-MT-0892',
    fonction: 'Électricien',
    anciennete: '7 ans',
    dept: 'Maintenance',
    lieu: 'Local technique B',
    blessure: 'Brûlure avant-bras',
    gravite: 'Moyenne',
    arret: 'Non',
    jours: 0,
    temoins: '—',
    soins: 'Oui — sur site',
    desc: "Contact accidentel avec surface chaude lors d'une intervention sur équipement en température.",
    pourquoi: [
      'Contact accidentel avec surface chaude',
      'Absence de gant haute température',
      'Procédure non respectée',
    ],
    causeRacine: "Non-respect des EPI lors d'intervention sur équipement en température",
    actions: [{ titre: 'Former aux EPI haute température', resp: 'HSE', delai: '2025-04-30', statut: 'Clôturé' }],
    statut: 'Clôturé',
    step: 5,
  },
  {
    id: 'I-2025-007',
    type: 'Incident',
    date: '2025-05-18',
    heure: '08:45',
    employe: 'Mehdi Rais',
    matricule: 'LOG-MG-2210',
    fonction: 'Magasinier',
    anciennete: '2 ans',
    dept: 'Magasin',
    lieu: 'Allée stockage B',
    blessure: 'Presque-accident',
    gravite: '—',
    arret: '—',
    jours: 0,
    temoins: 'Ali M.',
    soins: 'Non',
    desc: "Une charge a failli tomber du rayonnage lors d'un déplacement de palette.",
    pourquoi: [
      'Une charge a failli tomber du rayonnage',
      'Le rayonnage était surchargé',
      'Absence de contrôle des charges maximales',
    ],
    causeRacine: 'Absence de contrôle régulier du chargement des rayonnages',
    actions: [
      { titre: 'Audit complet des rayonnages', resp: 'HSE', delai: '2025-05-25', statut: 'Planifié' },
      { titre: 'Apposer étiquettes charge max.', resp: 'Logistique', delai: '2025-05-30', statut: 'Planifié' },
    ],
    statut: 'Ouvert',
    step: 1,
  },
];

export function seedSstAccidents() {
  if (!canAutoSeed()) {
    if (!window.acc_data) window.acc_data = [];
    return;
  }
  if (!window.acc_data?.length) {
    window.acc_data = SST_ACCIDENTS_SEED.map((a) => ({
      ...a,
      actions: a.actions.map((x) => ({ ...x })),
      pourquoi: [...a.pourquoi],
    }));
  }
  if (window.acc_sel === undefined) window.acc_sel = null;
  if (!window.acc_view) window.acc_view = 'list';
  if (window.acc_newStep == null) window.acc_newStep = 1;
  if (!window.acc_detailTab) window.acc_detailTab = 'info';
  if (!window._accFilter) window._accFilter = { q: '', stat: '', grav: '', dept: '' };
}
