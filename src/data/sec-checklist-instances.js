/**
 * Checklists multi-instances : un enregistrement par extincteur, pharmacie ou véhicule.
 */
import { SEC_CHECKLIST_CONFIGS } from './sec-checklist-configs.js';
import { initCL, persistCLStore } from '../components/qhse/dynamic-checklist.js';

import { clScore } from '../components/qhse/dynamic-checklist.js';

/** Types avec une checklist par équipement */
export const MULTI_INSTANCE_TEMPLATES = ['ext', 'phar', 'veh', 'sst'];

const LEGACY_TEMPLATE_KEYS = new Set(MULTI_INSTANCE_TEMPLATES);

export const INSTANCE_ADD_LABELS = {
  ext: 'un extincteur',
  phar: 'une boîte pharmacie',
  veh: 'un véhicule',
  sst: 'une zone SST',
};

const FIXED_INFO_CODES = new Set(['CH-EXT-001', 'CH-PHAR-001', 'CH-VEH-001', 'CH-MACH-001']);

export function isMultiInstanceTemplate(templateKey) {
  return MULTI_INSTANCE_TEMPLATES.includes(templateKey);
}

export function listInstances(templateKey) {
  const store = window.CL_DATA || {};
  return Object.entries(store)
    .filter(([, d]) => d?.isInstance && d.templateKey === templateKey)
    .map(([key, d]) => ({ key, data: d }))
    .sort((a, b) => (b.data.createdAt || '').localeCompare(a.data.createdAt || ''));
}

function freshItems(templateKey) {
  const cfg = SEC_CHECKLIST_CONFIGS[templateKey];
  return (cfg?.items || []).map((it) => ({
    n: it.n,
    label: it.label,
    rep: null,
    obs: '',
    critical: !!it.critical,
  }));
}

function buildCustomInfo(templateKey, fieldValues = {}) {
  const cfg = SEC_CHECKLIST_CONFIGS[templateKey];
  return (cfg?.infoFields || []).map(([label, def]) => ({
    label,
    value: String(fieldValues[label] ?? def ?? '').trim(),
  }));
}

function instanceDisplayLabel(templateKey, customInfo, fallback) {
  const cfg = SEC_CHECKLIST_CONFIGS[templateKey];
  const nameField = cfg?.instanceNameField;
  if (nameField) {
    const row = customInfo?.find((r) => r.label === nameField);
    if (row?.value) return row.value;
  }
  return fallback;
}

/**
 * Crée une nouvelle checklist pour un équipement.
 * @param {string} templateKey ext | phar | veh
 * @param {Record<string, string>} fieldValues valeurs par libellé figé
 * @param {string} [label] titre court optionnel
 */
export function createChecklistInstance(templateKey, fieldValues = {}, label = '') {
  const cfg = SEC_CHECKLIST_CONFIGS[templateKey];
  if (!cfg) return { ok: false, error: 'Modèle inconnu' };

  const customInfo = buildCustomInfo(templateKey, fieldValues);
  const display =
    label.trim() ||
    instanceDisplayLabel(templateKey, customInfo, `Nouveau — ${cfg.title}`);

  const key = `inst_${templateKey}_${Date.now()}`;
  initCL(key, freshItems(templateKey), {
    title: cfg.title,
    icon: cfg.icon,
    code: cfg.code,
    subtitle: cfg.subtitle,
    gradient: cfg.gradient,
    reference: cfg.code,
    templateKey,
    isInstance: true,
    infoFieldsLocked: true,
    instanceLabel: display,
    customInfo,
    createdAt: new Date().toISOString(),
  });

  const data = window.CL_DATA[key];
  if (data) data.title = `${cfg.title} — ${display}`;

  persistCLStore();
  return { ok: true, key, label: display };
}

export function deleteChecklistInstance(key) {
  const data = window.CL_DATA?.[key];
  if (!data?.isInstance) return { ok: false };
  if (!confirm(`Supprimer la checklist « ${data.instanceLabel || key} » ?`)) return { ok: false };
  delete window.CL_DATA[key];
  persistCLStore();
  return { ok: true };
}

