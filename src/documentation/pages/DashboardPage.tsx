import { AlertTriangle, Clock, FileCheck, Percent, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { KpiCard } from '../components/ui/KpiCard';
import { useKpis } from '../hooks/useKpis';
import { generateSampleData } from '../services/seedService';
import { BRAND_COLORS } from '../../config/brand-colors.js';

const COLORS = [...BRAND_COLORS.chart, '#3B6D11', '#854F0B'];

export function DashboardPage() {
  const { user } = useAuth();
  const { kpis, alerts, loading, refresh } = useKpis();
  const [seeding, setSeeding] = useState(false);

  const loadSamples = async () => {
    if (!user) return;
    setSeeding(true);
    try {
      const n = await generateSampleData(user.displayName);
      if (n > 0) await refresh();
    } finally {
      setSeeding(false);
    }
  };

  if (loading || !kpis) {
    return <p className="text-slate-500">Chargement des indicateurs…</p>;
  }

  return (
    <div className="space-y-6">
      {kpis.totalDocuments === 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#185FA5]/30 bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-800">
            <Sparkles size={18} className="text-[#185FA5]" />
            <span>
              Bibliothèque vide — chargez les <strong>4 documents exemple</strong> de la maquette
              (Politique QHSE, Audit interne, Instruction CNC, Check-list 5S).
            </span>
          </div>
          <button
            type="button"
            disabled={seeding}
            onClick={loadSamples}
            className="rounded-lg bg-[#185FA5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#134a82] disabled:opacity-60"
          >
            {seeding ? 'Chargement…' : 'Créer les exemples'}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-slate-900">Dashboard Documentation</h1>
        <Link to="/kpi" className="text-sm font-medium text-[#185FA5] hover:underline">
          KPI détaillés →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Documents à jour"
          value={`${kpis.upToDatePercent}%`}
          sub={`${kpis.upToDateCount} / ${kpis.totalDocuments || 0}`}
          icon={FileCheck}
          progress={kpis.upToDatePercent}
          progressColor="bg-emerald-500"
        />
        <KpiCard
          label="Documents obsolètes"
          value={`${kpis.obsoletePercent}%`}
          sub={`${kpis.obsoleteCount} document(s)`}
          icon={Percent}
          progress={kpis.obsoletePercent}
          progressColor="bg-[#A32D2D]"
        />
        <KpiCard label="En validation" value={kpis.inValidationCount} sub="En cours" icon={Clock} />
        <KpiCard
          label="Temps moyen validation"
          value={`${kpis.avgValidationDays} j`}
          icon={Clock}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">Répartition par type</h2>
          {kpis.byType.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun document.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={kpis.byType}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label={({ type, percent }) =>
                    `${type} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {kpis.byType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total documents', value: kpis.totalDocuments },
          { label: 'Utilisateurs actifs', value: kpis.activeUsers },
          { label: 'Consultations (30j)', value: kpis.consultations30d },
          { label: 'Documents publiés', value: kpis.publishedCount },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
