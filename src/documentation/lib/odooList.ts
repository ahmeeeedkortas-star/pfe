import type { Document, DocumentStatus } from '../types';

/** Filtre prédéfini style Odoo (domaine applicatif côté client). */
export interface OdooFilterPreset {
  id: string;
  label: string;
  description?: string;
  apply: (rows: Document[], ctx: OdooFilterContext) => Document[];
}

export interface OdooFilterContext {
  userName?: string;
  now?: Date;
}

export const ODOO_GROUP_BY_OPTIONS = [
  { id: '', label: 'Aucun' },
  { id: 'status', label: 'Statut' },
  { id: 'type', label: 'Type' },
  { id: 'process', label: 'Processus' },
  { id: 'zone', label: 'Zone' },
  { id: 'responsible', label: 'Responsable' },
] as const;

export type OdooGroupById = (typeof ODOO_GROUP_BY_OPTIONS)[number]['id'];

export const ODOO_SORT_OPTIONS = [
  { id: 'updatedAt-desc', label: 'Date maj. ↓' },
  { id: 'updatedAt-asc', label: 'Date maj. ↑' },
  { id: 'code-asc', label: 'Code A→Z' },
  { id: 'title-asc', label: 'Titre A→Z' },
] as const;

export type OdooSortId = (typeof ODOO_SORT_OPTIONS)[number]['id'];

export const DOCUMENT_FILTER_PRESETS: OdooFilterPreset[] = [
  {
    id: 'all',
    label: 'Tous',
    apply: (rows) => rows,
  },
  {
    id: 'mine',
    label: 'Mes documents',
    description: 'Responsable = utilisateur connecté',
    apply: (rows, ctx) =>
      ctx.userName ? rows.filter((d) => d.responsible === ctx.userName) : rows,
  },
  {
    id: 'draft',
    label: 'Brouillons',
    apply: (rows) => rows.filter((d) => d.status === 'Brouillon'),
  },
  {
    id: 'validation',
    label: 'En validation',
    apply: (rows) =>
      rows.filter(
        (d) => d.status === 'En attente QHSE' || d.status === 'En attente Direction'
      ),
  },
  {
    id: 'published',
    label: 'Publiés',
    apply: (rows) => rows.filter((d) => d.status === 'Publié'),
  },
  {
    id: 'archived',
    label: 'Archivés',
    apply: (rows) => rows.filter((d) => d.status === 'Archivé'),
  },
  {
    id: 'obsolete',
    label: 'À réviser / obsolètes',
    description: 'Date de révision dépassée',
    apply: (rows, ctx) => {
      const now = ctx.now ?? new Date();
      return rows.filter((d) => d.reviewDueAt && new Date(d.reviewDueAt) < now);
    },
  },
  {
    id: 'no_owner',
    label: 'Sans responsable',
    apply: (rows) => rows.filter((d) => !d.responsible?.trim()),
  },
];

export function applyFieldFilters(
  rows: Document[],
  fields: {
    type?: string;
    process?: string;
    zone?: string;
    status?: string;
    isoNorm?: string;
  }
): Document[] {
  let out = rows;
  if (fields.type) out = out.filter((d) => d.type === fields.type);
  if (fields.process) out = out.filter((d) => d.process === fields.process);
  if (fields.zone) out = out.filter((d) => d.zone === fields.zone);
  if (fields.status) out = out.filter((d) => d.status === fields.status);
  if (fields.isoNorm) out = out.filter((d) => d.isoNorm === fields.isoNorm);
  return out;
}

export function applySearchQuery(rows: Document[], query: string): Document[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q) ||
      d.process.toLowerCase().includes(q) ||
      d.zone.toLowerCase().includes(q)
  );
}

export function sortDocuments(rows: Document[], sortId: OdooSortId): Document[] {
  const copy = [...rows];
  switch (sortId) {
    case 'updatedAt-asc':
      return copy.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    case 'code-asc':
      return copy.sort((a, b) => a.code.localeCompare(b.code));
    case 'title-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'updatedAt-desc':
    default:
      return copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
}

export function groupDocuments(
  rows: Document[],
  groupBy: OdooGroupById
): { key: string; label: string; rows: Document[] }[] {
  if (!groupBy) return [{ key: '_all', label: '', rows }];
  const map = new Map<string, Document[]>();
  for (const d of rows) {
    const key = String((d as Record<string, unknown>)[groupBy] ?? '—');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'fr'))
    .map(([key, groupRows]) => ({
      key,
      label: groupBy === 'status' ? key : `${labelForGroup(groupBy)} : ${key}`,
      rows: groupRows,
    }));
}

function labelForGroup(g: OdooGroupById): string {
  const found = ODOO_GROUP_BY_OPTIONS.find((o) => o.id === g);
  return found?.label ?? g;
}

export function statusStageIndex(status: DocumentStatus): number {
  const order: DocumentStatus[] = [
    'Brouillon',
    'En attente QHSE',
    'En attente Direction',
    'Publié',
    'Archivé',
  ];
  return order.indexOf(status);
}
