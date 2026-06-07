import {
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DOCUMENT_FILTER_PRESETS,
  ODOO_GROUP_BY_OPTIONS,
  ODOO_SORT_OPTIONS,
} from '../../lib/odooList';
import type { OdooListViewState } from '../../hooks/useOdooListView';

export function OdooControlPanel({
  title,
  subtitle,
  list,
  showCreate = true,
  showIsoFilter = false,
  isoOptions = [],
}: {
  title: string;
  subtitle?: string;
  list: OdooListViewState;
  showCreate?: boolean;
  showIsoFilter?: boolean;
  isoOptions?: string[];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
        setGroupOpen(false);
        setFavOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const activeFieldCount = Object.values(list.fields).filter(Boolean).length;
  const hasActive =
    list.query ||
    list.presetId !== 'all' ||
    activeFieldCount > 0 ||
    list.groupBy;

  const presetLabel =
    DOCUMENT_FILTER_PRESETS.find((p) => p.id === list.presetId)?.label ?? 'Tous';

  return (
    <div ref={panelRef} className="odoo-control-panel space-y-0">
      <div className="odoo-cp-bar flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-slate-200 bg-white px-3 py-2 shadow-sm">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>

        <div className="odoo-search flex min-w-[200px] flex-1 items-center rounded-md border border-slate-300 bg-slate-50 focus-within:border-[#185FA5] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#185FA5]">
          <Search size={16} className="ml-2 shrink-0 text-slate-400" />
          <input
            type="search"
            className="w-full border-0 bg-transparent px-2 py-1.5 text-sm outline-none"
            placeholder="Rechercher…"
            value={list.query}
            onChange={(e) => {
              list.setQuery(e.target.value);
              list.setPage(1);
            }}
          />
          {list.query && (
            <button
              type="button"
              className="mr-1 rounded p-0.5 text-slate-400 hover:bg-slate-200"
              onClick={() => list.setQuery('')}
              aria-label="Effacer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`odoo-cp-btn ${favOpen ? 'odoo-cp-btn-active' : ''}`}
            onClick={() => {
              setFavOpen(!favOpen);
              setFiltersOpen(false);
              setGroupOpen(false);
            }}
          >
            <SlidersHorizontal size={14} />
            Favoris
            <ChevronDown size={14} />
          </button>
          {favOpen && (
            <OdooDropdown>
              {DOCUMENT_FILTER_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`odoo-dd-item w-full text-left ${list.presetId === p.id ? 'odoo-dd-item-active' : ''}`}
                  onClick={() => {
                    list.setPresetId(p.id);
                    setFavOpen(false);
                  }}
                >
                  <span className="font-medium">{p.label}</span>
                  {p.description && (
                    <span className="mt-0.5 block text-xs text-slate-500">{p.description}</span>
                  )}
                </button>
              ))}
            </OdooDropdown>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`odoo-cp-btn ${filtersOpen || activeFieldCount ? 'odoo-cp-btn-active' : ''}`}
            onClick={() => {
              setFiltersOpen(!filtersOpen);
              setGroupOpen(false);
              setFavOpen(false);
            }}
          >
            <Filter size={14} />
            Filtres
            {activeFieldCount > 0 && (
              <span className="odoo-badge">{activeFieldCount}</span>
            )}
            <ChevronDown size={14} />
          </button>
          {filtersOpen && (
            <OdooDropdown wide>
              <p className="mb-2 px-2 text-xs font-semibold uppercase text-slate-500">
                Filtres avancés
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <OdooFieldSelect
                  label="Type"
                  value={list.fields.type}
                  options={list.filterOptions.types}
                  onChange={(v) => list.setField('type', v)}
                />
                <OdooFieldSelect
                  label="Processus"
                  value={list.fields.process}
                  options={list.filterOptions.processes}
                  onChange={(v) => list.setField('process', v)}
                />
                <OdooFieldSelect
                  label="Zone"
                  value={list.fields.zone}
                  options={list.filterOptions.zones}
                  onChange={(v) => list.setField('zone', v)}
                />
                <OdooFieldSelect
                  label="Statut"
                  value={list.fields.status}
                  options={list.filterOptions.statuses}
                  onChange={(v) => list.setField('status', v)}
                />
                {showIsoFilter && (
                  <OdooFieldSelect
                    label="Norme ISO"
                    value={list.fields.isoNorm}
                    options={isoOptions}
                    onChange={(v) => list.setField('isoNorm', v)}
                  />
                )}
              </div>
            </OdooDropdown>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`odoo-cp-btn ${groupOpen || list.groupBy ? 'odoo-cp-btn-active' : ''}`}
            onClick={() => {
              setGroupOpen(!groupOpen);
              setFiltersOpen(false);
              setFavOpen(false);
            }}
          >
            Regrouper par
            <ChevronDown size={14} />
          </button>
          {groupOpen && (
            <OdooDropdown>
              {ODOO_GROUP_BY_OPTIONS.map((o) => (
                <button
                  key={o.id || 'none'}
                  type="button"
                  className={`odoo-dd-item w-full text-left ${list.groupBy === o.id ? 'odoo-dd-item-active' : ''}`}
                  onClick={() => {
                    list.setGroupBy(o.id);
                    setGroupOpen(false);
                  }}
                >
                  {o.label}
                </button>
              ))}
            </OdooDropdown>
          )}
        </div>

        <select
          className="odoo-cp-select hidden text-sm sm:block"
          value={list.sortId}
          onChange={(e) => list.setSortId(e.target.value as typeof list.sortId)}
          title="Tri"
        >
          {ODOO_SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        <div className="odoo-view-switch flex rounded-md border border-slate-300">
          <button
            type="button"
            className={`p-1.5 ${list.viewMode === 'list' ? 'bg-[#185FA5] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => list.setViewMode('list')}
            title="Liste"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={`p-1.5 ${list.viewMode === 'kanban' ? 'bg-[#185FA5] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => list.setViewMode('kanban')}
            title="Kanban"
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        {showCreate && (
          <Link to="/documents/nouveau" className="odoo-btn-primary inline-flex items-center gap-1">
            <Plus size={16} /> Nouveau
          </Link>
        )}
      </div>

      {(hasActive || list.totalCount >= 0) && (
        <div className="flex flex-wrap items-center gap-2 border border-t-0 border-slate-200 bg-slate-50 px-3 py-1.5 text-xs">
          <span className="font-medium text-slate-700">
            {list.totalCount} enregistrement{list.totalCount !== 1 ? 's' : ''}
          </span>
          {list.presetId !== 'all' && (
            <OdooChip label={presetLabel} onRemove={() => list.setPresetId('all')} />
          )}
          {list.fields.type && (
            <OdooChip label={`Type: ${list.fields.type}`} onRemove={() => list.setField('type', '')} />
          )}
          {list.fields.process && (
            <OdooChip
              label={`Processus: ${list.fields.process}`}
              onRemove={() => list.setField('process', '')}
            />
          )}
          {list.fields.zone && (
            <OdooChip label={`Zone: ${list.fields.zone}`} onRemove={() => list.setField('zone', '')} />
          )}
          {list.fields.status && (
            <OdooChip label={`Statut: ${list.fields.status}`} onRemove={() => list.setField('status', '')} />
          )}
          {list.fields.isoNorm && (
            <OdooChip
              label={`ISO: ${list.fields.isoNorm}`}
              onRemove={() => list.setField('isoNorm', '')}
            />
          )}
          {list.groupBy && (
            <OdooChip
              label={`Groupe: ${ODOO_GROUP_BY_OPTIONS.find((g) => g.id === list.groupBy)?.label}`}
              onRemove={() => list.setGroupBy('')}
            />
          )}
          {hasActive && (
            <button
              type="button"
              className="ml-auto text-[#185FA5] hover:underline"
              onClick={list.resetFilters}
            >
              Tout effacer
            </button>
          )}
        </div>
      )}

    </div>
  );
}

function OdooDropdown({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`absolute right-0 top-full z-50 mt-1 max-h-[70vh] overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg ${wide ? 'min-w-[320px]' : 'min-w-[200px]'}`}
    >
      {children}
    </div>
  );
}

function OdooFieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block px-2 text-sm">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <select
        className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Tous</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function OdooChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-slate-700">
      {label}
      <button type="button" onClick={onRemove} className="text-slate-400 hover:text-slate-700">
        <X size={12} />
      </button>
    </span>
  );
}

export function OdooPager({
  page,
  totalPages,
  onPage,
  pageSize,
  total,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
  pageSize: number;
  total: number;
}) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between border border-t-0 border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
      <span>
        {from}–{to} / {total}
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          className="rounded border px-2 py-0.5 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Préc.
        </button>
        <span className="px-2 py-0.5">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="rounded border px-2 py-0.5 disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Suiv.
        </button>
      </div>
    </div>
  );
}
