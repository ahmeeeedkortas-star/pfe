import { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useAuth } from '../context/AuthContext';
import { canAdmin } from '../services/authService';
import { clearAllData, generateSampleData } from '../services/seedService';
import type { AppConfig } from '../types';

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1 flex gap-2">
        <input
          className="flex-1 rounded border px-2 py-1 text-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onChange([...items, value.trim()]);
              setValue('');
            }
          }}
        />
        <button
          type="button"
          className="rounded bg-slate-100 px-2 text-sm"
          onClick={() => {
            if (value.trim()) {
              onChange([...items, value.trim()]);
              setValue('');
            }
          }}
        >
          Ajouter
        </button>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs"
          >
            {item}
            <button
              type="button"
              className="text-red-600"
              onClick={() => onChange(items.filter((x) => x !== item))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdminPage() {
  const { config, update } = useConfig();
  const { user } = useAuth();
  const [local, setLocal] = useState<AppConfig | null>(config);

  if (!canAdmin(user)) {
    return <p className="text-slate-600">Réservé au rôle Direction.</p>;
  }

  if (!local) return null;

  const save = () => update(local);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Configuration</h1>
      <p className="text-sm text-slate-600">
        Types, processus, zones, postes terrain et paramètres KPI. Modifiable sans toucher au code.
      </p>

      <div className="space-y-4 rounded-xl border bg-white p-6">
        <ListEditor
          label="Types de document"
          items={local.documentTypes}
          onChange={(documentTypes) => setLocal({ ...local, documentTypes })}
        />
        <ListEditor
          label="Processus"
          items={local.processes}
          onChange={(processes) => setLocal({ ...local, processes })}
        />
        <ListEditor
          label="Zones"
          items={local.zones}
          onChange={(zones) => setLocal({ ...local, zones })}
        />
        <ListEditor
          label="Postes terrain"
          items={local.posts}
          onChange={(posts) => setLocal({ ...local, posts })}
        />
        <ListEditor
          label="Normes ISO"
          items={local.isoNorms}
          onChange={(isoNorms) => setLocal({ ...local, isoNorms })}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Seuil non-lu (jours)</label>
            <input
              type="number"
              className="mt-1 w-full rounded border px-2 py-1"
              value={local.unreadDaysThreshold}
              onChange={(e) =>
                setLocal({ ...local, unreadDaysThreshold: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Revue ISO (mois)</label>
            <input
              type="number"
              className="mt-1 w-full rounded border px-2 py-1"
              value={local.isoReviewMonths}
              onChange={(e) =>
                setLocal({ ...local, isoReviewMonths: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Préfixe code document</label>
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            value={local.codePrefix}
            onChange={(e) => setLocal({ ...local, codePrefix: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white"
        >
          Enregistrer la configuration
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 p-4">
        <h2 className="font-semibold">Données (optionnel)</h2>
        <p className="mt-1 text-sm text-slate-500">
          L&apos;application démarre vide. Générez des exemples uniquement si nécessaire.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={() => user && generateSampleData(user.displayName)}
          >
            Créer des exemples
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700"
            onClick={() => clearAllData()}
          >
            Tout effacer
          </button>
        </div>
      </div>
    </div>
  );
}
