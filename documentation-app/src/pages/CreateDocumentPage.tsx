import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentForm } from '../components/documents/DocumentForm';
import { useAuth } from '../context/AuthContext';
import { createDocument } from '../services/documentService';
import type { DocumentFormInput } from '../types';

const initial: DocumentFormInput = {
  title: '',
  type: '',
  process: '',
  zone: '',
  responsible: '',
  content: '',
};

export function CreateDocumentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<DocumentFormInput>({
    ...initial,
    responsible: user?.displayName ?? '',
  });
  const [error, setError] = useState('');

  const save = async (draft: boolean) => {
    if (!user) return;
    if (!form.title.trim()) {
      setError('Titre requis');
      return;
    }
    try {
      const doc = await createDocument(form, user.displayName, draft);
      navigate(`/documents/${doc.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Création de document</h1>
      <p className="text-sm text-slate-500">
        Code automatique · Version initiale V1 · Date du jour
      </p>
      <div className="rounded-xl border bg-white p-6">
        <DocumentForm initial={form} onChange={setForm} />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            onClick={() => save(true)}
          >
            Sauvegarder brouillon
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => save(false)}
          >
            Envoyer validation
          </button>
        </div>
      </div>
    </div>
  );
}
