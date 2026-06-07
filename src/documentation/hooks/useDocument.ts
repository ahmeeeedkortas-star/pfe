import { useCallback, useEffect, useState } from 'react';
import { getDocument, getVersions } from '../services/documentService';
import { db } from '../db/database';
import type { Document, DocumentVersion, ValidationLog } from '../types';

export function useDocument(id: string | undefined) {
  const [doc, setDoc] = useState<Document | null>(null);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [logs, setLogs] = useState<ValidationLog[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const d = await getDocument(id);
    setDoc(d ?? null);
    setVersions(await getVersions(id));
    const validationLogs = await db.validationLogs.where('documentId').equals(id).sortBy('at');
    setLogs(validationLogs);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { doc, versions, logs, loading, reload };
}
