import { KpiCard } from '../components/ui/KpiCard';
import { BarChart3, BookOpen, Clock, FileWarning, Layers } from 'lucide-react';
import { useKpis } from '../hooks/useKpis';

export function KpiDetailPage() {
  const { kpis, loading } = useKpis();

  if (loading || !kpis) return <p className="text-slate-500">Chargement…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Indicateurs détaillés</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="% documents à jour" value={`${kpis.upToDatePercent}%`} icon={BookOpen} />
        <KpiCard label="% obsolètes" value={`${kpis.obsoletePercent}%`} icon={FileWarning} />
        <KpiCard
          label="Temps moyen validation"
          value={`${kpis.avgValidationDays} j`}
          icon={Clock}
        />
        <KpiCard
          label="Versions moyennes / doc"
          value={kpis.avgVersionsPerDoc}
          icon={Layers}
        />
        <KpiCard label="Documents non lus" value={kpis.unreadCount} icon={BarChart3} />
        <KpiCard
          label="Conformité ISO"
          value={`${kpis.isoCompliancePercent}%`}
          icon={BookOpen}
          hint="Documents publiés avec revue dans le délai configuré"
        />
      </div>
    </div>
  );
}
