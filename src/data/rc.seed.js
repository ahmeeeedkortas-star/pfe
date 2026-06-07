import { createRc8dDefaults } from './rc-8d-defaults.js';

const RC_001_8D = createRc8dDefaults({
  d2What: 'Erreur dimension pièce usinée',
  d2Where: "Poste d'usinage - U5",
  d2When: '02/05/2026',
  d2Who: 'Opérateur CN01',
  d2Qty: '10',
  d3Actions: [
    { action: 'Blocage pièces non conformes', resp: 'Y. Reda', statut: 'Clôturée' },
  ],
  d4CauseMain: 'Outil usé — dérive dimensionnelle',
  d4Causes5P: ['Méthode', 'Matériel', 'Main-d\'œuvre'],
  d5Actions: [
    { action: 'Modifier nomenclature pièce P007', resp: 'M. Karim', statut: 'En cours' },
  ],
  d7Actions: [
    { action: 'MAJ procédure contrôle réception', resp: 'Y. Reda', statut: 'À faire' },
  ],
  emailClient: '',
  broadcastSent: false,
  broadcastDate: '',
});

export const RC_DATA = [
  { n: 'RC-001', d: '02/05/2026', p: 'M077', cl: 'Client A', dep: 'BE Mécanique', g: 'Critique', s: 'En traitement', r: 'KORTAS.A', dl: '5j', obj: 'Erreur dimension pièce usinée', prog: 0, ...RC_001_8D },
  { n: 'RC-002', d: '05/05/2026', p: 'M078', cl: 'Client B', dep: 'Automatisme', g: 'Majeure', s: 'En analyse', r: 'M. Karim', dl: '7j', obj: 'Câblage non conforme au plan', prog: 0, ...createRc8dDefaults() },
  { n: 'RC-003', d: '08/05/2026', p: 'M077', cl: 'Client C', dep: 'Assemblage', g: 'Mineure', s: 'Ouvert', r: 'Y. Reda', dl: '2j', obj: 'Finition surface insuffisante', prog: 0, ...createRc8dDefaults() },
  { n: 'RC-004', d: '10/05/2026', p: 'M076', cl: 'Client A', dep: 'Usinage', g: 'Majeure', s: 'En traitement', r: 'KORTAS.A', dl: '6j', obj: 'Tolérance hors spécification', prog: 0, ...createRc8dDefaults() },
  { n: 'RC-005', d: '12/05/2026', p: 'M079', cl: 'Client D', dep: 'BE Mécanique', g: 'Mineure', s: 'Clôturée', r: 'M. Karim', dl: '—', obj: 'Documentation incomplète', prog: 100, joursTraitement: 3, ...createRc8dDefaults() },
  { n: 'RC-006', d: '14/05/2026', p: 'M077', cl: 'Client B', dep: 'Usinage', g: 'Critique', s: 'En analyse', r: 'A. Ali', dl: '4j', obj: 'Défaut matière première lot 42', prog: 0, ...createRc8dDefaults() },
  { n: 'RC-007', d: '15/05/2026', p: 'M078', cl: 'Client A', dep: 'Assemblage', g: 'Majeure', s: 'Ouvert', r: 'Y. Reda', dl: '1j', obj: "Jeu excessif à l'assemblage", prog: 0, ...createRc8dDefaults() },
  { n: 'RC-008', d: '17/05/2026', p: 'M080', cl: 'Client C', dep: 'BE Mécanique', g: 'Mineure', s: 'Clôturée', r: 'KORTAS.A', dl: '—', obj: 'Erreur de cotation sur plan', prog: 100, joursTraitement: 5, ...createRc8dDefaults() },
  { n: 'RC-009', d: '18/05/2026', p: 'M077', cl: 'Client D', dep: 'Usinage', g: 'Critique', s: 'En traitement', r: 'M. Karim', dl: '3j', obj: 'Rugosité hors tolérance Ra', prog: 0, ...createRc8dDefaults() },
];
