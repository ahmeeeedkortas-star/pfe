/**
 * Moteur de listes type Odoo — domaines, favoris, regroupement (plateforme vanilla).
 */

export function getOdooState(prefix) {
  const key = `${prefix}OdooState`;
  if (!window[key]) {
    window[key] = { preset: 'all', groupBy: '', sort: 'date-desc' };
  }
  return window[key];
}

/** @param {object[]} rows @param {string} field */
export function groupRows(rows, field) {
  if (!field) return [{ key: '_all', label: '', rows }];
  const map = new Map();
  for (const r of rows) {
    const key = String(r[field] ?? '—');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(r);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'fr'))
    .map(([key, groupRows]) => ({ key, label: key, rows: groupRows }));
}

export const RC_FILTER_PRESETS = [
  { id: 'all', label: 'Tous' },
  { id: 'open', label: 'Ouvertes', desc: 'Non clôturées' },
  { id: 'closed', label: 'Clôturées' },
  { id: 'critical', label: 'Critiques', desc: 'Gravité critique' },
  { id: 'major', label: 'Majeures', desc: 'Gravité majeure' },
];

export const NC_FILTER_PRESETS = [
  { id: 'all', label: 'Tous' },
  { id: 'open', label: 'Ouvertes', desc: 'Non clôturées' },
  { id: 'closed', label: 'Clôturées' },
  { id: 'critical', label: 'Critiques' },
  { id: 'major', label: 'Majeures' },
];

export const RC_GROUP_BY = [
  { id: '', label: 'Aucun' },
  { id: 's', label: 'Statut', field: 's' },
  { id: 'g', label: 'Gravité', field: 'g' },
  { id: 'p', label: 'Projet', field: 'p' },
  { id: 'cl', label: 'Client', field: 'cl' },
];

export const NC_GROUP_BY = [
  { id: '', label: 'Aucun' },
  { id: 's', label: 'Statut', field: 's' },
  { id: 'g', label: 'Gravité', field: 'g' },
  { id: 'p', label: 'Projet', field: 'p' },
  { id: 'dep', label: 'Département', field: 'dep' },
];

/** Domaine RC selon favori Odoo */
export function rcPresetDomain(presetId, row) {
  switch (presetId) {
    case 'open':
      return row.s !== 'Clôturée';
    case 'closed':
      return row.s === 'Clôturée';
    case 'critical':
      return row.g === 'Critique';
    case 'major':
      return row.g === 'Majeure';
    default:
      return true;
  }
}

export function ncPresetDomain(presetId, row) {
  switch (presetId) {
    case 'open':
      return row.s !== 'Clôturé';
    case 'closed':
      return row.s === 'Clôturé';
    case 'critical':
      return row.g === 'Critique';
    case 'major':
      return row.g === 'Majeure';
    default:
      return true;
  }
}

/** Lignes tableau avec en-têtes de groupe */
export function renderGroupedTbody(groups, rowHtmlFn, colSpan = 11) {
  if (!groups.length || (groups.length === 1 && groups[0].key === '_all')) {
    const rows = groups[0]?.rows ?? [];
    return rows.map(rowHtmlFn).join('');
  }
  return groups
    .map(
      (g) => `
    <tr class="odoo-group-row"><td colspan="${colSpan}">
      <strong>${g.label}</strong>
      <span class="odoo-group-count">(${g.rows.length})</span>
    </td></tr>
    ${g.rows.map(rowHtmlFn).join('')}`
    )
    .join('');
}
