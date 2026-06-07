/**
 * Zones de production — audits 5S (objectif KPI ≥ 80 % par zone).
 */
export const FIVES_ZONE_GROUPS = [
  {
    id: 'usinage',
    label: 'Usinage',
    zones: [
      { id: 'usin-cnc', label: 'Usinage CNC' },
      { id: 'usin-debit', label: 'Débitage (Usinage)' },
    ],
  },
  {
    id: 'assemblage',
    label: 'Assemblage',
    zones: [
      { id: 'assem-m1', label: 'Assemblage Machine 1' },
      { id: 'assem-m2', label: 'Assemblage Machine 2' },
      { id: 'assem-debit', label: 'Débitage (Assemblage)' },
      { id: 'assem-recep', label: 'Contrôle à la réception' },
      { id: 'assem-cablage', label: 'Câblage électrique' },
    ],
  },
  {
    id: 'magasin',
    label: 'Magasin',
    zones: [
      { id: 'mag-a', label: 'Magasin Zone A' },
      { id: 'mag-b', label: 'Magasin Zone B' },
      { id: 'mag-c', label: 'Magasin Zone C' },
    ],
  },
];

export const FIVES_ZONES = FIVES_ZONE_GROUPS.flatMap((g) =>
  g.zones.map((z) => ({ ...z, groupId: g.id, groupLabel: g.label }))
);

export function getFivesZone(zoneId) {
  return FIVES_ZONES.find((z) => z.id === zoneId) || null;
}

export function getFivesZoneLabel(zoneId) {
  return getFivesZone(zoneId)?.label || zoneId || '—';
}
