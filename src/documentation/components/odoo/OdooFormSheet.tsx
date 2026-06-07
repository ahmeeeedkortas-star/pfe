import type { DocumentStatus } from '../../types';
import { statusStageIndex } from '../../lib/odooList';

const WORKFLOW_STAGES: { status: DocumentStatus; label: string }[] = [
  { status: 'Brouillon', label: 'Brouillon' },
  { status: 'En attente QHSE', label: 'QHSE' },
  { status: 'En attente Direction', label: 'Direction' },
  { status: 'Publié', label: 'Publié' },
  { status: 'Archivé', label: 'Archivé' },
];

export function OdooStatusBar({ current }: { current: DocumentStatus }) {
  const idx = statusStageIndex(current);
  return (
    <div className="odoo-statusbar flex overflow-x-auto rounded-t-xl border border-b-0 border-slate-200 bg-slate-100">
      {WORKFLOW_STAGES.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div
            key={s.status}
            className={`flex-1 border-r border-slate-200 px-3 py-2 text-center text-xs font-semibold last:border-r-0 ${
              active
                ? 'bg-[#185FA5] text-white'
                : done
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-500'
            }`}
          >
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

export function OdooFormSheet({
  title,
  subtitle,
  status,
  children,
  actions,
  tabs,
  activeTab,
  onTabChange,
}: {
  title: string;
  subtitle?: string;
  status?: DocumentStatus;
  children: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}) {
  return (
    <div className="odoo-form-sheet">
      {status && <OdooStatusBar current={status} />}
      <div className="rounded-b-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {tabs && tabs.length > 0 && (
          <nav className="flex gap-0 border-b border-slate-200 bg-slate-50 px-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === t.id
                    ? 'border-[#185FA5] text-[#185FA5]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => onTabChange?.(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}

export function OdooFormGroup({
  title,
  children,
  cols = 2,
}: {
  title: string;
  children: React.ReactNode;
  cols?: 1 | 2;
}) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 w-full border-b border-slate-200 pb-1 text-sm font-semibold text-[#185FA5]">
        {title}
      </legend>
      <div className={`grid gap-4 ${cols === 2 ? 'md:grid-cols-2' : ''}`}>{children}</div>
    </fieldset>
  );
}

export function OdooField({
  label,
  required,
  children,
  span = 1,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  span?: 1 | 2;
}) {
  return (
    <label className={`odoo-field block ${span === 2 ? 'md:col-span-2' : ''}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        {label}
        {required && <span className="text-[#A32D2D]"> *</span>}
      </span>
      {children}
    </label>
  );
}
