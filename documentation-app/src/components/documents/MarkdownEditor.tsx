import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownEditor({
  value,
  onChange,
  label = 'Contenu',
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="text-xs font-medium text-blue-700 hover:underline"
        >
          {preview ? 'Éditer' : 'Aperçu Markdown'}
        </button>
      </div>
      {preview ? (
        <div className="prose prose-sm max-w-none min-h-[200px] rounded-lg border border-slate-200 bg-slate-50 p-4">
          <ReactMarkdown>{value || '*Aucun contenu*'}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          className="min-h-[200px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rédigez le contenu (Markdown supporté)…"
        />
      )}
    </div>
  );
}
