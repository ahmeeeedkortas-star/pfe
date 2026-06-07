import { Paperclip } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useDocument } from '../hooks/useDocument';
import {
  approveValidation,
  getDocument,
  rejectValidation,
} from '../services/documentService';
import {
  canValidateDirection,
  canValidateQhse,
} from '../services/authService';

export function DocumentValidationScreen() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { doc, loading, reload } = useDocument(id);
  const [comment, setComment] = useState('');
  const [attachment, setAttachment] = useState('');

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (!doc) return <p className="text-slate-500">Document introuvable.</p>;

  const canAct =
    (doc.status === 'En attente QHSE' && canValidateQhse(user)) ||
    (doc.status === 'En attente Direction' && canValidateDirection(user));

  const run = async (action: 'approve' | 'reject' | 'modify') => {
    if (!user) return;
    const note = [comment, attachment && `PJ: ${attachment}`].filter(Boolean).join('\n');
    if (action === 'approve') {
      await approveValidation(doc.id, user.displayName, note);
      const updated = await getDocument(doc.id);
      if (updated?.status === 'Publié') {
        navigate(`/documents/${doc.id}/publication`);
      } else {
        navigate('/validation');
      }
    } else {
      await rejectValidation(
        doc.id,
        user.displayName,
        note || (action === 'modify' ? 'Modification demandée' : 'Rejeté')
      );
      navigate('/validation');
    }
    await reload();
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link to="/validation" className="text-sm text-[#185FA5] hover:underline">
        ← File de validation
      </Link>
      <h1 className="text-xl font-bold">Validation du document</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="font-mono text-xs text-slate-500">{doc.code}</p>
        <h2 className="text-lg font-bold">{doc.title}</h2>
        <div className="mt-2 flex gap-2 text-sm">
          <span>{doc.currentVersion}</span>
          <StatusBadge status={doc.status} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="text-sm font-medium">Commentaire / Observation</label>
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Votre commentaire…"
        />
        <label className="mt-4 flex items-center gap-2 text-sm font-medium">
          <Paperclip size={16} /> Pièce jointe
        </label>
        <input
          type="file"
          className="mt-1 w-full text-sm"
          onChange={(e) => setAttachment(e.target.files?.[0]?.name ?? '')}
        />
      </div>

      {canAct ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border-2 border-[#A32D2D] px-4 py-2 text-sm font-semibold text-[#A32D2D] hover:bg-red-50"
            onClick={() => run('reject')}
          >
            Rejeter
          </button>
          <button
            type="button"
            className="rounded-lg border-2 border-[#185FA5] px-4 py-2 text-sm font-semibold text-[#185FA5] hover:bg-[#E6F1FB]"
            onClick={() => run('modify')}
          >
            Demander modification
          </button>
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            onClick={() => run('approve')}
          >
            Valider
          </button>
        </div>
      ) : (
        <p className="text-sm text-amber-700">Vous n&apos;avez pas les droits pour valider ce document.</p>
      )}
    </div>
  );
}
