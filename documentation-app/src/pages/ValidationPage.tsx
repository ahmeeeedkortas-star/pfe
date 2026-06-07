import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useDocuments } from '../hooks/useDocuments';

export function ValidationPage() {
  const { documents, loading } = useDocuments();
  const pending = documents.filter(
    (d) => d.status === 'En attente QHSE' || d.status === 'En attente Direction'
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">File de validation</h1>
      {loading ? (
        <p className="text-slate-500">Chargement…</p>
      ) : pending.length === 0 ? (
        <p className="rounded-lg border bg-white p-6 text-slate-500">
          Aucun document en attente de validation.
        </p>
      ) : (
        <ul className="divide-y rounded-xl border bg-white">
          {pending.map((d) => (
            <li key={d.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-mono text-xs text-slate-500">{d.code}</p>
                <p className="font-medium">{d.title}</p>
                <StatusBadge status={d.status} />
              </div>
              <Link
                to={`/documents/${d.id}`}
                className="rounded-lg bg-blue-800 px-3 py-2 text-sm text-white"
              >
                Valider / rejeter
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
