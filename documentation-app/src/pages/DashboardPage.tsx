import { AlertTriangle, Clock, FileCheck, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { KpiCard } from '../components/ui/KpiCard';
import { useKpis } from '../hooks/useKpis';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#8b5cf6', '#64748b'];

export function DashboardPage() {
  const { kpis, alerts, loading } = useKpis();

  if (loading || !kpis) {
    return <p className="text-slate-500">Chargement des indicateurs…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <Link to="/kpi" className="text-sm font-medium text-blue-700 hover:underline">
          Indicateurs détaillés →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="% à jour" value={`${kpis.upToDatePercent}%`} icon={FileCheck} />
        <KpiCard label="% obsolètes" value={`${kpis.obsoletePercent}%`} icon={Percent} />
        <KpiCard label="En validation" value={kpis.inValidationCount} icon={Clock} />
        <KpiCard
          label="Délai moyen validation"
          value={`${kpis.avgValidationDays} j`}
          icon={Clock}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">Répartition par type</h2>
          {kpis.byType.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun document — ajoutez-en via la bibliothèque.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={kpis.byType} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80}>
                  {kpis.byType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">Volume par type</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={kpis.byType}>
              <XAxis dataKey="type" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <AlertTriangle size={16} className="text-amber-600" /> Alertes
        </h2>
        <ul className="space-y-2">
          {alerts.map((a) => (
            <li
              key={a.id}
              className={`rounded-lg px-3 py-2 text-sm ${
                a.severity === 'critical'
                  ? 'bg-red-50 text-red-800'
                  : a.severity === 'warning'
                    ? 'bg-amber-50 text-amber-900'
                    : 'bg-slate-50 text-slate-700'
              }`}
            >
              {a.documentId ? (
                <Link to={`/documents/${a.documentId}`} className="font-medium hover:underline">
                  {a.message}
                </Link>
              ) : (
                a.message
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
