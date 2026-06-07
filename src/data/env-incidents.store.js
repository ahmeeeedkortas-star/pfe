/** Incidents environnementaux — persistance localStorage. */
import { canAutoSeed } from '../core/empty-platform.js';

const KEY = 'xm_env_incidents_v1';

const SEED = [
  {
    id: 'INC-ENV-001',
    date: '15/05/2026',
    heure: '09:45',
    type: 'Fuite',
    zone: 'Atelier Usinage',
    description: 'Fuite d\'huile hydraulique presse P4',
    descDetaillee:
      'Constat lors de la ronde HSE : trace d\'huile au sol près de la presse P4. Arrêt machine immédiat. Absorbants déployés.',
    gravite: 'Majeure',
    statut: 'Ouvert',
    resp: 'HSE',
    declarePar: 'KORTAS.A',
    causes: ['Joint usé sur vérin', 'Maintenance préventive insuffisante'],
    causeRacine: 'Absence de plan de remplacement joints hydrauliques',
    impacts: 'Sol pollué ~2 m² — risque infiltration nappe phréatique faible',
    actionsImmediates: [
      { titre: 'Confinement et nettoyage zone', resp: 'HSE', delai: '15/05/2026', statut: 'Clôturé' },
    ],
    actions: [
      { titre: 'Remplacement joint vérin P4', resp: 'Maintenance', delai: '22/05/2026', statut: 'En cours' },
      { titre: 'Revue plan maintenance hydraulique', resp: 'HSE', delai: '30/06/2026', statut: 'Planifié' },
    ],
    fichiers: ['photo_fuite.jpg', 'rapport_intervention.pdf'],
    delai: '30/05/2026',
    validation: { validePar: '', dateValidation: '', commentaire: 'En attente clôture actions' },
    step: 2,
    notes: '',
  },
  {
    id: 'INC-ENV-002',
    date: '10/05/2026',
    heure: '14:20',
    type: 'Fuite',
    zone: 'Zone Production',
    description: 'Fuite circuit eau refroidissement',
    descDetaillee: 'Goutte à goutte sur raccord PVC — pas d\'arrêt production.',
    gravite: 'Mineure',
    statut: 'En cours',
    resp: 'Maintenance',
    declarePar: 'Chef ligne',
    causes: ['Raccord défectueux'],
    causeRacine: 'Vieillissement raccords PVC',
    impacts: 'Surconsommation eau estimée +5 m³/jour',
    actionsImmediates: [{ titre: 'Bac récupération eau', resp: 'Maintenance', delai: '10/05/2026', statut: 'Clôturé' }],
    actions: [{ titre: 'Remplacement raccord', resp: 'Maintenance', delai: '18/05/2026', statut: 'En cours' }],
    fichiers: [],
    delai: '25/05/2026',
    validation: { validePar: '', dateValidation: '', commentaire: '' },
    step: 3,
    notes: '',
  },
  {
    id: 'INC-ENV-003',
    date: '02/05/2026',
    heure: '11:05',
    type: 'Déversement',
    zone: 'Stockage',
    description: 'Renversement bac récupération huile',
    descDetaillee: 'Bac basculé lors de déplacement chariot — ~15 L huile usagée au sol.',
    gravite: 'Majeure',
    statut: 'En cours',
    resp: 'HSE',
    declarePar: 'Magasinier',
    causes: ['Manutention', 'Bac non fixé'],
    causeRacine: 'Procédure manutention non respectée',
    impacts: 'Zone stockage polluée — déchets dangereux à traiter',
    actionsImmediates: [
      { titre: 'Absorption et évacuation déchets', resp: 'HSE', delai: '02/05/2026', statut: 'Clôturé' },
    ],
    actions: [
      { titre: 'Fixation bacs récupération', resp: 'Logistique', delai: '20/05/2026', statut: 'Planifié' },
      { titre: 'Formation manutention', resp: 'RH', delai: '15/06/2026', statut: 'Planifié' },
    ],
    fichiers: ['photo_bac.jpg'],
    delai: '15/06/2026',
    validation: { validePar: '', dateValidation: '', commentaire: '' },
    step: 3,
    notes: '',
  },
];

function load() {
  try {
    const r = localStorage.getItem(KEY);
    if (r) return JSON.parse(r);
  } catch {
    /* ignore */
  }
  return null;
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function normalizeIncident(i) {
  return {
    actionsImmediates: [],
    validation: { validePar: '', dateValidation: '', commentaire: '' },
    step: 1,
    heure: '',
    descDetaillee: '',
    declarePar: '',
    ...i,
    actionsImmediates: i.actionsImmediates ?? [],
    actions: i.actions ?? [],
    validation: { validePar: '', dateValidation: '', commentaire: '', ...(i.validation || {}) },
    descDetaillee: i.descDetaillee || i.description || '',
  };
}

export function seedEnvIncidents() {
  if (!window.ENV_INCIDENTS_DATA) {
    const stored = load();
    const raw = stored ?? (canAutoSeed() ? structuredClone(SEED) : []);
    window.ENV_INCIDENTS_DATA = raw.map(normalizeIncident);
    if (!stored && canAutoSeed()) save(window.ENV_INCIDENTS_DATA);
    else if (stored) save(window.ENV_INCIDENTS_DATA);
  }
}

export function getIncidents() {
  seedEnvIncidents();
  return window.ENV_INCIDENTS_DATA;
}

export function addIncident(item) {
  const d = getIncidents();
  const n = d.length + 1;
  d.unshift({
    causes: [],
    actions: [],
    actionsImmediates: [],
    fichiers: [],
    validation: { validePar: '', dateValidation: '', commentaire: '' },
    step: 1,
    heure: '',
    descDetaillee: '',
    declarePar: '',
    ...item,
    id: `INC-ENV-${String(n).padStart(3, '0')}`,
  });
  save(d);
}

export function updateIncident(id, changes) {
  const d = getIncidents();
  const i = d.findIndex((x) => x.id === id);
  if (i !== -1) {
    d[i] = { ...d[i], ...changes };
    save(d);
  }
}

export function deleteIncident(id) {
  window.ENV_INCIDENTS_DATA = getIncidents().filter((x) => x.id !== id);
  save(window.ENV_INCIDENTS_DATA);
}

export const INC_GRAVITES = ['Mineure', 'Majeure', 'Critique'];
export const INC_STATUTS = ['Ouvert', 'En cours', 'Clôturé'];
export const INC_TYPES = ['Fuite', 'Déversement', 'Émission', 'Autre'];
