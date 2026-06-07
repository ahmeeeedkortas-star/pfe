import { useCallback, useEffect, useState } from 'react';
import * as docService from '../services/documentService';
import type { Document } from '../types';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setDocuments(await docService.listDocuments());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { documents, loading, refresh };
}

export function useDocumentSearch(
  query: string,
  filters: { type?: string; process?: string; zone?: string; status?: string }
) {
  const [results, setResults] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    docService.searchDocuments(query, filters).then((rows) => {
      if (!cancelled) {
        setResults(rows);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query, filters.type, filters.process, filters.zone, filters.status]);

  return { results, loading };
}
