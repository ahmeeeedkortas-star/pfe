import { useConfig } from '../../context/ConfigContext';
import type { DocumentFormInput } from '../../types';
import { MarkdownEditor } from './MarkdownEditor';

const empty: DocumentFormInput = {
  title: '',
  type: '',
  process: '',
  zone: '',
  responsible: '',
  content: '',
};

export function DocumentForm({
  initial = empty,
  onChange,
}: {
  initial?: DocumentFormInput;
  onChange: (v: DocumentFormInput) => void;
}) {
  const { config } = useConfig();
  const v = { ...empty, ...initial };

  const set = (patch: Partial<DocumentFormInput>) => onChange({ ...v, ...patch });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700">Titre *</label>
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.title}
          onChange={(e) => set({ title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Type *</label>
        <select
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.type}
          onChange={(e) => set({ type: e.target.value })}
        >
          <option value="">—</option>
          {(config?.documentTypes ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Processus *</label>
        <select
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.process}
          onChange={(e) => set({ process: e.target.value })}
        >
          <option value="">—</option>
          {(config?.processes ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Zone *</label>
        <select
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.zone}
          onChange={(e) => set({ zone: e.target.value })}
        >
          <option value="">—</option>
          {(config?.zones ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Emplacement / poste</label>
        <select
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.postId ?? ''}
          onChange={(e) => set({ postId: e.target.value || undefined })}
        >
          <option value="">—</option>
          {(config?.posts ?? []).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Norme ISO</label>
        <select
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.isoNorm ?? ''}
          onChange={(e) => set({ isoNorm: e.target.value || undefined })}
        >
          <option value="">—</option>
          {(config?.isoNorms ?? []).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Responsable *</label>
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={v.responsible}
          onChange={(e) => set({ responsible: e.target.value })}
        />
      </div>
      <div className="md:col-span-2">
        <MarkdownEditor value={v.content} onChange={(content) => set({ content })} />
      </div>
    </div>
  );
}
