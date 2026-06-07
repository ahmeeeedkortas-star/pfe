import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentForm } from '../components/documents/DocumentForm';
import { OdooFormSheet } from '../components/odoo/OdooFormSheet';
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
      navigate(draft ? `/documents/${doc.id}` : `/documents/${doc.id}/validation`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <OdooFormSheet
        title="Création de document"
        subtitle="Formulaire type Odoo — enregistrement local IndexedDB"
        status="Brouillon"
        actions={
          <>
            <button
              type="button"
              className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
              onClick={() => save(true)}
            >
              Sauvegarder brouillon
            </button>
            <button
              type="button"
              className="rounded bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134a82]"
              onClick={() => save(false)}
            >
              Envoyer pour validation
            </button>
          </>
        }
      >
        <DocumentForm initial={form} onChange={setForm} odooLayout />
        {error && <p className="mt-2 text-sm text-[#A32D2D]">{error}</p>}
      </OdooFormSheet>
    </div>
  );
}
