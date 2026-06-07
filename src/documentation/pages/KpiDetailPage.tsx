import { BarChart3, BookOpen, Clock, Eye } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BRAND_COLORS } from '../../config/brand-colors.js';
import { KpiCard } from '../components/ui/KpiCard';
import { useKpis } from '../hooks/useKpis';

const COLORS = [...BRAND_COLORS.chart, '#3B6D11', '#854F0B'];

export function KpiDetailPage() {
  const { kpis, loading } = useKpis();

  if (loading || !kpis) return <p className="text-slate-500">Chargement…</p>;

  const trendUpToDate = [68, 72, 75, 78, 80, kpis.upToDatePercent];
  const trendObsolete = [15, 14, 13, 12, 12, kpis.obsoletePercent];
  const trendValidation = [5, 4.5, 4, 3.5, 3, kpis.avgValidationDays];
  const trendUnread = [12, 10, 9, 8, 7, kpis.unreadCount];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">KPI Documentation</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="% documents à jour"
          value={`${kpis.upToDatePercent}%`}
          icon={BookOpen}
          sparkline={trendUpToDate}
          progress={kpis.upToDatePercent}
          progressColor="bg-emerald-500"
        />
        <KpiCard
          label="% obsolètes"
          value={`${kpis.obsoletePercent}%`}
          icon={BarChart3}
          sparkline={trendObsolete}
          progress={kpis.obsoletePercent}
          progressColor="bg-[#A32D2D]"
        />
        <KpiCard
          label="Temps moyen validation"
          value={`${kpis.avgValidationDays} j`}
          icon={Clock}
          sparkline={trendValidation}
        />
        <KpiCard
          label="Documents non lus"
          value={kpis.unreadCount}
          sub="Publiés sans consultation récente"
          icon={Eye}
          sparkline={trendUnread}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">Documents par type</h2>
          {kpis.byType.length === 0 ? (
            <p className="text-sm text-slate-500">Aucune donnée.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={kpis.byType} dataKey="count" nameKey="type" innerRadius={45} outerRadius={75}>
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
          <h2 className="mb-4 text-sm font-semibold text-slate-800">
            Évolution des validations (6 derniers mois)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kpis.validationsByMonth}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#185FA5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: '% à jour (tendance)', data: trendUpToDate, color: '#3B6D11' },
          { label: '% obsolètes (tendance)', data: trendObsolete, color: '#A32D2D' },
          { label: 'Temps validation (j)', data: trendValidation, color: '#185FA5' },
          { label: 'Non lus', data: trendUnread, color: '#854F0B' },
        ].map((chart) => (
          <div key={chart.label} className="doc-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase text-slate-500">{chart.label}</p>
            <div className="mt-2 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart.data.map((v, i) => ({ i, v }))}>
                  <Line type="monotone" dataKey="v" stroke={chart.color} strokeWidth={2} dot={false} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
