import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OdooControlPanel } from '../components/odoo/OdooControlPanel';
import { useOdooListView } from '../hooks/useOdooListView';

export function ValidationPage() {
  const list = useOdooListView('validation');

  return (
    <div className="space-y-0">
      <OdooControlPanel
        title="File de validation"
        subtitle="Documents en attente QHSE ou Direction"
        list={list}
        showCreate={false}
      />

      <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white shadow-sm">
        {list.loading ? (
          <p className="p-6 text-slate-500">Chargement…</p>
        ) : list.filtered.length === 0 ? (
          <p className="p-6 text-slate-500">Aucun document en attente de validation.</p>
        ) : (
          <ul className="divide-y">
            {list.filtered.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-mono text-xs text-slate-500">{d.code}</p>
                  <p className="font-medium text-slate-900">{d.title}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{d.process}</span>
                    <span>·</span>
                    <span>{d.zone}</span>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/documents/${d.id}/workflow`}
                    className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    Workflow
                  </Link>
                  <Link
                    to={`/documents/${d.id}/validation`}
                    className="rounded bg-[#185FA5] px-3 py-2 text-sm font-semibold text-white"
                  >
                    Valider / rejeter
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
