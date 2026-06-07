import type { DocumentStatus } from '../types';

export const WORKFLOW_STEPS = [
  'Création',
  'Validation Resp. QHSE',
  'Validation Direction/Process Owner',
  'Publication',
  'Utilisation terrain',
  'Révision',
  'Archivage',
] as const;

export function workflowStepIndex(status: DocumentStatus): number {
  switch (status) {
    case 'Brouillon':
      return 0;
    case 'En attente QHSE':
      return 1;
    case 'En attente Direction':
      return 2;
    case 'Publié':
      return 4;
    case 'Archivé':
      return 6;
    default:
      return 0;
  }
}
