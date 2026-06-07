import QRCode from 'react-qr-code';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Factory } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { useDocuments } from '../hooks/useDocuments';

const TERRAIN_DOC_HINTS = [
  'Instruction CNC',
  'Check-list 5S',
  'Sécurité machine',
  'Maintenance',
];

export function TerrainPage() {
  const { config } = useConfig();
  const { documents } = useDocuments();
  const [post, setPost] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
    const p = q.get('post');
    if (p) setPost(p);
  }, []);

  const posts = config?.posts ?? [];
  const machine = post || posts[0] || 'CNC-01';
  const zoneLabel =
    documents.find((d) => d.postId === machine)?.zone ??
    config?.zones?.find((z) => z.includes('Usinage')) ??
    'Atelier Usinage';

  const filtered = useMemo(
    () =>
      documents.filter(
        (d) =>
          d.status === 'Publié' &&
          (d.postId === machine || d.location === machine || d.zone === zoneLabel)
      ),
    [documents, machine, zoneLabel]
  );

  const terrainUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/#/terrain?post=${encodeURIComponent(machine)}`;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Accès terrain — QR Code</h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="doc-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#E6F1FB] p-2 text-[#185FA5]">
                <Factory size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Machine CNC</h2>
                <p className="text-sm text-slate-500">{zoneLabel}</p>
              </div>
            </div>
            <select
              className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={machine}
              onChange={(e) => setPost(e.target.value)}
            >
              {posts.length === 0 && <option value="CNC-01">CNC-01</option>}
              {posts.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-500">Identifiant</dt>
                <dd className="font-mono text-lg font-bold text-[#185FA5]">{machine}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Zone</dt>
                <dd className="font-medium">{zoneLabel}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Responsable</dt>
                <dd>{documents.find((d) => d.postId === machine)?.responsible ?? '—'}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col items-center rounded-xl border-2 border-[#185FA5]/20 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">QR Code terrain</h2>
            <QRCode value={terrainUrl} size={220} />
            <p className="mt-3 text-center text-xs text-slate-500">Scannez pour accéder aux documents</p>
          </div>
        </div>

        <div className="doc-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Documents liés à cette machine
          </h2>
          {posts.length === 0 && (
            <p className="mt-2 text-sm text-amber-700">
              Configurez les postes dans Configuration → Postes terrain.
            </p>
          )}
          {filtered.length === 0 ? (
            <ul className="mt-4 space-y-2">
              {TERRAIN_DOC_HINTS.map((label) => (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-dashed border-slate-200 px-3 py-2 text-sm text-slate-400"
                >
                  {label}
                  <span className="text-xs">—</span>
                </li>
              ))}
              <p className="pt-2 text-sm text-slate-500">
                Créez des exemples (Admin) ou publiez des documents liés au poste {machine}.
              </p>
            </ul>
          ) : (
            <ul className="mt-4 divide-y">
              {filtered.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-2 py-3">
                  <div>
                    <p className="font-mono text-xs text-slate-500">{d.code}</p>
                    <p className="font-medium">{d.title}</p>
                    <p className="text-xs text-slate-500">{d.type}</p>
                  </div>
                  <Link
                    to={`/documents/${d.id}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#185FA5] px-3 py-2 text-xs font-semibold text-white hover:bg-[#134a82]"
                  >
                    Ouvrir <ExternalLink size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