/** Migre l’ancienne clé unique (ext, phar, veh) vers une instance. */
export function migrateLegacyTemplateKey(templateKey) {
  const legacy = window.CL_DATA?.[templateKey];
  if (!legacy || legacy.isInstance) return;
  const instances = listInstances(templateKey);
  if (instances.length) {
    delete window.CL_DATA[templateKey];
    persistCLStore();
    return;
  }

  const customInfo =
    legacy.customInfo?.length > 0
      ? legacy.customInfo
      : buildCustomInfo(templateKey);

  const label = instanceDisplayLabel(templateKey, customInfo, legacy.instanceLabel || templateKey);
  const key = `inst_${templateKey}_migrated`;

  window.CL_DATA[key] = {
    ...legacy,
    items: legacy.items?.length ? legacy.items : freshItems(templateKey),
    templateKey,
    isInstance: true,
    infoFieldsLocked: true,
    instanceLabel: label,
    title: `${SEC_CHECKLIST_CONFIGS[templateKey].title} — ${label}`,
    createdAt: legacy.createdAt || new Date().toISOString(),
  };
  delete window.CL_DATA[templateKey];
  persistCLStore();
}

export function ensureChecklistInstances() {
  if (!window.CL_DATA) window.CL_DATA = {};
  for (const tk of MULTI_INSTANCE_TEMPLATES) {
    migrateLegacyTemplateKey(tk);
  }
}

export function formatChecklistSavedAt(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  } catch {
    return '—';
  }
}

/** Toutes les checklists enregistrées (localStorage). */
export function listAllChecklistRecords() {
  const rows = [];
  for (const [key, d] of Object.entries(window.CL_DATA || {})) {
    if (!d) continue;
    if (LEGACY_TEMPLATE_KEYS.has(key) && !d.isInstance) continue;
    if (!d.items?.length && !d.isInstance && !d.isCustom) continue;

    const templateKey = d.templateKey || (SEC_CHECKLIST_CONFIGS[key] ? key : null);
    const cfg = templateKey ? SEC_CHECKLIST_CONFIGS[templateKey] : null;
    const score = clScore(key);
    const statut =
      d.statut === 'validé'
        ? 'Validé'
        : score.non > 0
          ? 'NC'
          : d.savedAt
            ? 'Brouillon'
            : 'Non démarré';

    rows.push({
      key,
      data: d,
      score,
      templateKey,
      statut,
      typeLabel: cfg?.title || d.title || 'Checklist',
      label: d.instanceLabel || d.title || key,
      savedAt: d.savedAt || d.createdAt || null,
      inspecteur: d.inspecteur || '—',
      isInstance: !!d.isInstance,
      isCustom: !!d.isCustom,
    });
  }

  return rows.sort((a, b) => String(b.savedAt || '').localeCompare(String(a.savedAt || '')));
}

export function openChecklistRecord(key) {
  const d = window.CL_DATA?.[key];
  if (!d) return;
  if (d.isInstance) {
    window.currentCLKey = key;
    window.goPage?.('sec-cl-instance');
    return;
  }
  if (d.isCustom) {
    window.currentCustomCL = key;
    window.goPage?.('sec-cl-custom');
    return;
  }
  const tk = d.templateKey || key;
  if (SEC_CHECKLIST_CONFIGS[tk]?.multiInstance) {
    window.goPage?.(`sec-cl-${tk}`);
    return;
  }
  window.goPage?.(`sec-cl-${tk}`);
}

export { FIXED_INFO_CODES };

export function cfgForInstanceKey(key) {
  const data = window.CL_DATA?.[key];
  const templateKey = data?.templateKey;
  if (!templateKey || !SEC_CHECKLIST_CONFIGS[templateKey]) return null;
  const base = SEC_CHECKLIST_CONFIGS[templateKey];
  return {
    ...base,
    title: data.title || `${base.title} — ${data.instanceLabel || ''}`,
    items: data.items?.length ? data.items : base.items,
  };
}
