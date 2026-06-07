import { DocumentTable } from '../components/documents/DocumentTable';
import { DocumentKanbanView } from '../components/odoo/DocumentKanbanView';
import { OdooControlPanel } from '../components/odoo/OdooControlPanel';
import { useOdooListView } from '../hooks/useOdooListView';

export function LibraryPage() {
  const list = useOdooListView('all');

  return (
    <div className="space-y-0">
      <OdooControlPanel
        title="Bibliothèque documentaire"
        subtitle="Registre QHSE — style liste Odoo"
        list={list}
      />

      {list.viewMode === 'kanban' ? (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-slate-50 p-3">
          <DocumentKanbanView rows={list.filtered} />
        </div>
      ) : list.groupBy ? (
        <div className="space-y-4 rounded-b-xl border border-t-0 border-slate-200 bg-white p-3">
          {list.groups.map((g) => (
            <section key={g.key}>
              <h3 className="mb-2 border-b border-slate-200 pb-1 text-sm font-semibold text-slate-700">
                {g.label}
                <span className="ml-2 font-normal text-slate-500">({g.rows.length})</span>
              </h3>
              <DocumentTable rows={g.rows} loading={list.loading} query={list.query} />
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-b-xl border border-t-0 border-slate-200">
          <DocumentTable
            rows={list.pagedRows}
            loading={list.loading}
            query={list.query}
            emptyMessage="Aucun document. Utilisez « Nouveau » ou les filtres favoris."
          />
          {list.totalPages > 1 && (
            <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
              Page {list.page} / {list.totalPages} — {list.totalCount} document(s)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
