import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import type { Document } from '../../types';

const KANBAN_COLUMNS: { status: Document['status']; title: string; accent: string }[] = [
  { status: 'Brouillon', title: 'Brouillon', accent: 'border-slate-400' },
  { status: 'En attente QHSE', title: 'Validation QHSE', accent: 'border-amber-500' },
  { status: 'En attente Direction', title: 'Validation Direction', accent: 'border-orange-500' },
  { status: 'Publié', title: 'Publié', accent: 'border-emerald-500' },
  { status: 'Archivé', title: 'Archivé', accent: 'border-slate-500' },
];

export function DocumentKanbanView({ rows }: { rows: Document[] }) {
  const navigate = useNavigate();

  return (
    <div className="odoo-kanban flex gap-3 overflow-x-auto pb-2">
      {KANBAN_COLUMNS.map((col) => {
        const cards = rows.filter((d) => d.status === col.status);
        return (
          <div
            key={col.status}
            className={`odoo-kanban-col min-w-[240px] flex-1 rounded-lg border-t-4 bg-slate-100/80 ${col.accent}`}
          >
            <div className="flex items-center justify-between px-3 py-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                {col.title}
              </h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 shadow-sm">
                {cards.length}
              </span>
            </div>
            <div className="space-y-2 px-2 pb-3">
              {cards.length === 0 ? (
                <p className="px-2 py-4 text-center text-xs text-slate-400">Aucun</p>
              ) : (
                cards.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className="odoo-kanban-card w-full rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md"
                    onClick={() => navigate(`/documents/${d.id}`)}
                  >
                    <p className="font-mono text-[10px] text-slate-500">{d.code}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
                      {d.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-slate-500">
                      <span>{d.type}</span>
                      <span>·</span>
                      <span>{d.zone}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <StatusBadge status={d.status} />
                      <span className="text-[10px] text-slate-400">{d.currentVersion}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

