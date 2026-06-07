/**
 * Composant Badge — statuts, gravités, priorités.
 */
const GRAVITY_MAP = { Critique: 'br', Majeure: 'bo', Mineure: 'bg3' };

const STATUS_MAP = {
  Ouvert: 'bo',
  'En traitement': 'bb',
  'En analyse': 'bb',
  'En cours': 'bb',
  Clôturée: 'bg3',
  Clôturé: 'bg3',
};

/**
 * @param {'gravity'|'status'} kind
 * @param {string} value
 * @returns {string} HTML
 */
export function badge(kind, value) {
  const cls =
    kind === 'gravity'
      ? GRAVITY_MAP[value] || 'bgr'
      : STATUS_MAP[value] || 'bgr';
  return `<span class="badge ${cls}">${value}</span>`;
}

export function badgeGravity(g) {
  return badge('gravity', g);
}

export function badgeStatus(s) {
  return badge('status', s);
}
