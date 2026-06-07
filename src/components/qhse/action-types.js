/**
 * Types d'actions — ISO 9001:2015 §10.2 (immédiate / corrective / préventive).
 */
export const TYPES_QRQC = [
  { id: 'Immédiate', icon: '⚡', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', norm: 'Action immédiate / contention' },
  { id: 'Corrective', icon: '🔧', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', norm: 'Action corrective' },
  { id: 'Préventive', icon: '🛡', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', norm: 'Action préventive' },
];

/** RC & NC — mêmes libellés */
export const TYPES_RC = TYPES_QRQC;

const LEGACY_TYPE_MAP = {
  Contention: 'Immédiate',
  Correction: 'Corrective',
  Prévention: 'Préventive',
};

export function normalizeActionType(type) {
  return LEGACY_TYPE_MAP[type] || type;
}

export function migrateRcActionTypes() {
  (window.RC_ACTIONS || []).forEach((a) => {
    a.type = normalizeActionType(a.type);
  });
  ['rc_d3', 'rc_d5', 'rc_d7'].forEach((key) => {
    (window[`${key}_acts`] || []).forEach((a) => {
      a.type = normalizeActionType(a.type);
    });
  });
}

export function getTypesForStore(store) {
  if (store === 'RC_ACTIONS' || store === 'NC_ACTIONS') return TYPES_QRQC;
  return TYPES_QRQC;
}

export function getTypesBySet(set) {
  return TYPES_QRQC;
}

export function getTypeMeta(typeId) {
  const id = normalizeActionType(typeId);
  return TYPES_QRQC.find((t) => t.id === id) || TYPES_QRQC[1];
}

export function badgeClassForType(type) {
  const id = normalizeActionType(type);
  const map = {
    Immédiate: 'br',
    Corrective: 'bo',
    Préventive: 'bgr',
  };
  return map[id] || 'bb';
}

export const ACTION_TYPE_COLORS = {
  Immédiate: ['#fee2e2', '#dc2626'],
  Corrective: ['#ffedd5', '#c2410c'],
  Préventive: ['#dcfce7', '#166534'],
};
