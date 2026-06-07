import { useCallback, useEffect, useState } from 'react';
import { computeAlerts, computeKpis } from '../services/kpiService';
import type { AlertItem, KpiSnapshot } from '../types';

export function useKpis() {
  const [kpis, setKpis] = useState<KpiSnapshot | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [k, a] = await Promise.all([computeKpis(), computeAlerts()]);
    setKpis(k);
    setAlerts(a);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { kpis, alerts, loading, refresh };
}
