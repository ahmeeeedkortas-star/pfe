/**
 * Rendu des pages checklist SST dynamiques (priorité sur legacy statique).
 */
import { SEC_CHECKLIST_CONFIGS, SEC_CHECKLIST_PAGES } from '../../data/sec-checklist-configs.js';
import { renderDynChecklist, clInitView } from '../../components/qhse/dynamic-checklist.js';
import { clearContentMotionStyles } from '../../core/page-refresh.js';
import { cfgForInstanceKey } from '../../data/sec-checklist-instances.js';

function cfgForKey(key) {
  const instCfg = cfgForInstanceKey(key);
  if (instCfg) return instCfg;
  if (SEC_CHECKLIST_CONFIGS[key]) return SEC_CHECKLIST_CONFIGS[key];
  const d = window.CL_DATA?.[key];
  if (!d) return null;
  return {
    title: d.title,
    icon: d.icon,
    code: d.code,
    subtitle: d.subtitle,
    gradient: d.gradient,
    items: d.items,
    infoFields: d.infoFields,
  };
}

window.__clCfg = (key, pageId) => cfgForKey(key);

function resolveClKey(pageId) {
  const mapped = SEC_CHECKLIST_PAGES[pageId];
  if (mapped === '__custom__') return window.currentCustomCL;
  if (mapped === '__instance__') return window.currentCLKey;
  return mapped;
}

export function renderSecChecklist(pageId) {
  const mapped = SEC_CHECKLIST_PAGES[pageId];
  if (mapped === '__instance__') {
    const key = window.currentCLKey;
    const data = window.CL_DATA?.[key];
    const cfg = cfgForKey(key);
    if (!key || !data || !cfg) {
      return `<div class="card"><p>Checklist équipement introuvable.</p>
        <button type="button" class="btn" data-nav="sec-checklists">← Retour</button></div>`;
    }
    const listPage = data.templateKey
      ? `sec-cl-${data.templateKey}-equip`
      : 'sec-checklists';
    const formPage = data.templateKey ? `sec-cl-${data.templateKey}` : listPage;
    return renderDynChecklist(key, pageId, cfg, {
      backPage: listPage,
      backLabel: '← Retour aux équipements',
      formPage,
    });
  }
  if (mapped === '__custom__') {
    const key = window.currentCustomCL;
    const data = window.CL_DATA?.[key];
    if (!key || !data) {
      return '<div class="card"><p>Checklist personnalisée introuvable.</p><button type="button" class="btn" data-nav="sec-checklists">← Retour</button></div>';
    }
    return renderDynChecklist(key, pageId, {
      title: data.title,
      icon: data.icon,
      code: data.code,
      subtitle: data.subtitle,
      gradient: data.gradient,
      items: data.items,
      infoFields: data.infoFields,
    });
  }
  const key = mapped;
  const cfg = SEC_CHECKLIST_CONFIGS[key];
  if (!key || !cfg) return '<div class="card"><p>Checklist introuvable.</p></div>';
  return renderDynChecklist(key, pageId, cfg);
}

/** Rafraîchissement synchrone après clic OUI/NON (repli si DOM absent). */
export function refreshSecChecklist(pageId) {
  const key = resolveClKey(pageId);
  const c = document.getElementById('content');
  if (!key || !c) return;
  c.classList.add('is-interactive-page');
  clearContentMotionStyles(c);
  c.style.pointerEvents = '';
  c.innerHTML = renderSecChecklist(pageId);
  clInitView(key, pageId);
}

export function installSecChecklistRefresh() {
  window.refreshSecChecklist = refreshSecChecklist;
}
