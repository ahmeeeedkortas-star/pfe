import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import type { Document } from '../../types';

export function PublicationSuccess({
  doc,
  publicUrl,
}: {
  doc: Document;
  publicUrl: string;
}) {
  const [toast, setToast] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const downloadQr = () => {
    const svg = document.getElementById(`qr-${doc.id}`);
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${doc.code}-qr.svg`;
    a.click();
  };

  const pubDate = doc.publishedAt
    ? new Date(doc.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-emerald-600" size={40} />
        <h2 className="mt-2 text-xl font-bold text-emerald-900">Document publié avec succès !</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-mono text-xs text-slate-500">{doc.code}</p>
          <h3 className="text-lg font-bold">{doc.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={doc.status} variant="officiel" />
            <StatusBadge status={doc.status} variant="actif" />
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Type</dt>
              <dd>{doc.type}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Version</dt>
              <dd className="font-semibold">{doc.currentVersion}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Date de publication</dt>
              <dd>{pubDate}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Publié par</dt>
              <dd>{doc.publishedBy ?? doc.createdBy}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Responsable</dt>
              <dd>{doc.responsible}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">QR Code d&apos;accès</h3>
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-inner">
            <QRCode id={`qr-${doc.id}`} value={publicUrl} size={200} />
          </div>
          <button
            type="button"
            onClick={downloadQr}
            className="mt-4 rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134a82]"
          >
            Télécharger QR Code
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          Notifications envoyées aux utilisateurs concernés
        </div>
      )}
    </div>
  );
}
