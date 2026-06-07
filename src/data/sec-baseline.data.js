/**
 * Données SST de base si les pages legacy ne les ont pas encore chargées.
 */
import { seedSstRisks } from './sst-risks.data.js';
import { seedSstAccidents } from './sst-accidents.data.js';
import { canAutoSeed } from '../core/empty-platform.js';

export function seedSecBaseline() {
  seedSstRisks();
  seedSstAccidents();

  if (!canAutoSeed()) {
    if (!window.SEC_ACTIONS) window.SEC_ACTIONS = [];
    if (window.jsaDays == null) window.jsaDays = 0;
    return;
  }

  if (!window.SEC_ACTIONS?.length) {
    window.SEC_ACTIONS = [
      { id: 1, action: 'Former opérateurs consignation', type: 'Corrective', resp: 'HSE', delai: '15/06/2025', statut: 'En cours', prog: 60 },
      { id: 2, action: 'Audit rayonnages magasin', type: 'Préventive', resp: 'HSE', delai: '25/05/2025', statut: 'En retard', prog: 20, prio: 'Critique' },
      { id: 3, action: 'Remplacer gants EPI usinage', type: 'Immédiate', resp: 'Ali M.', delai: '20/05/2025', statut: 'Clôturée', prog: 100 },
      { id: 4, action: 'Révision plan urgence chimique', type: 'Corrective', resp: 'HSE', delai: '30/06/2025', statut: 'À faire', prog: 0 },
    ];
  }

  if (window.jsaDays == null) window.jsaDays = 12;
}
