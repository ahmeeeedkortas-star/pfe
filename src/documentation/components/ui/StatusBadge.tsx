import type { DocumentStatus } from '../../types';

const styles: Record<DocumentStatus, string> = {
  Brouillon: 'bg-slate-100 text-slate-700',
  'En attente QHSE': 'bg-orange-100 text-orange-800',
  'En attente Direction': 'bg-orange-100 text-orange-800',
  Publié: 'bg-emerald-100 text-emerald-800',
  Archivé: 'bg-red-100 text-red-800',
};

const labels: Record<DocumentStatus, string> = {
  Brouillon: 'Brouillon',
  'En attente QHSE': 'En validation',
  'En attente Direction': 'En validation',
  Publié: 'Validé',
  Archivé: 'Obsolète',
};

export function StatusBadge({
  status,
  variant,
}: {
  status: DocumentStatus;
  variant?: 'default' | 'officiel' | 'actif';
}) {
  if (variant === 'officiel') {
    return (
      <span className="inline-flex rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
        OFFICIEL
      </span>
    );
  }
  if (variant === 'actif') {
    return (
      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
        Actif
      </span>
    );
  }
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
