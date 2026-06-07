import { useEffect, useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { peekDocumentCode } from '../../services/configService';
import { listUsers } from '../../services/authService';
import type { DocumentFormInput } from '../../types';
import { OdooField, OdooFormGroup } from '../odoo/OdooFormSheet';
import { PdfDropzone } from './PdfDropzone';

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
  odooLayout = false,
}: {
  initial?: DocumentFormInput;
  onChange: (v: DocumentFormInput) => void;
  odooLayout?: boolean;
}) {
  const { config } = useConfig();
  const v = { ...empty, ...initial };
  const [codePreview, setCodePreview] = useState('…');
  const [pdfName, setPdfName] = useState('');
  const [responsibles, setResponsibles] = useState<string[]>([]);

  useEffect(() => {
    peekDocumentCode().then(setCodePreview).catch(() => setCodePreview('DOC-???'));
    listUsers().then((users) => setResponsibles(users.map((u) => u.displayName)));
  }, []);

  const set = (patch: Partial<DocumentFormInput>) => onChange({ ...v, ...patch });

  const onPdf = (name: string, dataUrl?: string) => {
    setPdfName(name);
    const marker = dataUrl ? `[PDF_DATA:${dataUrl}]` : `[PDF:${name}]`;
    const desc = v.content.replace(/\[PDF[^\]]*\]\n?/g, '').trim();
    onChange({
      ...v,
      content: `${marker}\n\n${desc}`.trim(),
    });
  };

  const inputCls = 'w-full rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5]';
  const labelWrap = (label: string, required: boolean, el: React.ReactNode, span: 1 | 2 = 1) =>
    odooLayout ? (
      <OdooField label={label} required={required} span={span}>
        {el}
      </OdooField>
    ) : (
      <div className={span === 2 ? 'md:col-span-2' : ''}>
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required ? ' *' : ''}
        </label>
        <div className="mt-1">{el}</div>
      </div>
    );

  const body = (
    <>
      {labelWrap(
        'Titre',
        true,
        <input className={inputCls} value={v.title} onChange={(e) => set({ title: e.target.value })} required />,
        2
      )}
      {labelWrap(
        'Type',
        true,
        <select className={inputCls} value={v.type} onChange={(e) => set({ type: e.target.value })}>
          <option value="">—</option>
          {(config?.documentTypes ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}
      {labelWrap(
        'Processus',
        true,
        <select className={inputCls} value={v.process} onChange={(e) => set({ process: e.target.value })}>
          <option value="">—</option>
          {(config?.processes ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}
      {labelWrap(
        'Zone',
        true,
        <select className={inputCls} value={v.zone} onChange={(e) => set({ zone: e.target.value })}>
          <option value="">—</option>
          {(config?.zones ?? []).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}
      {labelWrap(
        'Code automatique',
        false,
        <input className={`${inputCls} bg-slate-50 font-mono text-slate-600`} value={codePreview} readOnly />
      )}
      {labelWrap(
        'Version',
        false,
        <input className={`${inputCls} bg-slate-50`} value="V1" readOnly />
      )}
      {labelWrap(
        'Description',
        false,
        <textarea
          className={inputCls}
          rows={4}
          value={v.content.replace(/\[PDF[^\]]*\]\n?/g, '').trim()}
          onChange={(e) => {
            const marker = v.content.match(/\[PDF[^\]]*\]/)?.[0] ?? '';
            set({ content: marker ? `${marker}\n\n${e.target.value}` : e.target.value });
          }}
          placeholder="Description du document…"
        />,
        2
      )}
      {labelWrap(
        'Fichier PDF',
        false,
        <PdfDropzone fileName={pdfName} onFile={onPdf} />,
        2
      )}
      {labelWrap(
        'Responsable',
        true,
        <select className={inputCls} value={v.responsible} onChange={(e) => set({ responsible: e.target.value })}>
          <option value="">— Sélectionner —</option>
          {responsibles.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>,
        2
      )}
    </>
  );

  if (odooLayout) {
    return (
      <>
        <OdooFormGroup title="Informations générales">{body}</OdooFormGroup>
      </>
    );
  }

  return <div className="grid gap-4 md:grid-cols-2">{body}</div>;
}
