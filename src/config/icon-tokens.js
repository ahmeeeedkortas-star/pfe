/**
 * Tokens icônes XPERT-MECA — tailles et tuiles harmonisées.
 */
export const ICON_SIZE = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
  tile: 41,
  tileCompact: 36,
};

/** Tuile navigation module (neutre — l’état actif est géré en CSS) */
export const ICON_TILE_NAV = {
  bg: '#F5F5F6',
  color: '#2A2A2A',
};

/** Tuile accent marque */
export const ICON_TILE_BRAND = {
  bg: '#FEF2F2',
  color: '#E21B24',
};

/** Épaisseur trait unique (Lucide-style) */
export const ICON_STROKE = 2;

/**
 * @param {Record<string, unknown>} item
 * @returns {Record<string, unknown>}
 */
export function normalizeNavIconItem(item) {
  return {
    ...item,
    icon: item.icon || undefined,
    bg: ICON_TILE_NAV.bg,
    c: ICON_TILE_NAV.color,
  };
}

/**
 * @param {Record<string, Array<Record<string, unknown>>>} iconsMap
 */
export function normalizeModuleIconsMap(iconsMap) {
  const out = {};
  for (const mod of Object.keys(iconsMap)) {
    out[mod] = iconsMap[mod].map((it) => normalizeNavIconItem(it));
  }
  return out;
}
