import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  applyFieldFilters,
  applySearchQuery,
  DOCUMENT_FILTER_PRESETS,
  groupDocuments,
  sortDocuments,
  type OdooGroupById,
  type OdooSortId,
} from '../lib/odooList';
import { useDocuments } from './useDocuments';
import type { Document } from '../types';

export type OdooViewMode = 'list' | 'kanban';

export interface OdooFieldFilters {
  type: string;
  process: string;
  zone: string;
  status: string;
  isoNorm: string;
}

const emptyFields: OdooFieldFilters = {
  type: '',
  process: '',
  zone: '',
  status: '',
  isoNorm: '',
};

export function useOdooListView(initialPresetId = 'all') {
  const { user } = useAuth();
  const { documents, loading } = useDocuments();
  const [query, setQuery] = useState('');
  const [presetId, setPresetId] = useState(initialPresetId);
  const [fields, setFields] = useState<OdooFieldFilters>({ ...emptyFields });
  const [groupBy, setGroupBy] = useState<OdooGroupById>('');
  const [sortId, setSortId] = useState<OdooSortId>('updatedAt-desc');
  const [viewMode, setViewMode] = useState<OdooViewMode>('list');
  const [page, setPage] = useState(1);
  const pageSize = 40;

  const filtered = useMemo(() => {
    const preset = DOCUMENT_FILTER_PRESETS.find((p) => p.id === presetId) ?? DOCUMENT_FILTER_PRESETS[0];
    let rows = preset.apply(documents, { userName: user?.displayName });
    rows = applyFieldFilters(rows, fields);
    rows = applySearchQuery(rows, query);
    return sortDocuments(rows, sortId);
  }, [documents, presetId, fields, query, sortId, user?.displayName]);

  const groups = useMemo(() => groupDocuments(filtered, groupBy), [filtered, groupBy]);

  const flatForList = useMemo(() => {
    if (!groupBy) return filtered;
    return groups.flatMap((g) => g.rows);
  }, [filtered, groupBy, groups]);

  const totalPages = Math.max(1, Math.ceil(flatForList.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return flatForList.slice(start, start + pageSize);
  }, [flatForList, safePage, pageSize]);

  const filterOptions = useMemo(() => {
    const types = new Set<string>();
    const processes = new Set<string>();
    const zones = new Set<string>();
    const statuses = new Set<string>();
    documents.forEach((d) => {
      types.add(d.type);
      processes.add(d.process);
      zones.add(d.zone);
      statuses.add(d.status);
    });
    return {
      types: [...types].sort(),
      processes: [...processes].sort(),
      zones: [...zones].sort(),
      statuses: [...statuses],
    };
  }, [documents]);

  const resetFilters = () => {
    setQuery('');
    setPresetId('all');
    setFields({ ...emptyFields });
    setGroupBy('');
    setPage(1);
  };

  const setField = (key: keyof OdooFieldFilters, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  return {
    loading,
    query,
    setQuery,
    presetId,
    setPresetId: (id: string) => {
      setPresetId(id);
      setPage(1);
    },
    fields,
    setField,
    groupBy,
    setGroupBy: (g: OdooGroupById) => {
      setGroupBy(g);
      setPage(1);
    },
    sortId,
    setSortId,
    viewMode,
    setViewMode,
    filtered,
    groups,
    pagedRows,
    flatForList,
    filterOptions,
    resetFilters,
    page: safePage,
    setPage,
    totalPages,
    pageSize,
    totalCount: filtered.length,
  };
}

export type OdooListViewState = ReturnType<typeof useOdooListView>;
