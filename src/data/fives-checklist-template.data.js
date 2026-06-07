/**
 * Checklist 5S standard (français) — commune à toutes les zones.
 * Inspirée du modèle Gemba Concepts « 5S Checklist for Offices ».
 */
export const FIVES_PILLARS = [
  { id: 'trier', label: '1. Trier (Seiri)', subtitle: 'Éliminer ce qui n\'est pas nécessaire', color: '#dc2626' },
  { id: 'ranger', label: '2. Ranger (Seiton)', subtitle: 'Une place pour chaque chose', color: '#ea580c' },
  { id: 'nettoyer', label: '3. Nettoyer (Seiso)', subtitle: 'Garder le poste propre et inspecter', color: '#16a34a' },
  { id: 'standardiser', label: '4. Standardiser (Seiketsu)', subtitle: 'Faire du 5S une habitude de travail', color: '#2563eb' },
  { id: 'suivre', label: '5. Suivre (Shitsuke)', subtitle: 'Faire du 5S un mode de vie', color: '#7c3aed' },
];

export const FIVES_CHECKLIST_TEMPLATE_SEED = [
  { pillar: 'trier', label: 'Pas de documents, dessins ou matériels de référence inutiles.' },
  { pillar: 'trier', label: 'Pas de documents ou matériels non pertinents sur le poste.' },
  { pillar: 'trier', label: 'Pas d\'excès d\'équipement, documents ou matériels.' },
  { pillar: 'trier', label: 'Zone de stockage définie pour articles inutiles et documents obsolètes.' },
  { pillar: 'trier', label: 'Standards d\'élimination des objets inutiles existent et sont suivis.' },
  { pillar: 'ranger', label: 'Bureaux et armoires exempts d\'accumulation de papiers et objets.' },
  { pillar: 'ranger', label: 'Tous les outils et équipements sont stockés à un endroit fixe.' },
  { pillar: 'ranger', label: 'Outils et équipements organisés pour une prise et un retour faciles.' },
  { pillar: 'ranger', label: 'Étiquetage des armoires, étagères et dossiers — identification immédiate.' },
  { pillar: 'ranger', label: 'Documents classés selon les règles de conservation.' },
  { pillar: 'ranger', label: 'Affichages rangés, sans encombrement, étiquetés et à jour.' },
  { pillar: 'ranger', label: 'Équipements de sécurité facilement accessibles et en bon état.' },
  { pillar: 'nettoyer', label: 'Sol propre, sans signes de dégradation.' },
  { pillar: 'nettoyer', label: 'Murs et plafonds en bon état, sans saleté ni poussière.' },
  { pillar: 'nettoyer', label: 'Rayonnages et armoires propres et en bon état.' },
  { pillar: 'nettoyer', label: 'Équipements et outils propres et en bon état.' },
  { pillar: 'nettoyer', label: 'Bureaux, tables et mobilier propres.' },
  { pillar: 'nettoyer', label: 'Éclairage suffisant — angle et intensité adaptés.' },
  { pillar: 'nettoyer', label: 'Bonne circulation de l\'air dans la zone.' },
  { pillar: 'nettoyer', label: 'Poubelles vidées régulièrement.' },
  { pillar: 'standardiser', label: 'Contrôles visuels et tableaux d\'affichage utilisés et à jour.' },
  { pillar: 'standardiser', label: 'Procédures de maintien des 3 premiers S affichées.' },
  { pillar: 'standardiser', label: 'Checklists, plannings et routines 5S définis et utilisés.' },
  { pillar: 'standardiser', label: 'Chacun connaît ses responsabilités (qui, quand, comment).' },
  { pillar: 'standardiser', label: 'Audits réguliers effectués avec checklists et mesures.' },
  { pillar: 'suivre', label: 'Le 5S est une habitude plutôt qu\'une simple routine.' },
  { pillar: 'suivre', label: 'Succès affichés (ex. photos avant / après).' },
  { pillar: 'suivre', label: 'Récompenses et reconnaissance intégrées au système 5S.' },
];
