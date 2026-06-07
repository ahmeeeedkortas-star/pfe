import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { HighlightText } from '../components/ui/HighlightText';
import { useAuth } from '../context/AuthContext';
import { canCreate } from '../services/authService';
import { useDocumentSearch, useDocuments } from '../hooks/useDocuments';
import type { DocumentStatus } from '../types';

export function LibraryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [process, setProcess] = useState('');
  const [zone, setZone] = useState('');
  const [status, setStatus] = useState('');

  const { documents: allDocs } = useDocuments();
  const { results, loading } = useDocumentSearch(q, { type, process, zone, status });

  const filterOptions = useMemo(() => {
    const types = new Set<string>();
    const processes = new Set<string>();
    const zones = new Set<string>();
    const statuses = new Set<string>();
    allDocs.forEach((d) => {
      types.add(d.type);
      processes.add(d.process);
      zones.add(d.zone);
      statuses.add(d.status);
    });
    return {
      types: [...types],
      processes: [...processes],
      zones: [...zones],
      statuses: [...statuses] as DocumentStatus[],
    };
  }, [allDocs]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Bibliothèque documentaire</h1>
        {canCreate(user) && (
          <Link
            to="/documents/nouveau"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
          >
            <Plus size={16} /> Nouveau document
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Rechercher titre, code, contenu…"
          className="min-w-[200px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="rounded-lg border border-slate-300 px-2 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Type</option>
          {filterOptions.types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-300 px-2 py-2 text-sm" value={process} onChange={(e) => setProcess(e.target.value)}>
          <option value="">Processus</option>
          {filterOptions.processes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-300 px-2 py-2 text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="">Zone</option>
          {filterOptions.zones.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-300 px-2 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Statut</option>
          {filterOptions.statuses.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Chargement…
                </td>
              </tr>
            ) : results.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Aucun document. Créez le premier via « Nouveau document ».
                </td>
              </tr>
            ) : (
              results.map((d) => (
                <tr
                  key={d.id}
                  className="cursor-pointer border-t hover:bg-slate-50"
                  onClick={() => navigate(`/documents/${d.id}`)}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    <HighlightText text={d.code} query={q} />
                  </td>
                  <td className="px-4 py-3 font-medium">
                    <HighlightText text={d.title} query={q} />
                  </td>
                  <td className="px-4 py-3">{d.type}</td>
                  <td className="px-4 py-3">{d.currentVersion}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
