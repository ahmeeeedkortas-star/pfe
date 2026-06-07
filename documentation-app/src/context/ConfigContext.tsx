import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getConfig, saveConfig } from '../services/configService';
import type { AppConfig } from '../types';

interface ConfigContextValue {
  config: AppConfig | null;
  loading: boolean;
  reload: () => Promise<void>;
  update: (patch: Partial<AppConfig>) => Promise<void>;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setConfig(await getConfig());
  }, []);

  useEffect(() => {
    reload().finally(() => setLoading(false));
  }, [reload]);

  const update = useCallback(
    async (patch: Partial<AppConfig>) => {
      const current = config ?? (await getConfig());
      const next = { ...current, ...patch };
      await saveConfig(next);
      setConfig(next);
    },
    [config]
  );

  const value = useMemo(
    () => ({ config, loading, reload, update }),
    [config, loading, reload, update]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig hors ConfigProvider');
  return ctx;
}
