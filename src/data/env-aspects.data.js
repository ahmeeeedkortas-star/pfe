/** Données — registre aspects environnementaux (ISO 14001). */
import { canAutoSeed } from '../core/empty-platform.js';

function aspectNiv(score) {
  if (score >= 24) return 'Critique';
  if (score >= 12) return 'Significatif';
  if (score >= 6) return 'Modéré';
  return 'Faible';
}

function withNiv(a) {
  const score = (+a.g || 1) * (+a.freq || 1) * (+a.crit || 1);
  return { ...a, niv: aspectNiv(score) };
}

export const ENV_ASPECTS_SEED = [
  {
    id: 'ASP-001',
    activite: 'Usinage CN',
    aspect: 'Huile de coupe usagée',
    impact: 'Pollution sols/eaux',
    g: 3,
    freq: 4,
    crit: 1,
    s: 'Maîtrisé',
    action: 'Collecte + prestataire agréé',
    resp: 'Maintenance',
    delai: '2025-12-31',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 1,
    rr_freq: 2,
    rr_crit: 1,
  },
  {
    id: 'ASP-002',
    activite: 'Usinage CN',
    aspect: 'Copeaux métalliques',
    impact: 'Ressources / sols',
    g: 2,
    freq: 5,
    crit: 2,
    s: 'Maîtrisé',
    action: 'Tri et valorisation métaux',
    resp: 'Maintenance',
    delai: '2025-11-30',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 1,
    rr_freq: 3,
    rr_crit: 1,
  },
  {
    id: 'ASP-003',
    activite: 'Peinture',
    aspect: 'Solvants et COV',
    impact: "Pollution de l'air",
    g: 3,
    freq: 4,
    crit: 1,
    s: 'En cours',
    action: 'Ventilation + filtres charbon actif',
    resp: 'HSE',
    delai: '2025-09-30',
    actionProg: 45,
    actionStatut: 'En cours',
    rr_g: 2,
    rr_freq: 3,
    rr_crit: 1,
  },
  {
    id: 'ASP-004',
    activite: 'Peinture',
    aspect: 'Peinture usagée',
    impact: 'Déchets dangereux',
    g: 3,
    freq: 3,
    crit: 2,
    s: 'Maîtrisé',
    action: 'Filtration et évacuation prestataire',
    resp: 'HSE',
    delai: '2025-10-15',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 2,
    rr_freq: 2,
    rr_crit: 1,
  },
  {
    id: 'ASP-005',
    activite: 'Tous ateliers',
    aspect: 'Consommation électrique',
    impact: 'Émissions CO₂',
    g: 2,
    freq: 5,
    crit: 2,
    s: 'En cours',
    action: 'LED + capteurs présence',
    resp: 'Maintenance',
    delai: '2025-12-31',
    actionProg: 60,
    actionStatut: 'En cours',
    rr_g: 1,
    rr_freq: 4,
    rr_crit: 2,
  },
  {
    id: 'ASP-006',
    activite: 'Tous ateliers',
    aspect: 'Consommation eau',
    impact: 'Ressource eau',
    g: 1,
    freq: 5,
    crit: 3,
    s: 'Maîtrisé',
    action: 'Compteurs + détection fuites',
    resp: 'HSE',
    delai: '2025-08-31',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 1,
    rr_freq: 4,
    rr_crit: 2,
  },
  {
    id: 'ASP-007',
    activite: 'Stockage',
    aspect: 'Produits chimiques dangereux',
    impact: 'Pollution sol/eau',
    g: 3,
    freq: 2,
    crit: 2,
    s: 'Maîtrisé',
    action: 'Armoire sécurisée + FDS à jour',
    resp: 'HSE',
    delai: '2025-07-15',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 2,
    rr_freq: 1,
    rr_crit: 2,
  },
  {
    id: 'ASP-008',
    activite: 'Maintenance',
    aspect: 'Déchets DEEE',
    impact: 'Pollution / ressources',
    g: 2,
    freq: 3,
    crit: 3,
    s: 'Maîtrisé',
    action: 'Collecte filière agréée DEEE',
    resp: 'Maintenance',
    delai: '2025-11-01',
    actionProg: 100,
    actionStatut: 'Clôturée',
    rr_g: 1,
    rr_freq: 2,
    rr_crit: 2,
  },
];

export function seedEnvAspects() {
  if (!canAutoSeed()) {
    if (!window.ENV_ASPECTS_DATA) window.ENV_ASPECTS_DATA = [];
    if (window.asp_selectedId === undefined) window.asp_selectedId = null;
    if (window.asp_step == null) window.asp_step = 1;
    if (!window._aspFilter) window._aspFilter = { niv: '', act: '', stat: '', q: '' };
    return;
  }
  if (!window.ENV_ASPECTS_DATA?.length) {
    window.ENV_ASPECTS_DATA = ENV_ASPECTS_SEED.map((a) => withNiv(a));
  }
  if (window.asp_selectedId === undefined) window.asp_selectedId = null;
  if (window.asp_step == null) window.asp_step = 1;
  if (!window._aspFilter) window._aspFilter = { niv: '', act: '', stat: '', q: '' };
}
