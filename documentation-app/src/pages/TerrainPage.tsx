import QRCode from 'react-qr-code';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { useDocuments } from '../hooks/useDocuments';

export function TerrainPage() {
  const { config } = useConfig();
  const { documents } = useDocuments();
  const [post, setPost] = useState('');
  const [scanInput, setScanInput] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
    const p = q.get('post');
    if (p) setPost(p);
  }, []);

  const posts = config?.posts ?? [];
  const filtered = useMemo(() => {
    const p = post || scanInput;
    if (!p) return [];
    return documents.filter(
      (d) =>
        d.status === 'Publié' &&
        (d.postId === p || d.location === p || d.zone === p)
    );
  }, [documents, post, scanInput]);

  const terrainUrl = (postId: string) =>
    `${typeof window !== 'undefined' ? window.location.origin : ''}/#/terrain?post=${encodeURIComponent(postId)}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Accès terrain</h1>
      <p className="text-sm text-slate-600">
        Sélectionnez un poste ou simulez un scan QR (collez l&apos;URL ou l&apos;identifiant poste).
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <label className="text-sm font-medium">Poste / machine / zone</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          >
            <option value="">— Choisir —</option>
            {posts.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {post && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <QRCode value={terrainUrl(post)} size={120} />
              <p className="break-all text-center font-mono text-[10px]">{terrainUrl(post)}</p>
            </div>
          )}
        </div>
        <div className="rounded-xl border bg-white p-4">
          <label className="text-sm font-medium">Simulation scan QR</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="ID poste ou URL terrain"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Documents associés</h2>
        {posts.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            Aucun poste configuré — ajoutez-en dans Configuration.
          </p>
        )}
        {filtered.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Aucun document publié pour ce poste.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {filtered.map((d) => (
              <li key={d.id}>
                <Link to={`/documents/${d.id}`} className="text-blue-700 hover:underline">
                  {d.code} — {d.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
