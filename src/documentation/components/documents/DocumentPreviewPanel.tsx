import ReactMarkdown from 'react-markdown';
import { Download, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import type { Document } from '../../types';

function extractPdfDataUrl(content: string): string | null {
  const m = content.match(/\[PDF_DATA:(data:application\/pdf[^[\]]+)\]/);
  return m ? m[1] : null;
}

export function DocumentPreviewPanel({ doc }: { doc: Document }) {
  const pdfUrl = extractPdfDataUrl(doc.content);
  const markdown = doc.content.replace(/\[PDF[^\]]*\]\n?/g, '').trim();

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800">Information document</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="text-slate-500">Code</dt>
            <dd className="font-mono font-medium">{doc.code}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Titre</dt>
            <dd className="font-medium">{doc.title}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Type</dt>
            <dd>{doc.type}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Processus</dt>
            <dd>{doc.process}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Zone</dt>
            <dd>{doc.zone}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Version</dt>
            <dd>{doc.currentVersion}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Statut</dt>
            <dd>
              <StatusBadge status={doc.status} />
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Responsable</dt>
            <dd>{doc.responsible}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50"
            onClick={() => window.print()}
          >
            <Download size={14} /> Télécharger
          </button>
          <Link
            to={`/documents/${doc.id}/historique`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200"
          >
            <History size={14} /> Historique
          </Link>
        </div>
      </aside>

      <div className="flex min-h-[480px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
        {pdfUrl && (
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-800 px-4 py-2 text-xs text-white">
            <span className="truncate font-medium">{doc.title}</span>
            <span className="text-slate-300">{doc.currentVersion} · PDF</span>
          </div>
        )}
        {pdfUrl ? (
          <iframe title="Aperçu PDF" src={pdfUrl} className="min-h-[min(70vh,640px)] flex-1 w-full bg-white" />
        ) : (
          <div className="h-full overflow-auto bg-white p-8 prose prose-sm max-w-none">
            {markdown ? (
              <ReactMarkdown>{markdown}</ReactMarkdown>
            ) : (
              <p className="text-slate-500">Aucun contenu — ajoutez une description ou un PDF.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
