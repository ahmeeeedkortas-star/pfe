import type { ValidationLog } from '../../types';

export function WorkflowTimeline({ logs }: { logs: ValidationLog[] }) {
  if (logs.length === 0) {
    return <p className="text-sm text-slate-500">Aucun événement enregistré.</p>;
  }

  return (
    <ul className="space-y-4 border-l-2 border-slate-200 pl-4">
      {[...logs].reverse().map((log) => (
        <li key={log.id} className="relative">
          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#185FA5]" />
          <p className="text-sm font-medium text-slate-900">
            {log.action === 'submit' && 'Soumis pour validation'}
            {log.action === 'approve' && `Validé — ${log.toStatus}`}
            {log.action === 'reject' && 'Rejeté / retour brouillon'}
          </p>
          <p className="text-xs text-slate-500">
            {new Date(log.at).toLocaleString('fr-FR')} — {log.userName}
          </p>
          {log.comment && <p className="mt-1 text-xs text-slate-600">{log.comment}</p>}
        </li>
      ))}
    </ul>
  );
}
