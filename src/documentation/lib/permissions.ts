import type { UserRole } from '../types';

export type PermissionKey = 'lecture' | 'creation' | 'modification' | 'validation' | 'suppression';

/** Rôles affichés dans la matrice (spec écran 9). */
export type MatrixRole =
  | 'Opérateur'
  | 'Qualité'
  | 'Ingénieur'
  | 'Responsable QHSE'
  | 'Direction';

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  lecture: 'Lecture',
  creation: 'Création',
  modification: 'Modification',
  validation: 'Validation',
  suppression: 'Suppression',
};

export const ROLE_LABELS: Record<MatrixRole, string> = {
  Opérateur: 'Opérateur',
  Qualité: 'Qualité',
  Ingénieur: 'Ingénieur',
  'Responsable QHSE': 'Responsable QHSE',
  Direction: 'Direction',
};

const matrix: Record<MatrixRole, Record<PermissionKey, boolean>> = {
  Opérateur: { lecture: true, creation: false, modification: false, validation: false, suppression: false },
  Qualité: { lecture: true, creation: false, modification: false, validation: true, suppression: false },
  Ingénieur: { lecture: true, creation: true, modification: true, validation: false, suppression: false },
  'Responsable QHSE': {
    lecture: true,
    creation: true,
    modification: true,
    validation: true,
    suppression: false,
  },
  Direction: { lecture: true, creation: true, modification: true, validation: true, suppression: true },
};

export function getPermissionsMatrix(): {
  roles: MatrixRole[];
  permissions: PermissionKey[];
  cells: Record<MatrixRole, Record<PermissionKey, boolean>>;
} {
  const roles: MatrixRole[] = [
    'Opérateur',
    'Qualité',
    'Ingénieur',
    'Responsable QHSE',
    'Direction',
  ];
  const permissions: PermissionKey[] = [
    'lecture',
    'creation',
    'modification',
    'validation',
    'suppression',
  ];
  return { roles, permissions, cells: matrix };
}

/** Rôle applicatif Dexie → libellé matrice */
export function roleToMatrixLabel(role: UserRole): MatrixRole {
  if (role === 'Qualité') return 'Responsable QHSE';
  return role;
}
