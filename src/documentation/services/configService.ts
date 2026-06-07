import { db } from '../db/database';
import type { AppConfig } from '../types';

const CONFIG_ID = 'app';

const DEFAULT_CONFIG: AppConfig = {
  documentTypes: [],
  processes: [],
  zones: [],
  posts: [],
  isoNorms: [],
  unreadDaysThreshold: 90,
  isoReviewMonths: 12,
  codePrefix: 'DOC',
};

export async function loadDefaultConfigFile(): Promise<AppConfig> {
  const res = await fetch('/doc-config.default.json');
  if (!res.ok) return { ...DEFAULT_CONFIG };
  return { ...DEFAULT_CONFIG, ...(await res.json()) };
}

export async function getConfig(): Promise<AppConfig> {
  const row = await db.config.get(CONFIG_ID);
  if (row?.value) return row.value;
  const fromFile = await loadDefaultConfigFile();
  await db.config.put({ id: CONFIG_ID, value: fromFile });
  return fromFile;
}

export async function saveConfig(config: AppConfig): Promise<void> {
  await db.config.put({ id: CONFIG_ID, value: config });
}

export async function peekDocumentCode(): Promise<string> {
  const config = await getConfig();
  const row = await db.meta.get('codeCounter');
  const next = (row?.value ?? 0) + 1;
  const pad = String(next).padStart(3, '0');
  return `${config.codePrefix}-${pad}`;
}

export async function nextDocumentCode(): Promise<string> {
  const config = await getConfig();
  const key = 'codeCounter';
  const row = await db.meta.get(key);
  const next = (row?.value ?? 0) + 1;
  await db.meta.put({ key, value: next });
  const pad = String(next).padStart(3, '0');
  return `${config.codePrefix}-${pad}`;
}
