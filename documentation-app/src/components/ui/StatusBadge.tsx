import type { DocumentStatus } from '../../types';

const styles: Record<DocumentStatus, string> = {
  Brouillon: 'bg-slate-100 text-slate-700',
  'En attente QHSE': 'bg-amber-100 text-amber-800',
  'En attente Direction': 'bg-orange-100 text-orange-800',
  Publié: 'bg-emerald-100 text-emerald-800',
  Archivé: 'bg-slate-200 text-slate-600',
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
