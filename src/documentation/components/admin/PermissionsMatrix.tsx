import { Check, X } from 'lucide-react';
import { getPermissionsMatrix, PERMISSION_LABELS, ROLE_LABELS } from '../../lib/permissions';

export function PermissionsMatrix() {
  const { roles, permissions, cells } = getPermissionsMatrix();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left">Rôle</th>
            {permissions.map((p) => (
              <th key={p} className="px-3 py-3 text-center">
                {PERMISSION_LABELS[p]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role} className="border-t">
              <td className="px-4 py-3 font-medium text-slate-800">{ROLE_LABELS[role]}</td>
              {permissions.map((p) => (
                <td key={p} className="px-3 py-3 text-center">
                  {cells[role][p] ? (
                    <Check className="mx-auto text-emerald-600" size={18} aria-label="Autorisé" />
                  ) : (
                    <X className="mx-auto text-[#A32D2D]" size={18} aria-label="Refusé" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
