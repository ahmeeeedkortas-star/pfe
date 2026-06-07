import type { LucideIcon } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export function KpiCard({
  label,
  value,
  icon: Icon,
  hint,
  progress,
  progressColor = 'bg-emerald-500',
  sparkline,
  sub,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  progress?: number;
  progressColor?: string;
  sparkline?: number[];
  sub?: string;
}) {
  const sparkData = (sparkline ?? [3, 5, 4, 6, 5, 7]).map((v, i) => ({ i, v }));

  return (
    <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          {sub && <p className="text-xs text-slate-500">{sub}</p>}
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
          {progress !== undefined && (
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${progressColor}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="rounded-lg bg-[#E6F1FB] p-2 text-[#185FA5]">
            <Icon size={20} />
          </div>
          {sparkline && (
            <div className="h-10 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line type="monotone" dataKey="v" stroke="#185FA5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
