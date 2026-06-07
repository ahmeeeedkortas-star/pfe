import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DocumentPreviewPanel } from '../components/documents/DocumentPreviewPanel';
import { OdooFormSheet } from '../components/odoo/OdooFormSheet';
import { useDocument } from '../hooks/useDocument';

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { doc, loading } = useDocument(id);
  const [tab, setTab] = useState('preview');

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (!doc) return <p className="text-slate-500">Document introuvable.</p>;

  const tabs = [
    { id: 'preview', label: 'Aperçu' },
    { id: 'info', label: 'Informations' },
  ];

  return (
    <div className="space-y-4">
      <OdooFormSheet
        title={doc.title}
        subtitle={`${doc.code} · ${doc.currentVersion}`}
        status={doc.status}
        tabs={tabs}
        activeTab={tab}
        onTabChange={setTab}
        actions={
          <>
            <Link
              to="/bibliotheque"
              className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
            >
              Bibliothèque
            </Link>
            <Link
              to={`/documents/${doc.id}/workflow`}
              className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
            >
              Workflow
            </Link>
            <Link
              to={`/documents/${doc.id}/historique`}
              className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
            >
              Historique
            </Link>
            {doc.status === 'Publié' && (
              <Link
                to={`/documents/${doc.id}/publication`}
                className="rounded bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
              >
                Publication / QR
              </Link>
            )}
          </>
        }
      >
        {tab === 'preview' ? (
          <DocumentPreviewPanel doc={doc} />
        ) : (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Code</dt>
              <dd className="font-mono font-semibold">{doc.code}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Type</dt>
              <dd>{doc.type}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Processus</dt>
              <dd>{doc.process}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Zone</dt>
              <dd>{doc.zone}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Responsable</dt>
              <dd>{doc.responsible}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Dernière MAJ</dt>
              <dd>{new Date(doc.updatedAt).toLocaleString('fr-FR')}</dd>
            </div>
          </dl>
        )}
      </OdooFormSheet>
    </div>
  );
}
