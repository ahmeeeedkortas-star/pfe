import { useState } from 'react';
import { PermissionsMatrix } from '../components/admin/PermissionsMatrix';
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
              className="text-[#A32D2D]"
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

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-xl font-bold text-slate-900">Configuration</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Droits d&apos;accès</h2>
        <p className="text-sm text-slate-500">Matrice des permissions par rôle (lecture seule).</p>
        <PermissionsMatrix />
      </section>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
          onClick={() => update(local)}
          className="rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white"
        >
          Enregistrer la configuration
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 p-4">
        <h2 className="font-semibold">Données (optionnel)</h2>
        <p className="mt-1 text-sm text-slate-500">Démarrage vide — exemples via Direction uniquement.</p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="rounded-lg border px-3 py-2 text-sm"
            onClick={() => user && generateSampleData(user.displayName)}
          >
            Créer des exemples (4 documents)
          </button>
          <button
            type="button"
            className="rounded-lg border border-[#A32D2D]/40 px-3 py-2 text-sm text-[#A32D2D]"
            onClick={() => clearAllData()}
          >
            Tout effacer
          </button>
        </div>
      </div>
    </div>
  );
}
