import { useConfig } from '../context/ConfigContext';
import { DocumentTable } from '../components/documents/DocumentTable';
import { DocumentKanbanView } from '../components/odoo/DocumentKanbanView';
import { OdooControlPanel } from '../components/odoo/OdooControlPanel';
import { useDocuments } from '../hooks/useDocuments';
import { useOdooListView } from '../hooks/useOdooListView';

/** Recherche & filtres — panneau de contrôle type Odoo */
export function SearchPage() {
  const { config } = useConfig();
  const { documents: allDocs } = useDocuments();
  const list = useOdooListView('all');

  const isoOptions = config?.isoNorms?.length
    ? config.isoNorms
    : ([...new Set(allDocs.map((d) => d.isoNorm).filter(Boolean))] as string[]);

  return (
    <div className="space-y-0">
      <OdooControlPanel
        title="Recherche & filtres"
        subtitle="Recherche plein texte · domaines · regroupement"
        list={list}
        showCreate={false}
        showIsoFilter
        isoOptions={isoOptions}
      />

      {list.query && (
        <p className="border-x border-slate-200 bg-blue-50 px-3 py-2 text-sm text-slate-700">
          <span className="font-semibold">{list.totalCount}</span> résultat(s) pour «{' '}
          <span className="font-medium text-[#185FA5]">{list.query}</span> »
        </p>
      )}

      {list.viewMode === 'kanban' ? (
        <div className="rounded-b-xl border border-t-0 border-slate-200 bg-slate-50 p-3">
          <DocumentKanbanView rows={list.filtered} />
        </div>
      ) : (
        <div className="rounded-b-xl border border-t-0 border-slate-200">
          <DocumentTable
            rows={list.pagedRows}
            loading={list.loading}
            query={list.query}
            emptyMessage="Aucun résultat — modifiez la recherche ou les filtres."
          />
        </div>
      )}
    </div>
  );
}
