/**
 * Navigation horizontale entre checklists SST (design moderne).
 */
import { SEC_CHECKLIST_CONFIGS } from '../../data/sec-checklist-configs.js';
import { renderIcon } from '../icons/icon-render.js';

const NAV_ITEMS = [
  { pageId: 'sec-cl-ext', key: 'ext', label: 'Extincteurs', icon: 'fire' },
  { pageId: 'sec-cl-phar', key: 'phar', label: 'Pharmacie', icon: 'pill' },
  { pageId: 'sec-cl-sst', key: 'sst', label: 'SST', icon: 'hardhat' },
  { pageId: 'sec-cl-veh', key: 'veh', label: 'Véhicule', icon: 'truck' },
  { pageId: 'sec-cl-epi', key: 'epi', label: 'EPI', icon: 'vest' },
  { pageId: 'sec-cl-evaq', key: 'evaq', label: 'Évacuation', icon: 'siren' },
];

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function barColor(pct, hasNc) {
  if (hasNc) return '#dc2626';
  if (pct >= 90) return '#16a34a';
  if (pct >= 70) return '#f59e0b';
  return '#dc2626';
}

/**
 * @param {string} activePageId
 */
export function renderSecChecklistNav(activePageId) {
  return `<nav class="sec-cl-nav" aria-label="Types de checklist">
    ${NAV_ITEMS.map((item) => {
      const active = item.pageId === activePageId;
      const score = ensureNavData(item.key);
      const pct = score.pct;
      const col = barColor(pct, score.non > 0);
      return `<button type="button" class="sec-cl-nav-card${active ? ' is-active' : ''}" data-nav="${esc(item.pageId)}">
        <span class="sec-cl-nav-icon">${renderIcon(item.icon, { size: 18 })}</span>
        <span class="sec-cl-nav-body">
          <span class="sec-cl-nav-label">${esc(item.label)}</span>
          <span class="sec-cl-nav-bar"><span style="width:${pct}%;background:${col}"></span></span>
          <span class="sec-cl-nav-pct">${pct}%</span>
        </span>
      </button>`;
    }).join('')}
  </nav>`;
}

function scoreForKey(key) {
  const items = window.CL_DATA?.[key]?.items || [];
  let oui = 0;
  let non = 0;
  let na = 0;
  for (const it of items) {
    if (it.rep === 'oui') oui++;
    else if (it.rep === 'non') non++;
    else if (it.rep === 'na') na++;
  }
  const scored = oui + non;
  const pct = scored > 0 ? Math.round((oui / scored) * 100) : 0;
  return { oui, non, na, total: items.length, pct };
}

function ensureNavData(key) {
  const cfg = SEC_CHECKLIST_CONFIGS[key];
  if (!cfg) return scoreForKey(key);
  if (!window.CL_DATA?.[key]?.items?.length && cfg.items && typeof window.initCL === 'function') {
    window.initCL(key, cfg.items, {
      title: cfg.title,
      code: cfg.code,
      subtitle: cfg.subtitle,
      gradient: cfg.gradient,
      reference: cfg.code,
      frequence: cfg.subtitle?.split('·')[1]?.trim() || '',
      infoFields: cfg.infoFields,
    });
  }
  return scoreForKey(key);
}
