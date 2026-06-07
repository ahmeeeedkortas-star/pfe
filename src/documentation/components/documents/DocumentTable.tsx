import { Eye, GitBranch, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { HighlightText } from '../ui/HighlightText';
import { StatusBadge } from '../ui/StatusBadge';
import type { Document } from '../../types';

export function DocumentTable({
  rows,
  loading,
  query = '',
  showActions = true,
  emptyMessage = 'Aucun document.',
}: {
  rows: Document[];
  loading?: boolean;
  query?: string;
  showActions?: boolean;
  emptyMessage?: string;
}) {
  const navigate = useNavigate();
  const cols = showActions ? 9 : 8;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Titre</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Processus</th>
            <th className="px-4 py-3">Zone</th>
            <th className="px-4 py-3">Version</th>
            <th className="px-4 py-3">Statut</th>
            <th className="px-4 py-3">Date maj.</th>
            {showActions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={cols} className="px-4 py-8 text-center text-slate-500">
                Chargement…
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={cols} className="px-4 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((d) => (
              <tr key={d.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs">
                  <HighlightText text={d.code} query={query} />
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 font-medium">
                  <HighlightText text={d.title} query={query} />
                </td>
                <td className="px-4 py-3">{d.type}</td>
                <td className="px-4 py-3">{d.process}</td>
                <td className="px-4 py-3">{d.zone}</td>
                <td className="px-4 py-3">{d.currentVersion}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(d.updatedAt).toLocaleDateString('fr-FR')}
                </td>
                {showActions && (
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        title="Aperçu"
                        className="rounded p-1 text-[#185FA5] hover:bg-blue-50"
                        onClick={() => navigate(`/documents/${d.id}`)}
                      >
                        <Eye size={16} />
                      </button>
                      {d.status === 'Brouillon' && (
                        <button
                          type="button"
                          title="Modifier"
                          className="rounded p-1 text-slate-600 hover:bg-slate-100"
                          onClick={() => navigate(`/documents/${d.id}`)}
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Workflow"
                        className="rounded p-1 text-slate-500 hover:bg-slate-100"
                        onClick={() => navigate(`/documents/${d.id}/workflow`)}
                      >
                        <GitBranch size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
