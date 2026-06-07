import QRCode from 'react-qr-code';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VersionDiff } from '../components/documents/VersionDiff';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import {
  addNonConformity,
  approveValidation,
  archiveDocument,
  createNewVersionDraft,
  deleteDraft,
  getDocument,
  getPublicDocumentUrl,
  getVersions,
  recordRead,
  rejectValidation,
  restoreVersion,
  submitForValidation,
} from '../services/documentService';
import {
  canCreate,
  canDeleteDraft,
  canValidateDirection,
  canValidateQhse,
} from '../services/authService';
import type { Document, DocumentVersion } from '../types';

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [doc, setDoc] = useState<Document | null>(null);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [diffA, setDiffA] = useState('');
  const [diffB, setDiffB] = useState('');
  const [comment, setComment] = useState('');
  const [published, setPublished] = useState(false);
  const [ncOpen, setNcOpen] = useState(false);
  const [ncDesc, setNcDesc] = useState('');
  const [ncText, setNcText] = useState('');

  const load = async () => {
    if (!id) return;
    const d = await getDocument(id);
    setDoc(d ?? null);
    setVersions(await getVersions(id));
    if (user && d) await recordRead(id, user.id);
  };

  useEffect(() => {
    load();
  }, [id, user?.id]);

  if (!doc) return <p className="text-slate-500">Document introuvable.</p>;

  const publicUrl = getPublicDocumentUrl(doc.id);

  const run = async (fn: () => Promise<unknown>) => {
    await fn();
    await load();
  };

  const compareVersions = () => {
    const va = versions.find((v) => v.id === diffA);
    const vb = versions.find((v) => v.id === diffB);
    if (!va || !vb) return null;
    return <VersionDiff oldText={va.content} newText={vb.content} />;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate-500">{doc.code}</p>
          <h1 className="text-2xl font-bold">{doc.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={doc.status} />
            <span className="text-sm text-slate-500">
              {doc.type} · {doc.process} · {doc.zone} · {doc.currentVersion}
            </span>
          </div>
        </div>
        <Link to="/bibliotheque" className="text-sm text-blue-700 hover:underline">
          ← Bibliothèque
        </Link>
      </div>

      <div className="prose prose-sm max-w-none rounded-xl border bg-white p-6">
        <ReactMarkdown>{doc.content}</ReactMarkdown>
      </div>

      {doc.status === 'Publié' && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-900">Document publié</p>
          {published && (
            <p className="mt-1 text-sm text-emerald-800">QR code généré — URL publique ci-dessous.</p>
          )}
          <div className="mt-4 flex flex-wrap items-start gap-6">
            <div className="rounded-lg bg-white p-3">
              <QRCode value={publicUrl} size={128} />
            </div>
            <div className="text-sm">
              <p className="break-all font-mono text-xs">{publicUrl}</p>
              <button
                type="button"
                className="mt-2 text-blue-700 hover:underline"
                onClick={() => window.print()}
              >
                Imprimer / télécharger QR
              </button>
            </div>
          </div>
        </div>
      )}

      {(user?.role === 'Qualité' || user?.role === 'Direction') && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <button
            type="button"
            className="text-sm font-medium text-amber-900 hover:underline"
            onClick={() => setNcOpen(true)}
          >
            Signaler une non-conformité liée à ce document
          </button>
          {ncOpen && (
            <div className="mt-2 space-y-2">
              <textarea
                className="w-full rounded border px-2 py-1 text-sm"
                placeholder="Description de la NC…"
                value={ncDesc}
                onChange={(e) => setNcDesc(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded bg-amber-800 px-3 py-1 text-sm text-white"
                  onClick={() =>
                    run(async () => {
                      await addNonConformity(doc.id, ncDesc, user!.displayName);
                      setNcOpen(false);
                      setNcDesc('');
                    })
                  }
                >
                  Enregistrer
                </button>
                <button type="button" className="text-sm" onClick={() => setNcOpen(false)}>
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {doc.status === 'Brouillon' && canCreate(user) && (
          <>
            <button
              type="button"
              className="rounded-lg bg-blue-800 px-3 py-2 text-sm font-medium text-white"
              onClick={() => run(() => submitForValidation(doc.id, user!.displayName))}
            >
              Envoyer validation
            </button>
            {canDeleteDraft(user) && (
              <button
                type="button"
                className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700"
                onClick={() => run(() => deleteDraft(doc.id))}
              >
                Supprimer brouillon
              </button>
            )}
          </>
        )}
        {(doc.status === 'En attente QHSE' && canValidateQhse(user)) ||
        (doc.status === 'En attente Direction' && canValidateDirection(user)) ? (
          <div className="w-full space-y-2 rounded-lg border p-3">
            <textarea
              className="w-full rounded border px-2 py-1 text-sm"
              placeholder="Commentaire validation / rejet"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-emerald-700 px-3 py-2 text-sm text-white"
                onClick={() =>
                  run(() => approveValidation(doc.id, user!.displayName, comment))
                }
              >
                Valider
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                onClick={() =>
                  run(() => rejectValidation(doc.id, user!.displayName, comment || 'Rejeté'))
                }
              >
                Rejeter
              </button>
            </div>
          </div>
        ) : null}
        {doc.status === 'Publié' && canCreate(user) && (
          <>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm"
              onClick={() => run(() => createNewVersionDraft(doc.id, user!.displayName))}
            >
              Nouvelle version (brouillon)
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm"
              onClick={() => run(() => archiveDocument(doc.id, user!.displayName))}
            >
              Archiver
            </button>
            <button
              type="button"
              className="rounded-lg bg-emerald-700 px-3 py-2 text-sm text-white"
              onClick={() => setPublished(true)}
            >
              Confirmer publication / QR
            </button>
          </>
        )}
      </div>

      {user?.role === 'Qualité' || user?.role === 'Direction' ? (
        <section className="rounded-xl border bg-amber-50 p-4">
          <h2 className="font-semibold">Fiche non-conformité</h2>
          <textarea
            className="mt-2 w-full rounded border px-2 py-1 text-sm"
            placeholder="Description NC liée au document"
            value={ncText}
            onChange={(e) => setNcText(e.target.value)}
          />
          <button
            type="button"
            className="mt-2 rounded-lg bg-amber-700 px-3 py-2 text-sm text-white"
            disabled={!ncText.trim()}
            onClick={() =>
              run(() => addNonConformity(doc.id, ncText, user!.displayName)).then(() =>
                setNcText('')
              )
            }
          >
            Enregistrer NC
          </button>
        </section>
      ) : null}

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Historique des versions</h2>
        <ul className="mt-2 divide-y text-sm">
          {versions.map((v) => (
            <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span>
                {v.version} — {new Date(v.modifiedAt).toLocaleDateString('fr-FR')} — {v.modifiedBy}{' '}
                <StatusBadge status={v.status} />
              </span>
              {canCreate(user) && (
                <button
                  type="button"
                  className="text-blue-700 hover:underline"
                  onClick={() =>
                    run(() => restoreVersion(doc.id, v.id, user!.displayName))
                  }
                >
                  Restaurer en brouillon
                </button>
              )}
            </li>
          ))}
        </ul>
        {versions.length >= 2 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Comparer deux versions</p>
            <div className="flex gap-2">
              <select className="rounded border px-2 py-1 text-sm" value={diffA} onChange={(e) => setDiffA(e.target.value)}>
                <option value="">Version A</option>
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.version}
                  </option>
                ))}
              </select>
              <select className="rounded border px-2 py-1 text-sm" value={diffB} onChange={(e) => setDiffB(e.target.value)}>
                <option value="">Version B</option>
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.version}
                  </option>
                ))}
              </select>
            </div>
            {compareVersions()}
          </div>
        )}
      </section>
    </div>
  );
}
