import { Link, useParams } from 'react-router-dom';
import { WorkflowStepper } from '../components/workflow/WorkflowStepper';
import { WorkflowTimeline } from '../components/workflow/WorkflowTimeline';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useDocument } from '../hooks/useDocument';

export function DocumentWorkflowPage() {
  const { id } = useParams<{ id: string }>();
  const { doc, logs, loading } = useDocument(id);

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (!doc) return <p className="text-slate-500">Document introuvable.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-900">Workflow de validation</h1>
        <Link to={`/documents/${doc.id}`} className="text-sm text-[#185FA5] hover:underline">
          ← Aperçu document
        </Link>
      </div>

      <WorkflowStepper status={doc.status} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">État du document</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Code</dt>
              <dd className="font-mono">{doc.code}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Titre</dt>
              <dd className="text-right font-medium">{doc.title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Version</dt>
              <dd>{doc.currentVersion}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Statut</dt>
              <dd>
                <StatusBadge status={doc.status} />
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Responsable</dt>
              <dd>{doc.responsible}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Historique du workflow</h2>
          <div className="mt-4">
            <WorkflowTimeline logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
