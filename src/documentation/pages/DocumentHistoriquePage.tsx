import { useState } from 'react';
import { Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { VersionDiff } from '../components/documents/VersionDiff';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useDocument } from '../hooks/useDocument';
import { restoreVersion } from '../services/documentService';
import { canCreate } from '../services/authService';
import type { DocumentVersion } from '../types';

function downloadVersionFile(version: DocumentVersion, docCode: string) {
  const body = version.content.replace(/\[PDF[^\]]*\]\n?/g, '').trim() || version.content;
  const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${docCode}_${version.version}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function DocumentHistoriquePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { doc, versions, loading, reload } = useDocument(id);
  const [diffA, setDiffA] = useState('');
  const [diffB, setDiffB] = useState('');

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (!doc) return <p className="text-slate-500">Document introuvable.</p>;

  const va = versions.find((v) => v.id === diffA);
  const vb = versions.find((v) => v.id === diffB);
  const sorted = [...versions].reverse();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">Historique & versioning</h1>
        <Link to={`/documents/${doc.id}`} className="text-sm text-[#185FA5] hover:underline">
          ← Aperçu
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-mono text-xs text-slate-500">{doc.code}</p>
          <h2 className="font-bold">{doc.title}</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Version actuelle</dt>
              <dd className="font-semibold">{doc.currentVersion}</dd>
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
          </dl>
        </div>

        <div className="doc-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 className="border-b border-slate-100 px-4 py-3 text-sm font-semibold">
            Historique des versions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Version</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Modifié par</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((v) => (
                  <tr key={v.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{v.version}</td>
                    <td className="px-4 py-3">
                      {new Date(v.modifiedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3">{v.modifiedBy}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-slate-600">
                      {v.comment ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={v.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          title="Télécharger cette version"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
                          onClick={() => downloadVersionFile(v, doc.code)}
                        >
                          <Download size={12} /> Télécharger
                        </button>
                        {canCreate(user) && (
                          <button
                            type="button"
                            className="text-xs text-[#185FA5] hover:underline"
                            onClick={() =>
                              restoreVersion(doc.id, v.id, user!.displayName).then(reload)
                            }
                          >
                            Restaurer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {versions.length >= 2 && (
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">Comparer deux versions</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={diffA}
              onChange={(e) => setDiffA(e.target.value)}
            >
              <option value="">Version A</option>
              {versions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.version}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={diffB}
              onChange={(e) => setDiffB(e.target.value)}
            >
              <option value="">Version B</option>
              {versions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.version}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              disabled={!va || !vb}
            >
              Comparer
            </button>
          </div>
          {va && vb && (
            <div className="mt-4">
              <VersionDiff oldText={va.content} newText={vb.content} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
