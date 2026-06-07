import { Link, useParams } from 'react-router-dom';
import { PublicationSuccess } from '../components/documents/PublicationSuccess';
import { useDocument } from '../hooks/useDocument';
import { getPublicDocumentUrl } from '../services/documentService';

export function DocumentPublicationPage() {
  const { id } = useParams<{ id: string }>();
  const { doc, loading } = useDocument(id);

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (!doc || doc.status !== 'Publié') {
    return (
      <p className="text-slate-500">
        Publication non disponible.{' '}
        <Link to={`/documents/${id}`} className="text-[#185FA5] hover:underline">
          Retour au document
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <PublicationSuccess doc={doc} publicUrl={getPublicDocumentUrl(doc.id)} />
      <Link to="/bibliotheque" className="text-sm text-[#185FA5] hover:underline">
        ← Bibliothèque
      </Link>
    </div>
  );
}
