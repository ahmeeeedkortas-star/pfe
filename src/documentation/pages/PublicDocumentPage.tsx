import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../services/documentService';
import type { Document } from '../types';

export function PublicDocumentPage() {
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<Document | null>(null);

  useEffect(() => {
    if (id) getDocument(id).then((d) => setDoc(d ?? null));
  }, [id]);

  if (!doc) return <p className="p-8 text-center text-slate-500">Chargement…</p>;
  if (doc.status !== 'Publié') {
    return (
      <p className="p-8 text-center text-red-600">
        Ce document n&apos;est pas publié ou n&apos;est pas accessible.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <p className="font-mono text-xs text-slate-500">{doc.code} · {doc.currentVersion}</p>
      <h1 className="text-2xl font-bold">{doc.title}</h1>
      <div className="prose mt-6 max-w-none">
        <ReactMarkdown>{doc.content}</ReactMarkdown>
      </div>
    </div>
  );
}
